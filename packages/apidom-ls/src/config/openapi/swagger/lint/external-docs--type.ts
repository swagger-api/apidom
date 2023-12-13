import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';
import { OpenAPI2 } from '../../target-specs';

const externalDocsTypeLint: LinterMeta = {
  code: ApilintCodes.OPENAPI2_SWAGGER_FIELD_EXTERNAL_DOCS_TYPE,
  source: 'apilint',
  message: '"externalDocs" must be an object',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['externalDocumentation'],
  marker: 'value',
  target: 'externalDocs',
  data: {},
  targetSpecs: OpenAPI2,
};

export default externalDocsTypeLint;
