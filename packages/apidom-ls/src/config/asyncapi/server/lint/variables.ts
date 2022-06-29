import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const serverVariablesLint: LinterMeta = {
  code: ApilintCodes.SERVER_VARIABLES,
  source: 'apilint',
  message: 'variables members must be server variables',
  severity: 1,
  linterFunction: 'apilintChildrenOfElementsOrClasses',
  linterParams: [['serverVariable']],
  marker: 'key',
  markerTarget: 'variables',
  target: 'variables',
  data: {},
};

export default serverVariablesLint;
