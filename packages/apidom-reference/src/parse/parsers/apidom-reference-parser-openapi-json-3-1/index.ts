import stampit from 'stampit';
import { pick } from 'ramda';
import { ParseResultElement } from '@swagger-api/apidom-core';
import { parse, mediaTypes } from '@swagger-api/apidom-parser-adapter-openapi-json-3-1';

import { ParserError } from '../../../util/errors';
import { File as IFile, Parser as IParser } from '../../../types';
import Parser from '../Parser';

// eslint-disable-next-line @typescript-eslint/naming-convention
const OpenApiJson3_1Parser: stampit.Stamp<IParser> = stampit(Parser, {
  props: {
    name: 'openapi-json-3-1',
    fileExtensions: ['.json'],
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
        const parserOpts = pick(['sourceMap', 'syntacticAnalysis', 'refractorOpts'], this);
        return await parse(source, parserOpts);
      } catch (error: any) {
        throw new ParserError(`Error parsing "${file.uri}"`, error);
      }
    },
  },
});

export default OpenApiJson3_1Parser;
