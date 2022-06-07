import { mediaTypes, OpenAPIMediaTypes } from '@swagger-api/apidom-ns-openapi-3-1';

const jsonMediaTypes = new OpenAPIMediaTypes(
  ...mediaTypes.forFormat('generic'),
  ...mediaTypes.forFormat('json'),
);

export default jsonMediaTypes;
