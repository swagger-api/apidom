import * as monaco from "monaco-editor-core";
import * as apiDOM from "apidom";
//import getLanguageService from "apidom-ls";
import ApiDOMParser from "apidom-parser";
import * as openapi3_1Adapter from "apidom-parser-adapter-openapi-json-3-1";

import initClient from "./client";
import {getLanguageService, LanguageServiceContext} from "../../../apidom/packages/apidom-ls";

(self as any).MonacoEnvironment = {
  getWorkerUrl: () => "./editor.worker.js",
};

(async () => {
  const parser = ApiDOMParser();

  parser.use(openapi3_1Adapter);
  const parseResult = await parser.parse('{"openapi": "3.1.0"}');
  const spec = apiDOM.toValue(parseResult.api);

  console.dir(spec);
  const languageService = getLanguageService({});
  console.log(JSON.stringify(languageService.getSemanticTokensLegend()));

})();

initClient({ monaco, containerId: "editor" });
