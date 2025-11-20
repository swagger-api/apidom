import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { AsyncAPI2 } from '../../../asyncapi/target-specs.ts';
import { OpenAPI31 } from '../../../openapi/target-specs.ts';

// eslint-disable-next-line @typescript-eslint/naming-convention
const typeEqualsOpenAPI3_1__AsyncAPI2Lint: LinterMeta = {
  code: ApilintCodes.SCHEMA_TYPE,
  source: 'apilint',
  message:
    'should be equal to one of the allowed values allowedValues: boolean, object, array, number, string, integer null',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintValueOrArray',
  linterParams: [['null', 'boolean', 'object', 'array', 'number', 'string', 'integer'], true],
  marker: 'value',
  target: 'type',
  data: {
    quickFix: [
      {
        message: "update to 'null'",
        action: 'updateValue',
        functionParams: ['null'],
      },
      {
        message: "update to 'boolean'",
        action: 'updateValue',
        functionParams: ['boolean'],
      },
      {
        message: "update to 'object'",
        action: 'updateValue',
        functionParams: ['object'],
      },
      {
        message: "update to 'array'",
        action: 'updateValue',
        functionParams: ['array'],
      },
      {
        message: "update to 'number'",
        action: 'updateValue',
        functionParams: ['null'],
      },
      {
        message: "update to 'string'",
        action: 'updateValue',
        functionParams: ['string'],
      },
      {
        message: "update to 'integer'",
        action: 'updateValue',
        functionParams: ['integer'],
      },
    ],
  },
  targetSpecs: [...AsyncAPI2, ...OpenAPI31],
};

export default typeEqualsOpenAPI3_1__AsyncAPI2Lint;
