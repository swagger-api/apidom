import ApilintCodes from '../../../../../../codes';
import { LinterMeta } from '../../../../../../../apidom-language-types';

const ccdtQueueManagerNameTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_IBMMQ_SERVER_BINDING_FIELD_CCDT_QUEUE_MANAGER_NAME_TYPE,
  source: 'apilint',
  message: "'ccdtQueueManagerName' value must be a string",
  severity: 1,
  linterFunction: 'apilintType',
  linterParams: ['string'],
  marker: 'value',
  target: 'ccdtQueueManagerName',
  data: {},
  conditions: [
    {
      targets: [{ path: 'bindingVersion' }],
      function: 'apilintValueOrArray',
      params: [['0.1.0']],
    },
  ],
};

export default ccdtQueueManagerNameTypeLint;
