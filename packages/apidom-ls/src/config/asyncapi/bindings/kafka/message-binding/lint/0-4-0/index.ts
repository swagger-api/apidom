import allowedFieldsLint from './allowed-fields.ts';
import keyTypeLint from './key--type.ts';
import schemaIdLocationTypeLint from './schema-id-location--type.ts';
import schemaIdPayloadEncodingTypeLint from './schema-id-payload-encoding--type.ts';
import schemaLookupStrategyTypeLint from './schema-lookup-strategy--type.ts';

const lints = [
  allowedFieldsLint,
  keyTypeLint,
  schemaIdLocationTypeLint,
  schemaIdPayloadEncodingTypeLint,
  schemaLookupStrategyTypeLint,
];

export default lints;
