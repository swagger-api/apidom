import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../../../../codes.ts';
import { LinterMeta } from '../../../../../../../apidom-language-types.ts';

const schemaRegistryVendorRequiredLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_KAFKA_SERVER_BINDING_FIELD_SCHEMA_REGISTRY_VENDOR_REQUIRED,
  source: 'apilint',
  message: "should always have a 'asyncapi' value",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'hasRequiredField',
  linterParams: ['schemaRegistryVendor'],
  marker: 'key',
  data: {
    quickFix: [
      {
        message: "add 'schemaRegistryVendor' section",
        action: 'addChild',
        snippetYaml: "schemaRegistryVendor: ''\n",
        snippetJson: '"schemaRegistryVendor": "",\n',
      },
    ],
  },
  conditions: [
    {
      function: 'missingField',
      params: ['bindingVersion'],
    },
    {
      function: 'existFields',
      params: [['schemaRegistryUrl']],
    },
  ],
};

export default schemaRegistryVendorRequiredLint;
