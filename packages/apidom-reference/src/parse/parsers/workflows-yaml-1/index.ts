import stampit from 'stampit';
import { pick } from 'ramda';
import { ParseResultElement } from '@swagger-api/apidom-core';
import { parse, mediaTypes, detect } from '@swagger-api/apidom-parser-adapter-workflows-yaml-1';

import ParserError from '../../../errors/ParserError';
import { File as IFile, Parser as IParser } from '../../../types';
import Parser from '../Parser';

const WorkflowsYaml1Parser: stampit.Stamp<IParser> = stampit(Parser, {
  props: {
    name: 'workflows-yaml-1',
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
        return detect(file.toString());
      }
      return false;
    },
    async parse(file: IFile): Promise<ParseResultElement> {
      const source = file.toString();

      try {
        const parserOpts = pick(['sourceMap', 'refractorOpts'], this);
        return await parse(source, parserOpts);
      } catch (error: any) {
        // eslint-disable-next-line @typescript-eslint/no-throw-literal
        throw new ParserError(`Error parsing "${file.uri}"`, { cause: error });
      }
    },
  },
});

export default WorkflowsYaml1Parser;
