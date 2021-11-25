import securitySchemeLints from './lint/lints';
import securitySchemeTypeComplete from './complete/securityscheme';
import { FormatMeta } from '../../../apidom-language-types';

const securitySchemeMeta: FormatMeta = {
  lint: securitySchemeLints,
  completion: securitySchemeTypeComplete,
};

export default securitySchemeMeta;
