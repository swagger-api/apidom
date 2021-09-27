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
  },
  init(this: IParser, { allowEmpty = this.allowEmpty, sourceMap = this.sourceMap } = {}) {
    this.allowEmpty = allowEmpty;
    this.sourceMap = sourceMap;
  },
  methods: {
    canParse(): boolean {
      throw new NotImplementedError();
    },
    async parse(): Promise<ParseResultElement> {
      throw new NotImplementedError();
    },
  },
});

export default Parser;
