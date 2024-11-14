import allowedFieldsLint from './allowed-fields.ts';
import typeRequiredLint from './type--required.ts';
import typeEqualsLint2_0Lint from './type--equals-2-0.ts';
import typeEqualsLint2_1__2_6Lint from './type--equals-2-1--2-6.ts';
import descriptionTypeLint from './description--type.ts';
import nameTypeLint from './name--type.ts';
import nameRequiredLint from './name--required.ts';
import inRequiredApiKeyLint from './in--required-api-key.ts';
import inRequiredHttpApiKeyLint from './in--required-http-api-key.ts';
import inEqualsApiKeyLint from './in--equals-api-key.ts';
import inEqualsHttpApiKeyLint from './in--equals-http-api-key.ts';
import schemeTypeLint from './scheme--type.ts';
import schemeRequiredLint from './scheme--required.ts';
import bearerFormatTypeLint from './bearer-format--type.ts';
import flowsTypeLint from './flows--type.ts';
import flowsRequiredLint from './flows--required.ts';
import openIdConnectUrlRequiredLint from './open-id-connect-url--required.ts';
import openIdConnectUrlFormatURILint from './open-id-connect-url--format-uri.ts';
import $refNoSiblingsLint from './$ref--no-siblings.ts';
import $refValidLint from './$ref--valid.ts';

const lints = [
  typeRequiredLint,
  typeEqualsLint2_0Lint,
  typeEqualsLint2_1__2_6Lint,
  descriptionTypeLint,
  nameTypeLint,
  nameRequiredLint,
  inRequiredApiKeyLint,
  inRequiredHttpApiKeyLint,
  inEqualsApiKeyLint,
  inEqualsHttpApiKeyLint,
  schemeTypeLint,
  schemeRequiredLint,
  bearerFormatTypeLint,
  flowsTypeLint,
  flowsRequiredLint,
  openIdConnectUrlRequiredLint,
  openIdConnectUrlFormatURILint,
  $refNoSiblingsLint,
  $refValidLint,
  allowedFieldsLint,
];

export default lints;
