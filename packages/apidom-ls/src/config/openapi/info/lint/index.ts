import infoVersionLint from './version';
import infoVersionRequiredLint from './version-required';
import infoTitleRequiredLint from './title-required';
import infoTitleLint from './title';
import infoSummaryLint from './summary';
import infoDescriptionLint from './description';
import infoTermsOfServiceLint from './terms-of-service';
import contactObjectLint from './contact-object';
import licenseObjectLint from './license-object';
import infoAllowedFieldsLint from './allowed-fields';

const infoLints = [
  infoTitleLint,
  infoSummaryLint,
  infoVersionLint,
  infoVersionRequiredLint,
  infoTitleRequiredLint,
  infoDescriptionLint,
  infoTermsOfServiceLint,
  contactObjectLint,
  licenseObjectLint,
  infoAllowedFieldsLint,
];

export default infoLints;
