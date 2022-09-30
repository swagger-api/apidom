import allowedFields3_0Lint from './allowed-fields-3-0';
import allowedFields3_1Lint from './allowed-fields-3-1';
import titleTypeLint from './title--type';
import titleRequiredLint from './title--required';
import summaryTypeLint from './summary--type';
import descriptionTypeLint from './description--type';
import termsOfServiceTypeLint from './terms-of-service--type';
import termsOfServiceFormatURILint from './terms-of-service--format-uri';
import contactTypeLint from './contact--type';
import licenseTypeLint from './license--type';
import versionTypeLint from './version--type';
import versionRequiredLint from './version--required';

const lints = [
  titleTypeLint,
  titleRequiredLint,
  summaryTypeLint,
  descriptionTypeLint,
  termsOfServiceTypeLint,
  termsOfServiceFormatURILint,
  contactTypeLint,
  licenseTypeLint,
  versionTypeLint,
  versionRequiredLint,
  allowedFields3_0Lint,
  allowedFields3_1Lint,
];

export default lints;
