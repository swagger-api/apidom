import {
  CodeAction,
  CodeActionParams,
  DiagnosticSeverity,
  CodeActionKind,
  TextDocument,
} from 'vscode-languageserver';

/**
 *
 * @export
 * @param {TextDocument} textDocument
 * @param {CodeActionParams} parms
 * @returns {CodeAction[]}
 */
// eslint-disable-next-line import/prefer-default-export
export function quickfix(textDocument: TextDocument, parms: CodeActionParams): CodeAction[] {
  const { diagnostics } = parms.context;
  if (!diagnostics || diagnostics.length === 0) {
    return [];
  }

  const codeActions: CodeAction[] = [];
  diagnostics.forEach((diag) => {
    if (
      diag.severity === DiagnosticSeverity.Warning &&
      diag.message.includes('LINTER MESSAGE TODO USE DATA FIELD AVAILABLE IN DIAGNOSTIC')
    ) {
      codeActions.push({
        title: 'Uppercase the keyword',
        kind: CodeActionKind.QuickFix,
        diagnostics: [diag],
        edit: {
          changes: {
            [parms.textDocument.uri]: [
              {
                range: diag.range,
                newText: textDocument.getText(diag.range).toUpperCase(),
              },
            ],
          },
        },
      });
      return;
    }

    if (
      diag.severity === DiagnosticSeverity.Error &&
      diag.relatedInformation &&
      diag.relatedInformation[0].message.includes('Possible valid values: ')
    ) {
      const actions = diag.relatedInformation[0].message
        .substring('Possible valid values: '.length)
        .split(',');
      codeActions.push({
        title: `Change to a possible valid value: ${actions[0].trim()}`,
        kind: CodeActionKind.QuickFix,
        diagnostics: [diag],
        edit: {
          changes: {
            [parms.textDocument.uri]: [
              {
                range: diag.range,
                newText: actions[0].trim(),
              },
            ],
          },
        },
      });
    }
  });

  return codeActions;
}
