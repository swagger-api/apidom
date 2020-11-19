"use strict";

exports.__esModule = true;
exports.detect = exports.mediaTypes = void 0;
var mediaTypes = ['text/yaml', 'application/yaml'];
exports.mediaTypes = mediaTypes;

var detect = function detect() {
  /**
   * We always return false here as there is no simple
   * way of synchronously determining if the string is YAML.
   * Media type should be used to activate this adapter.
   */
  return false;
};

exports.detect = detect;