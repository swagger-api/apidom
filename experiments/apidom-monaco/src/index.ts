import * as monaco from "monaco-editor-core";
import * as apiDOM from "apidom";
import ApiDOMParser from "apidom-parser";
import * as openapi3_1Adapter from "apidom-parser-adapter-openapi3-1-json";

import initClient from "./client";

(self as any).MonacoEnvironment = {
  getWorkerUrl: () => "./editor.worker.js",
};

(async () => {
  const parser = ApiDOMParser();

  parser.use(openapi3_1Adapter);
  const parseResult = await parser.parse('{"openapi": "3.1.0"}');
  const spec = apiDOM.toValue(parseResult.api);

  console.dir(spec);
})();

initClient({ monaco, containerId: "editor" });
