import {
  tail,
  compose,
  pathOr,
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
  isInteger,
  trimStart,
  trimEnd,
  isUndefined,
  trimCharsStart,
  isEmptyString,
  repeatStr,
  concatRight,
} from 'ramda-adjunct';
import unraw from 'unraw';

/**
 * Helpers.
 */

const blockStyleRegExp = /^(?<style>[|>])(?<chomping>[+-]?)(?<indentation>[0-9]*)\s/;

const getIndentationIndicator = (scalarNode: any): number | undefined => {
  const matches = scalarNode.text.match(blockStyleRegExp);
  const indicator = pathOr('', ['groups', 'indentation'], matches);

  return isEmptyString(indicator) ? undefined : parseInt(indicator, 10);
};

const getIndentation = (scalarNode: any): string => {
  const explicitIndentationIndicator = getIndentationIndicator(scalarNode);

  // we have explicit indentation indicator
  if (isInteger(explicitIndentationIndicator)) {
    return repeatStr(' ', explicitIndentationIndicator);
  }

  // we assume indentation indicator from first line
  const firstLine = pathOr('', [1], scalarNode.text.split('\n'));
  const implicitIndentationIndicator = pathOr(
    0,
    ['groups', 'indentation', 'length'],
    firstLine.match(/^(?<indentation>[ ]*)/),
  );
  return repeatStr(' ', implicitIndentationIndicator);
};

const getChompingIndicator = (scalarNode: any): '+' | '-' | undefined => {
  const matches = scalarNode.text.match(blockStyleRegExp);
  const indicator = pathOr('', ['groups', 'chomping'], matches);

  return isEmptyString(indicator) ? undefined : indicator;
};

const chomp = (indicator: '+' | '-' | undefined, value: string): string => {
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
  const transducer = compose(map(trimCharsStart(indentation)), map(concatRight('\n')));
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
