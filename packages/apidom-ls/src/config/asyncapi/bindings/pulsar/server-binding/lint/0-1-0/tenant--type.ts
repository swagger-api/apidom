import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../../../../codes';
import { LinterMeta } from '../../../../../../../apidom-language-types';

const tenantTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_PULSAR_SERVER_BINDING_FIELD_TENANT_TYPE,
  source: 'apilint',
  message: "'tenant' value must be a `string`",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintType',
  linterParams: ['string'],
  marker: 'value',
  target: 'tenant',
  data: {},
  conditions: [
    {
      targets: [{ path: 'bindingVersion' }],
      function: 'apilintValueOrArray',
      params: [['0.1.0']],
    },
  ],
};

export default tenantTypeLint;
