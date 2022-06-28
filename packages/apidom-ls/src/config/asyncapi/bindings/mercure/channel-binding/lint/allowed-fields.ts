import ApilintCodes from '../../../../../codes';
import { LinterMeta } from '../../../../../../apidom-language-types';

const mercureChannelBindingAllowedFieldsLint: LinterMeta = {
  code: ApilintCodes.ALL_NOT_ALLOWED_FIELDS,
  source: 'apilint',
  message: 'This object MUST NOT contain any properties. Its name is reserved for future use.',
  severity: 1,
  linterFunction: 'allowedFields',
  linterParams: [[]],
  marker: 'key',
};

export default mercureChannelBindingAllowedFieldsLint;
