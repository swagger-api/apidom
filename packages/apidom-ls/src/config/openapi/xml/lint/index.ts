import allowedFieldsLint from './allowed-fields';
import nameTypeLint from './name--type';
import namespaceFormatURILint from './namespace--format-uri';
import prefixTypeLint from './prefix--type';
import attributeTypeLint from './attribute--type';
import wrappedTypeLint from './wrapped--type';

const lints = [
  nameTypeLint,
  namespaceFormatURILint,
  prefixTypeLint,
  attributeTypeLint,
  wrappedTypeLint,
  allowedFieldsLint,
];

export default lints;
