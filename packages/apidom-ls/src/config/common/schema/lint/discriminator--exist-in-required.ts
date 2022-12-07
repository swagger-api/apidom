import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const discriminatorExistInRequiredLint: LinterMeta = {
  code: ApilintCodes.SCHEMA_DISCRIMINATOR_EXIST,
  source: 'apilint',
  message: "discriminator' value must be among values defined in `required`",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintDiscriminator',
  marker: 'value',
  target: 'discriminator',
  targetSpecs: [
    { namespace: 'asyncapi', version: '2.0.0' },
    { namespace: 'asyncapi', version: '2.1.0' },
    { namespace: 'asyncapi', version: '2.2.0' },
    { namespace: 'asyncapi', version: '2.3.0' },
    { namespace: 'asyncapi', version: '2.4.0' },
  ],
  data: {},
};

export default discriminatorExistInRequiredLint;
