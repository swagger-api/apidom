import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const schemaAdditionalPropertiesLint: LinterMeta = {
  code: ApilintCodes.SCHEMA_ADDITIONALPROPERTIES,
  source: 'apilint',
  message: 'additionalProperties must be a schema',
  severity: 1,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['schema'],
  marker: 'value',
  target: 'additionalProperties',
  data: {},
};

export default schemaAdditionalPropertiesLint;
