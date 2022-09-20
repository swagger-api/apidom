import { isEmpty } from 'ramda';
import { ParseResultElement } from '@swagger-api/apidom-core';

import * as url from '../util/url';
import File from '../util/File';
import * as plugins from '../util/plugins';
import { ReferenceOptions as IReferenceOptions, File as IFile, Parser as IParser } from '../types';
import { ParserError, UnmatchedResolverError } from '../util/errors';
import { readFile } from '../resolve/util';

/**
 * Parses the given file's contents, using the configured parser plugins.
 */
const parseFile = async (file: IFile, options: IReferenceOptions): Promise<ParseResultElement> => {
  const parsers: IParser[] = await plugins.filter('canParse', file, options.parse.parsers);

  // we couldn't find any parser for this File
  if (isEmpty(parsers)) {
    throw new UnmatchedResolverError(file.uri);
  }

  try {
    const optsBoundParsers = parsers.map((parser) => {
      const clonedParser = Object.create(parser);
      return Object.assign(clonedParser, options.parse.parserOpts);
    });
    const { plugin, result } = await plugins.run('parse', [file], optsBoundParsers);

    // empty files handling
    if (!plugin.allowEmpty && result.isEmpty) {
      return Promise.reject(
        new ParserError(`Error while parsing file "${file.uri}". File is empty.`),
      );
    }

    return result;
  } catch (error: any) {
    throw new ParserError(`Error while parsing file "${file.uri}"`, error);
  }
};

/**
 * Parses a file into ApiDOM.
 */
const parse = async (uri: string, options: IReferenceOptions): Promise<ParseResultElement> => {
  /**
   * If the path is a filesystem path, then convert it to a URL.
   *
   * NOTE: According to the JSON Reference spec, these should already be URLs,
   * but, in practice, many people use local filesystem paths instead.
   * So we're being generous here and doing the conversion automatically.
   * This is not intended to be a 100% bulletproof solution.
   * If it doesn't work for your use-case, then use a URL instead.
   */
  const file = File({ uri: url.sanitize(url.stripHash(uri)), mediaType: options.parse.mediaType });
  const data = await readFile(file, options);

  return parseFile(File({ ...file, data }), options);
};

export default parse;
