import allowedFieldsLint from './allowed-fields';
import keyTypeLint from './key--type';
import schemaIdLocationTypeLint from './schema-id-location--type';
import schemaIdPayloadEncodingTypeLint from './schema-id-payload-encoding--type';
import schemaLookupStrategyTypeLint from './schema-lookup-strategy--type';

const lints = [
  allowedFieldsLint,
  keyTypeLint,
  schemaIdLocationTypeLint,
  schemaIdPayloadEncodingTypeLint,
  schemaLookupStrategyTypeLint,
];

export default lints;
