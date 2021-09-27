import { Element } from 'minim';
import { propOr } from 'ramda';
import { invokeArgs } from 'ramda-adjunct';

import { visit, mergeAllVisitors, getNodeType } from '../traversal/visitor';
import createToolbox from './toolbox';

type RefractOptions = {
  Type: new (value: any) => any;
  plugins?: any[];
};

const refract = (value: any, { Type, plugins = [] }: RefractOptions): Element => {
  /**
   * This is where values gets refracted into generic ApiDOM.
   * We don't allow consumers to hook into this translation.
   * Though we allow consumers to define their onw plugins on already transformed ApiDOM.
   */
  const element = new Type(value);

  /**
   * Run plugins only when necessary.
   * Running plugins visitors means extra single traversal === peformance hit.
   */
  if (plugins.length > 0) {
    const toolbox = createToolbox();
    const pluginsSpecs = plugins.map((plugin: any) => plugin(toolbox));
    const pluginsVisitor = mergeAllVisitors(pluginsSpecs.map(propOr({}, 'visitor')), {
      // @ts-ignore
      nodeTypeGetter: getNodeType,
    });
    pluginsSpecs.forEach(invokeArgs(['pre'], []));
    const newElement = visit(element, pluginsVisitor);
    pluginsSpecs.forEach(invokeArgs(['post'], []));
    return newElement;
  }

  return element;
};

export const createRefractor =
  (Type: any) =>
  (value: any, options = {}) =>
    refract(value, { ...options, Type });

export default refract;
