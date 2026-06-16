import { FormatMeta } from '../../../apidom-language-types.ts';
import lint from './lint/index.ts';
import completion from './completion.ts';

const meta: FormatMeta = {
  lint,
  completion,
};

export default meta;
