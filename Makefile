# Colors for prettier output
CYAN = \033[0;36m
GREEN = \033[0;32m
RESET = \033[0m

.PHONY: print-required-env-vars
print-required-env-vars: ## Display required environment variables and their current values (hint: run "source .env" w/ a .env file)
	@echo "POLYGON_API_KEY: $${POLYGON_API_KEY}"
	@echo "APOLLO_KEY: $${APOLLO_KEY}"
	@echo "APOLLO_GRAPH_REF: $${APOLLO_GRAPH_REF}"
	@echo "APOLLO_ROVER_DEV_ROUTER_VERSION: $${APOLLO_ROVER_DEV_ROUTER_VERSION}"
	@echo "APOLLO_ROVER_DEV_COMPOSITION_VERSION: $${APOLLO_ROVER_DEV_COMPOSITION_VERSION}"

#######################################
### INSTALLATION
#######################################
.PHONY: install-coinbase-subscription-server-deps
install-coinbase-subscription-server-deps: ## Install local coinbase subscription server/subgraph dependencies
	cd coinbase && npm install

#######################################
##### LOCAL DEV - w/o Docker
#######################################
.PHONY: start-local-coinbase-subscription-server
start-local-coinbase-subscription-server: ## Start local coinbase subscription server/subgraph
	cd coinbase && npm start

.PHONY: rover-dev 
rover-dev: print-required-env-vars ## Run rover dev to get local router running w/ supergraph
	rover dev --supergraph-config supergraph.yaml --router-config router-local-rover-dev.yaml

#######################################
##### ROVER -> GRAPHOS
#######################################
.PHONY: rover-publish-polygon-subgraph
rover-publish-polygon-subgraph: print-required-env-vars ## Publish polygon subgraph  
	rover subgraph publish ${APOLLO_GRAPH_REF} \
		--schema polygon.graphql \
		--name polygon

.PHONY: rover-publish-coinbase-subgraph
rover-publish-coinbase-subgraph: print-required-env-vars ## Publish coinbase subgraph (make sure to have local subgraph running and update routing-url)
	rover subgraph introspect \
	http://localhost:8000/graphql | \
		rover subgraph publish ${APOLLO_GRAPH_REF} \
		--name coinbase \
		--schema - \
		--routing-url http://127.0.0.1:8000/graphql

#######################################
### LOCAL DEV w/ Docker
#######################################
################################
##### Coinbase Server/Subgraph
################################
.PHONY: docker-build-coinbase-subscription-server
docker-build-coinbase-subscription-server: ## Build the Docker image for coinbase subscription server/subgraph
	@echo "$(CYAN)Building Docker image...$(RESET)"
	cd coinbase && docker build -t coinbase-ws-server .
	@echo "$(GREEN)Build complete!$(RESET)"

.PHONY: docker-run-coinbase-subscription-server
docker-run-coinbase-subscription-server: ## Run coinbase subscription server/subgraph Docker container 
	@echo "$(CYAN)Starting container...$(RESET)"
	cd coinbase && docker run -p 8000:8000 coinbase-ws-server
	@echo "$(GREEN)Container started!$(RESET)"

.PHONY: docker-build-and-run-coinbase-subscription-server
docker-build-and-run-coinbase-subscription-server: docker-build-coinbase-subscription-server docker-run-coinbase-subscription-server  ## Build and run coinbase subscription server/subgraph w/ docker
################################
##### Router
################################
.PHONY: docker-build-router
docker-build-router: print-required-env-vars ## Build the Docker image for Apollo Router (make sure env variables are right)
	@echo "$(CYAN)Building Docker image...$(RESET)"
	docker build -f Dockerfile.router.local.dev -t router .
	@echo "$(GREEN)Build complete!$(RESET)"

.PHONY: docker-run-router
docker-run-router: ## Run Apollo Router Docker container 
	@echo "$(CYAN)Starting container...$(RESET)"
	docker run -it --env-file .env -p 4000:4000 router
	@echo "$(GREEN)Container started!$(RESET)"

.PHONY: docker-build-and-run-router
docker-build-and-run-router: docker-build-router docker-run-router ## Build and run Apollo Router w/ docker

#######################################
### TESTING
#######################################
.PHONY: test-aggregate-bars-query
test-aggregate-bars-query: ## Test GraphQL query to local router for aggregate bars
	curl --request POST \
		--url http://localhost:4000/ \
		--header 'Content-Type: application/json' \
		--data '{"query":"query Query($$ticker: String!, $$from: String!, $$to: String!, $$timespan: String!) {\n  aggregateBars(ticker: $$ticker, from: $$from, to: $$to, timespan: $$timespan) {\n   ticker\n   results {\n      closePrice\n      highestPrice\n      lowestPrice\n      openPrice\n      timestamp\n    }\n  }\n}","variables":{\
		"ticker": "AAPL",\
		"from": "2024-10-14",\
		"to": "2024-10-20",\
		"timespan": "day"\
	}}'

.PHONY: test-ticker-details-query
test-ticker-details-query: ## Test GraphQL query to local router for aggregate bars
	curl --request POST \
		--url http://localhost:4000/ \
		--header 'Content-Type: application/json' \
		--data '{"query":"query Query($$ticker: String!) {\n  tickerDetails(ticker: $$ticker) {\n    description\n    homepageUrl\n    iconUrl\n    listDate\n    logoUrl\n    marketCap\n    name\n    shareClassSharesOutstanding\n    ticker\n    totalEmployees\n  }\n}","variables":{\
		"ticker": "AAPL"\
   }}'

#######################################
##### LOCAL DEV - Client
#######################################
## TODO

help: ## Display this help screen
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%30s\033[0m  %s\n", $$1, $$2}'