import allowedFieldsLint from './allowed-fields';
import contentTypeTypeLint from './content-type--type';
import headersValuesTypeLint from './headers--values-type';
import styleTypeLint from './style--type';
import explodeTypeLint from './explode--type';
import allowReservedTypeLint from './allow-reserved--type';

const lints = [
  contentTypeTypeLint,
  headersValuesTypeLint,
  styleTypeLint,
  explodeTypeLint,
  allowReservedTypeLint,
  allowedFieldsLint,
];

export default lints;
