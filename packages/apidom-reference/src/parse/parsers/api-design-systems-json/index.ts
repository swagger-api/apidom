import { pick } from 'ramda';
import { ParseResultElement } from '@swagger-api/apidom-core';
import {
  parse,
  mediaTypes as ADSMediaTypes,
  detect,
} from '@swagger-api/apidom-parser-adapter-api-design-systems-json';

import ParserError from '../../../errors/ParserError';
import Parser, { ParserOptions } from '../Parser';
import File from '../../../File';

export interface APIDesignSystemsJSONParserOptions extends Omit<ParserOptions, 'name'> {}

class APIDesignSystemsJSONParser extends Parser {
  public syntacticAnalysis?: 'direct' | 'indirect';

  public refractorOpts!: object;

  constructor(options?: APIDesignSystemsJSONParserOptions) {
    const { fileExtensions = ['.json'], mediaTypes = ADSMediaTypes, ...rest } = options ?? {};

    super({ ...rest, name: 'api-design-systems-json', fileExtensions, mediaTypes });
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

export default APIDesignSystemsJSONParser;
