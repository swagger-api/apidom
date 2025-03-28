import { Mixin } from 'ts-mixer';
import { always } from 'ramda';
import { ObjectElement, StringElement, toValue } from '@swagger-api/apidom-core';

import CallbackElement from '../../../../elements/Callback.ts';
import PathItemElement from '../../../../elements/PathItem.ts';
import PatternedFieldsVisitor, {
  PatternedFieldsVisitorOptions,
  SpecPath,
} from '../../generics/PatternedFieldsVisitor.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor.ts';
import MapVisitor from '../../generics/MapVisitor.ts';
import { isPathItemElement } from '../../../../predicates.ts';

/**
 * @public
 */
export interface CallbackVisitorOptions
  extends PatternedFieldsVisitorOptions,
    FallbackVisitorOptions {}

/**
 * @public
 */
class CallbackVisitor extends Mixin(PatternedFieldsVisitor, FallbackVisitor) {
  declare public readonly element: CallbackElement;

  declare protected readonly specPath: SpecPath;

  declare protected readonly canSupportSpecificationExtensions: true;

  constructor(options: CallbackVisitorOptions) {
    super(options);
    this.element = new CallbackElement();
    this.specPath = always(['document', 'objects', 'PathItem']);
    this.canSupportSpecificationExtensions = true;
    this.fieldPatternPredicate = (value) => /{(?<expression>[^}]{1,2083})}/.test(String(value)); // 2,083 characters is the maximum length of a URL in Chrome
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
