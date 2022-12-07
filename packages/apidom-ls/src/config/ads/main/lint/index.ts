import allowedFieldsLint from './allowed-fields';
import infoTypeLint from './info--type';
import infoRequiredLint from './info--required';
import versionPatternLint from './version--pattern';
import versionRequiredLint from './version--required';

const lints = [
  infoTypeLint,
  infoRequiredLint,
  versionPatternLint,
  versionRequiredLint,
  allowedFieldsLint,
];

export default lints;
