import stampit from 'stampit';
import { isString } from 'ramda-adjunct';

import { getExtension } from './url';

/**
 * This stamp represents a File object with url and data.
 */

interface File {
  uri: string;
  data: unknown;
  readonly extension: string;
}

const File: stampit.Stamp<File> = stampit({
  props: {
    uri: null,
    data: null,
  },
  init(this: File, { uri = this.uri, data = this.data } = {}) {
    this.uri = uri;
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
