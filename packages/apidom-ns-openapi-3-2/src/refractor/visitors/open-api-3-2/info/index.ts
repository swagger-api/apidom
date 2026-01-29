import {
  specificationObj as OpenApi3_1Specification,
  InfoVisitorOptions,
  InfoVisitor as InfoVisitorType,
} from '@swagger-api/apidom-ns-openapi-3-0';

import InfoElement from '../../../../elements/Info.ts';

/**
 * @public
 */
export const BaseInfoVisitor: typeof InfoVisitorType =
  OpenApi3_1Specification.visitors.document.objects.Info.$visitor;

export type { InfoVisitorOptions };

/**
 * @public
 */
class InfoVisitor extends BaseInfoVisitor {
  declare public readonly element: InfoElement;

  constructor(options: InfoVisitorOptions) {
    super(options);
    this.element = new InfoElement();
  }
}

export default InfoVisitor;
