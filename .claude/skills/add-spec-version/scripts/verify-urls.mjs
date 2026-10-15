#!/usr/bin/env node
/**
 * Verifies that URLs (including #anchors) referenced in source files resolve.
 *
 * Usage:
 *   node verify-urls.mjs <file-or-dir>...      check URLs in the given files/directories
 *   node verify-urls.mjs --diff [base]          check URLs on lines added since `base` (default: main)
 *
 * Checks:
 *   - HTTP status is 2xx (after redirects)
 *   - anchor exists on the target page: `id="x"` / `name="x"` in HTML, or for GitHub
 *     markdown blobs an explicit `<a name="x">` or a heading whose GitHub slug is `x`.
 *     A missing anchor is BROKEN on markdown sources and on HTML pages with server-rendered
 *     ids (e.g. a2a-protocol.org); UNVERIFIED only on pages that may render anchors client-side.
 *
 * Exit code 1 when any URL or anchor is broken.
 */
import { execFileSync } from 'node:child_process';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const URL_RE = /https?:\/\/[^\s'"`)<>\]\\]+/g;
const SKIP_HOSTS = new Set(['localhost', '127.0.0.1']);
// RFC 2606 reserved example domains appear in sample values, not real links
const isExampleHost = (hostname) => /(^|\.)example\.(com|org|net)$/.test(hostname);

const walk = (path) => {
  if (statSync(path).isDirectory()) {
    return readdirSync(path)
      .filter((name) => name !== 'node_modules' && !name.startsWith('.'))
      .flatMap((name) => walk(join(path, name)));
  }
  return /\.(ts|md|json|yaml|yml)$/.test(path) ? [path] : [];
};

const collectFromFiles = (paths) => {
  const found = new Map();
  for (const file of paths.flatMap(walk)) {
    readFileSync(file, 'utf8')
      .split('\n')
      .forEach((line, i) => {
        for (const [url] of line.matchAll(URL_RE)) {
          if (!found.has(url)) found.set(url, `${file}:${i + 1}`);
        }
      });
  }
  return found;
};

const collectFromDiff = (base) => {
  const diff = execFileSync('git', ['diff', '--unified=0', `${base}...HEAD`], {
    encoding: 'utf8',
    maxBuffer: 256 * 1024 * 1024,
  });
  const found = new Map();
  let file = '';
  for (const line of diff.split('\n')) {
    if (line.startsWith('+++ ')) file = line.slice(6);
    else if (line.startsWith('+')) {
      for (const [url] of line.matchAll(URL_RE)) if (!found.has(url)) found.set(url, file);
    }
  }
  return found;
};

const githubSlug = (heading) =>
  heading
    .trim()
    .toLowerCase()
    .replace(/<[^>]+>/g, '')
    .replace(/[^\p{L}\p{N}\s_-]/gu, '')
    .replace(/\s/g, '-');

const pageCache = new Map();
const fetchPage = async (pageUrl) => {
  if (!pageCache.has(pageUrl)) {
    pageCache.set(
      pageUrl,
      (async () => {
        const blob = pageUrl.match(/^https:\/\/github\.com\/([^/]+\/[^/]+)\/blob\/(.+\.md)$/);
        const fetchUrl = blob ? `https://raw.githubusercontent.com/${blob[1]}/${blob[2]}` : pageUrl;
        try {
          const res = await fetch(fetchUrl, { redirect: 'follow' });
          const text = res.ok ? await res.text() : '';
          return { status: res.status, text, markdown: Boolean(blob) };
        } catch (error) {
          return { status: 0, text: '', error: error.message };
        }
      })(),
    );
  }
  return pageCache.get(pageUrl);
};

const hasAnchor = ({ text, markdown }, anchor) => {
  const escaped = anchor.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  if (new RegExp(`(id|name)=["']${escaped}["']`).test(text)) return true;
  if (!markdown) return false;
  return text
    .split('\n')
    .filter((line) => /^#{1,6}\s/.test(line))
    .some((line) => githubSlug(line.replace(/^#+\s*/, '')) === anchor);
};

// enough heading ids in the HTML to trust that anchors are rendered server-side
const SERVER_RENDERED_ID_THRESHOLD = 20;
const hasServerRenderedIds = ({ text }) =>
  (text.match(/\sid=["'][^"']+["']/g) ?? []).length >= SERVER_RENDERED_ID_THRESHOLD;

const args = process.argv.slice(2);
if (args.length === 0) {
  console.error('Usage: node verify-urls.mjs <file-or-dir>... | --diff [base]');
  process.exit(2);
}
const urls = args[0] === '--diff' ? collectFromDiff(args[1] ?? 'main') : collectFromFiles(args);

const RETRYABLE = new Set([429, 502, 503, 504]);
const results = { broken: [], unverified: [] };

const checkUrl = async ([raw, where]) => {
  const url = raw.replace(/[.,;:]+$/, '');
  // skip templated example URLs such as https://{username}.server.com:{port}/
  if (/[{}]/.test(url) || !URL.canParse(url)) return;
  const { hostname } = new URL(url);
  if (SKIP_HOSTS.has(hostname) || isExampleHost(hostname)) return;
  const [pageUrl, anchor] = url.split('#');
  const page = await fetchPage(pageUrl);
  if (page.status === 0 || RETRYABLE.has(page.status)) {
    results.unverified.push(`${url}  (HTTP ${page.status || page.error})  ${where}`);
  } else if (page.status < 200 || page.status >= 300) {
    results.broken.push(`${url}  (HTTP ${page.status})  ${where}`);
  } else if (anchor && !hasAnchor(page, decodeURIComponent(anchor))) {
    // Markdown sources are authoritative. HTML pages that already carry server-rendered anchors
    // (static site generators such as MkDocs) are too: a missing anchor there is a broken link.
    // Only pages without server-rendered ids may add anchors client-side.
    const bucket =
      page.markdown || hasServerRenderedIds(page) ? results.broken : results.unverified;
    bucket.push(`${url}  (anchor #${anchor} not found)  ${where}`);
  }
};

// small worker pool: avoids GitHub rate limiting (HTTP 429/503)
const queue = [...urls];
await Promise.all(
  Array.from({ length: 6 }, async () => {
    while (queue.length > 0) await checkUrl(queue.shift());
  }),
);

for (const line of results.unverified.sort()) console.log(`UNVERIFIED  ${line}`);
for (const line of results.broken.sort()) console.log(`BROKEN      ${line}`);
console.log(
  `\nChecked ${urls.size} URL(s): ${results.broken.length} broken, ` +
    `${results.unverified.length} unverified (rate limited, network error, or client-rendered anchor).`,
);
process.exit(results.broken.length > 0 ? 1 : 0);
