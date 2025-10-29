import {
  specificationObj as AsyncApi2Specification,
  InfoVisitorOptions,
  InfoVisitor as InfoVisitorType,
} from '@swagger-api/apidom-ns-asyncapi-2';

import InfoElement from '../../../../elements/Info.ts';

export const BaseInfoVisitor: typeof InfoVisitorType =
  AsyncApi2Specification.visitors.document.objects.Info.$visitor;

export type { InfoVisitorOptions };

class InfoVisitor extends BaseInfoVisitor {
  declare public readonly element: InfoElement;

  constructor(options: InfoVisitorOptions) {
    super(options);
    this.element = new InfoElement();
  }
}

export default InfoVisitor;