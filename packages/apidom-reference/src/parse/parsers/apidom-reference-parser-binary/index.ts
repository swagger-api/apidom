import stampit from 'stampit';
import { isString } from 'ramda-adjunct';
import { ParseResultElement, StringElement } from 'apidom';

import { ParserError } from '../../../util/errors';
import { Parser as IParser, File as IFile } from '../../../types';
import Parser from '../Parser';

/**
 * Everything that is not recognized by other parsers will be considered by this parser
 * as a binary data and t
 */

const BinaryParser: stampit.Stamp<IParser> = stampit(Parser, {
  props: {
    name: 'binary',
  },
  methods: {
    canParse(file: IFile): boolean {
      return isString(file.data) || Buffer.isBuffer(file.data);
    },
    async parse(file: IFile): Promise<ParseResultElement> {
      try {
        const base64String = Buffer.isBuffer(file.data)
          ? file.data.toString('base64')
          : Buffer.from(file.data).toString('base64');
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
