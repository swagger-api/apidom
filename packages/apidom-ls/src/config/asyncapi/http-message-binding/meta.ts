import lint from './lint';
import completion from './completion';
import documentation from './documentation';
import { FormatMeta } from '../../../apidom-language-types';

const meta: FormatMeta = {
  lint,
  completion,
  documentation,
};

export default meta;
