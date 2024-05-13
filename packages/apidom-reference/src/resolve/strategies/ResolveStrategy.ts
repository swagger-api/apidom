import File from '../../File';
import ReferenceSet from '../../ReferenceSet';
import type { ReferenceOptions } from '../../options';

export interface ResolveStrategyOptions {
  readonly name: string;
}

abstract class ResolveStrategy {
  public readonly name: string;

  constructor({ name }: ResolveStrategyOptions) {
    this.name = name;
  }

  abstract canResolve(file: File, options: ReferenceOptions): boolean;
  abstract resolve(file: File, options: ReferenceOptions): Promise<ReferenceSet>;
}

export default ResolveStrategy;
