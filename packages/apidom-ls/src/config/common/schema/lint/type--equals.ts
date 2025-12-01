import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { OpenAPI2, OpenAPI30 } from '../../../openapi/target-specs.ts';

const typeEqualsLint: LinterMeta = {
  code: ApilintCodes.SCHEMA_TYPE,
  source: 'apilint',
  message:
    'should be equal to one of the allowed values allowedValues: array, boolean, integer, number, object, string',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintValueOrArray',
  linterParams: [['boolean', 'object', 'array', 'number', 'string', 'integer']],
  marker: 'value',
  target: 'type',
  data: {
    quickFix: [
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
  targetSpecs: [...OpenAPI2, ...OpenAPI30],
};

export default typeEqualsLint;
