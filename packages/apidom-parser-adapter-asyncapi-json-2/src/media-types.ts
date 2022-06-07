import { mediaTypes, AsyncAPIMediaTypes } from '@swagger-api/apidom-ns-asyncapi-2';

const jsonMediaTypes = new AsyncAPIMediaTypes(
  ...mediaTypes.forFormat('generic'),
  ...mediaTypes.forFormat('json'),
);

export default jsonMediaTypes;
