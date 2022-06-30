import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const schemaTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_PARAMETER_FIELD_SCHEMA_TYPE,
  source: 'apilint',
  message: "'schema' must be a schema",
  severity: 1,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['schema'],
  marker: 'value',
  target: 'schema',
  data: {},
};

export default schemaTypeLint;
