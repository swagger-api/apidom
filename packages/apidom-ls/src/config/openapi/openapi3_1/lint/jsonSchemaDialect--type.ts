import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const jsonSchemaDialectTypeLint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_1_OPEN_API_FIELD_JSON_SCHEMA_DIALECT_TYPE,
  source: 'apilint',
  message: 'jsonSchemaDialect must be a string',
  severity: 1,
  linterFunction: 'apilintType',
  linterParams: ['string'],
  marker: 'value',
  target: 'jsonSchemaDialect',
  data: {},
};

export default jsonSchemaDialectTypeLint;
