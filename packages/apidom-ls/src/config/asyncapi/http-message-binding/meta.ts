import { FormatMeta } from '../../../apidom-language-types';
import httpMessageBindingLints from './lint/lints';

const httpMessageBindingMeta: FormatMeta = {
  lint: httpMessageBindingLints,
};

export default httpMessageBindingMeta;
