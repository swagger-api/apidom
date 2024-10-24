import openapiSchemaJson31Ajv from '../json-schema/open-api-31/openapi-schema-31-ajv';
import { JsonSchemaValidationProvider } from './json-schema-validation-provider';
import { NamespaceVersion } from '../../../apidom-language-types';

// TODO separate providers for OAS 3.1 and 3.0
// eslint-disable-next-line import/prefer-default-export
export class OpenAPi31JsonSchemaValidationProvider extends JsonSchemaValidationProvider {
  public constructor(jsonSchema?: Record<string, unknown>, ajv2020 = false) {
    // default to OAI provided 3.1 schema
    if (!jsonSchema) {
      super(true, openapiSchemaJson31Ajv);
    } else {
      super(ajv2020, jsonSchema);
    }
  }

  // eslint-disable-next-line class-methods-use-this
  break(): boolean {
    return false;
  }

  // eslint-disable-next-line class-methods-use-this
  namespaces(): NamespaceVersion[] {
    return [
      { namespace: 'openapi', version: '3.1.0' },
      { namespace: 'openapi', version: '3.0.0' },
    ];
  }

  // eslint-disable-next-line class-methods-use-this
  name(): string {
    return 'openapi schema';
  }
}
