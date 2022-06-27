import securitySchemeTypeLint2_0 from './type2-0';
import securitySchemeTypeLint2_1__2_4 from './type2-1--2-4';
import securitySchemeDescriptionLint from './description';
import securitySchemeNameLint from './name';
import securitySchemeNameRequiredLint from './name-required';
import securitySchemeInLint from './in';
import securitySchemeInRequiredApiKeyLint from './in-required-api-key';
import securitySchemeInRequiredHttpApiKeyLint from './in-required-http-api-key';
import securitySchemeSchemeLint from './scheme';
import securitySchemeSchemeRequiredLint from './scheme-required';
import securitySchemeBearerFormatLint from './bearer-format';
import securitySchemeFlowsLint from './flows';
import securitySchemeFlowsRequiredLint from './flows-required';
import securitySchemeOpenIdConnectUrlLint from './open-id-connect-url';
import securitySchemeOpenIdConnectUrlRequiredLint from './open-id-connect-url-required';

const lints = [
  securitySchemeTypeLint2_0,
  securitySchemeTypeLint2_1__2_4,
  securitySchemeDescriptionLint,
  securitySchemeNameLint,
  securitySchemeNameRequiredLint,
  securitySchemeInLint,
  securitySchemeInRequiredApiKeyLint,
  securitySchemeInRequiredHttpApiKeyLint,
  securitySchemeSchemeLint,
  securitySchemeSchemeRequiredLint,
  securitySchemeBearerFormatLint,
  securitySchemeFlowsLint,
  securitySchemeFlowsRequiredLint,
  securitySchemeOpenIdConnectUrlLint,
  securitySchemeOpenIdConnectUrlRequiredLint,
];

export default lints;
