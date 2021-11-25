import infoLints from './lint/lints';
import infoComplete from './complete/info';
import { FormatMeta } from '../../../apidom-language-types';

const infoMeta: FormatMeta = {
  lint: infoLints,
  completion: infoComplete,
};

export default infoMeta;
