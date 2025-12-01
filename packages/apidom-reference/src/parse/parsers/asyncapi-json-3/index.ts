import { pick } from 'ramda';
import { ParseResultElement } from '@swagger-api/apidom-core';
import {
  parse,
  mediaTypes as AsyncAPI3MediaTypes,
  detect,
} from '@swagger-api/apidom-parser-adapter-asyncapi-json-3';

import ParserError from '../../../errors/ParserError.ts';
import Parser, { ParserOptions } from '../Parser.ts';
import File from '../../../File.ts';

export type { default as Parser, ParserOptions } from '../Parser.ts';
export type { default as File, FileOptions } from '../../../File.ts';

/**
 * @public
 */
export interface AsyncAPIJSON3ParserOptions extends Omit<ParserOptions, 'name'> {}

/**
 * @public
 */
class AsyncAPIJSON3Parser extends Parser {
  public syntacticAnalysis?: 'direct' | 'indirect';

  public refractorOpts!: object;

  constructor(options?: AsyncAPIJSON3ParserOptions) {
    const { fileExtensions = [], mediaTypes = AsyncAPI3MediaTypes, ...rest } = options ?? {};

    super({ ...rest, name: 'asyncapi-json-3', fileExtensions, mediaTypes });
  }

  async canParse(file: File): Promise<boolean> {
    const hasSupportedFileExtension =
      this.fileExtensions.length === 0 ? true : this.fileExtensions.includes(file.extension);
    const hasSupportedMediaType = this.mediaTypes.includes(file.mediaType);

    if (!hasSupportedFileExtension) return false;
    if (hasSupportedMediaType) return true;
    if (!hasSupportedMediaType) {
      return detect(file.toString());
    }
    return false;
  }

  async parse(file: File): Promise<ParseResultElement> {
    const source = file.toString();

    try {
      const parserOpts = pick(['sourceMap', 'syntacticAnalysis', 'refractorOpts'], this);
      return await parse(source, parserOpts);
    } catch (error: unknown) {
      throw new ParserError(`Error parsing "${file.uri}"`, { cause: error });
    }
  }
}

export default AsyncAPIJSON3Parser;
