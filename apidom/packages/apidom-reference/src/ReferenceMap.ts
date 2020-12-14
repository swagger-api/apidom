import stampit from 'stampit';

interface ReferenceMap {
  root: null;
  refs: Array<any>;
  circular: boolean;
}

const ReferenceMap: stampit.Stamp<ReferenceMap> = stampit({
  props: {
    root: null,
    refs: {},
    circular: false,
  },
  init() {
    this.refs = {};
  },
});

export default ReferenceMap;
