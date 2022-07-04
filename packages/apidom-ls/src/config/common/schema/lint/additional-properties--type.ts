import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const additionalPropertiesTypeLint: LinterMeta = {
  code: ApilintCodes.SCHEMA_ADDITIONALPROPERTIES,
  source: 'apilint',
  message: 'additionalProperties must be a Schema or a Boolean',
  severity: 1,
  linterFunction: 'apilintElementOrClass',
  linterParams: [['schema', 'boolean']],
  marker: 'value',
  target: 'additionalProperties',
  data: {},
};

export default additionalPropertiesTypeLint;
