import OperationServersElement from '../../../../elements/nces/OperationServers.ts';
import BaseServersVisitor, { ServersVisitorOptions } from '../ServersVisitor.ts';

export type { ServersVisitorOptions };

class ServersVisitor extends BaseServersVisitor {
  public declare readonly element: OperationServersElement;

  constructor(options: ServersVisitorOptions) {
    super(options);
    this.element = new OperationServersElement();
  }
}

export default ServersVisitor;
