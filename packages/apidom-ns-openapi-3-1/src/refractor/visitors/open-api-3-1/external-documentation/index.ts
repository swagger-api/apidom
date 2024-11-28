import {
  specificationObj as OpenApi3_1Specification,
  ExternalDocumentationVisitorOptions,
  ExternalDocumentationVisitor as ExternalDocumentationVisitorType,
} from '@swagger-api/apidom-ns-openapi-3-0';

import ExternalDocumentationElement from '../../../../elements/ExternalDocumentation.ts';

/**
 * @public
 */
export const BaseExternalDocumentationVisitor: typeof ExternalDocumentationVisitorType =
  OpenApi3_1Specification.visitors.document.objects.ExternalDocumentation.$visitor;

export type { ExternalDocumentationVisitorOptions };

/**
 * @public
 */
class ExternalDocumentationVisitor extends BaseExternalDocumentationVisitor {
  declare public readonly element: ExternalDocumentationElement;

  constructor(options: ExternalDocumentationVisitorOptions) {
    super(options);
    this.element = new ExternalDocumentationElement();
  }
}

export default ExternalDocumentationVisitor;
