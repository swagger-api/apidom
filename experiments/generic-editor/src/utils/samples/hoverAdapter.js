import { ProtocolToMonacoConverter } from 'monaco-languageclient/lib/monaco-converter';

import { fromPosition } from './utils-helpers';

export default class HoverAdapter {
  constructor(worker, monaco) {
    this.worker = worker;
    this.monaco = monaco;
  }

  async provideHover(model, position) {
    const resource = model.uri;
    // get the worker proxy (ts interface)
    const worker = await this.worker(resource);
    const uri = resource.toString();
    const computedPosition = fromPosition(position);
    // call the validate method proxy from the language service and get hover info
    const info = await worker.doHover(uri, computedPosition);
    // console.log('hoverAdapter. info:', info);
    if (!info) {
      // console.log('hoverAdapter, !info case');
      return Promise.resolve(null);
    }
    const p2m = new ProtocolToMonacoConverter(this.monaco);
    return p2m.asHover(info);
  }
}
