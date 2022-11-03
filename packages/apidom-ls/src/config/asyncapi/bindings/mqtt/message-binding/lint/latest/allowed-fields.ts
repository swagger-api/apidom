import ApilintCodes from '../../../../../../codes';
import { LinterMeta } from '../../../../../../../apidom-language-types';

const allowedFieldsLint: LinterMeta = {
  code: ApilintCodes.NOT_ALLOWED_FIELDS,
  source: 'apilint',
  message: 'This object MUST NOT contain any properties. Its name is reserved for future use.',
  severity: 1,
  linterFunction: 'allowedFields',
  linterParams: [['bindingVersion']],
  marker: 'key',
  conditions: [
    {
      function: 'missingField',
      params: ['bindingVersion'],
    },
  ],
};

export default allowedFieldsLint;
