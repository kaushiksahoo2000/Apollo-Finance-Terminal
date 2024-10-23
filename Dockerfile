FROM ghcr.io/apollographql/router:v2.0.0-preview.0

COPY router.yaml /config.yaml

ENV APOLLO_ROUTER_LISTEN_ADDRESS=0.0.0.0:4000

CMD ["--config", "/config.yaml"]