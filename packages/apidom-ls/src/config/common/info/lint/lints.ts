import infoVersionLint from './version';
import infoVersionRequiredLint from './version-required';
import infoTitleRequiredLint from './title-required';
import infoTitleLint from './title';
import infoDescriptionLint from './description';
import infoTermsOfServiceLint from './termsofservice';
import contactObjectLint from './contact-object';
import licenseObjectLint from './license-object';

const infoLints = [
  infoTitleLint,
  infoVersionLint,
  infoVersionRequiredLint,
  infoTitleRequiredLint,
  infoDescriptionLint,
  infoTermsOfServiceLint,
  contactObjectLint,
  licenseObjectLint,
];

export default infoLints;
