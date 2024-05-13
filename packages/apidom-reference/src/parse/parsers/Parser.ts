import { ParseResultElement } from '@swagger-api/apidom-core';

import File from '../../File';

export interface ParserOptions {
  readonly name: string;
  readonly allowEmpty?: boolean;
  readonly sourceMap?: boolean;
  readonly fileExtensions?: string[];
  readonly mediaTypes?: string[];
}

abstract class Parser {
  public readonly name: string;

  /**
   * Whether to allow "empty" files. This includes zero-byte files.
   */
  public allowEmpty: boolean;

  /**
   * Whether to generate source map during parsing.
   */
  public sourceMap: boolean;

  /**
   * List of supported file extensions.
   */
  public fileExtensions: string[];

  /**
   * List of supported media types.
   */
  public mediaTypes: string[];

  constructor({
    name,
    allowEmpty = true,
    sourceMap = false,
    fileExtensions = [],
    mediaTypes = [],
  }: ParserOptions) {
    this.name = name;
    this.allowEmpty = allowEmpty;
    this.sourceMap = sourceMap;
    this.fileExtensions = fileExtensions;
    this.mediaTypes = mediaTypes;
  }

  abstract canParse(file: File): boolean | Promise<boolean>;
  abstract parse(file: File): ParseResultElement | Promise<ParseResultElement>;
}

export default Parser;
