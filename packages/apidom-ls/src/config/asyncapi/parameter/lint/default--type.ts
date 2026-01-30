import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { AsyncAPI3 } from '../../target-specs.ts';

const defaultTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI3_PARAMETER_FIELD_DEFAULT_TYPE,
  source: 'apilint',
  message: 'default value must match the type defined in the schema',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintValueOrElement',
  linterParams: [['default']],
  marker: 'value',
  target: 'default',
  data: {},
  targetSpecs: AsyncAPI3,
};

export default defaultTypeLint;
