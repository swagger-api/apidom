'use strict';

const {ArrayElement} = require('minim');

/**
 * @class SourceMap
 *
 * @param {string} content
 * @param meta
 * @param attributes
 * @extends ArrayElement
 */
class SourceMap extends ArrayElement {
  constructor(...args) {
    super(...args);
    this.element = 'sourceMap';
  }

  get position() {
    return this.children.filter(item => item.classes.contains('position')).first;
  }

  set position(position) {
    if (position === null) {
      return this;
    }

    const start = new ArrayElement([position.start.line, position.start.column, position.start.char]);
    const end = new ArrayElement([position.end.line, position.end.column, position.end.char]);

    start.classes.push('position');
    end.classes.push('position');

    return this.push(start).push(end);
  }
}

module.exports = SourceMap;
