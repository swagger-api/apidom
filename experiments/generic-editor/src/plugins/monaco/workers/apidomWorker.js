/* eslint-disable no-underscore-dangle */
/* eslint-disable import/prefer-default-export */
import { TextDocument } from 'vscode-languageserver-textdocument'; // this is true source
// import { getLanguageService } from 'vscode-json-languageservice'; // will eventually come from apidom
import {
  // CompletionContext,
  getLanguageService,
  // LanguageServiceContext,
} from 'apidom-ls';

import { languageID } from '../adapters/config';
import metadata from './metadataJs';

export class ApidomWorker {
  // eslint-disable-next-line no-unused-vars
  constructor(ctx, createData) {
    this._ctx = ctx;
    // define this._x for languageSettings, languageId, languageService
    // this._languageService = getLanguageService(this._ctx);
    const apidomContext = {
      metadata: metadata(),
    };
    this._languageService = getLanguageService(apidomContext); // use apidom metadata
    // this._languageService.configure(this._languageSettings);
  }

  async doValidation(uri) {
    const document = this._getTextDocument(uri); // call a private method
    if (!document) {
      return Promise.resolve([]);
    }
    const diagnostics = await this._languageService.doValidation(document);
    return Promise.resolve(diagnostics);
  }

  async doComplete(uri, position) {
    const document = this._getTextDocument(uri); // call a private method
    if (!document) {
      return Promise.resolve([]);
    }
    const completions = await this._languageService.doCompletion(document, position);
    // console.log('worker:doComplete... completions:', completions);
    return Promise.resolve(completions);
  }

  async doHover(uri, position) {
    const document = this._getTextDocument(uri); // call a private method
    if (!document) {
      return Promise.resolve([]);
    }
    const hover = await this._languageService.doHover(document, position);
    // console.log('worker:doHover... hover:', hover);
    return Promise.resolve(hover);
  }

  async findDocumentSymbols(uri) {
    const document = this._getTextDocument(uri); // call a private method
    if (!document) {
      return Promise.resolve([]);
    }
    const symbols = await this._languageService.doFindDocumentSymbols(document);
    // console.log('worker:findDocumentSymbols... symbols:', symbols);
    return Promise.resolve(symbols);
  }

  async provideDefinition(uri, position) {
    const document = this._getTextDocument(uri); // call a private method
    if (!document) {
      return Promise.resolve([]);
    }
    const definitions = await this._languageService.doProvideDefinition(document, {
      uri,
      position,
    });
    return Promise.resolve(definitions);
  }

  async doCodeActions(uri, diagnostics) {
    const document = this._getTextDocument(uri); // call a private method
    if (!document) {
      return Promise.resolve([]);
    }
    const codeActions = await this._languageService.doCodeActions(document, diagnostics);
    // console.log('worker:doCodeActions... codeActions:', codeActions);
    return Promise.resolve(codeActions);
  }

  async findSemanticTokens(uri) {
    const document = this._getTextDocument(uri); // call a private method
    if (!document) {
      return Promise.resolve([]);
    }
    const semanticTokens = await this._languageService.computeSemanticTokens(document);
    // console.log('worker:findSemanticTokens... semanticTokens:', semanticTokens);
    return Promise.resolve(semanticTokens);
  }

  async getSemanticTokensLegend() {
    const semanticTokensLegend = await this._languageService.getSemanticTokensLegend();
    // console.log('worker:getSemanticTokensLegend... semanticTokensLegend:', semanticTokensLegend);
    return Promise.resolve(semanticTokensLegend);
  }

  // intended as private method
  // eslint-disable-next-line no-unused-vars
  _getTextDocument(uri) {
    // console.log('_getTextDocument... args: uri', uri);
    const models = this._ctx.getMirrorModels()[0]; // When there are multiple files open, this will be an array
    // console.log('_getTextDocument.models', models);
    // models: _lines[], _uri, _versionId
    // fyi, reference more complete example in cssWorker
    // https://github.com/microsoft/monaco-css/blob/master/src/cssWorker.ts
    // which we might want later to handle multiple URIs
    // expect return a TextDocument/TextDocument.create()
    // const testModelsUri = models.uri.toString(); // singular
    // console.log('testModelsUri:', testModelsUri); // inmemory://model/1
    // if (models.uri.toString() === uri) {
    const textDocumentToReturn = TextDocument.create(
      uri,
      // this._languageId,
      languageID,
      models._versionId,
      models.getValue()
    );
    // console.log('_getTextDocument.textDocumentToReturn', textDocumentToReturn);
    return textDocumentToReturn;
    // }
    // console.log('_getTextDocument... early return. uri not match');
    // return null;
  }
}

export function create(ctx, createData) {
  return new ApidomWorker(ctx, createData);
}
