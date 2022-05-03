import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const componentsAllowedFieldsLint: LinterMeta = {
  code: ApilintCodes.ALL_NOT_ALLOWED_FIELDS,
  source: 'apilint',
  message: 'Object includes not allowed fields',
  severity: 1,
  linterFunction: 'allowedFields',
  linterParams: [
    [
      'schemas',
      'servers',
      'serverVariables',
      'channels',
      'messages',
      'securitySchemes',
      'parameters',
      'correlationIds',
      'operationTraits',
      'messageTraits',
      'serverBindings',
      'channelBindings',
      'operationBindings',
      'messageBindings',
    ],
    'x-',
  ],
  marker: 'key',
  targetSpecs: [{ namespace: 'asyncapi', version: '2.4.0' }],
};

export default componentsAllowedFieldsLint;
