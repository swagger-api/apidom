import { Mixin } from 'ts-mixer';
import { T as stubTrue, always } from 'ramda';
import { ObjectElement, StringElement, cloneDeep } from '@swagger-api/apidom-core';

import PathsElement from '../../../../elements/Paths.ts';
import PathItemElement from '../../../../elements/PathItem.ts';
import PatternedFieldsVisitor, {
  PatternedFieldsVisitorOptions,
  SpecPath,
} from '../../generics/PatternedFieldsVisitor.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor.ts';
import { isPathItemElement } from '../../../../predicates.ts';

/**
 * @public
 */
export interface PathsVisitorOptions
  extends PatternedFieldsVisitorOptions,
    FallbackVisitorOptions {}

/**
 * @public
 */
class PathsVisitor extends Mixin(PatternedFieldsVisitor, FallbackVisitor) {
  public readonly element: PathsElement;

  declare protected readonly specPath: SpecPath<['document', 'objects', 'PathItem']>;

  declare protected readonly canSupportSpecificationExtensions: true;

  constructor(options: PathsVisitorOptions) {
    super(options);
    this.element = new PathsElement();
    this.specPath = always(['document', 'objects', 'PathItem']);
    this.canSupportSpecificationExtensions = true;
    this.fieldPatternPredicate = stubTrue;
  }

  ObjectElement(objectElement: ObjectElement) {
    const result = PatternedFieldsVisitor.prototype.ObjectElement.call(this, objectElement);

    // decorate every PathItemElement with path metadata
    this.element
      .filter(isPathItemElement)
      // @ts-ignore
      .forEach((pathItemElement: PathItemElement, key: StringElement) => {
        key.classes.push('openapi-path-template');
        key.classes.push('path-template');
        pathItemElement.setMetaProperty('path', cloneDeep(key));
      });

    return result;
  }
}

export default PathsVisitor;
