import allowedFieldsLint from './allowed-fields';
import typeTypeLint from './type--type';
import typeRequiredLint from './type--required';
import methodTypeLint from './method--type';
import queryTypeLint from './query--type';
import bindingVersionTypeLint from './binding-version--type';

const lints = [
  allowedFieldsLint,
  typeTypeLint,
  typeRequiredLint,
  methodTypeLint,
  queryTypeLint,
  bindingVersionTypeLint,
];

export default lints;
