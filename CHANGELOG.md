# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [0.85.0](https://github.com/swagger-api/apidom/compare/v0.84.0...v0.85.0) (2023-11-30)

### Bug Fixes

- **reference:** fix internal/external URL determination for AsyncAPI 2.x ([#3453](https://github.com/swagger-api/apidom/issues/3453)) ([3cc0791](https://github.com/swagger-api/apidom/commit/3cc0791464ecc1f8e534aa7e6f19124ae8017b0d)), closes [#3451](https://github.com/swagger-api/apidom/issues/3451)
- **reference:** fix internal/external URL determination for OpenAPI 2.0 ([#3454](https://github.com/swagger-api/apidom/issues/3454)) ([c720584](https://github.com/swagger-api/apidom/commit/c7205840e5ef1d107b3855ee1ef597cc5121d173)), closes [#3451](https://github.com/swagger-api/apidom/issues/3451)
- **reference:** fix internal/external URL determination for OpenAPI 3.0.x ([#3455](https://github.com/swagger-api/apidom/issues/3455)) ([bac4850](https://github.com/swagger-api/apidom/commit/bac4850abfe6c61c14eba2735fffab12ee7765bf)), closes [#3451](https://github.com/swagger-api/apidom/issues/3451)
- **reference:** fix internal/extrernal URL determ for OpenAPI 3.1.0 ([#3459](https://github.com/swagger-api/apidom/issues/3459)) ([2215480](https://github.com/swagger-api/apidom/commit/22154805c4906a08af5c06650bbdc0d80f9e3239)), closes [#3451](https://github.com/swagger-api/apidom/issues/3451)
- **reference:** lazy fetch URLs only when needed ([#3464](https://github.com/swagger-api/apidom/issues/3464)) ([222e3f0](https://github.com/swagger-api/apidom/commit/222e3f03b1cda9ca187a8b8292af48f3572419d3)), closes [#3451](https://github.com/swagger-api/apidom/issues/3451)

### Features

- **ls:** add initial support for OpenAPI 2.0 ([#3470](https://github.com/swagger-api/apidom/issues/3470)) ([e47be92](https://github.com/swagger-api/apidom/commit/e47be9296a979302e5cf0b07f98d6be580bc5e1c)), closes [#3103](https://github.com/swagger-api/apidom/issues/3103) [#3466](https://github.com/swagger-api/apidom/issues/3466)
- **ns-workflows-1:** add support for Components Object ([#3456](https://github.com/swagger-api/apidom/issues/3456)) ([14dd260](https://github.com/swagger-api/apidom/commit/14dd26038117dbb88d86d3627b7277f21fd6d848)), closes [#3392](https://github.com/swagger-api/apidom/issues/3392)
- **reference:** add OpenAPI 2.0 resolve strategy ([#3465](https://github.com/swagger-api/apidom/issues/3465)) ([8d968ae](https://github.com/swagger-api/apidom/commit/8d968aef0bd3d6f2a166764dbcce43a0aa7c5ac2)), closes [#3101](https://github.com/swagger-api/apidom/issues/3101)

# [0.84.0](https://github.com/swagger-api/apidom/compare/v0.83.0...v0.84.0) (2023-11-24)

### Bug Fixes

- **ast:** remove redundant cycle detection ([#3411](https://github.com/swagger-api/apidom/issues/3411)) ([a8106de](https://github.com/swagger-api/apidom/commit/a8106deef0d70e23daa878437a47e58eebd89e3f))
- **ns-workflows-1:** use proper version in media types ([#3400](https://github.com/swagger-api/apidom/issues/3400)) ([f3faea6](https://github.com/swagger-api/apidom/commit/f3faea683afe861917590d8123fe99b3bb998b91)), closes [#3392](https://github.com/swagger-api/apidom/issues/3392)

### Features

- **ast:** see edits by the following merged visitors ([#3412](https://github.com/swagger-api/apidom/issues/3412)) ([6499557](https://github.com/swagger-api/apidom/commit/64995573f5df1f7f291c20833cf274173f6a7bac))
- **ns-workflows-1:** add support for Criterion Object ([#3407](https://github.com/swagger-api/apidom/issues/3407)) ([f6b053e](https://github.com/swagger-api/apidom/commit/f6b053ef30d34c3f8d95a7fb78f57eaa50758957)), closes [#3392](https://github.com/swagger-api/apidom/issues/3392)
- **ns-workflows-1:** add support for Failure Action Object ([#3429](https://github.com/swagger-api/apidom/issues/3429)) ([7cb6980](https://github.com/swagger-api/apidom/commit/7cb698068294858284eb6e3378e0eb9aaf9bf112)), closes [#3392](https://github.com/swagger-api/apidom/issues/3392)
- **ns-workflows-1:** add support for Info Object ([#3393](https://github.com/swagger-api/apidom/issues/3393)) ([5508c54](https://github.com/swagger-api/apidom/commit/5508c5479844c4328867f84481f56c445ec13225)), closes [#3392](https://github.com/swagger-api/apidom/issues/3392)
- **ns-workflows-1:** add support for JSONSchema Object ([#3445](https://github.com/swagger-api/apidom/issues/3445)) ([5b504e5](https://github.com/swagger-api/apidom/commit/5b504e523c532a31aaf1b133a14ff3b76c126435)), closes [#3392](https://github.com/swagger-api/apidom/issues/3392)
- **ns-workflows-1:** add support for Parameter Object ([#3436](https://github.com/swagger-api/apidom/issues/3436)) ([eed20ec](https://github.com/swagger-api/apidom/commit/eed20ec243d8432e3a13a33421c2d08fbc7b2167)), closes [#3392](https://github.com/swagger-api/apidom/issues/3392)
- **ns-workflows-1:** add support for Reference Object ([#3446](https://github.com/swagger-api/apidom/issues/3446)) ([10ecaf7](https://github.com/swagger-api/apidom/commit/10ecaf78f487d913da6fdf4a596e5bfbe37d0bf1)), closes [#3392](https://github.com/swagger-api/apidom/issues/3392)
- **ns-workflows-1:** add support for Source Description Object ([#3403](https://github.com/swagger-api/apidom/issues/3403)) ([893f125](https://github.com/swagger-api/apidom/commit/893f12505dce72804534da3997f29e5461528639)), closes [#3392](https://github.com/swagger-api/apidom/issues/3392)
- **ns-workflows-1:** add support for Success Action Object ([#3408](https://github.com/swagger-api/apidom/issues/3408)) ([28b81ac](https://github.com/swagger-api/apidom/commit/28b81acc2aaee178ec5aaff4cc8e346a8dfa01b5)), closes [#3392](https://github.com/swagger-api/apidom/issues/3392)
- **reference:** add OpenAPI 2.0 dereference strategy ([#3435](https://github.com/swagger-api/apidom/issues/3435)) ([aa3710b](https://github.com/swagger-api/apidom/commit/aa3710be00fef5ecc177c7d9e2ae570a077e8b68)), closes [#3102](https://github.com/swagger-api/apidom/issues/3102)

# [0.83.0](https://github.com/swagger-api/apidom/compare/v0.82.2...v0.83.0) (2023-11-07)

### Bug Fixes

- **reference:** fix handling cycles in all dereference strategies ([#3361](https://github.com/swagger-api/apidom/issues/3361)) ([d84397c](https://github.com/swagger-api/apidom/commit/d84397c5371cac7b255c6e8c751cd2c14a23f302))

### Features

- **core:** add support for formalized element identity management ([#3366](https://github.com/swagger-api/apidom/issues/3366)) ([65dcd0e](https://github.com/swagger-api/apidom/commit/65dcd0e8a96544773001560fe142a9768a2c3668))

## [0.82.2](https://github.com/swagger-api/apidom/compare/v0.82.1...v0.82.2) (2023-11-03)

### Bug Fixes

- return support for Node.js >=12.20.0 ([#3356](https://github.com/swagger-api/apidom/issues/3356)) ([75528ec](https://github.com/swagger-api/apidom/commit/75528eca3cc54bfae2240d8482d0858f0f7dbef9))

## [0.82.1](https://github.com/swagger-api/apidom/compare/v0.82.0...v0.82.1) (2023-11-03)

### Bug Fixes

- **ns-openapi-3-1:** fix normalize-servers refractor plugin ([#3355](https://github.com/swagger-api/apidom/issues/3355)) ([9f80c27](https://github.com/swagger-api/apidom/commit/9f80c27612040130745824a17525fe9021ce19a9))

# [0.82.0](https://github.com/swagger-api/apidom/compare/v0.81.0...v0.82.0) (2023-11-01)

### Features

- **logging:** add Placeholder implementation ([#3345](https://github.com/swagger-api/apidom/issues/3345)) ([00febde](https://github.com/swagger-api/apidom/commit/00febde261e1b8dd121d49bbb54554355344dae0)), closes [#3197](https://github.com/swagger-api/apidom/issues/3197)
- **logging:** finish Formatter implementation ([#3337](https://github.com/swagger-api/apidom/issues/3337)) ([8993d69](https://github.com/swagger-api/apidom/commit/8993d69c3f7da146e791e81d4aaab2cdab508120)), closes [#3197](https://github.com/swagger-api/apidom/issues/3197)
- **logging:** track log record creation times ([#3336](https://github.com/swagger-api/apidom/issues/3336)) ([a4e2357](https://github.com/swagger-api/apidom/commit/a4e2357ba23e596fa00cc721b93cc7d8a3253042)), closes [#3197](https://github.com/swagger-api/apidom/issues/3197)
- **playground:** add support for OpenAPI 2.0 parsing ([#3351](https://github.com/swagger-api/apidom/issues/3351)) ([ebb02ba](https://github.com/swagger-api/apidom/commit/ebb02ba566220e8a74f5ab07716a8dc05866b71f)), closes [#389](https://github.com/swagger-api/apidom/issues/389)
- **reference:** add OpenAPI 2.0 JSON parser plugin ([#3343](https://github.com/swagger-api/apidom/issues/3343)) ([70f345d](https://github.com/swagger-api/apidom/commit/70f345d3836bde9ab6923e20a6f21ed80c9d2609)), closes [#3100](https://github.com/swagger-api/apidom/issues/3100)
- **reference:** add OpenAPI 2.0 YAML parser plugin ([#3344](https://github.com/swagger-api/apidom/issues/3344)) ([ed60acc](https://github.com/swagger-api/apidom/commit/ed60accd16e5ce18f0a46f3a44c2e1b9e8196bba)), closes [#3100](https://github.com/swagger-api/apidom/issues/3100)

# [0.81.0](https://github.com/swagger-api/apidom/compare/v0.80.0...v0.81.0) (2023-10-30)

### Features

- add OpenAPI 2.0 JSON parser adapter ([#3333](https://github.com/swagger-api/apidom/issues/3333)) ([17d4ee1](https://github.com/swagger-api/apidom/commit/17d4ee1a6beadc4bb823603051b8f41c27bc066d)), closes [#3099](https://github.com/swagger-api/apidom/issues/3099)
- add OpenAPI 2.0 YAML 1.2 parser adapter ([#3335](https://github.com/swagger-api/apidom/issues/3335)) ([62b5b07](https://github.com/swagger-api/apidom/commit/62b5b07219a5d63fd8103c7556306e1119f31cfb)), closes [#3098](https://github.com/swagger-api/apidom/issues/3098)

# [0.80.0](https://github.com/swagger-api/apidom/compare/v0.79.0...v0.80.0) (2023-10-26)

### Features

- **core:** support cycles in deep cloning ([#3322](https://github.com/swagger-api/apidom/issues/3322)) ([a9ba0a5](https://github.com/swagger-api/apidom/commit/a9ba0a5e2ad04395682cd9e7bb2feea2e4473fe3)), closes [#3290](https://github.com/swagger-api/apidom/issues/3290)

# [0.79.0](https://github.com/swagger-api/apidom/compare/v0.78.0...v0.79.0) (2023-10-24)

### Bug Fixes

- **ns-openapi-2:** add support for JSONReferenceElement ([#3283](https://github.com/swagger-api/apidom/issues/3283)) ([b6e6d59](https://github.com/swagger-api/apidom/commit/b6e6d594efca0e102597790cdc89849b6803b1de)), closes [#3097](https://github.com/swagger-api/apidom/issues/3097)

### Features

- **ns-openapi-2:** add replace empty elements refractor plugin ([#3315](https://github.com/swagger-api/apidom/issues/3315)) ([ade3a67](https://github.com/swagger-api/apidom/commit/ade3a67f18a6f4aa3aa69cea0537482e1a15cfdb)), closes [#3097](https://github.com/swagger-api/apidom/issues/3097)
- **ns-openapi-2:** add support for Definitions Object ([#3292](https://github.com/swagger-api/apidom/issues/3292)) ([2d5ac83](https://github.com/swagger-api/apidom/commit/2d5ac83c8407d7f4cfc31ada40a22c37b282c669)), closes [#3097](https://github.com/swagger-api/apidom/issues/3097)
- **ns-openapi-2:** add support for Operation Object ([#3305](https://github.com/swagger-api/apidom/issues/3305)) ([4770077](https://github.com/swagger-api/apidom/commit/4770077d09cc094cbf53ff036c7b97f2b136273b)), closes [#3097](https://github.com/swagger-api/apidom/issues/3097)
- **ns-openapi-2:** add support for Parameters Definitions Object ([#3291](https://github.com/swagger-api/apidom/issues/3291)) ([21a237c](https://github.com/swagger-api/apidom/commit/21a237cc7de6857c256f3b6b2934e67efa028603)), closes [#3097](https://github.com/swagger-api/apidom/issues/3097)
- **ns-openapi-2:** add support for PathItem Object ([#3307](https://github.com/swagger-api/apidom/issues/3307)) ([9ad49be](https://github.com/swagger-api/apidom/commit/9ad49be86672170ab1cf5c148f01de84647599ea)), closes [#3097](https://github.com/swagger-api/apidom/issues/3097)
- **ns-openapi-2:** add support for Response Object ([#3293](https://github.com/swagger-api/apidom/issues/3293)) ([006ec69](https://github.com/swagger-api/apidom/commit/006ec698f77536cd1191a200653701d2edab6aef)), closes [#3097](https://github.com/swagger-api/apidom/issues/3097)
- **ns-openapi-2:** add support for Responses Definitions Object ([#3294](https://github.com/swagger-api/apidom/issues/3294)) ([51b15fe](https://github.com/swagger-api/apidom/commit/51b15fe0d7460cd55737cc29b5fa49f3a1c82b67)), closes [#3097](https://github.com/swagger-api/apidom/issues/3097)
- **ns-openapi-2:** add support for Responses Object ([#3295](https://github.com/swagger-api/apidom/issues/3295)) ([d8ea760](https://github.com/swagger-api/apidom/commit/d8ea76006089e2ef54cc910983fe546d09ddb59e)), closes [#3097](https://github.com/swagger-api/apidom/issues/3097)
- **ns-openapi-2:** add support for Swagger Object ([#3313](https://github.com/swagger-api/apidom/issues/3313)) ([81a0361](https://github.com/swagger-api/apidom/commit/81a036161f133eed144897de4119d31d20a089a1)), closes [#3097](https://github.com/swagger-api/apidom/issues/3097)
- **ns-openpai-2:** add support for Paths Object ([#3312](https://github.com/swagger-api/apidom/issues/3312)) ([a3db4c2](https://github.com/swagger-api/apidom/commit/a3db4c2555e9b1ac95ee3b6836c8e7c6203cda61)), closes [#3097](https://github.com/swagger-api/apidom/issues/3097)
- **predicates:** implement TypeScript type guards ([#3289](https://github.com/swagger-api/apidom/issues/3289)) ([0cae70a](https://github.com/swagger-api/apidom/commit/0cae70aa3edc17ecc628c21e30a6b2ac1e992372)), closes [#3280](https://github.com/swagger-api/apidom/issues/3280)

# [0.78.0](https://github.com/swagger-api/apidom/compare/v0.77.0...v0.78.0) (2023-10-17)

### Bug Fixes

- **ns-openapi-3:** support only subset of JSON Schema Draft 4/5 ([#3265](https://github.com/swagger-api/apidom/issues/3265)) ([e8a19d1](https://github.com/swagger-api/apidom/commit/e8a19d18ad43959a688a004e5d277553b0a171ac))
- **reference:** avoid double encoding special characters in url.sanitize() ([#3271](https://github.com/swagger-api/apidom/issues/3271)) ([60eb1f4](https://github.com/swagger-api/apidom/commit/60eb1f41f522445fb44b8aa61d65edfbfc9f35bb)), closes [#3270](https://github.com/swagger-api/apidom/issues/3270)
- **types:** fix regression in @types/ramda@0.29.6 ([#3281](https://github.com/swagger-api/apidom/issues/3281)) ([c6c279f](https://github.com/swagger-api/apidom/commit/c6c279f526e07b16221d8c00dd0041eeb93e1290)), closes [#3279](https://github.com/swagger-api/apidom/issues/3279)

### Features

- add initial implementation of ApiDOM logging facility ([#3233](https://github.com/swagger-api/apidom/issues/3233)) ([a3a96d1](https://github.com/swagger-api/apidom/commit/a3a96d1b9979f0e38433c7bad6d8f9eb265c5f60)), closes [#3197](https://github.com/swagger-api/apidom/issues/3197)
- **logging:** add initial implementation of Formatter ([#3272](https://github.com/swagger-api/apidom/issues/3272)) ([eae432e](https://github.com/swagger-api/apidom/commit/eae432ef610fe012245cdb005e038ee4ada9f29a)), closes [#3197](https://github.com/swagger-api/apidom/issues/3197)
- **ns-openapi-2:** add support for Contact Object ([#3236](https://github.com/swagger-api/apidom/issues/3236)) ([4f0c783](https://github.com/swagger-api/apidom/commit/4f0c783ff7910940d28f4fe3a166418d36c12357)), closes [#3097](https://github.com/swagger-api/apidom/issues/3097)
- **ns-openapi-2:** add support for Example Object ([#3247](https://github.com/swagger-api/apidom/issues/3247)) ([e9d1e3e](https://github.com/swagger-api/apidom/commit/e9d1e3ebf83de9fee002e0442df37af4f7898e32)), closes [#3097](https://github.com/swagger-api/apidom/issues/3097)
- **ns-openapi-2:** add support for External Documentation Object ([#3235](https://github.com/swagger-api/apidom/issues/3235)) ([b12d915](https://github.com/swagger-api/apidom/commit/b12d915a8a56e46b7d7db4f516c595e442524f2f)), closes [#3097](https://github.com/swagger-api/apidom/issues/3097)
- **ns-openapi-2:** add support for Header Object ([#3250](https://github.com/swagger-api/apidom/issues/3250)) ([67abec5](https://github.com/swagger-api/apidom/commit/67abec52a1d6427040b7c59118f8f5fb8b155bca)), closes [#3097](https://github.com/swagger-api/apidom/issues/3097)
- **ns-openapi-2:** add support for Headers Object ([#3256](https://github.com/swagger-api/apidom/issues/3256)) ([a756102](https://github.com/swagger-api/apidom/commit/a7561027baf82c266119d7a28eb90496d88b6cff)), closes [#3097](https://github.com/swagger-api/apidom/issues/3097)
- **ns-openapi-2:** add support for Info Object ([#3245](https://github.com/swagger-api/apidom/issues/3245)) ([219f96d](https://github.com/swagger-api/apidom/commit/219f96dc9295594020083abb3910ef8ad38ea6aa)), closes [#3097](https://github.com/swagger-api/apidom/issues/3097)
- **ns-openapi-2:** add support for Items Object ([#3248](https://github.com/swagger-api/apidom/issues/3248)) ([cc239a0](https://github.com/swagger-api/apidom/commit/cc239a0952dfdb9786250c974a74050be3bd3403)), closes [#3097](https://github.com/swagger-api/apidom/issues/3097)
- **ns-openapi-2:** add support for License Object ([#3244](https://github.com/swagger-api/apidom/issues/3244)) ([a2737c5](https://github.com/swagger-api/apidom/commit/a2737c5a3cbe8bb3f3c3ae733084be288665db56)), closes [#3097](https://github.com/swagger-api/apidom/issues/3097)
- **ns-openapi-2:** add support for Parameter Object ([#3257](https://github.com/swagger-api/apidom/issues/3257)) ([ae5e27d](https://github.com/swagger-api/apidom/commit/ae5e27d67974e4fd2a367bc8a70815ff52beb1d9)), closes [#3097](https://github.com/swagger-api/apidom/issues/3097)
- **ns-openapi-2:** add support for Reference Object ([#3264](https://github.com/swagger-api/apidom/issues/3264)) ([637bcbe](https://github.com/swagger-api/apidom/commit/637bcbe398d65f48ac54c00f082abf1d88b7895d)), closes [#3097](https://github.com/swagger-api/apidom/issues/3097)
- **ns-openapi-2:** add support for Schema Object ([#3273](https://github.com/swagger-api/apidom/issues/3273)) ([6e046ac](https://github.com/swagger-api/apidom/commit/6e046ac56400f7702e7b08450a33ce2fff4e720b)), closes [#3097](https://github.com/swagger-api/apidom/issues/3097)
- **ns-openapi-2:** add support for Scopes Object ([#3226](https://github.com/swagger-api/apidom/issues/3226)) ([4226eab](https://github.com/swagger-api/apidom/commit/4226eab89e664c21951b08f974666ae89b17ec30)), closes [#3097](https://github.com/swagger-api/apidom/issues/3097)
- **ns-openapi-2:** add support for Security Definitions Object ([#3228](https://github.com/swagger-api/apidom/issues/3228)) ([0219048](https://github.com/swagger-api/apidom/commit/02190483c1079885ceb78c3f1e68bcd7aaaeefc2)), closes [#3097](https://github.com/swagger-api/apidom/issues/3097)
- **ns-openapi-2:** add support for Security Requirement Object ([#3225](https://github.com/swagger-api/apidom/issues/3225)) ([dab4908](https://github.com/swagger-api/apidom/commit/dab49083b4f9c45747a690a2c342a672a03adbdb)), closes [#3097](https://github.com/swagger-api/apidom/issues/3097)
- **ns-openapi-2:** add support for Security Scheme Object ([#3227](https://github.com/swagger-api/apidom/issues/3227)) ([b3fc9d8](https://github.com/swagger-api/apidom/commit/b3fc9d8b333afab8a214a5101ded2840336fbe81)), closes [#3097](https://github.com/swagger-api/apidom/issues/3097)
- **ns-openapi-2:** add support for Tag Object ([#3246](https://github.com/swagger-api/apidom/issues/3246)) ([7adf623](https://github.com/swagger-api/apidom/commit/7adf6233a956bda44d3fb1aabcccb9645955ccf9)), closes [#3097](https://github.com/swagger-api/apidom/issues/3097)
- **ns-openapi-2:** add support for XML Object ([#3234](https://github.com/swagger-api/apidom/issues/3234)) ([9c0b4f5](https://github.com/swagger-api/apidom/commit/9c0b4f5d1c06bcb769b828306053acb26d963b78)), closes [#3097](https://github.com/swagger-api/apidom/issues/3097)
- scaffold OpenAPI 2.0 namespace package ([#3218](https://github.com/swagger-api/apidom/issues/3218)) ([d949353](https://github.com/swagger-api/apidom/commit/d949353f7779690414fb74aafedff230ddf77cd3)), closes [#3097](https://github.com/swagger-api/apidom/issues/3097)

# [0.77.0](https://github.com/swagger-api/apidom/compare/v0.76.2...v0.77.0) (2023-10-03)

### Bug Fixes

- **core:** always perform immutable async traversal ([#3164](https://github.com/swagger-api/apidom/issues/3164)) ([a47f870](https://github.com/swagger-api/apidom/commit/a47f87018fcca235bd1490e1f014bcdd2430b2d5)), closes [#3110](https://github.com/swagger-api/apidom/issues/3110)
- **core:** always perform immutable traversal ([#3163](https://github.com/swagger-api/apidom/issues/3163)) ([f2fcab0](https://github.com/swagger-api/apidom/commit/f2fcab0c7a68ca0c39fae6165ff9b5fdf0f12e52)), closes [#3110](https://github.com/swagger-api/apidom/issues/3110)
- **docker:** make all tests pass in docker setup ([#3159](https://github.com/swagger-api/apidom/issues/3159)) ([8dcc846](https://github.com/swagger-api/apidom/commit/8dcc84666366c8c2fce2e3f71348d33ca2513d2d))
- **reference:** fix how OpenAPI 3.1.0 Reference Object is merged ([#3215](https://github.com/swagger-api/apidom/issues/3215)) ([77a6823](https://github.com/swagger-api/apidom/commit/77a68230035cbbdd5b1042b65f16733864868454))

### Features

- **ast:** apply upstream changes to core visitor/traversal mechanism ([#3187](https://github.com/swagger-api/apidom/issues/3187)) ([1f4306b](https://github.com/swagger-api/apidom/commit/1f4306be9e639d6d80373fec5dca02e57c24466e)), closes [/github.com/swagger-api/apidom/blob/79da9ab06385718dd780da811f6bc6a438d2ff07/NOTICE#L12-L14](https://github.com//github.com/swagger-api/apidom/blob/79da9ab06385718dd780da811f6bc6a438d2ff07/NOTICE/issues/L12-L14)
- **core:** introduce functions for shallow and deep cloning ([#3158](https://github.com/swagger-api/apidom/issues/3158)) ([549a7ff](https://github.com/swagger-api/apidom/commit/549a7ff01396a0a9ecb02171c9f817bcfe0f4af6)), closes [#3110](https://github.com/swagger-api/apidom/issues/3110)

## [0.76.2](https://github.com/swagger-api/apidom/compare/v0.76.1...v0.76.2) (2023-09-08)

### Bug Fixes

- **build:** apply polyfills with transform runtime babel plugin ([#3132](https://github.com/swagger-api/apidom/issues/3132)) ([4b4754d](https://github.com/swagger-api/apidom/commit/4b4754da33a4a25d47f926c8a14b59cfdfa6b50c))

## [0.76.1](https://github.com/swagger-api/apidom/compare/v0.76.0...v0.76.1) (2023-09-07)

### Bug Fixes

- **error:** polyfill AggregateError in older environments ([#3129](https://github.com/swagger-api/apidom/issues/3129)) ([484d9e6](https://github.com/swagger-api/apidom/commit/484d9e6c34534aa37c696a5154af72cfcc9de09c)), closes [#3128](https://github.com/swagger-api/apidom/issues/3128)

# [0.76.0](https://github.com/swagger-api/apidom/compare/v0.75.0...v0.76.0) (2023-09-01)

### Bug Fixes

- **parser-adapter-yaml-1-2:** fix bug related to explicit tag resolution ([#3090](https://github.com/swagger-api/apidom/issues/3090)) ([8d8bdc4](https://github.com/swagger-api/apidom/commit/8d8bdc4168dfbb43614de2c4e89d11538647598c)), closes [#3039](https://github.com/swagger-api/apidom/issues/3039)

### Features

- add apidom-error package ([#3067](https://github.com/swagger-api/apidom/issues/3067)) ([7432a09](https://github.com/swagger-api/apidom/commit/7432a091f2058a31ac046633b33ee10e91fe9e8a)), closes [#3039](https://github.com/swagger-api/apidom/issues/3039)
- **error:** introduce generic custom errors ([#3077](https://github.com/swagger-api/apidom/issues/3077)) ([aba5434](https://github.com/swagger-api/apidom/commit/aba543498bcc841d4db06ba434af5cd029433b8c)), closes [#3039](https://github.com/swagger-api/apidom/issues/3039)
- **json-path:** use error hierarchy and metadata when throwing errors ([#3107](https://github.com/swagger-api/apidom/issues/3107)) ([d55a846](https://github.com/swagger-api/apidom/commit/d55a8466de9814f19aedbacb48c55761f2f3fe38)), closes [#3039](https://github.com/swagger-api/apidom/issues/3039)
- **json-pointer-relative:** use error hierarchy and metadata when trowing errors ([#3108](https://github.com/swagger-api/apidom/issues/3108)) ([deaed14](https://github.com/swagger-api/apidom/commit/deaed142acd9881062fc65156e1162b48a580751)), closes [#3039](https://github.com/swagger-api/apidom/issues/3039)
- **json-pointer:** use error hierarchy and metadata when throwing errors ([#3106](https://github.com/swagger-api/apidom/issues/3106)) ([a17f250](https://github.com/swagger-api/apidom/commit/a17f25052db0d83f1ac3fcea94f2e58b50105df8)), closes [#3039](https://github.com/swagger-api/apidom/issues/3039)
- **ls:** app option for apidom-reference based ref validation ([f97349b](https://github.com/swagger-api/apidom/commit/f97349b3e9baec47a2c0cb1531ff59fb7cd0b4d8))
- **ls:** concurrent and serial ref validation with refSet re-use ([76fb5a1](https://github.com/swagger-api/apidom/commit/76fb5a1501e364da56876d52690d030aefebb6da))

# [0.75.0](https://github.com/swagger-api/apidom/compare/v0.74.1...v0.75.0) (2023-08-22)

### Bug Fixes

- **ls:** fix linting code consistency ([#3005](https://github.com/swagger-api/apidom/issues/3005)) ([4634867](https://github.com/swagger-api/apidom/commit/46348677ad82c4244eaf8108cbe8794eb75f9cab))

### Features

- add support for Relative JSON Pointer ([#3031](https://github.com/swagger-api/apidom/issues/3031)) ([f537584](https://github.com/swagger-api/apidom/commit/f537584adc4559f682e2a5995b2419b043ad71c5)), closes [#3030](https://github.com/swagger-api/apidom/issues/3030)
- **ls:** add completion for OAS callback patterned fields ([42af8e4](https://github.com/swagger-api/apidom/commit/42af8e411a9a8460f1e84ce17615aa580400415a)), closes [#2356](https://github.com/swagger-api/apidom/issues/2356)
- **ls:** add linting rule for OAS server variable enum and default ([4e2b56b](https://github.com/swagger-api/apidom/commit/4e2b56bb0507b13bf31eee59df13c14949f7e81e)), closes [#2787](https://github.com/swagger-api/apidom/issues/2787) [#2788](https://github.com/swagger-api/apidom/issues/2788)

## [0.74.1](https://github.com/swagger-api/apidom/compare/v0.74.0...v0.74.1) (2023-07-28)

### Bug Fixes

- **ls:** fix condition for server URL linting ([42f7575](https://github.com/swagger-api/apidom/commit/42f7575fbe6f94a28f35e7cfadc29c8929ca86a5))
- **ls:** process schema 'null' / 'nullable' depending on spec version ([d053dca](https://github.com/swagger-api/apidom/commit/d053dcafb3a8df84162564bf6cc823c514af2fe9))
- **ls:** replace legacy buildJsonPointer with apidom-json-pointer ([70a359f](https://github.com/swagger-api/apidom/commit/70a359f2d2485a9c85fc63de099358dcdbc42ddc))
- **ns-openapi-3-0:** provide missing reference metadata ([#2987](https://github.com/swagger-api/apidom/issues/2987)) ([d7cc458](https://github.com/swagger-api/apidom/commit/d7cc458bd91b8ae26763d6c77370a39e0170a6a5)), closes [#2980](https://github.com/swagger-api/apidom/issues/2980)
- **ns-openapi-3-0:** provide missing reference metadata for Schema Object definitions keyword ([#2988](https://github.com/swagger-api/apidom/issues/2988)) ([5127577](https://github.com/swagger-api/apidom/commit/51275770869f747d7ca60799811f3f6f541fcd15)), closes [#2980](https://github.com/swagger-api/apidom/issues/2980)

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

### Performance Improvements

- **parser-adapter-yaml-1-2:** use tree-sitter cursor for CST traversal ([#2955](https://github.com/swagger-api/apidom/issues/2955)) ([c46ae6a](https://github.com/swagger-api/apidom/commit/c46ae6a3b7eb511e38f7576bfc0bff1a8bf4e9ae)), closes [#691](https://github.com/swagger-api/apidom/issues/691)

## [0.71.1](https://github.com/swagger-api/apidom/compare/v0.71.0...v0.71.1) (2023-07-14)

### Reverts

- use babel plugin to capture error causes ([#2951](https://github.com/swagger-api/apidom/issues/2951)) ([e31fcae](https://github.com/swagger-api/apidom/commit/e31fcaea4b0238cabc3c0f97bc2d610f75ad56a5))

# [0.71.0](https://github.com/swagger-api/apidom/compare/v0.70.4...v0.71.0) (2023-07-13)

### Bug Fixes

- **apidom-ls:** add deprecated warning for example ([#2909](https://github.com/swagger-api/apidom/issues/2909)) ([564d185](https://github.com/swagger-api/apidom/commit/564d18561d2ebf8acc928de4f729234681fe7470))
- **ls:** add support for AsyncAPI 2.5/2.6 to common Schema Object ([#2917](https://github.com/swagger-api/apidom/issues/2917)) ([34c8b1f](https://github.com/swagger-api/apidom/commit/34c8b1fa1f39e9a0f98653580d422c8a986e446f))
- **ls:** remove duplicate linting codes ([#2946](https://github.com/swagger-api/apidom/issues/2946)) ([c5db0a8](https://github.com/swagger-api/apidom/commit/c5db0a8e47f88fbac6ad95eafbfbd03ec1b0ab46)), closes [#2982](https://github.com/swagger-api/apidom/issues/2982) [#2923](https://github.com/swagger-api/apidom/issues/2923)

### Features

- add better YAML syntax error messages ([#2931](https://github.com/swagger-api/apidom/issues/2931)) ([5a1d14a](https://github.com/swagger-api/apidom/commit/5a1d14a179da60df666a18e6ae04155c1065bddd)), closes [#2914](https://github.com/swagger-api/apidom/issues/2914) [#2889](https://github.com/swagger-api/apidom/issues/2889)
- **ls:** make lint messages more helpful ([#2930](https://github.com/swagger-api/apidom/issues/2930)) ([4504674](https://github.com/swagger-api/apidom/commit/450467419ab9234617ab1510cfab7b155741af3f))
- **reference:** support native fragment deref/resolve - AsyncAPI 2.x ([#2945](https://github.com/swagger-api/apidom/issues/2945)) ([2b75f78](https://github.com/swagger-api/apidom/commit/2b75f785b21ff02605fb10d24865b876ffd4281a)), closes [#2934](https://github.com/swagger-api/apidom/issues/2934)
- **reference:** support native fragment deref/resolve - OpenAPI 3.1 / Path Item Object ([d7f82ee](https://github.com/swagger-api/apidom/commit/d7f82eec9ed80498f8d156a195042c5d6420027e)), closes [#2934](https://github.com/swagger-api/apidom/issues/2934)
- **reference:** support native fragment deref/resolve - OpenAPI 3.1 / Reference Object ([#2942](https://github.com/swagger-api/apidom/issues/2942)) ([c5520ef](https://github.com/swagger-api/apidom/commit/c5520efec7eda8e7525afedc9ebd4a592fbafc9e)), closes [#2934](https://github.com/swagger-api/apidom/issues/2934)
- **reference:** support native fragment deref/resolve - Schema Object ([#2941](https://github.com/swagger-api/apidom/issues/2941)) ([689b63a](https://github.com/swagger-api/apidom/commit/689b63a92a6ec2268422db0af2da1edc4c57a592)), closes [#2934](https://github.com/swagger-api/apidom/issues/2934)

## [0.70.4](https://github.com/swagger-api/apidom/compare/v0.70.3...v0.70.4) (2023-06-28)

### Bug Fixes

- **parser-adapter-json:** construct proper JavaScript string value ([#2896](https://github.com/swagger-api/apidom/issues/2896)) ([fcdd3d5](https://github.com/swagger-api/apidom/commit/fcdd3d5144fe74eb5a05af20a1f8ddb1c9411ae4)), closes [#2670](https://github.com/swagger-api/apidom/issues/2670)

### Performance Improvements

- **parser-adapter-json:** use tree-sitter cursor for CST traversal ([#2891](https://github.com/swagger-api/apidom/issues/2891)) ([13a8567](https://github.com/swagger-api/apidom/commit/13a85672e8ae158ce635d5b52b6828180876d21c)), closes [#691](https://github.com/swagger-api/apidom/issues/691)
- **parser-adapter-json:** use tree-sitter cursor for CST traversal (indirect) ([#2895](https://github.com/swagger-api/apidom/issues/2895)) ([3f9c9a2](https://github.com/swagger-api/apidom/commit/3f9c9a2fbbfd4afdcf17cdce34523c0229444b15)), closes [#691](https://github.com/swagger-api/apidom/issues/691)

## [0.70.3](https://github.com/swagger-api/apidom/compare/v0.70.2...v0.70.3) (2023-06-27)

### Bug Fixes

- **deps:** add missing @swagger-api/apidom-ast dep ([#2875](https://github.com/swagger-api/apidom/issues/2875)) ([a7f0d15](https://github.com/swagger-api/apidom/commit/a7f0d15847e40c2eac831190844dfa28d3881c8c)), closes [#2871](https://github.com/swagger-api/apidom/issues/2871)
- **ls:** fix OpenAPI 3.x.y Server.url field linting ([#2876](https://github.com/swagger-api/apidom/issues/2876)) ([a8cc07f](https://github.com/swagger-api/apidom/commit/a8cc07f9abad786a0fecb4a474b9f84501978abf)), closes [#2858](https://github.com/swagger-api/apidom/issues/2858)
- **parser-adapter-yaml-1-2:** enable maximum error recovery ([#2881](https://github.com/swagger-api/apidom/issues/2881)) ([b7d0803](https://github.com/swagger-api/apidom/commit/b7d080310d7c6b019414d12aadffc62dd4c28e8a)), closes [#194](https://github.com/swagger-api/apidom/issues/194)

## [0.70.2](https://github.com/swagger-api/apidom/compare/v0.70.1...v0.70.2) (2023-06-16)

### Performance Improvements

- **reference:** add caching capability for OpenAPI 3.1 uri selector ([#2869](https://github.com/swagger-api/apidom/issues/2869)) ([439764f](https://github.com/swagger-api/apidom/commit/439764f51efef4f810bf0f4a73c7c72278d4240a)), closes [#2867](https://github.com/swagger-api/apidom/issues/2867)

## [0.70.1](https://github.com/swagger-api/apidom/compare/v0.70.0...v0.70.1) (2023-06-15)

### Features

- add support for Node.js@18 and Node.js@20 ([#2857](https://github.com/swagger-api/apidom/issues/2857)) ([d93f959](https://github.com/swagger-api/apidom/commit/d93f95958c63530aa1ccda1c016f9ae19d5d308a)), closes [#2851](https://github.com/swagger-api/apidom/issues/2851)

# [0.70.0](https://github.com/swagger-api/apidom/compare/v0.69.3...v0.70.0) (2023-05-23)

### Features

- **apidom-ls:** update exports for JSON Schema validators ([99a21b7](https://github.com/swagger-api/apidom/commit/99a21b7139dafef17ecf2d0faba8280f44ad5de5))

## [0.69.3](https://github.com/swagger-api/apidom/compare/v0.69.2...v0.69.3) (2023-04-27)

### Bug Fixes

- **ls:** provide completion items with proper filtering ([#2734](https://github.com/swagger-api/apidom/issues/2734)) ([0c26b31](https://github.com/swagger-api/apidom/commit/0c26b319f86f6e51ca3e7479751f871873e9c18b))

## [0.69.2](https://github.com/swagger-api/apidom/compare/v0.69.1...v0.69.2) (2023-04-03)

### Bug Fixes

- **core:** fix issues in YAML 1.2 serialization ([#2669](https://github.com/swagger-api/apidom/issues/2669)) ([6cc91fb](https://github.com/swagger-api/apidom/commit/6cc91fb0edd6b47fe3e8656539f0f655a5f79c3f))
- **reference:** use parent in ancestors lineage ([#2675](https://github.com/swagger-api/apidom/issues/2675)) ([9498f41](https://github.com/swagger-api/apidom/commit/9498f414cc0ba011ad0214e118aeacbbc46251e5))

## [0.69.1](https://github.com/swagger-api/apidom/compare/v0.69.0...v0.69.1) (2023-03-28)

### Bug Fixes

- **ls:** fix OpenAPI Header Object required fields lint ([#2653](https://github.com/swagger-api/apidom/issues/2653)) ([141edb4](https://github.com/swagger-api/apidom/commit/141edb415690550e788df7f6cd36fa9b84616ba4)), closes [#2392](https://github.com/swagger-api/apidom/issues/2392)
- **ls:** fix typos in lint messages ([#2652](https://github.com/swagger-api/apidom/issues/2652)) ([fee2e93](https://github.com/swagger-api/apidom/commit/fee2e9357cfa22709bc386f264b722e3625aea2c)), closes [#2392](https://github.com/swagger-api/apidom/issues/2392)
- **ls:** serialize dereferenced ApiDOM to proper format ([#2663](https://github.com/swagger-api/apidom/issues/2663)) ([813b114](https://github.com/swagger-api/apidom/commit/813b114f7e6727efe43f94ba4b0fd65bcc177bbc)), closes [#2662](https://github.com/swagger-api/apidom/issues/2662)

# [0.69.0](https://github.com/swagger-api/apidom/compare/v0.68.1...v0.69.0) (2023-02-28)

### Features

- add support for publishing to npmjs.com ([#2597](https://github.com/swagger-api/apidom/issues/2597)) ([5ac3cd9](https://github.com/swagger-api/apidom/commit/5ac3cd9a83bbe3b4ce2fac732633fb179cd9747f)), closes [#2290](https://github.com/swagger-api/apidom/issues/2290)
- **reference:** mark the deps from saturated config as optional ([#2591](https://github.com/swagger-api/apidom/issues/2591)) ([28ff997](https://github.com/swagger-api/apidom/commit/28ff99776580c4a8f17218bdb8f02e838cd6c665)), closes [#2590](https://github.com/swagger-api/apidom/issues/2590)

### Reverts

- set next release version to 0.69.0 ([0037344](https://github.com/swagger-api/apidom/commit/0037344c81d6a190d6708ef1c1d6f560da22002b))

## [0.68.1](https://github.com/swagger-api/apidom/compare/v0.68.0...v0.68.1) (2023-02-20)

### Bug Fixes

- **build:** map all side effects within the packages ([#2574](https://github.com/swagger-api/apidom/issues/2574)) ([ed1dcf5](https://github.com/swagger-api/apidom/commit/ed1dcf5a17a801776eb93c1d4262024194a58fea)), closes [#2566](https://github.com/swagger-api/apidom/issues/2566)

# [0.68.0](https://github.com/swagger-api/apidom/compare/v0.67.1...v0.68.0) (2023-02-16)

### Features

- **ast:** add sideEffects field to package.json ([c2d8104](https://github.com/swagger-api/apidom/commit/c2d8104141465f5000e1ba1b659ab2ecaf374608)), closes [#2566](https://github.com/swagger-api/apidom/issues/2566)
- **core:** add sideEffects field to package.json ([27a6eb5](https://github.com/swagger-api/apidom/commit/27a6eb5752e4a5b85214755a4b9e00cf70688cc9)), closes [#2566](https://github.com/swagger-api/apidom/issues/2566)
- **json-path:** add sideEffects field to package.json ([1e6e75b](https://github.com/swagger-api/apidom/commit/1e6e75b948e8da6a65f94dc9a398f96d7cdad4fc)), closes [#2566](https://github.com/swagger-api/apidom/issues/2566)
- **json-pointer:** add sideEffects field to package.json ([85d32e9](https://github.com/swagger-api/apidom/commit/85d32e9d01af4ba9d6598d3f9c4649390b4348f7)), closes [#2566](https://github.com/swagger-api/apidom/issues/2566)
- **ns-api-design-systems:** add sideEffects field to package.json ([24c0fe3](https://github.com/swagger-api/apidom/commit/24c0fe3e95f5866f2069d481ef30dcf2e0ea7fc9)), closes [#2566](https://github.com/swagger-api/apidom/issues/2566)
- **ns-asyncapi-2:** add sideEffects field to package.json ([6f740a3](https://github.com/swagger-api/apidom/commit/6f740a3edbaeacd3fd0028ef328af97dbe8d58c8)), closes [#2566](https://github.com/swagger-api/apidom/issues/2566)
- **ns-json-schema-draft-4:** add sideEffects field to package.json ([3b52219](https://github.com/swagger-api/apidom/commit/3b522191645bca55dafe07808c9801f723386eb6)), closes [#2566](https://github.com/swagger-api/apidom/issues/2566)
- **ns-json-schema-draft-6:** add sideEffects field to package.json ([aef6a49](https://github.com/swagger-api/apidom/commit/aef6a49312c1fe4fdf73af0ced13268443fc10d7)), closes [#2566](https://github.com/swagger-api/apidom/issues/2566)
- **ns-json-schema-draft-7:** add sideEffects field to package.json ([e9706ab](https://github.com/swagger-api/apidom/commit/e9706ab7677c8558d7959ea5760f0102ea8a9b9f)), closes [#2566](https://github.com/swagger-api/apidom/issues/2566)
- **ns-openapi-3-0:** add sideEffects field to package.json ([6dae3e0](https://github.com/swagger-api/apidom/commit/6dae3e0e95a788b0bbeffc24dd42d30a502e8bc9)), closes [#2566](https://github.com/swagger-api/apidom/issues/2566)
- **ns-openapi-3-1:** add sideEffects field to package.json ([585e0b6](https://github.com/swagger-api/apidom/commit/585e0b677ac3a09201ebdf3bb331437d7f806380)), closes [#2566](https://github.com/swagger-api/apidom/issues/2566)
- **ns-workflows-1:** add sideEffects field to package.json ([faf7be0](https://github.com/swagger-api/apidom/commit/faf7be0c54847e8f400f106900f86918e5cbc461)), closes [#2566](https://github.com/swagger-api/apidom/issues/2566)
- **parser-adapter-ads-json:** add sideEffects field to package.json ([178a40e](https://github.com/swagger-api/apidom/commit/178a40ece875cd48bbd798f4b418dd62734bd272)), closes [#2566](https://github.com/swagger-api/apidom/issues/2566)
- **parser-adapter-ads-yaml:** add sideEffects field to package.json ([88c760a](https://github.com/swagger-api/apidom/commit/88c760a92b6d82cff52806d9d6178f9b7e491a2d)), closes [#2566](https://github.com/swagger-api/apidom/issues/2566)
- **parser-adapter-json:** add sideEffects field to package.json ([04283c4](https://github.com/swagger-api/apidom/commit/04283c4820ba58489fae72537200a229d6ae974b)), closes [#2566](https://github.com/swagger-api/apidom/issues/2566)
- **parser-adapter-yaml-1-2:** add sideEffects field to package.json ([8e27614](https://github.com/swagger-api/apidom/commit/8e276147128081f9001b2a637cf9a27cba30d6ee)), closes [#2566](https://github.com/swagger-api/apidom/issues/2566)
- **parser-asyncapi-json-2:** add sideEffects field to package.json ([c4908fc](https://github.com/swagger-api/apidom/commit/c4908fcf4b5f8c9e52a4362d48a139b1e0e1f70e)), closes [#2566](https://github.com/swagger-api/apidom/issues/2566)
- **parser-asyncapi-yaml-2:** add sideEffects field to package.json ([a4e0e29](https://github.com/swagger-api/apidom/commit/a4e0e299422531e270ec99e712a4921b99a6e3a0)), closes [#2566](https://github.com/swagger-api/apidom/issues/2566)
- **parser-openapi-json-3-0:** add sideEffects field to package.json ([7045c7b](https://github.com/swagger-api/apidom/commit/7045c7bd4c188f5e607ec660d26cc0c2853245bb)), closes [#2566](https://github.com/swagger-api/apidom/issues/2566)
- **parser-openapi-json-3-1:** add sideEffects field to package.json ([a5c9081](https://github.com/swagger-api/apidom/commit/a5c9081b46fd1fec15048da43b74cba97a729e5f)), closes [#2566](https://github.com/swagger-api/apidom/issues/2566)
- **parser-openapi-yaml-3-0:** add sideEffects field to package.json ([d341d99](https://github.com/swagger-api/apidom/commit/d341d99c37983887323af319aba9d91e94bb7677)), closes [#2566](https://github.com/swagger-api/apidom/issues/2566)
- **parser-openapi-yaml-3-1:** add sideEffects field to package.json ([d8d0895](https://github.com/swagger-api/apidom/commit/d8d0895c696be7c3e5bccaae2b7e5a727f7d73f6)), closes [#2566](https://github.com/swagger-api/apidom/issues/2566)
- **parser:** add sideEffects field to package.json ([3370121](https://github.com/swagger-api/apidom/commit/33701215479f63ba07128cd5c8b055cf17b2c474)), closes [#2566](https://github.com/swagger-api/apidom/issues/2566)

## [0.67.1](https://github.com/swagger-api/apidom/compare/v0.67.0...v0.67.1) (2023-02-15)

### Bug Fixes

- **deps:** relax @babel/runtime-corejs3 version ([#2563](https://github.com/swagger-api/apidom/issues/2563)) ([3523a14](https://github.com/swagger-api/apidom/commit/3523a145a8390bb85139d9a8c3919b0c4ef75962)), closes [#2562](https://github.com/swagger-api/apidom/issues/2562)
- **ls:** fix Parameter Object required fields lint rule ([#2545](https://github.com/swagger-api/apidom/issues/2545)) ([cd8ace2](https://github.com/swagger-api/apidom/commit/cd8ace2b1ddcb7b1cf35208692a76602cf17a825))
- **reference:** fix extension of native errors ([#2565](https://github.com/swagger-api/apidom/issues/2565)) ([afd8905](https://github.com/swagger-api/apidom/commit/afd8905fffd966f223b3d8fb696b65c1ec82a78e)), closes [#2561](https://github.com/swagger-api/apidom/issues/2561)
- **reference:** use JavaScript error cause interface ([#2564](https://github.com/swagger-api/apidom/issues/2564)) ([f2e1b51](https://github.com/swagger-api/apidom/commit/f2e1b51b5477f86edec084d40159a2fc03de17f6)), closes [#2561](https://github.com/swagger-api/apidom/issues/2561)

# [0.67.0](https://github.com/swagger-api/apidom/compare/v0.66.0...v0.67.0) (2023-02-07)

### Bug Fixes

- **ls:** make IMBMQ Channel Bindings topic field always optional ([#2523](https://github.com/swagger-api/apidom/issues/2523)) ([f6704d9](https://github.com/swagger-api/apidom/commit/f6704d902c38000ce8f25c4ae62790dbc084a41b)), closes [#2522](https://github.com/swagger-api/apidom/issues/2522)

### Features

- **ls:** add support for AsyncAPI 2.6.0 ([#2538](https://github.com/swagger-api/apidom/issues/2538)) ([04fcc64](https://github.com/swagger-api/apidom/commit/04fcc6445fcc0901e224b9112586daa1b0e03710)), closes [#2520](https://github.com/swagger-api/apidom/issues/2520)
- **ns-asyncapi-i-2:** add support for AsyncAPI 2.6.0 ([#2535](https://github.com/swagger-api/apidom/issues/2535)) ([35c7e8f](https://github.com/swagger-api/apidom/commit/35c7e8f0def90df480c44b580fa1bfe76ab41972)), closes [#2520](https://github.com/swagger-api/apidom/issues/2520)
- **parser-adaptes:** add support for AsyncAPI 2.6.0 ([#2536](https://github.com/swagger-api/apidom/issues/2536)) ([c2d6439](https://github.com/swagger-api/apidom/commit/c2d643904d5835cec28af4327e477f36205388fc)), closes [#2520](https://github.com/swagger-api/apidom/issues/2520)
- **reference:** add support for AsyncAPI 2.6.0 ([#2537](https://github.com/swagger-api/apidom/issues/2537)) ([36cbf2f](https://github.com/swagger-api/apidom/commit/36cbf2f730723996e61f111ca6cac1d76da26327)), closes [#2520](https://github.com/swagger-api/apidom/issues/2520)

# [0.66.0](https://github.com/swagger-api/apidom/compare/v0.65.0...v0.66.0) (2023-01-25)

### Bug Fixes

- **parser-adapter-json:** fix issues in JSON detection regexp ([#2502](https://github.com/swagger-api/apidom/issues/2502)) ([678b440](https://github.com/swagger-api/apidom/commit/678b44003c6241d7e97d36d5c440d2696de4e761)), closes [#2503](https://github.com/swagger-api/apidom/issues/2503)

### Features

- **reference:** export DereferenceStrategy symbol ([#2499](https://github.com/swagger-api/apidom/issues/2499)) ([3d6016d](https://github.com/swagger-api/apidom/commit/3d6016d909706a48f6e637c3fee3eec098f17c5e))

# [0.65.0](https://github.com/swagger-api/apidom/compare/v0.64.0...v0.65.0) (2023-01-20)

### Bug Fixes

- **core:** fix isArrayElement predicate polymorhic characteristics ([#2484](https://github.com/swagger-api/apidom/issues/2484)) ([2b77629](https://github.com/swagger-api/apidom/commit/2b7762921cd42daeb0d3ba01f9f7c1d8c7876a4c))

### Features

- **core:** add options support for deepmerge function ([#2485](https://github.com/swagger-api/apidom/issues/2485)) ([764e392](https://github.com/swagger-api/apidom/commit/764e3928c60356d1b7ec5ba21f3e315b17f82aca))
- **core:** addd support for deep merge algorithm ([#2483](https://github.com/swagger-api/apidom/issues/2483)) ([ad3ace5](https://github.com/swagger-api/apidom/commit/ad3ace5b1c5d307cbad079d146e42a36c31d5232))

# [0.64.0](https://github.com/swagger-api/apidom/compare/v0.63.1...v0.64.0) (2023-01-16)

### Bug Fixes

- **json-pointer:** fix JSON Pointer evaluation for % character ([#2461](https://github.com/swagger-api/apidom/issues/2461)) ([cc7167d](https://github.com/swagger-api/apidom/commit/cc7167d66844fde0b279d0dc063712acb622b615)), closes [/www.rfc-editor.org/rfc/rfc6901#section-5](https://github.com//www.rfc-editor.org/rfc/rfc6901/issues/section-5)

### Features

- **core:** introduce logic shortcuts for transducer algorithm ([#2460](https://github.com/swagger-api/apidom/issues/2460)) ([0dd7f7f](https://github.com/swagger-api/apidom/commit/0dd7f7f1333f71d42429a6d27f84beff16b24c41))

## [0.63.1](https://github.com/swagger-api/apidom/compare/v0.63.0...v0.63.1) (2023-01-10)

### Bug Fixes

- **reference:** avoid infinite traversal in AsyncAPI 2.5 dereference ([d4235c9](https://github.com/swagger-api/apidom/commit/d4235c9c77d4783cc95a4d3004a41d788be6a114))
- **reference:** avoid infinite traversal in OpenAPI 3.0 dereference ([9425a67](https://github.com/swagger-api/apidom/commit/9425a678142272e34b7d9794426a941125f5d99c))
- **reference:** avoid infinite traversal in OpenAPI 3.1 dereference ([#2452](https://github.com/swagger-api/apidom/issues/2452)) ([68b4f6b](https://github.com/swagger-api/apidom/commit/68b4f6b6f04a87335093b9941b5a6b6c2492cc87))
- **reference:** fix bug in OpenAPI 3.1.0 Schema Object resolving ([#2445](https://github.com/swagger-api/apidom/issues/2445)) ([5819ac9](https://github.com/swagger-api/apidom/commit/5819ac9c8502d37d3aca950efd83d7f06a68c94d))

# [0.63.0](https://github.com/swagger-api/apidom/compare/v0.62.1...v0.63.0) (2023-01-04)

### Features

- **reference:** add fallbacks for Node.js protocol imports ([#2441](https://github.com/swagger-api/apidom/issues/2441)) ([b8ce5e4](https://github.com/swagger-api/apidom/commit/b8ce5e42c6f4cde89652319323b242827509d605))

## [0.62.1](https://github.com/swagger-api/apidom/compare/v0.62.0...v0.62.1) (2023-01-04)

### Bug Fixes

- **core:** fix serialization of BooleanElement(false) elements ([#2437](https://github.com/swagger-api/apidom/issues/2437)) ([ee52e4b](https://github.com/swagger-api/apidom/commit/ee52e4bef8cbff2eb6fb392aab80c90c8cbe4800))

# [0.62.0](https://github.com/swagger-api/apidom/compare/v0.61.0...v0.62.0) (2023-01-03)

### Features

- **core:** expose refractor plugins dispatcher as public API ([#2427](https://github.com/swagger-api/apidom/issues/2427)) ([a909e76](https://github.com/swagger-api/apidom/commit/a909e76c78bc952f1b8f64691cd6b943b957a786)), closes [#2362](https://github.com/swagger-api/apidom/issues/2362)
- **ns-openapi-3-1:** add Header.example(s) normalization ([#2429](https://github.com/swagger-api/apidom/issues/2429)) ([c8cd9d4](https://github.com/swagger-api/apidom/commit/c8cd9d447c7ccc740ff0bde638afb4e96a9a052c)), closes [#2362](https://github.com/swagger-api/apidom/issues/2362)
- **ns-openapi-3-1:** add Parameter.example(s) normalization refractor plugin ([#2428](https://github.com/swagger-api/apidom/issues/2428)) ([2f58768](https://github.com/swagger-api/apidom/commit/2f5876895c5d4369acd3a852d2402f15767361b5)), closes [#2362](https://github.com/swagger-api/apidom/issues/2362)
- **ns-openapi-3-1:** expose creatToolbox as public API ([#2435](https://github.com/swagger-api/apidom/issues/2435)) ([e2b2c39](https://github.com/swagger-api/apidom/commit/e2b2c39cc3be43fab9fd7d3a9ccbdae8664d168c)), closes [#2362](https://github.com/swagger-api/apidom/issues/2362)

# [0.61.0](https://github.com/swagger-api/apidom/compare/v0.60.0...v0.61.0) (2022-12-31)

### Bug Fixes

- **reference:** fix values of sideEffects fields of package.json ([#2421](https://github.com/swagger-api/apidom/issues/2421)) ([726852f](https://github.com/swagger-api/apidom/commit/726852f07f055fa29d3d58d850b94e205bf1edd2)), closes [#2289](https://github.com/swagger-api/apidom/issues/2289)

### Features

- **reference:** export types for subpath exports in package.json ([#2420](https://github.com/swagger-api/apidom/issues/2420)) ([f5419ea](https://github.com/swagger-api/apidom/commit/f5419eafbd0da3c247ce9ce23441ad7a0307c37e)), closes [#2289](https://github.com/swagger-api/apidom/issues/2289)
- **reference:** expose new symbols to compose dereference strategies ([#2424](https://github.com/swagger-api/apidom/issues/2424)) ([a5fe0da](https://github.com/swagger-api/apidom/commit/a5fe0da40418c1b2fcef8a0d1f24a36f5a8ecf80)), closes [#2289](https://github.com/swagger-api/apidom/issues/2289)

# [0.60.0](https://github.com/swagger-api/apidom/compare/v0.59.0...v0.60.0) (2022-12-28)

### Features

- **reference:** expose File symbol as public API ([#2418](https://github.com/swagger-api/apidom/issues/2418)) ([e3965f4](https://github.com/swagger-api/apidom/commit/e3965f46999f64daefb4f31e0eed05aadd23cba4)), closes [#2289](https://github.com/swagger-api/apidom/issues/2289)
- **reference:** expose HTTPResolver symbol as public API ([#2417](https://github.com/swagger-api/apidom/issues/2417)) ([e101a57](https://github.com/swagger-api/apidom/commit/e101a57efbf4237bce88448722c76f7c7595d71b)), closes [#2289](https://github.com/swagger-api/apidom/issues/2289)

# [0.59.0](https://github.com/swagger-api/apidom/compare/v0.58.0...v0.59.0) (2022-12-27)

### Bug Fixes

- **ls:** add lint rules for OpenAPI 3.1 Reference Object ([#2408](https://github.com/swagger-api/apidom/issues/2408)) ([785a188](https://github.com/swagger-api/apidom/commit/785a188b1d6a664ce96824689f1a1c60f3b026df))
- **ns-openapi-3-1:** add missing setters for SchemaElement ([#2400](https://github.com/swagger-api/apidom/issues/2400)) ([11ccd73](https://github.com/swagger-api/apidom/commit/11ccd73dd75d06e9fe9bd92aa9107d11f79e6534))
- **reference:** fix main field ([#2415](https://github.com/swagger-api/apidom/issues/2415)) ([20566dc](https://github.com/swagger-api/apidom/commit/20566dc077d45354913e6bdf82b5f5f4c29f37a3)), closes [#2718](https://github.com/swagger-api/apidom/issues/2718)
- **reference:** fix OpenAPI 3.1 Schema Object resolution ([#2398](https://github.com/swagger-api/apidom/issues/2398)) ([bc3b33a](https://github.com/swagger-api/apidom/commit/bc3b33a95d7d1afb6bfa06136d24cfd8aea8f235))

### Features

- **reference:** separate abstractions from configuration ([#2409](https://github.com/swagger-api/apidom/issues/2409)) ([0bcf972](https://github.com/swagger-api/apidom/commit/0bcf972cb1624cb507aa5a6d67281480b76d2921)), closes [#2718](https://github.com/swagger-api/apidom/issues/2718)

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
- **ns-openapi-3-1:** avoid returning false in ractor plugins ([#2376](https://github.com/swagger-api/apidom/issues/2376)) ([d4ace47](https://github.com/swagger-api/apidom/commit/d4ace474a450d314d1489116971ec969b56c8d05))

### Features

- **ns-openapi-3-1:** add operationId normalization refractor plugin ([08ad7e4](https://github.com/swagger-api/apidom/commit/08ad7e420b4d8d0ec22c67dfab1cb14ff93c7c18)), closes [#2362](https://github.com/swagger-api/apidom/issues/2362)
- **ns-openapi-3-1:** add parameters normalization refractor plugin ([#2363](https://github.com/swagger-api/apidom/issues/2363)) ([8b44455](https://github.com/swagger-api/apidom/commit/8b444556340750468dae0af924f25b5f19063b79)), closes [#2362](https://github.com/swagger-api/apidom/issues/2362)
- **ns-openapi-3-1:** add security normalization refractor plugin ([#2368](https://github.com/swagger-api/apidom/issues/2368)) ([5ca21e3](https://github.com/swagger-api/apidom/commit/5ca21e392fc9e5e23cdb7d29b690df20476227c0)), closes [#2362](https://github.com/swagger-api/apidom/issues/2362)
- **ns-openapi-3-1:** add servers normalization refractor plugin ([#2372](https://github.com/swagger-api/apidom/issues/2372)) ([3f7b8cc](https://github.com/swagger-api/apidom/commit/3f7b8cc783986adca6c7b613bec56fef0df43703)), closes [#2362](https://github.com/swagger-api/apidom/issues/2362)

# [0.57.0](https://github.com/swagger-api/apidom/compare/v0.56.3...v0.57.0) (2022-12-08)

### Bug Fixes

- **ls:** add lint rule for Parameter example & examples exclusivity ([#2351](https://github.com/swagger-api/apidom/issues/2351)) ([7738b71](https://github.com/swagger-api/apidom/commit/7738b71fd98ef36b834363c3f89486d683ac8c14))
- **ls:** fix completion rules for OpenAPI Media Type Object ([#2353](https://github.com/swagger-api/apidom/issues/2353)) ([5e68e0e](https://github.com/swagger-api/apidom/commit/5e68e0eefe1c41cae59e645195035968be8d2241))
- **ls:** fix links in OpenAPI Server Variable completion & docs ([#2349](https://github.com/swagger-api/apidom/issues/2349)) ([511e8ea](https://github.com/swagger-api/apidom/commit/511e8eae5f98c7e674449d51de038ae72a22c7bc))
- **ls:** fix linting of OpenAPI 3 Server Variable enum field ([#2348](https://github.com/swagger-api/apidom/issues/2348)) ([42ce28c](https://github.com/swagger-api/apidom/commit/42ce28caa02814a287413e7cba0e8774670dd792))
- **ns-openapi:** fix copy&paste typos in getters & setters ([#2311](https://github.com/swagger-api/apidom/issues/2311)) ([b498a99](https://github.com/swagger-api/apidom/commit/b498a99b931f6910d641531a2b5789f45e5f7b14))
- **reference:** dereference OpenAPI 3.1 Schema Object indirections ([#2339](https://github.com/swagger-api/apidom/issues/2339)) ([7e42f0c](https://github.com/swagger-api/apidom/commit/7e42f0c6c4954e1298d5bd9b1c94326b041aa644)), closes [#2338](https://github.com/swagger-api/apidom/issues/2338)

### Features

- **core:** add support for cycles in toValue function ([#2296](https://github.com/swagger-api/apidom/issues/2296)) ([d536ec5](https://github.com/swagger-api/apidom/commit/d536ec55a70187030afe764ef53c46f10f0cff8b)), closes [#2282](https://github.com/swagger-api/apidom/issues/2282)
- **reference:** add support for allowMetaPatches option ([#2337](https://github.com/swagger-api/apidom/issues/2337)) ([22c5c7c](https://github.com/swagger-api/apidom/commit/22c5c7cb29e794f90e343d7828d3c8f7b13fdbeb)), closes [#2336](https://github.com/swagger-api/apidom/issues/2336)
- **reference:** add support for useCircularStructures option ([#2329](https://github.com/swagger-api/apidom/issues/2329)) ([de38ac3](https://github.com/swagger-api/apidom/commit/de38ac36dae3b1f5085fd68c12fb64c792099a64)), closes [#2328](https://github.com/swagger-api/apidom/issues/2328)
- **reference:** add swagger-client OpenAPI 3.1 dereferene strategy ([#2326](https://github.com/swagger-api/apidom/issues/2326)) ([40dbf2a](https://github.com/swagger-api/apidom/commit/40dbf2a036517b6b8b23ea9c0a57618f033d6d3c)), closes [#2289](https://github.com/swagger-api/apidom/issues/2289)
- **reference:** add SwaggerClient's HTTP Client resolver plugin ([#2303](https://github.com/swagger-api/apidom/issues/2303)) ([4fda4d8](https://github.com/swagger-api/apidom/commit/4fda4d85ed67e96d339b2cc5c20516e2ebcd862a)), closes [#2297](https://github.com/swagger-api/apidom/issues/2297)

## [0.56.3](https://github.com/swagger-api/apidom/compare/v0.56.2...v0.56.3) (2022-11-16)

### Bug Fixes

- **ls:** fix AsyncAPI 2.x Message.traits field lint rules ([50ddda9](https://github.com/swagger-api/apidom/commit/50ddda90bbe47e702e55172537e264d7582b1978))

## [0.56.2](https://github.com/swagger-api/apidom/compare/v0.56.1...v0.56.2) (2022-11-16)

### Bug Fixes

- **ls:** fix AsyncAPI 2.x Operation.security field lint rules ([d9d60a7](https://github.com/swagger-api/apidom/commit/d9d60a75fea1fb7e764fe3eaac72e4bf21cee8f6))
- **ns-openapi-3-1:** add Info.summary getters/setters ([#2272](https://github.com/swagger-api/apidom/issues/2272)) ([9ca3aa4](https://github.com/swagger-api/apidom/commit/9ca3aa4abd40b447c12e9cd2f756e34edce8daa7))

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

- add AsyncAPI 2.5.0 support in parsing adapters ([#2236](https://github.com/swagger-api/apidom/issues/2236)) ([8347b62](https://github.com/swagger-api/apidom/commit/8347b62c2acb24902e6bd198a08ed19a0f6edea2)), closes [#2082](https://github.com/swagger-api/apidom/issues/2082)
- **ls:** add AsyncAPI 2.5.0 support for all Message Binding Objects ([#2239](https://github.com/swagger-api/apidom/issues/2239)) ([d4a4dc8](https://github.com/swagger-api/apidom/commit/d4a4dc862e8d74fba834029159943a33ec7bdc29)), closes [#2086](https://github.com/swagger-api/apidom/issues/2086)
- **ls:** add AsyncAPI 2.5.0 support for Operation Binding Objects ([#2240](https://github.com/swagger-api/apidom/issues/2240)) ([81f9409](https://github.com/swagger-api/apidom/commit/81f9409f4f27dcb001d584c1ba8df8fa206a05fd)), closes [#2086](https://github.com/swagger-api/apidom/issues/2086)
- **ls:** add AsyncAPI 2.5.0 support for Server Binding Objects ([#2241](https://github.com/swagger-api/apidom/issues/2241)) ([33dfbb5](https://github.com/swagger-api/apidom/commit/33dfbb576fcd76baf8c7e991ac33c48c647af5f9)), closes [#2086](https://github.com/swagger-api/apidom/issues/2086)
- **ls:** add partial support for AsyncAPI 2.5.0 ([#2238](https://github.com/swagger-api/apidom/issues/2238)) ([368bfcf](https://github.com/swagger-api/apidom/commit/368bfcfa78aa2be7fabe69a0b08b730af77de3fa)), closes [#2084](https://github.com/swagger-api/apidom/issues/2084)
- **ns-asyncapi-2:** add latest bindings versions in elements layer ([#2224](https://github.com/swagger-api/apidom/issues/2224)) ([15e436c](https://github.com/swagger-api/apidom/commit/15e436c85719bcf1733ae19a1c827d951a34f9eb)), closes [#2080](https://github.com/swagger-api/apidom/issues/2080)
- **ns-asyncapi-2:** add support for 2.5.0 in bindings refractors ([#2231](https://github.com/swagger-api/apidom/issues/2231)) ([0db1bd3](https://github.com/swagger-api/apidom/commit/0db1bd34705451d9ce7f166b43f25b4ab6c38275)), closes [#2081](https://github.com/swagger-api/apidom/issues/2081)
- **ns-asyncapi-2:** add support for 2.5.0 in refractors ([91e38a4](https://github.com/swagger-api/apidom/commit/91e38a4c27fec17128b3a06f733183e7ff6d42f6)), closes [#2081](https://github.com/swagger-api/apidom/issues/2081)
- **ns-asyncapi-2:** add support for 2.5.0 version in element layer ([#2222](https://github.com/swagger-api/apidom/issues/2222)) ([9d1f9f6](https://github.com/swagger-api/apidom/commit/9d1f9f6a9f3a8b0b3e2cf2304e1cc50339adca03)), closes [#2080](https://github.com/swagger-api/apidom/issues/2080)
- **ns-asyncapi-2:** add support for AsyncAPI 2.5.0 ([ef3ef25](https://github.com/swagger-api/apidom/commit/ef3ef25c8f6ed806f37e9cef45e4f7a41fef578d)), closes [#2081](https://github.com/swagger-api/apidom/issues/2081)
- **ns-asyncapi-2:** improve types for bindings elements ([#2223](https://github.com/swagger-api/apidom/issues/2223)) ([b44dcfc](https://github.com/swagger-api/apidom/commit/b44dcfcd1852a4f04f411d3257b616618aa4bff3)), closes [#2080](https://github.com/swagger-api/apidom/issues/2080)
- **ns-asyncapi-2:** improve types for elements ([#2221](https://github.com/swagger-api/apidom/issues/2221)) ([810c9f9](https://github.com/swagger-api/apidom/commit/810c9f9010ca3b8cbf6d1ee90fcc8f51cdfd71eb)), closes [#2080](https://github.com/swagger-api/apidom/issues/2080)

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

### Bug Fixes

- **reference:** bound options during resolution and parsing ([#2166](https://github.com/swagger-api/apidom/issues/2166)) ([89b946d](https://github.com/swagger-api/apidom/commit/89b946d8c7b28473a6acad67028251eb7d2b030f))

# [0.51.0](https://github.com/swagger-api/apidom/compare/v0.50.0...v0.51.0) (2022-10-20)

### Bug Fixes

- **apidom-ls:** fix OAS example value/externalValue rule ([4b3b527](https://github.com/swagger-api/apidom/commit/4b3b527e03f4cf752ede5785fbdf8d373479a99d))
- **ls:** duplicate completion rules for OpenAPI 3.1.0 Path Item ([#2151](https://github.com/swagger-api/apidom/issues/2151)) ([d476aef](https://github.com/swagger-api/apidom/commit/d476aeffe0fe1474646dcfd4de1bb1fd39d8f151))
- **ls:** finalize rules for OpenAPI License object ([#2155](https://github.com/swagger-api/apidom/issues/2155)) ([9d37af4](https://github.com/swagger-api/apidom/commit/9d37af4c4dde41028bedb8eb8ce6e4a14745a3dd))
- **ls:** finalize rules for OpenAPI Server object ([#2156](https://github.com/swagger-api/apidom/issues/2156)) ([6b4abbf](https://github.com/swagger-api/apidom/commit/6b4abbf1349cc153ad0da31fd7e2bda4b41600e6))
- **ls:** fix OpenAPI 3.x.y Example Obj mutually exclusive lint rule ([#2146](https://github.com/swagger-api/apidom/issues/2146)) ([fd654e6](https://github.com/swagger-api/apidom/commit/fd654e6ed1b5262938dd99ea581311562f6246e5)), closes [#2141](https://github.com/swagger-api/apidom/issues/2141)
- **ns-openapi-3-0:** drop support of extensions from Discriminator ([#2147](https://github.com/swagger-api/apidom/issues/2147)) ([4bc2bde](https://github.com/swagger-api/apidom/commit/4bc2bde70d9b41a15819195a4a3d1882f8b385ef))

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
- **reference:** decode array buffers using TextDecoder ([#2036](https://github.com/swagger-api/apidom/issues/2036)) ([571e2ed](https://github.com/swagger-api/apidom/commit/571e2ede1bbe16410fb2b5f2337c074f5fff1667)), closes [#2029](https://github.com/swagger-api/apidom/issues/2029)

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

### Features

- **playground:** add support for OpenAPI 3.0.x ([#1958](https://github.com/swagger-api/apidom/issues/1958)) ([bfc5445](https://github.com/swagger-api/apidom/commit/bfc5445bb191bd836215e9876b86e11423ffddeb)), closes [#1943](https://github.com/swagger-api/apidom/issues/1943)
- **reference:** add OpenAPI 3.0.x JSON parser plugin ([c15294c](https://github.com/swagger-api/apidom/commit/c15294c12bdf9b869c31a6f831951d6e68bb1e2b)), closes [#1894](https://github.com/swagger-api/apidom/issues/1894)
- **reference:** add OpenAPI 3.0.x resolve strategy ([#1957](https://github.com/swagger-api/apidom/issues/1957)) ([9617cb3](https://github.com/swagger-api/apidom/commit/9617cb32f942b703a7c9099e29c86166e24ed088)), closes [#1895](https://github.com/swagger-api/apidom/issues/1895)
- **reference:** add OpenAPI 3.0.x YAML parser plugin ([0dfbabe](https://github.com/swagger-api/apidom/commit/0dfbabe3cb275dea5a3868f6f6439dffeb037496)), closes [#1894](https://github.com/swagger-api/apidom/issues/1894)
- **referene:** add OpenAPI 3.0.x dereference strategy ([#1955](https://github.com/swagger-api/apidom/issues/1955)) ([6ea5bfd](https://github.com/swagger-api/apidom/commit/6ea5bfd5098581f079fc56f9b3bfe15942f4f37b)), closes [#1896](https://github.com/swagger-api/apidom/issues/1896)

# [0.43.0](https://github.com/swagger-api/apidom/compare/v0.42.0...v0.43.0) (2022-08-31)

### Bug Fixes

- **parser-adapter-openapi-yaml-3-1:** fix incorrect detection ([#1952](https://github.com/swagger-api/apidom/issues/1952)) ([447f10c](https://github.com/swagger-api/apidom/commit/447f10cc47ba81295aeab32f1ad489097c2a563a))

### Features

- add JSON parser adapter for OpenAPI 3.0.x namespacd ([#1948](https://github.com/swagger-api/apidom/issues/1948)) ([ce254b2](https://github.com/swagger-api/apidom/commit/ce254b236082667e982b99d6fa32f565ffae1730)), closes [#1892](https://github.com/swagger-api/apidom/issues/1892)
- add YAML parser adapter for OpenAPI 3.0.x namespace ([#1950](https://github.com/swagger-api/apidom/issues/1950)) ([ae469b4](https://github.com/swagger-api/apidom/commit/ae469b48891d529a62d51fdfea937d88bdf416e1)), closes [#1893](https://github.com/swagger-api/apidom/issues/1893)
- **ns-asyncapi-2:** add support for Link Description Object ([#1947](https://github.com/swagger-api/apidom/issues/1947)) ([9d36bb2](https://github.com/swagger-api/apidom/commit/9d36bb203b38584356d9daec7ee46af8640fcd0e)), closes [#1942](https://github.com/swagger-api/apidom/issues/1942)

# [0.42.0](https://github.com/swagger-api/apidom/compare/v0.41.1...v0.42.0) (2022-08-30)

### Bug Fixes

- **apidom-ls:** fix inverted params in test class ([22dfa69](https://github.com/swagger-api/apidom/commit/22dfa6957d76b0c34e4badd30eb4449c90cb931c))

### Features

- **ns-asyncapi-2:** add meta to SchemaElement about version ([#1913](https://github.com/swagger-api/apidom/issues/1913)) ([3377b75](https://github.com/swagger-api/apidom/commit/3377b750134c79af67fc63f86daf744a0395ae1e)), closes [#1814](https://github.com/swagger-api/apidom/issues/1814)
- **ns-openapi-3-0:** add replace empty elements refractor plugin ([#1939](https://github.com/swagger-api/apidom/issues/1939)) ([e34fbea](https://github.com/swagger-api/apidom/commit/e34fbea33d8c1ba15240d04bca92db3eb2454afb)), closes [#1889](https://github.com/swagger-api/apidom/issues/1889)
- **ns-openapi-3-0:** feat add supporting code ([#1926](https://github.com/swagger-api/apidom/issues/1926)) ([8a6ebb4](https://github.com/swagger-api/apidom/commit/8a6ebb40539b1c7e53270e117946758cac5b5df0)), closes [#1888](https://github.com/swagger-api/apidom/issues/1888)
- **ns-openapi-3-0:** implement namespace elements ([#1914](https://github.com/swagger-api/apidom/issues/1914)) ([0817854](https://github.com/swagger-api/apidom/commit/0817854d9da7130abf32b89cae0dae79dab76858)), closes [#1887](https://github.com/swagger-api/apidom/issues/1887)
- **ns-openapi-3-0:** implement NCE elements ([#1919](https://github.com/swagger-api/apidom/issues/1919)) ([46420b9](https://github.com/swagger-api/apidom/commit/46420b909e452d2060fdbe7c46d92ac9e053cbfa)), closes [#1887](https://github.com/swagger-api/apidom/issues/1887)
- **ns-openapi-3-0:** implement refractor layer ([#1927](https://github.com/swagger-api/apidom/issues/1927)) ([7c95c9f](https://github.com/swagger-api/apidom/commit/7c95c9f408ce620ce2c3e4f18a00404892f4104b)), closes [#1886](https://github.com/swagger-api/apidom/issues/1886)
- **ns-openapi-3-0:** implement Schema element ([#1918](https://github.com/swagger-api/apidom/issues/1918)) ([b51d107](https://github.com/swagger-api/apidom/commit/b51d107eee24fed1f177b2d8f14670c63e53155a)), closes [#1887](https://github.com/swagger-api/apidom/issues/1887)

## [0.41.1](https://github.com/swagger-api/apidom/compare/v0.41.0...v0.41.1) (2022-08-22)

### Bug Fixes

- **apidom-ls:** implement custom hover provider support ([3ee5bfe](https://github.com/swagger-api/apidom/commit/3ee5bfefea41d34a92a6a7bec8daf85e15dd8b10))

# [0.41.0](https://github.com/swagger-api/apidom/compare/v0.40.3...v0.41.0) (2022-08-19)

### Bug Fixes

- **apidom-ls:** partially fix invalid YAML diagnostics ([417a48b](https://github.com/swagger-api/apidom/commit/417a48b1d6c4f25df53c29f977af91f9e27e6967))
- **json-schema:** fix media type versions ([#1856](https://github.com/swagger-api/apidom/issues/1856)) ([82b8988](https://github.com/swagger-api/apidom/commit/82b8988a4847ca1ac9fd3392c6dfe5b35f7331df)), closes [#1814](https://github.com/swagger-api/apidom/issues/1814)

### Features

- **apidom-ls:** implement initial ADS support ([6c39489](https://github.com/swagger-api/apidom/commit/6c394890e6845dcd4765a5e6e1df12166446b691))
- implement JSON Schema Draft 4 namespace ([#1824](https://github.com/swagger-api/apidom/issues/1824)) ([e065d4a](https://github.com/swagger-api/apidom/commit/e065d4a32007b62aebcb962403071cc911c7e43f)), closes [#1815](https://github.com/swagger-api/apidom/issues/1815)
- implement JSON Schema Draft 6 namespace ([#1840](https://github.com/swagger-api/apidom/issues/1840)) ([e688239](https://github.com/swagger-api/apidom/commit/e688239dbcc520a247c1f1fd4584a955929ce019)), closes [#1817](https://github.com/swagger-api/apidom/issues/1817)
- implement JSON Schema Draft 7 namespace ([#1853](https://github.com/swagger-api/apidom/issues/1853)) ([bc3d47a](https://github.com/swagger-api/apidom/commit/bc3d47ac3eb706218d31e0adde6745e94c808dad)), closes [#1818](https://github.com/swagger-api/apidom/issues/1818)
- **ns-json-schema-draft-4:** complete replace empty elements plugin ([b50ac75](https://github.com/swagger-api/apidom/commit/b50ac75dfc97f638800c7ad90e4f6e3dab4c8719)), closes [#1843](https://github.com/swagger-api/apidom/issues/1843)
- **ns-json-schema-draft-4:** incorporate JSON Schema Draft 5 ([#1838](https://github.com/swagger-api/apidom/issues/1838)) ([3d66200](https://github.com/swagger-api/apidom/commit/3d662007bc63b9db7d5a217d9400b94c1338bc8a)), closes [#1816](https://github.com/swagger-api/apidom/issues/1816)
- **ns-json-schema-draft-6:** complete replace empty elements plugin ([5386bc3](https://github.com/swagger-api/apidom/commit/5386bc337c57a88a67ad5c3c88476d8f61ab7683)), closes [#1843](https://github.com/swagger-api/apidom/issues/1843)

## [0.40.3](https://github.com/swagger-api/apidom/compare/v0.40.2...v0.40.3) (2022-08-08)

### Bug Fixes

- **adapters:** force forward compatible dection to be valid as well ([#1809](https://github.com/swagger-api/apidom/issues/1809)) ([39cafca](https://github.com/swagger-api/apidom/commit/39cafcae6d442792800b5ef98968e1e36ebf729f)), closes [#1741](https://github.com/swagger-api/apidom/issues/1741)

## [0.40.2](https://github.com/swagger-api/apidom/compare/v0.40.1...v0.40.2) (2022-08-08)

### Bug Fixes

- **reference:** fix encoding problem with file system paths ([b7696c6](https://github.com/swagger-api/apidom/commit/b7696c6e41c2f9ec5a0cd70fe877ff5f3fed3b95)), closes [#1793](https://github.com/swagger-api/apidom/issues/1793)

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

### Features

- **reference:** add origin support for Channel Item Element ([b126f14](https://github.com/swagger-api/apidom/commit/b126f14e9a0a4ed325066a367694a05710c5c192))
- **reference:** add origin support for ExampleElement ([cf2c82d](https://github.com/swagger-api/apidom/commit/cf2c82d43ca2a7658fc30af38fd4bcfbe2399bd2))
- **reference:** add origin support for LinkElement ([437228a](https://github.com/swagger-api/apidom/commit/437228abe0466ff2efa422560257cbdaca74e546))
- **reference:** add origin support for PathItemElement ([863ae82](https://github.com/swagger-api/apidom/commit/863ae826bf980a5bbf7a598575337272b219ab81))
- **reference:** add origin support for SchemaElement ([d43a20f](https://github.com/swagger-api/apidom/commit/d43a20f527d916962552cab1e5addf74497f7d05))

# [0.38.0](https://github.com/swagger-api/apidom/compare/v0.37.0...v0.38.0) (2022-07-29)

### Features

- **apidom-ls:** implement initial ext ref go to ([5ff591e](https://github.com/swagger-api/apidom/commit/5ff591edd16ff5227833a7c301eb8c1f389f578e))

# [0.37.0](https://github.com/swagger-api/apidom/compare/v0.36.0...v0.37.0) (2022-07-29)

### Features

- **reference:** add origin support for ReferenceElement ([#1767](https://github.com/swagger-api/apidom/issues/1767)) ([fc6d091](https://github.com/swagger-api/apidom/commit/fc6d091fe9e9fdc6d4cf8530f8454934e3963dc0))

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

### Bug Fixes

- **ast:** minic lookbehind regexp to support Safari ([#1696](https://github.com/swagger-api/apidom/issues/1696)) ([4893810](https://github.com/swagger-api/apidom/commit/4893810c99a0bfc9e7bb45813de6a02d74d18a19)), closes [#1695](https://github.com/swagger-api/apidom/issues/1695)

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

### Features

- **reference:** add configurable interceptors for HttpResolverAxios ([#1680](https://github.com/swagger-api/apidom/issues/1680)) ([3c40bcf](https://github.com/swagger-api/apidom/commit/3c40bcfdc3f85fcb46186c11be6ede8e55c2ed24))

# [0.32.0](https://github.com/swagger-api/apidom/compare/v0.31.2...v0.32.0) (2022-06-27)

### Features

- add support for all AsyncAPI 2.x main specification objects ([#1658](https://github.com/swagger-api/apidom/issues/1658)) ([38e8e94](https://github.com/swagger-api/apidom/commit/38e8e94336a9dcbbdaad064c14aa222c1e941280)), closes [#1647](https://github.com/swagger-api/apidom/issues/1647)

## [0.31.2](https://github.com/swagger-api/apidom/compare/v0.31.1...v0.31.2) (2022-06-24)

### Bug Fixes

- **build:** make using minim an implementation detail ([a45009f](https://github.com/swagger-api/apidom/commit/a45009fef5855f3b2fba699c9e4faf560c613443)), closes [#1632](https://github.com/swagger-api/apidom/issues/1632)

## [0.31.1](https://github.com/swagger-api/apidom/compare/v0.31.0...v0.31.1) (2022-06-23)

### Bug Fixes

- **reference:** make FileResolver isomorphic ([#1639](https://github.com/swagger-api/apidom/issues/1639)) ([74c7494](https://github.com/swagger-api/apidom/commit/74c7494c1cb86c2db6360ccdffff27248caba276)), closes [#1633](https://github.com/swagger-api/apidom/issues/1633)

# [0.31.0](https://github.com/swagger-api/apidom/compare/v0.30.1...v0.31.0) (2022-06-21)

### Bug Fixes

- **adapter-json:** export detection regexp from browser adapter ([01452cf](https://github.com/swagger-api/apidom/commit/01452cf83ea314827eb64b009ab0d4cbfd33915e))
- **build:** get rid of using blobal Buffer symbol ([#1607](https://github.com/swagger-api/apidom/issues/1607)) ([0db7685](https://github.com/swagger-api/apidom/commit/0db768510d6595da634cd7464a6a15c40af42490)), closes [#1606](https://github.com/swagger-api/apidom/issues/1606)
- **ns-api-design-systems:** fix latest media type getter ([8d8f63b](https://github.com/swagger-api/apidom/commit/8d8f63be931873b3f3092adec8ef2726c6171294)), closes [#1589](https://github.com/swagger-api/apidom/issues/1589)
- **ns-asyncapi-2:** fix latest media type getter ([aa1ea00](https://github.com/swagger-api/apidom/commit/aa1ea0046abf9bcbaf2bac14870f5467e84bad57)), closes [#1589](https://github.com/swagger-api/apidom/issues/1589)
- **ns-openapi-3-1:** fix latest media type getter ([bca4ea4](https://github.com/swagger-api/apidom/commit/bca4ea4b1af820243cc3d6c006a098432ca0ed90)), closes [#1589](https://github.com/swagger-api/apidom/issues/1589)
- **parser:** set parser options type to Index Signature ([16b4858](https://github.com/swagger-api/apidom/commit/16b48584a2f6508e36d55170727b2551c22a29e5))

### Code Refactoring

- **ns-api-design-systems:** remove adapters from namespace ([#1598](https://github.com/swagger-api/apidom/issues/1598)) ([ac4bee1](https://github.com/swagger-api/apidom/commit/ac4bee103f05ea7c3438ec901a02fff6a1ac5c0c)), closes [#1586](https://github.com/swagger-api/apidom/issues/1586)

### Features

- **adapter-asyncapi-json-2:** detect forward compatible versions ([ecac288](https://github.com/swagger-api/apidom/commit/ecac288b83bb9dd16463f368ffabf5eadb6db6a3)), closes [#1583](https://github.com/swagger-api/apidom/issues/1583)
- **adapter-asyncapi-json-2:** export detection regexp ([5ab3f89](https://github.com/swagger-api/apidom/commit/5ab3f89b76f354ecdc2e7c8ddd11efdea125d13f)), closes [#1584](https://github.com/swagger-api/apidom/issues/1584)
- **adapter-asyncapi-yaml-2:** detect forward complatible versions ([cff935d](https://github.com/swagger-api/apidom/commit/cff935d5ab57bc1829d00abe2c8441d3d78fe781)), closes [#1583](https://github.com/swagger-api/apidom/issues/1583)
- **adapter-asyncapi-yaml-2:** export detection regexp ([3ae324a](https://github.com/swagger-api/apidom/commit/3ae324a7be9552c498910191b526b26c73b205ac)), closes [#1584](https://github.com/swagger-api/apidom/issues/1584)
- **adapter-openapi-json-3-1:** detect forward compatible versions ([4bbd63e](https://github.com/swagger-api/apidom/commit/4bbd63e3a81b2bae03e50d912afb402e5ebc695f)), closes [#1583](https://github.com/swagger-api/apidom/issues/1583)
- **adapter-openapi-json-3-1:** export detection regexp ([cb58abf](https://github.com/swagger-api/apidom/commit/cb58abfbfd5844dfb170429b9c08c699fa1b72f3)), closes [#1584](https://github.com/swagger-api/apidom/issues/1584)
- **adapter-openapi-yaml-3-1:** detect forward compatible versions ([dff8f37](https://github.com/swagger-api/apidom/commit/dff8f3796b40791509cc37a80e3fb171f2dde8b6)), closes [#1583](https://github.com/swagger-api/apidom/issues/1583)
- **adapter-openapi-yaml-3-1:** export detection regexp ([1899fbc](https://github.com/swagger-api/apidom/commit/1899fbc9aa4b0789bec77bd73c41cb101c315340)), closes [#1584](https://github.com/swagger-api/apidom/issues/1584)
- add JSON parser adapter for API Design Systems ([#1590](https://github.com/swagger-api/apidom/issues/1590)) ([719528e](https://github.com/swagger-api/apidom/commit/719528e89cef11f5e69659f9e251d1287d7d9dcd)), closes [#1586](https://github.com/swagger-api/apidom/issues/1586)
- add YAML parser adapter for API Design Systems ([#1597](https://github.com/swagger-api/apidom/issues/1597)) ([c528a95](https://github.com/swagger-api/apidom/commit/c528a95ebdc209fdbaa241429bacdfa15c474e7d)), closes [#1586](https://github.com/swagger-api/apidom/issues/1586)
- **apidom-ls:** update ns/format detection ([a445f16](https://github.com/swagger-api/apidom/commit/a445f16a17f3ec71c6e2fad6818ce6b049393433))
- **apidom-ls:** use adapter.detect for ns/format detection ([a1d1900](https://github.com/swagger-api/apidom/commit/a1d1900bdf561253b8457b75d5ed0394d61febb4))
- **media-types:** detect media types using smart detection ([#1624](https://github.com/swagger-api/apidom/issues/1624)) ([29908fa](https://github.com/swagger-api/apidom/commit/29908fa37ac27915304b26b2d4ba9115c3ca689e)), closes [#1616](https://github.com/swagger-api/apidom/issues/1616)
- **ns-api-design-systems:** export detection regexp ([#1588](https://github.com/swagger-api/apidom/issues/1588)) ([eee6dca](https://github.com/swagger-api/apidom/commit/eee6dca3de790583463c0add2a9cc065c1964df3)), closes [#1584](https://github.com/swagger-api/apidom/issues/1584)
- **parser-adapter-json:** enhance JSON detection ([#1608](https://github.com/swagger-api/apidom/issues/1608)) ([b73028f](https://github.com/swagger-api/apidom/commit/b73028f85c9064dbec2759fb398271fbd97f10ba)), closes [#1582](https://github.com/swagger-api/apidom/issues/1582)
- **reference:** add support for API Design Systems ([#1605](https://github.com/swagger-api/apidom/issues/1605)) ([7d2b062](https://github.com/swagger-api/apidom/commit/7d2b0620f9dcaf5da763337aa94d8b33d29f131f)), closes [#1603](https://github.com/swagger-api/apidom/issues/1603)
- **reference:** unify spec/format detection with adapters ([#1615](https://github.com/swagger-api/apidom/issues/1615)) ([57f07e0](https://github.com/swagger-api/apidom/commit/57f07e0c9fc9eeebbcdfec33d82bbeb7cd380afa)), closes [#1604](https://github.com/swagger-api/apidom/issues/1604)
- **reference:** use smart spec/format detection with parser plugins ([#1617](https://github.com/swagger-api/apidom/issues/1617)) ([ed5f6e4](https://github.com/swagger-api/apidom/commit/ed5f6e461c8d58e9f10f7b6ec88c6f0d97b87f53)), closes [#1604](https://github.com/swagger-api/apidom/issues/1604)

### BREAKING CHANGES

- **ns-api-design-systems:** removes adapters (JSON/YAML) and replaces them with new
  packages

## [0.30.1](https://github.com/swagger-api/apidom/compare/v0.30.0...v0.30.1) (2022-06-09)

### Bug Fixes

- **parser-adapters:** align detection with underlying parser ([#1562](https://github.com/swagger-api/apidom/issues/1562)) ([b9186cf](https://github.com/swagger-api/apidom/commit/b9186cf1ad28ea69715ca3052c68933193696924))

# [0.30.0](https://github.com/swagger-api/apidom/compare/v0.29.1...v0.30.0) (2022-06-07)

### Bug Fixes

- **AsyncAPI:** detect AsyncAPI in different formats properly ([#1548](https://github.com/swagger-api/apidom/issues/1548)) ([76ac43f](https://github.com/swagger-api/apidom/commit/76ac43f8d9eb7704d15223cf0bdc33e6867e7702)), closes [#1536](https://github.com/swagger-api/apidom/issues/1536)
- **media-types:** unify how media types are defined ([#1550](https://github.com/swagger-api/apidom/issues/1550)) ([dcb45ce](https://github.com/swagger-api/apidom/commit/dcb45ceba18e5c73dd9e53bea53b302860a214db)), closes [#1549](https://github.com/swagger-api/apidom/issues/1549)
- **ns-asyncapi-2:** fix refracting of Message.payload ([#1547](https://github.com/swagger-api/apidom/issues/1547)) ([f9c0dcf](https://github.com/swagger-api/apidom/commit/f9c0dcf1f3d8f6402e0e50222651823deb0fb7ef)), closes [#1534](https://github.com/swagger-api/apidom/issues/1534)
- **OpenAPI:** detect OpenAPI in different formats properly ([#1552](https://github.com/swagger-api/apidom/issues/1552)) ([b21e81e](https://github.com/swagger-api/apidom/commit/b21e81ead95b7de5cc8b5e4161f6096c79a62c0b)), closes [#422](https://github.com/swagger-api/apidom/issues/422)

### Features

- **api-design-systems:** add better JSON & YAML detection ([#1554](https://github.com/swagger-api/apidom/issues/1554)) ([990b769](https://github.com/swagger-api/apidom/commit/990b7695093ab82f757091cca126a555f8fa7cc3)), closes [#422](https://github.com/swagger-api/apidom/issues/422)
- **yaml-1-2:** add YAML 1.2 detection mechanism ([#1553](https://github.com/swagger-api/apidom/issues/1553)) ([e1dd8d5](https://github.com/swagger-api/apidom/commit/e1dd8d519b4a53fe1f8b535122624a27d99817e9)), closes [#422](https://github.com/swagger-api/apidom/issues/422) [#1551](https://github.com/swagger-api/apidom/issues/1551)

## [0.29.1](https://github.com/swagger-api/apidom/compare/v0.29.0...v0.29.1) (2022-06-03)

### Bug Fixes

- **reference:** allow passing custom resolver opts ([#1535](https://github.com/swagger-api/apidom/issues/1535)) ([2cc8dbd](https://github.com/swagger-api/apidom/commit/2cc8dbd76628a2e800362b38d5649671cd527a9f))

# [0.29.0](https://github.com/swagger-api/apidom/compare/v0.28.0...v0.29.0) (2022-05-27)

### Features

- **apidom-ls:** allow async doRefCompletion ([#1512](https://github.com/swagger-api/apidom/issues/1512)) ([ea28013](https://github.com/swagger-api/apidom/commit/ea28013272b48ee521fc05d1c3237518b3b6065b))

# [0.28.0](https://github.com/swagger-api/apidom/compare/v0.27.0...v0.28.0) (2022-05-22)

### Features

- **json-path:** add support for JSONPath ([#1496](https://github.com/swagger-api/apidom/issues/1496)) ([a1eaa4c](https://github.com/swagger-api/apidom/commit/a1eaa4ce793ff61b7f5ef89ea6ebb04c508767bd)), closes [#1485](https://github.com/swagger-api/apidom/issues/1485)
- **json-pointer:** add support for JSON Pointer ([#1492](https://github.com/swagger-api/apidom/issues/1492)) ([2b75806](https://github.com/swagger-api/apidom/commit/2b75806964edce80110d2a190a91d7b8ab4c0ff1)), closes [#1491](https://github.com/swagger-api/apidom/issues/1491)

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
- **apidom-ls:** enable completion for Components.serverVariables ([#1441](https://github.com/swagger-api/apidom/issues/1441)) ([cf8c261](https://github.com/swagger-api/apidom/commit/cf8c261ec6e8ede0ba0f7085f4fc81511386491b)), closes [#1429](https://github.com/swagger-api/apidom/issues/1429)
- **apidom-ls:** enhance completion/validation providers integration ([6869294](https://github.com/swagger-api/apidom/commit/6869294939b133763720edbe3f368cdd9b34c7ff))
- **apidom-ls:** support completion/lint for Server/ServerVariable ([#1446](https://github.com/swagger-api/apidom/issues/1446)) ([05e9a1a](https://github.com/swagger-api/apidom/commit/05e9a1a740e28772ec6e12d5aff529979a1c330f)), closes [#1430](https://github.com/swagger-api/apidom/issues/1430)
- **apidom-ls:** support proper completion format for messageId ([#1440](https://github.com/swagger-api/apidom/issues/1440)) ([ff9fe70](https://github.com/swagger-api/apidom/commit/ff9fe703e6c594e55bd34ac8398d0c75c5d3f091)), closes [#1433](https://github.com/swagger-api/apidom/issues/1433)
- **apidom-ls:** support referencing Server Object ([#1439](https://github.com/swagger-api/apidom/issues/1439)) ([93b8c35](https://github.com/swagger-api/apidom/commit/93b8c35e91cb75917fb2b6e9d74b73ae7ed704fa)), closes [#1431](https://github.com/swagger-api/apidom/issues/1431)

## [0.24.1](https://github.com/swagger-api/apidom/compare/v0.24.0...v0.24.1) (2022-05-05)

### Bug Fixes

- **ns-asyncapi-2:** provide semantics for oneOf field ([#1419](https://github.com/swagger-api/apidom/issues/1419)) ([47cbd0a](https://github.com/swagger-api/apidom/commit/47cbd0a921688ec4573e335dc5b10d03671e3c46)), closes [#1348](https://github.com/swagger-api/apidom/issues/1348)

# [0.24.0](https://github.com/swagger-api/apidom/compare/v0.23.0...v0.24.0) (2022-05-03)

### Features

- **apidom-ls:** add support for AsyncAPI 2.4.0 ([#1413](https://github.com/swagger-api/apidom/issues/1413)) ([7b69f49](https://github.com/swagger-api/apidom/commit/7b69f4987d587d873a8b95fa956cad8ded53dd96)), closes [#1390](https://github.com/swagger-api/apidom/issues/1390)
- **ns-asyncapi-2:** add AsyncAPI 2.4.0 support ([#1410](https://github.com/swagger-api/apidom/issues/1410)) ([69fab2d](https://github.com/swagger-api/apidom/commit/69fab2d0107e4dd72e7e39f158d42a56254212d5)), closes [#1390](https://github.com/swagger-api/apidom/issues/1390)

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

### Bug Fixes

- **reference:** enhance OpenAPI 3.1 dereferecing ([4b1bdbe](https://github.com/swagger-api/apidom/commit/4b1bdbee4ef85ee24792948844c0d62093b81b83)), closes [#1336](https://github.com/swagger-api/apidom/issues/1336)
- **reference:** enhance OpenAPI 3.1 resolution ([#1339](https://github.com/swagger-api/apidom/issues/1339)) ([1dff277](https://github.com/swagger-api/apidom/commit/1dff2770b415ad27d0c1f884416ad2971bba7228)), closes [#1337](https://github.com/swagger-api/apidom/issues/1337)

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

### Features

- **YAML:** implement YAML 1.2 serializer for ApiDOM ([#1282](https://github.com/swagger-api/apidom/issues/1282)) ([618a7de](https://github.com/swagger-api/apidom/commit/618a7de82f8937944dc031d5cb37f644831b637a)), closes [#134](https://github.com/swagger-api/apidom/issues/134)

# [0.19.0](https://github.com/swagger-api/apidom/compare/v0.18.1...v0.19.0) (2022-03-10)

### Bug Fixes

- **ns-api-deisgn-systems:** fix detection for JSON format ([5e7245b](https://github.com/swagger-api/apidom/commit/5e7245b3549ed40cbd2478386b833ef40e872f80))
- **ns-api-design-systems:** detect JSON properly ([15d4828](https://github.com/swagger-api/apidom/commit/15d48283fc731e72b91a8aba9c887994cc1236d1))
- **ns-asyncapi-2:** fix bug regarding refracting of Operation.message ([#1239](https://github.com/swagger-api/apidom/issues/1239)) ([f3e744c](https://github.com/swagger-api/apidom/commit/f3e744c9eff5db7ffb665a6240b7b67eb217af43)), closes [#427](https://github.com/swagger-api/apidom/issues/427)

### Features

- introduce API Design System namespace ([#1207](https://github.com/swagger-api/apidom/issues/1207)) ([c28a5d6](https://github.com/swagger-api/apidom/commit/c28a5d608a951a45dd6e32363829202706d9c2d0))
- **ns-api-design-systems:** add more attributes to Annotations ([04e34ab](https://github.com/swagger-api/apidom/commit/04e34ab67938885a91d311a634693c40a7ee5afa))
- **ns-api-design-systems:** add POC of OpenAPI 3.1 validator ([#1224](https://github.com/swagger-api/apidom/issues/1224)) ([1e137a0](https://github.com/swagger-api/apidom/commit/1e137a0f761cb5bbb9ea3a060cf97df14aea571a))
- **ns-api-design-systems:** add selector mechanism ([#1221](https://github.com/swagger-api/apidom/issues/1221)) ([91c700d](https://github.com/swagger-api/apidom/commit/91c700d51c74861850c00af87b0eea5c405a74f7))
- **ns-api-design-systems:** introduce adapters ([#1219](https://github.com/swagger-api/apidom/issues/1219)) ([b83d5f7](https://github.com/swagger-api/apidom/commit/b83d5f76819aa81ac7fde22d447b50ec95d0ac7e))
- **ns-api-design-systems:** introduce Standard Identifer plugin ([#1215](https://github.com/swagger-api/apidom/issues/1215)) ([c49dfa8](https://github.com/swagger-api/apidom/commit/c49dfa8e80908d6cd84ca04b21064a49d0de8c8d))
- **ns-api-design-systems:** validate request Content-Type ([#1227](https://github.com/swagger-api/apidom/issues/1227)) ([fb90dfc](https://github.com/swagger-api/apidom/commit/fb90dfc1faf796b33ded77476bd7458949035bbe))
- **ns-api-design-systems:** validate request header ([#1226](https://github.com/swagger-api/apidom/issues/1226)) ([51810e1](https://github.com/swagger-api/apidom/commit/51810e1ac7142e55bb6039e94fc2ecb01132bf04))
- **ns-api-design-systems:** validate status codes ([#1225](https://github.com/swagger-api/apidom/issues/1225)) ([fbec933](https://github.com/swagger-api/apidom/commit/fbec9331bebf10e4324d025e2940839545d8810e))

## [0.18.1](https://github.com/swagger-api/apidom/compare/v0.18.0...v0.18.1) (2022-02-16)

### Bug Fixes

- **apidom-ast:** fix how unraw library is used ([#1193](https://github.com/swagger-api/apidom/issues/1193)) ([da80349](https://github.com/swagger-api/apidom/commit/da803498e50ab40c1a312fc6d9653f74ae98f255)), closes [#1192](https://github.com/swagger-api/apidom/issues/1192)
- **apidom-ls:** use import of ajv with full file extension ([ea12865](https://github.com/swagger-api/apidom/commit/ea12865574fea34cccaf274890b8d548edaae6ee)), closes [#930](https://github.com/swagger-api/apidom/issues/930)

# [0.18.0](https://github.com/swagger-api/apidom/compare/v0.17.0...v0.18.0) (2022-02-16)

### Bug Fixes

- **apidom-ls:** fix duplicated diagnostics ([7c86c77](https://github.com/swagger-api/apidom/commit/7c86c77fc594f0c7fdbd5f274518e5dc44060881)), closes [#1078](https://github.com/swagger-api/apidom/issues/1078)
- **apidom-ls:** fix partial keys identification ([318799f](https://github.com/swagger-api/apidom/commit/318799f8e39678d6c0f3fc4658775566db0ec641))

### Features

- **apidom-ast:** convert to ESM ([#1175](https://github.com/swagger-api/apidom/issues/1175)) ([75231d6](https://github.com/swagger-api/apidom/commit/75231d690e485c9e96da5fb806fc35712018f81c)), closes [#930](https://github.com/swagger-api/apidom/issues/930)
- **apidom-core:** convert to ESM ([#1177](https://github.com/swagger-api/apidom/issues/1177)) ([0e1b784](https://github.com/swagger-api/apidom/commit/0e1b7845ddf70454b9230353639561c56bf1e6a4)), closes [#930](https://github.com/swagger-api/apidom/issues/930)
- **apidom-ls:** convert to ESM ([#1186](https://github.com/swagger-api/apidom/issues/1186)) ([a7d6bd7](https://github.com/swagger-api/apidom/commit/a7d6bd7fa310d7462b972e8597d7e08c72ee7bf7)), closes [#930](https://github.com/swagger-api/apidom/issues/930)
- **apidom-ls:** rules for schema additionalProperties ([73e6d1d](https://github.com/swagger-api/apidom/commit/73e6d1d793e35c6c43362cd71aec5ae918baa43c))
- **apidom-ns-asyncapi-2:** convert to ESM ([#1178](https://github.com/swagger-api/apidom/issues/1178)) ([b970733](https://github.com/swagger-api/apidom/commit/b970733c179ec361bd4203acb3f56957efa1a127)), closes [#930](https://github.com/swagger-api/apidom/issues/930)
- **asyncapi-2:** add support for AsyncAPI 2.2.0 specification ([#1151](https://github.com/swagger-api/apidom/issues/1151)) ([f94c38f](https://github.com/swagger-api/apidom/commit/f94c38fbb26051d1ef9f62a9086533aeef7574c1)), closes [#1130](https://github.com/swagger-api/apidom/issues/1130)
- convert 3 additional packages to ESM modules ([#1185](https://github.com/swagger-api/apidom/issues/1185)) ([b1f314b](https://github.com/swagger-api/apidom/commit/b1f314bb68cb57e18d9e925e0c5191c31faba49a)), closes [#930](https://github.com/swagger-api/apidom/issues/930)
- **ns-asyncapi-2:** add support for Message.payload empty values ([fa8e4cd](https://github.com/swagger-api/apidom/commit/fa8e4cd0c6c8c9f991403992520e029e863044a3)), closes [#1112](https://github.com/swagger-api/apidom/issues/1112) [#1076](https://github.com/swagger-api/apidom/issues/1076)
- **ns-openapi-3-1:** convert to ESM ([dfd7773](https://github.com/swagger-api/apidom/commit/dfd77731e54294519996c34ded7740dbe3f755b7)), closes [#930](https://github.com/swagger-api/apidom/issues/930)
- **parser-adapter-asyncapi-json-2:** convert to ESM ([e4ce197](https://github.com/swagger-api/apidom/commit/e4ce197daea06cfa6c2b08df35a2c1a04d54bc82)), closes [#930](https://github.com/swagger-api/apidom/issues/930)
- **parser-adapter-asyncapi-yaml-2:** convert to ESM ([1904567](https://github.com/swagger-api/apidom/commit/190456764c3c338a4eb0d3adf5f501d552afe41f)), closes [#930](https://github.com/swagger-api/apidom/issues/930)
- **parser-adapter-json:** convert to ESM ([3fbe9be](https://github.com/swagger-api/apidom/commit/3fbe9be2bdfa5ad7b6b0cbdcd8a241dd4ef484a4)), closes [#930](https://github.com/swagger-api/apidom/issues/930)
- **parser-adapter-opneapi-json-3-1:** convert to ESM ([f6de4df](https://github.com/swagger-api/apidom/commit/f6de4df8c23bb6fd403a41ef36988c9ea30f7aa9)), closes [#930](https://github.com/swagger-api/apidom/issues/930)
- **parser:** convert to ESM ([22d0c72](https://github.com/swagger-api/apidom/commit/22d0c72e08da5d2c0458d648939bde94be9b142a)), closes [#930](https://github.com/swagger-api/apidom/issues/930)

# [0.17.0](https://github.com/swagger-api/apidom/compare/v0.16.0...v0.17.0) (2022-01-14)

### Features

- **apidom-ls:** add rules for allowed fields ([e71c156](https://github.com/swagger-api/apidom/commit/e71c1563a132b6db381dcc7d6c789ec0d6e313ad))
- **apidom-ls:** add rules for components ([4473af7](https://github.com/swagger-api/apidom/commit/4473af7e544ca67ba292e70361d50e70d1f75344))
- **apidom-ls:** add rules for http and kafka message binding ([7a8fed2](https://github.com/swagger-api/apidom/commit/7a8fed233bda5e5a2a8997b1e6a9afadf286d248))
- **apidom-ls:** add rules for message ([95345f6](https://github.com/swagger-api/apidom/commit/95345f6ece5da91234e32460fd69ecc65987b1ee))
- **apidom-ls:** add rules for parameter ([f81a7ee](https://github.com/swagger-api/apidom/commit/f81a7ee711a1767da43a18282afe0f39e9b02b75))
- **apidom-ls:** add rules for server bindings ([6f400ab](https://github.com/swagger-api/apidom/commit/6f400abbd85dde926aee7ecff6bbfa344e9c388f))

# [0.16.0](https://github.com/swagger-api/apidom/compare/v0.15.1...v0.16.0) (2022-01-12)

### Features

- **web-tree-sitter:** initialize in lazy manner ([90003c4](https://github.com/swagger-api/apidom/commit/90003c44e10ce118fa6ab8e10a80288d24b0ca72)), closes [#476](https://github.com/swagger-api/apidom/issues/476)

## [0.15.1](https://github.com/swagger-api/apidom/compare/v0.15.0...v0.15.1) (2021-12-29)

### Bug Fixes

- amend browser patches ([a8d11a8](https://github.com/swagger-api/apidom/commit/a8d11a88d9e7ba8b2aa997f7949da7e3884fbe09)), closes [#1035](https://github.com/swagger-api/apidom/issues/1035)

# [0.15.0](https://github.com/swagger-api/apidom/compare/v0.14.0...v0.15.0) (2021-12-10)

### Features

- **apidom-ls:** add rules for channel items, operation, traits ([3d924db](https://github.com/swagger-api/apidom/commit/3d924dbbcab245071171204bdebf437190b95488))
- **apidom-ls:** add rules for channel parameter and empty spec ([82bacff](https://github.com/swagger-api/apidom/commit/82bacff56fce36ef0ac66ac94a4bc5504cfadc32))

# [0.14.0](https://github.com/swagger-api/apidom/compare/v0.13.0...v0.14.0) (2021-12-08)

### Bug Fixes

- **apidom-ls:** fix securityScheme lint ([e351e9e](https://github.com/swagger-api/apidom/commit/e351e9e677264641cb16771fad70d3f27e822174))
- **replace-empty-element:** map additional Schema keywords ([c9622dd](https://github.com/swagger-api/apidom/commit/c9622dd8effbc12583d8938badaa3910281dc72a)), closes [#969](https://github.com/swagger-api/apidom/issues/969)

### Features

- **apidom-ls:** add logs to completion-service ([b6ea639](https://github.com/swagger-api/apidom/commit/b6ea639c1427f1c479c65c08addc5ffb6379a976))
- **apidom-ls:** add trace function ([5c77c9b](https://github.com/swagger-api/apidom/commit/5c77c9b3943f52e747c0a76edfc05de80af46018))
- **apidom-ls:** expand provided symbols ([2b49302](https://github.com/swagger-api/apidom/commit/2b49302d97102f1e473aae895a6f9fe9bd03735f))
- **apidom-ls:** fix cache and add performance(/)logs mechanism ([14bd6a8](https://github.com/swagger-api/apidom/commit/14bd6a8bbb439b3117d3580a735fd3bf477a4725))

# [0.13.0](https://github.com/swagger-api/apidom/compare/v0.12.0...v0.13.0) (2021-12-06)

### Bug Fixes

- **apidom-ls:** update completion service doc processing ([214a7b1](https://github.com/swagger-api/apidom/commit/214a7b1d9193c408582b632aa8d00f1a9892b06c))

### Features

- add '\*-binding' classes to binding elements ([395bbf6](https://github.com/swagger-api/apidom/commit/395bbf6c6c6285a31d782baba765f9e0476ff321))
- add class to channel-binding elements ([6197441](https://github.com/swagger-api/apidom/commit/61974415dc19915ea741bc7bd55b4f96e94d9250))
- add referenced-element to channelItem ([1bc9771](https://github.com/swagger-api/apidom/commit/1bc97710d3d3dd8b20c400e43d809794979bc2c8))
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

### Bug Fixes

- **ns-asyncapi-2:** fix empty node mapping ([603ac8a](https://github.com/swagger-api/apidom/commit/603ac8a293e5ace80e9d112885bb831160f3d8f1))

### Features

- **adapter-yaml-1-2:** add full support for empty nodes ([2984f59](https://github.com/swagger-api/apidom/commit/2984f59f5e7cb1f2693883766051e7b0c45f94b4)), closes [#916](https://github.com/swagger-api/apidom/issues/916)
- **ns-asyncapi-2:** add support for empty noes in sequences ([94d6765](https://github.com/swagger-api/apidom/commit/94d6765d598f090d739902762e9a8765cca56253)), closes [#916](https://github.com/swagger-api/apidom/issues/916)
- **ns-openapi-3-1:** add support for empty nodes in sequences ([f660341](https://github.com/swagger-api/apidom/commit/f6603417b77fb169c1bd3d58071bcaa29ea187f7)), closes [#916](https://github.com/swagger-api/apidom/issues/916)

### Performance Improvements

- implement optimized tree-sitter CST access ([f672afd](https://github.com/swagger-api/apidom/commit/f672afd5f21f68a6dbd65444b87c12df3e845979)), closes [#691](https://github.com/swagger-api/apidom/issues/691)

# [0.10.0](https://github.com/swagger-api/apidom/compare/v0.9.0...v0.10.0) (2021-11-25)

### Features

- **apidom-ls:** - improve logic and update config ([c8f33b2](https://github.com/swagger-api/apidom/commit/c8f33b28dab990aa777e94b71d80c743c327e43b))

# [0.9.0](https://github.com/swagger-api/apidom/compare/v0.8.0...v0.9.0) (2021-11-17)

### Bug Fixes

- **apidom-ls:** fix ls completion ([e91d547](https://github.com/swagger-api/apidom/commit/e91d5479047afc1dc35f87eda638775385ada477))
- **apidom-ls:** fix yaml empty lines completion ([a81b48d](https://github.com/swagger-api/apidom/commit/a81b48db7b1fad308160cdc47cabac3f16910b83))
- **apidom-ls:** update package-lock.json ([1fcd5f4](https://github.com/swagger-api/apidom/commit/1fcd5f4ca50f03e46f3fd853a4f13934d03e96d6))

### Features

- **apidom-ls:** apply refractorPluginReplaceEmptyElement to parser ([4d30a59](https://github.com/swagger-api/apidom/commit/4d30a596f78412494a8b0bc8cf9edf75c1db83bb))
- **apidom-ls:** enhance ls features ([249dba6](https://github.com/swagger-api/apidom/commit/249dba64d582e52800bf0ea3df2c863294bb3122))

# [0.8.0](https://github.com/swagger-api/apidom/compare/v0.7.0...v0.8.0) (2021-11-15)

### Bug Fixes

- **ns-asynapi-2:** fix traversal key map ([8ef14b4](https://github.com/swagger-api/apidom/commit/8ef14b47cc0cf2e42e6356273851f2a5168c9024))
- **ns-openapi-3-1:** fix bug in replace empty el. plugin ([f3413d0](https://github.com/swagger-api/apidom/commit/f3413d082cef010146468cb1444092a2d20d0c9b)), closes [#812](https://github.com/swagger-api/apidom/issues/812)
- **ns-openapi-3-1:** fix bug in replace empty el. plugin ([221bac3](https://github.com/swagger-api/apidom/commit/221bac3f84ea2388ead0c3b4c29a540d989f9704)), closes [#812](https://github.com/swagger-api/apidom/issues/812)

### Features

- add plugin for replacing empty elements ([#879](https://github.com/swagger-api/apidom/issues/879)) ([c073f58](https://github.com/swagger-api/apidom/commit/c073f5853bc1e37c540b0bebec74efa82e7b359f)), closes [#883](https://github.com/swagger-api/apidom/issues/883)
- **ns-asyncapi-2:** add support for bindinds empty elements mapping ([#890](https://github.com/swagger-api/apidom/issues/890)) ([9743bc5](https://github.com/swagger-api/apidom/commit/9743bc59d2834f7951565abb5076debf3c929473)), closes [#812](https://github.com/swagger-api/apidom/issues/812)
- **ns-asyncapi-2:** add support for full empty elements mapping ([b5c8134](https://github.com/swagger-api/apidom/commit/b5c8134bb9f9b3aaa69e123657d8a95bb8f48c39)), closes [#833](https://github.com/swagger-api/apidom/issues/833)
- **ns-asyncapi-2:** introduce non-concrete Elements ([5f3d87d](https://github.com/swagger-api/apidom/commit/5f3d87d54f8a2c3940c9e9ccd816ccfdd24ddbcd)), closes [#833](https://github.com/swagger-api/apidom/issues/833)
- **ns-openapi-3-1:** add support for full empty elements mapping ([#894](https://github.com/swagger-api/apidom/issues/894)) ([cc1dbdc](https://github.com/swagger-api/apidom/commit/cc1dbdc8026674b88b1176a821d258445d5d6747)), closes [#891](https://github.com/swagger-api/apidom/issues/891)

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

### Bug Fixes

- **adapter-yaml-1-2:** avoid annotation accumulation ([e5c694b](https://github.com/swagger-api/apidom/commit/e5c694bc62cdc2f19d2dfbd056d060a119176a20)), closes [#814](https://github.com/swagger-api/apidom/issues/814)

### Performance Improvements

- **adapter-json:** optimize indirect syntactic analysis ([731d1f5](https://github.com/swagger-api/apidom/commit/731d1f5d635f469003949fc52a6717dd1e5d35a6)), closes [#691](https://github.com/swagger-api/apidom/issues/691)
- **adapter-yaml:** optimize syntactic analysis ([aa78da6](https://github.com/swagger-api/apidom/commit/aa78da6b8b6be57d0009325079896eb42b0d3b8f)), closes [#691](https://github.com/swagger-api/apidom/issues/691)

# [0.5.0](https://github.com/swagger-api/apidom/compare/v0.4.0...v0.5.0) (2021-10-26)

### Features

- add schema type related metadata to namespaces ([433a2c2](https://github.com/swagger-api/apidom/commit/433a2c29aaccad4bf63e27fc4b79ea5f47f6c050))
- **apidom-ls:** completion and validation fixes ([2ded62c](https://github.com/swagger-api/apidom/commit/2ded62c6a7fd2c407fbf9d48322a60872dbad81a))
- **apidom-ls:** document cache ([aefaa44](https://github.com/swagger-api/apidom/commit/aefaa441af833e031c32f2bccdc9e953179dd1c6))
- **apidom-ls:** single ajv instance ([a93d428](https://github.com/swagger-api/apidom/commit/a93d428ddf83576540c71dbdee5cdc7e7eee8567))
- **apidom-ls:** update validation providers and json schemas ([a49154b](https://github.com/swagger-api/apidom/commit/a49154b0f6d435da3375035222d769e3a1c04c35))

### Performance Improvements

- optimize JSON direct syntactic analysis ([5b5887e](https://github.com/swagger-api/apidom/commit/5b5887ec1d38a0cb3b4c542997818f39cda84108)), closes [#691](https://github.com/swagger-api/apidom/issues/691)
- optimize predicates for AsyncAPI namesapce ([7c7817f](https://github.com/swagger-api/apidom/commit/7c7817faa93b827a3d3827f929e2671cd9b90d8c)), closes [#691](https://github.com/swagger-api/apidom/issues/691)
- optimize predicates for base namespace ([e23b670](https://github.com/swagger-api/apidom/commit/e23b670c232d3d94bb0e889faaca616d03d01b6e)), closes [#691](https://github.com/swagger-api/apidom/issues/691)
- optimize predicates for OpenAPI namespace ([5e106c2](https://github.com/swagger-api/apidom/commit/5e106c27ff329ebd29bc383b72f6a095f3e452e1)), closes [#691](https://github.com/swagger-api/apidom/issues/691)

# [0.4.0](https://github.com/swagger-api/apidom/compare/v0.3.0...v0.4.0) (2021-10-22)

### Features

- **core:** add polymorphic support for structural predicates ([67874f6](https://github.com/swagger-api/apidom/commit/67874f631159e45afdd3e918689e200ef8ac8e07)), closes [#803](https://github.com/swagger-api/apidom/issues/803)
- **reference:** expose errors from package ([3fd2bfc](https://github.com/swagger-api/apidom/commit/3fd2bfcc91a46401dabdefc0d6446354bd94ee88)), closes [#798](https://github.com/swagger-api/apidom/issues/798)

# [0.3.0](https://github.com/swagger-api/apidom/compare/v0.2.1...v0.3.0) (2021-10-05)

### Features

- add support for AsyncAPI 2.2.0 specification ([82f0e54](https://github.com/swagger-api/apidom/commit/82f0e543f62d0b013d145e23ebd817cb40097039)), closes [#688](https://github.com/swagger-api/apidom/issues/688)

## [0.2.1](https://github.com/swagger-api/apidom/compare/v0.2.0...v0.2.1) (2021-09-30)

### Bug Fixes

- **build:** bundle copy of built wasm files with npm distribution ([69b97eb](https://github.com/swagger-api/apidom/commit/69b97ebac24103437bdf8d2e29db54770fe5119c)), closes [#709](https://github.com/swagger-api/apidom/issues/709)

# 0.2.0 (2021-09-28)

### Bug Fixes

- **adapters:** expose nanemspace instances from adapters ([e885d9e](https://github.com/swagger-api/apidom/commit/e885d9e9dce9f5e01c1730cefa196cc21b9a5b8b))
- **apidom-ls:** refs [#297](https://github.com/swagger-api/apidom/issues/297) - bump yaml-js version ([38ac243](https://github.com/swagger-api/apidom/commit/38ac243c7780f769af78da7056a823c6454b844f))
- **apidom:** add 'typeRoots' to tsconfig ([80c3cf2](https://github.com/swagger-api/apidom/commit/80c3cf25ef764bdeb5e8e5b9af2f4c040327c361))
- **apidom:** fix refract structures hydration ([#227](https://github.com/swagger-api/apidom/issues/227)) ([3309a70](https://github.com/swagger-api/apidom/commit/3309a70637b1e237a582cfa66b32b124a6dde0d1)), closes [#226](https://github.com/swagger-api/apidom/issues/226)
- **AST:** compensate for inconsistent tree-sitter SyntaxNode API ([8d04daa](https://github.com/swagger-api/apidom/commit/8d04daaf0ea4ed99d430fdd87a72c5ba0afff67c)), closes [#69](https://github.com/swagger-api/apidom/issues/69)
- **asyncapi-2-1:** add IBM MQ visitor mapping ([04d1e43](https://github.com/swagger-api/apidom/commit/04d1e43a359c0a8e366db13752028dc95d8e9668))
- **asyncapi-2-1:** fix parsing of Operation.message field ([#561](https://github.com/swagger-api/apidom/issues/561)) ([ea7fc15](https://github.com/swagger-api/apidom/commit/ea7fc152593bdbb1ccd04affbaf899471f99a915)), closes [#543](https://github.com/swagger-api/apidom/issues/543)
- **asyncapi:** allow replace Schema for Reference in Message.payload ([ae11834](https://github.com/swagger-api/apidom/commit/ae11834838976e3c31304e0929ecfd676c27a98f)), closes [#427](https://github.com/swagger-api/apidom/issues/427)
- avoid webpack bug by changing type mapping ([#282](https://github.com/swagger-api/apidom/issues/282)) ([5433197](https://github.com/swagger-api/apidom/commit/543319781088b7105a23417562e75f7f02cfc7a0))
- **editor:** 2nd pane scrolling ([4e26c81](https://github.com/swagger-api/apidom/commit/4e26c81abdaf849db487216c242cdde0826dd7da))
- **editor:** actual oas3.1 spec in fixtures ([bcb3435](https://github.com/swagger-api/apidom/commit/bcb3435510bcedf0cbb8614c75f3b568fbd9b5a4))
- **editor:** add extra var check in topbar component ([508afb0](https://github.com/swagger-api/apidom/commit/508afb0916f27f186541d805cf9562f493b76bf8))
- **editor:** add extra var check in topbar component ([57b812a](https://github.com/swagger-api/apidom/commit/57b812a4287ec275469d2325b674272be7c48633))
- **editor:** add try/catch for download resolved actions ([22cbace](https://github.com/swagger-api/apidom/commit/22cbace6cd81a7adbc00d817d566e36b72de59c2))
- **editor:** add wait and extra checks for cypress monaco.spec ([9d08168](https://github.com/swagger-api/apidom/commit/9d08168cf5d7587677b44c63c97ac9d758484fa0))
- **editor:** additional `dispose()` on unmount ([0ba77d5](https://github.com/swagger-api/apidom/commit/0ba77d5329b9a4d2f46621a8f9b99b4e906c0b6c))
- **editor:** allow hover tooltip to exceed its container ([1cd4c89](https://github.com/swagger-api/apidom/commit/1cd4c894d4d37dcdd7dbb4de91813d67b0d3e3ba))
- **editor:** apidom.worker import editor from node_modules ([643718e](https://github.com/swagger-api/apidom/commit/643718ecf3e335eeeb52b4f9fc4e4132b1db1121))
- **editor:** apidomContext required for codeActions ([4225011](https://github.com/swagger-api/apidom/commit/42250114032b93dcf2682479092ae46af22e6469))
- **editor:** codeActions error handling with unsupported spec ([d6a6dda](https://github.com/swagger-api/apidom/commit/d6a6ddab446e32c18e7f32fb928a2fc11f1c1378))
- **editor:** convertToYaml should always return a response ([22e609d](https://github.com/swagger-api/apidom/commit/22e609d1029aff05d3158e6ea939a5a44c258de7))
- **editor:** convertToYaml should always return a response ([a0c8282](https://github.com/swagger-api/apidom/commit/a0c8282d38e532ab34af87c466eb18c1213a45eb))
- **editor:** documentSymbols error handling for unsupported spec ([98b5c5e](https://github.com/swagger-api/apidom/commit/98b5c5e585bbe46ebadff1e78e1e05766dea1c99))
- **editor:** documentSymbolsAdapter call correct worker method ([bb06083](https://github.com/swagger-api/apidom/commit/bb0608372f343185efbce3d1f5ceb1c6b3694e39))
- **editor:** FileMenuDropdown state update checks ([e669f2f](https://github.com/swagger-api/apidom/commit/e669f2fc4f0e5a7eb2670770cb9d22c2e8d03d23))
- **editor:** genericEditorPlugin layout no console errors ([21d5782](https://github.com/swagger-api/apidom/commit/21d57824d3bae95350b5e33edc38808b3ded141d))
- **editor:** genericEditorPlugin layout no console errors ([85c7e7d](https://github.com/swagger-api/apidom/commit/85c7e7d97d306f1dc80776d365035dc2025c9bc4))
- **editor:** hover error handling with unsupported spec ([7e4b490](https://github.com/swagger-api/apidom/commit/7e4b490898c9f1fe09d3687840a17ab8cbe19624))
- **editor:** importUrl label control for unit test ([3378b81](https://github.com/swagger-api/apidom/commit/3378b81da6510bbbcadd71e0f2f4ec5a54c4739b))
- **editor:** initializeParsers should return a promise ([bc08608](https://github.com/swagger-api/apidom/commit/bc08608cb5e24fb6f567f123a18e3ab336588fc3))
- **editor:** jsonService doValidation ([dedf41e](https://github.com/swagger-api/apidom/commit/dedf41e577eac49826184c8b6d7524026a8edd9c))
- **editor:** monaco theme updates ([380c39f](https://github.com/swagger-api/apidom/commit/380c39f2ecfb6fe882b306fab2884209f75a9904))
- **editor:** more monaco theme updates ([9cf2ee0](https://github.com/swagger-api/apidom/commit/9cf2ee0c4cfcc8c4736eb4392b080d6541834353))
- **editor:** more robust check for await topbarActions result ([8cc7720](https://github.com/swagger-api/apidom/commit/8cc77201704f0786a17ec40be3009476db21de4a))
- **editor:** more robust check for await topbarActions result ([867c0c0](https://github.com/swagger-api/apidom/commit/867c0c0d45b996407107d3709f33e743f12c5914))
- **editor:** re-enable minimap in monaco ([8265c31](https://github.com/swagger-api/apidom/commit/8265c31914655468528d31e6a05549f4fca76532))
- **editor:** reinstantiate generator lists on specVersion change ([7eedd88](https://github.com/swagger-api/apidom/commit/7eedd8826cebb36b579d73f428283c3b4d4a35a3))
- **editor:** reinstantiate generator lists on specVersion change ([42aca80](https://github.com/swagger-api/apidom/commit/42aca80fca5cac8cdc42965a792705f5c11df076))
- **editor:** remove extraneous constructor .bind ([57bc622](https://github.com/swagger-api/apidom/commit/57bc6224a5b6f8acb97a233d60c33b05f3409373))
- **editor:** revert webpack config back to single entry point ([cdf7463](https://github.com/swagger-api/apidom/commit/cdf74631b585a390e6dc2e22b351194ce7f69985))
- **editor:** saveAsYaml file extension ([83826aa](https://github.com/swagger-api/apidom/commit/83826aaa27c26552e497f777a9e55beb089646b1))
- **editor:** semanticHighlighting.enabled setting ([0e49fbb](https://github.com/swagger-api/apidom/commit/0e49fbb41e1d7842a3bac6905645a86bb0c2c9a2))
- **editor:** topbar color, font sizes, padding ([5c2e7a3](https://github.com/swagger-api/apidom/commit/5c2e7a359b4a2e439b47b02edba349d9ec806851))
- **editor:** topbar padding and fonts ([d319323](https://github.com/swagger-api/apidom/commit/d319323148cfc831a13615b1f13a8300273c0f1e))
- **editor:** unhandled promise rejection for unsupported definitions ([f03b5ae](https://github.com/swagger-api/apidom/commit/f03b5ae8fb4ef7831e160abc4dccf57ebaff5c53))
- **editor:** update changelog statuses ([e757a3e](https://github.com/swagger-api/apidom/commit/e757a3edbc02a3ff16805ed3045936c6bf44e3b9))
- **editor:** use p2m for diagnostics markers ([e386971](https://github.com/swagger-api/apidom/commit/e386971443b8a812585189ece0d9ceedaa8b0086))
- **editor:** wip disabled hooks for Topbar - linting ([a7271b1](https://github.com/swagger-api/apidom/commit/a7271b1f6929f0bb854eafef4e345e65ca3fdd03))
- **editor:** worker error handling with unsupported spec ([167dc3f](https://github.com/swagger-api/apidom/commit/167dc3f1bd74c216e6a794dea84dd479f3fc8e37))
- **elements:** use proper types for accessors ([6c43de4](https://github.com/swagger-api/apidom/commit/6c43de48c6976eab4e0e41bcf8c31d7eff67e3d3)), closes [#2](https://github.com/swagger-api/apidom/issues/2)
- **generic-editor:** fix [#553](https://github.com/swagger-api/apidom/issues/553) - baseURI for deref ([51f45b2](https://github.com/swagger-api/apidom/commit/51f45b24241873b817a51e02e08069b5a774a88b))
- **interpret:** fix icon position to stay always in the same place ([e814b87](https://github.com/swagger-api/apidom/commit/e814b87b86203b8a0f4270c4eb44881d4575e9b8))
- **lexical-analysis:** fix lexical analyzer init. in browser env ([fe91458](https://github.com/swagger-api/apidom/commit/fe91458d0d87390c98471640e9fd32ee182f7e15)), closes [#451](https://github.com/swagger-api/apidom/issues/451)
- missing comma in tsconfig.json ([28265fb](https://github.com/swagger-api/apidom/commit/28265fb91e3648d332616c18b4e174ea6c39042c))
- **namespaces:** fix duplicates in mixed fields visitor ([725ecce](https://github.com/swagger-api/apidom/commit/725ecce4d0a438fba36f62c33516cb8e1ad0e33c))
- **ns-asyncapi-2-0:** fix typo in specification object ([3460aea](https://github.com/swagger-api/apidom/commit/3460aeac9ff986c1fe23e82a883eee04a68c57ef)), closes [#387](https://github.com/swagger-api/apidom/issues/387)
- **ns-openapi-3-1:** fix bug in embedded-resources- plugin ([2809390](https://github.com/swagger-api/apidom/commit/2809390e7744e4635a85555203ba0b3218fab0e6)), closes [#362](https://github.com/swagger-api/apidom/issues/362)
- **ns-openapi-3-1:** fix bugs in Schema Object refracting ([e9e0cd0](https://github.com/swagger-api/apidom/commit/e9e0cd02addc24397c6802337cd3f0553fe75a50)), closes [#337](https://github.com/swagger-api/apidom/issues/337)
- **openapi3-1-yaml:** fix PathItem visitor ([523a0c1](https://github.com/swagger-api/apidom/commit/523a0c1f638cd1a75a94472bccaf6c90b7f9b64e))
- **openapi3-1:** fix problem in Paht Item object visiting ([0bea447](https://github.com/swagger-api/apidom/commit/0bea447a25aedf1197581051fd2b7f9f32d35d95))
- **OpenApi3.1:** add source maps to generic Object visitors ([2e1aca5](https://github.com/swagger-api/apidom/commit/2e1aca523a3dd54493cb53116637cc6391cfb927))
- **OpenApi3.1:** disallow extensions on Reference Object ([457e45d](https://github.com/swagger-api/apidom/commit/457e45d066a8e247a834480f16ef06f7a61783ee))
- **OpenApiVisitor:** add sourcMap ([bdc2da7](https://github.com/swagger-api/apidom/commit/bdc2da792854d1a05eead0fe8526f73d6823e6b2)), closes [#48](https://github.com/swagger-api/apidom/issues/48)
- **parser:** fix sync/async inconsistencies ([d1c29f3](https://github.com/swagger-api/apidom/commit/d1c29f3605be43b815194a0876e92cf5212b2ef4)), closes [#310](https://github.com/swagger-api/apidom/issues/310)
- **playground:** allow resolve and dereference in certain conditions ([3ac6951](https://github.com/swagger-api/apidom/commit/3ac69515c2d77cc4aab167281d7a5d1d96991348)), closes [#476](https://github.com/swagger-api/apidom/issues/476)
- **playground:** change initial state to empty one ([a4abaf9](https://github.com/swagger-api/apidom/commit/a4abaf9d8ddeb87d9284908d3d92b571e8cc7cba))
- **playground:** close import dialog before backdrop ([3c5b37c](https://github.com/swagger-api/apidom/commit/3c5b37c4210e85d97fb688ab0d09d6d213a4fd3f))
- **playground:** fix display of resolve console output ([fed0281](https://github.com/swagger-api/apidom/commit/fed02811e31957a963ed21c229ca6db53483508f))
- **playground:** fix paths to wasm files loaded by web worker ([5b35dfe](https://github.com/swagger-api/apidom/commit/5b35dfe2918632e7db6e89ec907a4f76a63af1e5))
- **playground:** fix transpilation of refractors ([b0746fa](https://github.com/swagger-api/apidom/commit/b0746fa9bc15ae4bebd9244a1cf5c73f929078f6))
- **playground:** reset file input after using it ([d5ecbfc](https://github.com/swagger-api/apidom/commit/d5ecbfc3e58f931141af8bd866fa96baf3e5b6f5))
- **reference:** allow dereferencing other elements than ParseResult ([0b099ee](https://github.com/swagger-api/apidom/commit/0b099ee821790d11769dea8c5a91d906f83996e5)), closes [#476](https://github.com/swagger-api/apidom/issues/476)
- **reference:** allow resolution on other elements than ParseResult ([4d4696b](https://github.com/swagger-api/apidom/commit/4d4696b20754478f27524d4b68f794ebe19cf65f)), closes [#476](https://github.com/swagger-api/apidom/issues/476)
- **reference:** fix bug in reference predicate logic ([8b5176a](https://github.com/swagger-api/apidom/commit/8b5176a211fbe99ca683f7fb253c765952e26eba))
- **reference:** fix incorrect JSON Schema dereference in OAS 3.1 ([2f1fefa](https://github.com/swagger-api/apidom/commit/2f1fefa948dbe49a80b208a3f6af054346723e8d)), closes [#607](https://github.com/swagger-api/apidom/issues/607)
- **reference:** fix resolution of Schema Object field ([#525](https://github.com/swagger-api/apidom/issues/525)) ([58350fe](https://github.com/swagger-api/apidom/commit/58350fe1f4354d7a9094ea859268320e461000b6)), closes [#524](https://github.com/swagger-api/apidom/issues/524)
- **reference:** handle inner media types properly during resolution ([d67ca7c](https://github.com/swagger-api/apidom/commit/d67ca7c1f6f319f6676eb3f1f9abea88e0dc7408))
- **reference:** unwrap result after dereferencing ([d4aee1e](https://github.com/swagger-api/apidom/commit/d4aee1ea1f08a1e7b22569d0de1fe5fe923c9013)), closes [#476](https://github.com/swagger-api/apidom/issues/476)
- **yaml-1-2:** add support for parsing more corner cases ([7b5aff9](https://github.com/swagger-api/apidom/commit/7b5aff9a6f015e4119b2f7f967b9ad3ae6a26a03)), closes [#290](https://github.com/swagger-api/apidom/issues/290)
- **yaml:** fix YAML parsing in browsing environemnt ([8168986](https://github.com/swagger-api/apidom/commit/81689867d6f3dded56b1aee694ec4595c53bd3c0)), closes [#232](https://github.com/swagger-api/apidom/issues/232)

### Features

- **adapters:** make adapters understand refractorOpts ([a314eb5](https://github.com/swagger-api/apidom/commit/a314eb584ec58284e11e22f54385c7af0f7b895b))
- add 1st POC of ApiDOM ([7d5a241](https://github.com/swagger-api/apidom/commit/7d5a241681e50faf481ce80e029c8ec3c72f6a56))
- add additional predicates ([93e49aa](https://github.com/swagger-api/apidom/commit/93e49aa95fce6ce971f0527af9b9be001fffa216))
- add apidom-reference package ([17bd14a](https://github.com/swagger-api/apidom/commit/17bd14a63d43419a1e345f0747a7d2be034c70e1))
- add ArrayElement.set method to minim types ([250fa70](https://github.com/swagger-api/apidom/commit/250fa70c807245f0224b30521f20c1b718e7f527))
- add base predicates ([b435155](https://github.com/swagger-api/apidom/commit/b43515561a05a787c801504c11f42e34fefe6a49)), closes [#60](https://github.com/swagger-api/apidom/issues/60)
- add CST to AST transformer for tree-sitter ([9d3f03c](https://github.com/swagger-api/apidom/commit/9d3f03ca870c203d93a9bf9a1a909000d4d12add)), closes [#35](https://github.com/swagger-api/apidom/issues/35)
- add extensions support to additional objects ([a658668](https://github.com/swagger-api/apidom/commit/a658668eb4eaa5aecf48a4c20ea5d49a342c37cb)), closes [#16](https://github.com/swagger-api/apidom/issues/16)
- add findAtOffset function ([59145fe](https://github.com/swagger-api/apidom/commit/59145fe5a7b2bc3ecc96140c89c93de5d37b4310))
- add OpenApi 3.1 support ([9d48576](https://github.com/swagger-api/apidom/commit/9d48576b01b43b2dff451614f6e483fce1e089ce)), closes [#2](https://github.com/swagger-api/apidom/issues/2)
- add reference related metadata to namespaces ([e66cdaa](https://github.com/swagger-api/apidom/commit/e66cdaa7e21e533549175f9f47966a3c6baf9308))
- add support for abstract references ([e246112](https://github.com/swagger-api/apidom/commit/e246112169260d679e0349bff0e6b76469e5408d)), closes [#9](https://github.com/swagger-api/apidom/issues/9)
- add support for AsyncAPI 2.1.0 specification ([c7840c4](https://github.com/swagger-api/apidom/commit/c7840c4d979cddc904d4170aff1635ad695a8fe4)), closes [#461](https://github.com/swagger-api/apidom/issues/461)
- add support for errors and missing literals ([3dc5c3a](https://github.com/swagger-api/apidom/commit/3dc5c3abf191f8900d6f7b7e5a229d458412f2c8)), closes [#35](https://github.com/swagger-api/apidom/issues/35)
- add support for generic JSON -> ApiDOM transformation ([47998c9](https://github.com/swagger-api/apidom/commit/47998c9c25f3a100d0386be2b82ab46982c726bd))
- add support for generic YAML -> ApiDOM transformation ([0a1de40](https://github.com/swagger-api/apidom/commit/0a1de4015aa3f7a023d729b73fcb6eb6a1d545a3))
- add support for JSON comments ([87c745e](https://github.com/swagger-api/apidom/commit/87c745e48e30520c1db449d1db8e57da6b95b384)), closes [#4](https://github.com/swagger-api/apidom/issues/4)
- add support for parse errors ([b4392b2](https://github.com/swagger-api/apidom/commit/b4392b2594d523b252eaa1b745b544477aef6022)), closes [#4](https://github.com/swagger-api/apidom/issues/4)
- add support for parsing empty files ([653d78a](https://github.com/swagger-api/apidom/commit/653d78a5d10d9460785c4e70c34931f382bd4853))
- add support for servers field ([718d15b](https://github.com/swagger-api/apidom/commit/718d15b8e77c4f70eda9f586bf42d437193b5790)), closes [#2](https://github.com/swagger-api/apidom/issues/2)
- add support for worker environment ([b375f57](https://github.com/swagger-api/apidom/commit/b375f5755d0233120544e2709e5d6614d2554712)), closes [#287](https://github.com/swagger-api/apidom/issues/287)
- add YAML WASM support ([#107](https://github.com/swagger-api/apidom/issues/107)) ([a4ddf1a](https://github.com/swagger-api/apidom/commit/a4ddf1a6b592a26b43b06db944014b053b6f880e)), closes [#1](https://github.com/swagger-api/apidom/issues/1)
- **apidom-ast:** introduce async version of visit function ([b627409](https://github.com/swagger-api/apidom/commit/b6274091798e382d674bf339495925eed37c4c9b))
- **apidom-ast:** introduce normalizing and merging visitors ([1aa2786](https://github.com/swagger-api/apidom/commit/1aa2786bc80d9cbf43291109a043e4d0acfa6cf4))
- **apidom-ls:** deref and definition service, various enhancements ([18876a2](https://github.com/swagger-api/apidom/commit/18876a26125c6f6940e57877cea75cf108e8fd4f))
- **apidom-ls:** initial deref service ([c490e45](https://github.com/swagger-api/apidom/commit/c490e453b82801c286ecec7a119114ef0f9e4b7c))
- **apidom-lsp:** first LSP server and VS Code Client extension ([20c1acf](https://github.com/swagger-api/apidom/commit/20c1acffc993e9f791975e7275ba32edc4441a8e))
- **apidom-lsp:** Standalone LSP Server, server ad e2e tests ([7898578](https://github.com/swagger-api/apidom/commit/789857833d447667e1152b64a50fd3a7b77c7b8f))
- **apidom-ls:** standard linter functions and clenup ([e1dda94](https://github.com/swagger-api/apidom/commit/e1dda94a299852aceb78e514bff4f4b0dcf88cb4))
- **apidom-ls:** updated language service library ([bcb2e81](https://github.com/swagger-api/apidom/commit/bcb2e81861cb9f1c4664503038ca696259823889))
- **apidom-monaco:** apidom monaco POC ([a8595b7](https://github.com/swagger-api/apidom/commit/a8595b788f49985be0b633c34be828916b4ed1ce))
- **apidom:** add mechanism to compute parent edges ([#391](https://github.com/swagger-api/apidom/issues/391)) ([4e526d4](https://github.com/swagger-api/apidom/commit/4e526d480526353efeab67889f6be8678ac5a1b7)), closes [#383](https://github.com/swagger-api/apidom/issues/383)
- **apidom:** add refractor for base types ([a4647a7](https://github.com/swagger-api/apidom/commit/a4647a78ff6f4b7fd2963089cb2b31273b0e13cd)), closes [#368](https://github.com/swagger-api/apidom/issues/368)
- **apidom:** add support for element identity via refractor plugins ([#565](https://github.com/swagger-api/apidom/issues/565)) ([94080db](https://github.com/swagger-api/apidom/commit/94080dba39359f89c40155dea6eb8ee86f3d7f5a)), closes [#528](https://github.com/swagger-api/apidom/issues/528)
- **apidom:** add support for transforming ApiDOM into S-expressions ([305e1c9](https://github.com/swagger-api/apidom/commit/305e1c9c2cd35e3b5e722953f1c25d7243a4d9f3)), closes [#429](https://github.com/swagger-api/apidom/issues/429)
- **apidom:** embed AST nodes into parsed structures ([f7e3f76](https://github.com/swagger-api/apidom/commit/f7e3f76259795cbf8d2fae55c4b4631ca32727de)), closes [#10](https://github.com/swagger-api/apidom/issues/10)
- apidomls initial language service ([735951e](https://github.com/swagger-api/apidom/commit/735951ec4e5359740326b5a1c0bc67d372b5cf5e))
- **AST:** add support for directives in YAML transformer ([ddd7d63](https://github.com/swagger-api/apidom/commit/ddd7d6330384e4435d29cf9b4c83d9b2fe53fffc)), closes [#1](https://github.com/swagger-api/apidom/issues/1)
- **AST:** add support for YAML AST errors ([a72f5a5](https://github.com/swagger-api/apidom/commit/a72f5a50cc3a4e89179339a43634171ab315800f)), closes [#1](https://github.com/swagger-api/apidom/issues/1)
- **AST:** add YAML CST -> AST transformation for all common types ([e2e1e1b](https://github.com/swagger-api/apidom/commit/e2e1e1b59b5ac79857da22912d36adf902d2ed7b)), closes [#1](https://github.com/swagger-api/apidom/issues/1)
- **ast:** enhance core traversal mechanism to support cycles ([285e768](https://github.com/swagger-api/apidom/commit/285e768627513b2998ac6d4faea1b8b8c33fb94d))
- **AST:** incorporate missing nodes into AST ([65a75b8](https://github.com/swagger-api/apidom/commit/65a75b863a5176a568edd5476e40ae9d3df9c2b0)), closes [#35](https://github.com/swagger-api/apidom/issues/35)
- **AST:** incorporate Presentation info model into YAML ([18b8960](https://github.com/swagger-api/apidom/commit/18b89605dd2466935088e47caaed06f7f231d2be)), closes [#1](https://github.com/swagger-api/apidom/issues/1)
- **AST:** introduce YAML AST models and predicates ([9ba4561](https://github.com/swagger-api/apidom/commit/9ba4561e6ff58957e24cae6351229805cde241b1)), closes [#1](https://github.com/swagger-api/apidom/issues/1)
- **ast:** make cycle detection configurable ([7569b43](https://github.com/swagger-api/apidom/commit/7569b43e8cd30a64f43ac7a3e8022d52b9df5894))
- **ast:** make errors and missing nodes part of AST ([6142fab](https://github.com/swagger-api/apidom/commit/6142fabc9520321c1cf2e8fc8107ce992eb02806)), closes [#35](https://github.com/swagger-api/apidom/issues/35)
- **asyncapi-2-0-0:** finish refractor implementation ([526fc4f](https://github.com/swagger-api/apidom/commit/526fc4f266fc2c8c402461cab63f2e8fd176cf5f))
- **asyncapi-2-0:** add support for Schema cycles ([d7d094d](https://github.com/swagger-api/apidom/commit/d7d094d515d84d47f8ae6a41f70d5d038c719797)), closes [#427](https://github.com/swagger-api/apidom/issues/427)
- **asyncapi-2-1:** add support for Channel Item dereferencing ([3300cb7](https://github.com/swagger-api/apidom/commit/3300cb7b790521ae9bd73222cd453ecb6b1fde8e)), closes [#558](https://github.com/swagger-api/apidom/issues/558)
- **asyncapi-2-1:** add support for Channel Item ext. resolution ([e0e8895](https://github.com/swagger-api/apidom/commit/e0e8895941d8d4d582e4e4254aa316e807cfc705)), closes [#559](https://github.com/swagger-api/apidom/issues/559)
- **asyncapi-ns:** add predicates ([9a25dd2](https://github.com/swagger-api/apidom/commit/9a25dd2ef05a294069cd22b3f2613f2a56b0f88b)), closes [#60](https://github.com/swagger-api/apidom/issues/60)
- **AsyncApi2.0.0-Yaml:** add AsyncApi 2.0.0 adapter ([3aa325a](https://github.com/swagger-api/apidom/commit/3aa325ac612da5c892ec332b393afd3c34cc6f2d)), closes [#1](https://github.com/swagger-api/apidom/issues/1)
- **AsyncApi2.0:** add support for ChannelItem object ([2a06d98](https://github.com/swagger-api/apidom/commit/2a06d981777d4c64216456099c4e0de5e5428731)), closes [#67](https://github.com/swagger-api/apidom/issues/67)
- **AsyncApi2.0:** add support for Channels object ([a86241a](https://github.com/swagger-api/apidom/commit/a86241a6ca6676cc6282ce2513717ba274aed7df)), closes [#67](https://github.com/swagger-api/apidom/issues/67)
- **AsyncApi2.0:** add support for MemberElement sourcemaps ([e419a57](https://github.com/swagger-api/apidom/commit/e419a57b028ef17ed9850109a6debbbcd4b288fe)), closes [#71](https://github.com/swagger-api/apidom/issues/71)
- **AsyncApi2.0:** add support for Parameters object ([d468a73](https://github.com/swagger-api/apidom/commit/d468a73dc186792c95da065c2e974a1f1d171281))
- **AsyncApi2.0:** add support for Server object ([4e507e9](https://github.com/swagger-api/apidom/commit/4e507e907416a6ff9061c7022a164f2bebf3cedb)), closes [#67](https://github.com/swagger-api/apidom/issues/67)
- **AsyncApi2.0:** add support for Server Variable Object ([7ea19fe](https://github.com/swagger-api/apidom/commit/7ea19fe91f5476ebebc8982874fa877c4935e560)), closes [#67](https://github.com/swagger-api/apidom/issues/67)
- **AsyncApi2.0:** add support for Servers object ([bf37684](https://github.com/swagger-api/apidom/commit/bf376842dbaa54a29c0f9a9700c2e44b71613232)), closes [#67](https://github.com/swagger-api/apidom/issues/67)
- **AsyncApi2.0:** add support for unknown values and fields ([2c994af](https://github.com/swagger-api/apidom/commit/2c994af5e825ada8381774937eaa3c86bf26b09a)), closes [#101](https://github.com/swagger-api/apidom/issues/101)
- **AsyncAPI:** add namespace for AsyncAPI specification ([9e6d37a](https://github.com/swagger-api/apidom/commit/9e6d37a53bb0b735b59bea268dcf51c794fc070c))
- **asyncapi:** add refractor generics ([be3c8d1](https://github.com/swagger-api/apidom/commit/be3c8d16ec7115e299d1084d6688229998b6c198))
- **asyncapi:** add traversal specific to asyncapi ([6ba0f44](https://github.com/swagger-api/apidom/commit/6ba0f44f478cf62065cdf8bf144e73cd35897acc))
- attempts of POC2 ([9af4924](https://github.com/swagger-api/apidom/commit/9af4924c22c05e5be45db956dbb707ec0767bfc1)), closes [#7](https://github.com/swagger-api/apidom/issues/7) [#6](https://github.com/swagger-api/apidom/issues/6) [#5](https://github.com/swagger-api/apidom/issues/5) [#3](https://github.com/swagger-api/apidom/issues/3)
- build proper JSON ast parser with visitor pattern support ([0f65112](https://github.com/swagger-api/apidom/commit/0f651123da588e169a07977520694b870319bdc6))
- demonstrate overlay mechanism in JavaScript ([d320e2f](https://github.com/swagger-api/apidom/commit/d320e2f183514f04a4cb3d078226fc92243c42c8))
- **dereference:** add initial work on external resolution ([816341c](https://github.com/swagger-api/apidom/commit/816341cf795d1e01f11ea5309c6621e0cf569a4b))
- **editor:** add a cancel button for importUrl modal ([405702d](https://github.com/swagger-api/apidom/commit/405702dde10b3c0c552525fd45b0a3770761c76c))
- **editor:** add a cancel button for importUrl modal ([cd8910c](https://github.com/swagger-api/apidom/commit/cd8910c4a96bc8697517f50e8a7bd2bcf246449d))
- **editor:** add apidom-ls babel alias ([76f863b](https://github.com/swagger-api/apidom/commit/76f863b4b1664fdba1a7b9cf8fa20307ee17c730))
- **editor:** add errorModal support to saveAsJson, saveAsYaml ([c8af156](https://github.com/swagger-api/apidom/commit/c8af156a4cfc185aad9f722d93ce16bc0c7d6395))
- **editor:** add errorModal support to saveAsJson, saveAsYaml ([049e9fb](https://github.com/swagger-api/apidom/commit/049e9fb8e9fe8643513c2bd83ccdb8ec4905508f))
- **editor:** add jest .spyOn for file/edit topbarActions ([9799d1b](https://github.com/swagger-api/apidom/commit/9799d1b3aa4fecedbe88b8fd75cdca2fb2eb1b13))
- **editor:** add jest .spyOn for file/edit topbarActions ([eeb7b12](https://github.com/swagger-api/apidom/commit/eeb7b129a29edb96f7b1695b3f7fe99b9e7721f7))
- **editor:** add public dispose method to workerManager ([81bea10](https://github.com/swagger-api/apidom/commit/81bea10f1db74ca0f2e5031d1a216ac6829d79bc))
- **editor:** additional converter return string cases ([a1f2100](https://github.com/swagger-api/apidom/commit/a1f210046ec0f70cfc966e1fa70d2def23e83f5b))
- **editor:** apply theming to minimap background ([928cc72](https://github.com/swagger-api/apidom/commit/928cc72e309fc0f89a7900a3ca30063a33a0ae51))
- **editor:** apply updated styles for error and warning modals ([5e2fc9b](https://github.com/swagger-api/apidom/commit/5e2fc9bb6b01b29b209e06f4d415cd68fd0f15f8))
- **editor:** clear editor when yaml or empty case ([e2e6925](https://github.com/swagger-api/apidom/commit/e2e69255201e794da80b8529bef691e4a70d5907))
- **editor:** clear editor with simple json case ([e677b3c](https://github.com/swagger-api/apidom/commit/e677b3cc2d76e052f0f9db18abcd8cc2d9ffd452))
- **editor:** clearEditor detects spec type for re-init ([baefef3](https://github.com/swagger-api/apidom/commit/baefef302607b4cff16bd61bb33271e946ad41fc))
- **editor:** clearEditor.actions ([ac9c79b](https://github.com/swagger-api/apidom/commit/ac9c79b71423ce47fc1ffaf70bc1e0cdd4db5f0b))
- **editor:** codeActions provider ([98a7cbd](https://github.com/swagger-api/apidom/commit/98a7cbd9ed79c9bcd6bbbc96a0a74311a532b0df))
- **editor:** completionItemsAdapter with apidom ([66e8778](https://github.com/swagger-api/apidom/commit/66e8778a7ce4141d2da47099031088d8392f9f19))
- **editor:** convertJsonToYaml.actions ([3daca5c](https://github.com/swagger-api/apidom/commit/3daca5c27533bfdd0f8baff4c9e4fb5ae132ce04))
- **editor:** convertOas2ToOas3.actions ([188ee24](https://github.com/swagger-api/apidom/commit/188ee24e9d6f5a6cfef1c5459b61e405f9769e52))
- **editor:** convertToOas3 now uses non-mock data ([c8aef1d](https://github.com/swagger-api/apidom/commit/c8aef1d7cea3165daba9ed2be2ef99a21723734b))
- **editor:** convertToOas3 now uses non-mock data ([c4c74c3](https://github.com/swagger-api/apidom/commit/c4c74c34cc971c503f7df65f4cb2177b934742e9))
- **editor:** custom monaco light/dark themes ([cb23902](https://github.com/swagger-api/apidom/commit/cb23902015b3cc5577460c7f4cd18250b9efbf91))
- **editor:** custom react hook for languageFormat ([3da03b5](https://github.com/swagger-api/apidom/commit/3da03b5f0bfaea982bd3d7fd5d45f4579c8d05c3))
- **editor:** default wordWrap and minimap settings ([b7b9729](https://github.com/swagger-api/apidom/commit/b7b9729bf6f34e9cde089bbbbbaf1c46e1e059d5))
- **editor:** demo of doValidate from jsonService ([46b9054](https://github.com/swagger-api/apidom/commit/46b9054034e9b78cfa4bd020c9c09ec58cc42ae8))
- **editor:** demo test apidom-ls is readable ([a364781](https://github.com/swagger-api/apidom/commit/a3647819eb11811d380813d11758c73ffc24b464))
- **editor:** dev buttons to toggle/detect language ([ad7c0d5](https://github.com/swagger-api/apidom/commit/ad7c0d5f1b1629ba502bcd2db09750fcc40d5f2f))
- **editor:** dev buttons to toggle/detect language ([eb2f9bd](https://github.com/swagger-api/apidom/commit/eb2f9bd17ee50f3875128ab121f1d577c47f2028))
- **editor:** documentSymbolsAdapter ([9f2cf3a](https://github.com/swagger-api/apidom/commit/9f2cf3a3bd648f336b27bdb34d2de5f163f76c6d))
- **editor:** downloadGeneratedFile now uses non-mock data ([655f7c2](https://github.com/swagger-api/apidom/commit/655f7c23547b0a757eb5d08d7a7d6d6227984ba5))
- **editor:** downloadGeneratedFile now uses non-mock data ([eb36194](https://github.com/swagger-api/apidom/commit/eb36194c5cc2ee5d5981848c9cf4ffdd1f7e96a6))
- **editor:** editor pane shrink/expand responsiveness ([0b699f9](https://github.com/swagger-api/apidom/commit/0b699f9ac3566368f61eb991dd5812afb8de1bd8))
- **editor:** editor value onChange renders in swagger-ui ([76db19b](https://github.com/swagger-api/apidom/commit/76db19b6c431062c90b93f3d1835cff02de7bf19))
- **editor:** editor value onChange renders in swagger-ui ([4791680](https://github.com/swagger-api/apidom/commit/4791680e002e246a4c03d52b3b716eacaa38bacb))
- **editor:** EditorComponent as parent to vendor editor container ([39f4344](https://github.com/swagger-api/apidom/commit/39f4344e275267c5d7514569a510b32389a169c0))
- **editor:** experimental: pass monaco instance ([c7aacff](https://github.com/swagger-api/apidom/commit/c7aacffb83b1db672811a07fc63ea401f55cc4a8))
- **editor:** extract setupMode from setup ([fcd6be4](https://github.com/swagger-api/apidom/commit/fcd6be4680a61e722dfc26d28a1d484579cfe5c5))
- **editor:** FileMenuDropdown language format detection ([6570033](https://github.com/swagger-api/apidom/commit/65700333d7673d7433ea41df7c2b124b9b1164e9))
- **editor:** fixtures.actions ([a2111a6](https://github.com/swagger-api/apidom/commit/a2111a6db92f6630ab46aef3128f15647c7ccedb))
- **editor:** for OAS generator lists, remove need for swagger-client ([d4dc655](https://github.com/swagger-api/apidom/commit/d4dc655a12d05c74d98992698f46057165551611))
- **editor:** generator download deprecate use of swagger-client ([4d15e5c](https://github.com/swagger-api/apidom/commit/4d15e5cb65b7ed8437183ad7f0235ddda705b77c))
- **editor:** generator.actions ([26aaf1b](https://github.com/swagger-api/apidom/commit/26aaf1beac39991bb3bd79d140fcb383d30e7901))
- **editor:** GeneratorMenuDropdown component ([92d5264](https://github.com/swagger-api/apidom/commit/92d5264f01f1135abcb7ec7ca438d02ca9ac32f7))
- **editor:** generators list now uses actual/default values ([dc4d10b](https://github.com/swagger-api/apidom/commit/dc4d10b869dc4a18f93a80cd551448b9f65ebdae))
- **editor:** generators list now uses actual/default values ([216c27b](https://github.com/swagger-api/apidom/commit/216c27b6c7a5bcfb69ecde11693dd7dc4aacf49c))
- **editor:** GenericEditorContainer ([b46a20d](https://github.com/swagger-api/apidom/commit/b46a20d172d48f773f5511e47fcaf2a1d4ec0193))
- **editor:** GenericEditorContainer ([cf0374d](https://github.com/swagger-api/apidom/commit/cf0374da22420c99b2720223d2ac06146c16b5fb))
- **editor:** getSpecVersion helper for isOAS3/isSwagger2 ([c86de43](https://github.com/swagger-api/apidom/commit/c86de43d6c4c12e404f80992cb09ba57ca9136bb))
- **editor:** getSpecVersion helper for isOAS3/isSwagger2 ([f0b6155](https://github.com/swagger-api/apidom/commit/f0b6155cb349783ac0019ef25c4489b0a85fbb2d))
- **editor:** hoverAdapter for json ([58f8921](https://github.com/swagger-api/apidom/commit/58f89218a30c81f8e780a6f95358c6ab3495afff))
- **editor:** ideLayoutPreset with editorAreaLayout ([#571](https://github.com/swagger-api/apidom/issues/571)) ([18df907](https://github.com/swagger-api/apidom/commit/18df90707c23732d0da10255aaf6f97e8c26f967))
- **editor:** Import URL styling updates ([4d9756b](https://github.com/swagger-api/apidom/commit/4d9756b7d752a4ad4d9fbfe4e43a2d398025831e))
- **editor:** importFile will update swagger state ([b287c06](https://github.com/swagger-api/apidom/commit/b287c0623bc5238f2a3fb944a0c8ea1559d30f08))
- **editor:** importFile will update swagger state ([6df626e](https://github.com/swagger-api/apidom/commit/6df626eaa2bf450e231f05845be9a3b03be4e00e))
- **editor:** importFromURL will update swagger state ([e7c90ac](https://github.com/swagger-api/apidom/commit/e7c90ac396cdb213be31de0fae997fad62e23480))
- **editor:** importFromURL will update swagger state ([d59ad54](https://github.com/swagger-api/apidom/commit/d59ad5429c709f446549b75fe5a707f06d5159f9))
- **editor:** importFromURL.actions ([11b1e8b](https://github.com/swagger-api/apidom/commit/11b1e8b05124c9072815d23d026004d3fa3f712a))
- **editor:** improve and fix apidom-ls integration ([c675c1d](https://github.com/swagger-api/apidom/commit/c675c1db329164ec2be39165c2c86e68a4abdce0))
- **editor:** initial apidom.worker ([fa3123d](https://github.com/swagger-api/apidom/commit/fa3123d55a70bea3167d3b06c6a08dd6ba46dea6))
- **editor:** initial diagnosticsAdapter ([2197a16](https://github.com/swagger-api/apidom/commit/2197a16952a0897608d87d5c2a3e08b3fb11270f))
- **editor:** initial migrated react components ([b2192bc](https://github.com/swagger-api/apidom/commit/b2192bced1436366383ee81eb859d80761859af9))
- **editor:** initial migrated react components ([c5f128c](https://github.com/swagger-api/apidom/commit/c5f128c48a785ec2f285654ba8409e89c57474ab))
- **editor:** initial providers for documentSymbols and Hover ([c5230a4](https://github.com/swagger-api/apidom/commit/c5230a472880f792069bb6a45d70798233b15692))
- **editor:** initializeParsers sample with apidom parser ([5223d24](https://github.com/swagger-api/apidom/commit/5223d241e553a1f5b0616d41da862fe621607c12))
- **editor:** jest test for FileMenuDropdown ([5b3b464](https://github.com/swagger-api/apidom/commit/5b3b4646a6e1ffc90a9da0c1abac0206665d6966))
- **editor:** jest test for FileMenuDropdown ([410eacf](https://github.com/swagger-api/apidom/commit/410eacf71c7e113d5b9b7f10a5404c15c66e9973))
- **editor:** jest tests for EditMenuDropdown ([f97e171](https://github.com/swagger-api/apidom/commit/f97e171bee8031ae6776dc14ad144a24923aac95))
- **editor:** jest tests for EditMenuDropdown ([ef72932](https://github.com/swagger-api/apidom/commit/ef72932c4a71ee331bfc3e45ec84ceefc2dfbd34))
- **editor:** jest tests for topbar generated server/client ([72d37a5](https://github.com/swagger-api/apidom/commit/72d37a59336abb38f4ea58400e1ff4ce01859f39))
- **editor:** jest tests for topbar generated server/client ([3528bfe](https://github.com/swagger-api/apidom/commit/3528bfe51a7643139a405087e2e10d97c194a836))
- **editor:** keydown support to load default definitions ([eddc283](https://github.com/swagger-api/apidom/commit/eddc283df008d8c59cc98b847d34696790f5bdea))
- **editor:** language utils-helper ([44effc8](https://github.com/swagger-api/apidom/commit/44effc84a6572ec9a85145a3e2252e612230e7e3))
- **editor:** languageKind ([b003706](https://github.com/swagger-api/apidom/commit/b003706bb66a1a23d7d35c54d755b7d9f5644036))
- **editor:** load default definitions for oas2/oas3/asyncapi2 ([e340324](https://github.com/swagger-api/apidom/commit/e3403244e21b65445f1e8bd8b0689dbe2927b7a5))
- **editor:** load default oas3.1 definition ([58e889c](https://github.com/swagger-api/apidom/commit/58e889cbdfa9adde619512edc408782f92de0767))
- **editor:** migrate StandaloneLayout to functional component ([fdfaf61](https://github.com/swagger-api/apidom/commit/fdfaf6137bb4d3e5f2f8a31d2f0e9b909a131411))
- **editor:** migrated swagger styling from less to sass ([2b913b9](https://github.com/swagger-api/apidom/commit/2b913b960b3eae4cb3f1cbed7ae4838d861e0eb7))
- **editor:** migrated swagger styling from less to sass ([e41ef99](https://github.com/swagger-api/apidom/commit/e41ef99aa17da73afaaaca5c5ce3bbda3cfe6c27))
- **editor:** modal close x button ([ac0d2ac](https://github.com/swagger-api/apidom/commit/ac0d2accca28bdd1e14c0311efcde7a760e35b63))
- **editor:** ModalConfirmWrapper and ModalErrorWrapper components ([ea956da](https://github.com/swagger-api/apidom/commit/ea956da758213cd5a9078f731b6b564feb56b51c))
- **editor:** ModalInputWrapper and ImportUrl components ([87937e9](https://github.com/swagger-api/apidom/commit/87937e9741c109b40899ec1e0eb64de576d8f9f1))
- **editor:** monaco theme selector widget ([2120b6e](https://github.com/swagger-api/apidom/commit/2120b6e85037a8ffa75c6368e1a8909d36607b73))
- **editor:** monaco workers imported via node_modules ([820b8a2](https://github.com/swagger-api/apidom/commit/820b8a221e0a2aec2714aa71d5966a3a2be28c15))
- **editor:** MonacoEditor load apidom.worker as web worker ([ecd83a2](https://github.com/swagger-api/apidom/commit/ecd83a266a37d04af53116cae5c5bae18453599e))
- **editor:** MonacoEditor load editor.worker.js from web worker ([3b22262](https://github.com/swagger-api/apidom/commit/3b22262bcb512640a01a41a056e086687dae251f))
- **editor:** move monaco setup to external export ([ef4d966](https://github.com/swagger-api/apidom/commit/ef4d96699ed73679d4f2f05f91864b3de0bdc56b))
- **editor:** move some FileMenu items to EditMenu Hooks ([9508041](https://github.com/swagger-api/apidom/commit/9508041f13c0265967edd49e73d5d07ae30d5637))
- **editor:** POC migrated with `swagger-ui-react` and `presets` ([3eec23f](https://github.com/swagger-api/apidom/commit/3eec23fa231c0b92b6570f21042f2a6f12c24c68))
- **editor:** POC migrated with `swagger-ui-react` and `presets` ([59a9ed2](https://github.com/swagger-api/apidom/commit/59a9ed260584413237f9f9ed2add0f75e65420ee))
- **editor:** propagate isOAS3_1 flag to clearEditor ([3843a89](https://github.com/swagger-api/apidom/commit/3843a89c1ffe34e5fff92d7232ed6b9acad3826a))
- **editor:** propagate isOAS3_1 flag to SaveAsJsonOrYaml ([eadf969](https://github.com/swagger-api/apidom/commit/eadf9694a5e0495ccec1f7dd9d0332e555cd3e96))
- **editor:** react hooks edit menu ([894244a](https://github.com/swagger-api/apidom/commit/894244aab031fae8a25eba8f39c01e3727e67e11))
- **editor:** react hooks File menu ([626abb2](https://github.com/swagger-api/apidom/commit/626abb25eab8bb4b2f6e37da74e1ad63bb2d63fd))
- **editor:** react hooks for Topbar component ([b187c3c](https://github.com/swagger-api/apidom/commit/b187c3cff9e3e88bd67ed46595ea175769425a68))
- **editor:** react-modal for importUrl ([8397209](https://github.com/swagger-api/apidom/commit/8397209fd2c417121d7995eac898a76c2dff5a8f))
- **editor:** react-modal for importUrl ([a7f50c3](https://github.com/swagger-api/apidom/commit/a7f50c330a7737045f9f9a98ba7de766828ec6da))
- **editor:** ReactModalPortal styles ([5e3f6f8](https://github.com/swagger-api/apidom/commit/5e3f6f8a247194babc8357dac887465494faa622))
- **editor:** remove unneeded `initializeParsers` ([64b1936](https://github.com/swagger-api/apidom/commit/64b1936e710213827a44531d6293cf07d7613bc6))
- **editor:** replace component `Link` with local `LinkHome` ([e5badc0](https://github.com/swagger-api/apidom/commit/e5badc036ec5cde91fb31ebe66323be6c8845e1e))
- **editor:** replace component `Link` with local `LinkHome` ([a81a929](https://github.com/swagger-api/apidom/commit/a81a92922176c2f258d41082d8501dc643d06cc0))
- **editor:** retrieve spec from swagger-ui ([74455e1](https://github.com/swagger-api/apidom/commit/74455e1ca8558f55f4dfda23e8b75b585ba167ff))
- **editor:** retrieve spec from swagger-ui ([1c614d5](https://github.com/swagger-api/apidom/commit/1c614d52a1226111624d5afecea41f12361915a8))
- **editor:** sample openapi syntax highlighter ([865a864](https://github.com/swagger-api/apidom/commit/865a86431ae72daf42274af1f978b1be5a1b0192))
- **editor:** SaveAsJsonOrYaml function component ([a6b53b3](https://github.com/swagger-api/apidom/commit/a6b53b3606a5033244c2cecb3fa82c1abe5a6870))
- **editor:** saveAsJsonOrYaml.actions ([a465b02](https://github.com/swagger-api/apidom/commit/a465b0283c8ddb5863ccf5eb2af4dcd8b82d9f47))
- **editor:** saveAsYaml confirmation modal ([7045ba3](https://github.com/swagger-api/apidom/commit/7045ba3464fda72c8562536844c81bfa3d58373e))
- **editor:** saveAsYaml confirmation modal ([b62db66](https://github.com/swagger-api/apidom/commit/b62db663445b5c2bc4588ad6e1c99bdb5b947404))
- **editor:** semanticTokensAdapter provider ([856a41b](https://github.com/swagger-api/apidom/commit/856a41bcd2e3d1c61b995fc1471225a89e332184))
- **editor:** set language to apidom; remove onChangeLanguageValue ([71ccc28](https://github.com/swagger-api/apidom/commit/71ccc2867a943139da5e25a739411359218f79fa))
- **editor:** showErrorModal with close ([a9627b3](https://github.com/swagger-api/apidom/commit/a9627b38510eb20ddfd6a8efe8e7e9b11fa4e449))
- **editor:** showErrorModal with close ([cae578c](https://github.com/swagger-api/apidom/commit/cae578c76194d81453109b54aa7bd9b828a18200))
- **editor:** spec detection for known http generators ([47db420](https://github.com/swagger-api/apidom/commit/47db4205b23643be71687027b7a22eb778ba9e04))
- **editor:** temp hello.worker ([627f83a](https://github.com/swagger-api/apidom/commit/627f83ac3dd4a11de6238a4e1b24590c542b5d0d))
- **editor:** textarea demo component ([b713b5a](https://github.com/swagger-api/apidom/commit/b713b5af29c2eb71b68c5901c14c5c194b0df1e1))
- **editor:** textarea demo component ([ce71efb](https://github.com/swagger-api/apidom/commit/ce71efbd16f86a75c8ec5cd947e0c37d2a50ec29))
- **editor:** ThemeSelectionIcon component ([95022be](https://github.com/swagger-api/apidom/commit/95022beb74b5aa0070688e5c971b9baf2ff4583e))
- **editor:** update ImportUrl modal style ([04975da](https://github.com/swagger-api/apidom/commit/04975da6e8a61e0471b015e9fe9b4ccadd3941ab))
- **editor:** update modal styles ([c3f822d](https://github.com/swagger-api/apidom/commit/c3f822da32bb48852bbf4bf1c3dada71fdbf5cf4))
- **editor:** use methods from apidom-ls for registered providers ([a412998](https://github.com/swagger-api/apidom/commit/a4129984be32cddcd464ae79103f2be5c3ec7c76))
- **editor:** use same generator baseUrl for oas3 and oas3_1 ([158e753](https://github.com/swagger-api/apidom/commit/158e7534186bf1efa45e4b7d4428470dbd7ac248))
- **editor:** use synchronous getLegend() for semanticTokensAdapter ([54da77e](https://github.com/swagger-api/apidom/commit/54da77e2d41306239cfc361ce849a96b52cf1a02))
- **editor:** utils for isValidJson and isValidYaml ([55d6a67](https://github.com/swagger-api/apidom/commit/55d6a6765c7856f8f51add1a68c7f5cefcbfe116))
- **editor:** utils-getSpecVersion ([36bba3e](https://github.com/swagger-api/apidom/commit/36bba3e1f10eb9427b89aeb8df629adadd611f12))
- **editor:** webpack outputs workers without chunk in filename ([f07a693](https://github.com/swagger-api/apidom/commit/f07a6935120dbe91f236fc6e3220d0d21cdb615d))
- **editor:** wip - light and dark themes ([0487ca5](https://github.com/swagger-api/apidom/commit/0487ca57ff5b472a7596d93bf92fe64e539f5193))
- **editor:** wip disabled hooks for FileMenuDropdown ([4b809ad](https://github.com/swagger-api/apidom/commit/4b809ad47d373eef301df6cc822b3f293c4d3ce8))
- **editor:** wip: setup with ApidomWorker and WorkerManager ([59fd2ce](https://github.com/swagger-api/apidom/commit/59fd2ceff6a6a255782a790e6b06a08bdc01c515))
- **editor:** wip: switch to apidom placeholders ([c3454b4](https://github.com/swagger-api/apidom/commit/c3454b4016d7af6b624ae6c12dec98c9c522b4fa))
- **editor:** worker-loader with commented hello.worker ([ecca99a](https://github.com/swagger-api/apidom/commit/ecca99a77616ad34215d7fe8f6578d6fc1e23422))
- **editor:** working setup with workerManager ([843e1c0](https://github.com/swagger-api/apidom/commit/843e1c0029b74f70f84550153c1f8b60f2f08650))
- embed metadata into resulting tree ([04d672d](https://github.com/swagger-api/apidom/commit/04d672d798992faa3b8ae037305ac8f1f31320fe))
- **extensions:** add extensions support for info/(license|contact) ([0dc34ab](https://github.com/swagger-api/apidom/commit/0dc34ab565203d254d15c0d91193222503c1f78b)), closes [#16](https://github.com/swagger-api/apidom/issues/16)
- **extensions:** add support for OpenApi extensions for Info ([1f56875](https://github.com/swagger-api/apidom/commit/1f568759515f4af61cb3ce7a75df96ef04456297)), closes [#16](https://github.com/swagger-api/apidom/issues/16)
- **generic-editor:** integrate react support ([71ad70d](https://github.com/swagger-api/apidom/commit/71ad70d131dde34b17462fc4412b60e35f6f0012))
- **generic-editor:** integrate with ApiDOM ([5a82cf2](https://github.com/swagger-api/apidom/commit/5a82cf2122085b7d1a01099b37f2d1ed13a97d5d))
- **generic-editor:** scaffold generic editor SwaggerUI plugin ([697f683](https://github.com/swagger-api/apidom/commit/697f683c32ded0ebf65652ef0d10cba0012f40d0))
- implement generic depth first traversal ([6078ed0](https://github.com/swagger-api/apidom/commit/6078ed0baa25b85f8ba1f4057f87071313027099))
- implement plugginable architecture ([499e3bd](https://github.com/swagger-api/apidom/commit/499e3bd032807e82c5da4024b20bf869adf4145a)), closes [#20](https://github.com/swagger-api/apidom/issues/20)
- implement recursive search algorithm ([#80](https://github.com/swagger-api/apidom/issues/80)) ([db3e146](https://github.com/swagger-api/apidom/commit/db3e1460872cdcca979ea73168bc15076deb580d)), closes [#77](https://github.com/swagger-api/apidom/issues/77)
- implement YAML CST to AST transformer ([8a84320](https://github.com/swagger-api/apidom/commit/8a84320ee068bec04889ac248c664435636dcaea)), closes [#1](https://github.com/swagger-api/apidom/issues/1)
- introduce namespace refractor ([c75dc8a](https://github.com/swagger-api/apidom/commit/c75dc8a09583658acc1b144b33fcb11c109e72d6))
- introduce our own AST layer ([c3c137e](https://github.com/swagger-api/apidom/commit/c3c137e0a8aaa2f9803022392579b8358cdfd7bf)), closes [#35](https://github.com/swagger-api/apidom/issues/35)
- **metadata:** add conventions to append metadata to ApiDOM tree ([#78](https://github.com/swagger-api/apidom/issues/78)) ([91fd38f](https://github.com/swagger-api/apidom/commit/91fd38f53a6b0103da6066443de78f6bc28ddf19)), closes [#76](https://github.com/swagger-api/apidom/issues/76)
- **ns-asyncapi-2-0:** add accessors to Schema Element ([906b317](https://github.com/swagger-api/apidom/commit/906b317c572df1851a6ae7e88e11d2f573a0d9dc)), closes [#424](https://github.com/swagger-api/apidom/issues/424)
- **ns-asyncapi-2-0:** add components/parameters support ([f9a7545](https://github.com/swagger-api/apidom/commit/f9a7545f5d026e0b4a3b77868e37502c75f12913)), closes [#304](https://github.com/swagger-api/apidom/issues/304)
- **ns-asyncapi-2-0:** add elements for all Binding Objects ([7c97c89](https://github.com/swagger-api/apidom/commit/7c97c89609a6353cb58df27802766f0410f1dba4)), closes [#387](https://github.com/swagger-api/apidom/issues/387)
- **ns-asyncapi-2-0:** add full support for AsyncApi2_0 Object ([d971cb9](https://github.com/swagger-api/apidom/commit/d971cb99f22065fb3f06e3c4c17152e43985b853)), closes [#387](https://github.com/swagger-api/apidom/issues/387)
- **ns-asyncapi-2-0:** add full support for ChannelBindings Object ([fa48929](https://github.com/swagger-api/apidom/commit/fa48929c818e8f6be491b2038b9dc1d228f0f0b1)), closes [#387](https://github.com/swagger-api/apidom/issues/387)
- **ns-asyncapi-2-0:** add full support for Components Object ([6c7cd91](https://github.com/swagger-api/apidom/commit/6c7cd91bb05e0711000ad72bf628548959b1eb18)), closes [#387](https://github.com/swagger-api/apidom/issues/387)
- **ns-asyncapi-2-0:** add full support for Operation Object ([d1f1d72](https://github.com/swagger-api/apidom/commit/d1f1d7283b3b35e95709938241e065f76deda6b0)), closes [#387](https://github.com/swagger-api/apidom/issues/387)
- **ns-asyncapi-2-0:** add full support for Schema Object ([44c3da6](https://github.com/swagger-api/apidom/commit/44c3da6e8ac63f93ae8ac75eebb79607239dde82)), closes [#424](https://github.com/swagger-api/apidom/issues/424)
- **ns-asyncapi-2-0:** add full support for ServerBindings Object ([fc1a4d6](https://github.com/swagger-api/apidom/commit/fc1a4d60c1b264ad3eeb6f45352d3022f65fdbd3)), closes [#387](https://github.com/swagger-api/apidom/issues/387)
- **ns-asyncapi-2-0:** add metadata to Server.url field ([a1ef9ff](https://github.com/swagger-api/apidom/commit/a1ef9ff2e96a96ff1d16d1ac153d45ef6f48840b))
- **ns-asyncapi-2-0:** add mqtt5 binding elements ([a445b37](https://github.com/swagger-api/apidom/commit/a445b37c3360043e712d322a5669964c8706e563)), closes [#387](https://github.com/swagger-api/apidom/issues/387)
- **ns-asyncapi-2-0:** add support for all remaining binding objects ([67b239c](https://github.com/swagger-api/apidom/commit/67b239c3ecc23ae406ed009d02b0a70fc2c22c39)), closes [#387](https://github.com/swagger-api/apidom/issues/387)
- **ns-asyncapi-2-0:** add support for AMQP 0.9.1 Server Binding Obj ([51ef9eb](https://github.com/swagger-api/apidom/commit/51ef9eb5792e42b261aef20964c827b9df7e5613)), closes [#387](https://github.com/swagger-api/apidom/issues/387)
- **ns-asyncapi-2-0:** add support for AMQP 1.0 bindings ([91f8dbd](https://github.com/swagger-api/apidom/commit/91f8dbda19ad60006696beaefab847261db74ffd)), closes [#387](https://github.com/swagger-api/apidom/issues/387)
- **ns-asyncapi-2-0:** add support for AMQP Channel Binding Object ([8d38adc](https://github.com/swagger-api/apidom/commit/8d38adc45157625c0a12e08005edef1c9529f374)), closes [#387](https://github.com/swagger-api/apidom/issues/387)
- **ns-asyncapi-2-0:** add support for AMQP Message Binding Object ([698c1e6](https://github.com/swagger-api/apidom/commit/698c1e6ddf212fe04236edd4a8604503aef181c8)), closes [#387](https://github.com/swagger-api/apidom/issues/387)
- **ns-asyncapi-2-0:** add support for AMQP Operation Binding Object ([6104684](https://github.com/swagger-api/apidom/commit/6104684cbb595736c3bfde54ebeccbcd65205db7)), closes [#387](https://github.com/swagger-api/apidom/issues/387)
- **ns-asyncapi-2-0:** add support for CorrelationID Object ([c3c5e3c](https://github.com/swagger-api/apidom/commit/c3c5e3cd20da309f79a027905a8e28d0fb530e5f)), closes [#387](https://github.com/swagger-api/apidom/issues/387)
- **ns-asyncapi-2-0:** add support for DefaultContentType Object ([96856f9](https://github.com/swagger-api/apidom/commit/96856f9cd14be5cfb0dd4df97b8562130e156858)), closes [#387](https://github.com/swagger-api/apidom/issues/387)
- **ns-asyncapi-2-0:** add support for ExternalDocs Object ([5a01768](https://github.com/swagger-api/apidom/commit/5a01768bd69197d8dfed0f0d283723530f0ae45d)), closes [#387](https://github.com/swagger-api/apidom/issues/387)
- **ns-asyncapi-2-0:** add support for HTTP Channel Bidning Obj ([f67dabd](https://github.com/swagger-api/apidom/commit/f67dabda6af60fa9264a865553911a1981a13fdd)), closes [#387](https://github.com/swagger-api/apidom/issues/387)
- **ns-asyncapi-2-0:** add support for HTTP Message Binding Object ([b5a10e2](https://github.com/swagger-api/apidom/commit/b5a10e25984cddacc61bc6c05da6f928f6cc7a53)), closes [#387](https://github.com/swagger-api/apidom/issues/387)
- **ns-asyncapi-2-0:** add support for HTTP Operation Binding Object ([1813f04](https://github.com/swagger-api/apidom/commit/1813f045ab92fe41f05519b78d1337a484506a73)), closes [#387](https://github.com/swagger-api/apidom/issues/387)
- **ns-asyncapi-2-0:** add support for HTTP Server Binding Obj ([57b9213](https://github.com/swagger-api/apidom/commit/57b92131ebe7b4788a17dff2bd477dab43eed773)), closes [#387](https://github.com/swagger-api/apidom/issues/387)
- **ns-asyncapi-2-0:** add support for Kafka Channel Obj ([4006f15](https://github.com/swagger-api/apidom/commit/4006f15b2f138f438e7232fc98a11c0a3f82c544)), closes [#387](https://github.com/swagger-api/apidom/issues/387)
- **ns-asyncapi-2-0:** add support for Kafka Message Binding Object ([51d79ae](https://github.com/swagger-api/apidom/commit/51d79ae00d3ddcb7eace662d2ab57450e984c17a)), closes [#387](https://github.com/swagger-api/apidom/issues/387)
- **ns-asyncapi-2-0:** add support for Kafka Op. Binding Object ([4b82b14](https://github.com/swagger-api/apidom/commit/4b82b1431debe30ceccb5090b3cae06716973d18)), closes [#387](https://github.com/swagger-api/apidom/issues/387)
- **ns-asyncapi-2-0:** add support for Kafka Server Binding ([a62e76c](https://github.com/swagger-api/apidom/commit/a62e76c14d95faf5428300dd73a52818f8a74b2f)), closes [#387](https://github.com/swagger-api/apidom/issues/387)
- **ns-asyncapi-2-0:** add support for Message Object ([3b33f1b](https://github.com/swagger-api/apidom/commit/3b33f1ba0cf1cfcfe5e368d571d401a20f32edf3)), closes [#387](https://github.com/swagger-api/apidom/issues/387)
- **ns-asyncapi-2-0:** add support for Message Trait Object ([500181e](https://github.com/swagger-api/apidom/commit/500181eb2b80aab5e4dde18baf0d6559e5cfd20f)), closes [#387](https://github.com/swagger-api/apidom/issues/387)
- **ns-asyncapi-2-0:** add support for MessageBindings Object ([c8a5c63](https://github.com/swagger-api/apidom/commit/c8a5c632fd341ef78e64bfc5c21c5df584bd124c)), closes [#387](https://github.com/swagger-api/apidom/issues/387)
- **ns-asyncapi-2-0:** add support for MQTT Channel Binding Obj ([fcf8300](https://github.com/swagger-api/apidom/commit/fcf83005b8482fe561217b6f354ea21e676275ac)), closes [#387](https://github.com/swagger-api/apidom/issues/387)
- **ns-asyncapi-2-0:** add support for MQTT Message Binding Object ([62033ba](https://github.com/swagger-api/apidom/commit/62033ba72e04dc906078aca2c99965d507c3e087)), closes [#387](https://github.com/swagger-api/apidom/issues/387)
- **ns-asyncapi-2-0:** add support for MQTT Operation Binding Object ([f11bc26](https://github.com/swagger-api/apidom/commit/f11bc26281d51bb25b7cea0c8bcd49c7fbeb1f96)), closes [#387](https://github.com/swagger-api/apidom/issues/387)
- **ns-asyncapi-2-0:** add support for MQTT Server Binding Object ([1a41383](https://github.com/swagger-api/apidom/commit/1a41383b8cd89dc58560d1b28ffe9d24c0638fa3)), closes [#387](https://github.com/swagger-api/apidom/issues/387)
- **ns-asyncapi-2-0:** add support for OAuthFlow Object ([54949fa](https://github.com/swagger-api/apidom/commit/54949fab7451b4ac98e975753043ba59381745eb)), closes [#387](https://github.com/swagger-api/apidom/issues/387)
- **ns-asyncapi-2-0:** add support for OAuthFlows Object ([f759bb5](https://github.com/swagger-api/apidom/commit/f759bb5ac915cac12ce55b4c324193e45ea93167)), closes [#387](https://github.com/swagger-api/apidom/issues/387)
- **ns-asyncapi-2-0:** add support for OperationBindings Object ([e5500eb](https://github.com/swagger-api/apidom/commit/e5500ebea9e63bdc4619992560f182771d56626e)), closes [#387](https://github.com/swagger-api/apidom/issues/387)
- **ns-asyncapi-2-0:** add support for OperationTrait Object ([8e72347](https://github.com/swagger-api/apidom/commit/8e72347d798e7b45b9d507f4125cca8e8b1158fb)), closes [#387](https://github.com/swagger-api/apidom/issues/387)
- **ns-asyncapi-2-0:** add support for Security Scheme Object ([b706269](https://github.com/swagger-api/apidom/commit/b706269fc9e7fee6b57399d5f20661e165ae48d9)), closes [#387](https://github.com/swagger-api/apidom/issues/387)
- **ns-asyncapi-2-0:** add support for Tag Object ([d31f532](https://github.com/swagger-api/apidom/commit/d31f532d8a060b5ff3e5a74f6a17c490a1ac4e76)), closes [#387](https://github.com/swagger-api/apidom/issues/387)
- **ns-asyncapi-2-0:** add support for Tags Object ([e25d704](https://github.com/swagger-api/apidom/commit/e25d704ddb3a5d634a5ea1abfe47567a8e4cb937)), closes [#387](https://github.com/swagger-api/apidom/issues/387)
- **ns-asyncapi-2-0:** add support for WS Message Binding Obj ([43f0cb7](https://github.com/swagger-api/apidom/commit/43f0cb7c81ba34f51c9b09008d825850cf85cb8a)), closes [#387](https://github.com/swagger-api/apidom/issues/387)
- **ns-asyncapi-2-0:** add support for WS Operation Binding Obj ([c194516](https://github.com/swagger-api/apidom/commit/c1945161752e71cce42a43b169443fdd8abb4611)), closes [#387](https://github.com/swagger-api/apidom/issues/387)
- **ns-asyncapi-2-0:** add support for WS Operation Binding Object ([e7bc510](https://github.com/swagger-api/apidom/commit/e7bc5106b773b60905af74dee639c7f797cb10c4)), closes [#387](https://github.com/swagger-api/apidom/issues/387)
- **ns-asyncapi-2-0:** add support for WS Server Binding Obj ([148aaa5](https://github.com/swagger-api/apidom/commit/148aaa5ff8c59c57d1418135e41c7a85884927a5)), closes [#387](https://github.com/swagger-api/apidom/issues/387)
- **ns-asyncapi-2-0:** complete key mapping for namespace visiting ([364ad68](https://github.com/swagger-api/apidom/commit/364ad6887f223138534ab703a6a6100c1a941662))
- **ns-asyncapi-2-0:** introduce plugginable refracting ([#278](https://github.com/swagger-api/apidom/issues/278)) ([32cd470](https://github.com/swagger-api/apidom/commit/32cd47076e978c721980119934098051bad9032d))
- **ns-asyncapi-2:** add reference metadata ([808073f](https://github.com/swagger-api/apidom/commit/808073f0e8a971a77957708c8a98bece6aa24813))
- **ns-openapi-3-1:** add Contents of String-Encoded Data vocabulary ([88cd7e1](https://github.com/swagger-api/apidom/commit/88cd7e1a33e441aec57d72ddd54fa71ef8634d89)), closes [#337](https://github.com/swagger-api/apidom/issues/337)
- **ns-openapi-3-1:** add additional metadata to outside context objs ([1bc0d14](https://github.com/swagger-api/apidom/commit/1bc0d1415a97a35e8fa10b7ae07261213b15af41)), closes [#450](https://github.com/swagger-api/apidom/issues/450)
- **ns-openapi-3-1:** add all possible keywords for Schema element ([c1237b1](https://github.com/swagger-api/apidom/commit/c1237b1ec321a232a731826e29a4e29c66762f25)), closes [#337](https://github.com/swagger-api/apidom/issues/337)
- **ns-openapi-3-1:** add Applicator vocabulary to Schema Object ([78173c4](https://github.com/swagger-api/apidom/commit/78173c4c1eba60a6cf0e2088505ecf9132601178)), closes [#337](https://github.com/swagger-api/apidom/issues/337)
- **ns-openapi-3-1:** add Basic Meta-Data vocabulary to Schema Object ([249c4f8](https://github.com/swagger-api/apidom/commit/249c4f87146f5cb6f736e726d75348925d88cb9b)), closes [#337](https://github.com/swagger-api/apidom/issues/337)
- **ns-openapi-3-1:** add Core vocabulary to Schema Object ([fac8af3](https://github.com/swagger-api/apidom/commit/fac8af35db90e3eade3812b51aa8c84aef536afe)), closes [#337](https://github.com/swagger-api/apidom/issues/337)
- **ns-openapi-3-1:** add Discriminator Object ([#342](https://github.com/swagger-api/apidom/issues/342)) ([987f755](https://github.com/swagger-api/apidom/commit/987f75514afbc6dc7613afe9aa726fcbe85c2b74)), closes [#337](https://github.com/swagger-api/apidom/issues/337)
- **ns-openapi-3-1:** add Encoding Object ([56b3b79](https://github.com/swagger-api/apidom/commit/56b3b795a51aff8895595bd88cd67275526a2e6b)), closes [#386](https://github.com/swagger-api/apidom/issues/386)
- **ns-openapi-3-1:** add Example Object ([382fccf](https://github.com/swagger-api/apidom/commit/382fccf72dd582cb47d8c37949395700530676cd)), closes [#386](https://github.com/swagger-api/apidom/issues/386)
- **ns-openapi-3-1:** add meta about HeaderElement name ([f54712d](https://github.com/swagger-api/apidom/commit/f54712dde8d39a0b74a6b420d48dbcf3e2b8707a)), closes [#444](https://github.com/swagger-api/apidom/issues/444)
- **ns-openapi-3-1:** add meta about http status code to Response ([8d80c7e](https://github.com/swagger-api/apidom/commit/8d80c7ea9a1de6b4ec45a246d89af0555629eafd)), closes [#444](https://github.com/swagger-api/apidom/issues/444)
- **ns-openapi-3-1:** add metadata to Server.url field ([fe4e371](https://github.com/swagger-api/apidom/commit/fe4e371dbb530d668b19c1516c1c9c1538ea1867))
- **ns-openapi-3-1:** add OAS vocabulary to Schema Object ([1506602](https://github.com/swagger-api/apidom/commit/1506602fde40b146b5c91b8d301627d9496f836b)), closes [#337](https://github.com/swagger-api/apidom/issues/337)
- **ns-openapi-3-1:** add reference metadata ([5ab586e](https://github.com/swagger-api/apidom/commit/5ab586ef366b0bbd57674520baa6fa1dd8f3d3ea))
- **ns-openapi-3-1:** add Semantic Content vocabulary to Schema ([ed8535a](https://github.com/swagger-api/apidom/commit/ed8535a14e68d9aca71f1d5ce267cddc121a3c3e)), closes [#337](https://github.com/swagger-api/apidom/issues/337)
- **ns-openapi-3-1:** add support for Boolean JSON Schemas ([3fc340f](https://github.com/swagger-api/apidom/commit/3fc340f142b482245f2fea30d856091e104f7fc0))
- **ns-openapi-3-1:** add support for Header Object ([8cfef80](https://github.com/swagger-api/apidom/commit/8cfef8051992b0e6c1804630415beeb8509a43ac))
- **ns-openapi-3-1:** add support for JSON Schema Dialect ([15e3449](https://github.com/swagger-api/apidom/commit/15e3449e37d557a89eb1a12d44f7c3d8ee250365)), closes [#339](https://github.com/swagger-api/apidom/issues/339)
- **ns-openapi-3-1:** add support for Link Object ([1007315](https://github.com/swagger-api/apidom/commit/100731572c56b4835d8e0b1c1fdbb2712cec92f3))
- **ns-openapi-3-1:** add support for OAuth Flow Object ([b53fa53](https://github.com/swagger-api/apidom/commit/b53fa53c702c8374870bf013430d2c27b26db551))
- **ns-openapi-3-1:** add support for OAuth Flows Object ([8cd324c](https://github.com/swagger-api/apidom/commit/8cd324c42b583b5958b952182d3c47b8b0369139))
- **ns-openapi-3-1:** add support for Security Scheme Object ([5bb977e](https://github.com/swagger-api/apidom/commit/5bb977e0f21ff11f3e959f7e4ae462e4e1b840f8))
- **ns-openapi-3-1:** add support for Tag Object ([e9c1f11](https://github.com/swagger-api/apidom/commit/e9c1f11fa2d83266501b1f8b471c13b902861266))
- **ns-openapi-3-1:** add support for XML Object ([bbddb3e](https://github.com/swagger-api/apidom/commit/bbddb3e65f8c7213e44914704fdf1cf600e40fab)), closes [#337](https://github.com/swagger-api/apidom/issues/337)
- **ns-openapi-3-1:** add tests using dehydrated ApiDOM snapshots ([b60353a](https://github.com/swagger-api/apidom/commit/b60353abdddc0e64245986d20d2e794697e9de5f)), closes [#438](https://github.com/swagger-api/apidom/issues/438) [#360](https://github.com/swagger-api/apidom/issues/360)
- **ns-openapi-3-1:** add Unevaluated vocabulary to Schema Object ([4ba72e5](https://github.com/swagger-api/apidom/commit/4ba72e58ae91d4380f6475df7808f18a7017a772)), closes [#337](https://github.com/swagger-api/apidom/issues/337)
- **ns-openapi-3-1:** add Validation vocabulary to Schema Object ([55a98ce](https://github.com/swagger-api/apidom/commit/55a98ce1c954abfcbb22cf566e9b5e74ff879e85)), closes [#337](https://github.com/swagger-api/apidom/issues/337)
- **ns-openapi-3-1:** complete key mapping for namespace visiting ([#274](https://github.com/swagger-api/apidom/issues/274)) ([0a2ef19](https://github.com/swagger-api/apidom/commit/0a2ef19d347a93ba669991f09bea13d55d7aa605))
- **ns-openapi-3-1:** finish Calback Object ([b11a5c8](https://github.com/swagger-api/apidom/commit/b11a5c8aaa2a6bfde6aab98f8ecfee774d8f8b51)), closes [#386](https://github.com/swagger-api/apidom/issues/386)
- **ns-openapi-3-1:** finish Components Object ([e840834](https://github.com/swagger-api/apidom/commit/e840834f4e66d09f94dd811627622a99a503435e)), closes [#386](https://github.com/swagger-api/apidom/issues/386)
- **ns-openapi-3-1:** finish Media TYpe Object ([57de422](https://github.com/swagger-api/apidom/commit/57de42265579762aafe5dd2b6090eb324511b3ed)), closes [#386](https://github.com/swagger-api/apidom/issues/386)
- **ns-openapi-3-1:** finish OpenAPI Object ([adeacff](https://github.com/swagger-api/apidom/commit/adeacff4a9e95f464dd0c23f418a55ff5c0f2b8f)), closes [#386](https://github.com/swagger-api/apidom/issues/386)
- **ns-openapi-3-1:** finish Request Body Object ([12a21fd](https://github.com/swagger-api/apidom/commit/12a21fdb3cf840b1f3380255880ef4cf0d764c98)), closes [#386](https://github.com/swagger-api/apidom/issues/386)
- **ns-openapi-3-1:** implement refractor plugin for inheritance ([9171db9](https://github.com/swagger-api/apidom/commit/9171db92f4001c0cb1c3ee24a544fc4964d17728)), closes [#362](https://github.com/swagger-api/apidom/issues/362)
- **ns-openapi-3-1:** implement refractor plugin for $id inheritance ([e7bd45a](https://github.com/swagger-api/apidom/commit/e7bd45a53cb5f75bfbdd21cea7875e6835e88abe)), closes [#363](https://github.com/swagger-api/apidom/issues/363)
- **ns-openapi-3-1:** introduce plugginable refracting ([dc311e9](https://github.com/swagger-api/apidom/commit/dc311e9838d9bbc025591309dd86bb6b08c33434))
- **OAS ns:** add support for response->content->mediaType-schema ([7277139](https://github.com/swagger-api/apidom/commit/7277139983ed25f2064a62797019d172a241aee4))
- **openapi-3-1:** finish refractor implementation ([987ddc1](https://github.com/swagger-api/apidom/commit/987ddc1250414771d95aabebab90c7366a3004e5))
- **openapi-3.1-adapter:** add support for browser build fragments ([30782a0](https://github.com/swagger-api/apidom/commit/30782a03e947bfc995fbe94bfe8c997432171abd)), closes [#35](https://github.com/swagger-api/apidom/issues/35)
- **openapi-ns:** add predicates ([46a2161](https://github.com/swagger-api/apidom/commit/46a2161dbac60ee48d57dac70f9348035548f3a9)), closes [#60](https://github.com/swagger-api/apidom/issues/60)
- **OpenApi3.1-Json:** add support for Parameter and Reference Object ([a4c5525](https://github.com/swagger-api/apidom/commit/a4c55255b98c40429ccd245c7e1ea363fe01e5ab))
- **OpenApi3.1-Yaml:** add support for additional objects ([5479c92](https://github.com/swagger-api/apidom/commit/5479c92d0d411637d34622d1c47d3b29629a3b71)), closes [#1](https://github.com/swagger-api/apidom/issues/1)
- **OpenApi3.1-Yaml:** add support for Components and Schema ([ef44ceb](https://github.com/swagger-api/apidom/commit/ef44cebdcaa61fbf8b58f384a945d777fd62d72f)), closes [#1](https://github.com/swagger-api/apidom/issues/1)
- **OpenApi3.1-Yaml:** add support for empty pair empty value ([eef46e8](https://github.com/swagger-api/apidom/commit/eef46e8c21fd1cd891a64293381bd0cce2b7abbc)), closes [#1](https://github.com/swagger-api/apidom/issues/1)
- **OpenApi3.1-Yaml:** add support for generic visitors ([7dce6f5](https://github.com/swagger-api/apidom/commit/7dce6f5b392f6f4b8b528ee378ae8df7fbda0026)), closes [#1](https://github.com/swagger-api/apidom/issues/1)
- **OpenApi3.1-Yaml:** add support for Info, License and Contact ([b4161b6](https://github.com/swagger-api/apidom/commit/b4161b68910351460f9358df3051bfb6360b377d)), closes [#1](https://github.com/swagger-api/apidom/issues/1)
- **OpenApi3.1-Yaml:** add support for OpenApi.security field ([7065807](https://github.com/swagger-api/apidom/commit/7065807dcac0e93a202b99cc06f51f69a7c9992b)), closes [#1](https://github.com/swagger-api/apidom/issues/1)
- **OpenApi3.1-Yaml:** add support for Parameter and Reference Object ([ee754f6](https://github.com/swagger-api/apidom/commit/ee754f614d47cb41488a3468633698a3c71f0321))
- **OpenApi3.1-Yaml:** add support for Responses and Response ([3a6667a](https://github.com/swagger-api/apidom/commit/3a6667a97fc85e02d7e9b93652a0aac015785e42)), closes [#1](https://github.com/swagger-api/apidom/issues/1)
- **OpenApi3.1-Yaml:** add support for Server and ServerVariable ([51de6e4](https://github.com/swagger-api/apidom/commit/51de6e453f72441738f3cba23abdf9e8670aceaf)), closes [#1](https://github.com/swagger-api/apidom/issues/1)
- **OpenApi3.1-Yaml:** add support for stream comments ([b34e0ae](https://github.com/swagger-api/apidom/commit/b34e0ae6a3811b979ca3358e7c55adab6ea7183b)), closes [#1](https://github.com/swagger-api/apidom/issues/1)
- **OpenApi3.1-Yaml:** add support for streams ([#114](https://github.com/swagger-api/apidom/issues/114)) ([29260c5](https://github.com/swagger-api/apidom/commit/29260c513411d7fd66305b81d5c3a92a0b802fdc)), closes [#1](https://github.com/swagger-api/apidom/issues/1)
- **OpenApi3.1:** add additional metadata to Operation ([4f3684b](https://github.com/swagger-api/apidom/commit/4f3684b75155abd7ae2cd53ef0f791029bb1d45f)), closes [#66](https://github.com/swagger-api/apidom/issues/66)
- **OpenApi3.1:** add fixed and mixed fields generic visitors ([666ba12](https://github.com/swagger-api/apidom/commit/666ba126088921c29360abcb34424930ac1d675b)), closes [#91](https://github.com/swagger-api/apidom/issues/91)
- **OpenApi3.1:** add support for additional fields to Operation ([4b2452a](https://github.com/swagger-api/apidom/commit/4b2452a88919a904bc6f20ddbc43a650de44d107)), closes [#66](https://github.com/swagger-api/apidom/issues/66)
- **OpenApi3.1:** add support for additional fields to Operation ([#88](https://github.com/swagger-api/apidom/issues/88)) ([e69b47a](https://github.com/swagger-api/apidom/commit/e69b47a36700ccd5da9591c7632622451f80bb2a)), closes [#66](https://github.com/swagger-api/apidom/issues/66)
- **OpenApi3.1:** add support for MemberElement sourcemaps ([cd569e0](https://github.com/swagger-api/apidom/commit/cd569e00267a1f3ef104b3579017c2245de56ad7)), closes [#71](https://github.com/swagger-api/apidom/issues/71)
- **OpenApi3.1:** add support for Paths and PathItem objects ([#68](https://github.com/swagger-api/apidom/issues/68)) ([de2cf3e](https://github.com/swagger-api/apidom/commit/de2cf3e2ed07d9ac61144d61e4bcf4f388f3f3fc)), closes [#66](https://github.com/swagger-api/apidom/issues/66)
- **OpenApi3.1:** add support for unknown object fields ([cc0400e](https://github.com/swagger-api/apidom/commit/cc0400e04c85c9690a3feb1da79dc105780aee18)), closes [#101](https://github.com/swagger-api/apidom/issues/101)
- **OpenApi3.1:** add support for unknown values ([90dce03](https://github.com/swagger-api/apidom/commit/90dce036eed2de1421cce5067e6f42d6a0a97c42)), closes [#101](https://github.com/swagger-api/apidom/issues/101)
- **OpenApi3.1:** all support for all Operation fields ([21dcbcc](https://github.com/swagger-api/apidom/commit/21dcbccb1b39d9d9f792c79c35e614f21454c85c)), closes [#66](https://github.com/swagger-api/apidom/issues/66)
- **parser:** add AsyncAPI 2.0 adapter ([#57](https://github.com/swagger-api/apidom/issues/57)) ([2535860](https://github.com/swagger-api/apidom/commit/2535860dbb9a6d1e8342fca0f7647dea611ef0d9))
- **parser:** add AsyncAPI 2.0.0 adapter implementation ([#58](https://github.com/swagger-api/apidom/issues/58)) ([c7cb963](https://github.com/swagger-api/apidom/commit/c7cb96379748cf07fab2201568405e16c164b133))
- **parser:** introduce API for finding namespace ([7650220](https://github.com/swagger-api/apidom/commit/765022082a316cf4b16b25245e757136f0a18f57)), closes [#234](https://github.com/swagger-api/apidom/issues/234)
- **PathItemObject:** implement all properties ([9f9407c](https://github.com/swagger-api/apidom/commit/9f9407cbcd68b7e1dc63fab49ed187484f8b70c0)), closes [#66](https://github.com/swagger-api/apidom/issues/66)
- **playground:** add multiple enhancements ([82b54d0](https://github.com/swagger-api/apidom/commit/82b54d056a24fdf66e9bd8923e054649905a04ca))
- **playground:** add non working resolve integration ([ad13897](https://github.com/swagger-api/apidom/commit/ad138972d789063049ca95805692f14f745ac59c))
- **playground:** add s-expression and value interpretations ([99a1f36](https://github.com/swagger-api/apidom/commit/99a1f360a166b438291344523bf7209af1461322)), closes [#476](https://github.com/swagger-api/apidom/issues/476)
- **playground:** add support for AsyncAPI 2.1 ([3565989](https://github.com/swagger-api/apidom/commit/35659890fd6ace4a7bfc4333928843b6f11faa7c)), closes [#461](https://github.com/swagger-api/apidom/issues/461)
- **playground:** add support for injectable interpreter ([d79270c](https://github.com/swagger-api/apidom/commit/d79270c769fd57a0de8f107396558fe39ee0b8e2))
- **playground:** enhance dereferencing with interpreter options ([2c94c27](https://github.com/swagger-api/apidom/commit/2c94c277866d0f6263e12c4759d3e7084329f516)), closes [#476](https://github.com/swagger-api/apidom/issues/476)
- **playground:** integrate dereference ([9eb1167](https://github.com/swagger-api/apidom/commit/9eb11676451d91361c297c3eec49b7465204d1f8))
- **playground:** integrate resolver ([9c50482](https://github.com/swagger-api/apidom/commit/9c50482465bbc0234266115fefeaab1e341afbe7))
- **playground:** visual playgrand for ApiDOM features ([44d2b0c](https://github.com/swagger-api/apidom/commit/44d2b0c0af65a5718df8437e993a16cf4a9295fa))
- **predicates:** add predicates for higher order minim types ([7bb8c26](https://github.com/swagger-api/apidom/commit/7bb8c26279909ac8e14308d31d3ac0eb153d06f2)), closes [#60](https://github.com/swagger-api/apidom/issues/60)
- prepare codebase for schema support ([16054c8](https://github.com/swagger-api/apidom/commit/16054c8db3396eb62b330b32349f5ce2db6e1ec4)), closes [#9](https://github.com/swagger-api/apidom/issues/9)
- **referece:** add support for couting referece depth ([dfdb887](https://github.com/swagger-api/apidom/commit/dfdb887f3ac44c9e4e7ca6c3c96cf9d3f3f367d4))
- **referece:** add support for setting max depth of resolution ([0e71846](https://github.com/swagger-api/apidom/commit/0e7184618a14ff24bd276cd14638155160697b4b))
- **reference:** add additional metadata during dereference ([659323c](https://github.com/swagger-api/apidom/commit/659323c9a4bfc2e58eceeb74d5178c22b5308328)), closes [#384](https://github.com/swagger-api/apidom/issues/384)
- **reference:** add AsyncApi 2.0.0 dereference ([2f34e19](https://github.com/swagger-api/apidom/commit/2f34e19dfbb972fa8ce7f2d8b010a5fb7c097bf7)), closes [#304](https://github.com/swagger-api/apidom/issues/304)
- **reference:** add AsyncApi 2.0.0 external resolution ([#334](https://github.com/swagger-api/apidom/issues/334)) ([b3a3914](https://github.com/swagger-api/apidom/commit/b3a391481360004d3d4a56c1467cece557442ec8)), closes [#305](https://github.com/swagger-api/apidom/issues/305)
- **reference:** add AsyncApi 2.0.x JSON reference parser ([e3aa9af](https://github.com/swagger-api/apidom/commit/e3aa9af6876979e0fe1eab1d8eac5b5e98a4f271))
- **reference:** add AsyncApi 2.0.x YAML reference parser ([5eea3ba](https://github.com/swagger-api/apidom/commit/5eea3ba69d039ab753f09c4a547d74c509a7f6dd))
- **reference:** add binary parser plugin ([7c52686](https://github.com/swagger-api/apidom/commit/7c526869c1498618a0784b6010ca2a1e68833d33)), closes [#467](https://github.com/swagger-api/apidom/issues/467)
- **reference:** add file resolver implementation ([12a8663](https://github.com/swagger-api/apidom/commit/12a866325ec05d1c4662be0a4be7ad2f69fcf431))
- **reference:** add HTTP resolver implementation ([d00cd7f](https://github.com/swagger-api/apidom/commit/d00cd7f06de155d629fa89d55032f27bf8c143fe))
- **reference:** add infra code for running plugins ([1bb65e9](https://github.com/swagger-api/apidom/commit/1bb65e931f5d844a59d3631e5bca930d06bc0e0b))
- **reference:** add json reference parser ([a09311a](https://github.com/swagger-api/apidom/commit/a09311afbfa98dbef0b548c415840cac6d09bb08))
- **reference:** add naive support for keyword ([15880a8](https://github.com/swagger-api/apidom/commit/15880a8426b566ea6615c58a9f1265b2fb16264b)), closes [#371](https://github.com/swagger-api/apidom/issues/371)
- **reference:** add OAS 3.1 Example.externalValue dereference ([751188f](https://github.com/swagger-api/apidom/commit/751188fc92ee883535fa58a57a9683414b3765a0)), closes [#467](https://github.com/swagger-api/apidom/issues/467)
- **reference:** add OAS 3.1 Example.externalValue ext. resolution ([fd93841](https://github.com/swagger-api/apidom/commit/fd93841a1725b0f8ea7aee0971c3784bdf7e7c20)), closes [#467](https://github.com/swagger-api/apidom/issues/467)
- **reference:** add OpenApi 3.1.x JSON reference parser ([dda56c8](https://github.com/swagger-api/apidom/commit/dda56c8245a91181b10f22f432e7ea809c2ce672))
- **reference:** add OpenApi 3.1.x YAML reference parser ([f7301fc](https://github.com/swagger-api/apidom/commit/f7301fca32f837ee68c6da46707d664ef1c895d4))
- **reference:** add parsing machinery ([c050ae0](https://github.com/swagger-api/apidom/commit/c050ae0feab59caef78066c723beac0cd530b386))
- **reference:** add POC implementation of JSON Schema deference ([f585e1f](https://github.com/swagger-api/apidom/commit/f585e1f7f3bfedfaa2065c37a7ab9369ddd2dc07)), closes [#366](https://github.com/swagger-api/apidom/issues/366)
- **reference:** add predicate for Reference like elements ([23f3a87](https://github.com/swagger-api/apidom/commit/23f3a871314181049ad11a15bbc8c37cfaad55c6))
- **reference:** add primitive dereference api ([8c0b2d8](https://github.com/swagger-api/apidom/commit/8c0b2d894dbd93265b545309454b70e3a730ead4))
- **reference:** add public library API ([243e832](https://github.com/swagger-api/apidom/commit/243e83233eddc60389012e40dcaad980a455fa5a))
- **reference:** add single point of entry to resolve machinery ([ec46f7d](https://github.com/swagger-api/apidom/commit/ec46f7dd8b79e46c30ed3943400669b2b1725a9e))
- **reference:** add support for $anchor during dereference ([cf0f403](https://github.com/swagger-api/apidom/commit/cf0f403ce32dee1f4117cdb88c10dd3fecb9a8c8)), closes [#376](https://github.com/swagger-api/apidom/issues/376)
- **reference:** add support for OAS 3.1 Link deference ([18c4363](https://github.com/swagger-api/apidom/commit/18c43636fc806f7356d0de61ddb0e23fafea4e6c)), closes [#463](https://github.com/swagger-api/apidom/issues/463)
- **reference:** add support for OAS 3.1 Link ext. resolution ([b001ce8](https://github.com/swagger-api/apidom/commit/b001ce8e3e4ce04659686fd0c62f2ca83d3e509c)), closes [#465](https://github.com/swagger-api/apidom/issues/465)
- **reference:** add support for OAS 3.1 Path Item dereference ([02717c9](https://github.com/swagger-api/apidom/commit/02717c933e65e807a0358c7617b9a708835d9ceb)), closes [#458](https://github.com/swagger-api/apidom/issues/458)
- **reference:** add support for OAS 3.1 Path Item ext. resolution ([24189b8](https://github.com/swagger-api/apidom/commit/24189b86637f43828d29bd92829d08f1a50f67dc)), closes [#459](https://github.com/swagger-api/apidom/issues/459)
- **reference:** add support for resolving ApiDOM agains JSON Pointer ([3f179a0](https://github.com/swagger-api/apidom/commit/3f179a07c016216090e4fc86b9a6c35c59cebf69))
- **reference:** add support for Schema Object external resolution ([1376148](https://github.com/swagger-api/apidom/commit/1376148385236929d66df6b7a0b984bf46e4d485)), closes [#307](https://github.com/swagger-api/apidom/issues/307)
- **reference:** add support for switching external resolution on/off ([16d5696](https://github.com/swagger-api/apidom/commit/16d5696bdda8ccc7e21d3b496d897030dffd1259))
- **reference:** add support for tracking depth ([0fcecf0](https://github.com/swagger-api/apidom/commit/0fcecf0fca9410ab82c08e5809e0d47e0c43fe09)), closes [#320](https://github.com/swagger-api/apidom/issues/320)
- **reference:** add support for unkonwn URIs ([a03f7b7](https://github.com/swagger-api/apidom/commit/a03f7b7b1d857c4ca80ce3ac838f57cc3349d130)), closes [#473](https://github.com/swagger-api/apidom/issues/473)
- **reference:** add support utils for for resolve agorytm ([fb13bd0](https://github.com/swagger-api/apidom/commit/fb13bd0249317e7d0913e2f22a8c1b1b56c90d24))
- **reference:** add various helpers for external resolution ([0e8317d](https://github.com/swagger-api/apidom/commit/0e8317d591f5698c6a0b1f335cc655a0d3f40161))
- **reference:** add yaml reference parser ([19eac45](https://github.com/swagger-api/apidom/commit/19eac45d073eb9347466faf79790229d5bc44d4f))
- **Reference:** annotate Reference elements with classes ([29895a7](https://github.com/swagger-api/apidom/commit/29895a724e5d257f8c421d2a81fb73b64b68aa26))
- **reference:** expose JSON Pointer utils ([b7bd3f2](https://github.com/swagger-api/apidom/commit/b7bd3f23a5aef923d2b89758f12699103b441942))
- **reference:** finalize reference resolver algorithm ([61ab29b](https://github.com/swagger-api/apidom/commit/61ab29b17d9ffb0ae8fdc73e022c9b3711869abe))
- **reference:** ignore external references by configration ([b5e89f8](https://github.com/swagger-api/apidom/commit/b5e89f83dbf1df4a5975ef02c3e3f7e64c2f8eae)), closes [#324](https://github.com/swagger-api/apidom/issues/324)
- **reference:** implement POC of external dereference ([1f99a31](https://github.com/swagger-api/apidom/commit/1f99a3145b4f6da3fccf56f61d2cba983e387641))
- **reference:** implement semantic external resolution ([7d62f24](https://github.com/swagger-api/apidom/commit/7d62f243ce393a0709bb747dd7409fb6ae19fe74))
- **reference:** incorporate dereference into overall achitecture ([#285](https://github.com/swagger-api/apidom/issues/285)) ([f9c6c86](https://github.com/swagger-api/apidom/commit/f9c6c8667acc08c86c84c4d9584100d6884dad90))
- **reference:** introduce mutating transcluder ([481bffa](https://github.com/swagger-api/apidom/commit/481bffa81cc5e7543fd47f3608a2f2f779fe941d))
- **reference:** introduce POC of dereference algorithm ([2b3b69f](https://github.com/swagger-api/apidom/commit/2b3b69fc5f51bc1b3c05026ad7a31c9661d2fca1))
- **reference:** introduce ReferenceSet + abstract Reference ([d46296b](https://github.com/swagger-api/apidom/commit/d46296bf3ea18495f355783f0a26a6c516f17bd7))
- **reference:** introduce resolve strategies framework ([4aa9309](https://github.com/swagger-api/apidom/commit/4aa93092b1a76d989c91d8b9be728aff794f89c7))
- **reference:** prepare for introducing parsing [#1](https://github.com/swagger-api/apidom/issues/1) ([e18e0ad](https://github.com/swagger-api/apidom/commit/e18e0ade32333bdccbe193b58a8a90ee93f23e30))
- **reference:** provide pre-computed refSet for dereferencing ([d9b36a5](https://github.com/swagger-api/apidom/commit/d9b36a5f03f68f44355746c0aeacd70be764119f)), closes [#338](https://github.com/swagger-api/apidom/issues/338)
- **reference:** reduce Reference Objects into ReferenceMap ([bb01d74](https://github.com/swagger-api/apidom/commit/bb01d74ba66c532f29f003ef59b5dfdf03e697ba))
- **reference:** support OAS 3.1 Boolean JSON Schema dereference ([3c8820a](https://github.com/swagger-api/apidom/commit/3c8820a5e632652a7d21916cab4a601ed0271adf)), closes [#471](https://github.com/swagger-api/apidom/issues/471)
- **reference:** support relative URIs in Schema. keywords ([4c550c2](https://github.com/swagger-api/apidom/commit/4c550c2a0ad073457fe50caa5c6dd65870c6ab63)), closes [#371](https://github.com/swagger-api/apidom/issues/371)
- **reference:** use CWD as default baseURI ([85baeb0](https://github.com/swagger-api/apidom/commit/85baeb008ca3918fdd8da982fc94bbaaf66fcc83)), closes [#544](https://github.com/swagger-api/apidom/issues/544)
- setup generic editor repo ([78e6f17](https://github.com/swagger-api/apidom/commit/78e6f176a52bc98b977699b80257f4624afa95a0))
- standardize parse result API ([75fb7db](https://github.com/swagger-api/apidom/commit/75fb7dba665582c45a78fc6baf04d64885f6b989))
- **traversal:** add traverse function ([3d1c64d](https://github.com/swagger-api/apidom/commit/3d1c64dda1d52f761750a901bb0d1206171b4a47))
- type declarations for all packages ([4556b31](https://github.com/swagger-api/apidom/commit/4556b3170db4f2d27d288facb3263ba82cb17036))
- **yaml-ast:** add support for formatting string scalars ([c88b34f](https://github.com/swagger-api/apidom/commit/c88b34f7abc7dd29399949dcb2b83a9391c8a34f)), closes [#115](https://github.com/swagger-api/apidom/issues/115)
- **yaml:** add support for explicit Failsafe schema ([27bf0d4](https://github.com/swagger-api/apidom/commit/27bf0d492c0aaf84716d265f1315259119ce3ea7)), closes [#115](https://github.com/swagger-api/apidom/issues/115)
- **yaml:** add support for explicit JSON schema ([84025b1](https://github.com/swagger-api/apidom/commit/84025b186bb46ba0cb0194876e0e2f8aa5dc52cf)), closes [#115](https://github.com/swagger-api/apidom/issues/115)
- **yaml:** add support for YAML block folded scalars ([038d3af](https://github.com/swagger-api/apidom/commit/038d3afeed363518aee16d62ef33e0aa749c5374)), closes [#249](https://github.com/swagger-api/apidom/issues/249)
- **yaml:** add support for YAML block scalar literals ([e5e4c7a](https://github.com/swagger-api/apidom/commit/e5e4c7ab5361843e68255e9f9fbc292bb205cbf2)), closes [#249](https://github.com/swagger-api/apidom/issues/249)
- **yaml:** normalize scalars before formatting ([542f965](https://github.com/swagger-api/apidom/commit/542f965b3d774e33b491805da0cacf64cc840e5f)), closes [#250](https://github.com/swagger-api/apidom/issues/250)

### Performance Improvements

- **ns-asyncapi-2-0:** introduce visitor shortcut ([78a54dc](https://github.com/swagger-api/apidom/commit/78a54dc5e6f6c1116b30003510f7dedefbce015e)), closes [#398](https://github.com/swagger-api/apidom/issues/398)
- **ns-openapi-3-1:** fold refractor plugins into refracting phase ([7d23400](https://github.com/swagger-api/apidom/commit/7d23400361737f9663a27975fc75aaa80a513214)), closes [#400](https://github.com/swagger-api/apidom/issues/400)
- **ns-openapi-3-1:** introduce visitor shortcut ([91b96ad](https://github.com/swagger-api/apidom/commit/91b96ad4c0056d18b91f7f0bf150934ff88785e9)), closes [#396](https://github.com/swagger-api/apidom/issues/396)
- **parser-adapter-yaml-1-2:** analyze performance profile ([89c8959](https://github.com/swagger-api/apidom/commit/89c89598ed1611290baa1c9a5f9199abf8583ffc)), closes [#408](https://github.com/swagger-api/apidom/issues/408)
- **perser-adaper-json:** fold syntactic analysis phases ([c983b47](https://github.com/swagger-api/apidom/commit/c983b47294ca7e4b204608caa04f1b98d48b16d9)), closes [#406](https://github.com/swagger-api/apidom/issues/406)
- remove transcluder from all semantic parsers ([906bd04](https://github.com/swagger-api/apidom/commit/906bd048f889227b959a7dd61336d4be10fb15c4)), closes [#412](https://github.com/swagger-api/apidom/issues/412)

# 0.1.0 (2021-09-28)

### Bug Fixes

- **adapters:** expose nanemspace instances from adapters ([e885d9e](https://github.com/swagger-api/apidom/commit/e885d9e9dce9f5e01c1730cefa196cc21b9a5b8b))
- **apidom-ls:** refs [#297](https://github.com/swagger-api/apidom/issues/297) - bump yaml-js version ([38ac243](https://github.com/swagger-api/apidom/commit/38ac243c7780f769af78da7056a823c6454b844f))
- **apidom:** add 'typeRoots' to tsconfig ([80c3cf2](https://github.com/swagger-api/apidom/commit/80c3cf25ef764bdeb5e8e5b9af2f4c040327c361))
- **apidom:** fix refract structures hydration ([#227](https://github.com/swagger-api/apidom/issues/227)) ([3309a70](https://github.com/swagger-api/apidom/commit/3309a70637b1e237a582cfa66b32b124a6dde0d1)), closes [#226](https://github.com/swagger-api/apidom/issues/226)
- **AST:** compensate for inconsistent tree-sitter SyntaxNode API ([8d04daa](https://github.com/swagger-api/apidom/commit/8d04daaf0ea4ed99d430fdd87a72c5ba0afff67c)), closes [#69](https://github.com/swagger-api/apidom/issues/69)
- **asyncapi-2-1:** add IBM MQ visitor mapping ([04d1e43](https://github.com/swagger-api/apidom/commit/04d1e43a359c0a8e366db13752028dc95d8e9668))
- **asyncapi-2-1:** fix parsing of Operation.message field ([#561](https://github.com/swagger-api/apidom/issues/561)) ([ea7fc15](https://github.com/swagger-api/apidom/commit/ea7fc152593bdbb1ccd04affbaf899471f99a915)), closes [#543](https://github.com/swagger-api/apidom/issues/543)
- **asyncapi:** allow replace Schema for Reference in Message.payload ([ae11834](https://github.com/swagger-api/apidom/commit/ae11834838976e3c31304e0929ecfd676c27a98f)), closes [#427](https://github.com/swagger-api/apidom/issues/427)
- avoid webpack bug by changing type mapping ([#282](https://github.com/swagger-api/apidom/issues/282)) ([5433197](https://github.com/swagger-api/apidom/commit/543319781088b7105a23417562e75f7f02cfc7a0))
- **editor:** 2nd pane scrolling ([4e26c81](https://github.com/swagger-api/apidom/commit/4e26c81abdaf849db487216c242cdde0826dd7da))
- **editor:** actual oas3.1 spec in fixtures ([bcb3435](https://github.com/swagger-api/apidom/commit/bcb3435510bcedf0cbb8614c75f3b568fbd9b5a4))
- **editor:** add extra var check in topbar component ([508afb0](https://github.com/swagger-api/apidom/commit/508afb0916f27f186541d805cf9562f493b76bf8))
- **editor:** add extra var check in topbar component ([57b812a](https://github.com/swagger-api/apidom/commit/57b812a4287ec275469d2325b674272be7c48633))
- **editor:** add try/catch for download resolved actions ([22cbace](https://github.com/swagger-api/apidom/commit/22cbace6cd81a7adbc00d817d566e36b72de59c2))
- **editor:** add wait and extra checks for cypress monaco.spec ([9d08168](https://github.com/swagger-api/apidom/commit/9d08168cf5d7587677b44c63c97ac9d758484fa0))
- **editor:** additional `dispose()` on unmount ([0ba77d5](https://github.com/swagger-api/apidom/commit/0ba77d5329b9a4d2f46621a8f9b99b4e906c0b6c))
- **editor:** allow hover tooltip to exceed its container ([1cd4c89](https://github.com/swagger-api/apidom/commit/1cd4c894d4d37dcdd7dbb4de91813d67b0d3e3ba))
- **editor:** apidom.worker import editor from node_modules ([643718e](https://github.com/swagger-api/apidom/commit/643718ecf3e335eeeb52b4f9fc4e4132b1db1121))
- **editor:** apidomContext required for codeActions ([4225011](https://github.com/swagger-api/apidom/commit/42250114032b93dcf2682479092ae46af22e6469))
- **editor:** codeActions error handling with unsupported spec ([d6a6dda](https://github.com/swagger-api/apidom/commit/d6a6ddab446e32c18e7f32fb928a2fc11f1c1378))
- **editor:** convertToYaml should always return a response ([22e609d](https://github.com/swagger-api/apidom/commit/22e609d1029aff05d3158e6ea939a5a44c258de7))
- **editor:** convertToYaml should always return a response ([a0c8282](https://github.com/swagger-api/apidom/commit/a0c8282d38e532ab34af87c466eb18c1213a45eb))
- **editor:** documentSymbols error handling for unsupported spec ([98b5c5e](https://github.com/swagger-api/apidom/commit/98b5c5e585bbe46ebadff1e78e1e05766dea1c99))
- **editor:** documentSymbolsAdapter call correct worker method ([bb06083](https://github.com/swagger-api/apidom/commit/bb0608372f343185efbce3d1f5ceb1c6b3694e39))
- **editor:** FileMenuDropdown state update checks ([e669f2f](https://github.com/swagger-api/apidom/commit/e669f2fc4f0e5a7eb2670770cb9d22c2e8d03d23))
- **editor:** genericEditorPlugin layout no console errors ([21d5782](https://github.com/swagger-api/apidom/commit/21d57824d3bae95350b5e33edc38808b3ded141d))
- **editor:** genericEditorPlugin layout no console errors ([85c7e7d](https://github.com/swagger-api/apidom/commit/85c7e7d97d306f1dc80776d365035dc2025c9bc4))
- **editor:** hover error handling with unsupported spec ([7e4b490](https://github.com/swagger-api/apidom/commit/7e4b490898c9f1fe09d3687840a17ab8cbe19624))
- **editor:** importUrl label control for unit test ([3378b81](https://github.com/swagger-api/apidom/commit/3378b81da6510bbbcadd71e0f2f4ec5a54c4739b))
- **editor:** initializeParsers should return a promise ([bc08608](https://github.com/swagger-api/apidom/commit/bc08608cb5e24fb6f567f123a18e3ab336588fc3))
- **editor:** jsonService doValidation ([dedf41e](https://github.com/swagger-api/apidom/commit/dedf41e577eac49826184c8b6d7524026a8edd9c))
- **editor:** monaco theme updates ([380c39f](https://github.com/swagger-api/apidom/commit/380c39f2ecfb6fe882b306fab2884209f75a9904))
- **editor:** more monaco theme updates ([9cf2ee0](https://github.com/swagger-api/apidom/commit/9cf2ee0c4cfcc8c4736eb4392b080d6541834353))
- **editor:** more robust check for await topbarActions result ([8cc7720](https://github.com/swagger-api/apidom/commit/8cc77201704f0786a17ec40be3009476db21de4a))
- **editor:** more robust check for await topbarActions result ([867c0c0](https://github.com/swagger-api/apidom/commit/867c0c0d45b996407107d3709f33e743f12c5914))
- **editor:** re-enable minimap in monaco ([8265c31](https://github.com/swagger-api/apidom/commit/8265c31914655468528d31e6a05549f4fca76532))
- **editor:** reinstantiate generator lists on specVersion change ([7eedd88](https://github.com/swagger-api/apidom/commit/7eedd8826cebb36b579d73f428283c3b4d4a35a3))
- **editor:** reinstantiate generator lists on specVersion change ([42aca80](https://github.com/swagger-api/apidom/commit/42aca80fca5cac8cdc42965a792705f5c11df076))
- **editor:** remove extraneous constructor .bind ([57bc622](https://github.com/swagger-api/apidom/commit/57bc6224a5b6f8acb97a233d60c33b05f3409373))
- **editor:** revert webpack config back to single entry point ([cdf7463](https://github.com/swagger-api/apidom/commit/cdf74631b585a390e6dc2e22b351194ce7f69985))
- **editor:** saveAsYaml file extension ([83826aa](https://github.com/swagger-api/apidom/commit/83826aaa27c26552e497f777a9e55beb089646b1))
- **editor:** semanticHighlighting.enabled setting ([0e49fbb](https://github.com/swagger-api/apidom/commit/0e49fbb41e1d7842a3bac6905645a86bb0c2c9a2))
- **editor:** topbar color, font sizes, padding ([5c2e7a3](https://github.com/swagger-api/apidom/commit/5c2e7a359b4a2e439b47b02edba349d9ec806851))
- **editor:** topbar padding and fonts ([d319323](https://github.com/swagger-api/apidom/commit/d319323148cfc831a13615b1f13a8300273c0f1e))
- **editor:** unhandled promise rejection for unsupported definitions ([f03b5ae](https://github.com/swagger-api/apidom/commit/f03b5ae8fb4ef7831e160abc4dccf57ebaff5c53))
- **editor:** update changelog statuses ([e757a3e](https://github.com/swagger-api/apidom/commit/e757a3edbc02a3ff16805ed3045936c6bf44e3b9))
- **editor:** use p2m for diagnostics markers ([e386971](https://github.com/swagger-api/apidom/commit/e386971443b8a812585189ece0d9ceedaa8b0086))
- **editor:** wip disabled hooks for Topbar - linting ([a7271b1](https://github.com/swagger-api/apidom/commit/a7271b1f6929f0bb854eafef4e345e65ca3fdd03))
- **editor:** worker error handling with unsupported spec ([167dc3f](https://github.com/swagger-api/apidom/commit/167dc3f1bd74c216e6a794dea84dd479f3fc8e37))
- **elements:** use proper types for accessors ([6c43de4](https://github.com/swagger-api/apidom/commit/6c43de48c6976eab4e0e41bcf8c31d7eff67e3d3)), closes [#2](https://github.com/swagger-api/apidom/issues/2)
- **generic-editor:** fix [#553](https://github.com/swagger-api/apidom/issues/553) - baseURI for deref ([51f45b2](https://github.com/swagger-api/apidom/commit/51f45b24241873b817a51e02e08069b5a774a88b))
- **interpret:** fix icon position to stay always in the same place ([e814b87](https://github.com/swagger-api/apidom/commit/e814b87b86203b8a0f4270c4eb44881d4575e9b8))
- **lexical-analysis:** fix lexical analyzer init. in browser env ([fe91458](https://github.com/swagger-api/apidom/commit/fe91458d0d87390c98471640e9fd32ee182f7e15)), closes [#451](https://github.com/swagger-api/apidom/issues/451)
- missing comma in tsconfig.json ([28265fb](https://github.com/swagger-api/apidom/commit/28265fb91e3648d332616c18b4e174ea6c39042c))
- **namespaces:** fix duplicates in mixed fields visitor ([725ecce](https://github.com/swagger-api/apidom/commit/725ecce4d0a438fba36f62c33516cb8e1ad0e33c))
- **ns-asyncapi-2-0:** fix typo in specification object ([3460aea](https://github.com/swagger-api/apidom/commit/3460aeac9ff986c1fe23e82a883eee04a68c57ef)), closes [#387](https://github.com/swagger-api/apidom/issues/387)
- **ns-openapi-3-1:** fix bug in embedded-resources- plugin ([2809390](https://github.com/swagger-api/apidom/commit/2809390e7744e4635a85555203ba0b3218fab0e6)), closes [#362](https://github.com/swagger-api/apidom/issues/362)
- **ns-openapi-3-1:** fix bugs in Schema Object refracting ([e9e0cd0](https://github.com/swagger-api/apidom/commit/e9e0cd02addc24397c6802337cd3f0553fe75a50)), closes [#337](https://github.com/swagger-api/apidom/issues/337)
- **openapi3-1-yaml:** fix PathItem visitor ([523a0c1](https://github.com/swagger-api/apidom/commit/523a0c1f638cd1a75a94472bccaf6c90b7f9b64e))
- **openapi3-1:** fix problem in Paht Item object visiting ([0bea447](https://github.com/swagger-api/apidom/commit/0bea447a25aedf1197581051fd2b7f9f32d35d95))
- **OpenApi3.1:** add source maps to generic Object visitors ([2e1aca5](https://github.com/swagger-api/apidom/commit/2e1aca523a3dd54493cb53116637cc6391cfb927))
- **OpenApi3.1:** disallow extensions on Reference Object ([457e45d](https://github.com/swagger-api/apidom/commit/457e45d066a8e247a834480f16ef06f7a61783ee))
- **OpenApiVisitor:** add sourcMap ([bdc2da7](https://github.com/swagger-api/apidom/commit/bdc2da792854d1a05eead0fe8526f73d6823e6b2)), closes [#48](https://github.com/swagger-api/apidom/issues/48)
- **parser:** fix sync/async inconsistencies ([d1c29f3](https://github.com/swagger-api/apidom/commit/d1c29f3605be43b815194a0876e92cf5212b2ef4)), closes [#310](https://github.com/swagger-api/apidom/issues/310)
- **playground:** allow resolve and dereference in certain conditions ([3ac6951](https://github.com/swagger-api/apidom/commit/3ac69515c2d77cc4aab167281d7a5d1d96991348)), closes [#476](https://github.com/swagger-api/apidom/issues/476)
- **playground:** change initial state to empty one ([a4abaf9](https://github.com/swagger-api/apidom/commit/a4abaf9d8ddeb87d9284908d3d92b571e8cc7cba))
- **playground:** close import dialog before backdrop ([3c5b37c](https://github.com/swagger-api/apidom/commit/3c5b37c4210e85d97fb688ab0d09d6d213a4fd3f))
- **playground:** fix display of resolve console output ([fed0281](https://github.com/swagger-api/apidom/commit/fed02811e31957a963ed21c229ca6db53483508f))
- **playground:** fix paths to wasm files loaded by web worker ([5b35dfe](https://github.com/swagger-api/apidom/commit/5b35dfe2918632e7db6e89ec907a4f76a63af1e5))
- **playground:** fix transpilation of refractors ([b0746fa](https://github.com/swagger-api/apidom/commit/b0746fa9bc15ae4bebd9244a1cf5c73f929078f6))
- **playground:** reset file input after using it ([d5ecbfc](https://github.com/swagger-api/apidom/commit/d5ecbfc3e58f931141af8bd866fa96baf3e5b6f5))
- **reference:** allow dereferencing other elements than ParseResult ([0b099ee](https://github.com/swagger-api/apidom/commit/0b099ee821790d11769dea8c5a91d906f83996e5)), closes [#476](https://github.com/swagger-api/apidom/issues/476)
- **reference:** allow resolution on other elements than ParseResult ([4d4696b](https://github.com/swagger-api/apidom/commit/4d4696b20754478f27524d4b68f794ebe19cf65f)), closes [#476](https://github.com/swagger-api/apidom/issues/476)
- **reference:** fix bug in reference predicate logic ([8b5176a](https://github.com/swagger-api/apidom/commit/8b5176a211fbe99ca683f7fb253c765952e26eba))
- **reference:** fix incorrect JSON Schema dereference in OAS 3.1 ([2f1fefa](https://github.com/swagger-api/apidom/commit/2f1fefa948dbe49a80b208a3f6af054346723e8d)), closes [#607](https://github.com/swagger-api/apidom/issues/607)
- **reference:** fix resolution of Schema Object field ([#525](https://github.com/swagger-api/apidom/issues/525)) ([58350fe](https://github.com/swagger-api/apidom/commit/58350fe1f4354d7a9094ea859268320e461000b6)), closes [#524](https://github.com/swagger-api/apidom/issues/524)
- **reference:** handle inner media types properly during resolution ([d67ca7c](https://github.com/swagger-api/apidom/commit/d67ca7c1f6f319f6676eb3f1f9abea88e0dc7408))
- **reference:** unwrap result after dereferencing ([d4aee1e](https://github.com/swagger-api/apidom/commit/d4aee1ea1f08a1e7b22569d0de1fe5fe923c9013)), closes [#476](https://github.com/swagger-api/apidom/issues/476)
- **yaml-1-2:** add support for parsing more corner cases ([7b5aff9](https://github.com/swagger-api/apidom/commit/7b5aff9a6f015e4119b2f7f967b9ad3ae6a26a03)), closes [#290](https://github.com/swagger-api/apidom/issues/290)
- **yaml:** fix YAML parsing in browsing environemnt ([8168986](https://github.com/swagger-api/apidom/commit/81689867d6f3dded56b1aee694ec4595c53bd3c0)), closes [#232](https://github.com/swagger-api/apidom/issues/232)

### Features

- **adapters:** make adapters understand refractorOpts ([a314eb5](https://github.com/swagger-api/apidom/commit/a314eb584ec58284e11e22f54385c7af0f7b895b))
- add 1st POC of ApiDOM ([7d5a241](https://github.com/swagger-api/apidom/commit/7d5a241681e50faf481ce80e029c8ec3c72f6a56))
- add additional predicates ([93e49aa](https://github.com/swagger-api/apidom/commit/93e49aa95fce6ce971f0527af9b9be001fffa216))
- add apidom-reference package ([17bd14a](https://github.com/swagger-api/apidom/commit/17bd14a63d43419a1e345f0747a7d2be034c70e1))
- add ArrayElement.set method to minim types ([250fa70](https://github.com/swagger-api/apidom/commit/250fa70c807245f0224b30521f20c1b718e7f527))
- add base predicates ([b435155](https://github.com/swagger-api/apidom/commit/b43515561a05a787c801504c11f42e34fefe6a49)), closes [#60](https://github.com/swagger-api/apidom/issues/60)
- add CST to AST transformer for tree-sitter ([9d3f03c](https://github.com/swagger-api/apidom/commit/9d3f03ca870c203d93a9bf9a1a909000d4d12add)), closes [#35](https://github.com/swagger-api/apidom/issues/35)
- add extensions support to additional objects ([a658668](https://github.com/swagger-api/apidom/commit/a658668eb4eaa5aecf48a4c20ea5d49a342c37cb)), closes [#16](https://github.com/swagger-api/apidom/issues/16)
- add findAtOffset function ([59145fe](https://github.com/swagger-api/apidom/commit/59145fe5a7b2bc3ecc96140c89c93de5d37b4310))
- add OpenApi 3.1 support ([9d48576](https://github.com/swagger-api/apidom/commit/9d48576b01b43b2dff451614f6e483fce1e089ce)), closes [#2](https://github.com/swagger-api/apidom/issues/2)
- add reference related metadata to namespaces ([e66cdaa](https://github.com/swagger-api/apidom/commit/e66cdaa7e21e533549175f9f47966a3c6baf9308))
- add support for abstract references ([e246112](https://github.com/swagger-api/apidom/commit/e246112169260d679e0349bff0e6b76469e5408d)), closes [#9](https://github.com/swagger-api/apidom/issues/9)
- add support for AsyncAPI 2.1.0 specification ([c7840c4](https://github.com/swagger-api/apidom/commit/c7840c4d979cddc904d4170aff1635ad695a8fe4)), closes [#461](https://github.com/swagger-api/apidom/issues/461)
- add support for errors and missing literals ([3dc5c3a](https://github.com/swagger-api/apidom/commit/3dc5c3abf191f8900d6f7b7e5a229d458412f2c8)), closes [#35](https://github.com/swagger-api/apidom/issues/35)
- add support for generic JSON -> ApiDOM transformation ([47998c9](https://github.com/swagger-api/apidom/commit/47998c9c25f3a100d0386be2b82ab46982c726bd))
- add support for generic YAML -> ApiDOM transformation ([0a1de40](https://github.com/swagger-api/apidom/commit/0a1de4015aa3f7a023d729b73fcb6eb6a1d545a3))
- add support for JSON comments ([87c745e](https://github.com/swagger-api/apidom/commit/87c745e48e30520c1db449d1db8e57da6b95b384)), closes [#4](https://github.com/swagger-api/apidom/issues/4)
- add support for parse errors ([b4392b2](https://github.com/swagger-api/apidom/commit/b4392b2594d523b252eaa1b745b544477aef6022)), closes [#4](https://github.com/swagger-api/apidom/issues/4)
- add support for parsing empty files ([653d78a](https://github.com/swagger-api/apidom/commit/653d78a5d10d9460785c4e70c34931f382bd4853))
- add support for servers field ([718d15b](https://github.com/swagger-api/apidom/commit/718d15b8e77c4f70eda9f586bf42d437193b5790)), closes [#2](https://github.com/swagger-api/apidom/issues/2)
- add support for worker environment ([b375f57](https://github.com/swagger-api/apidom/commit/b375f5755d0233120544e2709e5d6614d2554712)), closes [#287](https://github.com/swagger-api/apidom/issues/287)
- add YAML WASM support ([#107](https://github.com/swagger-api/apidom/issues/107)) ([a4ddf1a](https://github.com/swagger-api/apidom/commit/a4ddf1a6b592a26b43b06db944014b053b6f880e)), closes [#1](https://github.com/swagger-api/apidom/issues/1)
- **apidom-ast:** introduce async version of visit function ([b627409](https://github.com/swagger-api/apidom/commit/b6274091798e382d674bf339495925eed37c4c9b))
- **apidom-ast:** introduce normalizing and merging visitors ([1aa2786](https://github.com/swagger-api/apidom/commit/1aa2786bc80d9cbf43291109a043e4d0acfa6cf4))
- **apidom-ls:** deref and definition service, various enhancements ([18876a2](https://github.com/swagger-api/apidom/commit/18876a26125c6f6940e57877cea75cf108e8fd4f))
- **apidom-ls:** initial deref service ([c490e45](https://github.com/swagger-api/apidom/commit/c490e453b82801c286ecec7a119114ef0f9e4b7c))
- **apidom-lsp:** first LSP server and VS Code Client extension ([20c1acf](https://github.com/swagger-api/apidom/commit/20c1acffc993e9f791975e7275ba32edc4441a8e))
- **apidom-lsp:** Standalone LSP Server, server ad e2e tests ([7898578](https://github.com/swagger-api/apidom/commit/789857833d447667e1152b64a50fd3a7b77c7b8f))
- **apidom-ls:** standard linter functions and clenup ([e1dda94](https://github.com/swagger-api/apidom/commit/e1dda94a299852aceb78e514bff4f4b0dcf88cb4))
- **apidom-ls:** updated language service library ([bcb2e81](https://github.com/swagger-api/apidom/commit/bcb2e81861cb9f1c4664503038ca696259823889))
- **apidom-monaco:** apidom monaco POC ([a8595b7](https://github.com/swagger-api/apidom/commit/a8595b788f49985be0b633c34be828916b4ed1ce))
- **apidom:** add mechanism to compute parent edges ([#391](https://github.com/swagger-api/apidom/issues/391)) ([4e526d4](https://github.com/swagger-api/apidom/commit/4e526d480526353efeab67889f6be8678ac5a1b7)), closes [#383](https://github.com/swagger-api/apidom/issues/383)
- **apidom:** add refractor for base types ([a4647a7](https://github.com/swagger-api/apidom/commit/a4647a78ff6f4b7fd2963089cb2b31273b0e13cd)), closes [#368](https://github.com/swagger-api/apidom/issues/368)
- **apidom:** add support for element identity via refractor plugins ([#565](https://github.com/swagger-api/apidom/issues/565)) ([94080db](https://github.com/swagger-api/apidom/commit/94080dba39359f89c40155dea6eb8ee86f3d7f5a)), closes [#528](https://github.com/swagger-api/apidom/issues/528)
- **apidom:** add support for transforming ApiDOM into S-expressions ([305e1c9](https://github.com/swagger-api/apidom/commit/305e1c9c2cd35e3b5e722953f1c25d7243a4d9f3)), closes [#429](https://github.com/swagger-api/apidom/issues/429)
- **apidom:** embed AST nodes into parsed structures ([f7e3f76](https://github.com/swagger-api/apidom/commit/f7e3f76259795cbf8d2fae55c4b4631ca32727de)), closes [#10](https://github.com/swagger-api/apidom/issues/10)
- apidomls initial language service ([735951e](https://github.com/swagger-api/apidom/commit/735951ec4e5359740326b5a1c0bc67d372b5cf5e))
- **AST:** add support for directives in YAML transformer ([ddd7d63](https://github.com/swagger-api/apidom/commit/ddd7d6330384e4435d29cf9b4c83d9b2fe53fffc)), closes [#1](https://github.com/swagger-api/apidom/issues/1)
- **AST:** add support for YAML AST errors ([a72f5a5](https://github.com/swagger-api/apidom/commit/a72f5a50cc3a4e89179339a43634171ab315800f)), closes [#1](https://github.com/swagger-api/apidom/issues/1)
- **AST:** add YAML CST -> AST transformation for all common types ([e2e1e1b](https://github.com/swagger-api/apidom/commit/e2e1e1b59b5ac79857da22912d36adf902d2ed7b)), closes [#1](https://github.com/swagger-api/apidom/issues/1)
- **ast:** enhance core traversal mechanism to support cycles ([285e768](https://github.com/swagger-api/apidom/commit/285e768627513b2998ac6d4faea1b8b8c33fb94d))
- **AST:** incorporate missing nodes into AST ([65a75b8](https://github.com/swagger-api/apidom/commit/65a75b863a5176a568edd5476e40ae9d3df9c2b0)), closes [#35](https://github.com/swagger-api/apidom/issues/35)
- **AST:** incorporate Presentation info model into YAML ([18b8960](https://github.com/swagger-api/apidom/commit/18b89605dd2466935088e47caaed06f7f231d2be)), closes [#1](https://github.com/swagger-api/apidom/issues/1)
- **AST:** introduce YAML AST models and predicates ([9ba4561](https://github.com/swagger-api/apidom/commit/9ba4561e6ff58957e24cae6351229805cde241b1)), closes [#1](https://github.com/swagger-api/apidom/issues/1)
- **ast:** make cycle detection configurable ([7569b43](https://github.com/swagger-api/apidom/commit/7569b43e8cd30a64f43ac7a3e8022d52b9df5894))
- **ast:** make errors and missing nodes part of AST ([6142fab](https://github.com/swagger-api/apidom/commit/6142fabc9520321c1cf2e8fc8107ce992eb02806)), closes [#35](https://github.com/swagger-api/apidom/issues/35)
- **asyncapi-2-0-0:** finish refractor implementation ([526fc4f](https://github.com/swagger-api/apidom/commit/526fc4f266fc2c8c402461cab63f2e8fd176cf5f))
- **asyncapi-2-0:** add support for Schema cycles ([d7d094d](https://github.com/swagger-api/apidom/commit/d7d094d515d84d47f8ae6a41f70d5d038c719797)), closes [#427](https://github.com/swagger-api/apidom/issues/427)
- **asyncapi-2-1:** add support for Channel Item dereferencing ([3300cb7](https://github.com/swagger-api/apidom/commit/3300cb7b790521ae9bd73222cd453ecb6b1fde8e)), closes [#558](https://github.com/swagger-api/apidom/issues/558)
- **asyncapi-2-1:** add support for Channel Item ext. resolution ([e0e8895](https://github.com/swagger-api/apidom/commit/e0e8895941d8d4d582e4e4254aa316e807cfc705)), closes [#559](https://github.com/swagger-api/apidom/issues/559)
- **asyncapi-ns:** add predicates ([9a25dd2](https://github.com/swagger-api/apidom/commit/9a25dd2ef05a294069cd22b3f2613f2a56b0f88b)), closes [#60](https://github.com/swagger-api/apidom/issues/60)
- **AsyncApi2.0.0-Yaml:** add AsyncApi 2.0.0 adapter ([3aa325a](https://github.com/swagger-api/apidom/commit/3aa325ac612da5c892ec332b393afd3c34cc6f2d)), closes [#1](https://github.com/swagger-api/apidom/issues/1)
- **AsyncApi2.0:** add support for ChannelItem object ([2a06d98](https://github.com/swagger-api/apidom/commit/2a06d981777d4c64216456099c4e0de5e5428731)), closes [#67](https://github.com/swagger-api/apidom/issues/67)
- **AsyncApi2.0:** add support for Channels object ([a86241a](https://github.com/swagger-api/apidom/commit/a86241a6ca6676cc6282ce2513717ba274aed7df)), closes [#67](https://github.com/swagger-api/apidom/issues/67)
- **AsyncApi2.0:** add support for MemberElement sourcemaps ([e419a57](https://github.com/swagger-api/apidom/commit/e419a57b028ef17ed9850109a6debbbcd4b288fe)), closes [#71](https://github.com/swagger-api/apidom/issues/71)
- **AsyncApi2.0:** add support for Parameters object ([d468a73](https://github.com/swagger-api/apidom/commit/d468a73dc186792c95da065c2e974a1f1d171281))
- **AsyncApi2.0:** add support for Server object ([4e507e9](https://github.com/swagger-api/apidom/commit/4e507e907416a6ff9061c7022a164f2bebf3cedb)), closes [#67](https://github.com/swagger-api/apidom/issues/67)
- **AsyncApi2.0:** add support for Server Variable Object ([7ea19fe](https://github.com/swagger-api/apidom/commit/7ea19fe91f5476ebebc8982874fa877c4935e560)), closes [#67](https://github.com/swagger-api/apidom/issues/67)
- **AsyncApi2.0:** add support for Servers object ([bf37684](https://github.com/swagger-api/apidom/commit/bf376842dbaa54a29c0f9a9700c2e44b71613232)), closes [#67](https://github.com/swagger-api/apidom/issues/67)
- **AsyncApi2.0:** add support for unknown values and fields ([2c994af](https://github.com/swagger-api/apidom/commit/2c994af5e825ada8381774937eaa3c86bf26b09a)), closes [#101](https://github.com/swagger-api/apidom/issues/101)
- **AsyncAPI:** add namespace for AsyncAPI specification ([9e6d37a](https://github.com/swagger-api/apidom/commit/9e6d37a53bb0b735b59bea268dcf51c794fc070c))
- **asyncapi:** add refractor generics ([be3c8d1](https://github.com/swagger-api/apidom/commit/be3c8d16ec7115e299d1084d6688229998b6c198))
- **asyncapi:** add traversal specific to asyncapi ([6ba0f44](https://github.com/swagger-api/apidom/commit/6ba0f44f478cf62065cdf8bf144e73cd35897acc))
- attempts of POC2 ([9af4924](https://github.com/swagger-api/apidom/commit/9af4924c22c05e5be45db956dbb707ec0767bfc1)), closes [#7](https://github.com/swagger-api/apidom/issues/7) [#6](https://github.com/swagger-api/apidom/issues/6) [#5](https://github.com/swagger-api/apidom/issues/5) [#3](https://github.com/swagger-api/apidom/issues/3)
- build proper JSON ast parser with visitor pattern support ([0f65112](https://github.com/swagger-api/apidom/commit/0f651123da588e169a07977520694b870319bdc6))
- demonstrate overlay mechanism in JavaScript ([d320e2f](https://github.com/swagger-api/apidom/commit/d320e2f183514f04a4cb3d078226fc92243c42c8))
- **dereference:** add initial work on external resolution ([816341c](https://github.com/swagger-api/apidom/commit/816341cf795d1e01f11ea5309c6621e0cf569a4b))
- **editor:** add a cancel button for importUrl modal ([405702d](https://github.com/swagger-api/apidom/commit/405702dde10b3c0c552525fd45b0a3770761c76c))
- **editor:** add a cancel button for importUrl modal ([cd8910c](https://github.com/swagger-api/apidom/commit/cd8910c4a96bc8697517f50e8a7bd2bcf246449d))
- **editor:** add apidom-ls babel alias ([76f863b](https://github.com/swagger-api/apidom/commit/76f863b4b1664fdba1a7b9cf8fa20307ee17c730))
- **editor:** add errorModal support to saveAsJson, saveAsYaml ([c8af156](https://github.com/swagger-api/apidom/commit/c8af156a4cfc185aad9f722d93ce16bc0c7d6395))
- **editor:** add errorModal support to saveAsJson, saveAsYaml ([049e9fb](https://github.com/swagger-api/apidom/commit/049e9fb8e9fe8643513c2bd83ccdb8ec4905508f))
- **editor:** add jest .spyOn for file/edit topbarActions ([9799d1b](https://github.com/swagger-api/apidom/commit/9799d1b3aa4fecedbe88b8fd75cdca2fb2eb1b13))
- **editor:** add jest .spyOn for file/edit topbarActions ([eeb7b12](https://github.com/swagger-api/apidom/commit/eeb7b129a29edb96f7b1695b3f7fe99b9e7721f7))
- **editor:** add public dispose method to workerManager ([81bea10](https://github.com/swagger-api/apidom/commit/81bea10f1db74ca0f2e5031d1a216ac6829d79bc))
- **editor:** additional converter return string cases ([a1f2100](https://github.com/swagger-api/apidom/commit/a1f210046ec0f70cfc966e1fa70d2def23e83f5b))
- **editor:** apply theming to minimap background ([928cc72](https://github.com/swagger-api/apidom/commit/928cc72e309fc0f89a7900a3ca30063a33a0ae51))
- **editor:** apply updated styles for error and warning modals ([5e2fc9b](https://github.com/swagger-api/apidom/commit/5e2fc9bb6b01b29b209e06f4d415cd68fd0f15f8))
- **editor:** clear editor when yaml or empty case ([e2e6925](https://github.com/swagger-api/apidom/commit/e2e69255201e794da80b8529bef691e4a70d5907))
- **editor:** clear editor with simple json case ([e677b3c](https://github.com/swagger-api/apidom/commit/e677b3cc2d76e052f0f9db18abcd8cc2d9ffd452))
- **editor:** clearEditor detects spec type for re-init ([baefef3](https://github.com/swagger-api/apidom/commit/baefef302607b4cff16bd61bb33271e946ad41fc))
- **editor:** clearEditor.actions ([ac9c79b](https://github.com/swagger-api/apidom/commit/ac9c79b71423ce47fc1ffaf70bc1e0cdd4db5f0b))
- **editor:** codeActions provider ([98a7cbd](https://github.com/swagger-api/apidom/commit/98a7cbd9ed79c9bcd6bbbc96a0a74311a532b0df))
- **editor:** completionItemsAdapter with apidom ([66e8778](https://github.com/swagger-api/apidom/commit/66e8778a7ce4141d2da47099031088d8392f9f19))
- **editor:** convertJsonToYaml.actions ([3daca5c](https://github.com/swagger-api/apidom/commit/3daca5c27533bfdd0f8baff4c9e4fb5ae132ce04))
- **editor:** convertOas2ToOas3.actions ([188ee24](https://github.com/swagger-api/apidom/commit/188ee24e9d6f5a6cfef1c5459b61e405f9769e52))
- **editor:** convertToOas3 now uses non-mock data ([c8aef1d](https://github.com/swagger-api/apidom/commit/c8aef1d7cea3165daba9ed2be2ef99a21723734b))
- **editor:** convertToOas3 now uses non-mock data ([c4c74c3](https://github.com/swagger-api/apidom/commit/c4c74c34cc971c503f7df65f4cb2177b934742e9))
- **editor:** custom monaco light/dark themes ([cb23902](https://github.com/swagger-api/apidom/commit/cb23902015b3cc5577460c7f4cd18250b9efbf91))
- **editor:** custom react hook for languageFormat ([3da03b5](https://github.com/swagger-api/apidom/commit/3da03b5f0bfaea982bd3d7fd5d45f4579c8d05c3))
- **editor:** default wordWrap and minimap settings ([b7b9729](https://github.com/swagger-api/apidom/commit/b7b9729bf6f34e9cde089bbbbbaf1c46e1e059d5))
- **editor:** demo of doValidate from jsonService ([46b9054](https://github.com/swagger-api/apidom/commit/46b9054034e9b78cfa4bd020c9c09ec58cc42ae8))
- **editor:** demo test apidom-ls is readable ([a364781](https://github.com/swagger-api/apidom/commit/a3647819eb11811d380813d11758c73ffc24b464))
- **editor:** dev buttons to toggle/detect language ([ad7c0d5](https://github.com/swagger-api/apidom/commit/ad7c0d5f1b1629ba502bcd2db09750fcc40d5f2f))
- **editor:** dev buttons to toggle/detect language ([eb2f9bd](https://github.com/swagger-api/apidom/commit/eb2f9bd17ee50f3875128ab121f1d577c47f2028))
- **editor:** documentSymbolsAdapter ([9f2cf3a](https://github.com/swagger-api/apidom/commit/9f2cf3a3bd648f336b27bdb34d2de5f163f76c6d))
- **editor:** downloadGeneratedFile now uses non-mock data ([655f7c2](https://github.com/swagger-api/apidom/commit/655f7c23547b0a757eb5d08d7a7d6d6227984ba5))
- **editor:** downloadGeneratedFile now uses non-mock data ([eb36194](https://github.com/swagger-api/apidom/commit/eb36194c5cc2ee5d5981848c9cf4ffdd1f7e96a6))
- **editor:** editor pane shrink/expand responsiveness ([0b699f9](https://github.com/swagger-api/apidom/commit/0b699f9ac3566368f61eb991dd5812afb8de1bd8))
- **editor:** editor value onChange renders in swagger-ui ([76db19b](https://github.com/swagger-api/apidom/commit/76db19b6c431062c90b93f3d1835cff02de7bf19))
- **editor:** editor value onChange renders in swagger-ui ([4791680](https://github.com/swagger-api/apidom/commit/4791680e002e246a4c03d52b3b716eacaa38bacb))
- **editor:** EditorComponent as parent to vendor editor container ([39f4344](https://github.com/swagger-api/apidom/commit/39f4344e275267c5d7514569a510b32389a169c0))
- **editor:** experimental: pass monaco instance ([c7aacff](https://github.com/swagger-api/apidom/commit/c7aacffb83b1db672811a07fc63ea401f55cc4a8))
- **editor:** extract setupMode from setup ([fcd6be4](https://github.com/swagger-api/apidom/commit/fcd6be4680a61e722dfc26d28a1d484579cfe5c5))
- **editor:** FileMenuDropdown language format detection ([6570033](https://github.com/swagger-api/apidom/commit/65700333d7673d7433ea41df7c2b124b9b1164e9))
- **editor:** fixtures.actions ([a2111a6](https://github.com/swagger-api/apidom/commit/a2111a6db92f6630ab46aef3128f15647c7ccedb))
- **editor:** for OAS generator lists, remove need for swagger-client ([d4dc655](https://github.com/swagger-api/apidom/commit/d4dc655a12d05c74d98992698f46057165551611))
- **editor:** generator download deprecate use of swagger-client ([4d15e5c](https://github.com/swagger-api/apidom/commit/4d15e5cb65b7ed8437183ad7f0235ddda705b77c))
- **editor:** generator.actions ([26aaf1b](https://github.com/swagger-api/apidom/commit/26aaf1beac39991bb3bd79d140fcb383d30e7901))
- **editor:** GeneratorMenuDropdown component ([92d5264](https://github.com/swagger-api/apidom/commit/92d5264f01f1135abcb7ec7ca438d02ca9ac32f7))
- **editor:** generators list now uses actual/default values ([dc4d10b](https://github.com/swagger-api/apidom/commit/dc4d10b869dc4a18f93a80cd551448b9f65ebdae))
- **editor:** generators list now uses actual/default values ([216c27b](https://github.com/swagger-api/apidom/commit/216c27b6c7a5bcfb69ecde11693dd7dc4aacf49c))
- **editor:** GenericEditorContainer ([b46a20d](https://github.com/swagger-api/apidom/commit/b46a20d172d48f773f5511e47fcaf2a1d4ec0193))
- **editor:** GenericEditorContainer ([cf0374d](https://github.com/swagger-api/apidom/commit/cf0374da22420c99b2720223d2ac06146c16b5fb))
- **editor:** getSpecVersion helper for isOAS3/isSwagger2 ([c86de43](https://github.com/swagger-api/apidom/commit/c86de43d6c4c12e404f80992cb09ba57ca9136bb))
- **editor:** getSpecVersion helper for isOAS3/isSwagger2 ([f0b6155](https://github.com/swagger-api/apidom/commit/f0b6155cb349783ac0019ef25c4489b0a85fbb2d))
- **editor:** hoverAdapter for json ([58f8921](https://github.com/swagger-api/apidom/commit/58f89218a30c81f8e780a6f95358c6ab3495afff))
- **editor:** ideLayoutPreset with editorAreaLayout ([#571](https://github.com/swagger-api/apidom/issues/571)) ([18df907](https://github.com/swagger-api/apidom/commit/18df90707c23732d0da10255aaf6f97e8c26f967))
- **editor:** Import URL styling updates ([4d9756b](https://github.com/swagger-api/apidom/commit/4d9756b7d752a4ad4d9fbfe4e43a2d398025831e))
- **editor:** importFile will update swagger state ([b287c06](https://github.com/swagger-api/apidom/commit/b287c0623bc5238f2a3fb944a0c8ea1559d30f08))
- **editor:** importFile will update swagger state ([6df626e](https://github.com/swagger-api/apidom/commit/6df626eaa2bf450e231f05845be9a3b03be4e00e))
- **editor:** importFromURL will update swagger state ([e7c90ac](https://github.com/swagger-api/apidom/commit/e7c90ac396cdb213be31de0fae997fad62e23480))
- **editor:** importFromURL will update swagger state ([d59ad54](https://github.com/swagger-api/apidom/commit/d59ad5429c709f446549b75fe5a707f06d5159f9))
- **editor:** importFromURL.actions ([11b1e8b](https://github.com/swagger-api/apidom/commit/11b1e8b05124c9072815d23d026004d3fa3f712a))
- **editor:** improve and fix apidom-ls integration ([c675c1d](https://github.com/swagger-api/apidom/commit/c675c1db329164ec2be39165c2c86e68a4abdce0))
- **editor:** initial apidom.worker ([fa3123d](https://github.com/swagger-api/apidom/commit/fa3123d55a70bea3167d3b06c6a08dd6ba46dea6))
- **editor:** initial diagnosticsAdapter ([2197a16](https://github.com/swagger-api/apidom/commit/2197a16952a0897608d87d5c2a3e08b3fb11270f))
- **editor:** initial migrated react components ([b2192bc](https://github.com/swagger-api/apidom/commit/b2192bced1436366383ee81eb859d80761859af9))
- **editor:** initial migrated react components ([c5f128c](https://github.com/swagger-api/apidom/commit/c5f128c48a785ec2f285654ba8409e89c57474ab))
- **editor:** initial providers for documentSymbols and Hover ([c5230a4](https://github.com/swagger-api/apidom/commit/c5230a472880f792069bb6a45d70798233b15692))
- **editor:** initializeParsers sample with apidom parser ([5223d24](https://github.com/swagger-api/apidom/commit/5223d241e553a1f5b0616d41da862fe621607c12))
- **editor:** jest test for FileMenuDropdown ([5b3b464](https://github.com/swagger-api/apidom/commit/5b3b4646a6e1ffc90a9da0c1abac0206665d6966))
- **editor:** jest test for FileMenuDropdown ([410eacf](https://github.com/swagger-api/apidom/commit/410eacf71c7e113d5b9b7f10a5404c15c66e9973))
- **editor:** jest tests for EditMenuDropdown ([f97e171](https://github.com/swagger-api/apidom/commit/f97e171bee8031ae6776dc14ad144a24923aac95))
- **editor:** jest tests for EditMenuDropdown ([ef72932](https://github.com/swagger-api/apidom/commit/ef72932c4a71ee331bfc3e45ec84ceefc2dfbd34))
- **editor:** jest tests for topbar generated server/client ([72d37a5](https://github.com/swagger-api/apidom/commit/72d37a59336abb38f4ea58400e1ff4ce01859f39))
- **editor:** jest tests for topbar generated server/client ([3528bfe](https://github.com/swagger-api/apidom/commit/3528bfe51a7643139a405087e2e10d97c194a836))
- **editor:** keydown support to load default definitions ([eddc283](https://github.com/swagger-api/apidom/commit/eddc283df008d8c59cc98b847d34696790f5bdea))
- **editor:** language utils-helper ([44effc8](https://github.com/swagger-api/apidom/commit/44effc84a6572ec9a85145a3e2252e612230e7e3))
- **editor:** languageKind ([b003706](https://github.com/swagger-api/apidom/commit/b003706bb66a1a23d7d35c54d755b7d9f5644036))
- **editor:** load default definitions for oas2/oas3/asyncapi2 ([e340324](https://github.com/swagger-api/apidom/commit/e3403244e21b65445f1e8bd8b0689dbe2927b7a5))
- **editor:** load default oas3.1 definition ([58e889c](https://github.com/swagger-api/apidom/commit/58e889cbdfa9adde619512edc408782f92de0767))
- **editor:** migrate StandaloneLayout to functional component ([fdfaf61](https://github.com/swagger-api/apidom/commit/fdfaf6137bb4d3e5f2f8a31d2f0e9b909a131411))
- **editor:** migrated swagger styling from less to sass ([2b913b9](https://github.com/swagger-api/apidom/commit/2b913b960b3eae4cb3f1cbed7ae4838d861e0eb7))
- **editor:** migrated swagger styling from less to sass ([e41ef99](https://github.com/swagger-api/apidom/commit/e41ef99aa17da73afaaaca5c5ce3bbda3cfe6c27))
- **editor:** modal close x button ([ac0d2ac](https://github.com/swagger-api/apidom/commit/ac0d2accca28bdd1e14c0311efcde7a760e35b63))
- **editor:** ModalConfirmWrapper and ModalErrorWrapper components ([ea956da](https://github.com/swagger-api/apidom/commit/ea956da758213cd5a9078f731b6b564feb56b51c))
- **editor:** ModalInputWrapper and ImportUrl components ([87937e9](https://github.com/swagger-api/apidom/commit/87937e9741c109b40899ec1e0eb64de576d8f9f1))
- **editor:** monaco theme selector widget ([2120b6e](https://github.com/swagger-api/apidom/commit/2120b6e85037a8ffa75c6368e1a8909d36607b73))
- **editor:** monaco workers imported via node_modules ([820b8a2](https://github.com/swagger-api/apidom/commit/820b8a221e0a2aec2714aa71d5966a3a2be28c15))
- **editor:** MonacoEditor load apidom.worker as web worker ([ecd83a2](https://github.com/swagger-api/apidom/commit/ecd83a266a37d04af53116cae5c5bae18453599e))
- **editor:** MonacoEditor load editor.worker.js from web worker ([3b22262](https://github.com/swagger-api/apidom/commit/3b22262bcb512640a01a41a056e086687dae251f))
- **editor:** move monaco setup to external export ([ef4d966](https://github.com/swagger-api/apidom/commit/ef4d96699ed73679d4f2f05f91864b3de0bdc56b))
- **editor:** move some FileMenu items to EditMenu Hooks ([9508041](https://github.com/swagger-api/apidom/commit/9508041f13c0265967edd49e73d5d07ae30d5637))
- **editor:** POC migrated with `swagger-ui-react` and `presets` ([3eec23f](https://github.com/swagger-api/apidom/commit/3eec23fa231c0b92b6570f21042f2a6f12c24c68))
- **editor:** POC migrated with `swagger-ui-react` and `presets` ([59a9ed2](https://github.com/swagger-api/apidom/commit/59a9ed260584413237f9f9ed2add0f75e65420ee))
- **editor:** propagate isOAS3_1 flag to clearEditor ([3843a89](https://github.com/swagger-api/apidom/commit/3843a89c1ffe34e5fff92d7232ed6b9acad3826a))
- **editor:** propagate isOAS3_1 flag to SaveAsJsonOrYaml ([eadf969](https://github.com/swagger-api/apidom/commit/eadf9694a5e0495ccec1f7dd9d0332e555cd3e96))
- **editor:** react hooks edit menu ([894244a](https://github.com/swagger-api/apidom/commit/894244aab031fae8a25eba8f39c01e3727e67e11))
- **editor:** react hooks File menu ([626abb2](https://github.com/swagger-api/apidom/commit/626abb25eab8bb4b2f6e37da74e1ad63bb2d63fd))
- **editor:** react hooks for Topbar component ([b187c3c](https://github.com/swagger-api/apidom/commit/b187c3cff9e3e88bd67ed46595ea175769425a68))
- **editor:** react-modal for importUrl ([8397209](https://github.com/swagger-api/apidom/commit/8397209fd2c417121d7995eac898a76c2dff5a8f))
- **editor:** react-modal for importUrl ([a7f50c3](https://github.com/swagger-api/apidom/commit/a7f50c330a7737045f9f9a98ba7de766828ec6da))
- **editor:** ReactModalPortal styles ([5e3f6f8](https://github.com/swagger-api/apidom/commit/5e3f6f8a247194babc8357dac887465494faa622))
- **editor:** remove unneeded `initializeParsers` ([64b1936](https://github.com/swagger-api/apidom/commit/64b1936e710213827a44531d6293cf07d7613bc6))
- **editor:** replace component `Link` with local `LinkHome` ([e5badc0](https://github.com/swagger-api/apidom/commit/e5badc036ec5cde91fb31ebe66323be6c8845e1e))
- **editor:** replace component `Link` with local `LinkHome` ([a81a929](https://github.com/swagger-api/apidom/commit/a81a92922176c2f258d41082d8501dc643d06cc0))
- **editor:** retrieve spec from swagger-ui ([74455e1](https://github.com/swagger-api/apidom/commit/74455e1ca8558f55f4dfda23e8b75b585ba167ff))
- **editor:** retrieve spec from swagger-ui ([1c614d5](https://github.com/swagger-api/apidom/commit/1c614d52a1226111624d5afecea41f12361915a8))
- **editor:** sample openapi syntax highlighter ([865a864](https://github.com/swagger-api/apidom/commit/865a86431ae72daf42274af1f978b1be5a1b0192))
- **editor:** SaveAsJsonOrYaml function component ([a6b53b3](https://github.com/swagger-api/apidom/commit/a6b53b3606a5033244c2cecb3fa82c1abe5a6870))
- **editor:** saveAsJsonOrYaml.actions ([a465b02](https://github.com/swagger-api/apidom/commit/a465b0283c8ddb5863ccf5eb2af4dcd8b82d9f47))
- **editor:** saveAsYaml confirmation modal ([7045ba3](https://github.com/swagger-api/apidom/commit/7045ba3464fda72c8562536844c81bfa3d58373e))
- **editor:** saveAsYaml confirmation modal ([b62db66](https://github.com/swagger-api/apidom/commit/b62db663445b5c2bc4588ad6e1c99bdb5b947404))
- **editor:** semanticTokensAdapter provider ([856a41b](https://github.com/swagger-api/apidom/commit/856a41bcd2e3d1c61b995fc1471225a89e332184))
- **editor:** set language to apidom; remove onChangeLanguageValue ([71ccc28](https://github.com/swagger-api/apidom/commit/71ccc2867a943139da5e25a739411359218f79fa))
- **editor:** showErrorModal with close ([a9627b3](https://github.com/swagger-api/apidom/commit/a9627b38510eb20ddfd6a8efe8e7e9b11fa4e449))
- **editor:** showErrorModal with close ([cae578c](https://github.com/swagger-api/apidom/commit/cae578c76194d81453109b54aa7bd9b828a18200))
- **editor:** spec detection for known http generators ([47db420](https://github.com/swagger-api/apidom/commit/47db4205b23643be71687027b7a22eb778ba9e04))
- **editor:** temp hello.worker ([627f83a](https://github.com/swagger-api/apidom/commit/627f83ac3dd4a11de6238a4e1b24590c542b5d0d))
- **editor:** textarea demo component ([b713b5a](https://github.com/swagger-api/apidom/commit/b713b5af29c2eb71b68c5901c14c5c194b0df1e1))
- **editor:** textarea demo component ([ce71efb](https://github.com/swagger-api/apidom/commit/ce71efbd16f86a75c8ec5cd947e0c37d2a50ec29))
- **editor:** ThemeSelectionIcon component ([95022be](https://github.com/swagger-api/apidom/commit/95022beb74b5aa0070688e5c971b9baf2ff4583e))
- **editor:** update ImportUrl modal style ([04975da](https://github.com/swagger-api/apidom/commit/04975da6e8a61e0471b015e9fe9b4ccadd3941ab))
- **editor:** update modal styles ([c3f822d](https://github.com/swagger-api/apidom/commit/c3f822da32bb48852bbf4bf1c3dada71fdbf5cf4))
- **editor:** use methods from apidom-ls for registered providers ([a412998](https://github.com/swagger-api/apidom/commit/a4129984be32cddcd464ae79103f2be5c3ec7c76))
- **editor:** use same generator baseUrl for oas3 and oas3_1 ([158e753](https://github.com/swagger-api/apidom/commit/158e7534186bf1efa45e4b7d4428470dbd7ac248))
- **editor:** use synchronous getLegend() for semanticTokensAdapter ([54da77e](https://github.com/swagger-api/apidom/commit/54da77e2d41306239cfc361ce849a96b52cf1a02))
- **editor:** utils for isValidJson and isValidYaml ([55d6a67](https://github.com/swagger-api/apidom/commit/55d6a6765c7856f8f51add1a68c7f5cefcbfe116))
- **editor:** utils-getSpecVersion ([36bba3e](https://github.com/swagger-api/apidom/commit/36bba3e1f10eb9427b89aeb8df629adadd611f12))
- **editor:** webpack outputs workers without chunk in filename ([f07a693](https://github.com/swagger-api/apidom/commit/f07a6935120dbe91f236fc6e3220d0d21cdb615d))
- **editor:** wip - light and dark themes ([0487ca5](https://github.com/swagger-api/apidom/commit/0487ca57ff5b472a7596d93bf92fe64e539f5193))
- **editor:** wip disabled hooks for FileMenuDropdown ([4b809ad](https://github.com/swagger-api/apidom/commit/4b809ad47d373eef301df6cc822b3f293c4d3ce8))
- **editor:** wip: setup with ApidomWorker and WorkerManager ([59fd2ce](https://github.com/swagger-api/apidom/commit/59fd2ceff6a6a255782a790e6b06a08bdc01c515))
- **editor:** wip: switch to apidom placeholders ([c3454b4](https://github.com/swagger-api/apidom/commit/c3454b4016d7af6b624ae6c12dec98c9c522b4fa))
- **editor:** worker-loader with commented hello.worker ([ecca99a](https://github.com/swagger-api/apidom/commit/ecca99a77616ad34215d7fe8f6578d6fc1e23422))
- **editor:** working setup with workerManager ([843e1c0](https://github.com/swagger-api/apidom/commit/843e1c0029b74f70f84550153c1f8b60f2f08650))
- embed metadata into resulting tree ([04d672d](https://github.com/swagger-api/apidom/commit/04d672d798992faa3b8ae037305ac8f1f31320fe))
- **extensions:** add extensions support for info/(license|contact) ([0dc34ab](https://github.com/swagger-api/apidom/commit/0dc34ab565203d254d15c0d91193222503c1f78b)), closes [#16](https://github.com/swagger-api/apidom/issues/16)
- **extensions:** add support for OpenApi extensions for Info ([1f56875](https://github.com/swagger-api/apidom/commit/1f568759515f4af61cb3ce7a75df96ef04456297)), closes [#16](https://github.com/swagger-api/apidom/issues/16)
- **generic-editor:** integrate react support ([71ad70d](https://github.com/swagger-api/apidom/commit/71ad70d131dde34b17462fc4412b60e35f6f0012))
- **generic-editor:** integrate with ApiDOM ([5a82cf2](https://github.com/swagger-api/apidom/commit/5a82cf2122085b7d1a01099b37f2d1ed13a97d5d))
- **generic-editor:** scaffold generic editor SwaggerUI plugin ([697f683](https://github.com/swagger-api/apidom/commit/697f683c32ded0ebf65652ef0d10cba0012f40d0))
- implement generic depth first traversal ([6078ed0](https://github.com/swagger-api/apidom/commit/6078ed0baa25b85f8ba1f4057f87071313027099))
- implement plugginable architecture ([499e3bd](https://github.com/swagger-api/apidom/commit/499e3bd032807e82c5da4024b20bf869adf4145a)), closes [#20](https://github.com/swagger-api/apidom/issues/20)
- implement recursive search algorithm ([#80](https://github.com/swagger-api/apidom/issues/80)) ([db3e146](https://github.com/swagger-api/apidom/commit/db3e1460872cdcca979ea73168bc15076deb580d)), closes [#77](https://github.com/swagger-api/apidom/issues/77)
- implement YAML CST to AST transformer ([8a84320](https://github.com/swagger-api/apidom/commit/8a84320ee068bec04889ac248c664435636dcaea)), closes [#1](https://github.com/swagger-api/apidom/issues/1)
- introduce namespace refractor ([c75dc8a](https://github.com/swagger-api/apidom/commit/c75dc8a09583658acc1b144b33fcb11c109e72d6))
- introduce our own AST layer ([c3c137e](https://github.com/swagger-api/apidom/commit/c3c137e0a8aaa2f9803022392579b8358cdfd7bf)), closes [#35](https://github.com/swagger-api/apidom/issues/35)
- **metadata:** add conventions to append metadata to ApiDOM tree ([#78](https://github.com/swagger-api/apidom/issues/78)) ([91fd38f](https://github.com/swagger-api/apidom/commit/91fd38f53a6b0103da6066443de78f6bc28ddf19)), closes [#76](https://github.com/swagger-api/apidom/issues/76)
- **ns-asyncapi-2-0:** add accessors to Schema Element ([906b317](https://github.com/swagger-api/apidom/commit/906b317c572df1851a6ae7e88e11d2f573a0d9dc)), closes [#424](https://github.com/swagger-api/apidom/issues/424)
- **ns-asyncapi-2-0:** add components/parameters support ([f9a7545](https://github.com/swagger-api/apidom/commit/f9a7545f5d026e0b4a3b77868e37502c75f12913)), closes [#304](https://github.com/swagger-api/apidom/issues/304)
- **ns-asyncapi-2-0:** add elements for all Binding Objects ([7c97c89](https://github.com/swagger-api/apidom/commit/7c97c89609a6353cb58df27802766f0410f1dba4)), closes [#387](https://github.com/swagger-api/apidom/issues/387)
- **ns-asyncapi-2-0:** add full support for AsyncApi2_0 Object ([d971cb9](https://github.com/swagger-api/apidom/commit/d971cb99f22065fb3f06e3c4c17152e43985b853)), closes [#387](https://github.com/swagger-api/apidom/issues/387)
- **ns-asyncapi-2-0:** add full support for ChannelBindings Object ([fa48929](https://github.com/swagger-api/apidom/commit/fa48929c818e8f6be491b2038b9dc1d228f0f0b1)), closes [#387](https://github.com/swagger-api/apidom/issues/387)
- **ns-asyncapi-2-0:** add full support for Components Object ([6c7cd91](https://github.com/swagger-api/apidom/commit/6c7cd91bb05e0711000ad72bf628548959b1eb18)), closes [#387](https://github.com/swagger-api/apidom/issues/387)
- **ns-asyncapi-2-0:** add full support for Operation Object ([d1f1d72](https://github.com/swagger-api/apidom/commit/d1f1d7283b3b35e95709938241e065f76deda6b0)), closes [#387](https://github.com/swagger-api/apidom/issues/387)
- **ns-asyncapi-2-0:** add full support for Schema Object ([44c3da6](https://github.com/swagger-api/apidom/commit/44c3da6e8ac63f93ae8ac75eebb79607239dde82)), closes [#424](https://github.com/swagger-api/apidom/issues/424)
- **ns-asyncapi-2-0:** add full support for ServerBindings Object ([fc1a4d6](https://github.com/swagger-api/apidom/commit/fc1a4d60c1b264ad3eeb6f45352d3022f65fdbd3)), closes [#387](https://github.com/swagger-api/apidom/issues/387)
- **ns-asyncapi-2-0:** add metadata to Server.url field ([a1ef9ff](https://github.com/swagger-api/apidom/commit/a1ef9ff2e96a96ff1d16d1ac153d45ef6f48840b))
- **ns-asyncapi-2-0:** add mqtt5 binding elements ([a445b37](https://github.com/swagger-api/apidom/commit/a445b37c3360043e712d322a5669964c8706e563)), closes [#387](https://github.com/swagger-api/apidom/issues/387)
- **ns-asyncapi-2-0:** add support for all remaining binding objects ([67b239c](https://github.com/swagger-api/apidom/commit/67b239c3ecc23ae406ed009d02b0a70fc2c22c39)), closes [#387](https://github.com/swagger-api/apidom/issues/387)
- **ns-asyncapi-2-0:** add support for AMQP 0.9.1 Server Binding Obj ([51ef9eb](https://github.com/swagger-api/apidom/commit/51ef9eb5792e42b261aef20964c827b9df7e5613)), closes [#387](https://github.com/swagger-api/apidom/issues/387)
- **ns-asyncapi-2-0:** add support for AMQP 1.0 bindings ([91f8dbd](https://github.com/swagger-api/apidom/commit/91f8dbda19ad60006696beaefab847261db74ffd)), closes [#387](https://github.com/swagger-api/apidom/issues/387)
- **ns-asyncapi-2-0:** add support for AMQP Channel Binding Object ([8d38adc](https://github.com/swagger-api/apidom/commit/8d38adc45157625c0a12e08005edef1c9529f374)), closes [#387](https://github.com/swagger-api/apidom/issues/387)
- **ns-asyncapi-2-0:** add support for AMQP Message Binding Object ([698c1e6](https://github.com/swagger-api/apidom/commit/698c1e6ddf212fe04236edd4a8604503aef181c8)), closes [#387](https://github.com/swagger-api/apidom/issues/387)
- **ns-asyncapi-2-0:** add support for AMQP Operation Binding Object ([6104684](https://github.com/swagger-api/apidom/commit/6104684cbb595736c3bfde54ebeccbcd65205db7)), closes [#387](https://github.com/swagger-api/apidom/issues/387)
- **ns-asyncapi-2-0:** add support for CorrelationID Object ([c3c5e3c](https://github.com/swagger-api/apidom/commit/c3c5e3cd20da309f79a027905a8e28d0fb530e5f)), closes [#387](https://github.com/swagger-api/apidom/issues/387)
- **ns-asyncapi-2-0:** add support for DefaultContentType Object ([96856f9](https://github.com/swagger-api/apidom/commit/96856f9cd14be5cfb0dd4df97b8562130e156858)), closes [#387](https://github.com/swagger-api/apidom/issues/387)
- **ns-asyncapi-2-0:** add support for ExternalDocs Object ([5a01768](https://github.com/swagger-api/apidom/commit/5a01768bd69197d8dfed0f0d283723530f0ae45d)), closes [#387](https://github.com/swagger-api/apidom/issues/387)
- **ns-asyncapi-2-0:** add support for HTTP Channel Bidning Obj ([f67dabd](https://github.com/swagger-api/apidom/commit/f67dabda6af60fa9264a865553911a1981a13fdd)), closes [#387](https://github.com/swagger-api/apidom/issues/387)
- **ns-asyncapi-2-0:** add support for HTTP Message Binding Object ([b5a10e2](https://github.com/swagger-api/apidom/commit/b5a10e25984cddacc61bc6c05da6f928f6cc7a53)), closes [#387](https://github.com/swagger-api/apidom/issues/387)
- **ns-asyncapi-2-0:** add support for HTTP Operation Binding Object ([1813f04](https://github.com/swagger-api/apidom/commit/1813f045ab92fe41f05519b78d1337a484506a73)), closes [#387](https://github.com/swagger-api/apidom/issues/387)
- **ns-asyncapi-2-0:** add support for HTTP Server Binding Obj ([57b9213](https://github.com/swagger-api/apidom/commit/57b92131ebe7b4788a17dff2bd477dab43eed773)), closes [#387](https://github.com/swagger-api/apidom/issues/387)
- **ns-asyncapi-2-0:** add support for Kafka Channel Obj ([4006f15](https://github.com/swagger-api/apidom/commit/4006f15b2f138f438e7232fc98a11c0a3f82c544)), closes [#387](https://github.com/swagger-api/apidom/issues/387)
- **ns-asyncapi-2-0:** add support for Kafka Message Binding Object ([51d79ae](https://github.com/swagger-api/apidom/commit/51d79ae00d3ddcb7eace662d2ab57450e984c17a)), closes [#387](https://github.com/swagger-api/apidom/issues/387)
- **ns-asyncapi-2-0:** add support for Kafka Op. Binding Object ([4b82b14](https://github.com/swagger-api/apidom/commit/4b82b1431debe30ceccb5090b3cae06716973d18)), closes [#387](https://github.com/swagger-api/apidom/issues/387)
- **ns-asyncapi-2-0:** add support for Kafka Server Binding ([a62e76c](https://github.com/swagger-api/apidom/commit/a62e76c14d95faf5428300dd73a52818f8a74b2f)), closes [#387](https://github.com/swagger-api/apidom/issues/387)
- **ns-asyncapi-2-0:** add support for Message Object ([3b33f1b](https://github.com/swagger-api/apidom/commit/3b33f1ba0cf1cfcfe5e368d571d401a20f32edf3)), closes [#387](https://github.com/swagger-api/apidom/issues/387)
- **ns-asyncapi-2-0:** add support for Message Trait Object ([500181e](https://github.com/swagger-api/apidom/commit/500181eb2b80aab5e4dde18baf0d6559e5cfd20f)), closes [#387](https://github.com/swagger-api/apidom/issues/387)
- **ns-asyncapi-2-0:** add support for MessageBindings Object ([c8a5c63](https://github.com/swagger-api/apidom/commit/c8a5c632fd341ef78e64bfc5c21c5df584bd124c)), closes [#387](https://github.com/swagger-api/apidom/issues/387)
- **ns-asyncapi-2-0:** add support for MQTT Channel Binding Obj ([fcf8300](https://github.com/swagger-api/apidom/commit/fcf83005b8482fe561217b6f354ea21e676275ac)), closes [#387](https://github.com/swagger-api/apidom/issues/387)
- **ns-asyncapi-2-0:** add support for MQTT Message Binding Object ([62033ba](https://github.com/swagger-api/apidom/commit/62033ba72e04dc906078aca2c99965d507c3e087)), closes [#387](https://github.com/swagger-api/apidom/issues/387)
- **ns-asyncapi-2-0:** add support for MQTT Operation Binding Object ([f11bc26](https://github.com/swagger-api/apidom/commit/f11bc26281d51bb25b7cea0c8bcd49c7fbeb1f96)), closes [#387](https://github.com/swagger-api/apidom/issues/387)
- **ns-asyncapi-2-0:** add support for MQTT Server Binding Object ([1a41383](https://github.com/swagger-api/apidom/commit/1a41383b8cd89dc58560d1b28ffe9d24c0638fa3)), closes [#387](https://github.com/swagger-api/apidom/issues/387)
- **ns-asyncapi-2-0:** add support for OAuthFlow Object ([54949fa](https://github.com/swagger-api/apidom/commit/54949fab7451b4ac98e975753043ba59381745eb)), closes [#387](https://github.com/swagger-api/apidom/issues/387)
- **ns-asyncapi-2-0:** add support for OAuthFlows Object ([f759bb5](https://github.com/swagger-api/apidom/commit/f759bb5ac915cac12ce55b4c324193e45ea93167)), closes [#387](https://github.com/swagger-api/apidom/issues/387)
- **ns-asyncapi-2-0:** add support for OperationBindings Object ([e5500eb](https://github.com/swagger-api/apidom/commit/e5500ebea9e63bdc4619992560f182771d56626e)), closes [#387](https://github.com/swagger-api/apidom/issues/387)
- **ns-asyncapi-2-0:** add support for OperationTrait Object ([8e72347](https://github.com/swagger-api/apidom/commit/8e72347d798e7b45b9d507f4125cca8e8b1158fb)), closes [#387](https://github.com/swagger-api/apidom/issues/387)
- **ns-asyncapi-2-0:** add support for Security Scheme Object ([b706269](https://github.com/swagger-api/apidom/commit/b706269fc9e7fee6b57399d5f20661e165ae48d9)), closes [#387](https://github.com/swagger-api/apidom/issues/387)
- **ns-asyncapi-2-0:** add support for Tag Object ([d31f532](https://github.com/swagger-api/apidom/commit/d31f532d8a060b5ff3e5a74f6a17c490a1ac4e76)), closes [#387](https://github.com/swagger-api/apidom/issues/387)
- **ns-asyncapi-2-0:** add support for Tags Object ([e25d704](https://github.com/swagger-api/apidom/commit/e25d704ddb3a5d634a5ea1abfe47567a8e4cb937)), closes [#387](https://github.com/swagger-api/apidom/issues/387)
- **ns-asyncapi-2-0:** add support for WS Message Binding Obj ([43f0cb7](https://github.com/swagger-api/apidom/commit/43f0cb7c81ba34f51c9b09008d825850cf85cb8a)), closes [#387](https://github.com/swagger-api/apidom/issues/387)
- **ns-asyncapi-2-0:** add support for WS Operation Binding Obj ([c194516](https://github.com/swagger-api/apidom/commit/c1945161752e71cce42a43b169443fdd8abb4611)), closes [#387](https://github.com/swagger-api/apidom/issues/387)
- **ns-asyncapi-2-0:** add support for WS Operation Binding Object ([e7bc510](https://github.com/swagger-api/apidom/commit/e7bc5106b773b60905af74dee639c7f797cb10c4)), closes [#387](https://github.com/swagger-api/apidom/issues/387)
- **ns-asyncapi-2-0:** add support for WS Server Binding Obj ([148aaa5](https://github.com/swagger-api/apidom/commit/148aaa5ff8c59c57d1418135e41c7a85884927a5)), closes [#387](https://github.com/swagger-api/apidom/issues/387)
- **ns-asyncapi-2-0:** complete key mapping for namespace visiting ([364ad68](https://github.com/swagger-api/apidom/commit/364ad6887f223138534ab703a6a6100c1a941662))
- **ns-asyncapi-2-0:** introduce plugginable refracting ([#278](https://github.com/swagger-api/apidom/issues/278)) ([32cd470](https://github.com/swagger-api/apidom/commit/32cd47076e978c721980119934098051bad9032d))
- **ns-asyncapi-2:** add reference metadata ([808073f](https://github.com/swagger-api/apidom/commit/808073f0e8a971a77957708c8a98bece6aa24813))
- **ns-openapi-3-1:** add Contents of String-Encoded Data vocabulary ([88cd7e1](https://github.com/swagger-api/apidom/commit/88cd7e1a33e441aec57d72ddd54fa71ef8634d89)), closes [#337](https://github.com/swagger-api/apidom/issues/337)
- **ns-openapi-3-1:** add additional metadata to outside context objs ([1bc0d14](https://github.com/swagger-api/apidom/commit/1bc0d1415a97a35e8fa10b7ae07261213b15af41)), closes [#450](https://github.com/swagger-api/apidom/issues/450)
- **ns-openapi-3-1:** add all possible keywords for Schema element ([c1237b1](https://github.com/swagger-api/apidom/commit/c1237b1ec321a232a731826e29a4e29c66762f25)), closes [#337](https://github.com/swagger-api/apidom/issues/337)
- **ns-openapi-3-1:** add Applicator vocabulary to Schema Object ([78173c4](https://github.com/swagger-api/apidom/commit/78173c4c1eba60a6cf0e2088505ecf9132601178)), closes [#337](https://github.com/swagger-api/apidom/issues/337)
- **ns-openapi-3-1:** add Basic Meta-Data vocabulary to Schema Object ([249c4f8](https://github.com/swagger-api/apidom/commit/249c4f87146f5cb6f736e726d75348925d88cb9b)), closes [#337](https://github.com/swagger-api/apidom/issues/337)
- **ns-openapi-3-1:** add Core vocabulary to Schema Object ([fac8af3](https://github.com/swagger-api/apidom/commit/fac8af35db90e3eade3812b51aa8c84aef536afe)), closes [#337](https://github.com/swagger-api/apidom/issues/337)
- **ns-openapi-3-1:** add Discriminator Object ([#342](https://github.com/swagger-api/apidom/issues/342)) ([987f755](https://github.com/swagger-api/apidom/commit/987f75514afbc6dc7613afe9aa726fcbe85c2b74)), closes [#337](https://github.com/swagger-api/apidom/issues/337)
- **ns-openapi-3-1:** add Encoding Object ([56b3b79](https://github.com/swagger-api/apidom/commit/56b3b795a51aff8895595bd88cd67275526a2e6b)), closes [#386](https://github.com/swagger-api/apidom/issues/386)
- **ns-openapi-3-1:** add Example Object ([382fccf](https://github.com/swagger-api/apidom/commit/382fccf72dd582cb47d8c37949395700530676cd)), closes [#386](https://github.com/swagger-api/apidom/issues/386)
- **ns-openapi-3-1:** add meta about HeaderElement name ([f54712d](https://github.com/swagger-api/apidom/commit/f54712dde8d39a0b74a6b420d48dbcf3e2b8707a)), closes [#444](https://github.com/swagger-api/apidom/issues/444)
- **ns-openapi-3-1:** add meta about http status code to Response ([8d80c7e](https://github.com/swagger-api/apidom/commit/8d80c7ea9a1de6b4ec45a246d89af0555629eafd)), closes [#444](https://github.com/swagger-api/apidom/issues/444)
- **ns-openapi-3-1:** add metadata to Server.url field ([fe4e371](https://github.com/swagger-api/apidom/commit/fe4e371dbb530d668b19c1516c1c9c1538ea1867))
- **ns-openapi-3-1:** add OAS vocabulary to Schema Object ([1506602](https://github.com/swagger-api/apidom/commit/1506602fde40b146b5c91b8d301627d9496f836b)), closes [#337](https://github.com/swagger-api/apidom/issues/337)
- **ns-openapi-3-1:** add reference metadata ([5ab586e](https://github.com/swagger-api/apidom/commit/5ab586ef366b0bbd57674520baa6fa1dd8f3d3ea))
- **ns-openapi-3-1:** add Semantic Content vocabulary to Schema ([ed8535a](https://github.com/swagger-api/apidom/commit/ed8535a14e68d9aca71f1d5ce267cddc121a3c3e)), closes [#337](https://github.com/swagger-api/apidom/issues/337)
- **ns-openapi-3-1:** add support for Boolean JSON Schemas ([3fc340f](https://github.com/swagger-api/apidom/commit/3fc340f142b482245f2fea30d856091e104f7fc0))
- **ns-openapi-3-1:** add support for Header Object ([8cfef80](https://github.com/swagger-api/apidom/commit/8cfef8051992b0e6c1804630415beeb8509a43ac))
- **ns-openapi-3-1:** add support for JSON Schema Dialect ([15e3449](https://github.com/swagger-api/apidom/commit/15e3449e37d557a89eb1a12d44f7c3d8ee250365)), closes [#339](https://github.com/swagger-api/apidom/issues/339)
- **ns-openapi-3-1:** add support for Link Object ([1007315](https://github.com/swagger-api/apidom/commit/100731572c56b4835d8e0b1c1fdbb2712cec92f3))
- **ns-openapi-3-1:** add support for OAuth Flow Object ([b53fa53](https://github.com/swagger-api/apidom/commit/b53fa53c702c8374870bf013430d2c27b26db551))
- **ns-openapi-3-1:** add support for OAuth Flows Object ([8cd324c](https://github.com/swagger-api/apidom/commit/8cd324c42b583b5958b952182d3c47b8b0369139))
- **ns-openapi-3-1:** add support for Security Scheme Object ([5bb977e](https://github.com/swagger-api/apidom/commit/5bb977e0f21ff11f3e959f7e4ae462e4e1b840f8))
- **ns-openapi-3-1:** add support for Tag Object ([e9c1f11](https://github.com/swagger-api/apidom/commit/e9c1f11fa2d83266501b1f8b471c13b902861266))
- **ns-openapi-3-1:** add support for XML Object ([bbddb3e](https://github.com/swagger-api/apidom/commit/bbddb3e65f8c7213e44914704fdf1cf600e40fab)), closes [#337](https://github.com/swagger-api/apidom/issues/337)
- **ns-openapi-3-1:** add tests using dehydrated ApiDOM snapshots ([b60353a](https://github.com/swagger-api/apidom/commit/b60353abdddc0e64245986d20d2e794697e9de5f)), closes [#438](https://github.com/swagger-api/apidom/issues/438) [#360](https://github.com/swagger-api/apidom/issues/360)
- **ns-openapi-3-1:** add Unevaluated vocabulary to Schema Object ([4ba72e5](https://github.com/swagger-api/apidom/commit/4ba72e58ae91d4380f6475df7808f18a7017a772)), closes [#337](https://github.com/swagger-api/apidom/issues/337)
- **ns-openapi-3-1:** add Validation vocabulary to Schema Object ([55a98ce](https://github.com/swagger-api/apidom/commit/55a98ce1c954abfcbb22cf566e9b5e74ff879e85)), closes [#337](https://github.com/swagger-api/apidom/issues/337)
- **ns-openapi-3-1:** complete key mapping for namespace visiting ([#274](https://github.com/swagger-api/apidom/issues/274)) ([0a2ef19](https://github.com/swagger-api/apidom/commit/0a2ef19d347a93ba669991f09bea13d55d7aa605))
- **ns-openapi-3-1:** finish Calback Object ([b11a5c8](https://github.com/swagger-api/apidom/commit/b11a5c8aaa2a6bfde6aab98f8ecfee774d8f8b51)), closes [#386](https://github.com/swagger-api/apidom/issues/386)
- **ns-openapi-3-1:** finish Components Object ([e840834](https://github.com/swagger-api/apidom/commit/e840834f4e66d09f94dd811627622a99a503435e)), closes [#386](https://github.com/swagger-api/apidom/issues/386)
- **ns-openapi-3-1:** finish Media TYpe Object ([57de422](https://github.com/swagger-api/apidom/commit/57de42265579762aafe5dd2b6090eb324511b3ed)), closes [#386](https://github.com/swagger-api/apidom/issues/386)
- **ns-openapi-3-1:** finish OpenAPI Object ([adeacff](https://github.com/swagger-api/apidom/commit/adeacff4a9e95f464dd0c23f418a55ff5c0f2b8f)), closes [#386](https://github.com/swagger-api/apidom/issues/386)
- **ns-openapi-3-1:** finish Request Body Object ([12a21fd](https://github.com/swagger-api/apidom/commit/12a21fdb3cf840b1f3380255880ef4cf0d764c98)), closes [#386](https://github.com/swagger-api/apidom/issues/386)
- **ns-openapi-3-1:** implement refractor plugin for inheritance ([9171db9](https://github.com/swagger-api/apidom/commit/9171db92f4001c0cb1c3ee24a544fc4964d17728)), closes [#362](https://github.com/swagger-api/apidom/issues/362)
- **ns-openapi-3-1:** implement refractor plugin for $id inheritance ([e7bd45a](https://github.com/swagger-api/apidom/commit/e7bd45a53cb5f75bfbdd21cea7875e6835e88abe)), closes [#363](https://github.com/swagger-api/apidom/issues/363)
- **ns-openapi-3-1:** introduce plugginable refracting ([dc311e9](https://github.com/swagger-api/apidom/commit/dc311e9838d9bbc025591309dd86bb6b08c33434))
- **OAS ns:** add support for response->content->mediaType-schema ([7277139](https://github.com/swagger-api/apidom/commit/7277139983ed25f2064a62797019d172a241aee4))
- **openapi-3-1:** finish refractor implementation ([987ddc1](https://github.com/swagger-api/apidom/commit/987ddc1250414771d95aabebab90c7366a3004e5))
- **openapi-3.1-adapter:** add support for browser build fragments ([30782a0](https://github.com/swagger-api/apidom/commit/30782a03e947bfc995fbe94bfe8c997432171abd)), closes [#35](https://github.com/swagger-api/apidom/issues/35)
- **openapi-ns:** add predicates ([46a2161](https://github.com/swagger-api/apidom/commit/46a2161dbac60ee48d57dac70f9348035548f3a9)), closes [#60](https://github.com/swagger-api/apidom/issues/60)
- **OpenApi3.1-Json:** add support for Parameter and Reference Object ([a4c5525](https://github.com/swagger-api/apidom/commit/a4c55255b98c40429ccd245c7e1ea363fe01e5ab))
- **OpenApi3.1-Yaml:** add support for additional objects ([5479c92](https://github.com/swagger-api/apidom/commit/5479c92d0d411637d34622d1c47d3b29629a3b71)), closes [#1](https://github.com/swagger-api/apidom/issues/1)
- **OpenApi3.1-Yaml:** add support for Components and Schema ([ef44ceb](https://github.com/swagger-api/apidom/commit/ef44cebdcaa61fbf8b58f384a945d777fd62d72f)), closes [#1](https://github.com/swagger-api/apidom/issues/1)
- **OpenApi3.1-Yaml:** add support for empty pair empty value ([eef46e8](https://github.com/swagger-api/apidom/commit/eef46e8c21fd1cd891a64293381bd0cce2b7abbc)), closes [#1](https://github.com/swagger-api/apidom/issues/1)
- **OpenApi3.1-Yaml:** add support for generic visitors ([7dce6f5](https://github.com/swagger-api/apidom/commit/7dce6f5b392f6f4b8b528ee378ae8df7fbda0026)), closes [#1](https://github.com/swagger-api/apidom/issues/1)
- **OpenApi3.1-Yaml:** add support for Info, License and Contact ([b4161b6](https://github.com/swagger-api/apidom/commit/b4161b68910351460f9358df3051bfb6360b377d)), closes [#1](https://github.com/swagger-api/apidom/issues/1)
- **OpenApi3.1-Yaml:** add support for OpenApi.security field ([7065807](https://github.com/swagger-api/apidom/commit/7065807dcac0e93a202b99cc06f51f69a7c9992b)), closes [#1](https://github.com/swagger-api/apidom/issues/1)
- **OpenApi3.1-Yaml:** add support for Parameter and Reference Object ([ee754f6](https://github.com/swagger-api/apidom/commit/ee754f614d47cb41488a3468633698a3c71f0321))
- **OpenApi3.1-Yaml:** add support for Responses and Response ([3a6667a](https://github.com/swagger-api/apidom/commit/3a6667a97fc85e02d7e9b93652a0aac015785e42)), closes [#1](https://github.com/swagger-api/apidom/issues/1)
- **OpenApi3.1-Yaml:** add support for Server and ServerVariable ([51de6e4](https://github.com/swagger-api/apidom/commit/51de6e453f72441738f3cba23abdf9e8670aceaf)), closes [#1](https://github.com/swagger-api/apidom/issues/1)
- **OpenApi3.1-Yaml:** add support for stream comments ([b34e0ae](https://github.com/swagger-api/apidom/commit/b34e0ae6a3811b979ca3358e7c55adab6ea7183b)), closes [#1](https://github.com/swagger-api/apidom/issues/1)
- **OpenApi3.1-Yaml:** add support for streams ([#114](https://github.com/swagger-api/apidom/issues/114)) ([29260c5](https://github.com/swagger-api/apidom/commit/29260c513411d7fd66305b81d5c3a92a0b802fdc)), closes [#1](https://github.com/swagger-api/apidom/issues/1)
- **OpenApi3.1:** add additional metadata to Operation ([4f3684b](https://github.com/swagger-api/apidom/commit/4f3684b75155abd7ae2cd53ef0f791029bb1d45f)), closes [#66](https://github.com/swagger-api/apidom/issues/66)
- **OpenApi3.1:** add fixed and mixed fields generic visitors ([666ba12](https://github.com/swagger-api/apidom/commit/666ba126088921c29360abcb34424930ac1d675b)), closes [#91](https://github.com/swagger-api/apidom/issues/91)
- **OpenApi3.1:** add support for additional fields to Operation ([4b2452a](https://github.com/swagger-api/apidom/commit/4b2452a88919a904bc6f20ddbc43a650de44d107)), closes [#66](https://github.com/swagger-api/apidom/issues/66)
- **OpenApi3.1:** add support for additional fields to Operation ([#88](https://github.com/swagger-api/apidom/issues/88)) ([e69b47a](https://github.com/swagger-api/apidom/commit/e69b47a36700ccd5da9591c7632622451f80bb2a)), closes [#66](https://github.com/swagger-api/apidom/issues/66)
- **OpenApi3.1:** add support for MemberElement sourcemaps ([cd569e0](https://github.com/swagger-api/apidom/commit/cd569e00267a1f3ef104b3579017c2245de56ad7)), closes [#71](https://github.com/swagger-api/apidom/issues/71)
- **OpenApi3.1:** add support for Paths and PathItem objects ([#68](https://github.com/swagger-api/apidom/issues/68)) ([de2cf3e](https://github.com/swagger-api/apidom/commit/de2cf3e2ed07d9ac61144d61e4bcf4f388f3f3fc)), closes [#66](https://github.com/swagger-api/apidom/issues/66)
- **OpenApi3.1:** add support for unknown object fields ([cc0400e](https://github.com/swagger-api/apidom/commit/cc0400e04c85c9690a3feb1da79dc105780aee18)), closes [#101](https://github.com/swagger-api/apidom/issues/101)
- **OpenApi3.1:** add support for unknown values ([90dce03](https://github.com/swagger-api/apidom/commit/90dce036eed2de1421cce5067e6f42d6a0a97c42)), closes [#101](https://github.com/swagger-api/apidom/issues/101)
- **OpenApi3.1:** all support for all Operation fields ([21dcbcc](https://github.com/swagger-api/apidom/commit/21dcbccb1b39d9d9f792c79c35e614f21454c85c)), closes [#66](https://github.com/swagger-api/apidom/issues/66)
- **parser:** add AsyncAPI 2.0 adapter ([#57](https://github.com/swagger-api/apidom/issues/57)) ([2535860](https://github.com/swagger-api/apidom/commit/2535860dbb9a6d1e8342fca0f7647dea611ef0d9))
- **parser:** add AsyncAPI 2.0.0 adapter implementation ([#58](https://github.com/swagger-api/apidom/issues/58)) ([c7cb963](https://github.com/swagger-api/apidom/commit/c7cb96379748cf07fab2201568405e16c164b133))
- **parser:** introduce API for finding namespace ([7650220](https://github.com/swagger-api/apidom/commit/765022082a316cf4b16b25245e757136f0a18f57)), closes [#234](https://github.com/swagger-api/apidom/issues/234)
- **PathItemObject:** implement all properties ([9f9407c](https://github.com/swagger-api/apidom/commit/9f9407cbcd68b7e1dc63fab49ed187484f8b70c0)), closes [#66](https://github.com/swagger-api/apidom/issues/66)
- **playground:** add multiple enhancements ([82b54d0](https://github.com/swagger-api/apidom/commit/82b54d056a24fdf66e9bd8923e054649905a04ca))
- **playground:** add non working resolve integration ([ad13897](https://github.com/swagger-api/apidom/commit/ad138972d789063049ca95805692f14f745ac59c))
- **playground:** add s-expression and value interpretations ([99a1f36](https://github.com/swagger-api/apidom/commit/99a1f360a166b438291344523bf7209af1461322)), closes [#476](https://github.com/swagger-api/apidom/issues/476)
- **playground:** add support for AsyncAPI 2.1 ([3565989](https://github.com/swagger-api/apidom/commit/35659890fd6ace4a7bfc4333928843b6f11faa7c)), closes [#461](https://github.com/swagger-api/apidom/issues/461)
- **playground:** add support for injectable interpreter ([d79270c](https://github.com/swagger-api/apidom/commit/d79270c769fd57a0de8f107396558fe39ee0b8e2))
- **playground:** enhance dereferencing with interpreter options ([2c94c27](https://github.com/swagger-api/apidom/commit/2c94c277866d0f6263e12c4759d3e7084329f516)), closes [#476](https://github.com/swagger-api/apidom/issues/476)
- **playground:** integrate dereference ([9eb1167](https://github.com/swagger-api/apidom/commit/9eb11676451d91361c297c3eec49b7465204d1f8))
- **playground:** integrate resolver ([9c50482](https://github.com/swagger-api/apidom/commit/9c50482465bbc0234266115fefeaab1e341afbe7))
- **playground:** visual playgrand for ApiDOM features ([44d2b0c](https://github.com/swagger-api/apidom/commit/44d2b0c0af65a5718df8437e993a16cf4a9295fa))
- **predicates:** add predicates for higher order minim types ([7bb8c26](https://github.com/swagger-api/apidom/commit/7bb8c26279909ac8e14308d31d3ac0eb153d06f2)), closes [#60](https://github.com/swagger-api/apidom/issues/60)
- prepare codebase for schema support ([16054c8](https://github.com/swagger-api/apidom/commit/16054c8db3396eb62b330b32349f5ce2db6e1ec4)), closes [#9](https://github.com/swagger-api/apidom/issues/9)
- **referece:** add support for couting referece depth ([dfdb887](https://github.com/swagger-api/apidom/commit/dfdb887f3ac44c9e4e7ca6c3c96cf9d3f3f367d4))
- **referece:** add support for setting max depth of resolution ([0e71846](https://github.com/swagger-api/apidom/commit/0e7184618a14ff24bd276cd14638155160697b4b))
- **reference:** add additional metadata during dereference ([659323c](https://github.com/swagger-api/apidom/commit/659323c9a4bfc2e58eceeb74d5178c22b5308328)), closes [#384](https://github.com/swagger-api/apidom/issues/384)
- **reference:** add AsyncApi 2.0.0 dereference ([2f34e19](https://github.com/swagger-api/apidom/commit/2f34e19dfbb972fa8ce7f2d8b010a5fb7c097bf7)), closes [#304](https://github.com/swagger-api/apidom/issues/304)
- **reference:** add AsyncApi 2.0.0 external resolution ([#334](https://github.com/swagger-api/apidom/issues/334)) ([b3a3914](https://github.com/swagger-api/apidom/commit/b3a391481360004d3d4a56c1467cece557442ec8)), closes [#305](https://github.com/swagger-api/apidom/issues/305)
- **reference:** add AsyncApi 2.0.x JSON reference parser ([e3aa9af](https://github.com/swagger-api/apidom/commit/e3aa9af6876979e0fe1eab1d8eac5b5e98a4f271))
- **reference:** add AsyncApi 2.0.x YAML reference parser ([5eea3ba](https://github.com/swagger-api/apidom/commit/5eea3ba69d039ab753f09c4a547d74c509a7f6dd))
- **reference:** add binary parser plugin ([7c52686](https://github.com/swagger-api/apidom/commit/7c526869c1498618a0784b6010ca2a1e68833d33)), closes [#467](https://github.com/swagger-api/apidom/issues/467)
- **reference:** add file resolver implementation ([12a8663](https://github.com/swagger-api/apidom/commit/12a866325ec05d1c4662be0a4be7ad2f69fcf431))
- **reference:** add HTTP resolver implementation ([d00cd7f](https://github.com/swagger-api/apidom/commit/d00cd7f06de155d629fa89d55032f27bf8c143fe))
- **reference:** add infra code for running plugins ([1bb65e9](https://github.com/swagger-api/apidom/commit/1bb65e931f5d844a59d3631e5bca930d06bc0e0b))
- **reference:** add json reference parser ([a09311a](https://github.com/swagger-api/apidom/commit/a09311afbfa98dbef0b548c415840cac6d09bb08))
- **reference:** add naive support for keyword ([15880a8](https://github.com/swagger-api/apidom/commit/15880a8426b566ea6615c58a9f1265b2fb16264b)), closes [#371](https://github.com/swagger-api/apidom/issues/371)
- **reference:** add OAS 3.1 Example.externalValue dereference ([751188f](https://github.com/swagger-api/apidom/commit/751188fc92ee883535fa58a57a9683414b3765a0)), closes [#467](https://github.com/swagger-api/apidom/issues/467)
- **reference:** add OAS 3.1 Example.externalValue ext. resolution ([fd93841](https://github.com/swagger-api/apidom/commit/fd93841a1725b0f8ea7aee0971c3784bdf7e7c20)), closes [#467](https://github.com/swagger-api/apidom/issues/467)
- **reference:** add OpenApi 3.1.x JSON reference parser ([dda56c8](https://github.com/swagger-api/apidom/commit/dda56c8245a91181b10f22f432e7ea809c2ce672))
- **reference:** add OpenApi 3.1.x YAML reference parser ([f7301fc](https://github.com/swagger-api/apidom/commit/f7301fca32f837ee68c6da46707d664ef1c895d4))
- **reference:** add parsing machinery ([c050ae0](https://github.com/swagger-api/apidom/commit/c050ae0feab59caef78066c723beac0cd530b386))
- **reference:** add POC implementation of JSON Schema deference ([f585e1f](https://github.com/swagger-api/apidom/commit/f585e1f7f3bfedfaa2065c37a7ab9369ddd2dc07)), closes [#366](https://github.com/swagger-api/apidom/issues/366)
- **reference:** add predicate for Reference like elements ([23f3a87](https://github.com/swagger-api/apidom/commit/23f3a871314181049ad11a15bbc8c37cfaad55c6))
- **reference:** add primitive dereference api ([8c0b2d8](https://github.com/swagger-api/apidom/commit/8c0b2d894dbd93265b545309454b70e3a730ead4))
- **reference:** add public library API ([243e832](https://github.com/swagger-api/apidom/commit/243e83233eddc60389012e40dcaad980a455fa5a))
- **reference:** add single point of entry to resolve machinery ([ec46f7d](https://github.com/swagger-api/apidom/commit/ec46f7dd8b79e46c30ed3943400669b2b1725a9e))
- **reference:** add support for $anchor during dereference ([cf0f403](https://github.com/swagger-api/apidom/commit/cf0f403ce32dee1f4117cdb88c10dd3fecb9a8c8)), closes [#376](https://github.com/swagger-api/apidom/issues/376)
- **reference:** add support for OAS 3.1 Link deference ([18c4363](https://github.com/swagger-api/apidom/commit/18c43636fc806f7356d0de61ddb0e23fafea4e6c)), closes [#463](https://github.com/swagger-api/apidom/issues/463)
- **reference:** add support for OAS 3.1 Link ext. resolution ([b001ce8](https://github.com/swagger-api/apidom/commit/b001ce8e3e4ce04659686fd0c62f2ca83d3e509c)), closes [#465](https://github.com/swagger-api/apidom/issues/465)
- **reference:** add support for OAS 3.1 Path Item dereference ([02717c9](https://github.com/swagger-api/apidom/commit/02717c933e65e807a0358c7617b9a708835d9ceb)), closes [#458](https://github.com/swagger-api/apidom/issues/458)
- **reference:** add support for OAS 3.1 Path Item ext. resolution ([24189b8](https://github.com/swagger-api/apidom/commit/24189b86637f43828d29bd92829d08f1a50f67dc)), closes [#459](https://github.com/swagger-api/apidom/issues/459)
- **reference:** add support for resolving ApiDOM agains JSON Pointer ([3f179a0](https://github.com/swagger-api/apidom/commit/3f179a07c016216090e4fc86b9a6c35c59cebf69))
- **reference:** add support for Schema Object external resolution ([1376148](https://github.com/swagger-api/apidom/commit/1376148385236929d66df6b7a0b984bf46e4d485)), closes [#307](https://github.com/swagger-api/apidom/issues/307)
- **reference:** add support for switching external resolution on/off ([16d5696](https://github.com/swagger-api/apidom/commit/16d5696bdda8ccc7e21d3b496d897030dffd1259))
- **reference:** add support for tracking depth ([0fcecf0](https://github.com/swagger-api/apidom/commit/0fcecf0fca9410ab82c08e5809e0d47e0c43fe09)), closes [#320](https://github.com/swagger-api/apidom/issues/320)
- **reference:** add support for unkonwn URIs ([a03f7b7](https://github.com/swagger-api/apidom/commit/a03f7b7b1d857c4ca80ce3ac838f57cc3349d130)), closes [#473](https://github.com/swagger-api/apidom/issues/473)
- **reference:** add support utils for for resolve agorytm ([fb13bd0](https://github.com/swagger-api/apidom/commit/fb13bd0249317e7d0913e2f22a8c1b1b56c90d24))
- **reference:** add various helpers for external resolution ([0e8317d](https://github.com/swagger-api/apidom/commit/0e8317d591f5698c6a0b1f335cc655a0d3f40161))
- **reference:** add yaml reference parser ([19eac45](https://github.com/swagger-api/apidom/commit/19eac45d073eb9347466faf79790229d5bc44d4f))
- **Reference:** annotate Reference elements with classes ([29895a7](https://github.com/swagger-api/apidom/commit/29895a724e5d257f8c421d2a81fb73b64b68aa26))
- **reference:** expose JSON Pointer utils ([b7bd3f2](https://github.com/swagger-api/apidom/commit/b7bd3f23a5aef923d2b89758f12699103b441942))
- **reference:** finalize reference resolver algorithm ([61ab29b](https://github.com/swagger-api/apidom/commit/61ab29b17d9ffb0ae8fdc73e022c9b3711869abe))
- **reference:** ignore external references by configration ([b5e89f8](https://github.com/swagger-api/apidom/commit/b5e89f83dbf1df4a5975ef02c3e3f7e64c2f8eae)), closes [#324](https://github.com/swagger-api/apidom/issues/324)
- **reference:** implement POC of external dereference ([1f99a31](https://github.com/swagger-api/apidom/commit/1f99a3145b4f6da3fccf56f61d2cba983e387641))
- **reference:** implement semantic external resolution ([7d62f24](https://github.com/swagger-api/apidom/commit/7d62f243ce393a0709bb747dd7409fb6ae19fe74))
- **reference:** incorporate dereference into overall achitecture ([#285](https://github.com/swagger-api/apidom/issues/285)) ([f9c6c86](https://github.com/swagger-api/apidom/commit/f9c6c8667acc08c86c84c4d9584100d6884dad90))
- **reference:** introduce mutating transcluder ([481bffa](https://github.com/swagger-api/apidom/commit/481bffa81cc5e7543fd47f3608a2f2f779fe941d))
- **reference:** introduce POC of dereference algorithm ([2b3b69f](https://github.com/swagger-api/apidom/commit/2b3b69fc5f51bc1b3c05026ad7a31c9661d2fca1))
- **reference:** introduce ReferenceSet + abstract Reference ([d46296b](https://github.com/swagger-api/apidom/commit/d46296bf3ea18495f355783f0a26a6c516f17bd7))
- **reference:** introduce resolve strategies framework ([4aa9309](https://github.com/swagger-api/apidom/commit/4aa93092b1a76d989c91d8b9be728aff794f89c7))
- **reference:** prepare for introducing parsing [#1](https://github.com/swagger-api/apidom/issues/1) ([e18e0ad](https://github.com/swagger-api/apidom/commit/e18e0ade32333bdccbe193b58a8a90ee93f23e30))
- **reference:** provide pre-computed refSet for dereferencing ([d9b36a5](https://github.com/swagger-api/apidom/commit/d9b36a5f03f68f44355746c0aeacd70be764119f)), closes [#338](https://github.com/swagger-api/apidom/issues/338)
- **reference:** reduce Reference Objects into ReferenceMap ([bb01d74](https://github.com/swagger-api/apidom/commit/bb01d74ba66c532f29f003ef59b5dfdf03e697ba))
- **reference:** support OAS 3.1 Boolean JSON Schema dereference ([3c8820a](https://github.com/swagger-api/apidom/commit/3c8820a5e632652a7d21916cab4a601ed0271adf)), closes [#471](https://github.com/swagger-api/apidom/issues/471)
- **reference:** support relative URIs in Schema. keywords ([4c550c2](https://github.com/swagger-api/apidom/commit/4c550c2a0ad073457fe50caa5c6dd65870c6ab63)), closes [#371](https://github.com/swagger-api/apidom/issues/371)
- **reference:** use CWD as default baseURI ([85baeb0](https://github.com/swagger-api/apidom/commit/85baeb008ca3918fdd8da982fc94bbaaf66fcc83)), closes [#544](https://github.com/swagger-api/apidom/issues/544)
- setup generic editor repo ([78e6f17](https://github.com/swagger-api/apidom/commit/78e6f176a52bc98b977699b80257f4624afa95a0))
- standardize parse result API ([75fb7db](https://github.com/swagger-api/apidom/commit/75fb7dba665582c45a78fc6baf04d64885f6b989))
- **traversal:** add traverse function ([3d1c64d](https://github.com/swagger-api/apidom/commit/3d1c64dda1d52f761750a901bb0d1206171b4a47))
- type declarations for all packages ([4556b31](https://github.com/swagger-api/apidom/commit/4556b3170db4f2d27d288facb3263ba82cb17036))
- **yaml-ast:** add support for formatting string scalars ([c88b34f](https://github.com/swagger-api/apidom/commit/c88b34f7abc7dd29399949dcb2b83a9391c8a34f)), closes [#115](https://github.com/swagger-api/apidom/issues/115)
- **yaml:** add support for explicit Failsafe schema ([27bf0d4](https://github.com/swagger-api/apidom/commit/27bf0d492c0aaf84716d265f1315259119ce3ea7)), closes [#115](https://github.com/swagger-api/apidom/issues/115)
- **yaml:** add support for explicit JSON schema ([84025b1](https://github.com/swagger-api/apidom/commit/84025b186bb46ba0cb0194876e0e2f8aa5dc52cf)), closes [#115](https://github.com/swagger-api/apidom/issues/115)
- **yaml:** add support for YAML block folded scalars ([038d3af](https://github.com/swagger-api/apidom/commit/038d3afeed363518aee16d62ef33e0aa749c5374)), closes [#249](https://github.com/swagger-api/apidom/issues/249)
- **yaml:** add support for YAML block scalar literals ([e5e4c7a](https://github.com/swagger-api/apidom/commit/e5e4c7ab5361843e68255e9f9fbc292bb205cbf2)), closes [#249](https://github.com/swagger-api/apidom/issues/249)
- **yaml:** normalize scalars before formatting ([542f965](https://github.com/swagger-api/apidom/commit/542f965b3d774e33b491805da0cacf64cc840e5f)), closes [#250](https://github.com/swagger-api/apidom/issues/250)

### Performance Improvements

- **ns-asyncapi-2-0:** introduce visitor shortcut ([78a54dc](https://github.com/swagger-api/apidom/commit/78a54dc5e6f6c1116b30003510f7dedefbce015e)), closes [#398](https://github.com/swagger-api/apidom/issues/398)
- **ns-openapi-3-1:** fold refractor plugins into refracting phase ([7d23400](https://github.com/swagger-api/apidom/commit/7d23400361737f9663a27975fc75aaa80a513214)), closes [#400](https://github.com/swagger-api/apidom/issues/400)
- **ns-openapi-3-1:** introduce visitor shortcut ([91b96ad](https://github.com/swagger-api/apidom/commit/91b96ad4c0056d18b91f7f0bf150934ff88785e9)), closes [#396](https://github.com/swagger-api/apidom/issues/396)
- **parser-adapter-yaml-1-2:** analyze performance profile ([89c8959](https://github.com/swagger-api/apidom/commit/89c89598ed1611290baa1c9a5f9199abf8583ffc)), closes [#408](https://github.com/swagger-api/apidom/issues/408)
- **perser-adaper-json:** fold syntactic analysis phases ([c983b47](https://github.com/swagger-api/apidom/commit/c983b47294ca7e4b204608caa04f1b98d48b16d9)), closes [#406](https://github.com/swagger-api/apidom/issues/406)
- remove transcluder from all semantic parsers ([906bd04](https://github.com/swagger-api/apidom/commit/906bd048f889227b959a7dd61336d4be10fb15c4)), closes [#412](https://github.com/swagger-api/apidom/issues/412)
