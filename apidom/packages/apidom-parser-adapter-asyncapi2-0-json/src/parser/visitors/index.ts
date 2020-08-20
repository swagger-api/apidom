import {
  JsonArray,
  JsonDocument,
  JsonObject,
  JsonProperty,
  Error,
  visit as astVisit,
} from 'apidom-ast';

export { BREAK } from 'apidom-ast';

/* eslint-disable import/prefer-default-export */

const keyMapDefault = {
  // @ts-ignore
  [JsonDocument.type]: ['child'],
  // @ts-ignore
  [JsonObject.type]: ['properties'],
  // @ts-ignore
  [JsonProperty.type]: ['key', 'value'],
  // @ts-ignore
  [JsonArray.type]: ['items'],
  // @ts-ignore
  [Error.type]: ['children'],
};

// @ts-ignore
export const visit = (root, visitor, { keyMap = keyMapDefault, ...rest } = {}) => {
  // @ts-ignore
  return astVisit(root, visitor, { ...rest, keyMap });
};
