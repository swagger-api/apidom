import {
  specificationObj as AsyncApi2Specification,
  DefaultContentTypeVisitorOptions,
  DefaultContentTypeVisitor as DefaultContentTypeVisitorType,
} from '@swagger-api/apidom-ns-asyncapi-2';

import DefaultContentTypeElement from '../../elements/DefaultContentType.ts';

export const BaseDefaultContentTypeVisitor: typeof DefaultContentTypeVisitorType =
  AsyncApi2Specification.visitors.document.objects.DefaultContentType.$visitor;

export type { DefaultContentTypeVisitorOptions };

class DefaultContentTypeVisitor extends BaseDefaultContentTypeVisitor {
  declare public readonly element: DefaultContentTypeElement;

  constructor(options: DefaultContentTypeVisitorOptions) {
    super(options);
    this.element = new DefaultContentTypeElement();
  }
}

export default DefaultContentTypeVisitor;