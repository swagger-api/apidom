"use strict";

exports.__esModule = true;
exports["default"] = exports.CallbackVisitor = void 0;

var _stampit = _interopRequireDefault(require("stampit"));

var _ramda = require("ramda");

var _ramdaAdjunct = require("ramda-adjunct");

var _visitor = require("./visitor");

var _predicates = require("../predicates");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var CallbackVisitor = (0, _stampit["default"])(_visitor.PredicateVisitor, {
  props: {
    callback: _ramdaAdjunct.noop
  },
  // @ts-ignore
  init: function init() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$callback = _ref.callback,
        callback = _ref$callback === void 0 ? this.callback : _ref$callback;

    this.callback = callback;
  },
  methods: {
    enter: function enter(element) {
      if (this.predicate(element)) {
        this.callback(element);
        return this["return"];
      }

      return undefined;
    }
  }
}); // executes the callback on this object and all descendants
// traverse :: Callback | { predicate: Pred, callback: Callback } -> Element -> Undefined

exports.CallbackVisitor = CallbackVisitor;
var traverse = (0, _ramda.curry)(function (options, element) {
  var callback;
  var predicate;

  if ((0, _ramdaAdjunct.isFunction)(options)) {
    callback = options;
    predicate = _predicates.isElement;
  } else {
    callback = (0, _ramda.pathOr)(_ramdaAdjunct.noop, ['callback'], options);
    predicate = (0, _ramda.pathOr)(_predicates.isElement, ['predicate'], options);
  }

  var visitor = CallbackVisitor({
    callback: callback,
    predicate: predicate
  }); // @ts-ignore

  (0, _visitor.visit)(element, visitor);
});
var _default = traverse;
exports["default"] = _default;