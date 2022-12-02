import stampit from 'stampit';
// @ts-ignore
import YAML from 'js-yaml'; // js-yaml comes with swagger-client
import { ParseResultElement } from '@swagger-api/apidom-core';
import { OpenApi3_1Element } from '@swagger-api/apidom-ns-openapi-3-1';
import { mediaTypes, detectionRegExp } from '@swagger-api/apidom-parser-adapter-openapi-yaml-3-1';

import { ParserError } from '../../../../../../../src/util/errors';
import { File as IFile, Parser as IParser } from '../../../../../../../src/types';
import Parser from '../../../../../../../src/parse/parsers/Parser';

// eslint-disable-next-line @typescript-eslint/naming-convention
const OpenApiYaml3_1Parser: stampit.Stamp<IParser> = stampit(Parser, {
  props: {
    name: 'openapi-yaml-3-1-swagger-client',
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
          const source = file.toString();
          YAML.load(source);
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
          "openapi-yaml-3-1-swagger-client parser plugin doesn't support sourceMaps option",
        );
      }

      const source = file.toString();

      try {
        const pojo = YAML.load(source);
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

export default OpenApiYaml3_1Parser;
