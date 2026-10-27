import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../../codes.ts';
import { LinterMeta } from '../../../../../apidom-language-types.ts';
import { JSONSchema202012 } from '../../target-specs.ts';

const relRequiredLint: LinterMeta = {
  code: ApilintCodes.JSON_SCHEMA_2020_12_LINK_DESCRIPTION_FIELD_REL_REQUIRED,
  source: 'apilint',
  message: "should always have a 'rel'",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'hasRequiredField',
  linterParams: ['rel'],
  marker: 'key',
  data: {
    quickFix: [
      {
        message: "add 'rel' field",
        action: 'addChild',
        snippetYaml: 'rel: \n  ',
        snippetJson: '"rel": "",\n    ',
      },
    ],
  },
  targetSpecs: JSONSchema202012,
};

export default relRequiredLint;
