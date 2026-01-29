import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { OpenAPI32 } from '../../target-specs.ts';

const identifierMutuallyExclusiveLint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_2_LICENSE_FIELD_IDENTIFIER_MUTUALLY_EXCLUSIVE,
  source: 'apilint',
  message: 'The identifier field and url field are mutually exclusive.',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'missingFields',
  linterParams: [['identifier']],
  marker: 'key',
  markerTarget: 'identifier',
  conditions: [
    {
      function: 'existFields',
      params: [['url']],
    },
  ],
  targetSpecs: OpenAPI32,
};

export default identifierMutuallyExclusiveLint;
