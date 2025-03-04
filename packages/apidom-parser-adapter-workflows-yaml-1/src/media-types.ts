import { mediaTypes, WorkflowsMediaTypes } from '@swagger-api/apidom-ns-workflows-1';

/**
 * @public
 */
const yamlMediaTypes = new WorkflowsMediaTypes(
  ...mediaTypes.filterByFormat('generic'),
  ...mediaTypes.filterByFormat('yaml'),
);

export default yamlMediaTypes;
