import messageBindingsLints from './lint/lints';
import messageBindingsComplete from './complete/message-bindings';
import { FormatMeta } from '../../../apidom-language-types';
import messageBindingsDocs from './docs/message-bindings';

const messageBindingsMeta: FormatMeta = {
  lint: messageBindingsLints,
  completion: messageBindingsComplete,
  documentation: messageBindingsDocs,
};

export default messageBindingsMeta;
