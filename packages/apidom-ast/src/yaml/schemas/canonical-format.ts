import {
  tail,
  compose,
  pathOr,
  map,
  concat,
  transduce,
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
import { unraw } from 'unraw';

/**
 * Helpers.
 */

const blockStyleRegExp = /^(?<style>[|>])(?<chomping>[+-]?)(?<indentation>[0-9]*)\s/;

const getIndentationIndicator = (content: string): number | undefined => {
  const matches = content.match(blockStyleRegExp);
  const indicator = pathOr('', ['groups', 'indentation'], matches);

  return isEmptyString(indicator) ? undefined : parseInt(indicator, 10);
};

const getIndentation = (content: string): string => {
  const explicitIndentationIndicator = getIndentationIndicator(content);

  // we have explicit indentation indicator
  if (isInteger(explicitIndentationIndicator)) {
    return repeatStr(' ', explicitIndentationIndicator);
  }

  // we assume indentation indicator from first line
  const firstLine = pathOr('', [1], content.split('\n'));
  const implicitIndentationIndicator = pathOr(
    0,
    ['groups', 'indentation', 'length'],
    firstLine.match(/^(?<indentation>[ ]*)/),
  );
  return repeatStr(' ', implicitIndentationIndicator);
};

const getChompingIndicator = (content: string): '+' | '-' | undefined => {
  const matches = content.match(blockStyleRegExp);
  const indicator = pathOr('', ['groups', 'chomping'], matches);

  return isEmptyString(indicator) ? undefined : indicator;
};

const chomp = (indicator: '+' | '-' | undefined, content: string): string => {
  // clip (single newline at end)
  if (isUndefined(indicator)) {
    return `${trimEnd(content)}\n`;
  }
  // strip (no newline at end)
  if (indicator === '-') {
    return trimEnd(content);
  }
  // keep (all newlines from end)
  if (indicator === '+') {
    return content;
  }
  return content;
};

/**
 * Normalizes lines breaks.
 * https://yaml.org/spec/1.2/spec.html#line%20break/normalization/
 */
// @ts-ignore
const normalizeLineBreaks = (val: string) => val.replace(/\r\n/g, '\n');

// prevent escaped line breaks from being converted to a space
const preventLineBreakCollapseToSpace = (val: string) => val.replace(/\\\n\s*/g, '');

// collapse line breaks into spaces
const collapseLineBreakToSpace = (val: string) => {
  /**
   * Safari doesn't support negative lookbehind, thus we use mimicking technique:
   *
   * - https://blog.stevenlevithan.com/archives/mimic-lookbehind-javascript
   *
   * Ideally we want to use following replace, but that's not currently possible:
   *
   * .replace(/[^\n]\n([^\n]+)/g, (match: string, p1: string) => ` ${p1.trimLeft()}`)
   */
  return val
    .replace(/(\n)?\n([^\n]+)/g, (match, p1, p2) => (p1 ? match : ` ${p2.trimStart()}`))
    .replace(/[\n]{2}/g, '\n');
};

const removeQuotes = curry((quoteType, val) =>
  val.replace(new RegExp(`^${quoteType}`), '').replace(new RegExp(`${quoteType}$`), ''),
);

/**
 * Formats Flow Scalar Plain style.
 * https://yaml.org/spec/1.2/spec.html#id2788859
 */
export const formatFlowPlain = pipe(
  normalizeLineBreaks,
  trim,
  collapseLineBreakToSpace,
  split('\n'),
  map(trimStart),
  join('\n'),
);

/**
 * Formats Flow Scalar Single-Quoted style.
 * https://yaml.org/spec/1.2/spec.html#id2788097
 */

export const formatFlowSingleQuoted = pipe(
  normalizeLineBreaks,
  trim,
  removeQuotes("'"),
  collapseLineBreakToSpace,
  split('\n'),
  map(trimStart),
  join('\n'),
);

/**
 * Formats Flow Scalar Double-Quoted style.
 * https://yaml.org/spec/1.2/spec.html#id2787109
 */
export const formatFlowDoubleQuoted = pipe(
  normalizeLineBreaks,
  trim,
  removeQuotes('"'),
  preventLineBreakCollapseToSpace,
  collapseLineBreakToSpace,
  unraw,
  split('\n'),
  map(trimStart),
  join('\n'),
);

/**
 * Formats Block Scalar Literal style.
 * https://yaml.org/spec/1.2/spec.html#id2795688
 */
export const formatBlockLiteral = (content: string): string => {
  const indentation = getIndentation(content);
  const chompingIndicator = getChompingIndicator(content);
  const normalized = normalizeLineBreaks(content);
  const lines = tail(normalized.split('\n')); // first line only contains indicators
  const transducer = compose(map(trimCharsStart(indentation)), map(concatRight('\n')));
  // @ts-ignore
  const deindented: string = transduce(transducer, concat, '', lines);

  return chomp(chompingIndicator, deindented);
};

/**
 * Formats BLock Scalar Folded style.
 * https://yaml.org/spec/1.2/spec.html#id2796251
 */
export const formatBlockFolded = (content: string): string => {
  const indentation = getIndentation(content);
  const chompingIndicator = getChompingIndicator(content);
  const normalized = normalizeLineBreaks(content);
  const lines = tail(normalized.split('\n')); // first line only contains indicators
  const transducer = compose(map(trimCharsStart(indentation)), map(concatRight('\n')));
  // @ts-ignore
  const deindented: string = transduce(transducer, concat, '', lines);
  const collapsed = collapseLineBreakToSpace(deindented);

  return chomp(chompingIndicator, collapsed);
};
