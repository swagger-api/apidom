import ApiDOMParser from "apidom-parser";
import * as openapi3_1Adapter from "apidom-parser-adapter-openapi3-1";

const parser = ApiDOMParser().use(openapi3_1Adapter);

(async () => {
  const parseResult = await parser.parse('{"openapi": "3.1.0"}');
  console.dir(parseResult);
})();
