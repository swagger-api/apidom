'use strict';

const stampit = require('stampit');
const {head} = require('ramda');
const {isFunction, isArray, isUndefined, isNotUndefined} = require('ramda-adjunct');

const ApiDOMParser = stampit().init(function ApiDOMParser() {
  const adapters = [];

  const detectAdapterCandidates = source => {
    return adapters.filter(adapter => {
      if (!isFunction(adapter.detect)) return false;

      return adapter.detect(source);
    });
  };

  const findAdapter = (source, mediaType) => {
    if (isNotUndefined(mediaType)) {
      return adapters.find(adapter => {
        if (!isArray(adapter.mediaTypes)) return false;

        return adapter.mediaTypes.includes(mediaType);
      });
    }

    return head(detectAdapterCandidates(source));
  };

  this.use = function use(adapter) {
    adapters.push(adapter);
    return this;
  };

  this.parse = async function parse(source, options = {}) {
    const adapter = findAdapter(source, options.mediaType);

    if (isUndefined(adapter)) {
      return Promise.reject(new Error('Document did not match any registered parsers'))
    }

    return adapter.parse(source, options);
  };
});

module.exports = ApiDOMParser;
