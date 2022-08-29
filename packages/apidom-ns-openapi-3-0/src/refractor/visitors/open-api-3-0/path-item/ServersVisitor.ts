import stampit from 'stampit';

import PathItemServersElement from '../../../../elements/nces/PathItemServers';
import BaseServersVisitor from '../ServersVisitor';

const ServersVisitor = stampit(BaseServersVisitor, {
  init() {
    this.element = new PathItemServersElement();
  },
});

export default ServersVisitor;
