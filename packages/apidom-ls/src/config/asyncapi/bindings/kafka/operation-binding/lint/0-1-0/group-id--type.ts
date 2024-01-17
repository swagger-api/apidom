import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../../../../codes';
import { LinterMeta } from '../../../../../../../apidom-language-types';

const groupIdTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_KAFKA_OPERATION_BINDING_FIELD_GROUP_ID_TYPE,
  source: 'apilint',
  message: 'groupId must be a schema object or a boolean JSON schema',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['schema', 'boolean'],
  marker: 'value',
  target: 'groupdId',
  data: {},
  conditions: [
    {
      targets: [{ path: 'bindingVersion' }],
      function: 'apilintValueOrArray',
      params: [['0.1.0']],
    },
  ],
};

export default groupIdTypeLint;
