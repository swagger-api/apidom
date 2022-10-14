import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const identifierMutuallyExclusiveLint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_1_LICENSE_FIELD_IDENTIFIER_MUTUALLY_EXCLUSIVE,
  source: 'apilint',
  message: 'The identifier field and url field are mutually exclusive.',
  severity: 1,
  linterFunction: 'allowedFields',
  linterParams: [['identifier']],
  marker: 'key',
  target: 'identifier',
  data: {},
  conditions: [
    {
      function: 'existFields',
      params: [['url']],
    },
  ],
  targetSpecs: [{ namespace: 'openapi', version: '3.1.0' }],
};

export default identifierMutuallyExclusiveLint;
