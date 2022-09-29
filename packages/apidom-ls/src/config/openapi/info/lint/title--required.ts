import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const titleRequiredLint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_0_INFO_FIELD_TITLE_REQUIRED,
  source: 'apilint',
  message: "should always have a 'title'",
  severity: 1,
  linterFunction: 'hasRequiredField',
  linterParams: ['title'],
  marker: 'key',
  data: {
    quickFix: [
      {
        message: "add 'title' field",
        action: 'addChild',
        snippetYaml: 'title: \n  ',
        snippetJson: '"title": "",\n    ',
      },
    ],
  },
  targetSpecs: [
    { namespace: 'openapi', version: '3.0.0' },
    { namespace: 'openapi', version: '3.0.1' },
    { namespace: 'openapi', version: '3.0.2' },
    { namespace: 'openapi', version: '3.0.3' },
    { namespace: 'openapi', version: '3.1.0' },
  ],
};

export default titleRequiredLint;
