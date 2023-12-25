# TypeScript Project

## Testing project in local

- For unit tests (using Jest):

```
npm run test:unit

```

- For integration tests

```
npm run test:integration
```

To run integration test a MongoDB server is needed. A Docker Compose file is provided to create a Docker container with these dependency. To start the service, run:

```
docker-compose up -d
```

It is possible to launch all test together with

```
npm run test

```

it was implemented the businesses logic,

error are handler but not businesses logic was implemented for this cases

test unit

test integration

use an DB an a mock Server

TODO

[] clean mongo repository => remove mock in name and remove drop method
[] clean all unecesary files
[] review logic flow.
[] create new test cases
[] create a diagraman
[] clean docker compose file.
