import {
  Element,
  BooleanElement,
  NumberElement,
  StringElement,
  ArrayElement,
  ObjectElement,
  MemberElement,
  NullElement,
  RefElement,
  LinkElement,
} from 'minim';

import { visit } from './visitor';
import EphemeralArray from './ast/ephemeral-array';
import EphemeralObject from './ast/ephemeral-object';
import {
  isElement,
  isBooleanElement,
  isNumberElement,
  isStringElement,
  isNullElement,
} from '../../../predicates';

/* eslint-disable class-methods-use-this */

class Visitor {
  public readonly ObjectElement = {
    enter: (element: ObjectElement): EphemeralObject => {
      if (this.references.has(element)) {
        return this.references.get(element).toReference();
      }

      const ephemeral = new EphemeralObject(element.content);
      this.references.set(element, ephemeral);
      return ephemeral;
    },
  };

  public readonly EphemeralObject = {
    leave: (ephemeral: EphemeralObject): object => {
      return ephemeral.toObject();
    },
  };

  public readonly MemberElement = {
    enter: (element: MemberElement): [unknown, unknown] => {
      return [element.key, element.value];
    },
  };

  public readonly ArrayElement = {
    enter: (element: ArrayElement): any => {
      if (this.references.has(element)) {
        return this.references.get(element).toReference();
      }

      const ephemeral = new EphemeralArray(element.content);
      this.references.set(element, ephemeral);
      return ephemeral;
    },
  };

  public readonly EphemeralArray = {
    leave: (ephemeral: EphemeralArray): unknown[] => {
      return ephemeral.toArray();
    },
  };

  protected references: WeakMap<Element, any> = new WeakMap();

  public BooleanElement(element: BooleanElement): boolean {
    return element.toValue();
  }

  public NumberElement(element: NumberElement): number {
    return element.toValue();
  }

  public StringElement(element: StringElement): string {
    return element.toValue();
  }

  public NullElement() {
    return null;
  }

  public RefElement(element: RefElement, ...rest: unknown[]) {
    const ancestors = rest[3] as (Element | EphemeralArray | EphemeralObject)[];

    if (ancestors[ancestors.length - 1]?.type === 'EphemeralObject') {
      return Symbol.for('delete-node');
    }

    return String(element.toValue());
  }

  public LinkElement(element: LinkElement): string {
    if (isStringElement(element.href)) {
      return element.href.toValue();
    }
    return '';
  }
}

type ShortCutElementTypes = StringElement | NumberElement | BooleanElement | NullElement;

const serializer = <T extends Element | unknown>(element: T): any => {
  if (!isElement(element)) return element;

  // shortcut optimization for certain element types
  if (
    isStringElement(element) ||
    isNumberElement(element) ||
    isBooleanElement(element) ||
    isNullElement(element)
  ) {
    return (element as ShortCutElementTypes).toValue();
  }

  return visit(element as Exclude<T, unknown>, new Visitor());
};

export default serializer;
