import {
  repeat,
  tail,
  compose,
  __,
  map,
  concat,
  transduce,
  ifElse,
  always,
  prop,
  pipe,
  trim,
  split,
  join,
  curry,
} from 'ramda';
import {
  isNonEmptyString,
  trimStart,
  trimEnd,
  isUndefined,
  isArray,
  trimCharsStart,
  isEmptyString,
} from 'ramda-adjunct';
import unraw from 'unraw';

/**
 * Helpers.
 */

const blockStyleRegExp = /^([|>])([+-])*([0-9]*)\s/;

const getIndentation = (scalarNode: any): string => {
  const matches = scalarNode.text.match(blockStyleRegExp);
  const spaceCount =
    isArray(matches) && isNonEmptyString(matches[3]) ? parseInt(matches[3], 10) : 0;

  return repeat(' ', spaceCount).join('');
};

const getChompingIndicator = (scalarNode: any): string | undefined => {
  const matches = scalarNode.text.match(blockStyleRegExp);
  return isArray(matches) ? matches[2] : undefined;
};

const chomp = (indicator: string | undefined, value: string): string => {
  // clip (single newline at end)
  if (isUndefined(indicator)) {
    return `${trimEnd(value)}\n`;
  }
  // strip (no newline at end)
  if (indicator === '-') {
    return trimEnd(value);
  }
  // keep (all newlines from end)
  if (indicator === '+') {
    return value;
  }
  return value;
};

// prevent escaped newlines from being converted to a space
const preventNlCollapseToSpace = (val: string) => val.replace(/\\\n\s*/g, '');

// collapse newlines into spaces
const collapseNlToSpace = (val: string) =>
  val.replace(/\n([^\n]+)/g, (match: string, p1: string) => ` ${p1.trimLeft()}`);

const removeQuotes = curry((quoteType, val) =>
  val.replace(new RegExp(`^${quoteType}`), '').replace(new RegExp(`${quoteType}$`), ''),
);

/**
 * Formats Flow Scalar Plain style.
 * https://yaml.org/spec/1.2/spec.html#id2788859
 */
export const formatFlowPlain = pipe(
  // @ts-ignore
  prop('text'),
  trim,
  collapseNlToSpace,
  split('\n'),
  map(trimStart),
  join('\n'),
);

/**
 * Formats Flow Scalar Single-Quoted style.
 * https://yaml.org/spec/1.2/spec.html#id2788097
 */

export const formatFlowSingleQuoted = pipe(
  // @ts-ignore
  prop('text'),
  trim,
  removeQuotes("'"),
  collapseNlToSpace,
  split('\n'),
  map(trimStart),
  join('\n'),
);

/**
 * Formats Flow Scalar Double-Quoted style.
 * https://yaml.org/spec/1.2/spec.html#id2787109
 */
export const formatFlowDoubleQuoted = pipe(
  // @ts-ignore
  prop('text'),
  trim,
  removeQuotes('"'),
  preventNlCollapseToSpace,
  collapseNlToSpace,
  unraw,
  split('\n'),
  map(trimStart),
  join('\n'),
);

/**
 * Formats Block Scalar Literal style.
 * https://yaml.org/spec/1.2/spec.html#id2795688
 */
export const formatBlockLiteral = (scalarNode: any): string => {
  const indentation = getIndentation(scalarNode);
  const chompingIndicator = getChompingIndicator(scalarNode);
  const lines = tail(scalarNode.text.split('\n')); // first line only contains indicators
  // @ts-ignore
  const transducer = compose(map(trimCharsStart(indentation)), map(concat(__, '\n')));
  // @ts-ignore
  const formatted: string = transduce(transducer, concat, '', lines);

  return chomp(chompingIndicator, formatted);
};

/**
 * Formats BLock Scalar Folded style.
 * https://yaml.org/spec/1.2/spec.html#id2796251
 */
export const formatBlockFolded = (scalarNode: any): string => {
  const indentation = getIndentation(scalarNode);
  const chompingIndicator = getChompingIndicator(scalarNode);
  const lines = tail(scalarNode.text.split('\n')); // first line only contains indicators
  // @ts-ignore
  const transducer = compose(
    map(trimCharsStart(indentation)),
    // @ts-ignore
    map(ifElse(isEmptyString, always('\n'), concat(__, ' '))),
  );
  // @ts-ignore
  const formatted: string = transduce(transducer, concat, '', lines);

  return chomp(chompingIndicator, formatted);
};
