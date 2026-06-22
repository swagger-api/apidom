import {
  visit,
  Element,
  dereference,
  refract as baseRefract,
  dispatchRefractorPlugins,
} from '@swagger-api/apidom-core';
import { path } from 'ramda';

import type VisitorClass from './visitors/Visitor.ts';
import specification from './specification.ts';
import { keyMap, getNodeType } from '../traversal/visitor.ts';
import createToolbox from './toolbox.ts';
import { canonicalizeKeys } from './canonicalize.ts';

/**
 * @public
 */
const refract = <T extends Element>(
  value: unknown,
  { specPath = ['visitors', 'document', 'objects', 'AgentCard', '$visitor'], plugins = [] } = {},
): T => {
  // Canonicalise snake_case keys → camelCase. Both entry points (a plain JS
  // value and the generic Element passed by the parser adapters) converge on
  // a generic Element after `baseRefract`, so canonicalising the element tree
  // here covers every path before the namespace visitors run.
  const element = baseRefract(value);
  canonicalizeKeys(element);
  const resolvedSpec = dereference(specification);

  /**
   * This is where generic ApiDOM becomes semantic (namespace applied).
   * We don't allow consumers to hook into this translation.
   * Though we allow consumers to define their own plugins on already transformed ApiDOM.
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

/**
 * @public
 */
export const createRefractor =
  (specPath: string[]) =>
  (value: unknown, options = {}) =>
    refract(value, { specPath, ...options });

export default refract;
