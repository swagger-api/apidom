import { Mixin } from 'ts-mixer';
import { T as stubTrue } from 'ramda';
import { ObjectElement } from '@swagger-api/apidom-core';

import AlternatingVisitor, {
  AlternatingVisitorOptions,
} from '../../generics/AlternatingVisitor.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor.ts';
import { isReferenceElement, isReferenceLikeElement, isSchemaElement } from '@swagger-api/apidom-ns-asyncapi-2';
import { isMultiFormatSchemaElement } from '../../../../predicates.ts';

/**
 * @public
 */
export interface DefaultVisitorOptions extends AlternatingVisitorOptions, FallbackVisitorOptions {}

/**
 * @public
 */
class DefaultVisitor extends Mixin(AlternatingVisitor, FallbackVisitor) {
  constructor(options: DefaultVisitorOptions) {
    super(options);
    this.alternator = [
      { predicate: isReferenceLikeElement, specPath: ['document', 'objects', 'Reference'] },
      { predicate: isSchemaElement, specPath: ['document', 'objects', 'Schema'] },
      { predicate: stubTrue, specPath: ['document', 'objects', 'MultiformatSchema'] },
    ];
  }

  ObjectElement(objectElement: ObjectElement) {
    const result = AlternatingVisitor.prototype.enter.call(this, objectElement);

    if (isReferenceElement(this.element)) {
      this.element.setMetaProperty('referenced-element', 'ref-header');
    }

    if(isSchemaElement(this.element)) {
       this.element.setMetaProperty('schema', 'header-schema');
    }

    if(isMultiFormatSchemaElement(this.element)) {
      this.element.setMetaProperty('schema', 'header-multiformat-schema')
    }

    return result;
  }
}

export default DefaultVisitor;
