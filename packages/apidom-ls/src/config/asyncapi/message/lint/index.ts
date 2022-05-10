import messageIdLint from './messageId';
import messageTagsLint from './tags';
import messageDescriptionLint from './description';
import messageSummaryLint from './summary';
import externalDocsObjectLint from '../../asyncapi2/lint/externaldocs-object';
import messageBindingsLint from './bindings';
import messageTraitsLint from './traits';
import messageAllowedFields2_0__2_3Lint from './allowed-fields-2-0--2-3';
import messageAllowedFields2_4Lint from './allowed-fields-2-4';
import messageHeadersLint from './headers';
import messageCorrelationId from './correlation-id';
import messageSchemaFormatLint from './schema-format';
import message$RefLint from './ref';
import messageRefNonSiblingsLint from './ref-non-siblings';
import messageContentTypeLint from './content-type';
import messageNameLint from './name';
import messageTitleLint from './title';
import messageExamplesLint from './examples';

const lints = [
  messageIdLint,
  messageHeadersLint,
  messageTagsLint,
  messageDescriptionLint,
  messageSummaryLint,
  externalDocsObjectLint,
  messageBindingsLint,
  messageTraitsLint,
  message$RefLint,
  messageAllowedFields2_0__2_3Lint,
  messageAllowedFields2_4Lint,
  messageCorrelationId,
  messageSchemaFormatLint,
  messageRefNonSiblingsLint,
  messageContentTypeLint,
  messageNameLint,
  messageTitleLint,
  messageExamplesLint,
];

export default lints;
