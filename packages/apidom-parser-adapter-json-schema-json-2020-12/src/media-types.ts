import { mediaTypes, JSONSchema202012MediaTypes } from '@swagger-api/apidom-ns-json-schema-2020-12';

/**
 * @public
 */
const jsonMediaTypes = new JSONSchema202012MediaTypes(
  ...mediaTypes.filterByFormat('generic'),
  ...mediaTypes.filterByFormat('json'),
);

export default jsonMediaTypes;
