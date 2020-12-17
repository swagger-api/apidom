import { invokeArgs } from 'ramda-adjunct';

import File from './File';
import { PluginError } from './errors';

/**
 * Filters the given plugins, returning only the ones return `true` for the given method.
 */
export const filter = (method: string, file: File, plugins: Array<any>): Array<any> => {
  // @ts-ignore
  return plugins.filter(invokeArgs([method], [file]));
};

/**
 * Runs the specified method of the given plugins, in order,
 * until one of them returns a successful result.
 * Each method can return a synchronous value or a Promise.
 * If the promise resolves successfully then the result
 * is immediately returned and no further plugins are called.
 * If the promise rejects then the next plugin is called.
 * If ALL plugins fail, then the last error is thrown.
 */
export const run = async (method: string, file: File, plugins: Array<any>): Promise<any> => {
  let lastError;

  for (const plugin of plugins) {
    try {
      // @ts-ignore
      const result = await plugin[method].call(plugin, file); // eslint-disable-line no-await-in-loop
      return { plugin, result };
    } catch (error) {
      lastError = new PluginError('Error while running plugin', error, plugin);
    }
  }

  return Promise.reject(lastError);
};
