import { pick } from 'ramda';
import { ParseResultElement } from '@swagger-api/apidom-core';
import {
  parse,
  mediaTypes as OpenAPIYAML2MediaTypes,
  detect,
} from '@swagger-api/apidom-parser-adapter-openapi-yaml-2';

import ParserError from '../../../errors/ParserError.ts';
import Parser, { ParserOptions } from '../Parser.ts';
import File from '../../../File.ts';

export type { default as Parser, ParserOptions } from '../Parser.ts';
export type { default as File, FileOptions } from '../../../File.ts';

/**
 * @public
 */
export interface OpenAPIYAML2ParserOptions extends Omit<ParserOptions, 'name'> {}

/**
 * @public
 */
class OpenAPIYAML2Parser extends Parser {
  public refractorOpts!: object;

  constructor(options?: OpenAPIYAML2ParserOptions) {
    const { fileExtensions = [], mediaTypes = OpenAPIYAML2MediaTypes, ...rest } = options ?? {};

    super({ ...rest, name: 'openapi-yaml-2', fileExtensions, mediaTypes });
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

export default OpenAPIYAML2Parser;
