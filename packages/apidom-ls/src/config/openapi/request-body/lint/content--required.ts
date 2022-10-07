import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const requiredRequiredLint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_0_REQUEST_BODY_FIELD_CONTENT_REQUIRED,
  source: 'apilint',
  message: "should always have a 'content'",
  severity: 1,
  linterFunction: 'hasRequiredField',
  linterParams: ['content'],
  marker: 'key',
  data: {
    quickFix: [
      {
        message: "add 'content' field",
        action: 'addChild',
        snippetYaml: 'content: \n  \n',
        snippetJson: '"content": {\n  \n  },\n',
      },
    ],
  },
};

export default requiredRequiredLint;
