import {
  visit,
  Element,
  dereference,
  refract as baseRefract,
  dispatchRefractorPlugins,
} from '@swagger-api/apidom-core';
import type { Visitor as VisitorClass } from '@swagger-api/apidom-ns-openapi-3-0';
import { path } from 'ramda';

import specification from './specification.ts';
import { keyMap, getNodeType } from '../traversal/visitor.ts';
import createToolbox from './toolbox.ts';

const refract = <T extends Element>(
  value: unknown,
  { specPath = ['visitors', 'document', 'objects', 'OpenApi', '$visitor'], plugins = [] } = {},
): T => {
  const element = baseRefract(value);
  const resolvedSpec = dereference(specification);

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
  }) as T;
};

export const createRefractor =
  (specPath: string[]) =>
  (value: unknown, options = {}) =>
    refract(value, { specPath, ...options });

export default refract;
