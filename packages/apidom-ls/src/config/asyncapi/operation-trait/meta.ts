import lint from './lint/index.ts';
import completion from './completion.ts';
import documentation from './documentation.ts';
import { FormatMeta } from '../../../apidom-language-types.ts';

const meta: FormatMeta = {
  lint,
  documentation,
  completion,
};

export default meta;
