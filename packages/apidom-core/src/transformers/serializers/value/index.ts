import stampit from 'stampit';
import {
  Element,
  BooleanElement,
  NumberElement,
  StringElement,
  ArrayElement,
  ObjectElement,
  MemberElement,
} from 'minim';

import { visit } from './visitor';
import EphemeralArray from './ast/ephemeral-array';
import EphemeralObject from './ast/ephemeral-object';

/* eslint-disable @typescript-eslint/naming-convention */
const Visitor = stampit.init(function _Visitor() {
  const references = new WeakMap();

  this.BooleanElement = function _BooleanElement(element: BooleanElement) {
    return element.toValue();
  };
  this.NumberElement = function _NumberElement(element: NumberElement) {
    return element.toValue();
  };
  this.StringElement = function _StringElement(element: StringElement) {
    return element.toValue();
  };
  this.NullElement = function _NullElement() {
    return null;
  };

  this.ObjectElement = {
    enter(element: ObjectElement) {
      if (references.has(element)) {
        return references.get(element).toReference();
      }

      const ephemeral = new EphemeralObject(element.content);
      references.set(element, ephemeral);
      return ephemeral;
    },
  };
  this.EphemeralObject = {
    leave(ephemeral: EphemeralObject) {
      return ephemeral.toObject();
    },
  };
  this.MemberElement = {
    enter(element: MemberElement) {
      return [element.key, element.value];
    },
  };

  this.ArrayElement = {
    enter(element: ArrayElement) {
      if (references.has(element)) {
        return references.get(element).toReference();
      }

      const ephemeral = new EphemeralArray(element.content);
      references.set(element, ephemeral);
      return ephemeral;
    },
  };
  this.EphemeralArray = {
    leave(ephemeral: EphemeralArray) {
      return ephemeral.toArray();
    },
  };
});
/* eslint-enable */

const serializer = <T extends Element>(element: T): any => {
  return visit(element, Visitor());
};

export default serializer;
