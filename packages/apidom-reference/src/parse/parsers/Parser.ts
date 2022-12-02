import stampit from 'stampit';
import { ParseResultElement } from '@swagger-api/apidom-core';

import { Parser as IParser } from '../../types';
import { NotImplementedError } from '../../util/errors';

const Parser: stampit.Stamp<IParser> = stampit({
  props: {
    name: '',
    /**
     * Whether to allow "empty" files. This includes zero-byte files.
     */
    allowEmpty: true,

    /**
     * Whether to generate source map during parsing.
     */
    sourceMap: false,
    /**
     * List of supported file extensions.
     */
    fileExtensions: [],
    /**
     * List of supported media types.
     */
    mediaTypes: [],
  },
  init(
    this: IParser,
    {
      allowEmpty = this.allowEmpty,
      sourceMap = this.sourceMap,
      fileExtensions = this.fileExtensions,
      mediaTypes = this.mediaTypes,
    } = {},
  ) {
    this.allowEmpty = allowEmpty;
    this.sourceMap = sourceMap;
    this.fileExtensions = fileExtensions;
    this.mediaTypes = mediaTypes;
  },
  methods: {
    async canParse(): Promise<boolean> {
      throw new NotImplementedError();
    },
    async parse(): Promise<ParseResultElement> {
      throw new NotImplementedError();
    },
  },
});

export default Parser;
