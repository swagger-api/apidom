import { TextDocument } from 'vscode-languageserver-textdocument';

/*
 Adapted from https://github.com/microsoft/vscode/blob/main/extensions/json-language-features/server/src/languageModelCache.ts
 */
export interface DocumentCache<T> {
  get(document: TextDocument, text?: string): Promise<T | undefined>;
  onDocumentRemoved(document: TextDocument): void;
  dispose(): void;
}

export function getDocumentCache<T>(
  maxEntries: number,
  cleanupIntervalTimeInSec: number,
  parse: (document: TextDocument | string) => Promise<T>,
): DocumentCache<T> {
  // TODO possibly better comparison on processedText length or other cheap comparison
  let documents: {
    [uri: string]: {
      version: number;
      languageId: string;
      cTime: number;
      parsedDocument: T;
      processedText?: string;
    };
  } = {};
  let nModels = 0;

  let cleanupInterval: ReturnType<typeof setInterval> | undefined;
  if (cleanupIntervalTimeInSec > 0) {
    cleanupInterval = setInterval(() => {
      const cutoffTime = Date.now() - cleanupIntervalTimeInSec * 1000;
      const uris = Object.keys(documents);
      for (const uri of uris) {
        const documentInfo = documents[uri];
        if (documentInfo.cTime < cutoffTime) {
          delete documents[uri];
          // eslint-disable-next-line no-plusplus
          nModels--;
        }
      }
    }, cleanupIntervalTimeInSec * 1000);
  }

  return {
    async get(document: TextDocument, text?: string): Promise<T> {
      const { version } = document;
      const { languageId } = document;
      const documentInfo = documents[document.uri];
      if (
        documentInfo &&
        documentInfo.version === version &&
        documentInfo.languageId === languageId &&
        (!text || documentInfo.processedText === text)
      ) {
        documentInfo.cTime = Date.now();
        return documentInfo.parsedDocument;
      }
      const parsedDocument = await parse(text || document);
      documents[document.uri] = {
        parsedDocument,
        version,
        languageId,
        cTime: Date.now(),
        processedText: text,
      };
      if (!documentInfo) {
        // eslint-disable-next-line no-plusplus
        nModels++;
      }

      if (nModels === maxEntries) {
        let oldestTime = Number.MAX_VALUE;
        let oldestUri = null;
        // eslint-disable-next-line guard-for-in
        for (const uri in documents) {
          const documentInfoInstance = documents[uri];
          if (documentInfoInstance.cTime < oldestTime) {
            oldestUri = uri;
            oldestTime = documentInfoInstance.cTime;
          }
        }
        if (oldestUri) {
          delete documents[oldestUri];
          // eslint-disable-next-line no-plusplus
          nModels--;
        }
      }
      return parsedDocument;
    },
    onDocumentRemoved(document: TextDocument) {
      const { uri } = document;
      if (documents[uri]) {
        delete documents[uri];
        // eslint-disable-next-line no-plusplus
        nModels--;
      }
    },
    dispose() {
      if (typeof cleanupInterval !== 'undefined') {
        clearInterval(cleanupInterval);
        cleanupInterval = undefined;
        documents = {};
        nModels = 0;
      }
    },
  };
}
