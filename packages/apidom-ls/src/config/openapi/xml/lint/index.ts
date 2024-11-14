import allowedFieldsLint from './allowed-fields.ts';
import nameTypeLint from './name--type.ts';
import namespaceFormatURILint from './namespace--format-uri.ts';
import prefixTypeLint from './prefix--type.ts';
import attributeTypeLint from './attribute--type.ts';
import wrappedTypeLint from './wrapped--type.ts';

const lints = [
  nameTypeLint,
  namespaceFormatURILint,
  prefixTypeLint,
  attributeTypeLint,
  wrappedTypeLint,
  allowedFieldsLint,
];

export default lints;
