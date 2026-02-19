import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { AsyncAPI3 } from '../../target-specs.ts';

const locationTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI3_OPERATION_REPLY_ADDRESS_FIELD_LOCATION_TYPE,
  source: 'apilint',
  message: "'location' value must be a string",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintType',
  linterParams: ['string'],
  marker: 'value',
  target: 'location',
  data: {},
  targetSpecs: AsyncAPI3,
};

export default locationTypeLint;
