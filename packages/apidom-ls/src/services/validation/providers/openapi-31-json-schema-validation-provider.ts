import openapiSchemaJson31Meta from '../json-schema/open-api-31/openapi-schema-31-meta.json';
import openapiSchemaJson31Dialect from '../json-schema/open-api-31/openapi-schema-31-dialect.json';
import openapiSchemaJson31Ajv from '../json-schema/open-api-31/openapi-schema-31-ajv.json';
import { JsonSchemaValidationProvider } from './json-schema-validation-provider';

// eslint-disable-next-line import/prefer-default-export
export class OpenAPi31JsonSchemaValidationProvider extends JsonSchemaValidationProvider {
  public constructor(jsonSchema?: Record<string, unknown>, ajv2020 = false) {
    // default to OAI provided 3.1 schema
    if (!jsonSchema) {
      super(
        true,
        {
          strict: false,
          allErrors: true,
          schemas: [openapiSchemaJson31Ajv, openapiSchemaJson31Meta, openapiSchemaJson31Dialect],
        },
        openapiSchemaJson31Ajv,
      );
    } else {
      super(
        ajv2020,
        {
          strict: false,
          meta: true,
          allErrors: true,
          validateFormats: false,
          unicodeRegExp: false,
        },
        jsonSchema,
      );
    }
  }

  // eslint-disable-next-line class-methods-use-this
  break(): boolean {
    return false;
  }

  // eslint-disable-next-line class-methods-use-this
  namespaces(): string[] {
    return ['openapi'];
  }
}
