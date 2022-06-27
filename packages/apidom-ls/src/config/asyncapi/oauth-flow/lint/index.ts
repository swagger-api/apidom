import oAuthFlowAuthorizationUrlLint from './authorization-url';
import oAuthFlowAuthorizationUrlRequiredLint from './authorization-url-required';
import oAuthFlowTokenUrlLint from './token-url';
import oAuthFlowTokenUrlRequiredLint from './token-url-required';
import oAuthFlowRefreshUrlLint from './refresh-url';
import oAuthFlowScopesLint from './scopes';
import oAuthFlowScopesRequiredLint from './scopes-required';
import oAuthFlowAllowedFieldsLint from './allowed-fields';

const lints = [
  oAuthFlowAuthorizationUrlLint,
  oAuthFlowAuthorizationUrlRequiredLint,
  oAuthFlowTokenUrlLint,
  oAuthFlowTokenUrlRequiredLint,
  oAuthFlowRefreshUrlLint,
  oAuthFlowScopesLint,
  oAuthFlowScopesRequiredLint,
  oAuthFlowAllowedFieldsLint,
];

export default lints;
