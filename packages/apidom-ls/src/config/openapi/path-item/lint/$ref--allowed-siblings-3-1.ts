import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

// eslint-disable-next-line @typescript-eslint/naming-convention
const $refAllowedSiblings3_1Lint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_1_PATH_ITEM_FIELD_$REF_ALLOWED_SIBLINGS,
  source: 'apilint',
  message:
    'All other properties other then summary and description in a Reference Object are ignored',
  severity: 2,
  linterFunction: 'allowedFields',
  linterParams: [['$ref', 'summary', 'description']],
  marker: 'key',
  conditions: [
    {
      function: 'existFields',
      params: [['$ref']],
    },
  ],
  data: {},
  targetSpecs: [{ namespace: 'openapi', version: '3.1.0' }],
};

export default $refAllowedSiblings3_1Lint;
