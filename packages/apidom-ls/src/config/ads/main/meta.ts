import mainLints from './lint/lints';
import mainComplete from './complete/main';
import { FormatMeta } from '../../../apidom-language-types';
import mainDocs from './docs/main';

const mainMeta: FormatMeta = {
  lint: mainLints,
  completion: mainComplete,
  documentation: mainDocs,
};

export default mainMeta;
