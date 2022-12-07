import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const externalDocsTypeLint: LinterMeta = {
  code: ApilintCodes.SCHEMA_EXTERNAL_DOCS,
  source: 'apilint',
  message: 'externalDocs must be an object',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['externalDocumentation'],
  marker: 'value',
  target: 'externalDocs',
  data: {},
};

export default externalDocsTypeLint;
