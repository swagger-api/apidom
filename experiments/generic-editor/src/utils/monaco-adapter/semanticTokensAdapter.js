import { getLanguageService } from 'apidom-ls';

/* eslint-disable class-methods-use-this */
export default class SemanticTokensAdapter {
  constructor(worker) {
    this.worker = worker;
  }

  getLegend() {
    try {
      return getLanguageService({}).getSemanticTokensLegend();
    } catch (e) {
      console.error(e, e.stack);
      return { error: 'unable to getLegend' };
    }
  }

  async provideDocumentSemanticTokens(model) {
    const resource = model.uri;
    // get the worker proxy (ts interface)
    const worker = await this.worker(resource);
    const uri = resource.toString();
    try {
      const semanticTokens = await worker.findSemanticTokens(uri);
      return Promise.resolve(semanticTokens);
    } catch (e) {
      return Promise.resolve({ error: 'unable to provideDocumentSemanticTokens' });
    }
  }

  async releaseDocumentSemanticTokens() {
    // nothing to do
    return Promise.resolve({});
  }
}
