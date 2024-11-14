import allowedFieldsLint from './allowed-fields.ts';
import schemaRegistryUrlFormatURILint from './schema-registry-url--format-uri.ts';
import schemaRegistryVendorTypeLint from './schema-registry-vendor--type.ts';
import schemaRegistryVendorRequiredLint from './schema-registry-vendor--required.ts';

const lints = [
  schemaRegistryUrlFormatURILint,
  schemaRegistryVendorTypeLint,
  schemaRegistryVendorRequiredLint,
  allowedFieldsLint,
];

export default lints;
