import { mediaTypes, WorkflowsMediaTypes } from '@swagger-api/apidom-ns-workflows-1';

/**
 * @public
 */
const jsonMediaTypes = new WorkflowsMediaTypes(
  ...mediaTypes.filterByFormat('generic'),
  ...mediaTypes.filterByFormat('json'),
);

export default jsonMediaTypes;
