import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const versionRequiredLint: LinterMeta = {
  code: ApilintCodes.ADS_MAIN_FIELD_VERSION_REQUIRED,
  source: 'apilint',
  message: "should always have a 'version' value",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'hasRequiredField',
  linterParams: ['version'],
  marker: 'key',
  data: {
    quickFix: [
      {
        message: "add 'version' field",
        action: 'addChild',
        snippetYaml: "version: ''\n",
        snippetJson: '"version": "",\n',
      },
    ],
  },
};

export default versionRequiredLint;
