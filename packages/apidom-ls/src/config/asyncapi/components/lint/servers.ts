import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const componentsServersLint: LinterMeta = {
  code: ApilintCodes.COMPONENTS_SERVERS,
  source: 'apilint',
  message: '"servers" members must be Server object',
  severity: 1,
  linterFunction: 'apilintChildrenOfElementsOrClasess',
  linterParams: [['server']],
  marker: 'key',
  markerTarget: 'servers',
  target: 'servers',
  data: {},
};

export default componentsServersLint;
