import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

// eslint-disable-next-line @typescript-eslint/naming-convention
const allowedFieldsLint2_4__2_5: LinterMeta = {
  code: ApilintCodes.NOT_ALLOWED_FIELDS,
  source: 'apilint',
  message: 'Object includes not allowed fields',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'allowedFields',
  linterParams: [
    [
      'schemas',
      'servers',
      'serverVariables',
      'channels',
      'messages',
      'securitySchemes',
      'parameters',
      'correlationIds',
      'operationTraits',
      'messageTraits',
      'serverBindings',
      'channelBindings',
      'operationBindings',
      'messageBindings',
    ],
    'x-',
  ],
  marker: 'key',
  targetSpecs: [
    { namespace: 'asyncapi', version: '2.4.0' },
    { namespace: 'asyncapi', version: '2.5.0' },
  ],
};

export default allowedFieldsLint2_4__2_5;
