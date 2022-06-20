import stampit from 'stampit';
import { pick } from 'ramda';
import { ParseResultElement } from '@swagger-api/apidom-core';
import { parse, mediaTypes, detect } from '@swagger-api/apidom-parser-adapter-asyncapi-yaml-2';

import { ParserError } from '../../../util/errors';
import { File as IFile, Parser as IParser } from '../../../types';
import Parser from '../Parser';

const AsyncApiYaml2Parser: stampit.Stamp<IParser> = stampit(Parser, {
  props: {
    name: 'asyncapi-yaml-2',
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
        if (ArrayBuffer.isView(file.data)) {
          return detect(file.data.toString());
        }
        return detect(file.data);
      }
      return false;
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
