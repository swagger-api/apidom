import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';

const enumTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_SERVER_VARIABLE_FIELD_ENUM_TYPE,
  source: 'apilint',
  message: "enum' value must be an array of strings",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintArrayOfType',
  linterParams: ['string'],
  marker: 'value',
  target: 'enum',
  data: {},
};

export default enumTypeLint;
