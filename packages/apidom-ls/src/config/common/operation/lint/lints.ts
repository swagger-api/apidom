import operationIdLint from './operationid';
import operationTagsLint from './tags';
import operationDescriptionLint from './description';
import operationSummaryLint from './summary';
import externaldocsObjectLint from '../../../asyncapi/asyncapi2/lint/externaldocs-object';
import operationBindingsLint from './bindings';
import operationTraitsLint from './traits';
import operationMessageLint from './message';
import operationIdUniqueLint from './operationid-unique';

const operationLints = [
  operationIdLint,
  operationTagsLint,
  operationDescriptionLint,
  operationSummaryLint,
  externaldocsObjectLint,
  operationBindingsLint,
  operationTraitsLint,
  operationMessageLint,
  operationIdUniqueLint,
];

export default operationLints;
