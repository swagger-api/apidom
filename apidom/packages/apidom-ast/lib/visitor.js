"use strict";

exports.__esModule = true;
exports.visit = exports.isNode = exports.getNodeType = exports.BREAK = exports.getVisitFn = void 0;

var _ramda = require("ramda");

var _ramdaAdjunct = require("ramda-adjunct");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

// getVisitFn :: (Visitor, String, Boolean) -> Function
// @ts-ignore
var getVisitFn = function getVisitFn(visitor, type, isLeaving) {
  var typeVisitor = visitor[type];

  if ((0, _ramdaAdjunct.isNotNil)(typeVisitor)) {
    if (!isLeaving && (0, _ramdaAdjunct.isFunction)(typeVisitor)) {
      // { Type() {} }
      return typeVisitor;
    }

    var typeSpecificVisitor = isLeaving ? typeVisitor.leave : typeVisitor.enter;

    if ((0, _ramdaAdjunct.isFunction)(typeSpecificVisitor)) {
      // { Type: { enter() {}, leave() {} } }
      return typeSpecificVisitor;
    }
  } else {
    var specificVisitor = isLeaving ? visitor.leave : visitor.enter;

    if ((0, _ramdaAdjunct.isNotNil)(specificVisitor)) {
      if ((0, _ramdaAdjunct.isFunction)(specificVisitor)) {
        // { enter() {}, leave() {} }
        return specificVisitor;
      }

      var specificTypeVisitor = specificVisitor[type];

      if ((0, _ramdaAdjunct.isFunction)(specificTypeVisitor)) {
        // { enter: { Type() {} }, leave: { Type() {} } }
        return specificTypeVisitor;
      }
    }
  }

  return null;
};

exports.getVisitFn = getVisitFn;
var BREAK = {}; // getNodeType :: Node -> String

exports.BREAK = BREAK;
var getNodeType = (0, _ramda.prop)('type'); // isNode :: Node -> Boolean

exports.getNodeType = getNodeType;
var isNode = (0, _ramda.curryN)(1, (0, _ramda.pipe)(getNodeType, _ramdaAdjunct.isString));
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

exports.isNode = isNode;

var visit = function visit( // @ts-ignore
root, // @ts-ignore
visitor) {
  var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
      _ref$keyMap = _ref.keyMap,
      keyMap = _ref$keyMap === void 0 ? null : _ref$keyMap,
      _ref$state = _ref.state,
      state = _ref$state === void 0 ? {} : _ref$state,
      _ref$breakSymbol = _ref.breakSymbol,
      breakSymbol = _ref$breakSymbol === void 0 ? BREAK : _ref$breakSymbol,
      _ref$visitFnGetter = _ref.visitFnGetter,
      visitFnGetter = _ref$visitFnGetter === void 0 ? getVisitFn : _ref$visitFnGetter,
      _ref$nodeTypeGetter = _ref.nodeTypeGetter,
      nodeTypeGetter = _ref$nodeTypeGetter === void 0 ? getNodeType : _ref$nodeTypeGetter,
      _ref$nodePredicate = _ref.nodePredicate,
      nodePredicate = _ref$nodePredicate === void 0 ? isNode : _ref$nodePredicate;

  var visitorKeys = keyMap || {};
  var stack;
  var inArray = Array.isArray(root);
  var keys = [root];
  var index = -1;
  var parent;
  var edits = [];
  var path = []; // @ts-ignore

  var ancestors = [];
  var newRoot = root;

  do {
    index += 1;
    var isLeaving = index === keys.length;
    var key = void 0;
    var node = void 0;
    var isEdited = isLeaving && edits.length !== 0;

    if (isLeaving) {
      key = ancestors.length === 0 ? undefined : path.pop();
      node = parent; // @ts-ignore

      parent = ancestors.pop();

      if (isEdited) {
        if (inArray) {
          // @ts-ignore
          node = node.slice();
        } else {
          // creating clone
          node = Object.create(Object.getPrototypeOf(node), Object.getOwnPropertyDescriptors(node));
        }

        var editOffset = 0;

        for (var ii = 0; ii < edits.length; ii += 1) {
          var editKey = edits[ii][0];
          var editValue = edits[ii][1];

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
      keys = stack.keys; // @ts-ignore

      edits = stack.edits; // @ts-ignore

      inArray = stack.inArray; // @ts-ignore

      stack = stack.prev;
    } else {
      key = parent ? inArray ? index : keys[index] : undefined;
      node = parent ? parent[key] : newRoot;

      if (node === null || node === undefined) {
        continue;
      }

      if (parent) {
        path.push(key);
      }
    }

    var result = void 0;

    if (!Array.isArray(node)) {
      if (!nodePredicate(node)) {
        throw new Error("Invalid AST Node:  ".concat(JSON.stringify(node)));
      }

      var visitFn = visitFnGetter(visitor, nodeTypeGetter(node), isLeaving);

      if (visitFn) {
        // assign state
        for (var _i = 0, _Object$entries = Object.entries(state); _i < _Object$entries.length; _i++) {
          var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
              stateKey = _Object$entries$_i[0],
              stateValue = _Object$entries$_i[1];

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
      stack = {
        inArray: inArray,
        index: index,
        keys: keys,
        edits: edits,
        prev: stack
      };
      inArray = Array.isArray(node); // @ts-ignore

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
    var _edits = _slicedToArray(edits[edits.length - 1], 2);

    newRoot = _edits[1];
  }

  return newRoot;
};
/* eslint-enable */


exports.visit = visit;