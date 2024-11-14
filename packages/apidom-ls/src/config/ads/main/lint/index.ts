import allowedFieldsLint from './allowed-fields.ts';
import infoTypeLint from './info--type.ts';
import infoRequiredLint from './info--required.ts';
import versionPatternLint from './version--pattern.ts';
import versionRequiredLint from './version--required.ts';

const lints = [
  infoTypeLint,
  infoRequiredLint,
  versionPatternLint,
  versionRequiredLint,
  allowedFieldsLint,
];

export default lints;
