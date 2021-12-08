import operationIdLint from '../../../common/operation/lint/operationid';
import operationTagsLint from '../../../common/operation/lint/tags';
import operationDescriptionLint from '../../../common/operation/lint/description';
import operationSummaryLint from '../../../common/operation/lint/summary';
import externaldocsObjectLint from '../../asyncapi2/lint/externaldocs-object';
import operationBindingsLint from '../../../common/operation/lint/bindings';
import operationIdUniqueLint from '../../../common/operation/lint/operationid-unique';

const operationTraitLints = [
  operationIdLint,
  operationTagsLint,
  operationDescriptionLint,
  operationSummaryLint,
  externaldocsObjectLint,
  operationBindingsLint,
  operationIdUniqueLint,
];

export default operationTraitLints;
