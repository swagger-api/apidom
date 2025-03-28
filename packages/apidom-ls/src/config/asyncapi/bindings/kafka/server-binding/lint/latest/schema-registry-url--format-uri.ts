import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../../../../codes.ts';
import { LinterMeta } from '../../../../../../../apidom-language-types.ts';

const schemaRegistryUrlFormatURILint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_KAFKA_SERVER_BINDING_FIELD_SCHEMA_REGISTRY_URL_FORMAT_URI,
  source: 'apilint',
  message: "'schemaRegistryUrl' MUST be in the format of a URL.",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintValidURI',
  linterParams: [true],
  marker: 'value',
  target: 'schemaRegistryUrl',
  data: {},
  conditions: [
    {
      function: 'missingField',
      params: ['bindingVersion'],
    },
  ],
};

export default schemaRegistryUrlFormatURILint;
