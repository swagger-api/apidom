import { config } from '../src/config/config.ts';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { LinterMeta, Metadata } from '../src/apidom-language-types.ts';
import { deepCopyMetadata } from '../src/utils/utils.ts';

// eslint-disable-next-line import/prefer-default-export
export function metadata(): Metadata {
  const customConfig = deepCopyMetadata(config() as Metadata);

  const camelCasesSchemaLint: LinterMeta = {
    name: 'SB-API-050-property-names',
    description: 'property names must be camelCase and alphanumeric',
    recommended: true,
    code: 20001,
    source: 'apilint',
    message: 'properties MUST follow camelCase',
    severity: 1,
    linterFunction: 'apilintKeyCasing',
    linterParams: ['camel'],
    marker: 'key',
    conditions: [
      {
        targets: [{ path: 'parent' }],
        function: 'apilintElementOrClass',
        params: [['json-schema-properties']],
      },
    ],
    data: {},
  };

  const camelCasesQueryParamsLint: LinterMeta = {
    name: 'SB-API-050-query-parameter-names',
    description: 'query parameter names must be camelCase',
    recommended: true,
    given: ['parameter'],
    code: 20002,
    source: 'apilint',
    message: 'parameter names MUST follow camelCase',
    severity: 1,
    linterFunction: 'apilintValueCasing',
    linterParams: ['camel'],
    target: 'name',
    markerTarget: 'name',
    marker: 'key',
    conditions: [
      {
        targets: [{ path: 'in' }],
        function: 'apilintValueOrArray',
        params: [['query']],
      },
    ],
    data: {},
  };

  const camelCasesPathSegments: LinterMeta = {
    name: 'SB-API-051-path-segments',
    description: 'path segments must be kebab-case',
    recommended: true,
    code: 20003,
    source: 'apilint',
    message: 'path segments MUST follow kebab-case (lower case and separated with hyphens).',
    severity: 1,
    linterFunction: 'apilintKeyRegex',
    linterParams: ['^(/|[a-z0-9-.]+|{[a-zA-Z0-9_]+})+$'],
    marker: 'key',
    conditions: [
      {
        targets: [{ path: 'parent' }],
        function: 'apilintElementOrClass',
        params: [['paths']],
      },
    ],
    data: {},
  };

  customConfig.metadataMaps.openapi?.schema?.lint?.push(camelCasesSchemaLint);
  /*  customConfig.metadataMaps.openapi.parameter = {
    lint: [camelCasesQueryParamsLint],
  }; */
  customConfig.rules = {
    openapi: {
      lint: [camelCasesQueryParamsLint],
    },
  };
  customConfig.metadataMaps.openapi.pathItem = {
    lint: [camelCasesPathSegments],
  };

  return customConfig;
}
