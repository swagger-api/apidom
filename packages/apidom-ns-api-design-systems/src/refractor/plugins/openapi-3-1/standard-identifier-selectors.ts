import {
  PathItemElement,
  ParameterElement,
  RequestBodyElement,
  ResponsesElement,
  ResponseElement,
  OperationElement,
  isStringElement,
  isObjectElement,
} from '@swagger-api/apidom-ns-openapi-3-1';

const plugin = () => () => {
  return {
    visitor: {
      OperationElement(element: OperationElement, ...rest: any) {
        const [, , , ancestors] = rest;
        const parentPathItem: PathItemElement = ancestors[ancestors.length - 2];
        const standardIdentifiers = [
          ['http', 'transaction'],
          ['http', 'request'],
          ['http', 'request', 'url'],
          ['http', 'request', 'url', parentPathItem.meta.get('path').toValue()],
          ['http', 'request', 'method'],
          ['http', 'request', 'method', element.meta.get('http-method').toValue().toLowerCase()],
        ];

        // fold PathItem.parameters to Operation.parameters
        // @ts-ignore
        parentPathItem?.parameters?.forEach((parameter: ParameterElement) => {
          if (
            isStringElement(parameter.in) &&
            isStringElement(parameter.name) &&
            parameter.in.toValue() === 'header'
          ) {
            standardIdentifiers.push(['http', 'request', 'header']);
            standardIdentifiers.push(['http', 'request', 'header', parameter.name.toValue()]);
            standardIdentifiers.push(['http', 'message', 'header']);
            standardIdentifiers.push(['http', 'message', 'header', parameter.name.toValue()]);
          }
        });

        element.setMetaProperty('ads-s-standard-identifier', standardIdentifiers);
      },
      ParameterElement(element: ParameterElement) {
        if (
          isStringElement(element.in) &&
          isStringElement(element.name) &&
          element.in.toValue() === 'header'
        ) {
          element.name.setMetaProperty('ads-s-standard-identifier', [
            ['http', 'request', 'header'],
            ['http', 'request', 'header', element.name.toValue()],
            ['http', 'message', 'header'],
            ['http', 'message', 'header', element.name.toValue()],
          ]);
        }
      },
      RequestBodyElement(element: RequestBodyElement) {
        if (!isObjectElement(element.contentProp)) return;

        element.setMetaProperty('ads-s-standard-identifier', [
          ['http', 'request', 'body'],
          ['http', 'message', 'body'],
        ]);
      },
      ResponsesElement(element: ResponsesElement) {
        element.forEach((value, key) => {
          const statusCode = String(key.toValue());
          const statusCodeAlias = statusCode.startsWith('2')
            ? 'success'
            : statusCode.startsWith('3')
            ? 'redirect'
            : statusCode.startsWith('4')
            ? 'client_error'
            : statusCode.startsWith('5')
            ? 'sever_error'
            : 'unknown';

          key.setMetaProperty('ads-s-standard-identifier', [
            ['http', 'response', 'status_code'],
            ['http', 'response', 'status_code', statusCode],
            ['http', 'response', 'status_code', statusCodeAlias],
          ]);
        });
      },
      ResponseElement(element: ResponseElement) {
        element.setMetaProperty('add-s-standard-identifier', [['http', 'response']]);

        if (typeof element.headers !== 'undefined' && isObjectElement(element.headers)) {
          element.headers.forEach((value, key) => {
            const headerName = key.toValue();

            value.setMetaProperty('ads-s-standard-identifier', [
              ['http', 'response', 'header'],
              ['http', 'response', 'header', headerName],
              ['http', 'message', 'header', headerName],
            ]);
          });
        }

        if (typeof element.contentProp !== 'undefined' && isObjectElement(element.contentProp)) {
          element.contentProp.setMetaProperty('add-s-standard-identifier', [
            ['http', 'response', 'body'],
            ['http', 'message', 'body'],
          ]);

          element.contentProp.forEach((value, key) => {
            const headerName = key.toValue();

            value.setMetaProperty('ads-standard-identifier', [
              ['http', 'response', 'header'],
              ['http', 'response', 'header', headerName],
              ['http', 'message', 'header', headerName],
            ]);
          });
        }
      },
    },
  };
};

export default plugin;
