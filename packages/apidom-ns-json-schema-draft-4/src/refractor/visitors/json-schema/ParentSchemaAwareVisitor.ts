import stampit from 'stampit';

const ParentSchemaAwareVisitor = stampit({
  props: {
    parent: null,
  },
  // @ts-ignore
  init({ parent = this.parent }) {
    this.parent = parent;
    this.passingOptionsNames = [...this.passingOptionsNames, 'parent'];
  },
});

export default ParentSchemaAwareVisitor;
