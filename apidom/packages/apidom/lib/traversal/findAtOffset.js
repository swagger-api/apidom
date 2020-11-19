"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _stampit = _interopRequireDefault(require("stampit"));

var _ramda = require("ramda");

var _ramdaAdjunct = require("ramda-adjunct");

var _predicates = require("../predicates");

var _visitor = require("./visitor");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Visitor = (0, _stampit["default"])({
  props: {
    result: [],
    offset: 0,
    includeRightBound: false
  },
  // @ts-ignore
  init: function init(_ref) {
    var _ref$offset = _ref.offset,
        offset = _ref$offset === void 0 ? this.offset : _ref$offset,
        _ref$includeRightBoun = _ref.includeRightBound,
        includeRightBound = _ref$includeRightBoun === void 0 ? this.includeRightBound : _ref$includeRightBoun;
    this.result = [];
    this.offset = offset;
    this.includeRightBound = includeRightBound;
  },
  methods: {
    enter: function enter(element) {
      if (!(0, _predicates.hasElementSourceMap)(element)) {
        return undefined; // dive in
      }

      var sourceMapElement = element.getMetaProperty('sourceMap');
      var charStart = sourceMapElement.positionStart.get(2).toValue();
      var charEnd = sourceMapElement.positionEnd.get(2).toValue();
      var isWithinOffsetRange = this.offset >= charStart && (this.offset < charEnd || this.includeRightBound && this.offset <= charEnd);

      if (isWithinOffsetRange) {
        this.result.push(element);
        return undefined; // push to stack and dive in
      }

      return false; // skip entire sub-tree
    }
  }
});
// Finds the most inner node at the given offset.
// If includeRightBound is set, also finds nodes that end at the given offset.
// findAtOffset :: Number -> Element -> Element | Undefined
var findAtOffset = (0, _ramda.curry)(function (options, element) {
  var offset;
  var includeRightBound;

  if ((0, _ramdaAdjunct.isNumber)(options)) {
    offset = options;
    includeRightBound = false;
  } else {
    offset = (0, _ramda.pathOr)(0, ['offset'], options);
    includeRightBound = (0, _ramda.pathOr)(false, ['includeRightBound'], options);
  }

  var visitor = Visitor({
    offset: offset,
    includeRightBound: includeRightBound
  }); // @ts-ignore

  (0, _visitor.visit)(element, visitor); // @ts-ignore

  return (0, _ramda.last)(visitor.result);
});
var _default = findAtOffset;
exports["default"] = _default;