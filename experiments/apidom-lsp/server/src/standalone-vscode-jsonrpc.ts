#!/usr/bin/env node

import * as net from 'net';
import * as child_process from 'child_process';
// import * as rpc from 'vscode-jsonrpc/node';
import { SocketMessageReader, SocketMessageWriter } from 'vscode-jsonrpc/node';

let messageId = 1;
let reader: SocketMessageReader;
let writer: SocketMessageWriter;

// eslint-disable-next-line @typescript-eslint/ban-types
function send(method: string, params: object) {
  const message = {
    jsonrpc: '2.0',
    // eslint-disable-next-line no-plusplus
    id: messageId++,
    method,
    params,
  };
  writer.write(message);
}

function initialize() {
  send('initialize', {
    rootPath: process.cwd(),
    processId: process.pid,
    capabilities: {
      textDocument: {
        /* ... */
      },
      workspace: {
        /* ... */
      },
    },
  });
}

const server = net.createServer((socket: net.Socket) => {
  server.close();
  reader = new SocketMessageReader(socket);
  reader.listen((data: unknown) => {
    // eslint-disable-next-line no-console
    console.log(data);
  });
  writer = new SocketMessageWriter(socket);
  initialize();
});

server.listen(3000, () => {
  child_process.spawn('node', ['./server.js', '--socket=3000']);
});
