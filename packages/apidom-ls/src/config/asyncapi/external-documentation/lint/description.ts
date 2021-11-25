import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const externalDocsDescriptionLint: LinterMeta = {
  code: ApilintCodes.EXTERNALDOC_DESCRIPTION,
  source: 'apilint',
  message: "description' value must be a string",
  severity: 1,
  linterFunction: 'apilintType',
  linterParams: ['string'],
  marker: 'value',
  target: 'description',
  data: {},
};

export default externalDocsDescriptionLint;
