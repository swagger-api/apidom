import { Buffer } from '#buffer'; // eslint-disable-line import/order
import { ParseResultElement, StringElement } from '@swagger-api/apidom-core';

import ParserError from '../../../errors/ParserError';
import Parser, { ParserOptions } from '../Parser';
import File from '../../../File';

/**
 * Everything that is not recognized by other parsers will be considered by this parser
 * as a binary data and will be encoded to Base64 format.
 */

export interface BinaryParserOptions extends Omit<ParserOptions, 'name'> {}

class BinaryParser extends Parser {
  constructor(options?: BinaryParserOptions) {
    super({ ...(options ?? {}), name: 'binary' });
  }

  canParse(file: File): boolean {
    return this.fileExtensions.length === 0 ? true : this.fileExtensions.includes(file.extension);
  }

  // eslint-disable-next-line class-methods-use-this
  parse(file: File): ParseResultElement {
    let base64String: string;

    try {
      type BufferData = Parameters<typeof Buffer.from>[0];
      base64String = Buffer.from(file.data as BufferData).toString('base64');
    } catch {
      base64String = Buffer.from(file.toString()).toString('base64');
    }

    try {
      const parseResultElement = new ParseResultElement();

      if (base64String.length !== 0) {
        const base64StringElement = new StringElement(base64String);
        base64StringElement.classes.push('result');
        parseResultElement.push(base64StringElement);
      }

      return parseResultElement;
    } catch (error: unknown) {
      throw new ParserError(`Error parsing "${file.uri}"`, { cause: error });
    }
  }
}

export default BinaryParser;
