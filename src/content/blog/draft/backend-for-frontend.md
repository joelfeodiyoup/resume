What is actually in there?

### API gateway pattern

- **problem** clients need a single entry point to multiple services
- **solution** single gateway that routes/aggregates requests
- **can be used with** microservice architectures

## Federated GraphQL

Each service contributes to a unified schema
Client queries exactly what it needs
Gateway handles federation logic
Strong typing across services

## API Gateway (REST)

Gateway routes/aggregates REST endpoints
Often needs custom aggregation logic per endpoint
Client gets predefined response shapes

## Backend for Frontend (BFF)

Separate backend per client type (mobile BFF, web BFF)
Each BFF customized for that client's needs
Often used WITH GraphQL or REST

## GraphQL (non-federated)

Single monolithic GraphQL server
All resolvers in one place
Doesn't scale well with microservices
