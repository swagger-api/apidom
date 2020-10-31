// @ts-ignore
import * as apiDOM from "apidom";
// @ts-ignore
import ApiDOMParser from "apidom-parser";
// @ts-ignore
import * as openapi3_1Adapter from "apidom-parser-adapter-openapi-json-3-1";
// @ts-ignore
import {namespace} from 'apidom-parser-adapter-openapi-json-3-1';
// @ts-ignore
import * as asyncapi2_0Adapter from "apidom-parser-adapter-asyncapi-json-2-0";
// @ts-ignore
import {namespace as namespaceAsync} from 'apidom-parser-adapter-asyncapi-json-2-0';

import {
  findNodeAtOffset,
  findAllTreeClasses, findAllTreeElementsWithClasses, getSourceMap, allClasses
} from "./apidom/utils/objects";

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
    },
    "/b" : {
      "post": {
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

  const value4 = `{
  "openapi": "3.0.0",
  "info": {
    "version": "0.1.9"
  }, 
  "servers" : [
    {"url": "https://petstore3.swagger.io/api/v3/pet"}
  ],
  "paths" : {
    "/a" : {
      "get": {
        "operationId": "a"
      }
    },
    "/b" : {
      "post": {
        "operationId": "a"
      }
    },    
    "/2" : {
      "get": {
        "operationId": "2get"
      }
    }        
  }    
}`;

  const valueAsyncSimple = `{
  "asyncapi": "2.0.0",
  "info": {
    "version": "0.1.9"
  }, 
  "servers" : {
    "prod": {"url": "https://petstore3.swagger.io/api/v3/pet"}
  }    
}`;

  const valueAsyncLessSimple = `{
  "asyncapi": "2.0.0",
  "info": {
    "version": "0.1.9"
  }, 
  "servers" : {
    "prod": {"url": "https://petstore3.swagger.io/api/v3/pet"}
  },
  "channels": {
    "4": {
      "subscribe": {
        "summary": "A user signed up.",
        "message": {
          "payload": {
            "type": "string"
          }
        }
      }
    }
  }    
}`;

  parser.use(openapi3_1Adapter);
  //parser.use(asyncapi2_0Adapter);
  const parseResult = await parser.parse(value4, {sourceMap: true});
  console.log("Par", JSON.stringify(parseResult));
  //const api: namespace.OpenApi3_1 = <namespace.OpenApi3_1>parseResult.api;
  //const api: namespaceAsync.AsyncApi2_0 = <namespaceAsync.AsyncApi2_0>parseResult.api;
  //api.freeze() // !! freeze and add parent !!
})();
