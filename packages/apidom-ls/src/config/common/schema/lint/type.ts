import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const schemaTypeLint: LinterMeta = {
  code: ApilintCodes.SCHEMA_TYPE,
  source: 'apilint',
  message: 'type must be one of allowed values',
  severity: 1,
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
};

export default schemaTypeLint;
