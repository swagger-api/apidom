import { defaultTo, has, mapObjIndexed, path, propSatisfies } from 'ramda';
import { isPlainObject, isString, trimCharsStart } from 'ramda-adjunct';

/**
 * This dereference algorithm is used exclusively for dereferencing specification objects.
 * It doesn't handle circular references of external references and works on objects only (not arrays).
 * @public
 */
// eslint-disable-next-line import/prefer-default-export
export const dereference = (
  object: Record<string, any>,
  root?: Record<string, any>,
): Record<string, any> => {
  const rootObject = defaultTo(object, root);

  return mapObjIndexed((val) => {
    if (isPlainObject(val) && has('$ref', val) && propSatisfies(isString, '$ref', val)) {
      const $ref = path(['$ref'], val);
      // @ts-ignore
      const pointer = trimCharsStart('#/', $ref);
      return path(pointer.split('/'), rootObject);
    }
    if (isPlainObject(val)) {
      return dereference(val, rootObject);
    }
    return val;
  }, object);
};
