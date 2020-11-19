"use strict";

exports.__esModule = true;
exports.detect = exports.mediaTypes = void 0;
var mediaTypes = ['application/vnd.oai.openapi;version=3.1.0', 'application/vnd.oai.openapi+json;version=3.1.0'];
exports.mediaTypes = mediaTypes;

var detect = function detect(source) {
  return !!source.match(/(["']?)openapi\1\s*:\s*(["']?)3\.\d+\.\d+\2/g);
};

exports.detect = detect;