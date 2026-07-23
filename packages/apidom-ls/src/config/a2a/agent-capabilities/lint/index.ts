import allowedFieldsLint from './allowed-fields.ts';
import streamingLint from './streaming--type.ts';
import pushNotificationsLint from './push-notifications--type.ts';
import extendedAgentCardLint from './extended-agent-card--type.ts';
import extensionsLint from './extensions--type.ts';

const lints = [
  allowedFieldsLint,
  streamingLint,
  pushNotificationsLint,
  extendedAgentCardLint,
  extensionsLint,
];

export default lints;
