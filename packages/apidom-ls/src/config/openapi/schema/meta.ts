import completion from './completion.ts';
import documentation from './documentaiton.ts';
import lint from './lint.ts';
import { FormatMeta } from '../../../apidom-language-types.ts';

const meta: FormatMeta = {
  lint,
  completion,
  documentation,
};

export default meta;
