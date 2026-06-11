import allowedFieldsLint from './allowed-fields.ts';
import flowsRequiredLint from './flows--required.ts';
import flowsTypeLint from './flows--type.ts';
import descriptionTypeLint from './description--type.ts';
import oauth2MetadataUrlTypeLint from './oauth2-metadata-url--type.ts';

const lints = [allowedFieldsLint, flowsRequiredLint, flowsTypeLint, descriptionTypeLint, oauth2MetadataUrlTypeLint];

export default lints;
