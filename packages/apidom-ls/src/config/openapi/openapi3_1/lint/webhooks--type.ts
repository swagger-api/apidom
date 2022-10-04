// OPENAPI3_1_WEBHOOKS_TYPE
import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const webhooksLint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_1_OPEN_API_FIELD_WEBHOOKS_TYPE,
  source: 'apilint',
  message: '"webhooks" members must be Path Item Object',
  severity: 1,
  linterFunction: 'apilintChildrenOfElementsOrClasses',
  linterParams: [['pathItem']],
  marker: 'key',
  markerTarget: 'webhooks',
  target: 'webhooks',
  data: {},
};

export default webhooksLint;
