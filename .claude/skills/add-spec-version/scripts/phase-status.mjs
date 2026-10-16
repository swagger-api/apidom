#!/usr/bin/env node
/**
 * Reports which of the four add-spec-version phases are complete for a spec version, and
 * which phase may start next (and from which branch).
 */
import { execFileSync } from 'node:child_process';

import { parseCli } from './lib/cli.mjs';

const USAGE = `
Usage:
  node phase-status.mjs --spec <spec> --version <x.y.z> [--phase <n>] [--field <f>]
    [--no-version-field] [--base <ref>]

  --spec              spec id used in package names (openapi, asyncapi, arazzo, a2a, ...)
  --version           full spec version (3.1.0)
  --phase             phase you intend to start (1-4); exit code 1 unless all earlier phases
                      are DONE
  --field             root version field in documents (default: --spec)
  --no-version-field  the spec's documents carry no version field (A2A Agent Cards): phase 3
                      evidence is the presence of apidom-reference parsers
                      src/parse/parsers/{spec}-json-* and {spec}-yaml-*, which is not
                      version-specific. Applied automatically when no apidom-reference test
                      contains a \`{field}:\` key at all.
  --base              ref that counts as merged (default: origin/main; run \`git fetch\` first)
  -h, --help          show this help

A phase is complete (DONE) when its code evidence is present on --base (merged), or when a PR
for its branch \`feat/{spec}-{version}/phase-{n}\` is open or merged. Phases are stacked: phase n
branches from phase n-1's branch while that PR is open, otherwise from --base. FROM is the ref to
branch from, PR BASE the branch the PR targets.

Code evidence (tracked and untracked files, checked on --base and on the working tree):
  1 namespace        packages/apidom-ns-{spec}-*/src/media-types.ts contains \`version={version}\`
  2 parser adapters  JSON and YAML adapter READMEs list \`version={version}\` media types
  3 reference        packages/apidom-reference/test contains a \`{field}: {version}\` document
                     (--no-version-field: reference parser directories exist)
  4 language service packages/apidom-ls/src/config/{spec}/target-specs.ts declares
                     \`version: '{version}'\`
Lines asserting non-detection (\`isFalse\`) don't count as evidence.

Exit codes:
  0  with --phase n: phases 1..n-1 are all DONE. Without --phase: no gap, i.e. no phase is
     incomplete while a later one has code or a PR (all complete also exits 0)
  1  with --phase n: a phase before n is not DONE (MISSING or CODE ONLY). Without --phase: a gap
     (e.g. phase 3 MISSING while phase 4 is DONE)
  2  usage error
`;

const { values: args } = parseCli(USAGE, {
  options: {
    spec: { type: 'string' },
    version: { type: 'string' },
    phase: { type: 'string' },
    field: { type: 'string' },
    'no-version-field': { type: 'boolean', default: false },
    base: { type: 'string' },
  },
  validate: ({ values }) => {
    if (!values.spec || !values.version) return '--spec and --version are required';
    if (!/^\d+\.\d+\.\d+$/.test(values.version)) return '--version must look like x.y.z';
    if (values.phase !== undefined && !/^[1-4]$/.test(values.phase)) return '--phase must be 1-4';
    return undefined;
  },
});
const { spec, version } = args;
const requestedPhase = args.phase === undefined ? undefined : Number(args.phase);
const field = args.field ?? spec;
const base = args.base ?? 'origin/main';
const esc = version.replaceAll('.', '\\.');
const mediaTypeNeedle = `version=${esc}([^0-9]|$)`;
const docNeedle = `"?${field}"?[[:space:]]*:[[:space:]]*["']?${esc}([^0-9]|$)`;

const PHASES = [
  {
    n: 1,
    name: 'namespace',
    checks: [
      { pattern: mediaTypeNeedle, paths: [`packages/apidom-ns-${spec}-*/src/media-types.ts`] },
    ],
  },
  {
    n: 2,
    name: 'parser-adapters',
    checks: [
      {
        pattern: mediaTypeNeedle,
        paths: [`packages/apidom-parser-adapter-${spec}-json-*/README.md`],
      },
      {
        pattern: mediaTypeNeedle,
        paths: [`packages/apidom-parser-adapter-${spec}-yaml-*/README.md`],
      },
    ],
  },
  {
    n: 3,
    name: 'reference',
    checks: [{ pattern: docNeedle, paths: ['packages/apidom-reference/test'] }],
  },
  {
    n: 4,
    name: 'ls',
    checks: [
      {
        pattern: `namespace:[[:space:]]*'${spec}',[[:space:]]*version:[[:space:]]*'${esc}'`,
        paths: [`packages/apidom-ls/src/config/${spec}/target-specs.ts`],
      },
    ],
  },
];

const run = (cmd, cmdArgs) => {
  try {
    return execFileSync(cmd, cmdArgs, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] });
  } catch (error) {
    // git grep exits 1 when nothing matches
    return error.status === 1 ? '' : null;
  }
};

const grepFiles = (ref, { pattern, paths }) => {
  const refArgs = ref ? [ref] : ['--untracked'];
  const pathspecs = paths.flatMap((p) => [`:(glob)${p}`, `:(glob)${p}/**`]);
  const out = run('git', ['grep', '-n', '-E', '-I', pattern, ...refArgs, '--', ...pathspecs]);
  if (out === null) return null;
  const lines = out.split('\n').filter((line) => line && !/isFalse/.test(line));
  return [
    ...new Set(
      lines.map((line) =>
        line
          .split(':')
          .slice(0, ref ? 2 : 1)
          .join(':'),
      ),
    ),
  ];
};

const hasEvidence = (ref, phase) =>
  phase.checks.every((check) => {
    const files = grepFiles(ref, check);
    return files !== null && files.length > 0;
  });

const baseExists = run('git', ['rev-parse', '--verify', '--quiet', base]) !== null;
if (!baseExists) console.warn(`warning: base ref ${base} not found; merged state not checked`);

// specs whose documents carry no version field (A2A Agent Cards) can't match `{field}: {version}`
const REFERENCE_TEST = 'packages/apidom-reference/test';
const fieldKeyNeedle = `(^|[^A-Za-z0-9_-])"?${field}"?[[:space:]]*:`;
const fieldSeen = [baseExists ? base : null, undefined]
  .filter((ref) => ref !== null)
  .some(
    (ref) =>
      (grepFiles(ref, { pattern: fieldKeyNeedle, paths: [REFERENCE_TEST] }) ?? []).length > 0,
  );
const noVersionField = args['no-version-field'] || !fieldSeen;
if (noVersionField) {
  if (!args['no-version-field'])
    console.warn(
      `note: no apidom-reference test contains a "${field}:" key; assuming the spec has no ` +
        'version field (pass --field if it has one)',
    );
  PHASES[2].checks = ['json', 'yaml'].map((format) => ({
    pattern: '.',
    paths: [`packages/apidom-reference/src/parse/parsers/${spec}-${format}-*`],
  }));
  PHASES[2].note = 'parser dirs; not version-specific';
}

const ghAvailable = run('gh', ['--version']) !== null;
if (!ghAvailable) console.warn('warning: gh CLI unavailable; PR state not checked');

const branchFor = (n) => `feat/${spec}-${version}/phase-${n}`;
const prFor = (n) => {
  if (!ghAvailable) return undefined;
  const out = run('gh', [
    'pr',
    'list',
    '--state',
    'all',
    '--head',
    branchFor(n),
    '--json',
    'number,state,url,baseRefName',
  ]);
  if (!out) return undefined;
  const prs = JSON.parse(out);
  return prs.find((pr) => pr.state === 'OPEN') ?? prs.find((pr) => pr.state === 'MERGED') ?? prs[0];
};

const results = PHASES.map((phase) => {
  const merged = baseExists && hasEvidence(base, phase);
  const local = hasEvidence(undefined, phase);
  const pr = prFor(phase.n);
  let status;
  if (merged) status = 'DONE (on base)';
  else if (pr?.state === 'MERGED') status = `DONE (PR #${pr.number} merged)`;
  else if (pr?.state === 'OPEN') status = `DONE (PR #${pr.number} open)`;
  else if (local) status = 'CODE ONLY (no PR yet)';
  else status = 'MISSING';
  return { ...phase, merged, local, pr, status, done: status.startsWith('DONE') };
});

const fieldText = noVersionField ? 'no version field' : `field "${field}"`;
console.log(`${spec} ${version} (${fieldText}, base ${base})\n`);
for (const r of results) {
  const pr = r.pr ? `  ${r.pr.url} [${r.pr.state}, base ${r.pr.baseRefName}]` : '';
  const note = r.note ? `  (${r.note})` : '';
  console.log(`Phase ${r.n} ${r.name.padEnd(16)} ${r.status}${pr}${note}`);
}

// exit code: earlier phases incomplete before the requested phase, or a gap in the sequence
const started = (r) => r.done || r.local || Boolean(r.pr);
const blocking =
  requestedPhase === undefined
    ? results.filter((r) => !r.done && results.some((later) => later.n > r.n && started(later)))
    : results.filter((r) => r.n < requestedPhase && !r.done);
const exitCode = blocking.length > 0 ? 1 : 0;
const explainBlocking = () => {
  if (blocking.length === 0) return;
  const list = blocking.map((r) => `${r.n} (${r.name}: ${r.status})`).join(', ');
  console.log(
    requestedPhase === undefined
      ? `\nGAP: phase(s) ${list} incomplete although a later phase has code or a PR.`
      : `\nBLOCKED: phase ${requestedPhase} requested, but earlier phase(s) ${list} are not DONE.`,
  );
};

const next = results.find((r) => !r.done);
if (!next) {
  console.log('\nAll phases complete.');
  process.exit(0);
}
const prev = results[next.n - 2];
const from = prev?.pr?.state === 'OPEN' && !prev.merged ? branchFor(prev.n) : base;
console.log(`\nNEXT PHASE: ${next.n} (${next.name})`);
console.log(`BRANCH:     ${branchFor(next.n)}`);
console.log(`FROM:       ${from}`);
console.log(`PR BASE:    ${from.replace(/^origin\//, '')}`);

// Fallback hint for phases done outside the branch convention (other branch names, manual PRs)
if (ghAvailable) {
  const out = run('gh', [
    'pr',
    'list',
    '--state',
    'open',
    '--search',
    `${version} in:title`,
    '--json',
    'number,title,headRefName,url',
  ]);
  const candidates = out ? JSON.parse(out) : [];
  if (candidates.length > 0) {
    console.log(
      '\nOpen PRs mentioning this version (may be phases done under other branch names):',
    );
    for (const c of candidates)
      console.log(`  #${c.number} ${c.title} [${c.headRefName}] ${c.url}`);
  }
}

explainBlocking();
process.exit(exitCode);
