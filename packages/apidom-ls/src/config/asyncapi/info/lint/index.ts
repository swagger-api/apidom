import allowedFieldsLint from './allowed-fields.ts';
import allowedFields3_0Lint from './allowed-fields-3-0.ts';
import titleRequiredLint from './title--required.ts';
import titleTypeLint from './title--type.ts';
import versionRequiredLint from './version--required.ts';
import versionTypeLint from './version--type.ts';
import descriptionTypeLint from './description--type.ts';
import termsOfServiceFormatURILint from './terms-of-service--format-uri.ts';
import contactTypeLint from './contact--type.ts';
import licenseTypeLint from './license--type.ts';
import tagsTypeLint from './tags--type.ts';
import externalDocsTypeLint from './external-docs--type.ts';

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
  allowedFields3_0Lint,
  tagsTypeLint,
  externalDocsTypeLint,
];

export default lints;
