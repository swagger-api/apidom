import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { A2A1 } from '../../target-specs.ts';

const organizationRequiredLint: LinterMeta = {
  code: ApilintCodes.A2A1_AGENT_PROVIDER_FIELD_ORGANIZATION_REQUIRED,
  source: 'apilint',
  message: "should always have an 'organization' field",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'hasRequiredField',
  linterParams: ['organization'],
  marker: 'key',
  targetSpecs: A2A1,
  data: {
    quickFix: [
      {
        message: "add 'organization' field",
        action: 'addChild',
        snippetYaml: "organization: ''\n",
        snippetJson: '"organization": "",\n',
      },
    ],
  },
};

export default organizationRequiredLint;
