import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const notTypeLint: LinterMeta = {
  code: ApilintCodes.SCHEMA_NOT,
  source: 'apilint',
  message: '"not" must be a schema',
  severity: 1,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['schema'],
  marker: 'value',
  target: 'not',
  data: {},
};

export default notTypeLint;
