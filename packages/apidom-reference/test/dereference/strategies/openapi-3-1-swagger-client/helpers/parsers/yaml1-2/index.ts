import stampit from 'stampit';
// @ts-ignore
import YAML, { JSON_SCHEMA } from 'js-yaml'; // js-yaml comes with swagger-client
import { ParseResultElement, from } from '@swagger-api/apidom-core';
import { mediaTypes } from '@swagger-api/apidom-parser-adapter-yaml-1-2';

import { ParserError } from '../../../../../../../src/util/errors';
import { File as IFile, Parser as IParser } from '../../../../../../../src/types';
import Parser from '../../../../../../../src/parse/parsers/Parser';

const YamlParser: stampit.Stamp<IParser> = stampit(Parser, {
  props: {
    name: 'yaml-1-2-swagger-client',
    fileExtensions: ['.yaml', '.yml'],
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
          YAML.load(file.toString(), { schema: JSON_SCHEMA });
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
        console.warn("yaml-1-2-swagger-client parser plugin doesn't support sourceMaps option");
      }

      const source = file.toString();

      try {
        const element = from(YAML.load(source, { schema: JSON_SCHEMA }));
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
