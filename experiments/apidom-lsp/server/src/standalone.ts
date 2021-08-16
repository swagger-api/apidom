#!/usr/bin/env node

import * as child_process from 'child_process';

const lspProcess = child_process.fork('./server.js', ['--node-ipc']);
let messageId = 1;

// eslint-disable-next-line @typescript-eslint/ban-types
function send(method: string, params: object) {
  const message = {
    jsonrpc: '2.0',
    // eslint-disable-next-line no-plusplus
    id: messageId++,
    method,
    params,
  };
  lspProcess.send(message);
}

function initialize() {
  send('initialize', {
    rootPath: process.cwd(),
    processId: process.pid,
    capabilities: {
      /* ... */
    },
  });
}

// eslint-disable-next-line func-names
lspProcess.on('message', function (json) {
  // eslint-disable-next-line no-console
  console.log(json);
});
initialize();
