import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { AsyncAPI3 } from '../../target-specs.ts';

const descriptionTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI3_CHANNEL_FIELD_DESCRIPTION_TYPE,
  source: 'apilint',
  message: "description' value must be a string",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintType',
  linterParams: ['string'],
  marker: 'value',
  target: 'description',
  data: {},
  targetSpecs: AsyncAPI3,
};

export default descriptionTypeLint;
