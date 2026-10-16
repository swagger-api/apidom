# Phase Branches and Pull Requests

Every phase ends with exactly one pull request. PRs are **stacked**: phase n branches from phase n-1's branch while that PR is open, and from `main` once it is merged. A phase counts as complete as soon as its PR is open (or merged, or its code is on `main`).

## Names

| Phase | Branch | PR title / commit header |
|-------|--------|--------------------------|
| 1 | `feat/{spec}-{version}/phase-1` | `feat(ns-{spec}-{major}): add support for {Spec} {version}` (new variant: `feat(ns-{spec}-{x}-{y}): add {Spec} {x.y} namespace`) |
| 2 | `feat/{spec}-{version}/phase-2` | `feat(parser-adapters): add support for {Spec} {version}` |
| 3 | `feat/{spec}-{version}/phase-3` | `feat(reference): add support for {Spec} {version}` |
| 4 | `feat/{spec}-{version}/phase-4` | `feat(ls): add support for {Spec} {version}` |

`{version}` is the full version (`3.1.0`). `scripts/phase-status.mjs` finds PRs by these branch names, so keep them exact. Headers must stay under 75 characters (commitlint).

## Starting a phase

```bash
git fetch origin
node .claude/skills/add-spec-version/scripts/phase-status.mjs --spec {spec} --version {version}
git switch -c feat/{spec}-{version}/phase-{n} {FROM}     # FROM and PR BASE as printed by phase-status
```

If the working tree has unrelated changes, stop and ask the user before switching branches.

## Opening the PR

1. Gate for the phase passed (see SKILL.md). Never open a PR with a failing gate; if something can't be fixed in this phase, say so in the PR body under "Known gaps".
2. Commit with the header above. Body: what the phase adds, in prose; `Refs #{issue}` if the user gave one. End with the attribution trailer from the session instructions.
3. Show the user the branch, base, title, body and changed-file summary, and ask for confirmation. Pushing and opening a PR publish the work.
4. Push and open:
   ```bash
   git push -u origin feat/{spec}-{version}/phase-{n}
   gh pr create --base {PR BASE} --head feat/{spec}-{version}/phase-{n} --title "{title}" --body-file {body-file}
   ```
5. Record the PR URL and gate results in the tracking doc.

### PR body template

```markdown
Phase {n} of 4 for {Spec} {version} support: {namespace | parser adapters | apidom-reference | apidom-ls}.

Depends on #{previous PR} (stacked; base is `{PR BASE}`).    <- omit for phase 1 or when PR BASE is main

## Changes
- ...

## Verification
- build / typescript:check-types / lint / test: pass
- check-redefined-fields: 0 REDEFINED            <- phase 1
- verify-urls: 0 BROKEN
- field-map coverage: all NEW fields covered      <- phases 1, 4

## Known gaps
- none

Refs #{issue} / {Jira key}

🤖 Generated with [Claude Code](https://claude.com/claude-code)
```

## Keeping the stack consistent

- **Review changes on an earlier phase**: commit on that phase's branch, then rebase each later branch onto its updated predecessor and force-push with lease:
  ```bash
  git switch feat/{spec}-{version}/phase-{n+1}
  git rebase feat/{spec}-{version}/phase-{n}
  git push --force-with-lease
  ```
  Ask the user before any force-push.
- **Earlier phase merged** (usually squash-merged): retarget the next PR to `main` and drop the already-merged commits:
  ```bash
  gh pr edit {next PR} --base main
  git switch feat/{spec}-{version}/phase-{n+1}
  git rebase --onto origin/main feat/{spec}-{version}/phase-{n}
  git push --force-with-lease
  ```
- Never merge PRs yourself; merging is the reviewers' call.
