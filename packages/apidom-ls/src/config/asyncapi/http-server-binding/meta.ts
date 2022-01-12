import { FormatMeta } from '../../../apidom-language-types';
import httpServerBindingLints from './lint/lints';

const httpServerBindingMeta: FormatMeta = {
  lint: httpServerBindingLints,
};

export default httpServerBindingMeta;
