import fs from 'fs';
import util from 'util';
import path from 'path';
import stampit from 'stampit';
import { hasIn } from 'ramda';
import { isNotUndefined } from 'ramda-adjunct';
import { transclude, toValue } from 'apidom';
import { visit, isReferenceElement } from 'apidom-ns-openapi-3-1';
// @ts-ignore
import { parse } from 'apidom-parser-adapter-openapi-json-3-1';
import { evaluate, uriToPointer } from '../src/selectors/json-pointer';

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

      // follow the reference
      if (isReferenceElement(fragment)) {
        const innerReference = fragment;
        const visitor = DereferenceVisitor({
          element: this.element,
          indirections: [...this.indirections, innerReference],
        });
        visit(innerReference, visitor);

        fragment = evaluate(jsonPointer, this.element);
      }

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
    visit(api, visitor);

    console.log(util.inspect(toValue(api), true, null, true));
  });
});
