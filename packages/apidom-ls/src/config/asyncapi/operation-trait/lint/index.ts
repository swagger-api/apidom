import operationIdLint from '../../operation/lint/operationid';
import operationTagsLint from '../../operation/lint/tags';
import operationDescriptionLint from '../../operation/lint/description';
import operationSummaryLint from '../../operation/lint/summary';
import externaldocsObjectLint from '../../asyncapi2/lint/external-docs--type';
import operationBindingsLint from '../../operation/lint/bindings';
import operationIdUniqueLint from '../../operation/lint/operationid-unique';
import operationTraitAllowedFields2_0__2_3Lint from './allowed-fields-2-0--2-3';
import operationTraitAllowedFields2_4Lint from './allowed-fields-2-4';

const lints = [
  operationIdLint,
  operationTagsLint,
  operationDescriptionLint,
  operationSummaryLint,
  externaldocsObjectLint,
  operationBindingsLint,
  operationIdUniqueLint,
  operationTraitAllowedFields2_0__2_3Lint,
  operationTraitAllowedFields2_4Lint,
];

export default lints;
