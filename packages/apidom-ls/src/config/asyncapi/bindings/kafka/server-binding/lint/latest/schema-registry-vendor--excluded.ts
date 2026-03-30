import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../../../../codes.ts';
import { LinterMeta } from '../../../../../../../apidom-language-types.ts';

const schemaRegistryVendorExcludedLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_KAFKA_SERVER_BINDING_FIELD_SCHEMA_REGISTRY_VENDOR_EXCLUDED,
  source: 'apilint',
  message: "'schemaRegistryVendor' MUST NOT be specified if 'schemaRegistryUrl' is not specified.",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'missingField',
  linterParams: ['schemaRegistryVendor'],
  marker: 'key',
  data: {},
  conditions: [
    {
      function: 'missingField',
      params: ['bindingVersion'],
    },
    {
      function: 'missingField',
      params: ['schemaRegistryUrl'],
    },
  ],
};

export default schemaRegistryVendorExcludedLint;
