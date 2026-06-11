import allowedFieldsLint from './allowed-fields.ts';
import openIdConnectUrlRequiredLint from './open-id-connect-url--required.ts';
import openIdConnectUrlTypeLint from './open-id-connect-url--type.ts';
import descriptionTypeLint from './description--type.ts';

const lints = [allowedFieldsLint, openIdConnectUrlRequiredLint, openIdConnectUrlTypeLint, descriptionTypeLint];

export default lints;
