import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const parameterSchema: LinterMeta = {
  code: ApilintCodes.PARAMETER_SCHEMA,
  source: 'apilint',
  message: "'schema' must be a schema",
  severity: 1,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['schema'],
  marker: 'value',
  target: 'schema',
  data: {},
};

export default parameterSchema;
