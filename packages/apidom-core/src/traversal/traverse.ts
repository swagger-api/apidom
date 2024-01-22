import { Element } from 'minim';
import { pathOr } from 'ramda';
import { isFunction, noop } from 'ramda-adjunct';

import { visit, PredicateVisitor } from './visitor';
import type { PredicateVisitorOptions } from './visitor';
import { isElement } from '../predicates';

type Callback = <T extends Element>(element: T) => void;
interface TraverseOptions {
  callback?: Callback;
  predicate?: (element: any) => boolean;
}

interface CallbackVisitorOptions extends PredicateVisitorOptions {
  readonly callback?: Callback;
}

export class CallbackVisitor extends PredicateVisitor {
  protected readonly callback: Callback;

  constructor({ callback = noop, ...rest }: CallbackVisitorOptions = {}) {
    super({ ...rest });
    this.callback = callback;
  }

  public enter(element: Element): unknown {
    if (this.predicate(element)) {
      this.callback(element);
      return this.returnOnTrue;
    }
    return this.returnOnFalse;
  }
}

// executes the callback on this element and all descendants
const traverse = <T extends Element>(options: Callback | TraverseOptions, element: T): void => {
  let callback;
  let predicate;

  if (isFunction(options)) {
    callback = options;
    predicate = isElement;
  } else {
    callback = pathOr(noop, ['callback'], options);
    predicate = pathOr(isElement, ['predicate'], options);
  }

  const visitor = new CallbackVisitor({ callback, predicate });

  // @ts-ignore
  visit(element, visitor);
};

export default traverse;
