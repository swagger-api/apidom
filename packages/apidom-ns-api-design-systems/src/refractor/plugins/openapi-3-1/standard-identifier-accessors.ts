import {
  PathItemElement,
  OperationElement,
  ResponseElement,
  ParameterElement,
  isStringElement,
} from '@swagger-api/apidom-ns-openapi-3-1';

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

        // fold PathItem.parameters to Operation.parameters
        // @ts-ignore
        parentPathItem?.parameters?.forEach((parameter: ParameterElement) => {
          if (
            isStringElement(parameter.in) &&
            isStringElement(parameter.name) &&
            parameter.in.toValue() === 'header'
          ) {
            standardIdentifiers.push({
              subject: ['http', 'request', 'header'],
              value: parameter.name.clone(),
            });
            standardIdentifiers.push({
              subject: ['http', 'message', 'header'],
              value: parameter.name.clone(),
            });
          }
        });

        element.setMetaProperty('ads-a-standard-identifier', standardIdentifiers);
      },
      ParameterElement(element: ParameterElement) {
        if (
          isStringElement(element.in) &&
          isStringElement(element.name) &&
          element.in.toValue() === 'header'
        ) {
          element.setMetaProperty('ads-a-standard-identifier', [
            {
              subject: ['http', 'request', 'header'],
              value: element.name.clone(),
            },
            {
              subject: ['http', 'message', 'header'],
              value: element.name.clone(),
            },
          ]);
        }
      },
      ResponseElement(element: ResponseElement) {
        if (!element.meta.hasKey('http-status-code')) return;

        const standardIdentifiers = [
          {
            subject: ['http', 'response', 'status_code'],
            value: element.meta.get('http-status-code').clone(),
          },
        ];

        element.setMetaProperty('ads-a-standard-identifier', standardIdentifiers);
      },
    },
  };
};

export default plugin;
