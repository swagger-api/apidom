import { config } from '../src/config/config';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { LinterMeta, Metadata } from '../src/apidom-language-types';

// eslint-disable-next-line import/prefer-default-export
export function metadata(): Metadata {
  const customConfig = config() as Metadata;

  const camelCasesSchemaLint: LinterMeta = {
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
  customConfig.metadataMaps.openapi.parameter = {
    lint: [camelCasesQueryParamsLint],
  };
  customConfig.metadataMaps.openapi.pathItem = {
    lint: [camelCasesPathSegments],
  };

  return customConfig;
}
