import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const serverItemsTypeLint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_0_OPERATION_FIELD_SERVERS_ITEMS_TYPE,
  source: 'apilint',
  message: 'servers must be an array of Server Objects',
  severity: 1,
  linterFunction: 'apilintArrayOfElementsOrClasses',
  linterParams: [['server']],
  marker: 'key',
  target: 'servers',
  data: {},
};

export default serverItemsTypeLint;
