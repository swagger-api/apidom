import ApilintCodes from '../../../../../../codes';
import { LinterMeta } from '../../../../../../../apidom-language-types';

const multiEndpointServerTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_IBMMQ_SERVER_BINDING_FIELD_MULTI_ENDPOINT_SERVER_TYPE,
  source: 'apilint',
  message: "'multiEndpointServer' value must be a boolean",
  severity: 1,
  linterFunction: 'apilintType',
  linterParams: ['boolean'],
  marker: 'value',
  target: 'multiEndpointServer',
  data: {},
  conditions: [
    {
      targets: [{ path: 'bindingVersion' }],
      function: 'apilintValueOrArray',
      params: [['0.1.0']],
    },
  ],
};

export default multiEndpointServerTypeLint;
