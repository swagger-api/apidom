import specDowngrade from './openapi3_1/spec-downgrade';

const getPluginsBySpec = (spec: string) => {
  switch (spec) {
    case '3.1.x':
      return [specDowngrade()];
    case '3.0.x':
      return [];
    case '2.0.x':
      return [];
    default:
      return [];
  }
};

export default getPluginsBySpec;
