import stampit from 'stampit';
import { pick } from 'ramda';
import { ParseResultElement } from '@swagger-api/apidom-core';
import { parse, mediaTypes } from '@swagger-api/apidom-parser-adapter-api-design-systems-yaml';

import { ParserError } from '../../../util/errors';
import { File as IFile, Parser as IParser } from '../../../types';
import Parser from '../Parser';

const ApiDesignSystemsYamlParser: stampit.Stamp<IParser> = stampit(Parser, {
  props: {
    name: 'api-design-systems-yaml',
    fileExtensions: ['.yaml', '.yml'],
    mediaTypes,
  },
  methods: {
    canParse(file: IFile): boolean {
      return (
        this.mediaTypes.includes(file.mediaType) && this.fileExtensions.includes(file.extension)
      );
    },
    async parse(file: IFile): Promise<ParseResultElement> {
      const source = ArrayBuffer.isView(file.data) ? file.data.toString() : file.data;

      try {
        const parserOpts = pick(['sourceMap', 'refractorOpts'], this);
        return await parse(source, parserOpts);
      } catch (error: any) {
        throw new ParserError(`Error parsing "${file.uri}"`, error);
      }
    },
  },
});

export default ApiDesignSystemsYamlParser;
