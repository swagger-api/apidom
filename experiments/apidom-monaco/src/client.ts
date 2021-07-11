import {
  MonacoToProtocolConverter,
  ProtocolToMonacoConverter,
} from "monaco-languageclient/lib/monaco-converter";
import {CompletionContext, getLanguageService, LanguageServiceContext} from "../../../apidom/packages/apidom-ls";
import { TextDocument } from 'vscode-languageserver-textdocument';
import {languages, Position, } from "monaco-editor-core";
import {metadata} from "./metadata";
import {CompletionItem, CompletionList} from "vscode-languageserver-types";


const LANGUAGE_ID = "openapi";
const MODEL_URI = "inmemory://model.json";
const MONACO_URI = monaco.Uri.parse(MODEL_URI);

export interface OperationEx {
  url: string,
  method: string,
  accept: string,
  content_type: string

}

export default ({ monaco, containerId }) => {
  // register the JSON language with Monaco
  monaco.languages.register({
    id: LANGUAGE_ID,
    extensions: [
      ".json",
      ".bowerrc",
      ".jshintrc",
      ".jscsrc",
      ".eslintrc",
      ".babelrc",
    ],
    aliases: ["JSON", "json", "YAML", "yaml"],
    mimetypes: ["application/json", "application/yaml"]
  });

  // create the Monaco editor
  const openapiJson = `{
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
        "operationId": "aget"
      },
      "post": {
        "operationId": "apost"
      }      
    },
    "/b" : {
      "post": {
        "operationId": "bpost"
      }
    },    
    "/2" : {
      "get": {
        "operationId": "2get"
      }
    }    
  }    
}`;

  const openapiYaml = 'openapi: 3.0.0\n' +
      'info:\n' +
      '  version: 0.1.9\n' +
      'servers:\n' +
      '  - url: https://petstore3.swagger.io/api/v3/pet\n' +
      'paths:\n' +
      '  /a:\n' +
      '    get:\n' +
      '      operationId: aget\n' +
      '    post:\n' +
      '      operationId: apost\n' +
      '  /b:\n' +
      '    post:\n' +
      '      operationId: bpost\n' +
      '  /2:\n' +
      '    get:\n' +
      '      operationId: 2get\n';
  const asyncapiJson = `{
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
  const asyncapiYaml = 'asyncapi: 2.0.0\n' +
      'info:\n' +
      '  version: 0.1.9\n' +
      'servers:\n' +
      '  prod:\n' +
      '    url: https://petstore3.swagger.io/api/v3/pet\n' +
      'channels:\n' +
      '  4:\n' +
      '    subscribe:\n' +
      '      summary: A user signed up.\n' +
      '      message:\n' +
      '        payload:\n' +
      '          type: string\n';

  const editor = monaco.editor.create(document.getElementById(containerId)!, {
    'semanticHighlighting.enabled': true,
    language: LANGUAGE_ID,
    value: openapiJson,
    glyphMargin: true,
    lightbulb: {
      enabled: true,
    },
    //theme: "vs-dark",
    theme: "vs",
    lineNumbers: "on",
    autoIndent: "full"
  });

  const monacoModel: monaco.editor.IModel = editor.getModel();
  const MONACO_URI = monacoModel.uri;
  const MODEL_URI = MONACO_URI.toString();
  const LSP_URI = { uri: MODEL_URI };


  function getModel(): monaco.editor.IModel {
    return monacoModel;
  }

  const darkThemeMap = {
    "keyword": 12,
    "comment": 7,
    "parameter": 6,
    "property": 14,
    "label": 16,
    "class": 3,
    "macro": 11,
    "string": 5,
    "variable": {
      "declaration": 8,
      "definition": 8,
      "deprecated": 8,
      "reference": 4
    },
    "operator": 1,
    "specVersion": 7,
    "version": 14,
    "info": 6,
    //"operation": 12,
    "operation": {
      "httpMethod-GET": 12,
      "httpMethod-POST": 8
    },
    "pathItem": 11,
    "key": {
      "string": 5,
      "number": 6
    },
    "value": {
      "string": 16,
      "number": 6
    },
    "number": 6
  }
  function getStyleMetadataDark(type: string, modifiers: string[]) {
    let color = (darkThemeMap as any)[type];
    if (type === "variable") {
      color = (darkThemeMap[type] as any)[modifiers[0]];
    }
    if (type === "operation" || type === "key" || type === "value") {
      color = (darkThemeMap[type] as any)[modifiers[0]];
    }
    const style = {
      foreground: color,
      bold: false,
      underline: false,
      italic: false
    };
    if (true) {
      return style;
    }
  };

  const lightThemeMap = {
    "keyword": 0,
    "comment": 7,
    "parameter": 5,
    "property": 4,
    "label": 11,
    "class": 5,
    "macro": 3,
    "string": 11,
    "variable": {
      "declaration": 12,
      "definition": 12,
      "deprecated": 12,
      "reference": 13
    },
    "operator": 1,
    "specVersion": 7,
    "version": 4,
    "info": 5,
    //"operation": 0,
    "operation": {
      "httpMethod-GET": 13,
      "httpMethod-POST": 12
    },
    "pathItem": 3,
    "key": {
      "string": 11,
      "number": 5
    },
    "value": {
      "string": 5,
      "number": 4
    },
    "number": 4
  }
  function getStyleMetadataLight(type: string, modifiers: string[]) {
    let color = (lightThemeMap as any)[type];
    if (type === "variable") {
      color = (lightThemeMap[type] as any)[modifiers[0]];
    }
    if (type === "operation" || type === "key" || type === "value") {
      color = (darkThemeMap[type] as any)[modifiers[0]];
    }
    const style = {
      foreground: color,
      bold: false,
      underline: false,
      italic: false
    };
    if (true) {
      return style;
    }
  };

  monaco.editor.setTheme('vs');
  editor._themeService._theme.getTokenStyleMetadata = getStyleMetadataLight;

  monaco.editor.setTheme('vs-dark');
  editor._themeService._theme.getTokenStyleMetadata = getStyleMetadataDark

  let editorLoadedCondition = editor.createContextKey(/*key name*/'editorLoadedCondition', /*default value*/false);
  let operationContextCondition = editor.createContextKey(/*key name*/'operationContextCondition', /*default value*/false);

  let currentCommand: OperationEx = null;
  let currentDocs: string = null;


  editor.addCommand(monaco.KeyCode.F3, function() {
    editor.setValue(openapiJson);
  });

  editor.addCommand(monaco.KeyCode.F4, function() {
    editor.setValue(openapiYaml);
  });
  editor.addCommand(monaco.KeyCode.F5, function() {
    editor.setValue(asyncapiJson);
  });
  editor.addCommand(monaco.KeyCode.F6, function() {
    editor.setValue(asyncapiYaml);
  });


  editorLoadedCondition.set(true);


  function createDocument(model: monaco.editor.IReadOnlyModel) {
    return TextDocument.create(
        MODEL_URI,
        model.getModeId(),
        model.getVersionId(),
        model.getValue()
    );
  }

  const m2p = new MonacoToProtocolConverter(monaco);
  const p2m = new ProtocolToMonacoConverter(monaco);

  const context: LanguageServiceContext = {
    metadata: metadata(),
  };
  const apidomService = getLanguageService(context);

  function validate(): void {
    const document = createDocument(getModel());
    cleanPendingValidation(document);
    pendingValidationRequests.set(
        document.uri,
        setTimeout(() => {
          pendingValidationRequests.delete(document.uri);
          doValidate(document);
        })
    );
  }

  /**
   * Validation
   */

  const pendingValidationRequests = new Map<string, number>();

  function cleanPendingValidation(document: TextDocument): void {
    const request = pendingValidationRequests.get(document.uri);
    if (request !== undefined) {
      clearTimeout(request);
      pendingValidationRequests.delete(document.uri);
    }
  }

  function doValidate(document: TextDocument): void {
    if (document.getText().length === 0) {
      cleanDiagnostics();
      return;
    }
    apidomService.doValidation(document).then((diagnostics) => {
      console.log("diag", diagnostics);
      const markers = p2m.asDiagnostics(diagnostics);
      monaco.editor.setModelMarkers(getModel(), "default", markers);
    });
  }

  function cleanDiagnostics(): void {
    monaco.editor.setModelMarkers(getModel(), "default", []);
  }




  getModel().onDidChangeContent((event) => {
    validate();
  });


  /**
   *  add providers to monaco editor
   */

  monaco.languages.registerCompletionItemProvider(LANGUAGE_ID, {
    provideCompletionItems(
        model,
        position: Position,
        context,
        token
    ): monaco.Thenable<monaco.languages.CompletionList> {
      const document = createDocument(model);
      const wordUntil = model.getWordUntilPosition(position);
      const defaultRange = new monaco.Range(
          position.lineNumber,
          wordUntil.startColumn,
          position.lineNumber,
          wordUntil.endColumn
      );
      const completionContext: CompletionContext = {
        maxNumberOfItems: 100,
      };
      const empty: CompletionItem[] = [];
      return apidomService
          .doCompletion(
              document,
              m2p.asPosition(position.lineNumber, position.column),
              completionContext
          )
          .then((list) => {
            const l: CompletionList = list!;
            return p2m.asCompletionResult(l ? l : empty, defaultRange);
          });
    },

    resolveCompletionItem(
        model,
        position,
        item,
        token
    ):
        | monaco.languages.CompletionItem
        | monaco.Thenable<monaco.languages.CompletionItem> {
      // TODO see client in git branch
      /*      return apidomService
                .doResolve(m2p.asCompletionItem(item))
                .then((result) => p2m.asCompletionItem(result, item.range));*/
      return item;
    },
  });

  monaco.languages.registerDocumentSemanticTokensProvider(LANGUAGE_ID, {
    getLegend() {
      return apidomService.getSemanticTokensLegend();
    },

    //provideDocumentSemanticTokens(model: any): monaco.Thenable<monaco.languages.SemanticTokens> {
    provideDocumentSemanticTokens(model: any) {
      const document = createDocument(model);
      return apidomService.computeSemanticTokens(document);
    },

    releaseDocumentSemanticTokens() {
      // nothing to do
    }
  });

  monaco.languages.registerHoverProvider(LANGUAGE_ID, {
    provideHover(
        model,
        position: Position,
        token
    ): monaco.languages.Hover | monaco.Thenable<monaco.languages.Hover> {
      const document = createDocument(model);
      return apidomService
          .doHover(
              document,
              m2p.asPosition(position.lineNumber, position.column)
          )
          .then((hover) => {
            // operationContextCondition.set(false);
            return p2m.asHover(hover)!;
          });
    },
  });

  monaco.languages.registerCodeActionProvider(LANGUAGE_ID, {
    provideCodeActions: (
        model /**ITextModel*/,
        range /**Range*/,
        context /**CodeActionContext*/,
        token /**CancellationToken*/
    ) => {

      const document = createDocument(model);
      const diagnostics = m2p.asDiagnostics(context.markers);
      return apidomService.doCodeActions(document, diagnostics).then((actions) => {
        // operationContextCondition.set(false);
        const monacoActions: languages.CodeAction[] = [];
        if (actions && actions.length) {
          for (let action of actions) {
            monacoActions.push(p2m.asCodeAction(action));
          }
        }
        return {
          actions: monacoActions,
          dispose: () => {}
        }
      });

    }
  });

  monaco.languages.registerDocumentSymbolProvider(LANGUAGE_ID, {
    provideDocumentSymbols(
        model,
        token
    ):
        | monaco.languages.DocumentSymbol[]
        | monaco.Thenable<monaco.languages.DocumentSymbol[]> {
      const document = createDocument(model);

      return apidomService.doFindDocumentSymbols(document).then(s => {
        console.log(JSON.stringify(s));
        return p2m.asSymbolInformations(s);
      })

    },
  });



  validate();

};
