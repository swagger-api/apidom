import securitySchemeLints from './lint/lints';
import securitySchemeTypeComplete from './complete/security-scheme';
import { FormatMeta } from '../../../apidom-language-types';

const securitySchemeMeta: FormatMeta = {
  lint: securitySchemeLints,
  completion: securitySchemeTypeComplete,
};

export default securitySchemeMeta;
