# kin-laboratory

## Getting started

```shell
# clone repo...
pnpm install
```

## Development server

Run `pnpm run dev:web` for a dev server. Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.

## Adding capabilities to your workspace

```shell
# Create Feature Lib
nx g @nrwl/react:lib feature      --directory web/core  --tags type:feature,scope:web     --style none
# Create Data-Access Lib
nx g @nrwl/react:lib data-access  --directory web/core  --tags type:data-access,scope:web --style none
# Create UI Lib
nx g @nrwl/react:lib ui           --directory web/core  --tags type:ui,scope:web          --style none

# Create 'global' UI Lib
nx g @nrwl/react:lib layout       --directory web/ui    --tags type:ui,scope:web          --style none
```

## Build

Run `nx build web` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `nx test web` to execute the unit tests via [Jest](https://jestjs.io).

Run `nx affected:test` to execute the unit tests affected by a change.

## Running end-to-end tests

Run `ng e2e web` to execute the end-to-end tests via [Cypress](https://www.cypress.io).

Run `nx affected:e2e` to execute the end-to-end tests affected by a change.

## Understand your workspace

Run `nx dep-graph` to see a diagram of the dependencies of your projects.

## Further help

Visit the [Nx Documentation](https://nx.dev) to learn more.
