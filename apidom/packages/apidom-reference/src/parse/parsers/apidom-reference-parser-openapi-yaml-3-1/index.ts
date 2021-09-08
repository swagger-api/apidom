import stampit from 'stampit';
import { pick } from 'ramda';
import { ParseResultElement } from 'apidom';
import { parse, mediaTypes } from 'apidom-parser-adapter-openapi-yaml-3-1';

import { ParserError } from '../../../util/errors';
import { File as IFile, Parser as IParser } from '../../../types';
import Parser from '../Parser';

// eslint-disable-next-line @typescript-eslint/naming-convention
const OpenApiYaml3_1Parser: stampit.Stamp<IParser> = stampit(Parser, {
  props: {
    name: 'openapi-yaml-3-1',
  },
  methods: {
    canParse(file: IFile): boolean {
      return mediaTypes.includes(file.mediaType) && ['.yaml', '.yml'].includes(file.extension);
    },
    async parse(file: IFile): Promise<ParseResultElement> {
      const source = Buffer.isBuffer(file.data) ? file.data.toString() : file.data;

      try {
        const parserOpts = pick(['sourceMap', 'refractorOpts'], this);
        return await parse(source, parserOpts);
      } catch (error: any) {
        throw new ParserError(`Error parsing "${file.uri}"`, error);
      }
    },
  },
});

export default OpenApiYaml3_1Parser;
