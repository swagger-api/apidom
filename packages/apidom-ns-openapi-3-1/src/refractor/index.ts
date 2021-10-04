import { propOr } from 'ramda';
import { invokeArgs } from 'ramda-adjunct';
import {
  visit,
  Element,
  dereference,
  mergeAllVisitors,
  refract as baseRefract,
} from '@swagger-api/apidom-core';

import specification from './specification';
import { keyMap, getNodeType } from '../traversal/visitor';
import createToolbox from './toolbox';

const refract = <T extends Element>(
  value: any,
  { specPath = ['visitors', 'document', 'objects', 'OpenApi', '$visitor'], plugins = [] } = {},
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
   * Run plugins only when necessary.
   * Running plugins visitors means extra single traversal === performance hit.
   */
  if (plugins.length > 0) {
    const toolbox = createToolbox();
    const pluginsSpecs = plugins.map((plugin: any) => plugin(toolbox));
    const pluginsVisitor = mergeAllVisitors(pluginsSpecs.map(propOr({}, 'visitor')), {
      // @ts-ignore
      nodeTypeGetter: getNodeType,
    });
    pluginsSpecs.forEach(invokeArgs(['pre'], []));
    const newElement: any = visit(rootVisitor.element, pluginsVisitor, {
      keyMap,
      // @ts-ignore
      nodeTypeGetter: getNodeType,
    });
    pluginsSpecs.forEach(invokeArgs(['post'], []));
    return newElement;
  }

  return rootVisitor.element;
};

export const createRefractor =
  (specPath: string[]) =>
  (value: any, options = {}) =>
    refract(value, { specPath, ...options });

export default refract;
