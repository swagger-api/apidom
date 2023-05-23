/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable block-scoped-var */
/* eslint-disable vars-on-top */
/* eslint-disable no-var */
/* eslint-disable radix */
/* eslint-disable no-plusplus */
/* eslint-disable no-shadow */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/no-explicit-any */
import YAML from 'yaml-js';
import { find as rfind, propEq, memoizeWith, identity } from 'ramda';
import { isArray } from 'ramda-adjunct';

/* TODO this is taken from swagger-editor, we would instead import it from swagger-editor when dist will change
    to support single file import
 */
// @ts-ignore
const cachedCompose = memoizeWith(identity, YAML.compose); // TODO: build a custom cache based on content

const MAP_TAG = 'tag:yaml.org,2002:map';
const SEQ_TAG = 'tag:yaml.org,2002:seq';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function getLineNumberForPath(yaml: any, path: any) {
  // Type check
  if (typeof yaml !== 'string') {
    throw new TypeError('yaml should be a string');
  }
  if (!isArray(path)) {
    throw new TypeError('path should be an array of strings');
  }

  let i = 0;

  const ast = cachedCompose(yaml);

  // simply walks the tree using current path recursively to the point that
  // path is empty

  return find(ast, path);

  // eslint-disable-next-line @typescript-eslint/no-shadow
  function find(current: any, path: any, last?: any): any {
    if (!current) {
      // something has gone quite wrong
      // return the last start_mark as a best-effort
      if (last && last.start_mark) return last.start_mark.line;
      return 0;
    }

    if (path.length && current.tag === MAP_TAG) {
      for (i = 0; i < current.value.length; i++) {
        const pair = current.value[i];
        const key = pair[0];
        const value = pair[1];

        if (key.value === path[0]?.replace(/~1/g, '/')) {
          return find(value, path.slice(1), current);
        }

        if (key.value === path[0].replace(/\[.*/, '').replace(/~1/g, '/')) {
          // access the array at the index in the path (example: grab the 2 in "tags[2]")
          const index = parseInt(path[0]?.replace(/~1/g, '/').match(/\[(.*)\]/)[1]);
          if (value.value.length === 1 && index !== 0 && !!index) {
            var nextVal = rfind(propEq(String(index), 'value'), value.value[0]);
          } else {
            // @ts-ignore
            var nextVal = value.value[index]; // eslint-disable no-redeclare
          }
          return find(nextVal, path.slice(1), value.value);
        }
      }
    }

    if (path.length && current.tag === SEQ_TAG) {
      const item = current.value[path[0]?.replace(/~1/g, '/')];

      if (item && item.tag) {
        return find(item, path.slice(1), current.value);
      }
    }

    if (current.tag === MAP_TAG && !Array.isArray(last)) {
      return current.start_mark.line;
    }
    return current.start_mark.line + 1;
  }
}

/**
 * Get a position object with given
 * @param  {string}   yaml
 * YAML or JSON string
 * @param  {array}   path
 * an array of stings that constructs a
 * JSON Path similar to JSON Pointers(RFC 6901). The difference is, each
 * component of path is an item of the array instead of being separated with
 * slash(/) in a string
 */
export function positionRangeForPath(yaml: any, path: any) {
  // Type check
  if (typeof yaml !== 'string') {
    throw new TypeError('yaml should be a string');
  }
  if (!isArray(path)) {
    throw new TypeError('path should be an array of strings');
  }

  const invalidRange = {
    start: { line: -1, column: -1 },
    end: { line: -1, column: -1 },
  };
  let i = 0;

  const ast = cachedCompose(yaml);

  // simply walks the tree using astValue path recursively to the point that
  // path is empty.
  return find(ast);

  function find(astValue: any, astKeyValue?: any): any {
    if (astValue.tag === MAP_TAG) {
      for (i = 0; i < astValue.value.length; i++) {
        const pair = astValue.value[i];
        const key = pair[0];
        const value = pair[1];
        if (key.value === path[0]?.replace(/~1/g, '/')) {
          path.shift();
          return find(value, key);
        }
      }
    }

    if (astValue.tag === SEQ_TAG) {
      const item = astValue.value[path[0]?.replace(/~1/g, '/')];
      if (item && item.tag) {
        path.shift();
        return find(item, astKeyValue);
      }
    }

    // if path is still not empty we were not able to find the node
    if (path.length) {
      // if path is "" return the whole doc
      if (path.length === 1 && path[0].replace(/~1/g, '/') === '') {
        return {
          start: {
            line: astValue.start_mark.line,
            column: astValue.start_mark.column,
            pointer: astValue.start_mark.pointer,
          },
          end: {
            line: astValue.end_mark.line,
            column: astValue.end_mark.column,
            pointer: astValue.end_mark.pointer,
          },
        };
      }
      return invalidRange;
    }

    const range: any = {
      start: {
        line: astValue.start_mark.line,
        column: astValue.start_mark.column,
        pointer: astValue.start_mark.pointer,
      },
      end: {
        line: astValue.end_mark.line,
        column: astValue.end_mark.column,
        pointer: astValue.end_mark.pointer,
      },
    };

    if (astKeyValue) {
      // eslint-disable-next-line camelcase
      range.key_start = {
        line: astKeyValue.start_mark.line,
        column: astKeyValue.start_mark.column,
        pointer: astKeyValue.start_mark.pointer,
      };
      // eslint-disable-next-line camelcase
      range.key_end = {
        line: astKeyValue.end_mark.line,
        column: astKeyValue.end_mark.column,
        pointer: astKeyValue.end_mark.pointer,
      };
    }

    return range;
  }
}

/**
 * Get a JSON Path for position object in the spec
 * @param  {string} yaml
 * YAML or JSON string
 * @param  {object} position
 * position in the YAML or JSON string with `line` and `column` properties.
 * `line` and `column` number are zero indexed
 */
export function pathForPosition(yaml: any, position: any) {
  // Type check
  if (typeof yaml !== 'string') {
    throw new TypeError('yaml should be a string');
  }
  if (
    typeof position !== 'object' ||
    typeof position.line !== 'number' ||
    typeof position.column !== 'number'
  ) {
    throw new TypeError('position should be an object with line and column properties');
  }

  try {
    var ast = cachedCompose(yaml);
  } catch (e: any) {
    // eslint-disable-next-line no-console
    console.error('Error composing AST', e);

    const problemMark = e.problem_mark || {};
    const errorTraceMessage = [
      yaml
        .split('\n')
        .slice(problemMark.line - 5, problemMark.line + 1)
        .join('\n'),
      `${Array(problemMark.column).fill(' ').join('')}^----- ${e.name}: ${
        e.toString().split('\n')[0]
      }`,
      yaml
        .split('\n')
        .slice(problemMark.line + 1, problemMark.line + 5)
        .join('\n'),
    ].join('\n');

    // eslint-disable-next-line no-console
    console.error(errorTraceMessage);
    return null;
  }

  const path: any = [];

  return find(ast);

  /**
   * recursive find function that finds the node matching the position
   * @param  {object} current - AST object to serach into
   */
  function find(current: any): any {
    // algorythm:
    // is current a promitive?
    //   // finish recursion without modifying the path
    // is current a hash?
    //   // find a key or value that position is in their range
    //     // if key is in range, terminate recursion with exisiting path
    //     // if a value is in range push the corresponding key to the path
    //     //   andcontinue recursion
    // is current an array
    //   // find the item that position is in it"s range and push the index
    //   //  of the item to the path and continue recursion with that item.

    let i = 0;

    if (!current || [MAP_TAG, SEQ_TAG].indexOf(current.tag) === -1) {
      return path;
    }

    if (current.tag === MAP_TAG) {
      for (i = 0; i < current.value.length; i++) {
        const pair = current.value[i];
        const key = pair[0];
        const value = pair[1];

        if (isInRange(key)) {
          return path;
        }
        if (isInRange(value)) {
          path.push(key.value);
          return find(value);
        }
      }
    }

    if (current.tag === SEQ_TAG) {
      for (i = 0; i < current.value.length; i++) {
        const item = current.value[i];

        if (isInRange(item)) {
          path.push(i.toString());
          return find(item);
        }
      }
    }

    return path;

    /**
     * Determines if position is in node"s range
     * @param  {object}  node - AST node
     * @return {Boolean}      true if position is in node"s range
     */
    function isInRange(node: any) {
      /* jshint camelcase: false */

      // if node is in a single line
      if (node.start_mark.line === node.end_mark.line) {
        return (
          position.line === node.start_mark.line &&
          node.start_mark.column <= position.column &&
          node.end_mark.column >= position.column
        );
      }

      // if position is in the same line as start_mark
      if (position.line === node.start_mark.line) {
        return position.column >= node.start_mark.column;
      }

      // if position is in the same line as end_mark
      if (position.line === node.end_mark.line) {
        return position.column <= node.end_mark.column;
      }

      // if position is between start and end lines return true, otherwise
      // return false.
      return node.start_mark.line < position.line && node.end_mark.line > position.line;
    }
  }
}

// utility fns

export const pathForPositionAsync = promisifySyncFn(pathForPosition);
export const positionRangeForPathAsync = promisifySyncFn(positionRangeForPath);
export const getLineNumberForPathAsync = promisifySyncFn(getLineNumberForPath);

function promisifySyncFn(fn: any) {
  // eslint-disable-next-line func-names
  return function (...args: any) {
    // eslint-disable-next-line no-promise-executor-return
    return new Promise((resolve) => resolve(fn(...args)));
  };
}
