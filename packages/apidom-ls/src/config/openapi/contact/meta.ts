import contactLints from './lint/lints';
import contactComplete from './complete/contact';
import { FormatMeta } from '../../../apidom-language-types';
import contactDocs from './docs/contact';

const contactMeta: FormatMeta = {
  lint: contactLints,
  completion: contactComplete,
  documentation: contactDocs,
};

export default contactMeta;
