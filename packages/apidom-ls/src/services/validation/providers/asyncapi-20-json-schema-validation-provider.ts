import asyncapiSchemaJson from '../json-schema/async-api-20/asyncapi-schema.json';
import { JsonSchemaValidationProvider } from './json-schema-validation-provider';

// eslint-disable-next-line import/prefer-default-export
export class Asyncapi20JsonSchemaValidationProvider extends JsonSchemaValidationProvider {
  public constructor() {
    super(false, asyncapiSchemaJson);
  }

  // eslint-disable-next-line class-methods-use-this
  break(): boolean {
    return false;
  }

  // eslint-disable-next-line class-methods-use-this
  namespaces(): string[] {
    return ['asyncapi'];
  }
}
