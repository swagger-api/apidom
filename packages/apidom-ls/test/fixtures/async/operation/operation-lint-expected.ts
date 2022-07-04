const operationLintExpected = [
  {
    range: {
      start: { line: 0, character: 0 },
      end: { line: 0, character: 5 },
    },
    message: "should always have a 'info' section",
    severity: 1,
    code: 30501,
    source: 'apilint',
    data: {
      quickFix: [
        {
          message: "add 'info' section",
          action: 'addChild',
          snippetYaml: 'info: \n  \n',
          snippetJson: '"info": {\n  \n  },\n',
        },
      ],
    },
  },
  {
    range: {
      start: { line: 11, character: 6 },
      end: { line: 11, character: 17 },
    },
    message: "operationId' must be unique among all operations",
    severity: 1,
    code: 130101,
    source: 'apilint',
    data: {},
  },
  {
    range: {
      start: { line: 12, character: 15 },
      end: { line: 12, character: 16 },
    },
    message: "summary' value must be a string",
    severity: 1,
    code: 130200,
    source: 'apilint',
    data: {},
  },
  {
    range: {
      start: { line: 13, character: 19 },
      end: { line: 13, character: 20 },
    },
    message: "description' value must be a string",
    severity: 1,
    code: 130300,
    source: 'apilint',
    data: {},
  },
  {
    range: {
      start: { line: 14, character: 6 },
      end: { line: 14, character: 10 },
    },
    message: 'Tags Object items must be of Tag Object shape',
    severity: 1,
    code: 60001,
    source: 'apilint',
    data: {},
  },
  {
    range: {
      start: { line: 16, character: 6 },
      end: { line: 16, character: 18 },
    },
    message: "should always have a 'url'",
    severity: 1,
    code: 250201,
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
  {
    range: {
      start: { line: 19, character: 8 },
      end: { line: 19, character: 13 },
    },
    message: 'Object includes not allowed fields',
    severity: 1,
    code: 15000,
    source: 'apilint',
  },
  {
    range: {
      start: { line: 37, character: 15 },
      end: { line: 37, character: 17 },
    },
    message: '"message" must be a Message Object',
    severity: 1,
    code: 130900,
    source: 'apilint',
    data: {},
  },
  {
    range: {
      start: { line: 31, character: 6 },
      end: { line: 31, character: 18 },
    },
    message: "should always have a 'url'",
    severity: 1,
    code: 250201,
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
  {
    range: {
      start: { line: 34, character: 15 },
      end: { line: 34, character: 16 },
    },
    message: '"kafka" must be a Kafka Operation Binding',
    severity: 1,
    code: 190300,
    source: 'apilint',
    data: {},
  },
  {
    range: {
      start: { line: 54, character: 13 },
      end: { line: 54, character: 16 },
    },
    message: '"publish" must be an operation',
    severity: 1,
    code: 120500,
    source: 'apilint',
    data: {},
  },
  {
    range: {
      start: { line: 40, character: 6 },
      end: { line: 40, character: 17 },
    },
    message: "operationId' must be unique among all operations",
    severity: 1,
    code: 130101,
    source: 'apilint',
    data: {},
  },
  {
    range: {
      start: { line: 41, character: 15 },
      end: { line: 41, character: 16 },
    },
    message: "summary' value must be a string",
    severity: 1,
    code: 130200,
    source: 'apilint',
    data: {},
  },
  {
    range: {
      start: { line: 42, character: 19 },
      end: { line: 42, character: 20 },
    },
    message: "description' value must be a string",
    severity: 1,
    code: 130300,
    source: 'apilint',
    data: {},
  },
  {
    range: {
      start: { line: 39, character: 4 },
      end: { line: 39, character: 13 },
    },
    message: 'traits must be an array of Operation Trait Objects',
    severity: 1,
    code: 130801,
    source: 'apilint',
    data: {},
  },
  {
    range: {
      start: { line: 43, character: 6 },
      end: { line: 43, character: 10 },
    },
    message: 'Tags Object items must be of Tag Object shape',
    severity: 1,
    code: 60001,
    source: 'apilint',
    data: {},
  },
  {
    range: {
      start: { line: 45, character: 6 },
      end: { line: 45, character: 18 },
    },
    message: "should always have a 'url'",
    severity: 1,
    code: 250201,
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
  {
    range: {
      start: { line: 48, character: 8 },
      end: { line: 48, character: 13 },
    },
    message: 'Object includes not allowed fields',
    severity: 1,
    code: 15000,
    source: 'apilint',
  },
  {
    range: {
      start: { line: 58, character: 6 },
      end: { line: 58, character: 17 },
    },
    message: "operationId' must be unique among all operations",
    severity: 1,
    code: 140101,
    source: 'apilint',
    data: {},
  },
  {
    range: {
      start: { line: 59, character: 15 },
      end: { line: 59, character: 16 },
    },
    message: "summary' value must be a string",
    severity: 1,
    code: 140200,
    source: 'apilint',
    data: {},
  },
  {
    range: {
      start: { line: 60, character: 19 },
      end: { line: 60, character: 20 },
    },
    message: "description' value must be a string",
    severity: 1,
    code: 140300,
    source: 'apilint',
    data: {},
  },
  {
    range: {
      start: { line: 61, character: 6 },
      end: { line: 61, character: 10 },
    },
    message: 'Tags Object items must be of Tag Object shape',
    severity: 1,
    code: 60001,
    source: 'apilint',
    data: {},
  },
  {
    range: {
      start: { line: 63, character: 6 },
      end: { line: 63, character: 18 },
    },
    message: "should always have a 'url'",
    severity: 1,
    code: 250201,
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
  {
    range: {
      start: { line: 66, character: 8 },
      end: { line: 66, character: 13 },
    },
    message: 'Object includes not allowed fields',
    severity: 1,
    code: 15000,
    source: 'apilint',
  },
];
export default operationLintExpected;
