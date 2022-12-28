## Installation

```bash
$ npm install
```

## Running the app

```bash
docker-compose up
```

## Test

```bash
# unit tests
$ npm install && npm run test

# test coverage
$ npm run test:cov
```

## Assumptions

- Transferring an nft directly updating the record doesn't make much sense, so introduced a table called nft transfers which will store previous transfers for internal analytics etc.
- Added modules which have every module, inside module there graphql folder. This is better because if there is new protocol later on e.g grpc or http, we could create separate folders for them thereby improving api isolation

## TODOS

- Add pino context based logging?
- Configure request sanitizers for payload (for possible injection attacks)
- Unit tests could be better by mocking using typemoq or ts-mockito
- Should write e2e tests with proper database fixtures for graphql apis
- Can probably improve auth by introducing roles
- Can probably improve eslint rules and typescript any rule
- Config could be improved (usually it should come from AWS secrets or smth like that)
