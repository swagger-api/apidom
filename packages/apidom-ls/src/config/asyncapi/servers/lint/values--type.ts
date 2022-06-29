import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const valuesTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_SERVERS_VALUES_TYPE,
  source: 'apilint',
  message: 'Servers Object values must be of Server Object shape',
  severity: 1,
  linterFunction: 'apilintChildrenOfElementsOrClasses',
  linterParams: [['server']],
  marker: 'key',
  data: {},
};

export default valuesTypeLint;
