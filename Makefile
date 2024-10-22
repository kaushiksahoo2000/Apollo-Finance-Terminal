# Colors for prettier output
CYAN = \033[0;36m
GREEN = \033[0;32m
RESET = \033[0m

.PHONY: print-required-env-vars
print-required-env-vars: ## Display required environment variables and their current values
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
.PHONY: start-coinbase-subscription-server
start-coinbase-subscription-server: ## Start local coinbase subscription server/subgraph
	cd coinbase && npm start

.PHONY: rover-dev 
rover-dev: print-required-env-vars ## Run rover dev to get local router running w/ supergraph
	rover dev --supergraph-config supergraph.yaml --router-config router.yaml

#######################################
### DEV w/ Docker
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

.PHONY: docker-stop-coinbase-subscription-server
docker-stop-coinbase-subscription-server: ## Stop coinbase subscription server/subgraph Docker container
	@echo "$(CYAN)Stopping container...$(RESET)"
	@if [ $$(docker ps -q -f name=coinbase-ws-server) ]; then \
		docker stop coinbase-ws-server; \
		echo "$(GREEN)Container stopped!$(RESET)"; \
	else \
		echo "$(YELLOW)No running container found.$(RESET)"; \
	fi

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

help: ## Display this help screen
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%30s\033[0m  %s\n", $$1, $$2}'