import stampit from 'stampit';

import JsonComment from '../JsonComment';

interface JsonComments {
  comments: Array<JsonComment>;
}

const JsonComments: stampit.Stamp<JsonComments> = stampit({
  props: {
    comments: [],
  },
});

export default JsonComments;
