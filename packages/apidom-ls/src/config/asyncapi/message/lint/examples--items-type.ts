import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const examplesItemsTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_MESSAGE_FIELD_EXAMPLES_ITEMS_TYPE,
  source: 'apilint',
  message: "'examples' must be an array of Message Example Objects",
  severity: 1,
  linterFunction: 'apilintArrayOfElementsOrClasses',
  linterParams: [['messageExample']],
  marker: 'key',
  target: 'examples',
  data: {},
};

export default examplesItemsTypeLint;
