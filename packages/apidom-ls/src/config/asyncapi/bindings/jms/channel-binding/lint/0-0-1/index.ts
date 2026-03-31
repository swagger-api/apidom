import allowedFieldsLint from './allowed-fields.ts';
import destinationTypeLint from './destination--type.ts';
import destinationTypeEqualsLint from './destination-type--equals.ts';

const lints = [destinationTypeLint, destinationTypeEqualsLint, allowedFieldsLint];

export default lints;
