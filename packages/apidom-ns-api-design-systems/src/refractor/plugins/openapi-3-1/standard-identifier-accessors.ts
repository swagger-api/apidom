import { PathItemElement, OperationElement } from '@swagger-api/apidom-ns-openapi-3-1';

const plugin = () => () => {
  return {
    visitor: {
      OperationElement(element: OperationElement, ...rest: any) {
        const [, , , ancestors] = rest;
        const parentPathItem: PathItemElement = ancestors[ancestors.length - 2];

        const httpMethod = element.meta.get('http-method').clone();
        httpMethod.content = httpMethod.toValue().toLowerCase();

        const standardIdentifiers = [
          {
            subject: ['http', 'request', 'url'],
            value: parentPathItem.meta.get('path'),
          },
          {
            subject: ['http', 'request', 'method'],
            value: httpMethod,
          },
        ];

        element.setMetaProperty('ads-a-standard-identifier', standardIdentifiers);
      },
    },
  };
};

export default plugin;
