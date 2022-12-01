import stampit from 'stampit';
// @ts-ignore
import jsYaml from 'js-yaml'; // js-yaml comes with swagger-client
import { ParseResultElement, from } from '@swagger-api/apidom-core';

import { ParserError } from '../../../../../../../src/util/errors';
import { File as IFile, Parser as IParser } from '../../../../../../../src/types';
import Parser from '../../../../../../../src/parse/parsers/Parser';

const YamlParser: stampit.Stamp<IParser> = stampit(Parser, {
  props: {
    name: 'yaml-1-2-swagger-client',
    fileExtensions: ['.yaml', '.yml'],
    mediaTypes: ['text/yaml', 'application/yaml'],
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
          jsYaml.load(file.toString());
        } catch {
          return false;
        }
      }
      return false;
    },
    async parse(file: IFile): Promise<ParseResultElement> {
      const source = file.toString();

      try {
        const element = from(jsYaml.load(source));
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

export default YamlParser;
