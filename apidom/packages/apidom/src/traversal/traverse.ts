import stampit from 'stampit';
import { Element } from 'minim';
import { curry, pathOr, Pred } from 'ramda';
import { isFunction, noop } from 'ramda-adjunct';

import { visit, PredicateVisitor } from './visitor';
import { isElement } from '../predicates';

type Callback = <T extends Element>(element: T) => void;
interface TraverseOptions {
  callback?: Callback;
  predicate?: Pred;
}

export const CallbackVisitor = stampit(PredicateVisitor, {
  props: {
    callback: noop,
  },
  // @ts-ignore
  init({ callback = this.callback } = {}) {
    this.callback = callback;
  },
  methods: {
    enter(element: Element): undefined {
      if (this.predicate(element)) {
        this.callback(element);
        return this.returnOnTrue;
      }
      return this.returnOnFalse;
    },
  },
});

// executes the callback on this object and all descendants
// traverse :: Callback | { predicate: Pred, callback: Callback } -> Element -> Undefined
const traverse = curry(
  <T extends Element>(options: Callback | TraverseOptions, element: T): void => {
    let callback;
    let predicate;

    if (isFunction(options)) {
      callback = options;
      predicate = isElement;
    } else {
      callback = pathOr(noop, ['callback'], options);
      predicate = pathOr(isElement, ['predicate'], options);
    }

    const visitor = CallbackVisitor({ callback, predicate });

    // @ts-ignore
    visit(element, visitor);
  },
);

export default traverse;
