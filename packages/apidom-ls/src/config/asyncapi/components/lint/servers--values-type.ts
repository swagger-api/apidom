import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const serversValuesTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_COMPONENTS_FIELD_SERVERS_VALUES_TYPE,
  source: 'apilint',
  message: '"servers" members must be Server object',
  severity: 1,
  linterFunction: 'apilintChildrenOfElementsOrClasses',
  linterParams: [['server']],
  marker: 'key',
  markerTarget: 'servers',
  target: 'servers',
  data: {},
};

export default serversValuesTypeLint;
