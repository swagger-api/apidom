const operationLintExpected = [
  {
    range: {
      start: {
        line: 2,
        character: 2,
      },
      end: {
        line: 2,
        character: 8,
      },
    },
    message: "should always have a 'title'",
    severity: 1,
    code: 10097,
    source: 'apilint',
    data: {
      quickFix: [
        {
          message: "add 'title' field",
          action: 'addChild',
          snippetYaml: 'title: \n  ',
          snippetJson: '"title": "",\n    ',
        },
      ],
    },
  },
];
export default operationLintExpected;
