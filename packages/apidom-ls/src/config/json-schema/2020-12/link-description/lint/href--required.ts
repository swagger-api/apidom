import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../../codes.ts';
import { LinterMeta } from '../../../../../apidom-language-types.ts';
import { JSONSchema202012 } from '../../target-specs.ts';

const hrefRequiredLint: LinterMeta = {
  code: ApilintCodes.JSON_SCHEMA_2020_12_LINK_DESCRIPTION_FIELD_HREF_REQUIRED,
  source: 'apilint',
  message: "should always have a 'href'",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'hasRequiredField',
  linterParams: ['href'],
  marker: 'key',
  data: {
    quickFix: [
      {
        message: "add 'href' field",
        action: 'addChild',
        snippetYaml: 'href: \n  ',
        snippetJson: '"href": "",\n    ',
      },
    ],
  },
  targetSpecs: JSONSchema202012,
};

export default hrefRequiredLint;
