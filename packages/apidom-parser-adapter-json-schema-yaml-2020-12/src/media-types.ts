import { mediaTypes, JSONSchema202012MediaTypes } from '@swagger-api/apidom-ns-json-schema-2020-12';

/**
 * @public
 */
const yamlMediaTypes = new JSONSchema202012MediaTypes(
  ...mediaTypes.filterByFormat('generic'),
  ...mediaTypes.filterByFormat('yaml'),
);

export default yamlMediaTypes;
