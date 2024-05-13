import { pick } from 'ramda';
import { ParseResultElement } from '@swagger-api/apidom-core';
import {
  parse,
  mediaTypes as Workflows1MediaTypes,
  detect,
} from '@swagger-api/apidom-parser-adapter-workflows-json-1';

import ParserError from '../../../errors/ParserError';
import Parser, { ParserOptions } from '../Parser';
import File from '../../../File';

export interface WorkflowsJSON1ParserOptions extends Omit<ParserOptions, 'name'> {}

class WorkflowsJSON1Parser extends Parser {
  public syntacticAnalysis?: 'direct' | 'indirect';

  public refractorOpts!: object;

  constructor(options?: WorkflowsJSON1ParserOptions) {
    const {
      fileExtensions = ['.json'],
      mediaTypes = Workflows1MediaTypes,
      ...rest
    } = options ?? {};

    super({ ...rest, name: 'workflows-json-1', fileExtensions, mediaTypes });
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

export default WorkflowsJSON1Parser;
