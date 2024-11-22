import File from '../../File.ts';
import ReferenceSet from '../../ReferenceSet.ts';
import type { ReferenceOptions } from '../../options/index.ts';

/**
 * @public
 */
export interface ResolveStrategyOptions {
  readonly name: string;
}

/**
 * @public
 */
abstract class ResolveStrategy {
  public readonly name: string;

  constructor({ name }: ResolveStrategyOptions) {
    this.name = name;
  }

  abstract canResolve(file: File, options: ReferenceOptions): boolean;
  abstract resolve(file: File, options: ReferenceOptions): Promise<ReferenceSet>;
}

export default ResolveStrategy;
