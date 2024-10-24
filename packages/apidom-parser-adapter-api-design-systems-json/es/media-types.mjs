import { mediaTypes, ApiDesignSystemsMediaTypes } from '@swagger-api/apidom-ns-api-design-systems';
const jsonMediaTypes = new ApiDesignSystemsMediaTypes(...mediaTypes.filterByFormat('generic'), ...mediaTypes.filterByFormat('json'));
export default jsonMediaTypes;