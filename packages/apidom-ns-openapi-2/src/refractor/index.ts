import { invokeArgs } from 'ramda-adjunct';
import {
  visit,
  Element,
  dereference,
  refract as baseRefract,
  dispatchRefractorPlugins,
} from '@swagger-api/apidom-core';

import specification from './specification';
import { keyMap, getNodeType } from '../traversal/visitor';
import createToolbox from './toolbox';

const refract = <T extends Element>(
  value: any,
  { specPath = ['visitors', 'document', 'objects', 'Swagger', '$visitor'], plugins = [] } = {},
): T => {
  const element = baseRefract(value);
  const resolvedSpec = dereference(specification);

  /**
   * This is where generic ApiDOM becomes semantic (namespace applied).
   * We don't allow consumers to hook into this translation.
   * Though we allow consumers to define their onw plugins on already transformed ApiDOM.
   */
  const rootVisitor = invokeArgs(specPath, [], resolvedSpec);
  // @ts-ignore
  visit(element, rootVisitor, { state: { specObj: resolvedSpec } });

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
  (value: any, options = {}) =>
    refract(value, { specPath, ...options });

export default refract;
