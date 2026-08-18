# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.12.0](https://github.com/swagger-api/apidom/compare/v1.11.3...v1.12.0) (2026-08-03)

### Features

- support a2a in apidom (PROVCON-5343) ([2150345](https://github.com/swagger-api/apidom/commit/21503453894940443b344b618fde523db37ce893))
- update for pr reviews (PROVCON-5343) ([51baadb](https://github.com/swagger-api/apidom/commit/51baadb015c9c98013c526201857b6cf1edad237))
- update test for a2a 1.0.1 (PROVCON-5343) ([9e72659](https://github.com/swagger-api/apidom/commit/9e72659ad5c4d6e8b56e0ce24ef128cee105825f))

## 1.11.1 (2026-05-27)

### Features

- **a2a:** initial parser adapter for A2A v1 AgentCard documents in YAML 1.2 format. Uses structural detection (`capabilities` + `skills` co-presence) since A2A has no version discriminator field.
