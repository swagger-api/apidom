import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../../../../codes.ts';
import { LinterMeta } from '../../../../../../../apidom-language-types.ts';
import { AsyncAPI2, AsyncAPI3 } from '../../../../../target-specs.ts';

const allowedFieldsLint: LinterMeta = {
  code: ApilintCodes.NOT_ALLOWED_FIELDS,
  source: 'apilint',
  message: 'This object MUST NOT contain any properties. Its name is reserved for future use.',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'allowedFields',
  linterParams: [[]],
  marker: 'key',
  conditions: [
    {
      function: 'missingField',
      params: ['bindingVersion'],
    },
  ],
  targetSpecs: [...AsyncAPI2, ...AsyncAPI3],
};

export default allowedFieldsLint;
