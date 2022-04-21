import operationIdLint from '../../operation/lint/operationid';
import operationTagsLint from '../../operation/lint/tags';
import operationDescriptionLint from '../../operation/lint/description';
import operationSummaryLint from '../../operation/lint/summary';
import externaldocsObjectLint from '../../asyncapi2/lint/externaldocs-object';
import operationBindingsLint from '../../operation/lint/bindings';
import operationIdUniqueLint from '../../operation/lint/operationid-unique';
import operationTraitAllowedFieldsLint from './allowed-fields';

const lints = [
  operationIdLint,
  operationTagsLint,
  operationDescriptionLint,
  operationSummaryLint,
  externaldocsObjectLint,
  operationBindingsLint,
  operationIdUniqueLint,
  operationTraitAllowedFieldsLint,
];

export default lints;
