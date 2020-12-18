import stampit from 'stampit';
import { assocPath, always } from 'ramda';
import { ParseResultElement } from 'apidom';

// @ts-ignore
import { parse, specification } from 'apidom-parser-adapter-openapi-yaml-3-1';

import { ParserError } from '../../util/errors';
import { documentVisitorFactory } from './visitors/DocumentVisitor';
import { File as IFile, Parser as IParser } from '../../types';

const OpenApiYaml3_1Parser: stampit.Stamp<IParser> = stampit({
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
    specPath: always(['kind']),
  },
  init(
    this: IParser,
    { allowEmpty = this.allowEmpty, sourceMap = this.sourceMap, specPath = this.specPath } = {},
  ) {
    this.allowEmpty = allowEmpty;
    this.sourceMap = sourceMap;
    this.specPath = specPath;
  },
  methods: {
    canParse(file: IFile): boolean {
      return ['.yaml', '.yml'].includes(file.extension);
    },
    async parse(file: IFile): Promise<ParseResultElement> {
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

export default OpenApiYaml3_1Parser;
