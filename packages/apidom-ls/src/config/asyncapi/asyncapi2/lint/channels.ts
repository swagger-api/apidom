import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const rootChannelsLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI_ROOT_CHANNELS,
  source: 'apilint',
  message: "should always have a 'channels' section",
  severity: 1,
  linterFunction: 'hasRequiredField',
  linterParams: ['channels'],
  marker: 'key',
  data: {
    quickFix: [
      {
        message: "add 'channels' section",
        action: 'addChild',
        snippetYaml: 'channels: \n  \n',
        snippetJson: '"channels": {\n  \n},\n',
      },
    ],
  },
};

export default rootChannelsLint;
