import { mediaTypes, OpenAPIMediaTypes } from '@swagger-api/apidom-ns-openapi-2';

const jsonMediaTypes = new OpenAPIMediaTypes(
  ...mediaTypes.filterByFormat('generic'),
  ...mediaTypes.filterByFormat('json'),
);

export default jsonMediaTypes;
