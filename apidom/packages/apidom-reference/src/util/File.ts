import stampit from 'stampit';
import { isString } from 'ramda-adjunct';

import { getExtension } from './url';

/**
 * This stamp represents a File object with url and data.
 */

interface File {
  url: string;
  data: unknown;
  readonly extension: string;
}

const File: stampit.Stamp<File> = stampit({
  props: {
    url: null,
    data: null,
  },
  init(this: File, { url = this.url, data = this.data } = {}) {
    this.url = url;
    this.data = data;
  },
  methods: {
    get extension(): string {
      if (isString(this.url)) {
        return getExtension(this.url);
      }
      return '';
    },
  },
});

export default File;
