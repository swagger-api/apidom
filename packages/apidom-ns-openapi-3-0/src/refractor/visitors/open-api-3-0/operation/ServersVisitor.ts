import OperationServersElement from '../../../../elements/nces/OperationServers';
import BaseServersVisitor, { ServersVisitorOptions } from '../ServersVisitor';

class ServersVisitor extends BaseServersVisitor {
  public declare readonly element: OperationServersElement;

  constructor(options: ServersVisitorOptions) {
    super(options);
    this.element = new OperationServersElement();
  }
}

export default ServersVisitor;
