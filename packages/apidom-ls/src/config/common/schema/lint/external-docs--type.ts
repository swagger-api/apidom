import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const externalDocsTypeLint: LinterMeta = {
  code: ApilintCodes.SCHEMA_EXTERNAL_DOCS,
  source: 'apilint',
  message: 'externalDocs must be an object',
  severity: 1,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['externalDocumentation'],
  marker: 'value',
  target: 'externalDocs',
  data: {},
};

export default externalDocsTypeLint;
