import stampit from 'stampit';

import OperationServersElement from '../../../../elements/nces/OperationServers';
import BaseServersVisitor from '../ServersVisitor';

const ServersVisitor = stampit(BaseServersVisitor, {
  init() {
    this.element = new OperationServersElement();
  },
});

export default ServersVisitor;
