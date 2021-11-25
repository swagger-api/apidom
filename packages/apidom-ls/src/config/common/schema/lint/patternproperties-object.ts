import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const schemaPatternPropertiesObjectLint: LinterMeta = {
  code: ApilintCodes.SCHEMA_PATTERNPROPERTIES_OBJECT,
  source: 'apilint',
  message: 'patternProperties must be an object',
  severity: 1,
  linterFunction: 'apilintType',
  linterParams: ['object'],
  marker: 'value',
  target: 'patternProperties',
  data: {},
};

export default schemaPatternPropertiesObjectLint;
