import fs from 'node:fs';
import http, { Server } from 'node:http';
import path from 'node:path';
import process from 'node:process';

export type ServerTerminable = Server & {
  terminate: () => Promise<ServerTerminable>;
};

export const loadFile = (uri: string) => fs.readFileSync(uri).toString();

export const loadJsonFile = (uri: string) => JSON.parse(loadFile(uri));

export const createHTTPServer = ({ port = 8123, cwd = process.cwd() } = {}): ServerTerminable => {
  const server: ServerTerminable = http.createServer((req, res) => {
    const filePath = path.join(cwd, req.url || '/favicon.ico');

    if (!fs.existsSync(filePath)) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not found');
      return;
    }

    const data = fs.readFileSync(filePath).toString();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(data);
  }) as ServerTerminable;

  server.listen(port);

  server.terminate = () =>
    new Promise((resolve) => {
      server.close(() => resolve(server));
    });

  return server;
};
