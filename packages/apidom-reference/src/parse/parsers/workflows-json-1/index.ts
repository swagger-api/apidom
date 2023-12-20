import stampit from 'stampit';
import { pick } from 'ramda';
import { ParseResultElement } from '@swagger-api/apidom-core';
import { parse, mediaTypes, detect } from '@swagger-api/apidom-parser-adapter-workflows-json-1';

import ParserError from '../../../errors/ParserError';
import { File as IFile, Parser as IParser } from '../../../types';
import Parser from '../Parser';

const WorkflowsJson1Parser: stampit.Stamp<IParser> = stampit(Parser, {
  props: {
    name: 'workflows-json-1',
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
        return detect(file.toString());
      }
      return false;
    },
    async parse(file: IFile): Promise<ParseResultElement> {
      const source = file.toString();

      try {
        const parserOpts = pick(['sourceMap', 'syntacticAnalysis', 'refractorOpts'], this);
        return await parse(source, parserOpts);
      } catch (error: any) {
        // eslint-disable-next-line @typescript-eslint/no-throw-literal
        throw new ParserError(`Error parsing "${file.uri}"`, { cause: error });
      }
    },
  },
});

export default WorkflowsJson1Parser;
