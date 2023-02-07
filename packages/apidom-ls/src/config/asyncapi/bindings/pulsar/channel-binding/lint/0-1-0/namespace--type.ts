import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../../../../codes';
import { LinterMeta } from '../../../../../../../apidom-language-types';

const namespaceTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_PULSAR_CHANNEL_BINDING_FIELD_NAMESPACE_TYPE,
  source: 'apilint',
  message: "'namespace' value must be a `string`",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintType',
  linterParams: ['string'],
  marker: 'value',
  target: 'namespace',
  data: {},
  conditions: [
    {
      targets: [{ path: 'bindingVersion' }],
      function: 'apilintValueOrArray',
      params: [['0.1.0']],
    },
  ],
};

export default namespaceTypeLint;
