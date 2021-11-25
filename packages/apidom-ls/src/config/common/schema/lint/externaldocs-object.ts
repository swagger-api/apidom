import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const externalDocsObjectLint: LinterMeta = {
  code: ApilintCodes.EXTERNALDOC_OBJECT,
  source: 'apilint',
  message: 'externalDocs must be an object',
  severity: 1,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['externalDocumentation'],
  marker: 'value',
  target: 'externalDocs',
  data: {},
};

export default externalDocsObjectLint;
