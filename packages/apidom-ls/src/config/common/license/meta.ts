import licenseLints from './lint/lints';
import { FormatMeta } from '../../../apidom-language-types';
import licenseComplete from './complete/license';
import licenseDocs from './docs/license';

const licenseMeta: FormatMeta = {
  lint: licenseLints,
  completion: licenseComplete,
  documentation: licenseDocs,
};

export default licenseMeta;
