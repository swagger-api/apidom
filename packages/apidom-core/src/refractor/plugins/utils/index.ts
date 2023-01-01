import { Element } from 'minim';
import { propOr } from 'ramda';
import { invokeArgs } from 'ramda-adjunct';

import createToolbox from '../../toolbox';
import { getNodeType, mergeAllVisitors, visit } from '../../../traversal/visitor';

// eslint-disable-next-line import/prefer-default-export
export const dispatchPlugins = <T extends Element>(element: T, plugins: any[], options = {}): T => {
  if (plugins.length === 0) return element;

  const toolboxCreator = propOr(createToolbox, 'toolboxCreator', options) as typeof createToolbox;
  const visitorOptions = propOr({}, 'visitorOptions', options);
  const nodeTypeGetter = propOr(
    getNodeType,
    'nodeTypeGetter',
    visitorOptions,
  ) as typeof getNodeType;
  const toolbox = toolboxCreator();
  const pluginsSpecs = plugins.map((plugin: any) => plugin(toolbox));
  const pluginsVisitor = mergeAllVisitors(pluginsSpecs.map(propOr({}, 'visitor')), {
    nodeTypeGetter,
  });

  pluginsSpecs.forEach(invokeArgs(['pre'], []));
  const newElement = visit(element, pluginsVisitor, visitorOptions as any);
  pluginsSpecs.forEach(invokeArgs(['post'], []));
  return newElement as T;
};
