import { pick } from 'ramda';
import { ParseResultElement } from '@swagger-api/apidom-core';
import {
  parse,
  mediaTypes as ArazzoYAML1MediaTypes,
  detect,
} from '@swagger-api/apidom-parser-adapter-arazzo-yaml-1';

import ParserError from '../../../errors/ParserError.ts';
import Parser, { ParserOptions } from '../Parser.ts';
import File from '../../../File.ts';

export type { default as Parser, ParserOptions } from '../Parser.ts';
export type { default as File, FileOptions } from '../../../File.ts';

/**
 * @public
 */
export interface ArazzoYAML1ParserOptions extends Omit<ParserOptions, 'name'> {}

/**
 * @public
 */
class ArazzoYAML1Parser extends Parser {
  public refractorOpts!: object;

  constructor(options?: ArazzoYAML1ParserOptions) {
    const { fileExtensions = [], mediaTypes = ArazzoYAML1MediaTypes, ...rest } = options ?? {};

    super({ ...rest, name: 'arazzo-yaml-1', fileExtensions, mediaTypes });
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
      const parserOpts = pick(['sourceMap', 'refractorOpts'], this);
      return await parse(source, parserOpts);
    } catch (error: unknown) {
      throw new ParserError(`Error parsing "${file.uri}"`, { cause: error });
    }
  }
}

export default ArazzoYAML1Parser;
