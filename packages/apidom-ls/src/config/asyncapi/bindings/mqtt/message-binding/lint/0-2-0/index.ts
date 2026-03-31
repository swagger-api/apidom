import allowedFieldsLint from './allowed-fields.ts';
import payloadFormatIndicatorEqualsLint from './payload-format-indicator--equals.ts';
import correlationDataTypeLint from './correlation-data--type.ts';
import contentTypeTypeLint from './content-type--type.ts';
import responseTopicTypeLint from './response-topic--type.ts';
import responseTopicFormatURILint from './response-topic--format-uri.ts';

const lints = [
  allowedFieldsLint,
  payloadFormatIndicatorEqualsLint,
  correlationDataTypeLint,
  contentTypeTypeLint,
  responseTopicTypeLint,
  responseTopicFormatURILint,
];

export default lints;
