import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { AsyncAPI3 } from '../../target-specs.ts';

// eslint-disable-next-line @typescript-eslint/naming-convention
const allowedFields3_0Lint: LinterMeta = {
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
      'operations',
      'replies',
      'replyAddresses',
      'externalDocs',
      'tags',
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
  targetSpecs: AsyncAPI3,
};

export default allowedFields3_0Lint;
