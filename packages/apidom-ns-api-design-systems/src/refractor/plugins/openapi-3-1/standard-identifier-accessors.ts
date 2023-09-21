import { StringElement, toValue, cloneDeep } from '@swagger-api/apidom-core';
import {
  PathItemElement,
  OperationElement,
  ResponseElement,
  ParameterElement,
  RequestBodyElement,
  isStringElement,
  isArrayElement,
  isObjectElement,
} from '@swagger-api/apidom-ns-openapi-3-1';

const plugin = () => () => {
  return {
    visitor: {
      OperationElement(element: OperationElement, ...rest: any) {
        const [, , , ancestors] = rest;
        const parentPathItem: PathItemElement = ancestors[ancestors.length - 2];

        const httpMethod = cloneDeep(element.meta.get('http-method'));
        httpMethod.content = toValue(httpMethod).toLowerCase();

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

        if (
          typeof parentPathItem.parameters !== 'undefined' &&
          isArrayElement(parentPathItem.parameters)
        ) {
          // @ts-ignore
          parentPathItem.parameters.forEach((parameter: ParameterElement) => {
            if (
              isStringElement(parameter.in) &&
              isStringElement(parameter.name) &&
              toValue(parameter.in as any) === 'header'
            ) {
              standardIdentifiers.push({
                subject: ['http', 'request', 'header'],
                value: cloneDeep.safe(parameter.name),
              });
              standardIdentifiers.push({
                subject: ['http', 'message', 'header'],
                value: cloneDeep.safe(parameter.name),
              });
            }
          });
        }

        element.setMetaProperty('ads-a-standard-identifier', standardIdentifiers);
      },
      ParameterElement(element: ParameterElement) {
        if (
          isStringElement(element.in) &&
          isStringElement(element.name) &&
          toValue(element.in as any) === 'header'
        ) {
          element.setMetaProperty('ads-a-standard-identifier', [
            {
              subject: ['http', 'request', 'header'],
              value: cloneDeep.safe(element.name),
            },
            {
              subject: ['http', 'message', 'header'],
              value: cloneDeep.safe(element.name),
            },
          ]);
        }
      },
      RequestBodyElement(element: RequestBodyElement) {
        if (typeof element.contentProp === 'undefined' || !isObjectElement(element.contentProp)) {
          return;
        }

        const standardIdentifiers: any = [];

        element.contentProp.forEach((mediaType, key) => {
          standardIdentifiers.push(
            {
              subject: ['http', 'request', 'header'],
              value: new StringElement('Content-Type', cloneDeep(key.meta)),
            },
            {
              subject: ['http', 'message', 'header'],
              value: new StringElement('Content-Type', cloneDeep(key.meta)),
            },
            {
              subject: ['http', 'request', 'header', 'Content-Type'],
              value: cloneDeep(key),
            },
            {
              subject: ['http', 'message', 'header', 'Content-Type'],
              value: cloneDeep(key),
            },
          );
        });

        element.setMetaProperty('ads-a-standard-identifier', standardIdentifiers);
      },
      ResponseElement(element: ResponseElement) {
        if (!element.meta.hasKey('http-status-code')) return;

        const standardIdentifiers = [
          {
            subject: ['http', 'response', 'status_code'],
            value: cloneDeep(element.meta.get('http-status-code')),
          },
        ];

        element.setMetaProperty('ads-a-standard-identifier', standardIdentifiers);
      },
    },
  };
};

export default plugin;
