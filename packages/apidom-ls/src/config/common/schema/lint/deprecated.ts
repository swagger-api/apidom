import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const schemaDeprecatedLint: LinterMeta = {
  code: ApilintCodes.SCHEMA_READONLY,
  source: 'deprecated',
  message: 'deprecated must be a boolean',
  severity: 1,
  linterFunction: 'apilintType',
  linterParams: ['boolean'],
  marker: 'value',
  target: 'deprecated',
  targetSpecs: [
    { namespace: 'asyncapi', version: '2.0.0' },
    { namespace: 'asyncapi', version: '2.1.0' },
    { namespace: 'asyncapi', version: '2.2.0' },
  ],
  data: {},
};

export default schemaDeprecatedLint;
