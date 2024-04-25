import { Mixin } from 'ts-mixer';
import { always } from 'ramda';
import {
  FixedFieldsVisitor,
  FixedFieldsVisitorOptions,
  FallbackVisitor,
  FallbackVisitorOptions,
  SpecPath,
} from '@swagger-api/apidom-ns-json-schema-draft-6';

import LinkDescriptionElement from '../../../../elements/LinkDescription';

export interface LinkDescriptionVisitorOptions
  extends FixedFieldsVisitorOptions,
    FallbackVisitorOptions {}

class LinkDescriptionVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  public declare readonly element: LinkDescriptionElement;

  protected declare readonly specPath: SpecPath<['document', 'objects', 'LinkDescription']>;

  constructor(options: LinkDescriptionVisitorOptions) {
    super(options);
    this.element = new LinkDescriptionElement();
    this.specPath = always(['document', 'objects', 'LinkDescription']);
  }
}

export default LinkDescriptionVisitor;
