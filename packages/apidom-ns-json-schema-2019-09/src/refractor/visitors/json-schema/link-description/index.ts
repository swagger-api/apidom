import { Mixin } from 'ts-mixer';
import { always } from 'ramda';
import {
  FixedFieldsVisitor,
  FixedFieldsVisitorOptions,
  FallbackVisitor,
  FallbackVisitorOptions,
  SpecPath,
} from '@swagger-api/apidom-ns-json-schema-draft-7';

import LinkDescriptionElement from '../../../../elements/LinkDescription.ts';

/**
 * @public
 */
export interface LinkDescriptionVisitorOptions
  extends FixedFieldsVisitorOptions,
    FallbackVisitorOptions {}

/**
 * @public
 */
class LinkDescriptionVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  declare public readonly element: LinkDescriptionElement;

  declare protected readonly specPath: SpecPath<['document', 'objects', 'LinkDescription']>;

  constructor(options: LinkDescriptionVisitorOptions) {
    super(options);
    this.element = new LinkDescriptionElement();
    this.specPath = always(['document', 'objects', 'LinkDescription']);
  }
}

export default LinkDescriptionVisitor;
