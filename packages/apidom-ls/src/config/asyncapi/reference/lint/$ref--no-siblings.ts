import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { AsyncAPI2, AsyncAPI3 } from '../../target-specs.ts';

const $refNoSiblingsLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI_REFERENCE_FIELD_$REF_NO_SIBLINGS,
  source: 'apilint',
  message: 'All other properties in a "$ref" object are ignored',
  severity: DiagnosticSeverity.Warning,
  linterFunction: 'allowedFields',
  linterParams: [['$ref']],
  marker: 'key',
  given: [
    'channel',
    'channelBindings',
    'correlationID',
    'externalDocumentation',
    'message',
    'messageBindings',
    'messageTrait',
    'multiFormatSchema',
    'operation',
    'operationBindings',
    'operationReply',
    'operationReplyAddress',
    'parameter',
    'schema',
    'securityScheme',
    'server',
    'serverBindings',
    'serverVariable',
    'tag',
  ],
  conditions: [
    {
      function: 'existFields',
      params: [['$ref']],
    },
  ],
  data: {
    quickFix: [
      {
        message: 'remove $ref',
        action: 'removeChild',
        functionParams: ['$ref'],
        target: 'parent',
      },
    ],
  },
  targetSpecs: [...AsyncAPI2, ...AsyncAPI3],
};

export default $refNoSiblingsLint;
