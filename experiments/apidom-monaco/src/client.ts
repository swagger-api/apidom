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

  const valueAsync = `{
  "asyncapi": "2.0.0",
  "info": {
    "version": "1.0.1"
  }
}`;


  const editor = monaco.editor.create(document.getElementById(containerId)!, {
    //model: monaco.editor.createModel(value, LANGUAGE_ID, MONACO_URI),
    'semanticHighlighting.enabled': true,
    language: LANGUAGE_ID,
    value: value2,
    glyphMargin: true,
    lightbulb: {
      enabled: true,
    },
    //theme: "vs-dark",
    theme: "vs"
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
    "operator": 1,
    "label": 16,
    "class": 3,
    "macro": 11,
    "string": 5,
    "specVersion": 7,
    "info": 6,
    "version": 14,
    //"operation": 12,
    "operation": {
      "httpMethod-GET": 4,
      "httpMethod-POST": 8
    },
    "pathItem": 11,
    "variable": {
      "declaration": 8,
      "definition": 8,
      "deprecated": 8,
      "reference": 4
    }
  }
  function getStyleMetadataDark(type: string, modifiers: string[]) {
    let color = (darkThemeMap as any)[type];
    if (type === "variable") {
      color = (darkThemeMap[type] as any)[modifiers[0]];
    }
    if (type === "operation") {
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
    "operator": 1,
    "label": 11,
    "class": 5,
    "macro": 3,
    "string": 11,
    "specVersion": 7,
    "info": 5,
    "version": 4,
    //"operation": 0,
    "operation": {
      "httpMethod-GET": 13,
      "httpMethod-POST": 12
    },
    "pathItem": 3,
    "variable": {
      "declaration": 12,
      "definition": 12,
      "deprecated": 12,
      "reference": 13
    }
  }
  function getStyleMetadataLight(type: string, modifiers: string[]) {
    let color = (lightThemeMap as any)[type];
    if (type === "variable") {
      color = (lightThemeMap[type] as any)[modifiers[0]];
    }
    if (type === "operation") {
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
