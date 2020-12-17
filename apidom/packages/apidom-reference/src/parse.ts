import { mergeWithDefaults } from './options';
import * as url from './util/url';
import File from './util/File';

/**
 * Parses a file into ApiDOM.
 */
type Parse = (uri: string, options: Record<string, any>) => Promise<any>;
const parse: Parse = async (uri, options = {}) => {
  const mergedOpts = mergeWithDefaults(options);
  const uriWithoutHash = url.stripHash(uri);
  const file = File({ uri: uriWithoutHash });

  return Promise.resolve({ file, mergedOpts });
};

export default parse;
