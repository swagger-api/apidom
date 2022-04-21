import operationIdLint from './operationid';
import operationTagsLint from './tags';
import operationDescriptionLint from './description';
import operationSummaryLint from './summary';
import externaldocsObjectLint from '../../asyncapi2/lint/externaldocs-object';
import operationBindingsLint from './bindings';
import operationTraitsLint from './traits';
import operationMessageLint from './message';
import operationIdUniqueLint from './operationid-unique';
import operationAllowedFieldsLint from './allowed-fields';

const lints = [
  operationIdLint,
  operationTagsLint,
  operationDescriptionLint,
  operationSummaryLint,
  externaldocsObjectLint,
  operationBindingsLint,
  operationTraitsLint,
  operationMessageLint,
  operationIdUniqueLint,
  operationAllowedFieldsLint,
];

export default lints;
