import { path } from 'ramda';
import {
  visit,
  Element,
  dereference,
  refract as baseRefract,
  dispatchRefractorPlugins,
} from '@swagger-api/apidom-core';
import type { Visitor as VisitorClass } from '@swagger-api/apidom-ns-json-schema-draft-4';

import specification from './specification';
import { keyMap, getNodeType } from '../traversal/visitor';
import createToolbox from './toolbox';

const refract = <T extends Element>(
  value: unknown,
  {
    specPath = ['visitors', 'document', 'objects', 'JSONSchema', '$visitor'],
    plugins = [],
    specificationObj = specification,
  } = {},
): T => {
  const element = baseRefract(value);
  const resolvedSpec = dereference(specificationObj);

  /**
   * This is where generic ApiDOM becomes semantic (namespace applied).
   * We don't allow consumers to hook into this translation.
   * Though we allow consumers to define their onw plugins on already transformed ApiDOM.
   */
  const RootVisitorClass = path(specPath, resolvedSpec) as typeof VisitorClass;
  const rootVisitor = new RootVisitorClass({ specObj: resolvedSpec });

  visit(element, rootVisitor);

  /**
   * Running plugins visitors means extra single traversal === performance hit.
   */
  return dispatchRefractorPlugins(rootVisitor.element, plugins, {
    toolboxCreator: createToolbox,
    visitorOptions: { keyMap, nodeTypeGetter: getNodeType },
  });
};

export const createRefractor =
  (specPath: string[]) =>
  (value: unknown, options = {}) =>
    refract(value, { specPath, ...options });

export default refract;
