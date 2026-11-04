import { pick } from 'ramda';
import { ParseResultElement } from '@swagger-api/apidom-core';
import {
  parse,
  mediaTypes as JSONSchema2020_12MediaTypes,
  detect,
} from '@swagger-api/apidom-parser-adapter-json-schema-json-2020-12';

import ParserError from '../../../errors/ParserError.ts';
import Parser, { ParserOptions } from '../Parser.ts';
import File from '../../../File.ts';

export type { default as Parser, ParserOptions } from '../Parser.ts';
export type { default as File, FileOptions } from '../../../File.ts';

/**
 * @public
 */
/* eslint-disable @typescript-eslint/naming-convention */
export interface JSONSchemaJSON2020_12ParserOptions extends Omit<ParserOptions, 'name'> {
  /**
   * Whether to detect a JSON Schema 2020-12 document by its content when the file's media type
   * is not one of `mediaTypes`. Defaults to `true`.
   */
  readonly detectContent?: boolean;
}

/**
 * Parser for JSON Schema 2020-12 documents in JSON format.
 *
 * @public
 */
class JSONSchemaJSON2020_12Parser extends Parser {
  public syntacticAnalysis?: 'direct' | 'indirect';

  public refractorOpts!: object;

  /**
   * Whether to detect a JSON Schema 2020-12 document by its content when the file's media type
   * is not one of `mediaTypes`.
   */
  public detectContent: boolean;

  constructor(options?: JSONSchemaJSON2020_12ParserOptions) {
    const {
      fileExtensions = [],
      mediaTypes = JSONSchema2020_12MediaTypes,
      detectContent = true,
      ...rest
    } = options ?? {};

    super({ ...rest, name: 'json-schema-json-2020-12', fileExtensions, mediaTypes });
    this.detectContent = detectContent;
  }

  async canParse(file: File): Promise<boolean> {
    const hasSupportedFileExtension =
      this.fileExtensions.length === 0 ? true : this.fileExtensions.includes(file.extension);
    const hasSupportedMediaType = this.mediaTypes.includes(file.mediaType);

    if (!hasSupportedFileExtension) return false;
    if (hasSupportedMediaType) return true;
    if (!hasSupportedMediaType && this.detectContent) {
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
/* eslint-enable @typescript-eslint/naming-convention */

export default JSONSchemaJSON2020_12Parser;
