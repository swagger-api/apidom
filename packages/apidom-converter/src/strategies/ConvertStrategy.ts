import stampit from 'stampit';
import { ParseResultElement } from '@swagger-api/apidom-core';
import { File } from '@swagger-api/apidom-reference';

import type { ConverterOptions } from '../options';

type ExtractGenericType<T> = T extends stampit.Stamp<infer U> ? U : never;
export type IFile = ExtractGenericType<typeof File>;

export interface ConvertStrategyOptions {
  readonly name: string;
}

abstract class ConvertStrategy {
  public readonly name: string;

  protected constructor({ name }: ConvertStrategyOptions) {
    this.name = name;
  }

  abstract canConvert(file: IFile, options: ConverterOptions): boolean;

  abstract convert(file: IFile, options: ConverterOptions): Promise<ParseResultElement>;
}

export default ConvertStrategy;
