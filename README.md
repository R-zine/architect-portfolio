# Architect portfolio

Portfolio website for architect and interior designer Diana Radeva.

## Requirements

- Node.js 24.20 or newer
- Corepack (included with the pinned Node.js release)
- Yarn 4.18.0

The Node.js version is recorded in `.nvmrc`, and `package.json` pins the exact
Yarn release through Corepack.

## Local setup

```sh
corepack enable
yarn install --immutable
yarn dev
```

`yarn dev`, `yarn build`, and `yarn test` generate deduplicated responsive
WebP gallery assets from `assets/gallery-originals` before starting.

## Quality checks

```sh
yarn lint
yarn audit
yarn test:coverage
yarn build
yarn test:e2e
```

Run all fast checks together with `yarn check`. Playwright requires its Chromium
browser once per machine: `yarn playwright install chromium`.

Husky runs `yarn check` before each commit, covering linting, formatting, unit
tests with coverage thresholds, and a production build. Run the slower
`yarn test:e2e` browser suite separately before opening a pull request.

Yarn uses the compatibility-focused `node-modules` linker, disables dependency
build scripts unless they are explicitly allow-listed, and applies a one-week
release-age gate when resolving new package versions.

## Asset maintenance

Add original JPG or PNG files beneath `assets/gallery-originals`, reference the
logical `./img/...` path in `src/components/Buildings/buildings.js`, then run:

```sh
yarn assets:build
```

The generated files in `public/img` are content-hashed and ignored by Git. The
small runtime manifest is committed so data validation can catch missing images.

The contact model source is kept at `assets/model-source/model.gltf`. Regenerate
the optimized deployable GLB with `yarn assets:model`.
