import { Mixin } from 'ts-mixer';
import { test, always } from 'ramda';
import { ObjectElement, StringElement, toValue } from '@swagger-api/apidom-core';

import CallbackElement from '../../../../elements/Callback';
import PathItemElement from '../../../../elements/PathItem';
import PatternedFieldsVisitor, {
  PatternedFieldsVisitorOptions,
  SpecPath,
} from '../../generics/PatternedFieldsVisitor';
import FallbackVisitor from '../../FallbackVisitor';
import MapVisitor from '../../generics/MapVisitor';
import { isPathItemElement } from '../../../../predicates';

class CallbackVisitor extends Mixin(PatternedFieldsVisitor, FallbackVisitor) {
  public declare readonly element: CallbackElement;

  public declare readonly specPath: SpecPath<['document', 'objects', 'PathItem']>;

  public declare readonly canSupportSpecificationExtensions: true;

  constructor(options: PatternedFieldsVisitorOptions) {
    super(options);
    this.element = new CallbackElement();
    this.specPath = always(['document', 'objects', 'PathItem']);
    this.canSupportSpecificationExtensions = true;
    // @ts-ignore
    this.fieldPatternPredicate = test(/{(?<expression>.*)}/);
  }

  ObjectElement(objectElement: ObjectElement) {
    const result = MapVisitor.prototype.ObjectElement.call(this, objectElement);

    // decorate every PathItemElement with Callback Object expression metadata
    this.element
      .filter(isPathItemElement)
      // @ts-ignore
      .forEach((pathItemElement: PathItemElement, key: StringElement) => {
        pathItemElement.setMetaProperty('runtime-expression', toValue(key));
      });

    return result;
  }
}

export default CallbackVisitor;
