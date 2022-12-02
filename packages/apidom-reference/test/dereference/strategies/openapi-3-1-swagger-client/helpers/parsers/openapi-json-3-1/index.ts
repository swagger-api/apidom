import stampit from 'stampit';
import { ParseResultElement } from '@swagger-api/apidom-core';
import { OpenApi3_1Element } from '@swagger-api/apidom-ns-openapi-3-1';
import { mediaTypes, detectionRegExp } from '@swagger-api/apidom-parser-adapter-openapi-json-3-1';

import { ParserError } from '../../../../../../../src/util/errors';
import { File as IFile, Parser as IParser } from '../../../../../../../src/types';
import Parser from '../../../../../../../src/parse/parsers/Parser';

// eslint-disable-next-line @typescript-eslint/naming-convention
const OpenApiJson3_1Parser: stampit.Stamp<IParser> = stampit(Parser, {
  props: {
    name: 'openapi-json-3-1-swagger-client',
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
        try {
          const source = file.toString();
          JSON.parse(source);
          return detectionRegExp.test(source);
        } catch {
          return false;
        }
      }
      return false;
    },
    async parse(file: IFile): Promise<ParseResultElement> {
      if (this.sourceMap) {
        // eslint-disable-next-line no-console
        console.warn(
          "openapi-json-3-1-swagger-client parser plugin doesn't support sourceMaps option",
        );
      }

      const source = file.toString();

      try {
        const pojo = JSON.parse(source);
        const element = OpenApi3_1Element.refract(pojo, this.refractorOpts);
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

export default OpenApiJson3_1Parser;
