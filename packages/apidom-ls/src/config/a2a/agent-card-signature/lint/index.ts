import allowedFieldsLint from './allowed-fields.ts';
import protectedLint from './protected--type.ts';
import signatureLint from './signature--type.ts';
import headerLint from './header--type.ts';

const lints = [allowedFieldsLint, protectedLint, signatureLint, headerLint];

export default lints;
