import { Buffer } from 'node:buffer';
import stampit from 'stampit';
import { ParseResultElement, StringElement } from '@swagger-api/apidom-core';

import { ParserError } from '../../../util/errors';
import { Parser as IParser, File as IFile } from '../../../types';
import Parser from '../Parser';

/**
 * Everything that is not recognized by other parsers will be considered by this parser
 * as a binary data and will be encoded to Base64 format.
 */

const BinaryParser: stampit.Stamp<IParser> = stampit(Parser, {
  props: {
    name: 'binary',
  },
  methods: {
    async canParse(file: IFile): Promise<boolean> {
      const hasSupportedFileExtension =
        this.fileExtensions.length === 0 ? true : this.fileExtensions.includes(file.extension);

      if (!hasSupportedFileExtension) return false;
      return typeof file.data === 'string' || Buffer.isBuffer(file.data);
    },
    async parse(file: IFile): Promise<ParseResultElement> {
      try {
        // @ts-ignore
        const base64String = Buffer.from(file.data).toString('base64');
        const parseResultElement = new ParseResultElement();

        if (base64String.length !== 0) {
          const base64StringElement = new StringElement(base64String);
          base64StringElement.classes.push('result');
          parseResultElement.push(base64StringElement);
        }

        return parseResultElement;
      } catch (error: any) {
        throw new ParserError(`Error parsing "${file.uri}"`, error);
      }
    },
  },
});

export default BinaryParser;
