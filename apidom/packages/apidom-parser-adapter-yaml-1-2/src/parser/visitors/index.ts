import { propOr } from 'ramda';
import {
  YamlStream,
  YamlDocument,
  YamlMapping,
  YamlSequence,
  YamlKeyValuePair,
  Error,
  visit as astVisit,
} from 'apidom-ast';

export { BREAK } from 'apidom-ast';

/* eslint-disable import/prefer-default-export */

const keyMapDefault = {
  // @ts-ignore
  [YamlStream.type]: ['content'],
  // @ts-ignore
  [YamlDocument.type]: ['children'],
  // @ts-ignore
  [YamlMapping.type]: ['content'],
  // @ts-ignore
  [YamlSequence.type]: ['content'],
  // @ts-ignore
  [YamlKeyValuePair.type]: ['key', 'value'],
  // @ts-ignore
  [Error.type]: ['children'],
};
export { keyMapDefault as keyMap };

// @ts-ignore
export const visit = (root, visitor, { keyMap = keyMapDefault, ...rest } = {}) => {
  // if visitor is associated with the keymap, we prefer this visitor's keymap
  const effectiveKeyMap = propOr(keyMap, 'keyMap', visitor);

  // @ts-ignore
  return astVisit(root, visitor, { ...rest, keyMap: effectiveKeyMap });
};
