import {
  ApidomCompletionItem,
  CompletionFormat,
  CompletionType,
} from '../../../../../../apidom-language-types.ts';

const completion: ApidomCompletionItem[] = [
  {
    label: 'jmsConnectionFactory',
    insertText: 'jmsConnectionFactory',
    kind: 14,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '`string`\n\\\n\\\n**Required**. The classname of the [ConnectionFactory](https://docs.oracle.com/javaee/7/api/javax/jms/ConnectionFactory.html) implementation for the JMS Provider.',
    },
    conditions: [
      {
        targets: [{ path: 'bindingVersion' }],
        function: 'apilintValueOrArray',
        params: [['0.0.1']],
      },
    ],
  },
  {
    label: 'properties',
    insertText: 'properties',
    kind: 14,
    format: CompletionFormat.ARRAY,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '[object]\n\\\n\\\n**Optional**. Additional properties to set on the JMS ConnectionFactory implementation for the JMS Provider.',
    },
    conditions: [
      {
        targets: [{ path: 'bindingVersion' }],
        function: 'apilintValueOrArray',
        params: [['0.0.1']],
      },
    ],
  },
  {
    label: 'clientID',
    insertText: 'clientID',
    kind: 14,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        "`string`\n\\\n\\\n**Optional**. A client identifier for applications that use this JMS connection factory. If the Client ID Policy is set to 'Restricted' (the default), then configuring a Client ID on the ConnectionFactory prevents more than one JMS client from using a connection from this factory.",
    },
    conditions: [
      {
        targets: [{ path: 'bindingVersion' }],
        function: 'apilintValueOrArray',
        params: [['0.0.1']],
      },
    ],
  },
];

export default completion;
