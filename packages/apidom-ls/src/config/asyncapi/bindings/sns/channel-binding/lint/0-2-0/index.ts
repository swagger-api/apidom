import allowedFieldsLint from './allowed-fields.ts';
import nameRequiredLint from './name--required.ts';
import nameTypeLint from './name--type.ts';
import orderingTypeLint from './ordering--type.ts';
import policyTypeLint from './policy--type.ts';
import tagsTypeLint from './tags--type.ts';

const lints = [
  nameRequiredLint,
  nameTypeLint,
  orderingTypeLint,
  policyTypeLint,
  tagsTypeLint,
  allowedFieldsLint,
];

export default lints;
