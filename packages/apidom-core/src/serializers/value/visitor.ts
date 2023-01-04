import { Element } from 'minim';
import { T as stubTrue } from 'ramda';

import {
  visit as astVisit,
  keyMapDefault as baseKeyMap,
  getNodeType as baseGetNodeType,
} from '../../traversal/visitor';

const nodeTypeGetter = (node: any): string | undefined => {
  if (typeof node?.type === 'string') {
    return node.type;
  }

  return baseGetNodeType(node);
};

const keyMapDefault = {
  EphemeralObject: ['content'],
  EphemeralArray: ['content'],
  ...baseKeyMap,
};

// eslint-disable-next-line import/prefer-default-export
export const visit = (
  root: Element,
  // @ts-ignore
  visitor,
  { keyMap = keyMapDefault, ...rest } = {},
): Element => {
  return astVisit(root, visitor, {
    keyMap,
    // @ts-ignore
    nodeTypeGetter,
    nodePredicate: stubTrue,
    detectCycles: false,
    deleteNodeSymbol: Symbol.for('delete-node'),
    skipVisitingNodeSymbol: Symbol.for('skip-visiting-node'),
    ...rest,
  });
};

// @ts-ignore
visit[Symbol.for('nodejs.util.promisify.custom')] = async (
  root: Element,
  { keyMap = keyMapDefault, ...rest } = {},
): Promise<Element> => {
  // @ts-ignore
  return astVisit[Symbol.for('nodejs.util.promisify.custom')](root, visitor, {
    keyMap,
    nodeTypeGetter,
    nodePredicate: stubTrue,
    detectCycles: false,
    deleteNodeSymbol: Symbol.for('delete-node'),
    skipVisitingNodeSymbol: Symbol.for('skip-visiting-node'),
    ...rest,
  });
};
