import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const schemaIfLint: LinterMeta = {
  code: ApilintCodes.SCHEMA_IF,
  source: 'apilint',
  message: 'if must be a schema',
  severity: 1,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['schema'],
  marker: 'value',
  target: 'if',
  data: {},
};

export default schemaIfLint;
