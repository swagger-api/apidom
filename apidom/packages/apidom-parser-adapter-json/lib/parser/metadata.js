"use strict";

exports.__esModule = true;
exports.appendMetadata = void 0;

// eslint-disable-next-line import/prefer-default-export
var appendMetadata = function appendMetadata(metadata, element) {
  metadata.forEach(function (md) {
    element.classes.push(md);
    element.getMetaProperty('symbols', []).push(md);
  });
  return element;
};

exports.appendMetadata = appendMetadata;