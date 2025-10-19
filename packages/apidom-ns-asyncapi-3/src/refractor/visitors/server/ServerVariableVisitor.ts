import {
	specificationObj as AsyncApi2Specification,
	ServerVariableVisitor as ServerVariableVisitorType,
	ServerVariableVisitorOptions,
} from '@swagger-api/apidom-ns-asyncapi-2';

import ServerVariableElement from '../../../elements/ServerVariable.ts';

/**
 * @public
 */
export const BaseServerVariableVisitor: typeof ServerVariableVisitorType =
	AsyncApi2Specification.visitors.document.objects.ServerVariable.$visitor;

export type { ServerVariableVisitorOptions };

/**
 * @public
 */
class ServerVariableVisitor extends BaseServerVariableVisitor {
	declare public readonly element: ServerVariableElement;

	constructor(options: ServerVariableVisitorOptions) {
		super(options);
		this.element = new ServerVariableElement();
	}
}

export default ServerVariableVisitor;
