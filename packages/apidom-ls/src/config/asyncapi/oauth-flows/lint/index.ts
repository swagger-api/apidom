import oAuthFlowsImplicitLint from './implicit';
import oAuthFlowsPasswordLint from './password';
import oAuthFlowsClientCredentialsLint from './client-credentials';
import oAuthFlowsAuthorizationCodeLint from './authorization-code';
import oAuthFlowsAllowedFieldsLint from './allowed-fields';

const lints = [
  oAuthFlowsImplicitLint,
  oAuthFlowsPasswordLint,
  oAuthFlowsClientCredentialsLint,
  oAuthFlowsAuthorizationCodeLint,
  oAuthFlowsAllowedFieldsLint,
];

export default lints;
