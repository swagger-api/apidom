# Spec Field Extraction

Detailed guidance for building the **spec field map** (Phase 2 of `SKILL.md`): which source to trust, how to fetch long spec pages, how to identify the required-field format, and how to verify you extracted the actual Fixed Fields table rather than a TOC entry.

## CRITICAL: Source of Truth

**Always verify against the official specification page**, not secondary sources (definitions pages, proto files, JSON schemas). These secondary sources can diverge from the spec in required/optional designations.

For specs with a normative proto file or JSON Schema, use the spec page first. If the spec page cannot be fully fetched (too long), use curl + Python to extract the relevant section:

```bash
curl -s "{spec-url}" | python3 -c "
import sys, re
from html.parser import HTMLParser

class TextExtractor(HTMLParser):
    def __init__(self):
        super().__init__()
        self.text = []
    def handle_data(self, data):
        stripped = data.strip()
        if stripped:
            self.text.append(stripped)

parser = TextExtractor()
parser.feed(sys.stdin.read())
full = '\n'.join(parser.text)

# Find target section — adjust pattern as needed
positions = [m.start() for m in re.finditer('4\\.5\\. Security Objects', full)]
start = positions[-1]  # last occurrence = actual content (earlier ones are TOC)
print(full[start:start+20000])
"
```

**Always use the last occurrence** of a section heading — earlier occurrences are usually the table of contents, not the actual content.

## Phase 2 Detail: Build the Spec Field Map

Fetch every object definition from the spec. For each object record:
- Exact camelCase field name as used in JSON (see §5.5 JSON Field Naming Convention or equivalent)
- Required: Yes / No
- Type
- **New vs inherited** (if this spec extends a parent version): explicitly mark each field as NEW (added in this version) or INHERITED (already in parent). Only NEW fields need to be added to the implementation; INHERITED fields must already be present. Cross-check by reading the parent version's element files.

**Key pitfalls:**
- An object may be referenced as a field type within a parent but have **no definition of its own** (no section, no field table) — do not invent required/optional status for its fields
- Fields that are alternatives of a union / `oneOf` (only one of them may be present) are not individually required, even if the union itself is required
- A "MUST contain exactly one of" note on a union does **not** make any individual variant field required

**Fetch strategy when the page is too long:**
The spec page may truncate in `WebFetch`. Prefer the raw Markdown source when the spec is published from a repository (see below). Otherwise use the curl+Python approach above, searching for each section heading. Always take the **last** occurrence of a heading string (the actual content, not the TOC entry).

**Identify how the spec marks required fields — before building the map:**
Specs express required status in different ways. Determine which one applies by inspecting one known object first:

| Format | Example specs | What a required field looks like |
|---|---|---|
| Separate `Required` column | A2A | `capabilities \| AgentCapabilities \| Yes \| A2A Capability set...` |
| Marker inside the Description column | OpenAPI, AsyncAPI, Arazzo | `openapi \| string \| **REQUIRED**. This string MUST be...` |
| Prose only (keyword descriptions) | JSON Schema | No required keywords; build the keyword map from the meta-schemas — see [JSON Schema Dialects](../SKILL.md#json-schema-dialects) |

For the description-marker format:
- A field is required **only** if its description starts with the `REQUIRED` marker (exact spelling/punctuation varies: `**REQUIRED**.` in OpenAPI, `**REQUIRED.**` in AsyncAPI). Its absence means optional — there is no `No` value to look for.
- Read the spec's preamble for the default rule, e.g. OpenAPI: *"if a field is not explicitly **REQUIRED** or described with a MUST or SHALL, it can be considered OPTIONAL."*
- Watch for **conditionally required** fields described in prose (e.g. OpenAPI Parameter `required` is REQUIRED and MUST be `true` when `in` is `"path"`). These need a conditional rule, not a plain `--required.ts`; note them separately in the field map.

**Prefer the raw Markdown source** when the spec is maintained as Markdown in a repository — tables are plain `|`-delimited rows, there is no client-side rendering, and the TOC is not interleaved with content:
- OpenAPI 3.2: `https://raw.githubusercontent.com/OAI/OpenAPI-Specification/main/versions/3.2.0.md`
- AsyncAPI 3.0: `https://raw.githubusercontent.com/asyncapi/spec/v3.0.0/spec/asyncapi.md`

```bash
# Print a field row from the Markdown source (works for both required-marker formats)
curl -s "{raw-markdown-url}" | grep -nE "^\|?\s*(<a name=\"[^\"]*\"></a>)?{fieldName}\s*\|"
```

**Mandatory table verification — do not skip:**
After extracting a section, confirm you actually have the Fixed Fields table and not just the TOC entry. The extracted text MUST contain the field rows with their required-status information, in the format identified above:
- Separate `Required` column: the field name AND a `Yes` / `No` value in the same row
- Description marker: the field name AND its full description text (so the presence or absence of the `REQUIRED` marker can be confirmed)

For HTML-only specs, use this pattern:

```bash
curl -s "{spec-url}" | python3 -c "
import sys, re
from html.parser import HTMLParser

class TextExtractor(HTMLParser):
    def __init__(self):
        super().__init__()
        self.text = []
    def handle_data(self, data):
        stripped = data.strip()
        if stripped:
            self.text.append(stripped)

parser = TextExtractor()
parser.feed(sys.stdin.read())
full = '\n'.join(parser.text)

# Section heading of the target object (adjust to the spec's heading style)
heading = r'\n[\d.]+\s*AgentCard\n'
# Next section heading — marks the end of the target section
next_heading = r'\n\d+(\.\d+)+\.?\s*\S+\n'
# Header of the Fixed Fields table: 'Required' (separate column) or 'Description'
table_header = 'Required'
# Required-status evidence: r'\n(Yes|No)\n' (separate column) or r'REQUIRED' (description marker)
required_marker = r'\n(Yes|No)\n'

for m in re.finditer(heading, full):
    body = full[m.end():m.end() + 8000]
    end = re.search(next_heading, body)
    section = body[:end.start()] if end else body
    # TOC entries are immediately followed by the next heading, so their section is empty
    if table_header in section and re.search(required_marker, section):
        print(section)
        break
else:
    print('NO FIXED FIELDS TABLE FOUND')
"
```

Anchor on the object's **section heading**, not on any occurrence of the object name — the name also appears in other objects' tables and method descriptions (e.g. `AgentCard` occurs in the request/response tables of operations returning it), which would otherwise yield the wrong table.

Notes:
- For description-marker specs, an object with no required fields will legitimately contain no `REQUIRED` marker — in that case confirm the table by its header and field rows instead, and record all fields as optional.
- If no occurrence contains the table, the spec page is likely rendering client-side and the table was not captured — try `curl -L` or fetch the raw source directly.

