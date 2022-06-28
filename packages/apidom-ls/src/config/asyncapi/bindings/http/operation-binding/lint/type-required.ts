import ApilintCodes from '../../../../../codes';
import { LinterMeta } from '../../../../../../apidom-language-types';

const httpOperationBindingTypeRequiredLint: LinterMeta = {
  code: ApilintCodes.OPERATION_BINDING_HTTP_TYPE_REQUIRED,
  source: 'apilint',
  message: "should always have a 'type'",
  severity: 1,
  linterFunction: 'hasRequiredField',
  linterParams: ['type'],
  marker: 'key',
  data: {
    quickFix: [
      {
        message: "add 'type' field",
        action: 'addChild',
        snippetYaml: 'type: \n  ',
        snippetJson: '"type": "",\n    ',
      },
    ],
  },
};

export default httpOperationBindingTypeRequiredLint;
