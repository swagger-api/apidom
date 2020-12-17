import stampit from 'stampit';
import { assocPath, always } from 'ramda';
import { ParseResultElement } from 'apidom';
// @ts-ignore
import { parse, specification } from 'apidom-parser-adapter-asyncapi-json-2-0';

import File from '../../util/File';
import { ParserError } from '../../util/errors';
import { documentVisitorFactory } from './visitors/DocumentVisitor';

interface AsyncApiJson2_0Parser {
  allowEmpty: boolean;
  sourceMap: boolean;
  specPath: string;

  canParse(file: File): boolean;
  parse(file: File): Promise<ParseResultElement>;
}

const AsyncApiJson2_0Parser: stampit.Stamp<AsyncApiJson2_0Parser> = stampit({
  props: {
    /**
     * Whether to allow "empty" files. This includes zero-byte files.
     */
    allowEmpty: true,

    /**
     * Whether to generate source map during parsing.
     */
    sourceMap: false,

    /**
     * Path of the Specification object where visitor is located.
     */
    specPath: always(['value']),
  },
  init(
    this: AsyncApiJson2_0Parser,
    { allowEmpty = this.allowEmpty, sourceMap = this.sourceMap, specPath = this.specPath } = {},
  ) {
    this.allowEmpty = allowEmpty;
    this.sourceMap = sourceMap;
    this.specPath = specPath;
  },
  methods: {
    canParse(file: File): boolean {
      return file.extension === '.json';
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
        throw new ParserError(`Error parsing "${file.uri}"`, e);
      }
    },
  },
});

export default AsyncApiJson2_0Parser;
