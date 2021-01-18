import fs from 'fs';
import util from 'util';
import path from 'path';
import stampit from 'stampit';
import { hasIn } from 'ramda';
import { isNotUndefined } from 'ramda-adjunct';
import { transclude, toValue } from 'apidom';
import { visit } from 'apidom-ns-openapi-3-1';
// @ts-ignore
import { parse } from 'apidom-parser-adapter-openapi-json-3-1';
import { evaluate, uriToPointer } from '../src/selectors/json-pointer';

// @ts-ignore
const visitAsync = visit[Symbol.for('nodejs.util.promisify.custom')];

const DereferenceVisitor = stampit({
  props: {
    element: null,
    indirections: [],
  },
  init({ element, indirections = [] }) {
    this.element = element;
    this.indirections = indirections;
  },
  methods: {
    reference(element) {
      this.indirections.push(element);

      const jsonPointer = uriToPointer(element.$ref.toValue());
      let fragment = evaluate(jsonPointer, this.element);

      // detect direct or circular reference
      if (this.indirections.includes(fragment)) {
        throw new Error('Recursive JSON Pointer detected');
      }

      // dive deep into the fragment
      const visitor = DereferenceVisitor({
        element: this.element,
        indirections: [...this.indirections, fragment],
      });
      visitAsync(fragment, visitor);

      /**
       * Re-evaluate the JSON Pointer against the fragment as the fragment could
       * have been another reference and the previous deep dive into fragment
       * dereferenced it.
       */
      fragment = evaluate(jsonPointer, this.element);

      // override description and summary (outer has higher priority then inner)
      const hasDescription = isNotUndefined(element.description);
      const hasSummary = isNotUndefined(element.summary);
      if (hasDescription || hasSummary) {
        fragment = fragment.clone();

        if (hasDescription && hasIn('description', fragment)) {
          // @ts-ignore
          fragment.description = element.description;
        }
        if (hasSummary && hasIn('summary', fragment)) {
          // @ts-ignore
          fragment.summary = element.summary;
        }
      }

      // transclude the element for a fragment
      this.element = transclude(element, fragment, this.element);
      this.indirections.pop();
    },
  },
});

describe('dereference', function () {
  specify('should dereference', async function () {
    const fixturePath = path.join(__dirname, 'fixtures', 'dereference', 'reference-objects.json');
    const source = fs.readFileSync(fixturePath).toString();
    const parseResult = await parse(source);
    const { api } = parseResult;

    const visitor = DereferenceVisitor({ element: api });
    await visitAsync(api, visitor);

    console.log(util.inspect(toValue(api), true, null, true));
  });
});
