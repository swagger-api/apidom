import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const tagsItemsTypeLint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_0_OPEN_API_FIELD_TAGS_ITEMS_TYPE,
  source: 'apilint',
  message: 'tags must be an array of Tag Objects',
  severity: 1,
  linterFunction: 'apilintArrayOfElementsOrClasses',
  linterParams: [['tag']],
  marker: 'key',
  target: 'tags',
  data: {},
};

export default tagsItemsTypeLint;
