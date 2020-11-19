"use strict";

exports.__esModule = true;
exports.detect = exports.mediaTypes = void 0;
var mediaTypes = ['application/vnd.aai.asyncapi;version=2.0.0', 'application/vnd.aai.asyncapi+json;version=2.0.0'];
exports.mediaTypes = mediaTypes;

var detect = function detect(source) {
  return !!source.match(/(["']?)asyncapi\1\s*:\s*(["']?)2\.\d+\.\d+\2/g);
};

exports.detect = detect;