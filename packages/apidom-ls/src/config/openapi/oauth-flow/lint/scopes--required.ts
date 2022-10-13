import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const scopesRequiredLint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_0_OAUTH_FLOW_FIELD_SCOPES_REQUIRED,
  source: 'apilint',
  message: "should always have a 'scopes'",
  severity: 1,
  linterFunction: 'hasRequiredField',
  linterParams: ['scopes'],
  marker: 'key',
  data: {
    quickFix: [
      {
        message: "add 'scopes' field",
        action: 'addChild',
        snippetYaml: 'scopes: \n  ',
        snippetJson: '"scopes": {},\n    ',
      },
    ],
  },
};

export default scopesRequiredLint;
