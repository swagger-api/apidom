import stampit from 'stampit';
import { type } from 'ramda';
import { isString } from 'ramda-adjunct';

import * as url from './url';
import { File as IFile } from '../types';

/**
 * This stamp represents a File object with url and data.
 */

const File: stampit.Stamp<IFile> = stampit({
  props: {
    uri: null,
    mediaType: 'text/plain',
    data: null,
    parseResult: null,
  },
  init(
    this: IFile,
    {
      uri = this.uri,
      mediaType = this.mediaType,
      data = this.data,
      parseResult = this.parseResult,
    } = {},
  ) {
    this.uri = uri;
    this.mediaType = mediaType;
    this.data = data;
    this.parseResult = parseResult;
  },
  methods: {
    get extension(): string {
      if (isString(this.uri)) {
        return url.getExtension(this.uri);
      }
      return '';
    },

    toString(): string {
      if (typeof this.data === 'string') {
        return this.data;
      }

      if (
        this.data instanceof ArrayBuffer ||
        ['ArrayBuffer'].includes(type(this.data)) ||
        ArrayBuffer.isView(this.data)
      ) {
        const textDecoder = new TextDecoder('utf-8');
        return textDecoder.decode(this.data as Buffer | DataView | ArrayBuffer);
      }

      return String(this.data);
    },
  },
});

export default File;
