import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const versionPatternLint: LinterMeta = {
  code: ApilintCodes.ADS_MAIN_FIELD_VERSION_PATTERN,
  source: 'apilint',
  message: 'version must be "2021-05-07"',
  severity: 1,
  linterFunction: 'apilintValueRegex',
  linterParams: ['^2021\\-05\\-07$'],
  marker: 'value',
  target: 'version',
  data: {
    quickFix: [
      {
        message: "update to '2021-05-07'",
        action: 'updateValue',
        functionParams: ['2021-05-07'],
      },
    ],
  },
};

export default versionPatternLint;
