import operationComplete from '../operation/completion';
import lint from './lint';
import documentation from '../operation/documentation';
import { FormatMeta } from '../../../apidom-language-types';

const meta: FormatMeta = {
  lint,
  documentation,
  // TODO(Francesco): solve this
  completion: operationComplete.slice(0, -2),
};

export default meta;
