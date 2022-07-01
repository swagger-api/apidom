import completion from './completion';
import documentation from './documentation';
import lint from './lint';
import { FormatMeta } from '../../../apidom-language-types';

const meta: FormatMeta = {
  lint,
  documentation,
  completion,
};

export default meta;
