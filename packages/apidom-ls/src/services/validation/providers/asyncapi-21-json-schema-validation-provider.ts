import asyncapiSchemaJson from '../json-schema/async-api-21/asyncapi-schema';
import { JsonSchemaValidationProvider } from './json-schema-validation-provider';
import { NamespaceVersion } from '../../../apidom-language-types';

// eslint-disable-next-line import/prefer-default-export
export class Asyncapi21JsonSchemaValidationProvider extends JsonSchemaValidationProvider {
  public constructor() {
    super(false, asyncapiSchemaJson);
  }

  // eslint-disable-next-line class-methods-use-this
  break(): boolean {
    return false;
  }

  // eslint-disable-next-line class-methods-use-this
  namespaces(): NamespaceVersion[] {
    return [{ namespace: 'asyncapi', version: '2.1.0' }];
  }

  // eslint-disable-next-line class-methods-use-this
  name(): string {
    return 'asyncapi schema';
  }
}
