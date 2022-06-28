import lint from './lint';
import documentation from './documentation';
import completion from './completion';
import { FormatMeta } from '../../../../../apidom-language-types';

const meta: FormatMeta = {
  lint,
  completion,
  documentation,
};

export default meta;
