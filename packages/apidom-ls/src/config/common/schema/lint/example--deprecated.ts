import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';
import { OpenAPI31 } from '../../../openapi/target-specs';

const exampleDeprecatedLint: LinterMeta = {
  code: ApilintCodes.SCHEMA_EXAMPLE_DEPRECATED,
  source: 'apilint',
  message: 'property "example" is deprecated, use "examples" instead',
  severity: DiagnosticSeverity.Warning,
  linterFunction: 'missingField',
  linterParams: ['example'],
  marker: 'key',
  markerTarget: 'example',
  data: {
    quickFix: [
      {
        message: 'remove example',
        action: 'removeChild',
        functionParams: ['example'],
        target: 'parent',
      },
      {
        message: "add 'examples' field",
        action: 'addChild',
        snippetYaml: 'examples: \n  ',
        snippetJson: '"examples": ,\n    ',
      },
    ],
  },
  targetSpecs: OpenAPI31,
};

export default exampleDeprecatedLint;
