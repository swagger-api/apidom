import contactLints from './lint/lints';
import contactComplete from './complete/contact';
import { FormatMeta } from '../../../apidom-language-types';

const contactMeta: FormatMeta = {
  lint: contactLints,
  completion: contactComplete,
};

export default contactMeta;
