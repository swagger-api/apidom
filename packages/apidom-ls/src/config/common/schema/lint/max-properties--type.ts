import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const maxPropertiesTypeLint: LinterMeta = {
  code: ApilintCodes.SCHEMA_MAXPROPERTIES,
  source: 'apilint',
  message: 'maxProperties must be a non-negative integer',
  severity: 1,
  linterFunction: 'apilintNumber',
  linterParams: [true, true, true],
  marker: 'value',
  target: 'maxProperties',
  data: {},
};

export default maxPropertiesTypeLint;
