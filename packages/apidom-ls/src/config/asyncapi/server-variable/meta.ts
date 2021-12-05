import { FormatMeta } from '../../../apidom-language-types';
import serverVariableLints from './lint/lints';
import serverVariableComplete from './complete/server-variable';
import serverVariableDocs from './docs/server-variable';

const serverVariableMeta: FormatMeta = {
  lint: serverVariableLints,
  completion: serverVariableComplete,
  documentation: serverVariableDocs,
};

export default serverVariableMeta;
