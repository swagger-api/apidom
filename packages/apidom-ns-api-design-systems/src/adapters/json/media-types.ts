import mediaTypes, { ApiDesignSystemsMediaTypes } from '../../media-types';

const jsonMediaTypes = new ApiDesignSystemsMediaTypes(
  ...mediaTypes.forFormat('generic'),
  ...mediaTypes.forFormat('json'),
);

export default jsonMediaTypes;
