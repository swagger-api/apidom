import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../../../codes.ts';
import { LinterMeta } from '../../../../../../apidom-language-types.ts';
import { AsyncAPI2, AsyncAPI3 } from '../../../../target-specs.ts';

const bindingVersionTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_SNS_CHANNEL_BINDING_FIELD_BINDING_VERSION_TYPE,
  source: 'apilint',
  message: "'bindingVersion' value must be a string",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintType',
  linterParams: ['string'],
  marker: 'value',
  target: 'bindingVersion',
  data: {},
  targetSpecs: [...AsyncAPI2, ...AsyncAPI3],
};

export default bindingVersionTypeLint;
