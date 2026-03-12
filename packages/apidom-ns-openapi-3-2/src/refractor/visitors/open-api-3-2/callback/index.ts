import { always } from 'ramda';
import {
  specificationObj as OpenApi3_1Specification,
  SpecPath,
  CallbackVisitorOptions,
  CallbackVisitor as CallbackVisitorType,
} from '@swagger-api/apidom-ns-openapi-3-1';

import CallbackElement from '../../../../elements/Callback.ts';

/**
 * @public
 */
export const BaseCallbackVisitor: typeof CallbackVisitorType =
  OpenApi3_1Specification.visitors.document.objects.Callback.$visitor;

export type { CallbackVisitorOptions };

/**
 * @public
 */
class CallbackVisitor extends BaseCallbackVisitor {
  declare public readonly element: CallbackElement;

  declare protected readonly specPath: SpecPath<['document', 'objects', 'PathItem']>;

  constructor(options: CallbackVisitorOptions) {
    super(options);
    this.element = new CallbackElement();
    this.specPath = always(['document', 'objects', 'PathItem']);
  }
}

export default CallbackVisitor;
