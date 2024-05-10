import stampit from 'stampit';
import { ParseResultElement, StringElement } from '@swagger-api/apidom-core';

import ParserError from '../../../errors/ParserError';
import { Parser as IParser } from '../../../types';
import Parser from '../Parser';
import File from '../../../File';

/**
 * Everything that is not recognized by other parsers will be considered by this parser
 * as a binary data and will be encoded to Base64 format.
 */

const BinaryParser: stampit.Stamp<IParser> = stampit(Parser, {
  props: {
    name: 'binary',
  },
  methods: {
    async canParse(file: File): Promise<boolean> {
      const hasSupportedFileExtension =
        this.fileExtensions.length === 0 ? true : this.fileExtensions.includes(file.extension);

      return hasSupportedFileExtension;
    },
    async parse(file: File): Promise<ParseResultElement> {
      try {
        /**
         * More information about binary strings and btoa function in following link:
         *   https://developer.mozilla.org/en-US/docs/Web/API/btoa
         *
         * @example
         * ArrayBuffer to base64 conversion:
         *
         * const binaryString = String.fromCharCode.apply(null, file.data);
         * base64String = btoa(binaryString);
         */
        const binaryString = unescape(encodeURIComponent(file.toString()));
        const base64String = btoa(binaryString);

        const parseResultElement = new ParseResultElement();

        if (base64String.length !== 0) {
          const base64StringElement = new StringElement(base64String);
          base64StringElement.classes.push('result');
          parseResultElement.push(base64StringElement);
        }

        return parseResultElement;
      } catch (error: any) {
        throw new ParserError(`Error parsing "${file.uri}"`, { cause: error });
      }
    },
  },
});

export default BinaryParser;
