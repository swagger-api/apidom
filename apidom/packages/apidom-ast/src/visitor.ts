import { prop, pipe, curryN, tail, forEachObjIndexed, defaultTo, identity, pathOr } from 'ramda';
import { isFunction, isString, isNotNil, isNotUndefined, isPlainObject } from 'ramda-adjunct';

// getVisitFn :: (Visitor, String, Boolean) -> Function
export const getVisitFn = (visitor: any, type: string, isLeaving: boolean) => {
  const typeVisitor = visitor[type];

  if (isNotNil(typeVisitor)) {
    if (!isLeaving && isFunction(typeVisitor)) {
      // { Type() {} }
      return typeVisitor;
    }
    const typeSpecificVisitor = isLeaving ? typeVisitor.leave : typeVisitor.enter;
    if (isFunction(typeSpecificVisitor)) {
      // { Type: { enter() {}, leave() {} } }
      return typeSpecificVisitor;
    }
  } else {
    const specificVisitor = isLeaving ? visitor.leave : visitor.enter;
    if (isNotNil(specificVisitor)) {
      if (isFunction(specificVisitor)) {
        // { enter() {}, leave() {} }
        return specificVisitor;
      }
      const specificTypeVisitor = specificVisitor[type];
      if (isFunction(specificTypeVisitor)) {
        // { enter: { Type() {} }, leave: { Type() {} } }
        return specificTypeVisitor;
      }
    }
  }

  return null;
};

export const BREAK = {};

// getNodeType :: Node -> String
export const getNodeType = prop('type');

// isNode :: Node -> Boolean
export const isNode = curryN(1, pipe(getNodeType, isString));

// wrap visitor functions to allow to run them in parallel
const wrapVisitorFn = (previousVisitorFn: any, visitorFn: any) => {
  function wrapper(...args: any[]) {
    const result = previousVisitorFn(...args);

    // don't run visitor function as previous one stopped the visiting
    if ([false, null, BREAK].includes(result)) {
      return result;
    }

    // node has been replaced
    if (isNotUndefined(result)) {
      return visitorFn(result, ...tail(args));
    }

    return visitorFn(...args);
  }

  Object.defineProperty(wrapper, 'name', {
    value: visitorFn.name,
  });

  return wrapper;
};

// normalized all possible visitor shapes into standardized form.
const normalize = (visitor: any) => {
  const normalized: any = {};

  forEachObjIndexed((value: any, key) => {
    if (key === 'enter' && isFunction(value)) {
      // { enter() {} }
      normalized.enter = value.bind(normalized);
    } else if (key === 'leave' && isFunction(value)) {
      // { enter() {}, leave() {} }
      normalized.leave = value.bind(normalized);
    } else if (key === 'enter' && isPlainObject(value)) {
      // { enter: { Type() {} } }
      forEachObjIndexed((visitorFn: any, type) => {
        normalized[type] = defaultTo({}, normalized[type]);
        normalized[type].enter = visitorFn.bind(normalized);
      }, value);
    } else if (key === 'leave' && isPlainObject(value)) {
      // { leave: { Type() {} } }
      forEachObjIndexed((visitorFn: any, type) => {
        normalized[type] = defaultTo({}, normalized[type]);
        normalized[type].leave = visitorFn.bind(normalized);
      }, value);
    } else if (isFunction(value)) {
      // { Type() {} }
      normalized[key] = {
        enter: value.bind(normalized),
      };
    } else if (isPlainObject(value)) {
      // { Type: { enter() {}, leave() {} } }
      normalized[key] = {};
      // @ts-ignore
      if (isFunction(value.enter)) {
        // @ts-ignore
        normalized[key].enter = value.enter.bind(normalized);
      }
      // @ts-ignore
      if (isFunction(value.leave)) {
        // @ts-ignore
        normalized[key].leave = value.leave.bind(normalized);
      }
    }
  }, visitor);

  return normalized;
};

/**
 * Creates a new visitor instance which delegates to many visitors to run in
 * parallel. Each visitor will be visited for each node before moving on.
 *
 * If a prior visitor edits a node, no following visitors will see that node.
 */
export const mergeAll = (visitors: any[]) => {
  return visitors.reduce((mergedVisitors, visitor) => {
    /* eslint-disable no-param-reassign */
    const normalizedVisitor = normalize(visitor);

    forEachObjIndexed((value, type: any) => {
      if (type === 'enter') {
        const previousEnterFn = defaultTo(identity, mergedVisitors.enter);
        mergedVisitors.enter = wrapVisitorFn(previousEnterFn, value).bind(mergedVisitors);
      } else if (type === 'leave') {
        const previousLeaveFn = defaultTo(identity, mergedVisitors.leave);
        mergedVisitors.leave = wrapVisitorFn(previousLeaveFn, value).bind(mergedVisitors);
      } else if (isFunction(value.enter)) {
        const previousTypeEnterFn = pathOr(identity, [type, 'enter'], mergedVisitors);
        mergedVisitors[type] = defaultTo({}, mergedVisitors.type);
        mergedVisitors[type].enter = wrapVisitorFn(previousTypeEnterFn, value.enter).bind(
          mergedVisitors,
        );
      } else if (isFunction(value.leave)) {
        const previousTypeLeaveFn = pathOr(identity, [type, 'leave'], mergedVisitors);
        mergedVisitors[type] = defaultTo({}, mergedVisitors.type);
        mergedVisitors[type].enter = wrapVisitorFn(previousTypeLeaveFn, value.leave).bind(
          mergedVisitors,
        );
      }
    }, normalizedVisitor);

    return mergedVisitors;
  }, {});
  /* eslint-enable */
};

/* eslint-disable no-continue, no-nested-ternary, no-param-reassign */
/**
 * visit() will walk through an AST using a depth first traversal, calling
 * the visitor's enter function at each node in the traversal, and calling the
 * leave function after visiting that node and all of its child nodes.
 *
 * By returning different values from the enter and leave functions, the
 * behavior of the visitor can be altered, including skipping over a sub-tree of
 * the AST (by returning false), editing the AST by returning a value or null
 * to remove the value, or to stop the whole traversal by returning BREAK.
 *
 * When using visit() to edit an AST, the original AST will not be modified, and
 * a new version of the AST with the changes applied will be returned from the
 * visit function.
 *
 *     const editedAST = visit(ast, {
 *       enter(node, key, parent, path, ancestors) {
 *         // @return
 *         //   undefined: no action
 *         //   false: skip visiting this node
 *         //   BREAK: stop visiting altogether
 *         //   null: delete this node
 *         //   any value: replace this node with the returned value
 *       },
 *       leave(node, key, parent, path, ancestors) {
 *         // @return
 *         //   undefined: no action
 *         //   false: no action
 *         //   BREAK: stop visiting altogether
 *         //   null: delete this node
 *         //   any value: replace this node with the returned value
 *       }
 *     });
 *
 * Alternatively to providing enter() and leave() functions, a visitor can
 * instead provide functions named the same as the kinds of AST nodes, or
 * enter/leave visitors at a named key, leading to four permutations of
 * visitor API:
 *
 * 1) Named visitors triggered when entering a node a specific kind.
 *
 *     visit(ast, {
 *       Kind(node) {
 *         // enter the "Kind" node
 *       }
 *     })
 *
 * 2) Named visitors that trigger upon entering and leaving a node of
 *    a specific kind.
 *
 *     visit(ast, {
 *       Kind: {
 *         enter(node) {
 *           // enter the "Kind" node
 *         }
 *         leave(node) {
 *           // leave the "Kind" node
 *         }
 *       }
 *     })
 *
 * 3) Generic visitors that trigger upon entering and leaving any node.
 *
 *     visit(ast, {
 *       enter(node) {
 *         // enter any node
 *       },
 *       leave(node) {
 *         // leave any node
 *       }
 *     })
 *
 * 4) Parallel visitors for entering and leaving nodes of a specific kind.
 *
 *     visit(ast, {
 *       enter: {
 *         Kind(node) {
 *           // enter the "Kind" node
 *         }
 *       },
 *       leave: {
 *         Kind(node) {
 *           // leave the "Kind" node
 *         }
 *       }
 *     })
 *
 *  @sig visit :: (Node, Visitor, Options)
 *  @sig      Options = { keyMap: Object, state: Object }
 */

export const visit = (
  // @ts-ignore
  root,
  // @ts-ignore
  visitor,
  {
    keyMap = null,
    state = {},
    breakSymbol = BREAK,
    visitFnGetter = getVisitFn,
    nodeTypeGetter = getNodeType,
    nodePredicate = isNode,
  } = {},
) => {
  const visitorKeys = keyMap || {};

  let stack;
  let inArray = Array.isArray(root);
  let keys = [root];
  let index = -1;
  let parent;
  let edits = [];
  const path = [];
  // @ts-ignore
  const ancestors = [];
  let newRoot = root;

  do {
    index += 1;
    const isLeaving = index === keys.length;
    let key;
    let node;
    const isEdited = isLeaving && edits.length !== 0;
    if (isLeaving) {
      key = ancestors.length === 0 ? undefined : path.pop();
      node = parent;
      // @ts-ignore
      parent = ancestors.pop();
      if (isEdited) {
        if (inArray) {
          // @ts-ignore
          node = node.slice();
        } else {
          // creating clone
          node = Object.create(Object.getPrototypeOf(node), Object.getOwnPropertyDescriptors(node));
        }
        let editOffset = 0;
        for (let ii = 0; ii < edits.length; ii += 1) {
          let editKey = edits[ii][0];
          const editValue = edits[ii][1];
          if (inArray) {
            editKey -= editOffset;
          }
          if (inArray && editValue === null) {
            node.splice(editKey, 1);
            editOffset += 1;
          } else {
            node[editKey] = editValue;
          }
        }
      }
      index = stack.index;
      keys = stack.keys;
      // @ts-ignore
      edits = stack.edits;
      // @ts-ignore
      inArray = stack.inArray;
      // @ts-ignore
      stack = stack.prev;
    } else {
      key = parent ? (inArray ? index : keys[index]) : undefined;
      node = parent ? parent[key] : newRoot;
      if (node === null || node === undefined) {
        continue;
      }
      if (parent) {
        path.push(key);
      }
    }

    let result;
    if (!Array.isArray(node)) {
      if (!nodePredicate(node)) {
        throw new Error(`Invalid AST Node:  ${JSON.stringify(node)}`);
      }
      const visitFn = visitFnGetter(visitor, nodeTypeGetter(node), isLeaving);
      if (visitFn) {
        // assign state
        for (const [stateKey, stateValue] of Object.entries(state)) {
          visitor[stateKey] = stateValue;
        }

        result = visitFn.call(visitor, node, key, parent, path, ancestors);

        if (result === breakSymbol) {
          break;
        }

        if (result === false) {
          if (!isLeaving) {
            path.pop();
            continue;
          }
        } else if (result !== undefined) {
          edits.push([key, result]);
          if (!isLeaving) {
            if (nodePredicate(result)) {
              node = result;
            } else {
              path.pop();
              continue;
            }
          }
        }
      }
    }

    if (result === undefined && isEdited) {
      edits.push([key, node]);
    }

    if (!isLeaving) {
      stack = { inArray, index, keys, edits, prev: stack };
      inArray = Array.isArray(node);
      // @ts-ignore
      keys = inArray ? node : visitorKeys[nodeTypeGetter(node)] || [];
      index = -1;
      edits = [];
      if (parent) {
        ancestors.push(parent);
      }
      parent = node;
    }
  } while (stack !== undefined);

  if (edits.length !== 0) {
    [, newRoot] = edits[edits.length - 1];
  }

  return newRoot;
};

/**
 * Asynchronous version of visit.
 */
// @ts-ignore
visit[Symbol.for('nodejs.util.promisify.custom')] = async (
  // @ts-ignore
  root,
  // @ts-ignore
  visitor,
  {
    keyMap = null,
    state = {},
    breakSymbol = BREAK,
    visitFnGetter = getVisitFn,
    nodeTypeGetter = getNodeType,
    nodePredicate = isNode,
  } = {},
) => {
  const visitorKeys = keyMap || {};

  let stack;
  let inArray = Array.isArray(root);
  let keys = [root];
  let index = -1;
  let parent;
  let edits = [];
  const path = [];
  // @ts-ignore
  const ancestors = [];
  let newRoot = root;

  do {
    index += 1;
    const isLeaving = index === keys.length;
    let key;
    let node;
    const isEdited = isLeaving && edits.length !== 0;
    if (isLeaving) {
      key = ancestors.length === 0 ? undefined : path.pop();
      node = parent;
      // @ts-ignore
      parent = ancestors.pop();
      if (isEdited) {
        if (inArray) {
          // @ts-ignore
          node = node.slice();
        } else {
          // creating clone
          node = Object.create(Object.getPrototypeOf(node), Object.getOwnPropertyDescriptors(node));
        }
        let editOffset = 0;
        for (let ii = 0; ii < edits.length; ii += 1) {
          let editKey = edits[ii][0];
          const editValue = edits[ii][1];
          if (inArray) {
            editKey -= editOffset;
          }
          if (inArray && editValue === null) {
            node.splice(editKey, 1);
            editOffset += 1;
          } else {
            node[editKey] = editValue;
          }
        }
      }
      index = stack.index;
      keys = stack.keys;
      // @ts-ignore
      edits = stack.edits;
      // @ts-ignore
      inArray = stack.inArray;
      // @ts-ignore
      stack = stack.prev;
    } else {
      key = parent ? (inArray ? index : keys[index]) : undefined;
      node = parent ? parent[key] : newRoot;
      if (node === null || node === undefined) {
        continue;
      }
      if (parent) {
        path.push(key);
      }
    }

    let result;
    if (!Array.isArray(node)) {
      if (!nodePredicate(node)) {
        throw new Error(`Invalid AST Node:  ${JSON.stringify(node)}`);
      }
      const visitFn = visitFnGetter(visitor, nodeTypeGetter(node), isLeaving);
      if (visitFn) {
        // assign state
        for (const [stateKey, stateValue] of Object.entries(state)) {
          visitor[stateKey] = stateValue;
        }

        // eslint-disable-next-line no-await-in-loop
        result = await visitFn.call(visitor, node, key, parent, path, ancestors);

        if (result === breakSymbol) {
          break;
        }

        if (result === false) {
          if (!isLeaving) {
            path.pop();
            continue;
          }
        } else if (result !== undefined) {
          edits.push([key, result]);
          if (!isLeaving) {
            if (nodePredicate(result)) {
              node = result;
            } else {
              path.pop();
              continue;
            }
          }
        }
      }
    }

    if (result === undefined && isEdited) {
      edits.push([key, node]);
    }

    if (!isLeaving) {
      stack = { inArray, index, keys, edits, prev: stack };
      inArray = Array.isArray(node);
      // @ts-ignore
      keys = inArray ? node : visitorKeys[nodeTypeGetter(node)] || [];
      index = -1;
      edits = [];
      if (parent) {
        ancestors.push(parent);
      }
      parent = node;
    }
  } while (stack !== undefined);

  if (edits.length !== 0) {
    [, newRoot] = edits[edits.length - 1];
  }

  return newRoot;
};

/* eslint-enable */
