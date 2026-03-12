import allowedFieldsLint from './allowed-fields.ts';
import destinationTypeLint from './destination--type.ts';
import destinationTypeTypeLint from './destination-type--type.ts';

const lints = [destinationTypeLint, destinationTypeTypeLint, allowedFieldsLint];

export default lints;
