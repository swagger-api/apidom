import allowedFields3_0Lint from './allowed-fields-3-0';
import typeEquals3_0Lint from './type--equals-3-0';
import descriptionTypeLint from './description--type';
import nameTypeLint from './name--type';
import nameRequiredLint from './name--required';
import inEqualsLint from './in--equals';
import inRequiredLint from './in--required';
import schemeTypeLint from './scheme--type';
import schemeRequiredLint from './scheme--required';
import bearerFormatTypeLint from './bearer-format--type';
import flowsTypeLint from './flows--type';
import flowsRequiredLint from './flows--required';
import openIdConnectUrlFormatURILint from './open-id-connect-url--format-uri';
import openIdConnectUrlRequiredLint from './open-id-connect-url--required';

const lints = [
  typeEquals3_0Lint,
  descriptionTypeLint,
  nameTypeLint,
  nameRequiredLint,
  inEqualsLint,
  inRequiredLint,
  schemeTypeLint,
  schemeRequiredLint,
  bearerFormatTypeLint,
  flowsTypeLint,
  flowsRequiredLint,
  openIdConnectUrlFormatURILint,
  openIdConnectUrlRequiredLint,
  allowedFields3_0Lint,
];

export default lints;
