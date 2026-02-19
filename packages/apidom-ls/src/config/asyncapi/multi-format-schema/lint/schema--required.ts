import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { AsyncAPI3 } from '../../target-specs.ts';

const schemaRequiredLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI3_MULTI_FORMAT_SCHEMA_FIELD_SCHEMA_REQUIRED,
  source: 'apilint',
  message: "should always have a 'schema'",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'hasRequiredField',
  linterParams: ['schema'],
  marker: 'key',
  data: {
    quickFix: [
      {
        message: "add 'schema' field",
        action: 'addChild',
        snippetYaml: 'schema: \n  ',
        snippetJson: '"schema": {},\n    ',
      },
    ],
  },
  targetSpecs: AsyncAPI3,
};

export default schemaRequiredLint;
