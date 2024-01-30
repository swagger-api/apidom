import { OpenapiElement as Openapi30Element } from '@swagger-api/apidom-ns-openapi-3-0';

const openAPIVersionRefractorPlugin = () => () => ({
  visitor: {
    OpenapiElement() {
      return new Openapi30Element('3.0.3');
    },
  },
});

export default openAPIVersionRefractorPlugin;
