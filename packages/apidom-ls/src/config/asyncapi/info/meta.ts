import infoLints from './lint/lints';
import infoComplete from './complete/info';
import { FormatMeta } from '../../../apidom-language-types';
import infoDocs from './docs/info';

const infoMeta: FormatMeta = {
  lint: infoLints,
  completion: infoComplete,
  documentation: infoDocs,
};

export default infoMeta;
