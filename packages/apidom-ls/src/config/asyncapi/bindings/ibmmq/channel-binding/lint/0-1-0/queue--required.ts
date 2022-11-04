import ApilintCodes from '../../../../../../codes';
import { LinterMeta } from '../../../../../../../apidom-language-types';

const queueRequiredLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_IBMMQ_CHANNEL_BINDING_FIELD_QUEUE_REQUIRED,
  source: 'apilint',
  message: "should always have a 'queue'",
  severity: 1,
  linterFunction: 'hasRequiredField',
  linterParams: ['queue'],
  marker: 'key',
  conditions: [
    {
      targets: [{ path: 'destinationType' }],
      function: 'apilintContainsValue',
      params: ['queue'],
    },
    {
      targets: [{ path: 'bindingVersion' }],
      function: 'apilintValueOrArray',
      params: [['0.1.0']],
    },
  ],
  data: {
    quickFix: [
      {
        message: "add 'queue' field",
        action: 'addChild',
        snippetYaml: 'queue: \n  ',
        snippetJson: '"queue": {},\n    ',
      },
    ],
  },
};

export default queueRequiredLint;
