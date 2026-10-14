import { pick } from 'ramda';
import { ParseResultElement } from '@swagger-api/apidom-core';
import {
  parse,
  mediaTypes as A2A1YamlMediaTypes,
  detect,
} from '@swagger-api/apidom-parser-adapter-a2a-yaml-1';

import ParserError from '../../../errors/ParserError.ts';
import Parser, { ParserOptions } from '../Parser.ts';
import File from '../../../File.ts';

export type { default as Parser, ParserOptions } from '../Parser.ts';
export type { default as File, FileOptions } from '../../../File.ts';

/**
 * @public
 */
export interface A2AYAML1ParserOptions extends Omit<ParserOptions, 'name'> {}

/**
 * @public
 */
class A2AYAML1Parser extends Parser {
  public refractorOpts!: object;

  constructor(options?: A2AYAML1ParserOptions) {
    const { fileExtensions = [], mediaTypes = A2A1YamlMediaTypes, ...rest } = options ?? {};

    super({ ...rest, name: 'a2a-yaml-1', fileExtensions, mediaTypes });
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

export default A2AYAML1Parser;
