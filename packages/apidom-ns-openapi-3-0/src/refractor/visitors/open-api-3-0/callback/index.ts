import { Mixin } from 'ts-mixer';
import { always } from 'ramda';
import { ObjectElement, StringElement, toValue } from '@swagger-api/apidom-core';

import CallbackElement from '../../../../elements/Callback';
import PathItemElement from '../../../../elements/PathItem';
import PatternedFieldsVisitor, {
  PatternedFieldsVisitorOptions,
  SpecPath,
} from '../../generics/PatternedFieldsVisitor';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor';
import MapVisitor from '../../generics/MapVisitor';
import { isPathItemElement } from '../../../../predicates';

export interface CallbackVisitorOptions
  extends PatternedFieldsVisitorOptions,
    FallbackVisitorOptions {}

class CallbackVisitor extends Mixin(PatternedFieldsVisitor, FallbackVisitor) {
  public declare readonly element: CallbackElement;

  protected declare readonly specPath: SpecPath;

  protected declare readonly canSupportSpecificationExtensions: true;

  constructor(options: CallbackVisitorOptions) {
    super(options);
    this.element = new CallbackElement();
    this.specPath = always(['document', 'objects', 'PathItem']);
    this.canSupportSpecificationExtensions = true;
    this.fieldPatternPredicate = (value) => /{(?<expression>[^}]{1,2083)}/.test(String(value)); // 2,083 characters is the maximum length of a URL in Chrome
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
