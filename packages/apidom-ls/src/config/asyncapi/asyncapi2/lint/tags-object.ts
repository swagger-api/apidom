import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const tagsObjectLint: LinterMeta = {
  code: ApilintCodes.TAGS_OBJECT,
  source: 'apilint',
  message: 'tags must be an object',
  severity: 1,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['tags'],
  marker: 'value',
  target: 'tags',
  data: {},
};

export default tagsObjectLint;
