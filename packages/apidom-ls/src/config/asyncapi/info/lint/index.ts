import allowedFieldsLint from './allowed-fields';
import titleRequiredLint from './title--required';
import titleTypeLint from './title--type';
import versionRequiredLint from './version--required';
import versionTypeLint from './version--type';
import descriptionTypeLint from './description--type';
import termsOfServiceFormatURILint from './terms-of-service--format-uri';
import contactTypeLint from './contact--type';
import licenseTypeLint from './license--type';

const lints = [
  titleTypeLint,
  versionTypeLint,
  versionRequiredLint,
  titleRequiredLint,
  descriptionTypeLint,
  termsOfServiceFormatURILint,
  contactTypeLint,
  licenseTypeLint,
  allowedFieldsLint,
];

export default lints;
