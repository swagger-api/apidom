import serverBindingsLints from './lint/lints';
import serverBindingsComplete from './complete/server-bindings';
import { FormatMeta } from '../../../apidom-language-types';
import serverBindingsDocs from './docs/server-bindings';

const serverBindingsMeta: FormatMeta = {
  lint: serverBindingsLints,
  completion: serverBindingsComplete,
  documentation: serverBindingsDocs,
};

export default serverBindingsMeta;
