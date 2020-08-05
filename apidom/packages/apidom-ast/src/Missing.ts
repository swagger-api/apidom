import stampit from 'stampit';

interface Missing {
  type: 'missing';
  value: unknown;
}

const Missing: stampit.Stamp<Missing> = stampit({
  props: {
    type: 'missing',
    value: null,
  },
  init({ value = null, position = null } = {}) {
    this.value = value;
    this.position = position;
  },
});

export default Missing;
