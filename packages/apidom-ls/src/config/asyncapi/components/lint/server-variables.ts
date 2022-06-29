import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const componentsServerVariablesLint: LinterMeta = {
  code: ApilintCodes.COMPONENTS_SERVER_VARIABLES,
  source: 'apilint',
  message: '"servers" members must be Server Variable object',
  severity: 1,
  linterFunction: 'apilintChildrenOfElementsOrClasses',
  linterParams: [['serverVariable']],
  marker: 'key',
  markerTarget: 'serverVariables',
  target: 'serverVariables',
  data: {},
};

export default componentsServerVariablesLint;
