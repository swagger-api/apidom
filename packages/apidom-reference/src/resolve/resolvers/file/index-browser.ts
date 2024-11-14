import Resolver from '../Resolver.ts';
import ResolverError from '../../../errors/ResolverError.ts';

class FileResolver extends Resolver {
  constructor() {
    super({ name: 'file' });
  }

  // eslint-disable-next-line class-methods-use-this
  canRead(): boolean {
    return false;
  }

  // eslint-disable-next-line class-methods-use-this
  read(): Promise<Buffer> {
    throw new ResolverError('FileResolver is not intended to be used in browser context.');
  }
}

export default FileResolver;
