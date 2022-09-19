import stampit from 'stampit';
import { ParseResultElement } from '@swagger-api/apidom-core';

import { Parser as IParser } from '../../types';
import { NotImplementedError } from '../../util/errors';

const Parser = stampit({
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
    /**
     * Transforms array buffers into strings.
     */
    decoder: new TextDecoder('utf-8'),
  },
  init(
    this: IParser,
    {
      allowEmpty = this.allowEmpty,
      sourceMap = this.sourceMap,
      fileExtensions = this.fileExtensions,
      mediaTypes = this.mediaTypes,
      decoder = this.decoder,
    } = {},
  ) {
    this.allowEmpty = allowEmpty;
    this.sourceMap = sourceMap;
    this.fileExtensions = fileExtensions;
    this.mediaTypes = mediaTypes;
    this.decoder = decoder;
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
