import titleRequiredLint from './title--required.ts';
import titleTypeLint from './title--type.ts';
import descriptionTypeLint from './description--type.ts';
import allowedFieldsLint from './allowed-fields.ts';

const lints = [titleTypeLint, titleRequiredLint, descriptionTypeLint, allowedFieldsLint];

export default lints;
