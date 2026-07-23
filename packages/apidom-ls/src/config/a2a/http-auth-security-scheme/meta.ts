import { FormatMeta } from '../../../apidom-language-types.ts';
import lint from './lint/index.ts';
import completion from './completion.ts';
import documentation from './documentation.ts';

const meta: FormatMeta = {
  lint,
  completion,
  documentation,
};

export default meta;
