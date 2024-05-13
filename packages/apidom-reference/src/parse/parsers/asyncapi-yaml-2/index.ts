import { pick } from 'ramda';
import { ParseResultElement } from '@swagger-api/apidom-core';
import {
  parse,
  mediaTypes as AsyncAPI2MediaTypes,
  detect,
} from '@swagger-api/apidom-parser-adapter-asyncapi-yaml-2';

import ParserError from '../../../errors/ParserError';
import Parser, { ParserOptions } from '../Parser';
import File from '../../../File';

export interface AsyncAPIYAML2ParserOptions extends Omit<ParserOptions, 'name'> {}

class AsyncAPIYAML2Parser extends Parser {
  public refractorOpts!: object;

  constructor(options?: AsyncAPIYAML2ParserOptions) {
    const {
      fileExtensions = ['.yaml', '.yml'],
      mediaTypes = AsyncAPI2MediaTypes,
      ...rest
    } = options ?? {};

    super({ ...rest, name: 'asyncapi-yaml-2', fileExtensions, mediaTypes });
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

export default AsyncAPIYAML2Parser;
