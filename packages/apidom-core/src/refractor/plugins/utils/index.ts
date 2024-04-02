import { Element } from 'minim';
import { mergeDeepRight, propOr } from 'ramda';
import { invokeArgs } from 'ramda-adjunct';

import createToolbox from '../../toolbox';
import { getNodeType, mergeAllVisitors, visit } from '../../../traversal/visitor';

export interface DispatchPluginsOptions {
  toolboxCreator: typeof createToolbox;
  visitorOptions: {
    nodeTypeGetter: typeof getNodeType;
    exposeEdits: boolean;
  };
}

export interface DispatchPluginsSync {
  <T extends Element>(
    element: T,
    plugins: ((toolbox: any) => object)[],
    options?: Record<string, unknown>,
  ): Element;
  [key: symbol]: DispatchPluginsAsync;
}

export interface DispatchPluginsAsync {
  <T extends Element>(
    element: T,
    plugins: ((toolbox: any) => object)[],
    options?: Record<string, unknown>,
  ): Promise<Element>;
}

const defaultDispatchPluginsOptions: DispatchPluginsOptions = {
  toolboxCreator: createToolbox,
  visitorOptions: {
    nodeTypeGetter: getNodeType,
    exposeEdits: true,
  },
};

export const dispatchPluginsSync: DispatchPluginsSync = ((element, plugins, options = {}) => {
  if (plugins.length === 0) return element;

  const mergedOptions = mergeDeepRight(
    defaultDispatchPluginsOptions,
    options,
  ) as DispatchPluginsOptions;
  const { toolboxCreator, visitorOptions } = mergedOptions;
  const toolbox = toolboxCreator();
  const pluginsSpecs = plugins.map((plugin) => plugin(toolbox));
  const mergedPluginsVisitor = mergeAllVisitors(pluginsSpecs.map(propOr({}, 'visitor')), {
    ...visitorOptions,
  });

  pluginsSpecs.forEach(invokeArgs(['pre'], []));
  const newElement = visit(element, mergedPluginsVisitor, visitorOptions as any);
  pluginsSpecs.forEach(invokeArgs(['post'], []));
  return newElement;
}) as DispatchPluginsSync;

export const dispatchPluginsAsync: DispatchPluginsAsync = async (
  element,
  plugins,
  options = {},
) => {
  if (plugins.length === 0) return element;

  const mergedOptions = mergeDeepRight(
    defaultDispatchPluginsOptions,
    options,
  ) as DispatchPluginsOptions;
  const { toolboxCreator, visitorOptions } = mergedOptions;
  const toolbox = toolboxCreator();
  const pluginsSpecs = plugins.map((plugin) => plugin(toolbox));
  const mergeAllVisitorsAsync = mergeAllVisitors[Symbol.for('nodejs.util.promisify.custom')];
  // @ts-ignore
  const visitAsync = visit[Symbol.for('nodejs.util.promisify.custom')];
  const mergedPluginsVisitor = mergeAllVisitorsAsync(pluginsSpecs.map(propOr({}, 'visitor')), {
    ...visitorOptions,
  });

  await Promise.allSettled(pluginsSpecs.map(invokeArgs(['pre'], [])));
  const newElement = await visitAsync(element, mergedPluginsVisitor, visitorOptions as any);
  await Promise.allSettled(pluginsSpecs.map(invokeArgs(['post'], [])));
  return newElement;
};

dispatchPluginsSync[Symbol.for('nodejs.util.promisify.custom')] = dispatchPluginsAsync;
