import { mediaTypes, ApiDesignSystemsMediaTypes } from '@swagger-api/apidom-ns-api-design-systems';

const jsonMediaTypes = new ApiDesignSystemsMediaTypes(
  ...mediaTypes.forFormat('generic'),
  ...mediaTypes.forFormat('json'),
);

export default jsonMediaTypes;
