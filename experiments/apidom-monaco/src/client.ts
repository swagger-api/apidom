import {getLanguageService, TokensLegend} from "./apidom/apidomLanguageService";
import { TextDocument } from 'vscode-languageserver-textdocument';
import {Position} from "monaco-editor-core";
import {
  MonacoToProtocolConverter,
  ProtocolToMonacoConverter,
} from "monaco-languageclient/lib/monaco-converter";

//import { SemanticTokenTypes, SemanticTokenModifiers } from 'vscode-languageserver-protocol/lib/protocol.sematicTokens.proposed';
import { Proposed } from 'vscode-languageserver-protocol';

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
    aliases: ["JSON", "json"],
    mimetypes: ["application/json"],
  });

  // create the Monaco editor
  const valueSimple = `{
  "openapi": "3.0.0",
  "info": {
    "version": "0.1.9"
  }    
}`;

  const valueWithPaths = `{
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

  const valueWithPathsAndErrors = `{
  "openapi": "3.0.0",
  "info":::: {
    "version":> "0.1.9"
  }, 
  "servers" : [
    {"url": "https://petstore3.swagger.io/api/v3/pet"}
  ],  
  "paths" : {
    "/a" : {{{:::
      "get": {{{:;;
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

  const valueAsyncSimple = `{
  "asyncapi": "2.0.0",
  "info": {
    "version": "0.1.9"
  }, 
  "servers" : {
    "prod": {"url": "https://petstore3.swagger.io/api/v3/pet"}
  }    
}`;


  const editor = monaco.editor.create(document.getElementById(containerId)!, {
    //model: monaco.editor.createModel(value, LANGUAGE_ID, MONACO_URI),
    'semanticHighlighting.enabled': true,
    language: LANGUAGE_ID,
    value: valueWithPaths,
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
/*
  function getModel(): monaco.editor.IModel {
    return monaco.editor.getModel(MONACO_URI) as monaco.editor.IModel;
  }
*/

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
      "httpMethod-GET": 4,
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

  editor.addCommand(monaco.KeyCode.F6, function() {
    if (!currentCommand) {
      window.document.getElementById("commands").innerHTML='';
    } else {
      fetch(currentCommand.url, {
        method: currentCommand.method,
      })
        .then(result => {
          result.text().then(function (text) {
            window.document.getElementById("commands").innerHTML='' +
                '<div>endpoint: ' + currentCommand.url + '</div>' +
                '<div>method: ' + currentCommand.method + '</div>' +
                '<div>result:</div>' +
                '<div>' + text + '</div>';

          });

        })
        .catch(error => {
          console.error('Error:', error);
        });
    }
  }, 'editorLoadedCondition && operationContextCondition');

  editor.addCommand(monaco.KeyCode.F5, function() {
      window.document.getElementById("commands").innerHTML='';
      currentCommand = null;
  });

  editorLoadedCondition.set(true);
  //operationContextCondition.set(true);

  editor.addAction({
    // An unique identifier of the contributed action.
    id: 'apidom-execute-op',

    // A label of the action that will be presented to the user.
    label: 'ApiDOM execute operation',

    // An optional array of keybindings for the action.
    keybindings: [
      monaco.KeyMod.CtrlCmd | monaco.KeyCode.F10,
      // chord
      monaco.KeyMod.chord(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_K, monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_M)
    ],

    // A precondition for this action.
    precondition: "editorLoadedCondition && operationContextCondition",

    // A rule to evaluate on top of the precondition in order to dispatch the keybindings.
    keybindingContext: null,

    contextMenuGroupId: 'navigation',

    contextMenuOrder: 1.5,

    // Method that will be executed when the action is triggered.
    // @param editor The editor instance is passed in as a convinience
    run: function(ed) {
      if (!currentCommand) {
        window.document.getElementById("commands").innerHTML='';
      } else {
        fetch(currentCommand.url, {
          method: currentCommand.method,
        })
            .then(result => {
              result.text().then(function (text) {
                window.document.getElementById("commands").innerHTML='' +
                    '<div>endpoint: ' + currentCommand.url + '</div>' +
                    '<div>method: ' + currentCommand.method + '</div>' +
                    '<div>result:</div>' +
                    '<div>' + text + '</div>';

              });

            })
            .catch(error => {
              console.error('Error:', error);
            });
      }

      return null;
    }
  });


  function createDocument(model: monaco.editor.IReadOnlyModel) {
    return TextDocument.create(
      MODEL_URI,
      model.getModeId(),
      model.getVersionId(),
      model.getValue()
    );
  }

  const m2p = new MonacoToProtocolConverter();
  const p2m = new ProtocolToMonacoConverter();
  const apidomService = getLanguageService({

  });


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
      return apidomService
        .doComplete(
          document,
          m2p.asPosition(position.lineNumber, position.column)
        )
        .then((list) => {
          return p2m.asCompletionResult(list, defaultRange);
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
      return apidomService
        .doResolve(m2p.asCompletionItem(item))
        .then((result) => p2m.asCompletionItem(result, item.range));
    },
  });

  TokensLegend.init();

  monaco.languages.registerDocumentSemanticTokensProvider(LANGUAGE_ID, {
    getLegend() {
      return TokensLegend.getLegend();
    },

    //provideDocumentSemanticTokens(model: any): monaco.Thenable<monaco.languages.SemanticTokens> {
    provideDocumentSemanticTokens(model: any) {

      return apidomService.computeSemanticTokens(model.getValue());
    },

    releaseDocumentSemanticTokens() {
      // nothing to do
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

      return apidomService.findDocumentSymbols(document).then(s => {
        return p2m.asSymbolInformations(s);
      })

    },
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
            //console.log(hover);
            if (hover && hover.contents && hover.contents[0] && hover.contents[0] == 'operation') {
              currentCommand = {
                accept: "application/json",
                content_type: "application/json",
                method:  hover.contents[2],
                url:  hover.contents[1]

              }
              operationContextCondition.set(true);
            } else {
              operationContextCondition.set(false);
            }
            hover.contents[0] = '**Operation**';
            hover.contents[1] = '_' + hover.contents[2] + '_ ' + hover.contents[1];
            hover.contents[2] = hover.contents[3];
            hover.contents.pop();
            return p2m.asHover(hover)!;
          });
    },
  });

  /*
TODO
 */

  monaco.languages.registerDocumentRangeFormattingEditProvider(LANGUAGE_ID, {
    provideDocumentRangeFormattingEdits(
        model,
        range,
        options,
        token
    ):
        | monaco.languages.TextEdit[]
        | monaco.Thenable<monaco.languages.TextEdit[]> {
      const document = createDocument(model);
      const edits = apidomService.format(
          document,
          m2p.asRange(range),
          m2p.asFormattingOptions(options)
      );
      return p2m.asTextEdits(edits);
    },
  });

  validate();

};
