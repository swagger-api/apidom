import allowedFieldsLint from './allowed-fields.ts';
import contentTypeTypeLint from './content-type--type.ts';
import headersValuesTypeLint from './headers--values-type.ts';
import styleTypeLint from './style--type.ts';
import explodeTypeLint from './explode--type.ts';
import allowReservedTypeLint from './allow-reserved--type.ts';

const lints = [
  contentTypeTypeLint,
  headersValuesTypeLint,
  styleTypeLint,
  explodeTypeLint,
  allowReservedTypeLint,
  allowedFieldsLint,
];

export default lints;
