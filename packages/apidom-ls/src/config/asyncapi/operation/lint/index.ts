import operationIdLint from './operationid';
import operationTagsLint from './tags';
import operationDescriptionLint from './description';
import operationSummaryLint from './summary';
import externaldocsObjectLint from '../../asyncapi2/lint/externaldocs-object';
import operationBindingsLint from './bindings';
import operationTraitsLint from './traits';
import operationMessageLint from './message';
import operationIdUniqueLint from './operationid-unique';
import operationAllowedFields2_0__2_3Lint from './allowed-fields-2-0--2-3';
import operationAllowedFields2_4Lint from './allowed-fields-2-4';

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
  operationAllowedFields2_0__2_3Lint,
  operationAllowedFields2_4Lint,
];

export default lints;
