import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';
import { AsyncAPI2 } from '../../../asyncapi/target-specs';

const discriminatorExistInRequiredLint: LinterMeta = {
  code: ApilintCodes.SCHEMA_DISCRIMINATOR_EXIST,
  source: 'apilint',
  message: "discriminator' value must be among values defined in `required`",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintDiscriminator',
  marker: 'value',
  target: 'discriminator',
  targetSpecs: AsyncAPI2,
  data: {},
};

export default discriminatorExistInRequiredLint;
