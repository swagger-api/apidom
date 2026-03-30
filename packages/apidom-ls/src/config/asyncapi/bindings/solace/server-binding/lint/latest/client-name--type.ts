import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../../../../codes.ts';
import { LinterMeta } from '../../../../../../../apidom-language-types.ts';

const clientNameTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_SOLACE_SERVER_BINDING_FIELD_CLIENT_NAME_TYPE,
  source: 'apilint',
  message: "'clientName' value must be a string",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintType',
  linterParams: ['string'],
  marker: 'value',
  target: 'clientName',
  data: {},
  conditions: [
    {
      function: 'missingField',
      params: ['bindingVersion'],
    },
  ],
};

export default clientNameTypeLint;
