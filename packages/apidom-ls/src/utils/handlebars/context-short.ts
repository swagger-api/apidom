import { AnyObject } from '../../apidom-language-types';

export const context: AnyObject = {
  apiFolder: 'io/swagger/client/api',
  developerEmail: 'apiteam@swagger.io',
  hasAuthMethods: true,
  testObjEach: {
    testObjEachInner1: {
      testInnerVal: 'nnn',
      testInnerVal2: 'vvv',
      testInnerVal11: 'vvv',
    },
    testObjEachInner2: {
      testInnerVal: 'nnn2',
      testInnerVal2: 'vvv2',
      testInnerVal12: 'vvv',
    },
    testObjEachInner3: {
      testInnerVal: 'nnn3',
      testInnerVal2: 'vvv3',
      testInnerVal13: 'vvv',
    },
  },
  authMethods: [
    {
      isBasic: true,
    },
  ],
  apiInfo: {
    testBoolean: true,
    apis: [
      {
        hasModel: true,
        modelPackage: 'io.swagger.client.model',
        operations: {
          classname: 'PetApi',
          testBoolean2: true,
          operation: [
            {
              authMethods: [
                {
                  isBasic: true,
                },
              ],
              testBoolean3: true,
              testObj: {
                testObjVal: 'assa',
                testObjInner: {
                  testInnerVal: 'nnn',
                },
              },
              vendorExtensions: 'test as ss',
              contents: [
                {
                  foo: 'bar',
                  gddd: 'aaa',
                },
              ],
            },
          ],
        },
      },
    ],
  },
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function getContext(processed: boolean): AnyObject {
  return context;
}
