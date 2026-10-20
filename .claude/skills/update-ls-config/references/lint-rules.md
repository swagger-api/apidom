# Lint Rules Reference

Read this during **Phase 5** when generating `lint/allowed-fields.ts` (step 5.4), the per-field rule files (step 5.5) and `lint/index.ts` (step 5.6), and in **Phase 6** when generating element-level lint rules.

> The templates below are copied from real rule files. Before writing a rule, open 2-3 existing rules of the same kind in the same spec directory and match them; `packages/apidom-ls/CLAUDE.md` sections 3 and 4 explain how to pick the linter function and message. Never include `'reference'` in `linterParams`: the refractor already turns Reference Objects into reference elements, which the linter functions handle.

## Contents

- Where rule files live
- File naming
- Diagnostic codes (`codes.ts`)
- 5.4 Generate lint/allowed-fields.ts
- 5.5 Generate per-field rule files (templates, linter function mapping, messages)
- 5.6 Generate lint/index.ts

## Where Rule Files Live

- **Root object**: rules for the fields of the root object (OpenAPI Object, AsyncAPI Object, A2A Agent Card) go flat into `config/{spec}/{version}/lint/`, e.g. `config/openapi/openapi3_2/lint/info--type.ts`, `servers--items-type.ts`, `webhooks--values--type.ts`.
- **Every other object**: rules go into that object's element directory, which is shared by all versions of the spec and scoped with `targetSpecs`, e.g. `config/openapi/info/lint/summary--type.ts` (targets `[...OpenAPI31, ...OpenAPI32]`) or `config/a2a/agent-skill/lint/`.

Example: the Info Object's rules live in `config/openapi/info/lint/`, not in the version directory:

```
config/openapi/info/lint/
├── allowed-fields-2-0--3-0.ts       # title, description, termsOfService, contact, license, version
├── allowed-fields-3-1--3-2.ts       # same plus summary (added in OpenAPI 3.1)
├── contact--type.ts
├── description--type.ts
├── license--type.ts
├── summary--type.ts                 # targetSpecs: [...OpenAPI31, ...OpenAPI32]
├── terms-of-service--format-uri.ts
├── terms-of-service--type.ts
├── title--required.ts
├── title--type.ts
├── version--required.ts
├── version--type.ts
└── index.ts
```

Coverage is per field per element: every field gets a type rule, every required field a `--required` rule, every enum field an `--equals` rule, every URL/URI or email field a `--format-uri` / `--format-email` rule, and every element an allowed-fields rule. `check-ls-coverage.mjs` (Phase 6 step 5 in SKILL.md) checks this mechanically; there is no target number of rules.

## File Naming

`{field}--{rule}.ts`, with the field name **kebab-cased**: `defaultInputModes` becomes `default-input-modes--required.ts`, `termsOfService` becomes `terms-of-service--type.ts`. Suffixes in use:

| Suffix | Rule | Example |
|---|---|---|
| `--type` | type of the value (`apilintType`, `apilintElementOrClass`, or the array/map functions when one file covers both container and members) | `info--type.ts`, `a2a/a2a1/lint/skills--type.ts` |
| `--items-type` | members of an array, paired with a `--type` rule for the container | `openapi/operation/lint/servers--items-type.ts` |
| `--values-type` | values of a map, paired with a `--type` rule for the container | `openapi/server/lint/variables--values-type.ts` |
| `--required` | `hasRequiredField` | `title--required.ts` |
| `--equals` | `apilintValueOrArray` for a fixed set of values | `xml/lint/node-type--equals.ts`, `a2a/api-key-security-scheme/lint/location--equals.ts` |
| `--format-uri` | URI format checks (`apilintValidURI`) | `terms-of-service--format-uri.ts` |
| `--format-email` | email format checks (`apilintValueRegex`, `['.+@{1}.+']`) | `openapi/contact/lint/email--format-email.ts` |
| `--format-uri-reference` | URI-reference format checks; its linter function `apilintValidURIReferenceOrFragment` isn't implemented yet, so don't copy it | `openapi/openapi3_2/lint/self--format-uri-reference.ts` |
| `--pattern-{x}-{y}-{z}` | version value pattern for one spec version (`value--pattern-2-6-0.ts`) | `asyncapi/async-api-version/lint/value--pattern-2-6-0.ts` |

Variants that already exist: a qualifier after the rule when one field has several rules of the same kind (`asyncapi/security-scheme/lint/in--equals-api-key.ts`), and version ranges on allowed-fields files split by version (`allowed-fields-3-1--3-2.ts`). Older OpenAPI root directories use `webhooks--values--type.ts`; prefer `--values-type` for new files. Never invent descriptive names such as `field--required-when-condition.ts`, `--value.ts`, `--values.ts` or `--enum.ts`; `check-ls-coverage.mjs` flags `apilintValueOrArray` rules that are not named `--equals`.

## Diagnostic Codes (codes.ts)

Every rule except `allowedFields` (which uses the shared `ApilintCodes.NOT_ALLOWED_FIELDS`) needs its own entry in `packages/apidom-ls/src/config/codes.ts`. Read the block of the spec version you are extending before adding codes.

**Naming**: `{SPEC}{VERSION}_{ELEMENT}_FIELD_{FIELD}_{RULE}`, all upper snake case, where the element and field names are split on word boundaries:

- `OPENAPI3_2_OPEN_API_FIELD_INFO_TYPE`, `OPENAPI3_2_OPEN_API_FIELD_SERVERS_ITEMS_TYPE`
- `OPENAPI3_2_XML_FIELD_NODE_TYPE_EQUALS`, `OPENAPI3_1_INFO_FIELD_SUMMARY_TYPE`
- `A2A1_AGENT_CARD_FIELD_NAME_TYPE`, `A2A1_AGENT_CARD_FIELD_NAME_REQUIRED`

The prefix names the spec version that introduced the rule, not every version it targets: `info/lint/summary--type.ts` uses `OPENAPI3_1_INFO_FIELD_SUMMARY_TYPE` and targets 3.1 and 3.2. A field that is new in a version gets a code in that version's block even when the rule lives in a shared element directory (`OPENAPI3_2_TAG_FIELD_SUMMARY_TYPE` for `tag/lint/summary--type.ts`).

**Numbering** (see the `OPENAPI3_2` block, `7100000`-`7230300`, and the `A2A1` block, from `9000000`):

- Each spec version has a base: `OPENAPI3_1 = 7000000`, `OPENAPI3_2 = 7100000`, `A2A1 = 9000000`. A new spec takes the next free base after the highest one in the file.
- Each element gets a block of `10000` above the base, declared as a bare entry: `OPENAPI3_2_OPEN_API = 7110000`, `A2A1_AGENT_CARD = 9010000`, `A2A1_AGENT_CAPABILITIES = 9020000`.
- Each field gets the next multiple of `100` in its element block: `..._FIELD_INFO_TYPE = 7110100`, `..._FIELD_SERVERS_TYPE = 7110200`.
- A second rule for the same field follows on the next line without a value, so the enum assigns `+1`: `OPENAPI3_2_OPEN_API_FIELD_INFO_TYPE_REQUIRED` (`7110101`), `OPENAPI3_2_OPEN_API_FIELD_SERVERS_ITEMS_TYPE` (`7110201`). A2A instead gives each required rule its own `100` slot after the type rules (`A2A1_AGENT_CARD_FIELD_NAME_REQUIRED = 9011600`); follow whichever pattern the block you extend uses. AsyncAPI binding blocks use `+1` for range rules too (`ASYNCAPI2_IBMMQ_SERVER_BINDING_FIELD_HEART_BEAT_INTERVAL_MAXIMUM` after its `_TYPE`); the first ROS 2 draft gave `DOMAIN_ID_MAXIMUM` and `ROLE_EQUALS` their own `100` slots and had to be renumbered in review.

Every code value must be unique; `review-ls-changes` checks this with `grep -oE "= [0-9]+," codes.ts | sort | uniq -d`.

When a field's first rule is dropped before release, move the explicit value to the rule that is now first, otherwise the `+1` entries shift silently: removing `ASYNCAPI3_ROS2_OPERATION_BINDING_FIELD_ROLE_TYPE = 2250100` in the PR #5264 review made `ROLE_EQUALS` the `2250100` entry, and the tests that compare full diagnostics had to follow.

#### 5.4 Generate lint/allowed-fields.ts

Defines which fields are allowed in the element. `linterParams[0]` is the **array** of field names; the optional second parameter is a prefix for patterned extension fields. Use `'x-'` when the spec allows Specification Extensions on the object. From `config/openapi/openapi3_2/lint/allowed-fields.ts`:

```typescript
import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { OpenAPI32 } from '../../target-specs.ts';

const allowedFieldsLint: LinterMeta = {
  code: ApilintCodes.NOT_ALLOWED_FIELDS,
  source: 'apilint',
  message: 'Object includes not allowed fields',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'allowedFields',
  linterParams: [
    [
      'openapi',
      'info',
      'jsonSchemaDialect',
      '$self',
      'servers',
      'paths',
      'webhooks',
      'components',
      'security',
      'tags',
      'externalDocs',
    ],
    'x-',
  ],
  marker: 'key',
  targetSpecs: OpenAPI32,
};

export default allowedFieldsLint;
```

When the spec has no extension mechanism, pass only the field array, as in `config/a2a/a2a1/lint/allowed-fields.ts`:

```typescript
  linterParams: [
    [
      'name',
      'description',
      'version',
      // ... every field of the Agent Card
    ],
  ],
```

For objects that can be replaced by a Reference Object, the field list does not include `$ref`; instead the rule is skipped when `$ref` is present, as in `config/openapi/parameter/lint/allowed-fields-3-1--3-2.ts`:

```typescript
  conditions: [
    {
      function: 'missingField',
      params: ['$ref'],
    },
  ],
```

#### 5.5 Generate per-field rule files

**Type rule for a field whose value is a spec object** (from `config/openapi/openapi3_2/lint/info--type.ts`):

```typescript
import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { OpenAPI32 } from '../../target-specs.ts';

const infoTypeLint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_2_OPEN_API_FIELD_INFO_TYPE,
  source: 'apilint',
  message: 'info must be an object',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintElementOrClass',
  linterParams: [['info']],
  marker: 'value',
  target: 'info',
  data: {},
  targetSpecs: OpenAPI32,
};

export default infoTypeLint;
```

`linterParams[0]` lists **element names** (the value of `this.element` in the namespace class, e.g. `'info'`, `'pathItem'`, `'agentSkill'`) or element classes, never class names such as `'InfoElement'`.

**Required field** (from `config/openapi/info/lint/title--required.ts`). Required rules have no `target`; they run on the object and name the field in `linterParams`:

```typescript
const titleRequiredLint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_0_INFO_FIELD_TITLE_REQUIRED,
  source: 'apilint',
  message: "should always have a 'title'",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'hasRequiredField',
  linterParams: ['title'],
  marker: 'key',
  data: {
    quickFix: [
      {
        message: "add 'title' field",
        action: 'addChild',
        snippetYaml: 'title: \n  ',
        snippetJson: '"title": "",\n    ',
      },
    ],
  },
  targetSpecs: [...OpenAPI2, ...OpenAPI3],
};
```

**Fixed set of values** (from `config/a2a/api-key-security-scheme/lint/location--equals.ts`). `linterParams[0]` is the array of allowed values:

```typescript
const locationEqualsLint: LinterMeta = {
  code: ApilintCodes.A2A1_API_KEY_SECURITY_SCHEME_FIELD_LOCATION_EQUALS,
  source: 'apilint',
  message: "'location' must be one of allowed values: query, header, cookie",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintValueOrArray',
  linterParams: [['query', 'header', 'cookie']],
  marker: 'value',
  target: 'location',
  data: {},
  targetSpecs: A2A1,
};
```

Don't add a `--type` rule next to an `--equals` rule for a string enum: `apilintValueOrArray` already rejects numbers and other non-strings, so both rules report the same value (`role: 1` got two diagnostics until the PR #5264 review removed ROS 2 `role--type.ts`). Existing enum fields have only the `--equals` rule (`bindings/http/operation-binding/lint/0-3-0/method--equals.ts`, `bindings/amqp/channel-binding/lint/0-3-0/is--equals.ts`).

When the allowed values depend on another field, add a `conditions` entry, as `config/asyncapi/security-scheme/lint/in--equals-api-key.ts` does with `apilintContainsValue` on `type`. Condition `targets` paths are resolved from the object the rule runs on (`checkConditions` in `src/utils/utils.ts`): a key segment descends, and each `parent` segment climbs to the enclosing object (two levels: member, then object). From an operation binding, `parent.parent.action` reaches the Operation's `action`. If a segment is missing, the condition fails and the rule is skipped, so the same binding under `components.operationBindings` is not checked. When the general `--equals` rule stays, give the dependent rule a second condition that the value is in the *other* set, so a value that is wrong everywhere gets one diagnostic, not two (`bindings/ros2/operation-binding/lint/0-1-0/role--equals-send.ts`, PR #5264):

```typescript
  linterParams: [['publisher', 'action_client', 'service_client']],
  target: 'role',
  conditions: [
    // ... the bindingVersion condition of the directory
    {
      targets: [{ path: 'parent.parent.action' }],
      function: 'apilintValueOrArray',
      params: [['send']],
    },
    {
      targets: [{ path: 'role' }],
      function: 'apilintValueOrArray',
      params: [['subscriber', 'action_server', 'service_server']],
    },
  ],
```

Name the second rule with a qualifier (`role--equals-send.ts`, `role--equals-receive.ts`) and give it a `+1` code.

### Linter Function Mapping

| Field value | linterFunction | linterParams | Example file |
|---|---|---|---|
| Primitive | `apilintType` | `['string']` (or `'number'`, `'boolean'`, `'array'`, `'object'`) | `info/lint/summary--type.ts` |
| Single spec object | `apilintElementOrClass` | `[['info']]` | `openapi3_2/lint/info--type.ts` |
| Array of spec objects | `apilintArrayOfElementsOrClasses` | `[['server']]` | `openapi3_2/lint/servers--items-type.ts`, `a2a/a2a1/lint/skills--type.ts` |
| Map of spec objects | `apilintChildrenOfElementsOrClasses` | `[['pathItem']]` | `openapi3_2/lint/webhooks--values--type.ts`, `a2a/a2a1/lint/security-schemes--type.ts` |
| Required field | `hasRequiredField` | `['title']` | `info/lint/title--required.ts` |
| Fixed set of values | `apilintValueOrArray` | `[['query', 'header', 'cookie']]` | `a2a/api-key-security-scheme/lint/location--equals.ts` |
| Allowed fields | `allowedFields` | `[[...fields], 'x-']`, or `[[...fields]]` without extensions | `openapi3_2/lint/allowed-fields.ts`, `a2a/a2a1/lint/allowed-fields.ts` |
| Integer, range | `apilintNumber`, `apilintMinimum`, `apilintMaximum` | `[true, true, true]` (integer, non-negative, zero allowed), `[0]`, `[231]` | `bindings/ibmmq/server-binding/lint/latest/heart-beat-internal--maximum.ts` (ROS 2 `domain-id--maximum.ts` in #5264) |

`apilintMinimum` and `apilintMaximum` return `false` for non-numbers, so a string value would get both the type error and the range error: give range rules a `{ targets: [{ path: '{field}' }], function: 'apilintElementOrClass', params: [['number']] }` condition, as `bindings/mqtt/operation-binding/lint/0-2-0/message-expiry-interval--minimum.ts` does.

For a field whose members can be Reference Objects, the names in `linterParams` must match both the unresolved reference and the element it is replaced with by dereferencing. `apilintElementOrClass` (`services/validation/linter-functions.ts`) accepts an element whose name, `referenced-element` meta or class is listed, and the dereference strategy copies `referenced-element` onto the resolved element. When the namespace sets `referenced-element` to the element name (`'server'`), `[['server']]` covers both. When it sets another value, list both names, as PR #5264 does in `asyncapi/channel/lint/servers--type.ts` (`[['server', 'channel-servers']]`) and `asyncapi/components/lint/reply-addresses--values-type.ts` (`[['operationReplyAddress', 'operation-reply-address']]`). Find the value with `grep -rn "setMetaProperty('referenced-element'" packages/{namespace}/src`. `[['reference']]` alone, the first draft of the channel `servers` rule in PR #5264, reports every dereferenced document.

`apilintChildrenOfElementsOrClasses` returns `false` for anything that is not an object, so using it on an array field reports every valid array as an error. `apilintArrayOfElementsOrClasses` returns `false` for anything that is not an array. Check whether the namespace element extends `ArrayElement` or `ObjectElement` before choosing (`packages/apidom-ls/CLAUDE.md` section 3). All linter functions are defined in `packages/apidom-ls/src/services/validation/linter-functions.ts`.

### Messages

Type messages differ between spec directories, so copy the style of the neighbouring rules. Required messages are `should always have a '{field}'` everywhere except A2A, whose `... field` suffix is a known deviation (FOLLOW-UPS 2.15): don't copy it into other specs.

| Directory | Type message | Required message |
|---|---|---|
| `config/openapi/` | `summary must be a string`, `info must be an object` | `should always have a 'title'` |
| `config/asyncapi/` | `'name' value must be a string` | `should always have a 'location'` |
| `config/a2a/` | `'name' must be a string` | `should always have a 'name' field` |

Arrays and maps of objects use the patterns in `packages/apidom-ls/CLAUDE.md` section 4 (`"'skills' must be an array of Agent Skill Objects"`). Fixed sets of values use `"'{field}' must be one of allowed values"`, optionally followed by `: value1, value2`. Never use `"must contain '{field}' field"`.

Name a spec object in a type message only when the namespace has an element for it (`'tags' must be an array of Tags` in `asyncapi/server/lint/tags--type.ts`). A nested object the namespace keeps as a plain `ObjectElement` gets the generic message: `'qosPolicies' value must be an object` (ROS 2, after the PR #5264 review), like `'queue' value must be an object` in `bindings/sqs/channel-binding/lint/0-3-0/queue--type.ts`.

Empty binding objects' `allowedFields` rules say `This object MUST NOT contain any properties. Its name is reserved for future use.` Don't turn descriptive spec prose into a diagnostic: the ROS 2 message binding README says `While this object DOES NOT contain any ROS 2 specific properties, ...`, which as a diagnostic reads as if properties were missing; the rule uses `This object MUST NOT contain any properties.` (matching the other empty bindings, as the reviewer suggested).

#### 5.6 Generate lint/index.ts

Aggregates all lint rules of one directory. Every rule file must be imported here; a file that isn't listed never runs.

```typescript
import allowedFieldsLint from './allowed-fields.ts';
import infoRequiredLint from './info--required.ts';
import infoTypeLint from './info--type.ts';
// ... import every rule file in the directory

const lints = [
  allowedFieldsLint,
  infoRequiredLint,
  infoTypeLint,
  // ... list every imported rule
];

export default lints;
```
