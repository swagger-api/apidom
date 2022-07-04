import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const elseTypeLint: LinterMeta = {
  code: ApilintCodes.SCHEMA_ELSE,
  source: 'apilint',
  message: '"else" must be a schema',
  severity: 1,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['schema'],
  marker: 'value',
  target: 'else',
  data: {},
};

export default elseTypeLint;
