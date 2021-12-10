import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const channelParameterExistLint: LinterMeta = {
  code: ApilintCodes.CHANNEL_PARAMETERS_EXIST,
  source: 'apilint',
  message: 'parameter key must be defined in channel name',
  severity: 1,
  linterFunction: 'apilintChannelParameterExist',
  marker: 'key',
  data: {},
};

export default channelParameterExistLint;
