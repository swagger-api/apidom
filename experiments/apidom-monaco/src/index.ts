import * as monaco from "monaco-editor-core";
// @ts-ignore
import * as apiDOM from "apidom";
// @ts-ignore
import ApiDOMParser from "apidom-parser";
// @ts-ignore
import * as openapi3_1Adapter from "apidom-parser-adapter-openapi3-1-json";

// @ts-ignore
import {namespace} from 'apidom-parser-adapter-openapi3-1-json';

import initClient from "./client";

import {
  findNodeAtOffset,
  findAllTreeClasses, findAllTreeElementsWithClasses, getSourceMap, allClasses
} from "./apidom/utils/objects";

(self as any).MonacoEnvironment = {
  getWorkerUrl: () => "./editor.worker.js",
};

(async () => {
  const parser = ApiDOMParser();

  const value = `{
    "openapi": "3.0.0",
      "info": {
        "version": "0.1.9"
      }
    }`;

  const value2 = `{
  "openapi": "3.0.0",
  "info": {
    "version": "0.1.9"
  }, 
  "paths" : {
    "/a" : {
      "get": {
        "operationId": "a"
      }
    }
  }    
}`;
  const value3 = `{
    "openapi": "3.0.0",
      "info": {
        "version": "0.1.9"
      }
    }`;

  parser.use(openapi3_1Adapter);
  const parseResult = await parser.parse(value3, {sourceMap: true});
  //console.log("Par", JSON.stringify(parseResult));
  const api: namespace.OpenApi3_1 = <namespace.OpenApi3_1>parseResult.api;
  api.freeze() // !! freeze and add parent !!
})();

initClient({ monaco, containerId: "editor" });
