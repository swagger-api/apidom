import allowedFieldsLint from './allowed-fields';
import attributesTypeLint from './attributes--type';
import orderingKeyTypeLint from './ordering-key--type';
import schemaTypeLint from './schema--type';

const lints = [attributesTypeLint, orderingKeyTypeLint, schemaTypeLint, allowedFieldsLint];

export default lints;
