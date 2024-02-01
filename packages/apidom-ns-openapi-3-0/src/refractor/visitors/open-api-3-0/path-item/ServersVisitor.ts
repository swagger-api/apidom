import PathItemServersElement from '../../../../elements/nces/PathItemServers';
import BaseServersVisitor, { ServersVisitorOptions } from '../ServersVisitor';

export type { ServersVisitorOptions };

class ServersVisitor extends BaseServersVisitor {
  public declare readonly element: PathItemServersElement;

  constructor(options: ServersVisitorOptions) {
    super(options);
    this.element = new PathItemServersElement();
  }
}

export default ServersVisitor;
