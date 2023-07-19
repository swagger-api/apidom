import { config } from '../src/config/config';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { LinterGivenFormat, LinterMeta, Metadata } from '../src/apidom-language-types';
import { deepCopyMetadata } from '../src/utils/utils';

// eslint-disable-next-line import/prefer-default-export
export function metadata(): Metadata {
  const customConfig = deepCopyMetadata(config() as Metadata);

  const camelCasesSchemaLint: LinterMeta = {
    name: 'SB-API-050-property-names',
    description: 'keys MUST follow camelCase',
    recommended: true,
    code: 20001,
    source: 'apilint',
    message: 'keys MUST follow camelCase',
    given: ['$.components.schemas.*.properties.*', '$.components.parameters.*'],
    givenFormat: LinterGivenFormat.JSONPATH,
    severity: 1,
    linterFunction: 'apilintKeyCasing',
    linterParams: ['camel'],
    marker: 'key',
    data: {},
  };

  const camelCasesQueryParamsLint: LinterMeta = {
    name: 'SB-API-050-query-parameter-names',
    description: 'query parameter names must be camelCase',
    recommended: true,
    given: '$.components.parameters.*',
    givenFormat: LinterGivenFormat.JSONPATH,
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

  const camelCaseTitle: LinterMeta = {
    name: 'SB-API-052-title',
    description: 'title MUST follow camelCase',
    recommended: true,
    code: 20001,
    source: 'apilint',
    message: 'title MUST follow camelCase',
    given: '$.info.title',
    givenFormat: LinterGivenFormat.JSONPATH,
    severity: 1,
    linterFunction: 'apilintValueCasing',
    linterParams: ['camel'],
    marker: 'key',
    data: {},
  };
  customConfig.rules = {
    openapi: {
      lint: [camelCasesQueryParamsLint, camelCasesSchemaLint, camelCaseTitle],
    },
  };

  return customConfig;
}
