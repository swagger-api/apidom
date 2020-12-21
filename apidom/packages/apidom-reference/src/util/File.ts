import stampit from 'stampit';
import { isString } from 'ramda-adjunct';

import { getExtension } from './url';
import { File as IFile } from '../types';

/**
 * This stamp represents a File object with url and data.
 */

const File: stampit.Stamp<IFile> = stampit({
  props: {
    uri: null,
    mediaType: 'text/plain',
    data: null,
  },
  init(this: IFile, { uri = this.uri, mediaType = this.mediaType, data = this.data } = {}) {
    this.uri = uri;
    this.mediaType = mediaType;
    this.data = data;
  },
  methods: {
    get extension(): string {
      if (isString(this.uri)) {
        return getExtension(this.uri);
      }
      return '';
    },
  },
});

export default File;
