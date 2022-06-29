import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const valuesTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_CHANNELS_VALUES_TYPE,
  source: 'apilint',
  message: 'Channels Object values must be of Channel Item Object shape',
  severity: 1,
  linterFunction: 'apilintChildrenOfElementsOrClasses',
  linterParams: [['channelItem']],
  marker: 'key',
  data: {},
};

export default valuesTypeLint;
