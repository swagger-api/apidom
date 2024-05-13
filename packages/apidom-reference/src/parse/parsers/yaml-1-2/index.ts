import { ParseResultElement } from '@swagger-api/apidom-core';
import {
  parse,
  mediaTypes as YAMLMediaTypes,
  detect,
} from '@swagger-api/apidom-parser-adapter-yaml-1-2';

import ParserError from '../../../errors/ParserError';
import Parser, { ParserOptions } from '../Parser';
import File from '../../../File';

export interface YAMLParserOptions extends Omit<ParserOptions, 'name'> {}

class WorkflowsYAML1Parser extends Parser {
  public refractorOpts!: object;

  constructor(options?: YAMLParserOptions) {
    const {
      fileExtensions = ['.yaml', '.yml'],
      mediaTypes = YAMLMediaTypes,
      ...rest
    } = options ?? {};

    super({ ...rest, name: 'yaml-1-2', fileExtensions, mediaTypes });
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
      return await parse(source, { sourceMap: this.sourceMap });
    } catch (error: unknown) {
      throw new ParserError(`Error parsing "${file.uri}"`, { cause: error });
    }
  }
}

export default WorkflowsYAML1Parser;
