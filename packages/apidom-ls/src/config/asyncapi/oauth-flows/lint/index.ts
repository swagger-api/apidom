import oAuthFlowsImplicitLint from './implicit';
import oAuthFlowsPasswordLint from './password';
import oAuthFlowsClientCredentialsLint from './client-credentials';
import oAuthFlowsAuthorizationCodeLint from './authorization-code';

const lints = [
  oAuthFlowsImplicitLint,
  oAuthFlowsPasswordLint,
  oAuthFlowsClientCredentialsLint,
  oAuthFlowsAuthorizationCodeLint,
];

export default lints;
