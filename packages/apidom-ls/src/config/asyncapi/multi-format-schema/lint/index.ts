import allowedFields3_0Lint from './allowed-fields-3-0.ts';
import schemaFormatTypeLint from './schema-format--type.ts';
import schemaRequiredLint from './schema--required.ts';
import schemaTypeLint from './schema--type.ts';

const lints = [schemaFormatTypeLint, schemaRequiredLint, schemaTypeLint, allowedFields3_0Lint];

export default lints;
