import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const componentsCorrelationIDsLint: LinterMeta = {
  code: ApilintCodes.COMPONENTS_CORRELATIONIDS,
  source: 'apilint',
  message: '"correlationIds" members must be Correlation ID Object',
  severity: 1,
  linterFunction: 'apilintChildrenOfElementsOrClasess',
  linterParams: [['correlationID']],
  marker: 'key',
  markerTarget: 'correlationIds',
  target: 'correlationIds',
  data: {},
};

export default componentsCorrelationIDsLint;
