import { HttpLink } from "@apollo/client"
import {
  registerApolloClient,
  ApolloClient,
  InMemoryCache,
} from "@apollo/experimental-nextjs-app-support"

const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_APOLLO_ROUTER_URL || "http://localhost:4000",
  fetchOptions: { cache: "no-store" },
})

export const { getClient, query, PreloadQuery } = registerApolloClient(() => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: httpLink,
  })
})
