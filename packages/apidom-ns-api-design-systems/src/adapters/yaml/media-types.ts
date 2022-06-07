import mediaTypes, { ApiDesignSystemsMediaTypes } from '../../media-types';

const yamlMediaTypes = new ApiDesignSystemsMediaTypes(
  ...mediaTypes.forFormat('generic'),
  ...mediaTypes.forFormat('yaml'),
);

export default yamlMediaTypes;
