import { Buffer } from '#buffer'; // eslint-disable-line import/order
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

      return hasSupportedFileExtension;
    },
    async parse(file: IFile): Promise<ParseResultElement> {
      let base64String: string;

      try {
        // @ts-ignore
        base64String = Buffer.from(file.data).toString('base64');
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
      } catch (error: any) {
        throw new ParserError(`Error parsing "${file.uri}"`, { cause: error });
      }
    },
  },
});

export default BinaryParser;
