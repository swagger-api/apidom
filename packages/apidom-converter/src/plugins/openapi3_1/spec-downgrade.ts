import { OpenApi3_1Element } from '@swagger-api/apidom-ns-openapi-3-1';

const plugin = () => () => {
  return {
    visitor: {
      OpenApi3_1Element(openApi3_1Element: OpenApi3_1Element) {
        openApi3_1Element.set('openapi', '3.0.0');
      },
    },
  };
};

export default plugin;
