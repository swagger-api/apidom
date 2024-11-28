import { Mixin } from 'ts-mixer';
import { test } from 'ramda';
import { ObjectElement } from '@swagger-api/apidom-core';

import PatternedFieldsVisitor, {
  PatternedFieldsVisitorOptions,
  SpecPath,
} from '../../generics/PatternedFieldsVisitor.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor.ts';
import ServersElement from '../../../../elements/Servers.ts';
import ReferenceElement from '../../../../elements/Reference.ts';
import { isReferenceLikeElement } from '../../../predicates.ts';
import { isReferenceElement } from '../../../../predicates.ts';

/**
 * @public
 */
export interface ServersVisitorOptions
  extends PatternedFieldsVisitorOptions,
    FallbackVisitorOptions {}

/**
 * @public
 */
class ServersVisitor extends Mixin(PatternedFieldsVisitor, FallbackVisitor) {
  declare public readonly element: ServersElement;

  declare protected readonly specPath: SpecPath<
    ['document', 'objects', 'Reference'] | ['document', 'objects', 'Server']
  >;

  declare protected readonly canSupportSpecificationExtensions: false;

  constructor(options: ServersVisitorOptions) {
    super(options);
    this.element = new ServersElement();
    this.element.classes.push('servers');
    this.specPath = (element: unknown) => {
      return isReferenceLikeElement(element)
        ? ['document', 'objects', 'Reference']
        : ['document', 'objects', 'Server'];
    };
    this.canSupportSpecificationExtensions = false;
    // @ts-ignore
    this.fieldPatternPredicate = test(/^[A-Za-z0-9_-]+$/);
  }

  ObjectElement(objectElement: ObjectElement) {
    const result = PatternedFieldsVisitor.prototype.ObjectElement.call(this, objectElement);

    // @ts-ignore
    this.element.filter(isReferenceElement).forEach((referenceElement: ReferenceElement) => {
      referenceElement.setMetaProperty('referenced-element', 'server');
    });

    return result;
  }
}

export default ServersVisitor;
