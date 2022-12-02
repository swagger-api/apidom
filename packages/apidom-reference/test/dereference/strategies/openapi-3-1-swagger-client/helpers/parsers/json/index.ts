import stampit from 'stampit';
import { ParseResultElement, from } from '@swagger-api/apidom-core';
import { mediaTypes } from '@swagger-api/apidom-parser-adapter-json';

import { Parser as IParser, File as IFile } from '../../../../../../../src/types';
import Parser from '../../../../../../../src/parse/parsers/Parser';
import { ParserError } from '../../../../../../../src';

const JsonParser: stampit.Stamp<IParser> = stampit(Parser, {
  props: {
    name: 'json-swagger-client',
    fileExtensions: ['.json'],
    mediaTypes,
  },
  methods: {
    async canParse(file: IFile): Promise<boolean> {
      const hasSupportedFileExtension =
        this.fileExtensions.length === 0 ? true : this.fileExtensions.includes(file.extension);
      const hasSupportedMediaType = this.mediaTypes.includes(file.mediaType);

      if (!hasSupportedFileExtension) return false;
      if (hasSupportedMediaType) return true;
      if (!hasSupportedMediaType) {
        try {
          JSON.parse(file.toString());
          return true;
        } catch {
          return false;
        }
      }
      return false;
    },
    async parse(file: IFile): Promise<ParseResultElement> {
      if (this.sourceMap) {
        // eslint-disable-next-line no-console
        console.warn("json-swagger-client parser plugin doesn't support sourceMaps option");
      }

      const source = file.toString();

      try {
        const element = from(JSON.parse(source));
        const parseResultElement = new ParseResultElement();

        element.classes.push('result');
        parseResultElement.push(element);
        return parseResultElement;
      } catch (error: any) {
        throw new ParserError(`Error parsing "${file.uri}"`, error);
      }
    },
  },
});

export default JsonParser;
