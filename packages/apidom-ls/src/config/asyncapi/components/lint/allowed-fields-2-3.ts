import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

// eslint-disable-next-line @typescript-eslint/naming-convention
const allowedFieldsLint2_3: LinterMeta = {
  code: ApilintCodes.NOT_ALLOWED_FIELDS,
  source: 'apilint',
  message: 'Object includes not allowed fields',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'allowedFields',
  linterParams: [
    [
      'schemas',
      'servers',
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
  targetSpecs: [{ namespace: 'asyncapi', version: '2.3.0' }],
};

export default allowedFieldsLint2_3;
