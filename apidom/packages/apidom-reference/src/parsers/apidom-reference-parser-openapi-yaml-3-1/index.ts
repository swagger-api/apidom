import stampit from 'stampit';
import { assocPath, always } from 'ramda';
import { ParseResultElement } from 'apidom';

// @ts-ignore
import { parse, specification } from 'apidom-parser-adapter-openapi-yaml-3-1';

import File from '../../util/File';
import { ParserError } from '../../util/errors';
import { documentVisitorFactory } from './visitors/DocumentVisitor';

interface OpenApiYaml3_1Parser {
  allowEmpty: boolean;
  sourceMap: boolean;
  specPath: string;

  canParse(file: File): boolean;
  parse(file: File): Promise<ParseResultElement>;
}

const OpenApiYaml3_1Parser: stampit.Stamp<OpenApiYaml3_1Parser> = stampit({
  props: {
    /**
     * Whether to allow "empty" files. This includes zero-byte files.
     */
    allowEmpty: true,

    /**
     * Whether to generate source map during parsing.
     */
    sourceMap: true,

    /**
     * Path of the Specification object where visitor is located.
     */
    specPath: always(['kind']),
  },
  init(
    this: OpenApiYaml3_1Parser,
    { allowEmpty = this.allowEmpty, sourceMap = this.sourceMap, specPath = this.specPath } = {},
  ) {
    this.allowEmpty = allowEmpty;
    this.sourceMap = sourceMap;
    this.specPath = specPath;
  },
  methods: {
    canParse(file: File): boolean {
      return ['.yaml', '.yml'].includes(file.extension);
    },
    async parse(file: File): Promise<ParseResultElement> {
      const specObj = assocPath(
        ['visitors', 'document', '$visitor'],
        documentVisitorFactory(this.specPath),
        specification,
      );

      try {
        return await parse(file.data, { sourceMap: this.sourceMap, specObj });
      } catch (e) {
        throw new ParserError(`Error parsing "${file.url}"`, e);
      }
    },
  },
});

export default OpenApiYaml3_1Parser;
