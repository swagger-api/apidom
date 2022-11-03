import allowedFieldsLint from './allowed-fields';
import typeRequiredLint from './type--required';
import typeEqualsLint2_0Lint from './type--equals-2-0';
import typeEqualsLint2_1__2_5int from './type--equals-2-1--2-5';
import descriptionTypeLint from './description--type';
import nameTypeLint from './name--type';
import nameRequiredLint from './name--required';
import inRequiredApiKeyLint from './in--required-api-key';
import inRequiredHttpApiKeyLint from './in--required-http-api-key';
import inEqualsApiKeyLint from './in--equals-api-key';
import inEqualsHttpApiKeyLint from './in--equals-http-api-key';
import schemeTypeLint from './scheme--type';
import schemeRequiredLint from './scheme--required';
import bearerFormatTypeLint from './bearer-format--type';
import flowsTypeLint from './flows--type';
import flowsRequiredLint from './flows--required';
import openIdConnectUrlRequiredLint from './open-id-connect-url--required';
import openIdConnectUrlFormatURILint from './open-id-connect-url--format-uri';

const lints = [
  typeRequiredLint,
  typeEqualsLint2_0Lint,
  typeEqualsLint2_1__2_5int,
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
  allowedFieldsLint,
];

export default lints;
