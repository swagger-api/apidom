import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const schemaPropertiesObjectLint: LinterMeta = {
  code: ApilintCodes.SCHEMA_PROPERTIES_OBJECT,
  source: 'apilint',
  message: 'properties must be an object',
  severity: 1,
  linterFunction: 'apilintType',
  linterParams: ['object'],
  marker: 'value',
  target: 'properties',
  data: {},
};

export default schemaPropertiesObjectLint;
