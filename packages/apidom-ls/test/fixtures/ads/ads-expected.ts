const operationLintExpected = [
  {
    range: { start: { line: 63, character: 6 }, end: { line: 63, character: 18 } },
    message: "should always have a 'url'",
    severity: 1,
    code: 10081,
    source: 'apilint',
    data: {
      quickFix: [
        {
          message: "add 'url' field",
          action: 'addChild',
          snippetYaml: 'url: \n  ',
          snippetJson: '"url": "",\n    ',
        },
      ],
    },
  },
];
export default operationLintExpected;
