import ApilintCodes from '../../../../../../codes';
import { LinterMeta } from '../../../../../../../apidom-language-types';

const schemaRegistryVendorTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_KAFKA_SERVER_BINDING_FIELD_SCHEMA_REGISTRY_VENDOR_TYPE,
  source: 'apilint',
  message: "'schemaRegistryVendor' value must be a string",
  severity: 1,
  linterFunction: 'apilintType',
  linterParams: ['string'],
  marker: 'value',
  target: 'schemaRegistryVendor',
  data: {},
  conditions: [
    {
      function: 'missingField',
      params: ['bindingVersion'],
    },
  ],
};

export default schemaRegistryVendorTypeLint;
