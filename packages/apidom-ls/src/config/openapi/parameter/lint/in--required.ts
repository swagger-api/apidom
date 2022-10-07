import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const inRequiredLint: LinterMeta = {
  code: ApilintCodes.OPENAPI_3_0_PARAMETER_FIELD_IN_REQUIRED,
  source: 'apilint',
  message: "should always have an 'in'",
  severity: 1,
  linterFunction: 'hasRequiredField',
  linterParams: ['name'],
  marker: 'key',
  data: {
    quickFix: [
      {
        message: "add 'in' field",
        action: 'addChild',
        snippetYaml: 'in: \n  ',
        snippetJson: '"in": "",\n    ',
      },
    ],
  },
};

export default inRequiredLint;
