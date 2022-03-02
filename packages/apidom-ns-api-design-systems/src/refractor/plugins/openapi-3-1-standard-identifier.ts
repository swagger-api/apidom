import {
  OperationElement,
  PathItemElement,
  ParameterElement,
  RequestBodyElement,
  ResponseElement,
  HeaderElement,
  isStringElement,
} from '@swagger-api/apidom-ns-openapi-3-1';

const plugin = () => () => {
  return {
    visitor: {
      PathItemElement(element: PathItemElement) {
        element.setMetaProperty('ads-standard-identifier', [['http', 'transaction']]);
      },
      OperationElement(element: OperationElement) {
        const httpMethod = element.meta.get('http-method');
        element.setMetaProperty('ads-standard-identifier', [
          ['http', 'request', 'method'],
          ['http', 'request', 'method', httpMethod.toValue().toLowerCase()],
        ]);
      },
      ParameterElement(element: ParameterElement) {
        if (
          isStringElement(element.in) &&
          isStringElement(element.name) &&
          element.in.toValue() === 'header'
        ) {
          element.setMetaProperty('ads-standard-identifier', [
            ['http', 'request', 'header'],
            ['http', 'request', 'header', element.name.toValue()],
          ]);
        }
      },
      RequestBodyElement(element: RequestBodyElement) {
        element.setMetaProperty('ads-standard-identifier', [
          ['http', 'request', 'body'],
          ['http', 'message', 'body'],
        ]);
      },
      HeaderElement(element: HeaderElement) {
        const headerName = element.meta.get('header-name');
        element.setMetaProperty('ads-standard-identifier', [
          ['http', 'response', 'header'],
          ['http', 'response', 'header', headerName],
          ['http', 'message', 'header', headerName],
        ]);
      },
      ResponseElement(element: ResponseElement) {
        const statusCode = String(element.meta.get('http-status-code').toValue());
        const statusCodeAlias = statusCode.startsWith('2')
          ? 'success'
          : statusCode.startsWith('3')
          ? 'redirect'
          : statusCode.startsWith('4')
          ? 'client_error'
          : statusCode.startsWith('5')
          ? 'sever_error'
          : 'unknown';

        element.setMetaProperty('ads-standard-identifier', [
          ['http', 'response', 'status_code'],
          ['http', 'response', 'status_code', statusCode],
          ['http', 'response', 'status_code', statusCodeAlias],
        ]);

        element.contentProp?.setMetaProperty('adds-standard-identifier', [
          ['http', 'response', 'body'],
          ['http', 'message', 'body'],
        ]);
      },
    },
  };
};

export default plugin;
