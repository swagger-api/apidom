import ApilintCodes from '../../../../../../codes';
import { LinterMeta } from '../../../../../../../apidom-language-types';

const typeTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_HTTP_OPERATION_BINDING_FIELD_TYPE_TYPE,
  source: 'apilint',
  message: "'type' value must be a string",
  severity: 1,
  linterFunction: 'apilintType',
  linterParams: ['string'],
  marker: 'value',
  target: 'type',
  data: {},
  conditions: [
    {
      targets: [{ path: 'bindingVersion' }],
      function: 'apilintValueOrArray',
      params: [['0.2.0']],
    },
  ],
};

export default typeTypeLint;
