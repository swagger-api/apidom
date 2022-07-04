import allowedFieldsLint from './allowed-fields';
import methodTypeLint from './method--type';
import queryTypeLint from './query--type';
import headersTypeLint from './headers--type';
import bindingVersionTypeLint from './binding-version--type';

const lints = [
  allowedFieldsLint,
  methodTypeLint,
  queryTypeLint,
  headersTypeLint,
  bindingVersionTypeLint,
];

export default lints;
