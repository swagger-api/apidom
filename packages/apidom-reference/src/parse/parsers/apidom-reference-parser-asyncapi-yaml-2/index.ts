import stampit from 'stampit';
import { pick } from 'ramda';
import { ParseResultElement } from '@swagger-api/apidom-core';
import { parse, mediaTypes } from '@swagger-api/apidom-parser-adapter-asyncapi-yaml-2';

import { ParserError } from '../../../util/errors';
import { File as IFile, Parser as IParser } from '../../../types';
import Parser from '../Parser';

const AsyncApiYaml2Parser: stampit.Stamp<IParser> = stampit(Parser, {
  props: {
    name: 'asyncapi-yaml-2',
  },
  methods: {
    canParse(file: IFile): boolean {
      return mediaTypes.includes(file.mediaType) && ['.yaml', '.yml'].includes(file.extension);
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

export default AsyncApiYaml2Parser;
