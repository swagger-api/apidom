import { mediaTypes, A2AMediaTypes } from '@swagger-api/apidom-ns-a2a-1';

/**
 * @public
 */
const jsonMediaTypes = new A2AMediaTypes(
  ...mediaTypes.filterByFormat('generic'),
  ...mediaTypes.filterByFormat('json'),
);

export default jsonMediaTypes;
