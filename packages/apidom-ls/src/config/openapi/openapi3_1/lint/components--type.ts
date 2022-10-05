import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const componentsTypeLint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_1_OPEN_API_FIELD_COMPONENTS_TYPE,
  source: 'apilint',
  message: 'components must be an object',
  severity: 1,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['components'],
  marker: 'value',
  target: 'components',
  data: {},
};

export default componentsTypeLint;
