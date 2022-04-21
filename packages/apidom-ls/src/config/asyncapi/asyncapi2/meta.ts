import { FormatMeta } from '../../../apidom-language-types';
import lint from './lint';
import completion from './completion';
import documentation from './documentation';

const meta: FormatMeta = {
  lint,
  completion,
  documentation,
};

export default meta;
