import allowedFieldsLint from './allowed-fields.ts';
import schemaRegistryUrlFormatURILint from './schema-registry-url--format-uri.ts';
import schemaRegistryVendorTypeLint from './schema-registry-vendor--type.ts';
import schemaRegistryVendorExcludedLint from './schema-registry-vendor--excluded.ts';

const lints = [
  schemaRegistryUrlFormatURILint,
  schemaRegistryVendorTypeLint,
  schemaRegistryVendorExcludedLint,
  allowedFieldsLint,
];

export default lints;
