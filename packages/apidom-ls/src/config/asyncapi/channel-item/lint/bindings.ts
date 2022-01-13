import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const channelBindingsLint: LinterMeta = {
  code: ApilintCodes.CHANNEL_BINDINGS,
  source: 'apilint',
  message: 'bindings members must be binding objects',
  severity: 1,
  linterFunction: 'apilintChildrenOfElementsOrClasess',
  linterParams: [['channel-binding']],
  marker: 'key',
  markerTarget: 'bindings',
  target: 'bindings',
  data: {},
};

export default channelBindingsLint;
