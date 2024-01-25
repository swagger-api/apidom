export type AnyObject = { [key: string]: any };

export const context: AnyObject = {
  apiFolder: 'io/swagger/client/api',
  developerEmail: 'apiteam@swagger.io',
  hasAuthMethods: true,
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
              vendorExtensions: 'test as ss',
              contents: [
                {
                  foo: 'bar',
                },
              ],
            },
          ],
        },
      },
    ],
  },
};
