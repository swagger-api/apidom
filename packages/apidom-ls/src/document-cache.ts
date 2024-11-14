import { TextDocument } from 'vscode-languageserver-textdocument';

// eslint-disable-next-line import/no-cycle
import { debug, perfEnd, perfStart } from './utils/utils.ts';
import { DocumentCache } from './apidom-language-types.ts';

/*
 Adapted from https://github.com/microsoft/vscode/blob/main/extensions/json-language-features/server/src/languageModelCache.ts
 */
// eslint-disable-next-line import/prefer-default-export
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
          debug(`cache DELETING(timer) ${documentInfo.version}`);
          delete documents[uri];
          // eslint-disable-next-line no-plusplus
          nModels--;
        }
      }
    }, cleanupIntervalTimeInSec * 1000);
  }

  return {
    async get(document: TextDocument, text?: string, caller = 'nocaller'): Promise<T> {
      const { version } = document;
      const { languageId } = document;
      const processedUri =
        // @ts-ignore
        // eslint-disable-next-line no-underscore-dangle
        document.uri && document.uri._formatted ? document.uri._formatted : document.uri;
      const documentInfo = documents[processedUri];
      if (
        documentInfo &&
        documentInfo.version === version &&
        documentInfo.languageId === languageId &&
        ((!text && !documentInfo.processedText) || documentInfo.processedText === text)
      ) {
        documentInfo.cTime = Date.now();
        debug(
          `cache HIT by ${caller}`,
          `timestamp: ${Date.now()}`,
          `document.uri: ${JSON.stringify(document.uri)}`,
          `processedUri: ${processedUri}`,
          `new/old vers: ${document.version}/${documentInfo.version}`,
          `new/old text: ${text?.length}/${documentInfo.processedText?.length}`,
        );
        return documentInfo.parsedDocument;
      }
      debug(
        `cache MISSED by ${caller}`,
        `timestamp: ${Date.now()}`,
        `document.uri: ${JSON.stringify(document.uri)}`,
        `processedUri: ${processedUri}`,
        `vers: ${document.version}`,
        `text: ${text?.length}`,
        `documentInfo: ${documentInfo ? documentInfo.version : 'no doc'} - ${
          documentInfo ? documentInfo.languageId : 'no doc'
        }`,
      );
      perfStart('parse');
      const parsedDocument = await parse(text || document);
      perfEnd('parse');
      documents[processedUri] = {
        parsedDocument,
        version,
        languageId,
        cTime: Date.now(),
        processedText: text,
      };
      debug(
        `cache RELOADED by ${caller}`,
        `timestamp: ${Date.now()}`,
        `vers: ${documents[processedUri]?.version}`,
      );
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
          debug(`cache DELETING ${documents[oldestUri].version}`);
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
