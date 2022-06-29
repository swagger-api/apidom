import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const channelParametersLint: LinterMeta = {
  code: ApilintCodes.CHANNEL_PARAMETERS,
  source: 'apilint',
  message: 'parameters members must be parameter objects',
  severity: 1,
  linterFunction: 'apilintChildrenOfElementsOrClasses',
  linterParams: [['parameter']],
  marker: 'key',
  markerTarget: 'parameters',
  target: 'parameters',
  data: {},
};

export default channelParametersLint;
