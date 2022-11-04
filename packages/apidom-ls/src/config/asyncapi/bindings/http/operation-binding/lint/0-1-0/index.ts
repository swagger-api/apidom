import allowedFieldsLint from './allowed-fields';
import typeTypeLint from './type--type';
import typeRequiredLint from './type--required';
import methodTypeLint from './method--type';
import queryTypeLint from './query--type';

const lints = [allowedFieldsLint, typeTypeLint, typeRequiredLint, methodTypeLint, queryTypeLint];

export default lints;
