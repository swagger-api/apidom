import { fileURLToPath } from 'node:url';

type NextLoad = (
  url: string,
  context: { format?: string },
) => Promise<{ format: string; source: string }>;

// resolve hook to catch .wasm files
export async function resolve(
  specifier: string,
  context: { parentURL: string },
  nextResolve: Function, // eslint-disable-line @typescript-eslint/ban-types
) {
  if (specifier.endsWith('.wasm')) {
    const resolved = new URL(specifier, context.parentURL).href;
    return {
      url: resolved,
      shortCircuit: true, // stop further hooks when we handle .wasm
    };
  }

  // delegate to the next loader in the chain
  return nextResolve(specifier, context, nextResolve);
}

// load hook to provide the file path for .wasm files
export async function load(url: string, context: { format?: string }, nextLoad: NextLoad) {
  if (url.endsWith('.wasm')) {
    const wasmFilePath = fileURLToPath(url);
    return {
      format: 'module', // define this as an ES module
      source: `export default ${JSON.stringify(wasmFilePath)};`, // export file path as a string
      shortCircuit: true, // stop further processing for .wasm files
    };
  }

  // delegate to the next loader in the chain for all other files
  return nextLoad(url, context);
}
