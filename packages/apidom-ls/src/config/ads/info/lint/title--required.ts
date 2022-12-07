import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const titleRequiredLint: LinterMeta = {
  code: ApilintCodes.ADS_INFO_FIELD_TITLE_REQUIRED,
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
};

export default titleRequiredLint;
