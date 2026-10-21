import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { AsyncAPI3 } from '../../target-specs.ts';

const hostTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI3_SERVER_FIELD_HOST_TYPE,
  source: 'apilint',
  message: "'host' must be a string",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintType',
  linterParams: ['string'],
  marker: 'value',
  target: 'host',
  data: {},
  targetSpecs: AsyncAPI3,
};

export default hostTypeLint;
