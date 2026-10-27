import { expect } from 'chai';
import { ArrayElement, sexprs } from '@swagger-api/apidom-core';
import {
  LinkDescriptionElement,
  isLinkDescriptionElement,
} from '@swagger-api/apidom-ns-json-schema-2020-12';

import {
  ArazzoSpecification1Element,
  WorkflowElement,
  isJSONSchemaElement,
} from '../../../../src/index.ts';

describe('refractor', function () {
  context('elements', function () {
    context('ArazzoSpecification1Element', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const arazzoSpecification1Element = ArazzoSpecification1Element.refract({
          arazzo: '1.0.1',
          info: {},
          sourceDescriptions: [{}],
          workflows: [{}],
          components: {},
        });

        expect(sexprs(arazzoSpecification1Element)).toMatchSnapshot();
      });

      context('given Workflow inputs with Hyper-Schema links', function () {
        specify('should refract links to Link Description Objects', function () {
          const arazzoSpecification1Element = ArazzoSpecification1Element.refract({
            arazzo: '1.0.1',
            info: { title: 'Links', version: '1.0.0' },
            sourceDescriptions: [{ name: 'api', url: 'https://example.com/openapi.json' }],
            workflows: [
              {
                workflowId: 'getUser',
                inputs: {
                  type: 'object',
                  links: [{ rel: 'self', href: '/users/{id}', targetSchema: { type: 'object' } }],
                },
                steps: [],
              },
            ],
          }) as ArazzoSpecification1Element;
          const workflow = arazzoSpecification1Element.workflows?.get(0) as WorkflowElement;
          const links = workflow.inputs?.get('links') as ArrayElement;
          const linkDescription = links.get(0) as LinkDescriptionElement;

          expect(isJSONSchemaElement(workflow.inputs)).to.be.true;
          expect(isLinkDescriptionElement(linkDescription)).to.be.true;
          expect(isJSONSchemaElement(linkDescription.targetSchema)).to.be.true;
        });
      });
    });
  });
});
