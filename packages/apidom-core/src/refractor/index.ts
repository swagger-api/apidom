import { Element } from 'minim';

import { dispatchPlugins } from './plugins/utils';
import { getNodeType } from '../traversal/visitor';
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
   * Running plugins visitors means extra single traversal === performance hit.
   */
  return dispatchPlugins(element, plugins, {
    toolboxCreator: createToolbox,
    visitorOptions: { nodeTypeGetter: getNodeType },
  });
};

export const createRefractor =
  (Type: any) =>
  (value: any, options = {}) =>
    refract(value, { ...options, Type });

export default refract;
