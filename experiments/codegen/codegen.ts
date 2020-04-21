import { HAR } from './har'
export type APIDOM = HAR

export interface Files {
  raw: string;
  files?: string[];
}

export default class Codegen {

  registry = {}

  parse(str: string): APIDOM {
    return <APIDOM> JSON.parse(str)
  }

  getGenerator (gen: string): Function {
    return this.registry[gen]
  }

  generate (gen: string, definition: string, options?: any): Files {
    const apiDom = this.parse(definition)
    const generator = this.getGenerator(gen)
    return generator(apiDom, options)
  }

  register(gen: string, fn: Function) {
    this.registry[gen] = fn
  }
  
}

