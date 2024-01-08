import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';
import { OpenAPI31 } from '../../target-specs';

// eslint-disable-next-line @typescript-eslint/naming-convention
const schemaMutuallyExclusiveOpenAPI3_1_AsyncAPI2Lint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_0_HEADER_FIELD_SCHEMA_MUTUALLY_EXCLUSIVE,
  source: 'apilint',
  message: 'The `schema` field and `content` field are mutually exclusive.',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'missingFields',
  linterParams: [['schema', 'boolean']],
  marker: 'key',
  markerTarget: 'schema',
  conditions: [
    {
      function: 'existFields',
      params: [['content']],
    },
  ],
  targetSpecs: [...OpenAPI31],
};

export default schemaMutuallyExclusiveOpenAPI3_1_AsyncAPI2Lint;
