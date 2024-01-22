import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';
import { AsyncAPI2 } from '../../../asyncapi/target-specs';
import { OpenAPI31 } from '../../../openapi/target-specs';

// eslint-disable-next-line @typescript-eslint/naming-convention
const typeEqualsOpenAPI3_1__AsyncAPI2Lint: LinterMeta = {
  code: ApilintCodes.SCHEMA_TYPE,
  source: 'apilint',
  message: 'type must be one of allowed values',
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
