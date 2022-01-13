import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const componentsSchemasLint: LinterMeta = {
  code: ApilintCodes.COMPONENTS_SCHEMAS,
  source: 'apilint',
  message: '"schemas" members must be Schema object',
  severity: 1,
  linterFunction: 'apilintChildrenOfElementsOrClasess',
  linterParams: [['schema']],
  marker: 'key',
  markerTarget: 'schemas',
  target: 'schemas',
  data: {},
};

export default componentsSchemasLint;
