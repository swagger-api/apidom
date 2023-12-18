import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';
import { OpenAPI } from '../../target-specs';

const versionRequiredLint: LinterMeta = {
  code: ApilintCodes.OPENAPI2_INFO_FIELD_VERSION_REQUIRED,
  source: 'apilint',
  message: "should always have a 'version'",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'hasRequiredField',
  linterParams: ['version'],
  marker: 'key',
  data: {
    quickFix: [
      {
        message: "add 'version' field",
        action: 'addChild',
        snippetYaml: 'version: \n  ',
        snippetJson: '"version": "",\n    ',
      },
    ],
  },
  targetSpecs: OpenAPI,
};

export default versionRequiredLint;
