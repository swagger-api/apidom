import { Mixin } from 'ts-mixer';
import { T as stubTrue, always } from 'ramda';
import { ObjectElement, StringElement, cloneDeep } from '@swagger-api/apidom-core';

import PathsElement from '../../../../elements/Paths';
import PathItemElement from '../../../../elements/PathItem';
import PatternedFieldsVisitor, {
  PatternedFieldsVisitorOptions,
  SpecPath,
} from '../../generics/PatternedFieldsVisitor';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor';
import { isPathItemElement } from '../../../../predicates';

export interface PathsVisitorOptions
  extends PatternedFieldsVisitorOptions,
    FallbackVisitorOptions {}

class PathsVisitor extends Mixin(PatternedFieldsVisitor, FallbackVisitor) {
  public readonly element: PathsElement;

  protected declare readonly specPath: SpecPath<['document', 'objects', 'PathItem']>;

  protected declare readonly canSupportSpecificationExtensions: true;

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
