import messageComplete from './complete/message';
import messageDocs from './docs/message';
import { FormatMeta } from '../../../apidom-language-types';
import messageLints from './lint/lints';

const messageMeta: FormatMeta = {
  documentation: messageDocs,
  completion: messageComplete,
  lint: messageLints,
};

export default messageMeta;
