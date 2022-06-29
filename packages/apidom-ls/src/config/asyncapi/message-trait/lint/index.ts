import messageTraitIdLint from './messageId';
import messageTraitTagsLint from './tags';
import messageTraitDescriptionLint from './description';
import messageTraitSummaryLint from './summary';
import messageTraitExternalDocsObjectLint from '../../asyncapi2/lint/external-docs--type';
import messageTraitBindingsLint from './bindings';
import messageTraitAllowedFields2_0__2_3Lint from './allowed-fields-2-0--2-3';
import messageTraitAllowedFields2_4Lint from './allowed-fields-2-4';
import messageTraitHeadersLint from './headers';
import messageTraitCorrelationId from './correlation-id';
import messageTraitSchemaFormatLint from './schema-format';
import messageTrait$RefLint from './ref';
import messageTraitRefNonSiblingsLint from './ref-non-siblings';
import messageTraitContentTypeLint from './content-type';
import messageTraitNameLint from './name';
import messageTraitTitleLint from './title';
import messageTraitExamplesLint from './examples';

const lints = [
  messageTraitIdLint,
  messageTraitHeadersLint,
  messageTraitTagsLint,
  messageTraitDescriptionLint,
  messageTraitSummaryLint,
  messageTraitExternalDocsObjectLint,
  messageTraitBindingsLint,
  messageTrait$RefLint,
  messageTraitAllowedFields2_0__2_3Lint,
  messageTraitAllowedFields2_4Lint,
  messageTraitCorrelationId,
  messageTraitSchemaFormatLint,
  messageTraitRefNonSiblingsLint,
  messageTraitContentTypeLint,
  messageTraitNameLint,
  messageTraitTitleLint,
  messageTraitExamplesLint,
];

export default lints;
