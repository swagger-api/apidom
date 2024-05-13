import { pick } from 'ramda';
import { ParseResultElement } from '@swagger-api/apidom-core';
import {
  parse,
  mediaTypes as OpenAPI2MediaTypes,
  detect,
} from '@swagger-api/apidom-parser-adapter-openapi-json-2';

import ParserError from '../../../errors/ParserError';
import Parser, { ParserOptions } from '../Parser';
import File from '../../../File';

export interface OpenAPIJSON2ParserOptions extends Omit<ParserOptions, 'name'> {}

class OpenAPIJSON2Parser extends Parser {
  public syntacticAnalysis?: 'direct' | 'indirect';

  public refractorOpts!: object;

  constructor(options?: OpenAPIJSON2ParserOptions) {
    const { fileExtensions = ['.json'], mediaTypes = OpenAPI2MediaTypes, ...rest } = options ?? {};

    super({ ...rest, name: 'openapi-json-2', fileExtensions, mediaTypes });
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

export default OpenAPIJSON2Parser;
