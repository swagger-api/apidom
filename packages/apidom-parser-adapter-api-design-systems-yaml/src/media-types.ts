import { mediaTypes, ApiDesignSystemsMediaTypes } from '@swagger-api/apidom-ns-api-design-systems';

const yamlMediaTypes = new ApiDesignSystemsMediaTypes(
  ...mediaTypes.forFormat('generic'),
  ...mediaTypes.forFormat('yaml'),
);

export default yamlMediaTypes;
