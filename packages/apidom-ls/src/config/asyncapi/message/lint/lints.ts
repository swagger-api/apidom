import messageTagsLint from './tags';
import messageDescriptionLint from './description';
import messageSummaryLint from './summary';
import externaldocsObjectLint from '../../asyncapi2/lint/externaldocs-object';
import messageBindingsLint from './bindings';
import messageTraitsLint from './traits';
import messageAllowedFieldsLint from './allowed-fields';
import messageHeaders from './headers';
import messageCorrelationId from './correlation-id';
import messageSchemaFormatLint from './schema-format';
import message$RefLint from './ref';
import messageRefNonSiblingsLint from './ref-non-siblings';
import messageContentTypeLint from './content-type';
import messageNameLint from './name';
import messageTitleLint from './title';
import messageExamplesLint from './examples';

const messageLints = [
  messageHeaders,
  messageTagsLint,
  messageDescriptionLint,
  messageSummaryLint,
  externaldocsObjectLint,
  messageBindingsLint,
  messageTraitsLint,
  message$RefLint,
  messageAllowedFieldsLint,
  messageCorrelationId,
  messageSchemaFormatLint,
  messageRefNonSiblingsLint,
  messageContentTypeLint,
  messageNameLint,
  messageTitleLint,
  messageExamplesLint,
];

export default messageLints;
