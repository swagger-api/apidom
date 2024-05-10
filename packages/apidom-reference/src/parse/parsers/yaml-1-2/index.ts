import stampit from 'stampit';
import { ParseResultElement } from '@swagger-api/apidom-core';
import { parse, mediaTypes, detect } from '@swagger-api/apidom-parser-adapter-yaml-1-2';

import ParserError from '../../../errors/ParserError';
import { Parser as IParser } from '../../../types';
import Parser from '../Parser';
import File from '../../../File';

const YamlParser: stampit.Stamp<IParser> = stampit(Parser, {
  props: {
    name: 'yaml-1-2',
    fileExtensions: ['.yaml', '.yml'],
    mediaTypes,
  },
  methods: {
    async canParse(file: File): Promise<boolean> {
      const hasSupportedFileExtension =
        this.fileExtensions.length === 0 ? true : this.fileExtensions.includes(file.extension);
      const hasSupportedMediaType = this.mediaTypes.includes(file.mediaType);

      if (!hasSupportedFileExtension) return false;
      if (hasSupportedMediaType) return true;
      if (!hasSupportedMediaType) {
        return detect(file.toString());
      }
      return false;
    },
    async parse(file: File): Promise<ParseResultElement> {
      const source = file.toString();

      try {
        return await parse(source, { sourceMap: this.sourceMap });
      } catch (error: any) {
        throw new ParserError(`Error parsing "${file.uri}"`, { cause: error });
      }
    },
  },
});

export default YamlParser;
