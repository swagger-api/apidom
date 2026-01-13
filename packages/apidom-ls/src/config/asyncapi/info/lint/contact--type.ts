import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { AsyncAPI2, AsyncAPI3 } from '../../target-specs.ts';

const contactTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_INFO_FIELD_CONTACT_TYPE,
  source: 'apilint',
  message: 'contact must be an object',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintElementOrClass',
  linterParams: [['contact']],
  marker: 'value',
  target: 'contact',
  data: {},
  targetSpecs: [...AsyncAPI2, ...AsyncAPI3],
};

export default contactTypeLint;
