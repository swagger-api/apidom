import allowedFieldsLint from './allowed-fields';
import destinationTypeLint from './destination--type';
import destinationTypeTypeLint from './destination-type--type';
import bindingVersionTypeLint from './binding-version--type';

const lints = [
  allowedFieldsLint,
  destinationTypeLint,
  destinationTypeTypeLint,
  bindingVersionTypeLint,
];

export default lints;
