import { expect } from 'chai';
import { sexprs } from '@swagger-api/apidom-core';

import { StepElement } from '../../../../src';

describe('refractor', function () {
  context('elements', function () {
    context('StepElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const stepElement = StepElement.refract({
          description: 'Search for available pets',
          stepId: 'searchForPet',
          operationId: 'getPets',
          operationRef:
            'https://petstore3.swagger.io/api/v3/openapi.json#/paths/users/~findbystatus~1{status}/get',
          workflowId: 'uniqueWorkflowId',
          parameters: [
            {
              name: 'status',
              in: 'query',
              value: 'available',
            },
            {
              $ref: '#/json/pointer',
            },
          ],
          dependsOn: ['someStepId'],
          successCriteria: [
            {
              context: '$statusCode',
              condition: '^503$',
              type: 'regex',
            },
          ],
          onSuccess: [
            {
              type: 'goto',
              workflowId: 'uniqueWorkflowId',
              stepId: 'getPetStep',
              criteria: [
                {
                  context: '$statusCode',
                  condition: '^200$',
                  type: 'regex',
                },
              ],
            },
          ],
          onFailure: [
            {
              type: 'retry',
              workflowId: 'uniqueWorkflowId',
              stepId: 'getPetStep',
              retryAfter: 500,
              retryLimit: 5,
              criteria: [
                {
                  context: '$statusCode',
                  condition: '^503$',
                  type: 'regex',
                },
              ],
            },
          ],
          outputs: [{ key: 'value' }],
        });

        expect(sexprs(stepElement)).toMatchSnapshot();
      });
    });
  });
});
