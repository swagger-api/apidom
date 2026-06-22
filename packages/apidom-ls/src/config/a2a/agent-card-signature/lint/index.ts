import allowedFieldsLint from './allowed-fields.ts';
import protectedRequiredLint from './protected--required.ts';
import signatureRequiredLint from './signature--required.ts';
import protectedLint from './protected--type.ts';
import signatureLint from './signature--type.ts';
import headerLint from './header--type.ts';

const lints = [
  allowedFieldsLint,
  protectedRequiredLint,
  signatureRequiredLint,
  protectedLint,
  signatureLint,
  headerLint,
];

export default lints;
