import { Element } from 'minim';
import { mergeDeepRight, propOr } from 'ramda';
import { invokeArgs } from 'ramda-adjunct';

import createToolbox from '../../toolbox';
import { getNodeType, mergeAllVisitors, visit } from '../../../traversal/visitor';

const defaultDispatchPluginsOptions = {
  toolboxCreator: createToolbox,
  visitorOptions: {
    nodeTypeGetter: getNodeType,
    exposeEdits: true,
  },
};

// eslint-disable-next-line import/prefer-default-export
export const dispatchPlugins = <T extends Element>(
  element: T,
  plugins: ((toolbox: any) => object)[],
  options = {},
): T => {
  if (plugins.length === 0) return element;

  const mergedOptions = mergeDeepRight(defaultDispatchPluginsOptions, options);
  const { toolboxCreator, visitorOptions } = mergedOptions;
  const toolbox = toolboxCreator();
  const pluginsSpecs = plugins.map((plugin) => plugin(toolbox));
  const mergedPluginsVisitor = mergeAllVisitors(pluginsSpecs.map(propOr({}, 'visitor')), {
    ...visitorOptions,
  });

  pluginsSpecs.forEach(invokeArgs(['pre'], []));
  const newElement = visit(element, mergedPluginsVisitor, visitorOptions as any);
  pluginsSpecs.forEach(invokeArgs(['post'], []));
  return newElement as T;
};
