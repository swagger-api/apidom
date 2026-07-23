import { mediaTypes, A2AMediaTypes } from '@swagger-api/apidom-ns-a2a-1';

/**
 * @public
 */
const yamlMediaTypes = new A2AMediaTypes(
  ...mediaTypes.filterByFormat('generic'),
  ...mediaTypes.filterByFormat('yaml'),
);

export default yamlMediaTypes;
