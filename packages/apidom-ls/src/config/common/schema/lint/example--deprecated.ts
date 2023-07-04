import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const exampleDeprecatedLint: LinterMeta = {
  code: ApilintCodes.SCHEMA_EXAMPLE_DEPRECATED,
  source: 'apilint',
  message: 'property "example" is deprecated, use "examples" instead',
  severity: DiagnosticSeverity.Warning,
  linterFunction: 'missingField',
  linterParams: ['example'],
  marker: 'key',
  markerTarget: 'example',
  targetSpecs: [{ namespace: 'openapi', version: '3.1.0' }],
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
};

export default exampleDeprecatedLint;
