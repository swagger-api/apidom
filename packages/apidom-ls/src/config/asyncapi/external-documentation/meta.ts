import externalDocsComplete from './complete/externaldocs';
import externalDocsDocs from './docs/externaldocs';
import externalDocsLints from './lint/lints';
import { FormatMeta } from '../../../apidom-language-types';

const externalDocsMeta: FormatMeta = {
  documentation: externalDocsDocs,
  completion: externalDocsComplete,
  lint: externalDocsLints,
};

export default externalDocsMeta;
