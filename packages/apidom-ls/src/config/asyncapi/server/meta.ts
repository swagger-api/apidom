import serverLints from './lint/lints';
import serverComplete from './complete/server';
import { FormatMeta } from '../../../apidom-language-types';
import serverDocs from './docs/server';

const serverMeta: FormatMeta = {
  lint: serverLints,
  completion: serverComplete,
  documentation: serverDocs,
};

export default serverMeta;
