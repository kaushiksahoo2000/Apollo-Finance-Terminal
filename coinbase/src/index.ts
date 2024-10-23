import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { buildSubgraphSchema } from "@apollo/subgraph"; //preserve-line
import gql from "graphql-tag";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { ApolloServerPluginLandingPageLocalDefault } from "@apollo/server/plugin/landingPage/default";
import express from "express";
import { createServer } from "http";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/lib/use/ws";
import { PubSub } from "graphql-subscriptions";
import bodyParser from "body-parser";
import cors from "cors";
import { WebSocket as WSWebSocket } from "ws";

const PORT = 8000;
const pubsub = new PubSub();

// Simple subgraph schema definition (https://www.apollographql.com/docs/apollo-server/using-federation/apollo-subgraph-setup)
// w/ reference structure from https://docs.cdp.coinbase.com/advanced-trade/docs/ws-channels#ticker-channel
const typeDefs = gql`
    extend schema
      @link(
        url: "https://specs.apollo.dev/federation/v2.4" 
        import: ["@key", "@requires"]
      )

    type Ticker {
        product_id: String
        price: Float
        low_24_h: Float
        high_24_h: Float
        price_percent_chg_24_h: Float
    }

    type TickerEvent {
        type: String
        tickers: [Ticker]
    }

    type TickerMessage {
        timestamp: String
        sequence_num: Int
        events: [TickerEvent]
    }

    type Subscription {
        coinbaseBTCUpdate: TickerMessage
    }

    type Query {
        _dummy: String
    }
`;

// Resolver map
const resolvers = {
  Subscription: {
    coinbaseBTCUpdate: {
      subscribe: () => pubsub.asyncIterator(["COINBASE_BTC_UPDATE"]),
    },
  },
};

// Create schema, which will be used separately by ApolloServer and
// the WebSocket server
const schema = buildSubgraphSchema({ typeDefs, resolvers });

// Create an Express app and HTTP server; we will attach the WebSocket
// server and the ApolloServer to this HTTP server.
const app = express();
const httpServer = createServer(app);

// Set up WebSocket server.
const wsServer = new WebSocketServer({
  server: httpServer,
  path: "/graphql",
});
const serverCleanup = useServer({ schema }, wsServer);

// Set up ApolloServer.
const server = new ApolloServer({
  introspection: true,
  schema,
  plugins: [
    // Proper shutdown for the HTTP server.
    ApolloServerPluginDrainHttpServer({ httpServer }),
    // Enable Apollo Sandbox for all environments
    ApolloServerPluginLandingPageLocalDefault(),
    // Proper shutdown for the WebSocket server.
    {
      async serverWillStart() {
        return {
          async drainServer() {
            await serverCleanup.dispose();
          },
        };
      },
    },
  ],
});

async function start() {
  await server.start();
  app.use(
    "/graphql",
    cors<cors.CorsRequest>(),
    bodyParser.json(),
    expressMiddleware(server),
  );

  connectToCoinbase();

  // Now that our HTTP server is fully set up, actually listen.
  httpServer.listen(PORT, () => {
    console.log(
      `🚀 Query endpoint ready at http://localhost:${PORT}/graphql 🚀`,
    );
    console.log(
      `💰 Subscription endpoint ready at ws://localhost:${PORT}/graphql 💸`,
    );
  });
}

start().catch(console.error);

// Throttling configuration for coinbase messages
const THROTTLE_INTERVAL = 1000; // Publish updates every 1 second
let lastMessage = null;

// Function to connect to coinbase's public websocket for market data
function connectToCoinbase() {
  const coinbaseWs = new WSWebSocket("wss://advanced-trade-ws.coinbase.com");

  coinbaseWs.on("open", () => {
    console.log("Connected to Coinbase WebSocket");

    // Subscibe to BTC real-time price updates
    const subscribeMessage = {
      type: "subscribe",
      product_ids: ["BTC-USD"],
      channel: "ticker",
    };

    coinbaseWs.send(JSON.stringify(subscribeMessage));
  });

  coinbaseWs.on("message", (data: Buffer) => {
    try {
      const message = JSON.parse(data.toString());
      lastMessage = message;
    } catch (error) {
      console.error("Error parsing websocket message:", error);
    }
  });

  coinbaseWs.on("error", (error: Error) => {
    console.error("WebSocket error:", error);
  });

  // Set up throttled publishing
  setInterval(() => {
    if (lastMessage) {
      pubsub.publish("COINBASE_BTC_UPDATE", {
        coinbaseBTCUpdate: lastMessage,
      });
      lastMessage = null;
    }
  }, THROTTLE_INTERVAL);

  // Handle WebSocket closure and reconnection
  coinbaseWs.on("close", () => {
    console.log("WebSocket closed. Attempting to reconnect...");
    setTimeout(connectToCoinbase, 5000); // Reconnect after 5 seconds
  });
}
