import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';

const locationTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_PARAMETER_FIELD_LOCATION_TYPE,
  source: 'apilint',
  message: "'location' must be a string",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintType',
  linterParams: ['string'],
  marker: 'value',
  target: 'location',
  data: {},
};

export default locationTypeLint;
