import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import TagElement from '../../../../elements/Tag.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor.ts';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../generics/FixedFieldsVisitor.ts';
import { isStringElement, ObjectElement } from '@swagger-api/apidom-core';

/**
 * @public
 */
export interface TagVisitorOptions extends FixedFieldsVisitorOptions, FallbackVisitorOptions {}

/**
 * @public
 */
class TagVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  declare public readonly element: TagElement;

  declare protected readonly specPath: SpecPath<['document','objects','Tag']>;

  declare protected readonly canSupportSpecificationExtensions: true;

  constructor(options: TagVisitorOptions) {
    super(options);
    this.element = new TagElement();
    this.specPath = always(['document','objects', 'Tag']); 
    this.canSupportSpecificationExtensions = true;
  }
}

export default TagVisitor;