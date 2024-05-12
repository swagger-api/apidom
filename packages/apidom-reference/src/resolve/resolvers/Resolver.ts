import File from '../../File';

export interface ResolverOptions {
  readonly name: string;
}

abstract class Resolver {
  public readonly name: string;

  constructor({ name }: ResolverOptions) {
    this.name = name;
  }

  public abstract canRead(file: File): boolean;
  public abstract read(file: File): Promise<Buffer>;
}

export default Resolver;
