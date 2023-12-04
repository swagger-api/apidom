import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';
import { OpenAPI3 } from '../../target-specs';

const contactTypeLint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_0_INFO_FIELD_CONTACT_TYPE,
  source: 'apilint',
  message: 'contact must be an object',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['contact'],
  marker: 'value',
  target: 'contact',
  data: {},
  targetSpecs: OpenAPI3,
};

export default contactTypeLint;
