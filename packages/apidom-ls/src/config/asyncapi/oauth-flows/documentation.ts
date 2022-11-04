import { last } from 'ramda';

import oauthFlowDocumentation from '../oauth-flow/documentation';

const oAuthFlowDocs = last(oauthFlowDocumentation)?.docs || 'Configuration for the OAuth flow.';

const documentation = [
  {
    target: 'implicit',
    docs: oAuthFlowDocs,
  },
  {
    target: 'password',
    docs: oAuthFlowDocs,
  },
  {
    target: 'clientCredentials',
    docs: oAuthFlowDocs,
  },
  {
    target: 'authorizationCode',
    docs: oAuthFlowDocs,
  },
  {
    docs: '#### [OAuth Flows Object](https://www.asyncapi.com/docs/reference/specification/v2.5.0#oauthFlowsObject)\n\nAllows configuration of the supported OAuth Flows.\n\n##### Fixed Fields\nField Name | Type | Description\n---|:---:|---\nimplicit| [OAuth Flow Object](https://www.asyncapi.com/docs/reference/specification/v2.5.0#oauthFlowObject) | Configuration for the OAuth Implicit flow.\npassword| [OAuth Flow Object](https://www.asyncapi.com/docs/reference/specification/v2.5.0#oauthFlowObject) | Configuration for the OAuth Resource Owner Protected Credentials flow\nclientCredentials| [OAuth Flow Object](https://www.asyncapi.com/docs/reference/specification/v2.5.0#oauthFlowObject) | Configuration for the OAuth Client Credentials flow.\nauthorizationCode| [OAuth Flow Object](https://www.asyncapi.com/docs/reference/specification/v2.5.0#oauthFlowObject) | Configuration for the OAuth Authorization Code flow.\n\nThis object MAY be extended with [Specification Extensions](https://www.asyncapi.com/docs/reference/specification/v2.5.0#specificationExtensions).',
  },
];
export default documentation;
