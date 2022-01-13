import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const componentsParametersLint: LinterMeta = {
  code: ApilintCodes.COMPONENTS_PARAMETERS,
  source: 'apilint',
  message: '"parameters" members must be Parameter object',
  severity: 1,
  linterFunction: 'apilintChildrenOfElementsOrClasess',
  linterParams: [['parameter']],
  marker: 'key',
  markerTarget: 'parameters',
  target: 'parameters',
  data: {},
};

export default componentsParametersLint;
