# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [0.86.0](https://github.com/swagger-api/apidom/compare/v0.85.0...v0.86.0) (2023-12-05)

### Bug Fixes

- **ls:** recognize OpenAPI 2.0 root element ([#3493](https://github.com/swagger-api/apidom/issues/3493)) ([c35931d](https://github.com/swagger-api/apidom/commit/c35931db893eaffe3702db58a0fd0a521587da66)), closes [#3480](https://github.com/swagger-api/apidom/issues/3480)

### Features

- **ls:** add missing OpenAPI 2.0 semantic tokens ([#3508](https://github.com/swagger-api/apidom/issues/3508)) ([4ffce6f](https://github.com/swagger-api/apidom/commit/4ffce6fb109e8d6c0bdd8e43f9185dba7e3518dc)), closes [#3477](https://github.com/swagger-api/apidom/issues/3477)
- **ls:** add missing OpenAPI 2.0 symbols ([#3507](https://github.com/swagger-api/apidom/issues/3507)) ([c89dab3](https://github.com/swagger-api/apidom/commit/c89dab3b5479f75245a69a2abdd2008a904e5c55)), closes [#3479](https://github.com/swagger-api/apidom/issues/3479)

# [0.85.0](https://github.com/swagger-api/apidom/compare/v0.84.0...v0.85.0) (2023-11-30)

### Features

- **ls:** add initial support for OpenAPI 2.0 ([#3470](https://github.com/swagger-api/apidom/issues/3470)) ([e47be92](https://github.com/swagger-api/apidom/commit/e47be9296a979302e5cf0b07f98d6be580bc5e1c)), closes [#3103](https://github.com/swagger-api/apidom/issues/3103) [#3466](https://github.com/swagger-api/apidom/issues/3466)

# [0.84.0](https://github.com/swagger-api/apidom/compare/v0.83.0...v0.84.0) (2023-11-24)

**Note:** Version bump only for package @swagger-api/apidom-ls

# [0.83.0](https://github.com/swagger-api/apidom/compare/v0.82.2...v0.83.0) (2023-11-07)

**Note:** Version bump only for package @swagger-api/apidom-ls

## [0.82.2](https://github.com/swagger-api/apidom/compare/v0.82.1...v0.82.2) (2023-11-03)

**Note:** Version bump only for package @swagger-api/apidom-ls

## [0.82.1](https://github.com/swagger-api/apidom/compare/v0.82.0...v0.82.1) (2023-11-03)

**Note:** Version bump only for package @swagger-api/apidom-ls

# [0.82.0](https://github.com/swagger-api/apidom/compare/v0.81.0...v0.82.0) (2023-11-01)

**Note:** Version bump only for package @swagger-api/apidom-ls

# [0.81.0](https://github.com/swagger-api/apidom/compare/v0.80.0...v0.81.0) (2023-10-30)

**Note:** Version bump only for package @swagger-api/apidom-ls

# [0.80.0](https://github.com/swagger-api/apidom/compare/v0.79.0...v0.80.0) (2023-10-26)

**Note:** Version bump only for package @swagger-api/apidom-ls

# [0.79.0](https://github.com/swagger-api/apidom/compare/v0.78.0...v0.79.0) (2023-10-24)

**Note:** Version bump only for package @swagger-api/apidom-ls

# [0.78.0](https://github.com/swagger-api/apidom/compare/v0.77.0...v0.78.0) (2023-10-17)

### Bug Fixes

- **types:** fix regression in @types/ramda@0.29.6 ([#3281](https://github.com/swagger-api/apidom/issues/3281)) ([c6c279f](https://github.com/swagger-api/apidom/commit/c6c279f526e07b16221d8c00dd0041eeb93e1290)), closes [#3279](https://github.com/swagger-api/apidom/issues/3279)

# [0.77.0](https://github.com/swagger-api/apidom/compare/v0.76.2...v0.77.0) (2023-10-03)

### Bug Fixes

- **reference:** fix how OpenAPI 3.1.0 Reference Object is merged ([#3215](https://github.com/swagger-api/apidom/issues/3215)) ([77a6823](https://github.com/swagger-api/apidom/commit/77a68230035cbbdd5b1042b65f16733864868454))

## [0.76.2](https://github.com/swagger-api/apidom/compare/v0.76.1...v0.76.2) (2023-09-08)

### Bug Fixes

- **build:** apply polyfills with transform runtime babel plugin ([#3132](https://github.com/swagger-api/apidom/issues/3132)) ([4b4754d](https://github.com/swagger-api/apidom/commit/4b4754da33a4a25d47f926c8a14b59cfdfa6b50c))

## [0.76.1](https://github.com/swagger-api/apidom/compare/v0.76.0...v0.76.1) (2023-09-07)

**Note:** Version bump only for package @swagger-api/apidom-ls

# [0.76.0](https://github.com/swagger-api/apidom/compare/v0.75.0...v0.76.0) (2023-09-01)

### Features

- **ls:** app option for apidom-reference based ref validation ([f97349b](https://github.com/swagger-api/apidom/commit/f97349b3e9baec47a2c0cb1531ff59fb7cd0b4d8))
- **ls:** concurrent and serial ref validation with refSet re-use ([76fb5a1](https://github.com/swagger-api/apidom/commit/76fb5a1501e364da56876d52690d030aefebb6da))

# [0.75.0](https://github.com/swagger-api/apidom/compare/v0.74.1...v0.75.0) (2023-08-22)

### Bug Fixes

- **ls:** fix linting code consistency ([#3005](https://github.com/swagger-api/apidom/issues/3005)) ([4634867](https://github.com/swagger-api/apidom/commit/46348677ad82c4244eaf8108cbe8794eb75f9cab))

### Features

- **ls:** add completion for OAS callback patterned fields ([42af8e4](https://github.com/swagger-api/apidom/commit/42af8e411a9a8460f1e84ce17615aa580400415a)), closes [#2356](https://github.com/swagger-api/apidom/issues/2356)
- **ls:** add linting rule for OAS server variable enum and default ([4e2b56b](https://github.com/swagger-api/apidom/commit/4e2b56bb0507b13bf31eee59df13c14949f7e81e)), closes [#2787](https://github.com/swagger-api/apidom/issues/2787) [#2788](https://github.com/swagger-api/apidom/issues/2788)

## [0.74.1](https://github.com/swagger-api/apidom/compare/v0.74.0...v0.74.1) (2023-07-28)

### Bug Fixes

- **ls:** fix condition for server URL linting ([42f7575](https://github.com/swagger-api/apidom/commit/42f7575fbe6f94a28f35e7cfadc29c8929ca86a5))
- **ls:** process schema 'null' / 'nullable' depending on spec version ([d053dca](https://github.com/swagger-api/apidom/commit/d053dcafb3a8df84162564bf6cc823c514af2fe9))
- **ls:** replace legacy buildJsonPointer with apidom-json-pointer ([70a359f](https://github.com/swagger-api/apidom/commit/70a359f2d2485a9c85fc63de099358dcdbc42ddc))

# [0.74.0](https://github.com/swagger-api/apidom/compare/v0.73.0...v0.74.0) (2023-07-24)

### Features

- **ls:** add rule for requestBody in operation depending on method ([122a03a](https://github.com/swagger-api/apidom/commit/122a03a77dd8083f6c3ab257e84de5f3d76c9fea))
- **ls:** fix completion paths, self and indirect refs ([b275efa](https://github.com/swagger-api/apidom/commit/b275efa3b53e7643af804a8ffc6c26acbd929e92))
- **ls:** fix wrong docs links version in hover ([78ce094](https://github.com/swagger-api/apidom/commit/78ce094a6889273b01ff2aae24e5139b0656aed3))
- **ls:** implement JSON Path support in linting rules ([d5aa517](https://github.com/swagger-api/apidom/commit/d5aa51770e8b6eafb68994948ddbec44e5fab634))

# [0.73.0](https://github.com/swagger-api/apidom/compare/v0.72.0...v0.73.0) (2023-07-18)

### Bug Fixes

- **ls:** fix validation for indirected local references ([60f9215](https://github.com/swagger-api/apidom/commit/60f9215b5ee5ae8e8c89c8e07ed3d643cd04e673))

### Features

- **ls:** add media type completion items ([3b44668](https://github.com/swagger-api/apidom/commit/3b44668b0e650330970d1a130f7c11147464f393))

# [0.72.0](https://github.com/swagger-api/apidom/compare/v0.71.1...v0.72.0) (2023-07-17)

### Bug Fixes

- add 'schema' item to OAS3.1 mediaType completion ([d6f73a3](https://github.com/swagger-api/apidom/commit/d6f73a359e866cfc55560c2aa93624f02aecf144))

### Features

- allow apidom-ls strict filter ([9f92eaa](https://github.com/swagger-api/apidom/commit/9f92eaa5bb85e491e1b4b8854150d47db9806553))

## [0.71.1](https://github.com/swagger-api/apidom/compare/v0.71.0...v0.71.1) (2023-07-14)

**Note:** Version bump only for package @swagger-api/apidom-ls

# [0.71.0](https://github.com/swagger-api/apidom/compare/v0.70.4...v0.71.0) (2023-07-13)

### Bug Fixes

- **apidom-ls:** add deprecated warning for example ([#2909](https://github.com/swagger-api/apidom/issues/2909)) ([564d185](https://github.com/swagger-api/apidom/commit/564d18561d2ebf8acc928de4f729234681fe7470))
- **ls:** add support for AsyncAPI 2.5/2.6 to common Schema Object ([#2917](https://github.com/swagger-api/apidom/issues/2917)) ([34c8b1f](https://github.com/swagger-api/apidom/commit/34c8b1fa1f39e9a0f98653580d422c8a986e446f))
- **ls:** remove duplicate linting codes ([#2946](https://github.com/swagger-api/apidom/issues/2946)) ([c5db0a8](https://github.com/swagger-api/apidom/commit/c5db0a8e47f88fbac6ad95eafbfbd03ec1b0ab46)), closes [#2982](https://github.com/swagger-api/apidom/issues/2982) [#2923](https://github.com/swagger-api/apidom/issues/2923)

### Features

- add better YAML syntax error messages ([#2931](https://github.com/swagger-api/apidom/issues/2931)) ([5a1d14a](https://github.com/swagger-api/apidom/commit/5a1d14a179da60df666a18e6ae04155c1065bddd)), closes [#2914](https://github.com/swagger-api/apidom/issues/2914) [#2889](https://github.com/swagger-api/apidom/issues/2889)
- **ls:** make lint messages more helpful ([#2930](https://github.com/swagger-api/apidom/issues/2930)) ([4504674](https://github.com/swagger-api/apidom/commit/450467419ab9234617ab1510cfab7b155741af3f))

## [0.70.4](https://github.com/swagger-api/apidom/compare/v0.70.3...v0.70.4) (2023-06-28)

**Note:** Version bump only for package @swagger-api/apidom-ls

## [0.70.3](https://github.com/swagger-api/apidom/compare/v0.70.2...v0.70.3) (2023-06-27)

### Bug Fixes

- **ls:** fix OpenAPI 3.x.y Server.url field linting ([#2876](https://github.com/swagger-api/apidom/issues/2876)) ([a8cc07f](https://github.com/swagger-api/apidom/commit/a8cc07f9abad786a0fecb4a474b9f84501978abf)), closes [#2858](https://github.com/swagger-api/apidom/issues/2858)

## [0.70.2](https://github.com/swagger-api/apidom/compare/v0.70.1...v0.70.2) (2023-06-16)

**Note:** Version bump only for package @swagger-api/apidom-ls

## [0.70.1](https://github.com/swagger-api/apidom/compare/v0.70.0...v0.70.1) (2023-06-15)

**Note:** Version bump only for package @swagger-api/apidom-ls

# [0.70.0](https://github.com/swagger-api/apidom/compare/v0.69.3...v0.70.0) (2023-05-23)

### Features

- **apidom-ls:** update exports for JSON Schema validators ([99a21b7](https://github.com/swagger-api/apidom/commit/99a21b7139dafef17ecf2d0faba8280f44ad5de5))

## [0.69.3](https://github.com/swagger-api/apidom/compare/v0.69.2...v0.69.3) (2023-04-27)

### Bug Fixes

- **ls:** provide completion items with proper filtering ([#2734](https://github.com/swagger-api/apidom/issues/2734)) ([0c26b31](https://github.com/swagger-api/apidom/commit/0c26b319f86f6e51ca3e7479751f871873e9c18b))

## [0.69.2](https://github.com/swagger-api/apidom/compare/v0.69.1...v0.69.2) (2023-04-03)

### Bug Fixes

- **core:** fix issues in YAML 1.2 serialization ([#2669](https://github.com/swagger-api/apidom/issues/2669)) ([6cc91fb](https://github.com/swagger-api/apidom/commit/6cc91fb0edd6b47fe3e8656539f0f655a5f79c3f))

## [0.69.1](https://github.com/swagger-api/apidom/compare/v0.69.0...v0.69.1) (2023-03-28)

### Bug Fixes

- **ls:** fix OpenAPI Header Object required fields lint ([#2653](https://github.com/swagger-api/apidom/issues/2653)) ([141edb4](https://github.com/swagger-api/apidom/commit/141edb415690550e788df7f6cd36fa9b84616ba4)), closes [#2392](https://github.com/swagger-api/apidom/issues/2392)
- **ls:** fix typos in lint messages ([#2652](https://github.com/swagger-api/apidom/issues/2652)) ([fee2e93](https://github.com/swagger-api/apidom/commit/fee2e9357cfa22709bc386f264b722e3625aea2c)), closes [#2392](https://github.com/swagger-api/apidom/issues/2392)
- **ls:** serialize dereferenced ApiDOM to proper format ([#2663](https://github.com/swagger-api/apidom/issues/2663)) ([813b114](https://github.com/swagger-api/apidom/commit/813b114f7e6727efe43f94ba4b0fd65bcc177bbc)), closes [#2662](https://github.com/swagger-api/apidom/issues/2662)

# [0.69.0](https://github.com/swagger-api/apidom/compare/v0.68.1...v0.69.0) (2023-02-28)

### Features

- add support for publishing to npmjs.com ([#2597](https://github.com/swagger-api/apidom/issues/2597)) ([5ac3cd9](https://github.com/swagger-api/apidom/commit/5ac3cd9a83bbe3b4ce2fac732633fb179cd9747f)), closes [#2290](https://github.com/swagger-api/apidom/issues/2290)

## [0.68.1](https://github.com/swagger-api/apidom/compare/v0.68.0...v0.68.1) (2023-02-20)

**Note:** Version bump only for package @swagger-api/apidom-ls

# [0.68.0](https://github.com/swagger-api/apidom/compare/v0.67.1...v0.68.0) (2023-02-16)

**Note:** Version bump only for package @swagger-api/apidom-ls

## [0.67.1](https://github.com/swagger-api/apidom/compare/v0.67.0...v0.67.1) (2023-02-15)

### Bug Fixes

- **deps:** relax @babel/runtime-corejs3 version ([#2563](https://github.com/swagger-api/apidom/issues/2563)) ([3523a14](https://github.com/swagger-api/apidom/commit/3523a145a8390bb85139d9a8c3919b0c4ef75962)), closes [#2562](https://github.com/swagger-api/apidom/issues/2562)
- **ls:** fix Parameter Object required fields lint rule ([#2545](https://github.com/swagger-api/apidom/issues/2545)) ([cd8ace2](https://github.com/swagger-api/apidom/commit/cd8ace2b1ddcb7b1cf35208692a76602cf17a825))

# [0.67.0](https://github.com/swagger-api/apidom/compare/v0.66.0...v0.67.0) (2023-02-07)

### Bug Fixes

- **ls:** make IMBMQ Channel Bindings topic field always optional ([#2523](https://github.com/swagger-api/apidom/issues/2523)) ([f6704d9](https://github.com/swagger-api/apidom/commit/f6704d902c38000ce8f25c4ae62790dbc084a41b)), closes [#2522](https://github.com/swagger-api/apidom/issues/2522)

### Features

- **ls:** add support for AsyncAPI 2.6.0 ([#2538](https://github.com/swagger-api/apidom/issues/2538)) ([04fcc64](https://github.com/swagger-api/apidom/commit/04fcc6445fcc0901e224b9112586daa1b0e03710)), closes [#2520](https://github.com/swagger-api/apidom/issues/2520)

# [0.66.0](https://github.com/swagger-api/apidom/compare/v0.65.0...v0.66.0) (2023-01-25)

**Note:** Version bump only for package @swagger-api/apidom-ls

# [0.65.0](https://github.com/swagger-api/apidom/compare/v0.64.0...v0.65.0) (2023-01-20)

**Note:** Version bump only for package @swagger-api/apidom-ls

# [0.64.0](https://github.com/swagger-api/apidom/compare/v0.63.1...v0.64.0) (2023-01-16)

**Note:** Version bump only for package @swagger-api/apidom-ls

## [0.63.1](https://github.com/swagger-api/apidom/compare/v0.63.0...v0.63.1) (2023-01-10)

**Note:** Version bump only for package @swagger-api/apidom-ls

# [0.63.0](https://github.com/swagger-api/apidom/compare/v0.62.1...v0.63.0) (2023-01-04)

**Note:** Version bump only for package @swagger-api/apidom-ls

## [0.62.1](https://github.com/swagger-api/apidom/compare/v0.62.0...v0.62.1) (2023-01-04)

**Note:** Version bump only for package @swagger-api/apidom-ls

# [0.62.0](https://github.com/swagger-api/apidom/compare/v0.61.0...v0.62.0) (2023-01-03)

**Note:** Version bump only for package @swagger-api/apidom-ls

# [0.61.0](https://github.com/swagger-api/apidom/compare/v0.60.0...v0.61.0) (2022-12-31)

**Note:** Version bump only for package @swagger-api/apidom-ls

# [0.60.0](https://github.com/swagger-api/apidom/compare/v0.59.0...v0.60.0) (2022-12-28)

**Note:** Version bump only for package @swagger-api/apidom-ls

# [0.59.0](https://github.com/swagger-api/apidom/compare/v0.58.0...v0.59.0) (2022-12-27)

### Bug Fixes

- **ls:** add lint rules for OpenAPI 3.1 Reference Object ([#2408](https://github.com/swagger-api/apidom/issues/2408)) ([785a188](https://github.com/swagger-api/apidom/commit/785a188b1d6a664ce96824689f1a1c60f3b026df))

# [0.58.0](https://github.com/swagger-api/apidom/compare/v0.57.0...v0.58.0) (2022-12-16)

### Bug Fixes

- **ls:** add lint rule for OpenAPI 3.x.y Header.content field ([#2388](https://github.com/swagger-api/apidom/issues/2388)) ([c169eb3](https://github.com/swagger-api/apidom/commit/c169eb3c5b00d2b2c6ecad34acb3304da7b3043d))
- **ls:** add lint rule for OpenAPI 3.x.y Paramter.content field ([#2387](https://github.com/swagger-api/apidom/issues/2387)) ([fe23ea8](https://github.com/swagger-api/apidom/commit/fe23ea8719f6c7bfd2296fd11525c5931c63f32f))
- **ls:** add OpenAPI 3.x lint rule for Header.examples field ([#2381](https://github.com/swagger-api/apidom/issues/2381)) ([f713710](https://github.com/swagger-api/apidom/commit/f7137104c69887d947c25167054f1b2a2cac578f))
- **ls:** add OpenAPI 3.x lint rule for Header.schema field ([#2383](https://github.com/swagger-api/apidom/issues/2383)) ([2cf185d](https://github.com/swagger-api/apidom/commit/2cf185d37983d7abcba0bbc012d2c58085cdca1e))
- **ls:** add OpenAPI 3.x lint rule for Link.operationRef field ([#2380](https://github.com/swagger-api/apidom/issues/2380)) ([10801a7](https://github.com/swagger-api/apidom/commit/10801a739b688c1a4e3e45e8c24970325390ae42))
- **ls:** add OpenAPI 3.x lint rule for Paramter.schema field ([#2382](https://github.com/swagger-api/apidom/issues/2382)) ([a9d3032](https://github.com/swagger-api/apidom/commit/a9d3032ea8d80b24df9653903e9d9eb1bcdd61c8))
- **ls:** add required fields lint for OpenAPI 3.x.y Header Object ([#2384](https://github.com/swagger-api/apidom/issues/2384)) ([b36c7ce](https://github.com/swagger-api/apidom/commit/b36c7ce2daff6f2d21066ed166f79a87ceedad6b))
- **ls:** add required fields lint for OpenAPI 3.x.y Parameter Object ([#2385](https://github.com/swagger-api/apidom/issues/2385)) ([d64c4f4](https://github.com/swagger-api/apidom/commit/d64c4f4039ab9b9c2f398d331cb246593acf3b10))
- **ls:** add required lint rule for SecurityScheme.type field ([#2386](https://github.com/swagger-api/apidom/issues/2386)) ([4c9e3dc](https://github.com/swagger-api/apidom/commit/4c9e3dcc56df67685da9fab8392d8664b730984f))
- **ls:** fix Encoding.allowReserved field completion and docs ([#2378](https://github.com/swagger-api/apidom/issues/2378)) ([3c6fc25](https://github.com/swagger-api/apidom/commit/3c6fc250cd89b5fc32d7293c130ea584360c4b9f))
- **ls:** fix Example.externalValue field completion ([#2379](https://github.com/swagger-api/apidom/issues/2379)) ([f7ea322](https://github.com/swagger-api/apidom/commit/f7ea322ac873a1d132a0d5821fa7392912a15e79))

# [0.57.0](https://github.com/swagger-api/apidom/compare/v0.56.3...v0.57.0) (2022-12-08)

### Bug Fixes

- **ls:** add lint rule for Parameter example & examples exclusivity ([#2351](https://github.com/swagger-api/apidom/issues/2351)) ([7738b71](https://github.com/swagger-api/apidom/commit/7738b71fd98ef36b834363c3f89486d683ac8c14))
- **ls:** fix completion rules for OpenAPI Media Type Object ([#2353](https://github.com/swagger-api/apidom/issues/2353)) ([5e68e0e](https://github.com/swagger-api/apidom/commit/5e68e0eefe1c41cae59e645195035968be8d2241))
- **ls:** fix links in OpenAPI Server Variable completion & docs ([#2349](https://github.com/swagger-api/apidom/issues/2349)) ([511e8ea](https://github.com/swagger-api/apidom/commit/511e8eae5f98c7e674449d51de038ae72a22c7bc))
- **ls:** fix linting of OpenAPI 3 Server Variable enum field ([#2348](https://github.com/swagger-api/apidom/issues/2348)) ([42ce28c](https://github.com/swagger-api/apidom/commit/42ce28caa02814a287413e7cba0e8774670dd792))

## [0.56.3](https://github.com/swagger-api/apidom/compare/v0.56.2...v0.56.3) (2022-11-16)

### Bug Fixes

- **ls:** fix AsyncAPI 2.x Message.traits field lint rules ([50ddda9](https://github.com/swagger-api/apidom/commit/50ddda90bbe47e702e55172537e264d7582b1978))

## [0.56.2](https://github.com/swagger-api/apidom/compare/v0.56.1...v0.56.2) (2022-11-16)

### Bug Fixes

- **ls:** fix AsyncAPI 2.x Operation.security field lint rules ([d9d60a7](https://github.com/swagger-api/apidom/commit/d9d60a75fea1fb7e764fe3eaac72e4bf21cee8f6))

## [0.56.1](https://github.com/swagger-api/apidom/compare/v0.56.0...v0.56.1) (2022-11-11)

### Bug Fixes

- **ls:** enable completion for AsyncAPI binding objects ([#2260](https://github.com/swagger-api/apidom/issues/2260)) ([821856e](https://github.com/swagger-api/apidom/commit/821856ed059d358c931068afff55eeac1bc07e53))
- **ls:** fix OpenAPI Responses patterned fields linting ([1751c8d](https://github.com/swagger-api/apidom/commit/1751c8dea7627997b00f3cee089a1774bc6e1e08))
- **ls:** fix required lints in OpenAPI ([b8046bd](https://github.com/swagger-api/apidom/commit/b8046bd6311d8d3bf5c686e8e4fd4df29b9e4084)), closes [#2264](https://github.com/swagger-api/apidom/issues/2264)

# [0.56.0](https://github.com/swagger-api/apidom/compare/v0.55.1...v0.56.0) (2022-11-04)

### Features

- **ls:** add semantic tokens ([#2244](https://github.com/swagger-api/apidom/issues/2244)) ([1a1ac80](https://github.com/swagger-api/apidom/commit/1a1ac80eba31cde1e93640be526604428a47fe53))

## [0.55.1](https://github.com/swagger-api/apidom/compare/v0.55.0...v0.55.1) (2022-11-04)

### Bug Fixes

- **ls:** fix lint rule for AsyncAPI 2.5.0 Server.tags ([#2243](https://github.com/swagger-api/apidom/issues/2243)) ([5c06ea9](https://github.com/swagger-api/apidom/commit/5c06ea93899786b6a8fcb9fe608188893727df20)), closes [#2084](https://github.com/swagger-api/apidom/issues/2084)

# [0.55.0](https://github.com/swagger-api/apidom/compare/v0.54.0...v0.55.0) (2022-11-04)

### Bug Fixes

- **ls:** remove duplicated rule in OpenAPI config ([#2220](https://github.com/swagger-api/apidom/issues/2220)) ([e51bd31](https://github.com/swagger-api/apidom/commit/e51bd3194c043f02211213b87121c6aaf3235997))

### Features

- **ls:** add AsyncAPI 2.5.0 support for all Message Binding Objects ([#2239](https://github.com/swagger-api/apidom/issues/2239)) ([d4a4dc8](https://github.com/swagger-api/apidom/commit/d4a4dc862e8d74fba834029159943a33ec7bdc29)), closes [#2086](https://github.com/swagger-api/apidom/issues/2086)
- **ls:** add AsyncAPI 2.5.0 support for Operation Binding Objects ([#2240](https://github.com/swagger-api/apidom/issues/2240)) ([81f9409](https://github.com/swagger-api/apidom/commit/81f9409f4f27dcb001d584c1ba8df8fa206a05fd)), closes [#2086](https://github.com/swagger-api/apidom/issues/2086)
- **ls:** add AsyncAPI 2.5.0 support for Server Binding Objects ([#2241](https://github.com/swagger-api/apidom/issues/2241)) ([33dfbb5](https://github.com/swagger-api/apidom/commit/33dfbb576fcd76baf8c7e991ac33c48c647af5f9)), closes [#2086](https://github.com/swagger-api/apidom/issues/2086)
- **ls:** add partial support for AsyncAPI 2.5.0 ([#2238](https://github.com/swagger-api/apidom/issues/2238)) ([368bfcf](https://github.com/swagger-api/apidom/commit/368bfcfa78aa2be7fabe69a0b08b730af77de3fa)), closes [#2084](https://github.com/swagger-api/apidom/issues/2084)

# [0.54.0](https://github.com/swagger-api/apidom/compare/v0.53.0...v0.54.0) (2022-10-28)

### Bug Fixes

- **ls:** fix docs rule for OpenAPI 3.x.y Parameter ([#2215](https://github.com/swagger-api/apidom/issues/2215)) ([3fe4a0b](https://github.com/swagger-api/apidom/commit/3fe4a0b68888957284e03064f0ed0f3f35b45e5b)), closes [#2030](https://github.com/swagger-api/apidom/issues/2030)
- **ls:** fix OpenAPI Link.requestBody field completion ([#2207](https://github.com/swagger-api/apidom/issues/2207)) ([9bd013b](https://github.com/swagger-api/apidom/commit/9bd013b1541caebfb6a0c5206f1f522ea44bcbf9)), closes [#2206](https://github.com/swagger-api/apidom/issues/2206)
- **ls:** provide OpenAPI 3.1 Request Body allowed fields lint rule ([#2216](https://github.com/swagger-api/apidom/issues/2216)) ([ae4c69b](https://github.com/swagger-api/apidom/commit/ae4c69bef8f51b1b32b067ad3d697f7e78345a49)), closes [#2061](https://github.com/swagger-api/apidom/issues/2061)
- **ls:** provide spec extension link rule for Discriminator ([#2211](https://github.com/swagger-api/apidom/issues/2211)) ([ecfeac5](https://github.com/swagger-api/apidom/commit/ecfeac514836ef89399cbe76c98ef13e41032d70)), closes [#2061](https://github.com/swagger-api/apidom/issues/2061)

### Features

- **ls:** provide completion rules for $ref field in supported objects ([#2203](https://github.com/swagger-api/apidom/issues/2203)) ([b1d13d8](https://github.com/swagger-api/apidom/commit/b1d13d80428a78a9cb3f6e9d33fe94a3c28ed963)), closes [#2202](https://github.com/swagger-api/apidom/issues/2202)
- **ls:** provide OpenAPI 3.1 Response allowed fields lint rule ([#2217](https://github.com/swagger-api/apidom/issues/2217)) ([af281ef](https://github.com/swagger-api/apidom/commit/af281ef03b0f5033c92d08938e0e4963e4512844)), closes [#2061](https://github.com/swagger-api/apidom/issues/2061)
- **ls:** provide OpenAPI 3.1 Responses docs rules ([#2218](https://github.com/swagger-api/apidom/issues/2218)) ([90da98a](https://github.com/swagger-api/apidom/commit/90da98af50185edbecfb63dcd7e4f3a22734ac93)), closes [#2063](https://github.com/swagger-api/apidom/issues/2063)
- **ls:** provide OpenAPI 3.1.0 completion rules for Responses object ([#2196](https://github.com/swagger-api/apidom/issues/2196)) ([8602f74](https://github.com/swagger-api/apidom/commit/8602f74934b9652a6b35c1c12dce9a31306f46bc))
- **ls:** provide OpenAPI 3.1.0 Example allowed fields lint rule ([#2212](https://github.com/swagger-api/apidom/issues/2212)) ([9c152ef](https://github.com/swagger-api/apidom/commit/9c152ef4f82c09da70998d621bfbcc1a9cd2d968)), closes [#2061](https://github.com/swagger-api/apidom/issues/2061)
- **ls:** provide OpenAPI 3.1.0 lint and completion for Link object ([#2195](https://github.com/swagger-api/apidom/issues/2195)) ([beb02b9](https://github.com/swagger-api/apidom/commit/beb02b9da9f004383a6fc053aa1e6e6bed3fe000))
- **ls:** provide OpenAPI 3.1.0 lint rules for Security Scheme object ([#2192](https://github.com/swagger-api/apidom/issues/2192)) ([50baf52](https://github.com/swagger-api/apidom/commit/50baf52ec9a451ef962488cc56c77a31b461f0c1))

# [0.53.0](https://github.com/swagger-api/apidom/compare/v0.52.0...v0.53.0) (2022-10-27)

### Features

- **apidom-ls:** add 'follow link' to hover for URL like strings ([487f7d3](https://github.com/swagger-api/apidom/commit/487f7d38a91b5e85e2f18ba9d27d5173daafb33a))
- **apidom-ls:** implement links service ([33347c0](https://github.com/swagger-api/apidom/commit/33347c0434627d4fc21c54e783bb84dca7c81660))
- **ls:** provide OpenAPI 3.1.0 completion for Server Variable object ([#2193](https://github.com/swagger-api/apidom/issues/2193)) ([ba5afdd](https://github.com/swagger-api/apidom/commit/ba5afddb6b46d5cd1586533f98a0df689447f1ff))

# [0.52.0](https://github.com/swagger-api/apidom/compare/v0.51.1...v0.52.0) (2022-10-25)

### Bug Fixes

- **ls:** finalize completion rules for OpenAPI Parameter ([#2176](https://github.com/swagger-api/apidom/issues/2176)) ([18d1d6a](https://github.com/swagger-api/apidom/commit/18d1d6a268ddb738743419ddd778b3d0b7fafd71)), closes [#2032](https://github.com/swagger-api/apidom/issues/2032)
- **ls:** fix error code enum consistency for OpenAPI 3.0.x ([0b0fbf3](https://github.com/swagger-api/apidom/commit/0b0fbf3669fc204fbddebd0cb161af9c6291620d)), closes [#2033](https://github.com/swagger-api/apidom/issues/2033)
- **ls:** fix OpenAPI Media Type value lint rule error code ([#2177](https://github.com/swagger-api/apidom/issues/2177)) ([9a85ca3](https://github.com/swagger-api/apidom/commit/9a85ca33ea5cc859797bd93cfd3f20afe03553d4)), closes [#2033](https://github.com/swagger-api/apidom/issues/2033)
- **ls:** fix rule errors manifesting on OpenAPI 3.0.x Petstore ([#2189](https://github.com/swagger-api/apidom/issues/2189)) ([8c76cb9](https://github.com/swagger-api/apidom/commit/8c76cb933c5eba5c450f11df219a0164baa999a4)), closes [#2187](https://github.com/swagger-api/apidom/issues/2187)
- **ls:** make OpenAPI OAuth Flow completion rules consistent ([#2179](https://github.com/swagger-api/apidom/issues/2179)) ([7f45be7](https://github.com/swagger-api/apidom/commit/7f45be7d4edba9b5ccdb31f538f90ecf609af7eb)), closes [#2032](https://github.com/swagger-api/apidom/issues/2032)

### Features

- **ls:** add completion rules for Encoding.style fiel ([#2178](https://github.com/swagger-api/apidom/issues/2178)) ([cfa11df](https://github.com/swagger-api/apidom/commit/cfa11dfcf95ac0303ba73af171761f6efeed83d2)), closes [#2032](https://github.com/swagger-api/apidom/issues/2032)
- **ls:** finalize support for OpenAPI 3.0.x Spec Ext lint rules ([434bd92](https://github.com/swagger-api/apidom/commit/434bd9206e03bf9223d7fd12f589c18d33385d90)), closes [#2033](https://github.com/swagger-api/apidom/issues/2033)
- **ls:** OpenAPI 3.x.x mutually exclusive lint rule for Media Type ([#2168](https://github.com/swagger-api/apidom/issues/2168)) ([de53a13](https://github.com/swagger-api/apidom/commit/de53a136b064792b2f6771a770cdf96ec895f1b5))
- **ls:** provide OpenAPI 3.0.x Header completion rules ([cee0d9c](https://github.com/swagger-api/apidom/commit/cee0d9cd3148b468c6d0b7b378f20c2c041ff6ea)), closes [#2032](https://github.com/swagger-api/apidom/issues/2032)
- **ls:** provide OpenAPI 3.0.x Header docs rules ([c7b8ced](https://github.com/swagger-api/apidom/commit/c7b8ced06fd28df20926834f812ac3980bb1fc92)), closes [#2031](https://github.com/swagger-api/apidom/issues/2031)
- **ls:** provide OpenAPI 3.0.x Header lint rules ([af07fd3](https://github.com/swagger-api/apidom/commit/af07fd3b6bb4a0ab75edd7406e569e7a2bb6501c)), closes [#2033](https://github.com/swagger-api/apidom/issues/2033)
- **ls:** provide OpenAPI 3.0.x Link completion rules ([8ad4efd](https://github.com/swagger-api/apidom/commit/8ad4efddc995cb278bff412fef5a82ed948fd86c)), closes [#2032](https://github.com/swagger-api/apidom/issues/2032)
- **ls:** provide OpenAPI 3.0.x Link docs rules ([5912364](https://github.com/swagger-api/apidom/commit/59123642fe531fb02977edec1a99860f0382294e)), closes [#2031](https://github.com/swagger-api/apidom/issues/2031)
- **ls:** provide OpenAPI 3.0.x Link lint rules ([98b0c8b](https://github.com/swagger-api/apidom/commit/98b0c8b9691046e027d812fedf205da72e2c4373)), closes [#2033](https://github.com/swagger-api/apidom/issues/2033)
- **ls:** provide OpenAPI 3.0.x Reference lint rules ([#2185](https://github.com/swagger-api/apidom/issues/2185)) ([c7005b8](https://github.com/swagger-api/apidom/commit/c7005b8d1b805611bfc2298d70ca067c1e91ef0f)), closes [#2033](https://github.com/swagger-api/apidom/issues/2033)
- **ls:** provide OpenAPI 3.0.x Response completion rules ([409fbd1](https://github.com/swagger-api/apidom/commit/409fbd1be114649a7c158251eae4fcef834078bd)), closes [#2032](https://github.com/swagger-api/apidom/issues/2032)
- **ls:** provide OpenAPI 3.0.x Response docs rules ([44f5e6c](https://github.com/swagger-api/apidom/commit/44f5e6cc906d6d1dd47023a79f1c347a7b942c7a)), closes [#2031](https://github.com/swagger-api/apidom/issues/2031)
- **ls:** provide OpenAPI 3.0.x Response lint rules ([fb69f9d](https://github.com/swagger-api/apidom/commit/fb69f9dd2d35a737bb1100af30d6e52bf05b57ba)), closes [#2033](https://github.com/swagger-api/apidom/issues/2033)
- **ls:** provide OpenAPI 3.1.0 completion rules for Encoding object ([#2169](https://github.com/swagger-api/apidom/issues/2169)) ([a4618af](https://github.com/swagger-api/apidom/commit/a4618af698b668c925d00d9fc223095f05518f34))
- **ls:** provide OpenAPI 3.1.0 completion rules for OAuth Flow ([#2173](https://github.com/swagger-api/apidom/issues/2173)) ([7e74e6a](https://github.com/swagger-api/apidom/commit/7e74e6a2c3a309ae104461bbe80fbef30865a9fe))
- **ls:** provide OpenAPI 3.1.0 completion rules for OAuth Flows ([#2172](https://github.com/swagger-api/apidom/issues/2172)) ([081e8aa](https://github.com/swagger-api/apidom/commit/081e8aa1a8052e14581dd647ecd30d7f5be8e296))
- **ls:** provide OpenAPI 3.1.0 completion rules for Parameter object ([#2167](https://github.com/swagger-api/apidom/issues/2167)) ([4b437ff](https://github.com/swagger-api/apidom/commit/4b437ff1496e9320c94fdfc7e1409b504e24634c))
- **ls:** provide OpenAPI 3.1.0 completion rules for Tag object ([#2170](https://github.com/swagger-api/apidom/issues/2170)) ([a4fb397](https://github.com/swagger-api/apidom/commit/a4fb397927d093dedc4b3199626f755816a241a9))
- **ls:** provide OpenAPI 3.1.0 completion rules for XML object ([#2171](https://github.com/swagger-api/apidom/issues/2171)) ([8dda533](https://github.com/swagger-api/apidom/commit/8dda5331796f149a134c40fee119ae138643b5c2))

## [0.51.1](https://github.com/swagger-api/apidom/compare/v0.51.0...v0.51.1) (2022-10-21)

**Note:** Version bump only for package @swagger-api/apidom-ls

# [0.51.0](https://github.com/swagger-api/apidom/compare/v0.50.0...v0.51.0) (2022-10-20)

### Bug Fixes

- **apidom-ls:** fix OAS example value/externalValue rule ([4b3b527](https://github.com/swagger-api/apidom/commit/4b3b527e03f4cf752ede5785fbdf8d373479a99d))
- **ls:** duplicate completion rules for OpenAPI 3.1.0 Path Item ([#2151](https://github.com/swagger-api/apidom/issues/2151)) ([d476aef](https://github.com/swagger-api/apidom/commit/d476aeffe0fe1474646dcfd4de1bb1fd39d8f151))
- **ls:** finalize rules for OpenAPI License object ([#2155](https://github.com/swagger-api/apidom/issues/2155)) ([9d37af4](https://github.com/swagger-api/apidom/commit/9d37af4c4dde41028bedb8eb8ce6e4a14745a3dd))
- **ls:** finalize rules for OpenAPI Server object ([#2156](https://github.com/swagger-api/apidom/issues/2156)) ([6b4abbf](https://github.com/swagger-api/apidom/commit/6b4abbf1349cc153ad0da31fd7e2bda4b41600e6))
- **ls:** fix OpenAPI 3.x.y Example Obj mutually exclusive lint rule ([#2146](https://github.com/swagger-api/apidom/issues/2146)) ([fd654e6](https://github.com/swagger-api/apidom/commit/fd654e6ed1b5262938dd99ea581311562f6246e5)), closes [#2141](https://github.com/swagger-api/apidom/issues/2141)

### Features

- **ls:** introduce handling Referece Object for OpenAPI ([#2157](https://github.com/swagger-api/apidom/issues/2157)) ([8636086](https://github.com/swagger-api/apidom/commit/8636086eb593337cb059425e458765a3f8d3a21a))
- **ls:** OpenAPI 3.1.0 lint rules for Server object ([#2149](https://github.com/swagger-api/apidom/issues/2149)) ([ae9ec4f](https://github.com/swagger-api/apidom/commit/ae9ec4f89a5e2afacc64575ef7151ad0ee38d404))
- **ls:** provide OpenAPI 3.0.x Discriminator completion rules ([f6a972f](https://github.com/swagger-api/apidom/commit/f6a972f4dd973bc1acf40a56ed659b445c5c0cef)), closes [#2032](https://github.com/swagger-api/apidom/issues/2032)
- **ls:** provide OpenAPI 3.0.x Discriminator docs rules ([fb7fd19](https://github.com/swagger-api/apidom/commit/fb7fd19ff7c26fbf71d723dbf234a43c9ff4011e)), closes [#2031](https://github.com/swagger-api/apidom/issues/2031)
- **ls:** provide OpenAPI 3.0.x OAuth Flow completion rules ([5130e76](https://github.com/swagger-api/apidom/commit/5130e76aedd4f7c7c38d18ac81a8824dc6a7e610)), closes [#2032](https://github.com/swagger-api/apidom/issues/2032)
- **ls:** provide OpenAPI 3.0.x OAuth Flow docs rules ([26a895d](https://github.com/swagger-api/apidom/commit/26a895dec70bdf151df85a8e417ca521568844b4)), closes [#2031](https://github.com/swagger-api/apidom/issues/2031)
- **ls:** provide OpenAPI 3.0.x OAuth Flow lint rules ([bcd12a7](https://github.com/swagger-api/apidom/commit/bcd12a7d0dd180be25f0cbb97fc13c80d97c330b)), closes [#2033](https://github.com/swagger-api/apidom/issues/2033)
- **ls:** provide OpenAPI 3.0.x Security Scheme completion rules ([649638e](https://github.com/swagger-api/apidom/commit/649638e7f5634ece5c59d68855d2baacd23932b3)), closes [#2032](https://github.com/swagger-api/apidom/issues/2032)
- **ls:** provide OpenAPI 3.0.x Security Scheme docs rules ([6177e7d](https://github.com/swagger-api/apidom/commit/6177e7dc95f378bdbd2a3e718a94967a8c0e0386)), closes [#2031](https://github.com/swagger-api/apidom/issues/2031)
- **ls:** provide OpenAPI 3.0.x Security Scheme lint rules ([8582d4c](https://github.com/swagger-api/apidom/commit/8582d4c2f447abbb39df5ac58ce57e6fb54ed9ca)), closes [#2033](https://github.com/swagger-api/apidom/issues/2033)
- **ls:** provide OpenAPI 3.0.x XML completion rules ([7bebafe](https://github.com/swagger-api/apidom/commit/7bebafe79bd854285651a938badcb56f7abebb77)), closes [#2032](https://github.com/swagger-api/apidom/issues/2032)
- **ls:** provide OpenAPI 3.0.x XML docs rules ([6446de3](https://github.com/swagger-api/apidom/commit/6446de387f3775be5ca69fa8fac38c6d25d33619)), closes [#2031](https://github.com/swagger-api/apidom/issues/2031)
- **ls:** provide OpenAPI 3.0.x XML lint rules ([f073907](https://github.com/swagger-api/apidom/commit/f073907624b3e15af25d18882883d7a73788c66d)), closes [#2033](https://github.com/swagger-api/apidom/issues/2033)
- **ls:** provide OpenAPI 3.1.0 completion rules for Operation object ([#2152](https://github.com/swagger-api/apidom/issues/2152)) ([4f414ef](https://github.com/swagger-api/apidom/commit/4f414ef78be4b645ac5d57e8bbe757cb8ebdcc76))
- **ls:** provide OpenAPI 3.1.0 completion rules for Path Item object ([#2150](https://github.com/swagger-api/apidom/issues/2150)) ([e78665e](https://github.com/swagger-api/apidom/commit/e78665ed4419d822ef35718322b3fea14e2bb176))
- **ls:** provide OpenAPI 3.1.0 License lint rules ([#2136](https://github.com/swagger-api/apidom/issues/2136)) ([20a09d5](https://github.com/swagger-api/apidom/commit/20a09d5f778947df0b7f490290381a8c56c1e15c))
- **ls:** provider OpenAPI 3.0.x Discriminator lint rules ([40c9009](https://github.com/swagger-api/apidom/commit/40c9009753d39c8c2c482ea3c165c77c1c5cfb64)), closes [#2033](https://github.com/swagger-api/apidom/issues/2033)
- **reference:** add support for file allow list for FileResolver ([#2159](https://github.com/swagger-api/apidom/issues/2159)) ([e1b914c](https://github.com/swagger-api/apidom/commit/e1b914cd6ed49302d0848647c9e1e9b1128ca560)), closes [#2154](https://github.com/swagger-api/apidom/issues/2154)

### BREAKING CHANGES

- **reference:** FileResolver will not detect and process any local file
  unless explicitly allowed by fileAllowList option

# [0.50.0](https://github.com/swagger-api/apidom/compare/v0.49.0...v0.50.0) (2022-10-13)

### Features

- **ls:** provide OpenAPI 3.0.x Callback docs rules ([5f03938](https://github.com/swagger-api/apidom/commit/5f03938a70f0be3b5c7cad7d94ad23465cb94b7c)), closes [#2031](https://github.com/swagger-api/apidom/issues/2031)
- **ls:** provide OpenAPI 3.0.x Callback lint rules ([24b1927](https://github.com/swagger-api/apidom/commit/24b19271f0f6565021959c6f4e3543145d254122)), closes [#2033](https://github.com/swagger-api/apidom/issues/2033)
- **ls:** provide OpenAPI 3.0.x Example completion rules ([e9add32](https://github.com/swagger-api/apidom/commit/e9add3217161178c170fc07d4ca711ad6ab6bb91)), closes [#2032](https://github.com/swagger-api/apidom/issues/2032)
- **ls:** provide OpenAPI 3.0.x Example docs rules ([450ed12](https://github.com/swagger-api/apidom/commit/450ed1254fbfc83c4cd664092aad7aa264a12ac2)), closes [#2031](https://github.com/swagger-api/apidom/issues/2031)
- **ls:** provide OpenAPI 3.0.x Example lint rules ([a48f9d6](https://github.com/swagger-api/apidom/commit/a48f9d6d481e39ae465684b6cb4c3650d56c8064)), closes [#2033](https://github.com/swagger-api/apidom/issues/2033)
- **ls:** provide OpenAPI 3.0.x OAuth Flows completion rules ([2fdf149](https://github.com/swagger-api/apidom/commit/2fdf149c78c7a2131da9c9089168c9c7d3abadfc)), closes [#2032](https://github.com/swagger-api/apidom/issues/2032)
- **ls:** provide OpenAPI 3.0.x OAuth Flows docs rules ([abb678d](https://github.com/swagger-api/apidom/commit/abb678ddc61c4509cdff1bb031a50dbf029ad3b8)), closes [#2031](https://github.com/swagger-api/apidom/issues/2031)
- **ls:** provide OpenAPI 3.0.x OAuth Flows lint rules ([ba8ac26](https://github.com/swagger-api/apidom/commit/ba8ac2667c31a7fed4437eb2213e96f92f88b6bb)), closes [#2033](https://github.com/swagger-api/apidom/issues/2033)

# [0.49.0](https://github.com/swagger-api/apidom/compare/v0.48.0...v0.49.0) (2022-10-11)

### Bug Fixes

- **ls:** fix error codes consistency ([#2126](https://github.com/swagger-api/apidom/issues/2126)) ([ba83758](https://github.com/swagger-api/apidom/commit/ba8375894afc8372b76b2915cc314ecdf69ff48d))
- **ls:** fix wrongly assigned codes ([#2112](https://github.com/swagger-api/apidom/issues/2112)) ([0b52998](https://github.com/swagger-api/apidom/commit/0b529983795feabbcb6aaa89769c3d7fbe664c40)), closes [#2109](https://github.com/swagger-api/apidom/issues/2109)

### Features

- **ls:** OpenAPI 3.1.0 lint rules for components object ([#2118](https://github.com/swagger-api/apidom/issues/2118)) ([975e12e](https://github.com/swagger-api/apidom/commit/975e12e93141897c1ae95ae372037f57a7f83832))
- **ls:** provide OpenAPI 3.0.x Encoding completion rules ([93ba50a](https://github.com/swagger-api/apidom/commit/93ba50a439ad09761a9df5d429c409acd817f012)), closes [#2032](https://github.com/swagger-api/apidom/issues/2032)
- **ls:** provide OpenAPI 3.0.x Encoding docs rules ([4efb053](https://github.com/swagger-api/apidom/commit/4efb0530e407d400e1723f678a0259e233a5119c)), closes [#2031](https://github.com/swagger-api/apidom/issues/2031)
- **ls:** provide OpenAPI 3.0.x Encoding lint rules ([6e2e6c1](https://github.com/swagger-api/apidom/commit/6e2e6c1839577afc0dfb355b75e1de85ddfa06fc)), closes [#2033](https://github.com/swagger-api/apidom/issues/2033)
- **ls:** provide OpenAPI 3.0.x Media Type completion rules ([064ddb8](https://github.com/swagger-api/apidom/commit/064ddb856c16698c50d1178c855db8682d2d0fbf)), closes [#2031](https://github.com/swagger-api/apidom/issues/2031)
- **ls:** provide OpenAPI 3.0.x Media Type docs rules ([1c6252b](https://github.com/swagger-api/apidom/commit/1c6252b3e283a9d3f59b85d485328be0e8bbfd21)), closes [#2031](https://github.com/swagger-api/apidom/issues/2031)
- **ls:** provide OpenAPI 3.0.x Media Type lint rules ([a780671](https://github.com/swagger-api/apidom/commit/a78067155d306c14ec91645ceca019febc5e22a4)), closes [#2033](https://github.com/swagger-api/apidom/issues/2033)
- **ls:** provide OpenAPI 3.0.x Parameter completion rules ([7748282](https://github.com/swagger-api/apidom/commit/7748282459057e7af5fc30c54f7870ed80ec1ef8)), closes [#2032](https://github.com/swagger-api/apidom/issues/2032)
- **ls:** provide OpenAPI 3.0.x Parameter docs rules ([2e9c76e](https://github.com/swagger-api/apidom/commit/2e9c76eda5c3d57c4c5acf348cb54e0d497ed849)), closes [#2031](https://github.com/swagger-api/apidom/issues/2031)
- **ls:** provide OpenAPI 3.0.x Parameter lint rules ([cd1afda](https://github.com/swagger-api/apidom/commit/cd1afdadb2bc34ce9313650ad31599b0fd09f29e)), closes [#2033](https://github.com/swagger-api/apidom/issues/2033)
- **ls:** provide OpenAPI 3.0.x Request Body completion rules ([7cc063b](https://github.com/swagger-api/apidom/commit/7cc063b1e3ffceed6835c5b3a5d07c8c4ee00f54)), closes [#2032](https://github.com/swagger-api/apidom/issues/2032)
- **ls:** provide OpenAPI 3.0.x Request Body docs rules ([18693e6](https://github.com/swagger-api/apidom/commit/18693e61f7f11df9efce30119a09e84ba896d57c)), closes [#2031](https://github.com/swagger-api/apidom/issues/2031)
- **ls:** provide OpenAPI 3.0.x Request Body lint rules ([c4ea27d](https://github.com/swagger-api/apidom/commit/c4ea27dfdf0815a737f03dc2a607249514387cb5)), closes [#2033](https://github.com/swagger-api/apidom/issues/2033)

# [0.48.0](https://github.com/swagger-api/apidom/compare/v0.47.0...v0.48.0) (2022-10-04)

### Features

- **ls:** provide OpenAPI 3.0.x Operation completion rules ([636ff7f](https://github.com/swagger-api/apidom/commit/636ff7f1d78ebdd815968346f0d3bceafe4d613c)), closes [#2032](https://github.com/swagger-api/apidom/issues/2032)
- **ls:** provide OpenAPI 3.0.x Operation docs rules ([d0cf059](https://github.com/swagger-api/apidom/commit/d0cf05947bc08db5b2903134da7e24ed35438f56)), closes [#2031](https://github.com/swagger-api/apidom/issues/2031)
- **ls:** provide OpenAPI 3.0.x Operation lint rules ([1aa4f8c](https://github.com/swagger-api/apidom/commit/1aa4f8c33ff76bc4d2160685de9fca7981e4c128)), closes [#2033](https://github.com/swagger-api/apidom/issues/2033)
- **ls:** provide OpenAPI 3.0.x Path Item completion rules ([af0bac5](https://github.com/swagger-api/apidom/commit/af0bac5f6248e9c975f7c7920905bc09fb12bb8c)), closes [#2032](https://github.com/swagger-api/apidom/issues/2032)
- **ls:** provide OpenAPI 3.0.x Path Item docs rules ([3bfac0b](https://github.com/swagger-api/apidom/commit/3bfac0b806ab5faea3e2b61708517a77e6c35cf9)), closes [#2031](https://github.com/swagger-api/apidom/issues/2031)
- **ls:** provide OpenAPI 3.0.x Path Item lint rules ([4156ee4](https://github.com/swagger-api/apidom/commit/4156ee4376bcf6269fc8b312c5782836ec8736c2)), closes [#2033](https://github.com/swagger-api/apidom/issues/2033)
- **ls:** provide OpenAPI 3.0.x Paths docs rules ([e5d6f14](https://github.com/swagger-api/apidom/commit/e5d6f14c007f759d0be08521fa03b097f06ea1df)), closes [#2031](https://github.com/swagger-api/apidom/issues/2031)
- **ls:** provide OpenAPI 3.0.x Paths lint rules ([c08ca27](https://github.com/swagger-api/apidom/commit/c08ca27876ccb5b958d9c7cd5b876b603378d0e5)), closes [#2033](https://github.com/swagger-api/apidom/issues/2033)
- **ls:** provide OpenAPI 3.0.x Responses completion rules ([ee0529c](https://github.com/swagger-api/apidom/commit/ee0529cd4e157dabba8b00367e3492e3c7b83917)), closes [#2032](https://github.com/swagger-api/apidom/issues/2032)
- **ls:** provide OpenAPI 3.0.x Responses docs rules ([400fa1b](https://github.com/swagger-api/apidom/commit/400fa1be1b2db9ff6684b156aeb6b6be7874bee1)), closes [#2031](https://github.com/swagger-api/apidom/issues/2031)
- **ls:** provide OpenAPI 3.0.x Responses lint rules ([4edd438](https://github.com/swagger-api/apidom/commit/4edd438550e901dbbd0231a497bc4f8f9ac11e67)), closes [#2033](https://github.com/swagger-api/apidom/issues/2033)
- **ls:** provide OpenAPI 3.0.x Security Requirement docs rules ([68a47f7](https://github.com/swagger-api/apidom/commit/68a47f7eaa5a5624a51c6ddd3a52d8f277791542)), closes [#2031](https://github.com/swagger-api/apidom/issues/2031)
- **ls:** provide OpenAPI 3.0.x Security Requirement lint rules ([3ffe3ab](https://github.com/swagger-api/apidom/commit/3ffe3ab8b2dfa1426627fb8d1b346d5dc75b2c45)), closes [#2033](https://github.com/swagger-api/apidom/issues/2033)
- **ls:** provide OpenAPI 3.0.x Server completion rules ([b5ceb7f](https://github.com/swagger-api/apidom/commit/b5ceb7f50a67e360b59f2970c12d53390fb51ae2)), closes [#2032](https://github.com/swagger-api/apidom/issues/2032)
- **ls:** provide OpenAPI 3.0.x Server docs rules ([#2087](https://github.com/swagger-api/apidom/issues/2087)) ([36e311e](https://github.com/swagger-api/apidom/commit/36e311eec7a99bd409fe2cae71f25086a108994a)), closes [#2031](https://github.com/swagger-api/apidom/issues/2031)
- **ls:** provide OpenAPI 3.0.x Server lint rules ([b0cf458](https://github.com/swagger-api/apidom/commit/b0cf4586c9f674b6d518f9bf90b56fbcb3dacf48)), closes [#2033](https://github.com/swagger-api/apidom/issues/2033)
- **ls:** provide OpenAPI 3.0.x Server Variable completion rules ([4470ae7](https://github.com/swagger-api/apidom/commit/4470ae782bdf16e623b00b2641e7bf50fa7fb644)), closes [#2032](https://github.com/swagger-api/apidom/issues/2032)
- **ls:** provide OpenAPI 3.0.x Server Variable docs rules ([#2088](https://github.com/swagger-api/apidom/issues/2088)) ([144e27a](https://github.com/swagger-api/apidom/commit/144e27a1a27038a87a59bc3c5b919be7077b64b9)), closes [#2031](https://github.com/swagger-api/apidom/issues/2031)
- **ls:** provide OpenAPI 3.0.x Server Variable lint rules ([01cd0e7](https://github.com/swagger-api/apidom/commit/01cd0e77b5a0580d7e62d01466a882f0a6f6a3d4)), closes [#2033](https://github.com/swagger-api/apidom/issues/2033)
- **ls:** provide OpenAPI 3.0.x Tag completion rules ([2ef49b4](https://github.com/swagger-api/apidom/commit/2ef49b4e85218abd0552813df28fd9b1971ccb6f)), closes [#2032](https://github.com/swagger-api/apidom/issues/2032)
- **ls:** provide OpenAPI 3.0.x Tag docs rules ([d576d8d](https://github.com/swagger-api/apidom/commit/d576d8dc5929254b348a94124845522df20c7dc1)), closes [#2031](https://github.com/swagger-api/apidom/issues/2031)
- **ls:** provide OpenAPI 3.0.x Tag lint rules ([de3b887](https://github.com/swagger-api/apidom/commit/de3b8875e01cf7668fc88d348ec4767bc0a027ea)), closes [#2033](https://github.com/swagger-api/apidom/issues/2033)

# [0.47.0](https://github.com/swagger-api/apidom/compare/v0.46.0...v0.47.0) (2022-09-29)

### Features

- **ls:** docs for OpenApi 3.1.0 Discriminator object ([#2051](https://github.com/swagger-api/apidom/issues/2051)) ([c7d699e](https://github.com/swagger-api/apidom/commit/c7d699e80d677696763010645f8697a9174050c8))
- **ls:** provide OpenAPI 3.0.x Components completion rules ([d6178b4](https://github.com/swagger-api/apidom/commit/d6178b49a6163c72ff90d4f5b7bced63cb809408)), closes [#2032](https://github.com/swagger-api/apidom/issues/2032)
- **ls:** provide OpenAPI 3.0.x Components docs rules ([#2059](https://github.com/swagger-api/apidom/issues/2059)) ([039cdee](https://github.com/swagger-api/apidom/commit/039cdee66792093cfcbb7dd261a11df9b49aaccf)), closes [#2031](https://github.com/swagger-api/apidom/issues/2031)
- **ls:** provide OpenAPI 3.0.x Components lint rules ([d59ea33](https://github.com/swagger-api/apidom/commit/d59ea336d34f0bfb4a2c73287e8c8f1365507f4f)), closes [#2033](https://github.com/swagger-api/apidom/issues/2033)
- **ls:** provide OpenAPI 3.0.x Contact lint rules ([d06741e](https://github.com/swagger-api/apidom/commit/d06741eb7f8bceffad77faa1a35371625c3fcff0)), closes [#2033](https://github.com/swagger-api/apidom/issues/2033)
- **ls:** provide OpenAPI 3.0.x External Docs completion rules ([b72f4a9](https://github.com/swagger-api/apidom/commit/b72f4a973599a2c2fe541542e217da2c513c395f)), closes [#2032](https://github.com/swagger-api/apidom/issues/2032)
- **ls:** provide OpenAPI 3.0.x External Docs docs rules ([#2058](https://github.com/swagger-api/apidom/issues/2058)) ([7a83aa3](https://github.com/swagger-api/apidom/commit/7a83aa32185730f83f5954212f7d991b0b0457e1)), closes [#2031](https://github.com/swagger-api/apidom/issues/2031)
- **ls:** provide OpenAPI 3.0.x External Docs lint rules ([b281f76](https://github.com/swagger-api/apidom/commit/b281f76ac61de33e811056d8f374e71d88f32456)), closes [#2033](https://github.com/swagger-api/apidom/issues/2033)
- **ls:** provide OpenAPI 3.0.x Info completion rules ([89b80cd](https://github.com/swagger-api/apidom/commit/89b80cd4a870f7ccc412f8dc1b0f1507589cd739)), closes [#2032](https://github.com/swagger-api/apidom/issues/2032)
- **ls:** provide OpenAPI 3.0.x Info docs rules ([#2057](https://github.com/swagger-api/apidom/issues/2057)) ([e41e04e](https://github.com/swagger-api/apidom/commit/e41e04e061c3bb0d625d35402dd4a2902f302060)), closes [#2031](https://github.com/swagger-api/apidom/issues/2031)
- **ls:** provide OpenAPI 3.0.x Info lint rules ([#2077](https://github.com/swagger-api/apidom/issues/2077)) ([4427c28](https://github.com/swagger-api/apidom/commit/4427c283ab96f973c8a84751e18d58baf7ea2758)), closes [#2033](https://github.com/swagger-api/apidom/issues/2033)
- **ls:** provide OpenAPI 3.0.x License completion rules ([fca7cdf](https://github.com/swagger-api/apidom/commit/fca7cdfcf7b672eba2b4b0a5f611438097cf650d)), closes [#2032](https://github.com/swagger-api/apidom/issues/2032)
- **ls:** provide OpenAPI 3.0.x License docs rules ([#2054](https://github.com/swagger-api/apidom/issues/2054)) ([bf0056c](https://github.com/swagger-api/apidom/commit/bf0056ce9b87e722435616e97fa7c48af5400d1d)), closes [#2031](https://github.com/swagger-api/apidom/issues/2031)
- **ls:** provide OpenAPI 3.0.x License lint rules ([b8fac59](https://github.com/swagger-api/apidom/commit/b8fac59a82789179faddc261efdeb79610995787)), closes [#2033](https://github.com/swagger-api/apidom/issues/2033)
- **ls:** provide OpenAPI 3.0.x OpenAPI completion rules ([276ea47](https://github.com/swagger-api/apidom/commit/276ea47a4ebe73d4a123984589d2e1e762e8dda5)), closes [#2032](https://github.com/swagger-api/apidom/issues/2032)
- **ls:** provide OpenAPI 3.0.x OpenAPI docs rules ([#2060](https://github.com/swagger-api/apidom/issues/2060)) ([e62306c](https://github.com/swagger-api/apidom/commit/e62306cb49d1a43a5d07f585f18fb9c3a7060dd7)), closes [#2031](https://github.com/swagger-api/apidom/issues/2031)
- **ls:** provide OpenAPI 3.0.x OpenAPI lint rules ([09248f6](https://github.com/swagger-api/apidom/commit/09248f68c65129425a8224bcda450399c91ec25d)), closes [#2033](https://github.com/swagger-api/apidom/issues/2033)
- **ls:** recognize OpenAPI 3.0.x definitions ([#2056](https://github.com/swagger-api/apidom/issues/2056)) ([86ca487](https://github.com/swagger-api/apidom/commit/86ca487b1e2f4b677fda30f51ba89fb803dd3481)), closes [#2030](https://github.com/swagger-api/apidom/issues/2030)

# [0.46.0](https://github.com/swagger-api/apidom/compare/v0.45.0...v0.46.0) (2022-09-21)

### Bug Fixes

- **ls:** add heading link to OpenApi 3.1.0 XML object docs ([#2050](https://github.com/swagger-api/apidom/issues/2050)) ([1bc927e](https://github.com/swagger-api/apidom/commit/1bc927e8772711fdbd90f731ff4f330fc6946a3e))
- **ls:** add heading links for various OpenApi 3.1.0 objects ([#2037](https://github.com/swagger-api/apidom/issues/2037)) ([35a02e3](https://github.com/swagger-api/apidom/commit/35a02e37f7a6d21a828208d4fbd267a29ed1089b))
- **ls:** fix docs rules for various OpenAPI 3.1.0 objects ([#2022](https://github.com/swagger-api/apidom/issues/2022)) ([b6ec0bc](https://github.com/swagger-api/apidom/commit/b6ec0bc0b4f12cc6923ee547c2e019587385f092))
- **ls:** fixes inconsistencies in OpenAPI 3.1.0 docs rules ([#2028](https://github.com/swagger-api/apidom/issues/2028)) ([385d7db](https://github.com/swagger-api/apidom/commit/385d7dbea86a8a54e80a4df5aef25c4b8f360134))
- **ls:** remove duplicate externalDocs target in documentation ([#2020](https://github.com/swagger-api/apidom/issues/2020)) ([bdf2aa3](https://github.com/swagger-api/apidom/commit/bdf2aa3796fd481f1a49ecbf021e8e0643c6d0d2))

### Features

- **ls:** additional topics for OpenApi 3.1.0 Media Type object docs ([#2048](https://github.com/swagger-api/apidom/issues/2048)) ([9b22037](https://github.com/swagger-api/apidom/commit/9b22037f19c9dc0ac033fbb14dcbc8cda26cf6bc))
- **ls:** docs for OpenApi 3.1.0 Components object ([#2025](https://github.com/swagger-api/apidom/issues/2025)) ([1bfce50](https://github.com/swagger-api/apidom/commit/1bfce505b118b605a59583fffa988e046562ad4c))
- **ls:** docs for OpenApi 3.1.0 Encoding object ([#2038](https://github.com/swagger-api/apidom/issues/2038)) ([1d59c16](https://github.com/swagger-api/apidom/commit/1d59c16a9e990872728ac0266ad9cc09a16e61d1))
- **ls:** docs for OpenApi 3.1.0 Media Type object ([#2040](https://github.com/swagger-api/apidom/issues/2040)) ([9a39a5e](https://github.com/swagger-api/apidom/commit/9a39a5e4530a433d5d71aaeb58aa1379a427fae6))
- **ls:** docs for OpenApi 3.1.0 OAuth Flow and OAuth Flows objects ([#2011](https://github.com/swagger-api/apidom/issues/2011)) ([ab25a59](https://github.com/swagger-api/apidom/commit/ab25a597f9fbf082f37274598e1ff5f23e2fece0))
- **ls:** docs for OpenApi 3.1.0 Request Body object ([#2027](https://github.com/swagger-api/apidom/issues/2027)) ([99e5e84](https://github.com/swagger-api/apidom/commit/99e5e841028f64b56520257cf9d502da17fe0827))
- **ls:** docs for OpenApi 3.1.0 Security Requirement object ([#2021](https://github.com/swagger-api/apidom/issues/2021)) ([4f35c71](https://github.com/swagger-api/apidom/commit/4f35c71495977a19ca40c222f2a68c4916e08619))
- **ls:** docs for OpenApi 3.1.0 Security Scheme object ([#2018](https://github.com/swagger-api/apidom/issues/2018)) ([1e983af](https://github.com/swagger-api/apidom/commit/1e983af54f2682fec46094b599921e98eac1b61a)), closes [#1993](https://github.com/swagger-api/apidom/issues/1993)
- **ls:** docs for OpenApi 3.1.0 XML object ([#2049](https://github.com/swagger-api/apidom/issues/2049)) ([ff23fce](https://github.com/swagger-api/apidom/commit/ff23fce57a818609fb7ea4585b6482b1f1dd0a80))
- **ls:** oas31 docs for callback object ([#2009](https://github.com/swagger-api/apidom/issues/2009)) ([57f728f](https://github.com/swagger-api/apidom/commit/57f728faf9d915267a956527edbb56fe07d11b9c))
- **ls:** oas31 documentation for OpenAPI 3.1.0 Link Object ([#2010](https://github.com/swagger-api/apidom/issues/2010)) ([ba6bf7c](https://github.com/swagger-api/apidom/commit/ba6bf7cf6172706327ee43ffc4e76857ca1d2eeb))
- **ls:** provide OpenAPI 3.0.x Contact docs rules ([#2034](https://github.com/swagger-api/apidom/issues/2034)) ([615df09](https://github.com/swagger-api/apidom/commit/615df09de74f9e5ea1e4fa2474037abe0fbd529f)), closes [#2031](https://github.com/swagger-api/apidom/issues/2031)

# [0.45.0](https://github.com/swagger-api/apidom/compare/v0.44.0...v0.45.0) (2022-09-13)

### Bug Fixes

- **ls:** add targetSpecs for header object ([#2002](https://github.com/swagger-api/apidom/issues/2002)) ([df3fdd2](https://github.com/swagger-api/apidom/commit/df3fdd29642ba19e3513586182730a8314f01a75))

### Features

- **ls:** add documentation for OpenAPI 3.1.0 Header Object field ([#2008](https://github.com/swagger-api/apidom/issues/2008)) ([af30127](https://github.com/swagger-api/apidom/commit/af3012754c860a302fb604a7832e3d0133ea376c)), closes [#1992](https://github.com/swagger-api/apidom/issues/1992)
- **ls:** add documentation rules for OpenAPI 3.1.0 ([#1946](https://github.com/swagger-api/apidom/issues/1946)) ([e358892](https://github.com/swagger-api/apidom/commit/e3588923e6bb98d616d1d29db5e17496853bc752)), closes [#1975](https://github.com/swagger-api/apidom/issues/1975) [#1976](https://github.com/swagger-api/apidom/issues/1976) [#1977](https://github.com/swagger-api/apidom/issues/1977) [#1978](https://github.com/swagger-api/apidom/issues/1978) [#1979](https://github.com/swagger-api/apidom/issues/1979) [#1980](https://github.com/swagger-api/apidom/issues/1980) [#1981](https://github.com/swagger-api/apidom/issues/1981) [#1982](https://github.com/swagger-api/apidom/issues/1982) [#1983](https://github.com/swagger-api/apidom/issues/1983) [#1984](https://github.com/swagger-api/apidom/issues/1984) [#1985](https://github.com/swagger-api/apidom/issues/1985)
- **ls:** oas31 docs for example object ([#2004](https://github.com/swagger-api/apidom/issues/2004)) ([f203bb6](https://github.com/swagger-api/apidom/commit/f203bb6a18f3059394e9b46b02f0cfe10497e9bb))
- **ls:** oas31 docs for header object ([#2000](https://github.com/swagger-api/apidom/issues/2000)) ([88607a1](https://github.com/swagger-api/apidom/commit/88607a1d5aa294358655af096e22583877ad5a31))
- **ls:** oas31 docs response object ([#1997](https://github.com/swagger-api/apidom/issues/1997)) ([18cb4f0](https://github.com/swagger-api/apidom/commit/18cb4f0c1f22ce3830ae5da7311e73990a7ff47c))

# [0.44.0](https://github.com/swagger-api/apidom/compare/v0.43.0...v0.44.0) (2022-09-05)

**Note:** Version bump only for package @swagger-api/apidom-ls

# [0.43.0](https://github.com/swagger-api/apidom/compare/v0.42.0...v0.43.0) (2022-08-31)

**Note:** Version bump only for package @swagger-api/apidom-ls

# [0.42.0](https://github.com/swagger-api/apidom/compare/v0.41.1...v0.42.0) (2022-08-30)

### Bug Fixes

- **apidom-ls:** fix inverted params in test class ([22dfa69](https://github.com/swagger-api/apidom/commit/22dfa6957d76b0c34e4badd30eb4449c90cb931c))

## [0.41.1](https://github.com/swagger-api/apidom/compare/v0.41.0...v0.41.1) (2022-08-22)

### Bug Fixes

- **apidom-ls:** implement custom hover provider support ([3ee5bfe](https://github.com/swagger-api/apidom/commit/3ee5bfefea41d34a92a6a7bec8daf85e15dd8b10))

# [0.41.0](https://github.com/swagger-api/apidom/compare/v0.40.3...v0.41.0) (2022-08-19)

### Bug Fixes

- **apidom-ls:** partially fix invalid YAML diagnostics ([417a48b](https://github.com/swagger-api/apidom/commit/417a48b1d6c4f25df53c29f977af91f9e27e6967))

### Features

- **apidom-ls:** implement initial ADS support ([6c39489](https://github.com/swagger-api/apidom/commit/6c394890e6845dcd4765a5e6e1df12166446b691))

## [0.40.3](https://github.com/swagger-api/apidom/compare/v0.40.2...v0.40.3) (2022-08-08)

**Note:** Version bump only for package @swagger-api/apidom-ls

## [0.40.2](https://github.com/swagger-api/apidom/compare/v0.40.1...v0.40.2) (2022-08-08)

**Note:** Version bump only for package @swagger-api/apidom-ls

## [0.40.1](https://github.com/swagger-api/apidom/compare/v0.40.0...v0.40.1) (2022-08-04)

### Bug Fixes

- **apidom-ls:** fix ref hover indent ([9e26947](https://github.com/swagger-api/apidom/commit/9e26947293c6b0251557e07dc4f3a46c29f64f16))

# [0.40.0](https://github.com/swagger-api/apidom/compare/v0.39.0...v0.40.0) (2022-08-04)

### Bug Fixes

- **apidom-ls:** list all production deps explicitly ([8d6ba96](https://github.com/swagger-api/apidom/commit/8d6ba96b2f7d79948a8c56443256208b26db5665)), closes [#1758](https://github.com/swagger-api/apidom/issues/1758)

### Features

- **apidom-ls:** implement ref target content in hover ([6f86b03](https://github.com/swagger-api/apidom/commit/6f86b03d7e5b6117e3762b881a78280290c5fb73))

# [0.39.0](https://github.com/swagger-api/apidom/compare/v0.38.0...v0.39.0) (2022-07-29)

### Bug Fixes

- **apidom-ls:** fix missing sourceMap in ext go-to ([54aa390](https://github.com/swagger-api/apidom/commit/54aa390bfcc9ae69dd7f3e070c5b68cee604f333))

# [0.38.0](https://github.com/swagger-api/apidom/compare/v0.37.0...v0.38.0) (2022-07-29)

### Features

- **apidom-ls:** implement initial ext ref go to ([5ff591e](https://github.com/swagger-api/apidom/commit/5ff591edd16ff5227833a7c301eb8c1f389f578e))

# [0.37.0](https://github.com/swagger-api/apidom/compare/v0.36.0...v0.37.0) (2022-07-29)

**Note:** Version bump only for package @swagger-api/apidom-ls

# [0.36.0](https://github.com/swagger-api/apidom/compare/v0.35.1...v0.36.0) (2022-07-13)

### Bug Fixes

- **apidom-ls:** fix typo in JSON Schema rules - refs [#1729](https://github.com/swagger-api/apidom/issues/1729) ([a9a7f84](https://github.com/swagger-api/apidom/commit/a9a7f846663b4b3cb0e86e6eb98979fe8378dd33))

### Features

- **apidom-ls:** implement getJsonPointerPosition ([ca0deb4](https://github.com/swagger-api/apidom/commit/ca0deb401cfcbf59f26d7b98c538c9120863c648))

## [0.35.1](https://github.com/swagger-api/apidom/compare/v0.35.0...v0.35.1) (2022-07-05)

### Bug Fixes

- **apidom-ls:** fix corrupted file name ([#1717](https://github.com/swagger-api/apidom/issues/1717)) ([494f1e6](https://github.com/swagger-api/apidom/commit/494f1e652148117f5b97794d0b7ed81574e2c1ad))

# [0.35.0](https://github.com/swagger-api/apidom/compare/v0.34.0...v0.35.0) (2022-07-05)

### Features

- **apidom-ls:** add AsyncAPI AMQP 0-9-1 Channel Bindings rules ([272e558](https://github.com/swagger-api/apidom/commit/272e55842d91501aa997e321ddf088b95ecc809d)), closes [#1647](https://github.com/swagger-api/apidom/issues/1647)
- **apidom-ls:** add AsyncAPI AMQP 0-9-1 Message Bindings rules ([45daeac](https://github.com/swagger-api/apidom/commit/45daeac1a2116af6ecdafc055d88c8bb6a0235a4)), closes [#1647](https://github.com/swagger-api/apidom/issues/1647)
- **apidom-ls:** add AsyncAPI AMQP 0-9-1 Operation Bindings rules ([410bbd8](https://github.com/swagger-api/apidom/commit/410bbd89a7c226cce45d8bc8189fde5cf96c07e3)), closes [#1647](https://github.com/swagger-api/apidom/issues/1647)
- **apidom-ls:** add AsyncAPI IBM MQ Channel Bindings rules ([1591cfe](https://github.com/swagger-api/apidom/commit/1591cfe265c0eba5ac97b3290c56e7242e620881)), closes [#1647](https://github.com/swagger-api/apidom/issues/1647)
- **apidom-ls:** add AsyncAPI IBM MQ Server Bindings rules ([5d2bae1](https://github.com/swagger-api/apidom/commit/5d2bae1832bdcafc30c150bd8ab6180793090391)), closes [#1647](https://github.com/swagger-api/apidom/issues/1647)
- **apidom-ls:** add AsyncAPI IBM MQ Server Bindings rules ([664bc7b](https://github.com/swagger-api/apidom/commit/664bc7b6102f0bece415639caa1b6736955d44f0)), closes [#1647](https://github.com/swagger-api/apidom/issues/1647)
- **apidom-ls:** add AsyncAPI MQTT Message Bindings rules ([f219bb1](https://github.com/swagger-api/apidom/commit/f219bb1684694c2035cc0b97bb9c0bd3cbeea146)), closes [#1647](https://github.com/swagger-api/apidom/issues/1647)
- **apidom-ls:** add AsyncAPI MQTT Operation Bindings rules ([6abc88f](https://github.com/swagger-api/apidom/commit/6abc88f5f202f0ea5a4fb8c7bc4e48fa432e85c8)), closes [#1647](https://github.com/swagger-api/apidom/issues/1647)
- **apidom-ls:** add AsyncAPI MQTT Server Bindings rules ([c8d9e14](https://github.com/swagger-api/apidom/commit/c8d9e146de86b0e2f48effc64a339173a95a3140)), closes [#1647](https://github.com/swagger-api/apidom/issues/1647)

# [0.34.0](https://github.com/swagger-api/apidom/compare/v0.33.0...v0.34.0) (2022-07-01)

### Features

- **apidom-ls:** add all empty AsyncAPI binding objects ([8bd8bac](https://github.com/swagger-api/apidom/commit/8bd8bac0b736140682bb9d2b726e41c274eebcdb)), closes [#1647](https://github.com/swagger-api/apidom/issues/1647)
- **apidom-ls:** add AsyncAPI AMQP 1.0 Bidings rules ([6d7c046](https://github.com/swagger-api/apidom/commit/6d7c046a43004dae9a76d71227216c4ce1ab7baa)), closes [#1647](https://github.com/swagger-api/apidom/issues/1647)
- **apidom-ls:** add AsyncAPI Anypoint MQ Channel Binding ([108aa07](https://github.com/swagger-api/apidom/commit/108aa073cd4020e57bbe92dbacabdba5746db8d8)), closes [#1647](https://github.com/swagger-api/apidom/issues/1647)
- **apidom-ls:** add AsyncAPI Anypoint MQ Message Binding ([a8f7a26](https://github.com/swagger-api/apidom/commit/a8f7a26e6526efd33d1e3ee959133d0723a7f4dd)), closes [#1647](https://github.com/swagger-api/apidom/issues/1647)
- **apidom-ls:** add AsyncAPI HTTP Bindings rules ([4fd0b18](https://github.com/swagger-api/apidom/commit/4fd0b183d358663c18e0e643c726369ee74bc51e)), closes [#1647](https://github.com/swagger-api/apidom/issues/1647)
- **apidom-ls:** add AsyncAPI JMS Bidings rules ([8420487](https://github.com/swagger-api/apidom/commit/84204879dbe38ddb1feea66966e36aee93abe4ca)), closes [#1647](https://github.com/swagger-api/apidom/issues/1647)
- **apidom-ls:** add AsyncAPI Kafka Bindings rules ([44e9cd3](https://github.com/swagger-api/apidom/commit/44e9cd3efb4016bec2fcf9a650cab3e4139a7946)), closes [#1647](https://github.com/swagger-api/apidom/issues/1647)
- **apidom-ls:** add AsyncAPI Mercure Bindings rules ([027357e](https://github.com/swagger-api/apidom/commit/027357e333e6fc36d8ba4ffcaaec33b9e341f8c0)), closes [#1647](https://github.com/swagger-api/apidom/issues/1647)
- **apidom-ls:** add AsyncAPI MQTT 5 Bidings rules ([052f201](https://github.com/swagger-api/apidom/commit/052f201cc677bcc6f233fdadb0e38c3283fc40db)), closes [#1647](https://github.com/swagger-api/apidom/issues/1647)
- **apidom-ls:** add AsyncAPI NATS Operation Binding ([35d9638](https://github.com/swagger-api/apidom/commit/35d9638e5a7274d1d172fe5bf2f465e9c2778d79)), closes [#1647](https://github.com/swagger-api/apidom/issues/1647)
- **apidom-ls:** add AsyncAPI Redis Bindings rules ([6409c9e](https://github.com/swagger-api/apidom/commit/6409c9e2927c53eef4ccec83eafbecb71b05fdb7)), closes [#1647](https://github.com/swagger-api/apidom/issues/1647)
- **apidom-ls:** add AsyncAPI SNS Bindings rules ([1e14d7f](https://github.com/swagger-api/apidom/commit/1e14d7fd518d4fbe7a70e643319cb913058a53da)), closes [#1647](https://github.com/swagger-api/apidom/issues/1647)
- **apidom-ls:** add AsyncAPI Solace Operation Binding ([5fa73cc](https://github.com/swagger-api/apidom/commit/5fa73cce04c2b673daafbe03c26d303408bec48a)), closes [#1647](https://github.com/swagger-api/apidom/issues/1647)
- **apidom-ls:** add AsyncAPI Solace Server Binding ([e0d8857](https://github.com/swagger-api/apidom/commit/e0d885731ef29c7f561fb4c50247baa575eca0a4)), closes [#1647](https://github.com/swagger-api/apidom/issues/1647)
- **apidom-ls:** add AsyncAPI SQS Bindings rules ([ea23c45](https://github.com/swagger-api/apidom/commit/ea23c452184d784a2fc35875a7196bf727cda275)), closes [#1647](https://github.com/swagger-api/apidom/issues/1647)
- **apidom-ls:** add AsyncAPI STOMP Bindings rules ([f12600d](https://github.com/swagger-api/apidom/commit/f12600d3732a49bcf9ee3ada9edf4c7e5fd8cb90)), closes [#1647](https://github.com/swagger-api/apidom/issues/1647)
- **apidom-ls:** add AsyncAPI Web Socket Channel Binding ([9bb37a3](https://github.com/swagger-api/apidom/commit/9bb37a32bc2bb1037554e225177d1831681a3d85)), closes [#1647](https://github.com/swagger-api/apidom/issues/1647)

# [0.33.0](https://github.com/swagger-api/apidom/compare/v0.32.0...v0.33.0) (2022-06-28)

**Note:** Version bump only for package @swagger-api/apidom-ls

# [0.32.0](https://github.com/swagger-api/apidom/compare/v0.31.2...v0.32.0) (2022-06-27)

### Features

- add support for all AsyncAPI 2.x main specification objects ([#1658](https://github.com/swagger-api/apidom/issues/1658)) ([38e8e94](https://github.com/swagger-api/apidom/commit/38e8e94336a9dcbbdaad064c14aa222c1e941280)), closes [#1647](https://github.com/swagger-api/apidom/issues/1647)

## [0.31.2](https://github.com/swagger-api/apidom/compare/v0.31.1...v0.31.2) (2022-06-24)

### Bug Fixes

- **build:** make using minim an implementation detail ([a45009f](https://github.com/swagger-api/apidom/commit/a45009fef5855f3b2fba699c9e4faf560c613443)), closes [#1632](https://github.com/swagger-api/apidom/issues/1632)

## [0.31.1](https://github.com/swagger-api/apidom/compare/v0.31.0...v0.31.1) (2022-06-23)

**Note:** Version bump only for package @swagger-api/apidom-ls

# [0.31.0](https://github.com/swagger-api/apidom/compare/v0.30.1...v0.31.0) (2022-06-21)

### Features

- **apidom-ls:** update ns/format detection ([a445f16](https://github.com/swagger-api/apidom/commit/a445f16a17f3ec71c6e2fad6818ce6b049393433))
- **apidom-ls:** use adapter.detect for ns/format detection ([a1d1900](https://github.com/swagger-api/apidom/commit/a1d1900bdf561253b8457b75d5ed0394d61febb4))

## [0.30.1](https://github.com/swagger-api/apidom/compare/v0.30.0...v0.30.1) (2022-06-09)

**Note:** Version bump only for package @swagger-api/apidom-ls

# [0.30.0](https://github.com/swagger-api/apidom/compare/v0.29.1...v0.30.0) (2022-06-07)

**Note:** Version bump only for package @swagger-api/apidom-ls

## [0.29.1](https://github.com/swagger-api/apidom/compare/v0.29.0...v0.29.1) (2022-06-03)

**Note:** Version bump only for package @swagger-api/apidom-ls

# [0.29.0](https://github.com/swagger-api/apidom/compare/v0.28.0...v0.29.0) (2022-05-27)

### Features

- **apidom-ls:** allow async doRefCompletion ([#1512](https://github.com/swagger-api/apidom/issues/1512)) ([ea28013](https://github.com/swagger-api/apidom/commit/ea28013272b48ee521fc05d1c3237518b3b6065b))

# [0.28.0](https://github.com/swagger-api/apidom/compare/v0.27.0...v0.28.0) (2022-05-22)

**Note:** Version bump only for package @swagger-api/apidom-ls

# [0.27.0](https://github.com/swagger-api/apidom/compare/v0.26.0...v0.27.0) (2022-05-20)

### Features

- **apidom-ls:** allow top level rules with as array of elements ([dbb08dd](https://github.com/swagger-api/apidom/commit/dbb08dd2e3735adf8066b65cbaea782c92c3fa5f))

# [0.26.0](https://github.com/swagger-api/apidom/compare/v0.25.0...v0.26.0) (2022-05-20)

### Bug Fixes

- **apidom-ls:** add semantic APIs example and remove console ([b48113d](https://github.com/swagger-api/apidom/commit/b48113de4efcf4a77a808383a2873b9a8e673650))

### Features

- **apidom-ls:** add additional rules descriptive metadata ([c570c86](https://github.com/swagger-api/apidom/commit/c570c86fe192cab4e8716655994f3111e84c3627))

# [0.25.0](https://github.com/swagger-api/apidom/compare/v0.24.1...v0.25.0) (2022-05-13)

### Bug Fixes

- **apidom-ls:** fix completion format for Operation.security ([#1444](https://github.com/swagger-api/apidom/issues/1444)) ([0cb1185](https://github.com/swagger-api/apidom/commit/0cb118546f1b0636d1227c8eda8d45b1bb97d2dc)), closes [#1434](https://github.com/swagger-api/apidom/issues/1434)

### Features

- **apidom-ls:** add completion for Operation/OperationTrait security ([#1445](https://github.com/swagger-api/apidom/issues/1445)) ([03a40e8](https://github.com/swagger-api/apidom/commit/03a40e8d32ab964f132b4bab84adeec009e3338f)), closes [#1435](https://github.com/swagger-api/apidom/issues/1435)
- **apidom-ls:** add extended docs for Server Variable Object ([#1442](https://github.com/swagger-api/apidom/issues/1442)) ([0464a7d](https://github.com/swagger-api/apidom/commit/0464a7d289911c23251dbf5b8f4eed0313ea7410)), closes [#1423](https://github.com/swagger-api/apidom/issues/1423)
- **apidom-ls:** enhance completion/validation providers integration ([6869294](https://github.com/swagger-api/apidom/commit/6869294939b133763720edbe3f368cdd9b34c7ff))
- **apidom-ls:** support completion/lint for Server/ServerVariable ([#1446](https://github.com/swagger-api/apidom/issues/1446)) ([05e9a1a](https://github.com/swagger-api/apidom/commit/05e9a1a740e28772ec6e12d5aff529979a1c330f)), closes [#1430](https://github.com/swagger-api/apidom/issues/1430)
- **apidom-ls:** support proper completion format for messageId ([#1440](https://github.com/swagger-api/apidom/issues/1440)) ([ff9fe70](https://github.com/swagger-api/apidom/commit/ff9fe703e6c594e55bd34ac8398d0c75c5d3f091)), closes [#1433](https://github.com/swagger-api/apidom/issues/1433)
- **apidom-ls:** support referencing Server Object ([#1439](https://github.com/swagger-api/apidom/issues/1439)) ([93b8c35](https://github.com/swagger-api/apidom/commit/93b8c35e91cb75917fb2b6e9d74b73ae7ed704fa)), closes [#1431](https://github.com/swagger-api/apidom/issues/1431)

## [0.24.1](https://github.com/swagger-api/apidom/compare/v0.24.0...v0.24.1) (2022-05-05)

**Note:** Version bump only for package @swagger-api/apidom-ls

# [0.24.0](https://github.com/swagger-api/apidom/compare/v0.23.0...v0.24.0) (2022-05-03)

### Features

- **apidom-ls:** add support for AsyncAPI 2.4.0 ([#1413](https://github.com/swagger-api/apidom/issues/1413)) ([7b69f49](https://github.com/swagger-api/apidom/commit/7b69f4987d587d873a8b95fa956cad8ded53dd96)), closes [#1390](https://github.com/swagger-api/apidom/issues/1390)

# [0.23.0](https://github.com/swagger-api/apidom/compare/v0.22.0...v0.23.0) (2022-04-25)

### Bug Fixes

- **apidom-ls:** fix linting of Operation.bindings ([2a34be9](https://github.com/swagger-api/apidom/commit/2a34be9b2bb591ee172886aa00ecb9f18b158f82)), closes [#1370](https://github.com/swagger-api/apidom/issues/1370)

### Features

- **apidom-ls:** add Channel Bindings meta config ([#1374](https://github.com/swagger-api/apidom/issues/1374)) ([f2afc7c](https://github.com/swagger-api/apidom/commit/f2afc7c8d7a133f254be0b13bb1372fe7c627ee3)), closes [#1371](https://github.com/swagger-api/apidom/issues/1371)
- **apidom-ls:** add Message Bindings docs meta config ([#1375](https://github.com/swagger-api/apidom/issues/1375)) ([5b351a4](https://github.com/swagger-api/apidom/commit/5b351a4b787e2fce5d4e3ec1fa52711396ded77f)), closes [#1314](https://github.com/swagger-api/apidom/issues/1314)
- **apidom-ls:** add Operation Bindings meta config ([#1372](https://github.com/swagger-api/apidom/issues/1372)) ([51edb6f](https://github.com/swagger-api/apidom/commit/51edb6f6ff332d916a96b24778e197c9c3dea6f9)), closes [#1370](https://github.com/swagger-api/apidom/issues/1370)
- **apidom-ls:** add Server Bindings docs meta config ([#1373](https://github.com/swagger-api/apidom/issues/1373)) ([6352dad](https://github.com/swagger-api/apidom/commit/6352dadbf00908890d8ff6b741357135e3e9a3fd)), closes [#1315](https://github.com/swagger-api/apidom/issues/1315)

# [0.22.0](https://github.com/swagger-api/apidom/compare/v0.21.0...v0.22.0) (2022-04-21)

### Features

- **apidom-ls:** add support for AsyncAPI 2.3 ([#1354](https://github.com/swagger-api/apidom/issues/1354)) ([95e8456](https://github.com/swagger-api/apidom/commit/95e845607cfee8c9a7e9ecdb3c38b5a9d0a1e95d)), closes [#1317](https://github.com/swagger-api/apidom/issues/1317)

# [0.21.0](https://github.com/swagger-api/apidom/compare/v0.20.1...v0.21.0) (2022-04-18)

### Features

- **apidom-ls:** support oneOf field in Operation.message field ([#1341](https://github.com/swagger-api/apidom/issues/1341)) ([5604de0](https://github.com/swagger-api/apidom/commit/5604de0472197246c2fdc65dd8b9c7c1aa3e914c)), closes [#1340](https://github.com/swagger-api/apidom/issues/1340)

## [0.20.1](https://github.com/swagger-api/apidom/compare/v0.20.0...v0.20.1) (2022-04-12)

### Bug Fixes

- **apidom-ls:** enhance docs config for Channel Item Object ([073b285](https://github.com/swagger-api/apidom/commit/073b2857e278661acb47e29019e7bf1c620359ec)), closes [#1313](https://github.com/swagger-api/apidom/issues/1313)
- **apidom-ls:** enhance docs config formatting for AsyncAPI ([#1316](https://github.com/swagger-api/apidom/issues/1316)) ([1c9d287](https://github.com/swagger-api/apidom/commit/1c9d2871e3e4b85e04bc0a622e113b20e4d2abc7)), closes [#1313](https://github.com/swagger-api/apidom/issues/1313)

# [0.20.0](https://github.com/swagger-api/apidom/compare/v0.19.0...v0.20.0) (2022-04-11)

### Bug Fixes

- **apidom-ls:** fix all documentation URLs to point to AsyncAPI 2.3.0 docs ([#1286](https://github.com/swagger-api/apidom/issues/1286)) ([6f8ac59](https://github.com/swagger-api/apidom/commit/6f8ac595c777af9e061837a2972d8ff96f5fef48)), closes [#1284](https://github.com/swagger-api/apidom/issues/1284)
- **apidom-ls:** make formatting of JSON/YAML better ([#1305](https://github.com/swagger-api/apidom/issues/1305)) ([0a01e29](https://github.com/swagger-api/apidom/commit/0a01e295ca0da56f353faabd959fa7f5997fee89)), closes [#1284](https://github.com/swagger-api/apidom/issues/1284)
- **apidom-ls:** use amqps in proper context only ([#1302](https://github.com/swagger-api/apidom/issues/1302)) ([2105c72](https://github.com/swagger-api/apidom/commit/2105c726ba4b4525f57bae70ac0f6e0b79dca070)), closes [#1287](https://github.com/swagger-api/apidom/issues/1287)

# [0.19.0](https://github.com/swagger-api/apidom/compare/v0.18.1...v0.19.0) (2022-03-10)

### Features

- **ns-api-design-systems:** introduce Standard Identifer plugin ([#1215](https://github.com/swagger-api/apidom/issues/1215)) ([c49dfa8](https://github.com/swagger-api/apidom/commit/c49dfa8e80908d6cd84ca04b21064a49d0de8c8d))

## [0.18.1](https://github.com/swagger-api/apidom/compare/v0.18.0...v0.18.1) (2022-02-16)

### Bug Fixes

- **apidom-ls:** use import of ajv with full file extension ([ea12865](https://github.com/swagger-api/apidom/commit/ea12865574fea34cccaf274890b8d548edaae6ee)), closes [#930](https://github.com/swagger-api/apidom/issues/930)

# [0.18.0](https://github.com/swagger-api/apidom/compare/v0.17.0...v0.18.0) (2022-02-16)

### Bug Fixes

- **apidom-ls:** fix duplicated diagnostics ([7c86c77](https://github.com/swagger-api/apidom/commit/7c86c77fc594f0c7fdbd5f274518e5dc44060881)), closes [#1078](https://github.com/swagger-api/apidom/issues/1078)
- **apidom-ls:** fix partial keys identification ([318799f](https://github.com/swagger-api/apidom/commit/318799f8e39678d6c0f3fc4658775566db0ec641))

### Features

- **apidom-ls:** convert to ESM ([#1186](https://github.com/swagger-api/apidom/issues/1186)) ([a7d6bd7](https://github.com/swagger-api/apidom/commit/a7d6bd7fa310d7462b972e8597d7e08c72ee7bf7)), closes [#930](https://github.com/swagger-api/apidom/issues/930)
- **apidom-ls:** rules for schema additionalProperties ([73e6d1d](https://github.com/swagger-api/apidom/commit/73e6d1d793e35c6c43362cd71aec5ae918baa43c))

# [0.17.0](https://github.com/swagger-api/apidom/compare/v0.16.0...v0.17.0) (2022-01-14)

### Features

- **apidom-ls:** add rules for allowed fields ([e71c156](https://github.com/swagger-api/apidom/commit/e71c1563a132b6db381dcc7d6c789ec0d6e313ad))
- **apidom-ls:** add rules for components ([4473af7](https://github.com/swagger-api/apidom/commit/4473af7e544ca67ba292e70361d50e70d1f75344))
- **apidom-ls:** add rules for http and kafka message binding ([7a8fed2](https://github.com/swagger-api/apidom/commit/7a8fed233bda5e5a2a8997b1e6a9afadf286d248))
- **apidom-ls:** add rules for message ([95345f6](https://github.com/swagger-api/apidom/commit/95345f6ece5da91234e32460fd69ecc65987b1ee))
- **apidom-ls:** add rules for parameter ([f81a7ee](https://github.com/swagger-api/apidom/commit/f81a7ee711a1767da43a18282afe0f39e9b02b75))
- **apidom-ls:** add rules for server bindings ([6f400ab](https://github.com/swagger-api/apidom/commit/6f400abbd85dde926aee7ecff6bbfa344e9c388f))

# [0.16.0](https://github.com/swagger-api/apidom/compare/v0.15.1...v0.16.0) (2022-01-12)

**Note:** Version bump only for package @swagger-api/apidom-ls

## [0.15.1](https://github.com/swagger-api/apidom/compare/v0.15.0...v0.15.1) (2021-12-29)

**Note:** Version bump only for package @swagger-api/apidom-ls

# [0.15.0](https://github.com/swagger-api/apidom/compare/v0.14.0...v0.15.0) (2021-12-10)

### Features

- **apidom-ls:** add rules for channel items, operation, traits ([3d924db](https://github.com/swagger-api/apidom/commit/3d924dbbcab245071171204bdebf437190b95488))
- **apidom-ls:** add rules for channel parameter and empty spec ([82bacff](https://github.com/swagger-api/apidom/commit/82bacff56fce36ef0ac66ac94a4bc5504cfadc32))

# [0.14.0](https://github.com/swagger-api/apidom/compare/v0.13.0...v0.14.0) (2021-12-08)

### Bug Fixes

- **apidom-ls:** fix securityScheme lint ([e351e9e](https://github.com/swagger-api/apidom/commit/e351e9e677264641cb16771fad70d3f27e822174))

### Features

- **apidom-ls:** add logs to completion-service ([b6ea639](https://github.com/swagger-api/apidom/commit/b6ea639c1427f1c479c65c08addc5ffb6379a976))
- **apidom-ls:** add trace function ([5c77c9b](https://github.com/swagger-api/apidom/commit/5c77c9b3943f52e747c0a76edfc05de80af46018))
- **apidom-ls:** expand provided symbols ([2b49302](https://github.com/swagger-api/apidom/commit/2b49302d97102f1e473aae895a6f9fe9bd03735f))
- **apidom-ls:** fix cache and add performance(/)logs mechanism ([14bd6a8](https://github.com/swagger-api/apidom/commit/14bd6a8bbb439b3117d3580a735fd3bf477a4725))

# [0.13.0](https://github.com/swagger-api/apidom/compare/v0.12.0...v0.13.0) (2021-12-06)

### Bug Fixes

- **apidom-ls:** update completion service doc processing ([214a7b1](https://github.com/swagger-api/apidom/commit/214a7b1d9193c408582b632aa8d00f1a9892b06c))

### Features

- **apidom-ls:** add asyncapi channels and servers rules ([2dbe838](https://github.com/swagger-api/apidom/commit/2dbe838000e10e1c93f2d59c41eb77b6386ac3ce))

# [0.12.0](https://github.com/swagger-api/apidom/compare/v0.11.0...v0.12.0) (2021-12-04)

### Bug Fixes

- **apidom-ls:** correct partial keys in YAML ([a5c14cf](https://github.com/swagger-api/apidom/commit/a5c14cfee5a8a3f4153b4bb8d145fc4290db3109))
- **apidom-ls:** fix completion and validation edge cases ([a9c67d4](https://github.com/swagger-api/apidom/commit/a9c67d41e815e0be0a4f0cd526583837f7fc3436))
- **apidom-ls:** fix completion in empty line ([00f8be5](https://github.com/swagger-api/apidom/commit/00f8be53a60cc42d188b9dae1e7048c390f32e39))
- **apidom-ls:** fix completion scenarios with update apidom core ([3540870](https://github.com/swagger-api/apidom/commit/3540870ce6e38e2765d5f353f1c0ff50e246593e))

### Features

- **apidom-ls:** add more asyncapi rules and logic minor fixes ([81cf99f](https://github.com/swagger-api/apidom/commit/81cf99f46cadbaaebdab79aca74cf4d2c9a99bf8))

# [0.11.0](https://github.com/swagger-api/apidom/compare/v0.10.0...v0.11.0) (2021-12-02)

**Note:** Version bump only for package @swagger-api/apidom-ls

# [0.10.0](https://github.com/swagger-api/apidom/compare/v0.9.0...v0.10.0) (2021-11-25)

### Features

- **apidom-ls:** - improve logic and update config ([c8f33b2](https://github.com/swagger-api/apidom/commit/c8f33b28dab990aa777e94b71d80c743c327e43b))

# [0.9.0](https://github.com/swagger-api/apidom/compare/v0.8.0...v0.9.0) (2021-11-17)

### Bug Fixes

- **apidom-ls:** fix ls completion ([e91d547](https://github.com/swagger-api/apidom/commit/e91d5479047afc1dc35f87eda638775385ada477))
- **apidom-ls:** fix yaml empty lines completion ([a81b48d](https://github.com/swagger-api/apidom/commit/a81b48db7b1fad308160cdc47cabac3f16910b83))

### Features

- **apidom-ls:** apply refractorPluginReplaceEmptyElement to parser ([4d30a59](https://github.com/swagger-api/apidom/commit/4d30a596f78412494a8b0bc8cf9edf75c1db83bb))
- **apidom-ls:** enhance ls features ([249dba6](https://github.com/swagger-api/apidom/commit/249dba64d582e52800bf0ea3df2c863294bb3122))

# [0.8.0](https://github.com/swagger-api/apidom/compare/v0.7.0...v0.8.0) (2021-11-15)

**Note:** Version bump only for package @swagger-api/apidom-ls

# [0.7.0](https://github.com/swagger-api/apidom/compare/v0.6.0...v0.7.0) (2021-11-08)

### Features

- **apidom-ls:** implement ns/version check, update rules ([91d4a83](https://github.com/swagger-api/apidom/commit/91d4a83303e581aba8845cb5ef93f10872e9d7ae))

# [0.6.0](https://github.com/swagger-api/apidom/compare/v0.5.1...v0.6.0) (2021-11-04)

### Bug Fixes

- **apidom-ls:** fixes quick fix for empty value ([ab4938f](https://github.com/swagger-api/apidom/commit/ab4938f98078ae87c27f67771a80a67e5077ffc6))
- **apidom-ls:** fixes quoted/unquoted completion ([aa912d3](https://github.com/swagger-api/apidom/commit/aa912d3b380861db2c1106a18a77c2cf1f8c5874))
- **apidom-ls:** implement ref completion ([69d9c8f](https://github.com/swagger-api/apidom/commit/69d9c8f993f3fe6941c3e70a884b63b18a254774))
- update version, spec-version, api-version meta ([ddee593](https://github.com/swagger-api/apidom/commit/ddee593c0aa1f94e2d1eed1cb8a93f28b8e46db4))

### Features

- **apidom-ls:** support all AsyncAPI 2.x in json schema validation ([4cd47b3](https://github.com/swagger-api/apidom/commit/4cd47b3f0cae1d6563689104ef550181b0b337b1))

## [0.5.1](https://github.com/swagger-api/apidom/compare/v0.5.0...v0.5.1) (2021-11-01)

**Note:** Version bump only for package @swagger-api/apidom-ls

# [0.5.0](https://github.com/swagger-api/apidom/compare/v0.4.0...v0.5.0) (2021-10-26)

### Features

- **apidom-ls:** completion and validation fixes ([2ded62c](https://github.com/swagger-api/apidom/commit/2ded62c6a7fd2c407fbf9d48322a60872dbad81a))
- **apidom-ls:** document cache ([aefaa44](https://github.com/swagger-api/apidom/commit/aefaa441af833e031c32f2bccdc9e953179dd1c6))
- **apidom-ls:** single ajv instance ([a93d428](https://github.com/swagger-api/apidom/commit/a93d428ddf83576540c71dbdee5cdc7e7eee8567))
- **apidom-ls:** update validation providers and json schemas ([a49154b](https://github.com/swagger-api/apidom/commit/a49154b0f6d435da3375035222d769e3a1c04c35))

# [0.4.0](https://github.com/swagger-api/apidom/compare/v0.3.0...v0.4.0) (2021-10-22)

**Note:** Version bump only for package @swagger-api/apidom-ls

# [0.3.0](https://github.com/swagger-api/apidom/compare/v0.2.1...v0.3.0) (2021-10-05)

**Note:** Version bump only for package @swagger-api/apidom-ls

## [0.2.1](https://github.com/swagger-api/apidom/compare/v0.2.0...v0.2.1) (2021-09-30)

**Note:** Version bump only for package @swagger-api/apidom-ls

# 0.2.0 (2021-09-28)

**Note:** Version bump only for package @swagger-api/apidom-ls

# 0.1.0 (2021-09-28)

**Note:** Version bump only for package @swagger-api/apidom-ls
