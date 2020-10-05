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
  [YamlStream.type]: ['children'],
  // @ts-ignore
  [YamlDocument.type]: ['children'],
  // @ts-ignore
  [YamlMapping.type]: ['children'],
  // @ts-ignore
  [YamlSequence.type]: ['children'],
  // @ts-ignore
  [YamlKeyValuePair.type]: ['key', 'value'],
  // @ts-ignore
  [Error.type]: ['children'],
};

// @ts-ignore
export const visit = (root, visitor, { keyMap = keyMapDefault, ...rest } = {}) => {
  // @ts-ignore
  return astVisit(root, visitor, { ...rest, keyMap });
};
