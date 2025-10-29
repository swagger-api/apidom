import {
	specificationObj as AsyncApi2Specification,
	ExternalDocumentationVisitorOptions,
	ExternalDocumentationVisitor as ExternalDocumentationVisitorType,
} from '@swagger-api/apidom-ns-asyncapi-2';

import ExternalDocumentationElement from '../../../../elements/ExternalDocumentation.ts';

export const BaseExternalDocumentationVisitor: typeof ExternalDocumentationVisitorType =
	AsyncApi2Specification.visitors.document.objects.ExternalDocumentation.$visitor;

export type { ExternalDocumentationVisitorOptions };

class ExternalDocumentationVisitor extends BaseExternalDocumentationVisitor {
	declare public readonly element: ExternalDocumentationElement;

	constructor(options: ExternalDocumentationVisitorOptions) {
		super(options);
		this.element = new ExternalDocumentationElement();
	}
}

export default ExternalDocumentationVisitor;