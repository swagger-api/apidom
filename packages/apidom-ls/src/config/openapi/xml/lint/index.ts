import allowedFieldsLint from './allowed-fields.ts';
import allowedFields3_2Lint from './allowed-fields-3-2.ts';
import nameTypeLint from './name--type.ts';
import namespaceFormatURILint from './namespace--format-uri.ts';
import prefixTypeLint from './prefix--type.ts';
import attributeTypeLint from './attribute--type.ts';
import wrappedTypeLint from './wrapped--type.ts';
import nodeTypeTypeLint from './node-type--type.ts';
import nodeTypeEqualsLint from './node-type--equals.ts';

const lints = [
  nameTypeLint,
  namespaceFormatURILint,
  prefixTypeLint,
  attributeTypeLint,
  wrappedTypeLint,
  nodeTypeTypeLint,
  nodeTypeEqualsLint,
  allowedFieldsLint,
  allowedFields3_2Lint,
];

export default lints;
