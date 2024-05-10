import { type } from 'ramda';
import { isString } from 'ramda-adjunct';
import { ParseResultElement } from '@swagger-api/apidom-core';

import * as url from './util/url';

/**
 * This class represents a File object with url and data.
 */

export interface FileOptions {
  readonly uri: string;
  readonly mediaType?: string;
  readonly data?: Buffer | DataView | ArrayBuffer | string;
  readonly parseResult?: ParseResultElement;
}

class File {
  public uri: string;

  public mediaType: string;

  public data?: Buffer | DataView | ArrayBuffer | string;

  public parseResult?: ParseResultElement;

  constructor({ uri, mediaType = 'text/plain', data, parseResult }: FileOptions) {
    this.uri = uri;
    this.mediaType = mediaType;
    this.data = data;
    this.parseResult = parseResult;
  }

  get extension(): string {
    if (isString(this.uri)) {
      return url.getExtension(this.uri);
    }
    return '';
  }

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
  }
}

export default File;
