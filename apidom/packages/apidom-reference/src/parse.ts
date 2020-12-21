import { isEmpty } from 'ramda';
import { lengthEq } from 'ramda-adjunct';
import { ParseResultElement } from 'apidom';

import { mergeWithDefaults } from './options';
import * as url from './util/url';
import File from './util/File';
import * as plugins from './util/plugins';
import { ReferenceOptions as IReferenceOptions, File as IFile } from './types';
import { ParserError, ResolverError, UnmatchedResolverError } from './util/errors';

/**
 * Reads the given file, using the configured resolver plugins.
 */
const readFile = async (file: IFile, options: IReferenceOptions): Promise<Buffer> => {
  const resolvers = plugins.filter('canRead', file, options.resolve.resolvers);

  // we couldn't find any resolver for this File
  if (isEmpty(resolvers)) {
    throw new UnmatchedResolverError(file.uri);
  }

  try {
    const { result } = await plugins.run('read', file, resolvers);
    return result;
  } catch (error) {
    throw new ResolverError(`Error while reading file "${file.uri}"`, error);
  }
};

/**
 * Parses the given file's contents, using the configured parser plugins.
 */
const parseFile = async (file: IFile, options: IReferenceOptions): Promise<ParseResultElement> => {
  const parsers = plugins.filter('canParse', file, options.parse.parsers);

  // we couldn't find any parser for this File
  if (isEmpty(parsers)) {
    throw new UnmatchedResolverError(file.uri);
  }

  try {
    const { plugin, result } = await plugins.run('parse', file, parsers);

    // empty files handling
    if (!plugin.allowEmpty && (isEmpty(result) || lengthEq(0, result))) {
      return Promise.reject(
        new ParserError(`Error while parsing file "${file.uri}". File is empty.`),
      );
    }

    return result;
  } catch (error) {
    throw new ParserError(`Error while parsing file "${file.uri}"`, error);
  }
};

/**
 * Parses a file into ApiDOM.
 */
const parse = async (uri: string, options = {}): Promise<ParseResultElement> => {
  const mergedOpts = mergeWithDefaults(options);
  const uriWithoutHash = url.stripHash(uri);
  const file = File({ uri: uriWithoutHash, mediaType: mergedOpts.parse.mediaType });

  file.data = await readFile(file, mergedOpts);
  return parseFile(file, mergedOpts);
};

export default parse;
