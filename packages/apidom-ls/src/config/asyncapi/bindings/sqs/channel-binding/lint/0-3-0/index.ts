import allowedFieldsLint from './allowed-fields.ts';
import queueTypeLint from './queue--type.ts';
import deadLetterQueueTypeLint from './dead-letter-queue--type.ts';

const lints = [queueTypeLint, deadLetterQueueTypeLint, allowedFieldsLint];

export default lints;
