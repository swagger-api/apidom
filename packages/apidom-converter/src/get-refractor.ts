import { OpenApi3_1Element } from '@swagger-api/apidom-ns-openapi-3-1';
import { OpenApi3_0Element } from '@swagger-api/apidom-ns-openapi-3-0';
import { SwaggerElement } from '@swagger-api/apidom-ns-openapi-2';

const getOpenApiRefractor = (version: string) => {
  switch (version) {
    case '3.1.x':
      return OpenApi3_1Element;
    case '3.0.x':
      return OpenApi3_0Element;
    case '2.0.x':
      return SwaggerElement;
    default:
      throw new Error(`Unsupported OpenAPI version: ${version}`);
  }
};

export default getOpenApiRefractor;
