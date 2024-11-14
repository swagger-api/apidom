import allowedFields2_0__2_4Lint from './allowed-fields-2-0--2-4.ts';
import allowedFields2_5__2_6Lint from './allowed-fields-2-5--2-6.ts';
import urlFormatURILint from './url--format-uri.ts';
import urlRequiredLint from './url--required.ts';
import protocolType from './protocol--type.ts';
import protocolRequiredLint from './protocol--required.ts';
import protocolVersionType from './protocol-version--type.ts';
import descriptionTypeLint from './description--type.ts';
import variablesTypeLint from './variables--type.ts';
import variablesValuesTypeLint from './variables--values-type.ts';
import securityTypeLint from './security--type.ts';
import securityItemsTypeLint from './security--items-type.ts';
import tagsTypeLint from './tags--type.ts';
import bindingsTypeLint from './bindings--type.ts';
import $refValidLint from './$ref--valid.ts';
import $refNoSiblingsLint from './$ref--no-siblings.ts';

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
  allowedFields2_0__2_4Lint,
  allowedFields2_5__2_6Lint,
  $refValidLint,
  $refNoSiblingsLint,
];

export default lints;
