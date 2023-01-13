import stampit from 'stampit';
import { ArrayElement, Element, MemberElement, ObjectElement } from 'minim';
import { isUndefined } from 'ramda-adjunct';

import { isObjectElement, isArrayElement, isMemberElement } from '../predicates';

interface Transcluder {
  transclude(search: Element, replace: Element): Element | undefined;
}

const computeEdges = (element: Element, edges = new WeakMap()): WeakMap<Element, any> => {
  if (isMemberElement(element)) {
    // @ts-ignore
    edges.set(element.key, element);
    // @ts-ignore
    computeEdges(element.key, edges);
    // @ts-ignore
    edges.set(element.value, element);
    // @ts-ignore
    computeEdges(element.value, edges);
  } else {
    element.children.forEach((childElement: Element): void => {
      edges.set(childElement, element);
      computeEdges(childElement, edges);
    });
  }

  return edges;
};

const transcludeChildOfMemberElement = (
  search: Element,
  replace: Element,
  edges: WeakMap<Element, any>,
): void => {
  const memberElement: MemberElement = edges.get(search);

  if (!isMemberElement(memberElement)) {
    return;
  }

  if (memberElement.key === search) {
    memberElement.key = replace;
    edges.delete(search);
    edges.set(replace, memberElement);
  }

  if (memberElement.value === search) {
    memberElement.value = replace;
    edges.delete(search);
    edges.set(replace, memberElement);
  }
};

const transcludeChildOfObjectElement = (
  search: Element,
  replace: MemberElement,
  edges: WeakMap<Element, any>,
): void => {
  const objectElement: ObjectElement = edges.get(search);

  if (!isObjectElement(objectElement)) {
    return;
  }

  objectElement.content = objectElement.map(
    (value: Element, key: Element, member: MemberElement): MemberElement => {
      if (member === search) {
        edges.delete(search);
        edges.set(replace, objectElement);
        return replace;
      }
      return member;
    },
  );
};

const transcludeChildOfArrayElement = (
  search: Element,
  replace: Element,
  edges: WeakMap<Element, any>,
): void => {
  const arrayElement: ArrayElement = edges.get(search);

  if (!isArrayElement(arrayElement)) {
    return;
  }

  arrayElement.content = arrayElement.map((element: Element): Element => {
    if (element === search) {
      edges.delete(search);
      edges.set(replace, arrayElement);
      return replace;
    }
    return element;
  });
};

/**
 * This is a mutating stamp. If you don't want your Element to be mutated,
 * clone in before passing it to initializer of this stamp.
 */

const Transcluder: stampit.Stamp<Transcluder> = stampit.init(function TranscluderConstructor({
  element,
}) {
  let edges: WeakMap<Element, any>;

  this.transclude = function transclude(search: Element, replace: Element): Element | undefined {
    // shortcut 1. - replacing entire ApiDOM tree
    if (search === element) return replace;
    // shortcut 2. - replacing nothing
    if (search === replace) return element;

    edges = edges ?? computeEdges(element);

    const parent = edges.get(search);

    if (isUndefined(parent)) {
      return undefined;
    }

    /**
     * This predicate must be first because ObjectElement extends ArrayElement.
     * isArrayElement returns true for ObjectElements.
     * (classical problems with polymorphism)
     */
    if (isObjectElement(parent)) {
      // @ts-ignore
      transcludeChildOfObjectElement(search, replace, edges);
    } else if (isArrayElement(parent)) {
      transcludeChildOfArrayElement(search, replace, edges);
    } else if (isMemberElement(parent)) {
      transcludeChildOfMemberElement(search, replace, edges);
    }

    return element;
  };
});

export default Transcluder;
