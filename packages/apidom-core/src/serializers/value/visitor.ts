import { Element } from 'minim';

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

export const nodePredicate = (node: any): boolean => {
  return Array.isArray(node) || typeof nodeTypeGetter(node) === 'string';
};

const keyMapDefault = {
  EphemeralObject: ['content'],
  EphemeralArray: ['content'],
  ...baseKeyMap,
};

// @ts-ignore
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
    nodePredicate,
    detectCycles: false,
    deleteNodeSymbol: Symbol.for('delete-node'),
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
    nodePredicate,
    detectCycles: false,
    deleteNodeSymbol: Symbol.for('delete-node'),
    ...rest,
  });
};
