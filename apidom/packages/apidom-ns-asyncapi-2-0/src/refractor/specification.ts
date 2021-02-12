import { mapObjIndexed, has, path, defaultTo, propSatisfies } from 'ramda';
import { trimCharsStart, isPlainObject, isString } from 'ramda-adjunct';

import FallbackVisitor from './visitors/FallbackVisitor';
import SpecificationExtensionVisitor from './visitors/SpecificationExtensionVisitor';
import AsyncApi2_0Visitor from './visitors/async-api-2-0';
import AsyncApiVersionVisitor from './visitors/async-api-2-0/AsyncApiVersionVisitor';

/**
 * Specification object allows us to have complete control over visitors
 * when traversing the ApiDOM.
 * Specification also allows us to create amended refractors from
 * existing ones by manipulating it.
 *
 * Note: Specification object allows to use absolute internal JSON pointers.
 */
const specification = {
  visitors: {
    value: FallbackVisitor,
    document: {
      objects: {
        AsyncApi: {
          $visitor: AsyncApi2_0Visitor,
          fixedFields: {
            asyncapi: AsyncApiVersionVisitor,
          },
        },
      },
      extension: {
        $visitor: SpecificationExtensionVisitor,
      },
    },
  },
};

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

export default specification;
