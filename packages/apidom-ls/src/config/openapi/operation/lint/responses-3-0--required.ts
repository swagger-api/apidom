import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

// eslint-disable-next-line @typescript-eslint/naming-convention
const responsesRequiredLint3_0: LinterMeta = {
  code: ApilintCodes.OPENAPI_3_0_OPERATION_FIELD_RESPONSES_REQUIRED,
  source: 'apilint',
  message: "should always have a 'responses'",
  severity: 1,
  linterFunction: 'hasRequiredField',
  linterParams: ['responses'],
  marker: 'key',
  data: {
    quickFix: [
      {
        message: "add 'responses' field",
        action: 'addChild',
        snippetYaml: 'responses: \n  ',
        snippetJson: '"responses": {},\n    ',
      },
    ],
  },
};

export default responsesRequiredLint3_0;
