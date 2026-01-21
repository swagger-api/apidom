import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { AsyncAPI2, AsyncAPI3 } from '../../target-specs.ts';

const titleRequiredLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_INFO_FIELD_TITLE_REQUIRED,
  source: 'apilint',
  message: "should always have a 'title'",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'hasRequiredField',
  linterParams: ['title'],
  marker: 'key',
  data: {
    quickFix: [
      {
        message: "add 'title' field",
        action: 'addChild',
        snippetYaml: 'title: \n  ',
        snippetJson: '"title": "",\n    ',
      },
    ],
  },
  targetSpecs: [...AsyncAPI2, ...AsyncAPI3],
};

export default titleRequiredLint;
