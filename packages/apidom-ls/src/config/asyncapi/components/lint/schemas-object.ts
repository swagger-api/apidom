import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const componentsSchemasObjectLint: LinterMeta = {
  code: ApilintCodes.COMPONENTS_SCHEMAS_OBJECT,
  source: 'apilint',
  message: 'schemas must be an object',
  severity: 1,
  linterFunction: 'apilintType',
  linterParams: ['object'],
  marker: 'value',
  target: 'schemas',
  data: {},
};

export default componentsSchemasObjectLint;
