import allowedFieldsLint from './allowed-fields';
import urlFormatURILint from './url--format-uri';
import urlRequiredLint from './url--required';
import protocolType from './protocol--type';
import protocolRequiredLint from './protocol--required';
import protocolVersionType from './protocol-version--type';
import descriptionTypeLint from './description--type';
import variablesTypeLint from './variables--type';
import variablesValuesTypeLint from './variables--values-type';
import securityTypeLint from './security--type';
import securityItemsTypeLint from './security--items-type';
import tagsTypeLint from './tags--type';
import bindingsTypeLint from './bindings--type';
import $refValidLint from './$ref--valid';
import $refNoSiblingsLint from './$ref--no-siblings';

const lints = [
  urlFormatURILint,
  urlRequiredLint,
  protocolType,
  protocolRequiredLint,
  protocolVersionType,
  descriptionTypeLint,
  variablesTypeLint,
  variablesValuesTypeLint,
  securityTypeLint,
  securityItemsTypeLint,
  tagsTypeLint,
  bindingsTypeLint,
  allowedFieldsLint,
  $refValidLint,
  $refNoSiblingsLint,
];

export default lints;
