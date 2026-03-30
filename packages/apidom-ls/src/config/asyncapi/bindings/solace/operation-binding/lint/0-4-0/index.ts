import allowedFieldsLint from './allowed-fields.ts';
import destinationsItemsTypeLint from './destinations--items-type.ts';
import timeToLiveTypeLint from './time-to-live--type.ts';
import priorityTypeLint from './priority--type.ts';
import dmqEligibleTypeLint from './dmq-eligible--type.ts';

const lints = [
  allowedFieldsLint,
  destinationsItemsTypeLint,
  timeToLiveTypeLint,
  priorityTypeLint,
  dmqEligibleTypeLint,
];

export default lints;
