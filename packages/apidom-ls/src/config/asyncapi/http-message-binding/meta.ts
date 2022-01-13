import { FormatMeta } from '../../../apidom-language-types';
import httpMessageBindingLints from './lint/lints';
import httpMessageBindingCompleteJson from './complete/http-message-binding';
import httpMessageBindingDocs from './docs/http-message-binding';

const httpMessageBindingMeta: FormatMeta = {
  lint: httpMessageBindingLints,
  completion: httpMessageBindingCompleteJson,
  documentation: httpMessageBindingDocs,
};

export default httpMessageBindingMeta;
