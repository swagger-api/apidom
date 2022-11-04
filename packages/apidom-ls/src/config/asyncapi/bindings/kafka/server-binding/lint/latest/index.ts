import allowedFieldsLint from './allowed-fields';
import schemaRegistryUrlFormatURILint from './schema-registry-url--format-uri';
import schemaRegistryVendorTypeLint from './schema-registry-vendor--type';
import schemaRegistryVendorRequiredLint from './schema-registry-vendor--required';

const lints = [
  schemaRegistryUrlFormatURILint,
  schemaRegistryVendorTypeLint,
  schemaRegistryVendorRequiredLint,
  allowedFieldsLint,
];

export default lints;
