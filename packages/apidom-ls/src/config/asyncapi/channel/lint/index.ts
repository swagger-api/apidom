import allowedFieldsLint from './allowed-fields.ts';
import allowedFields3_0Lint from './allowed-fields-3-0.ts';
import descriptionTypeLint from './description--type.ts';
import serversTypeLint from './servers--type.ts';
import parametersTypeLint from './parameters--type.ts';
import bindingsTypeLint from './bindings--type.ts';
import $refValidLint from './$ref--valid.ts';
import $refNoSiblingsLint from './$ref--no-siblings.ts';
import addressTypeLint from './address--type.ts';
import messagesTypeLint from './messages--type.ts';
import titleTypeLint from './title--type.ts';
import summaryTypeLint from './summary--type.ts';
import tagsTypeLint from './tags--type.ts';
import externalDocsTypeLint from './external-docs--type.ts';
import parametersRequiredWhenAddressHasExpressionsLint from './parameters--required-when-address-has-expressions.ts';
import addressExpressionsDefinedInParametersLint from './address-expressions--defined-in-parameters.ts';

const lints = [
  descriptionTypeLint,
  serversTypeLint,
  parametersTypeLint,
  bindingsTypeLint,
  allowedFieldsLint,
  $refValidLint,
  $refNoSiblingsLint,
  allowedFields3_0Lint,
  addressTypeLint,
  messagesTypeLint,
  titleTypeLint,
  summaryTypeLint,
  tagsTypeLint,
  externalDocsTypeLint,
  parametersRequiredWhenAddressHasExpressionsLint,
  addressExpressionsDefinedInParametersLint,
];

export default lints;
