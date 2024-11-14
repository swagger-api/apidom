import allowedFieldsLint from './allowed-fields.ts';
import attributesTypeLint from './attributes--type.ts';
import orderingKeyTypeLint from './ordering-key--type.ts';
import schemaTypeLint from './schema--type.ts';

const lints = [attributesTypeLint, orderingKeyTypeLint, schemaTypeLint, allowedFieldsLint];

export default lints;
