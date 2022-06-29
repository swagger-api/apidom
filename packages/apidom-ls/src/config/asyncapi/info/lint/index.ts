import allowedFieldsLint from './allowed-fields';
import titleRequiredLint from './title--required';
import titleTypeLint from './title--type';
import versionRequiredLint from './version--required';
import versionTypeLint from './version--type';
import descriptionTypeLint from './description--type';
import termsOfServiceURILint from './terms-of-service--uri';
import contactTypeLint from './contact--type';
import licenseTypeLint from './license--type';

const lints = [
  titleTypeLint,
  versionTypeLint,
  versionRequiredLint,
  titleRequiredLint,
  descriptionTypeLint,
  termsOfServiceURILint,
  contactTypeLint,
  licenseTypeLint,
  allowedFieldsLint,
];

export default lints;
