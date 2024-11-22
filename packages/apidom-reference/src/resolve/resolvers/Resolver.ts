import File from '../../File.ts';

/**
 * @public
 */
export interface ResolverOptions {
  readonly name: string;
}

/**
 * @public
 */
abstract class Resolver {
  public readonly name: string;

  constructor({ name }: ResolverOptions) {
    this.name = name;
  }

  public abstract canRead(file: File): boolean;
  public abstract read(file: File): Promise<Buffer>;
}

export default Resolver;
