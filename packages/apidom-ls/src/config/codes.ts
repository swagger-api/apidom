enum ApilintCodes {
  SCHEMA_TYPE = 10001,
  SCHEMA_MAXLENGTH,
  SCHEMA_MAXLENGTH_NONSTRING,
  SCHEMA_MINLENGTH,
  SCHEMA_MINLENGTH_NONSTRING,
  SCHEMA_ID,
  SCHEMA_REF,
  SCHEMA_REF_NOSIBLINGS,
  SCHEMA_ENUM,
  SCHEMA_MULTIPLEOF,
  SCHEMA_PATTERN,
  SCHEMA_DISCRIMINATOR,
  SCHEMA_DISCRIMINATOR_EXIST,
  SCHEMA_MAXIMUM,
  SCHEMA_MINUMUM,
  SCHEMA_EXCLUSIVEMAXIMUM,
  SCHEMA_EXCLUSIVEMINUMUM,
  SCHEMA_ITEMS,
  SCHEMA_ITEMS_NONARRAY,
  SCHEMA_ADDITIONALITEMS,
  SCHEMA_ADDITIONALITEMS_NONARRAY,
  SCHEMA_MAXITEMS,
  SCHEMA_MAXITEMS_NONARRAY,
  SCHEMA_MINITEMS,
  SCHEMA_MINITEMS_NONARRAY,
  SCHEMA_UNIQUEITEMS,
  SCHEMA_UNIQUEITEMS_NONARRAY,
  SCHEMA_CONTAINS,
  SCHEMA_CONTAINS_NONARRAY,
  SCHEMA_MAXPROPERTIES,
  SCHEMA_MAXPROPERTIES_NONOBJECT,
  SCHEMA_MINPROPERTIES,
  SCHEMA_MINPROPERTIES_NONOBJECT,
  SCHEMA_REQUIRED,
  SCHEMA_REQUIRED_EXIST,
  SCHEMA_REQUIRED_NONOBJECT,
  SCHEMA_PROPERTIES,
  SCHEMA_PROPERTIES_NONOBJECT,
  SCHEMA_PROPERTIES_OBJECT,
  SCHEMA_PATTERNPROPERTIES,
  SCHEMA_PATTERNPROPERTIES_KEY,
  SCHEMA_PATTERNPROPERTIES_NONOBJECT,
  SCHEMA_PATTERNPROPERTIES_OBJECT,
  SCHEMA_ADDITIONALPROPERTIES,
  SCHEMA_ADDITIONALPROPERTIES_NONOBJECT,
  SCHEMA_PROPERTYNAMES,
  SCHEMA_PROPERTYNAMES_NONOBJECT,
  SCHEMA_IF,
  SCHEMA_IF_NONTHEN,
  SCHEMA_ELSE,
  SCHEMA_ELSE_NONIF,
  SCHEMA_THEN,
  SCHEMA_THEN_NONIF,
  SCHEMA_ALLOF,
  SCHEMA_ONEOF,
  SCHEMA_ANYOF,
  SCHEMA_NOT,
  SCHEMA_FORMAT,
  SCHEMA_CONTENTENCODING,
  SCHEMA_CONTENTENCODING_NONSTRING,
  SCHEMA_CONTENTMEDIATPE,
  SCHEMA_CONTENTMEDIATYPE_NONSTRING,
  SCHEMA_TITLE,
  SCHEMA_DESCRIPTION,
  SCHEMA_READONLY,
  SCHEMA_WRITEONLY,
  SCHEMA_EXAMPLES,
  ROOT_ID,
  ROOT_INFO,
  ASYNCAPI_ROOT_CHANNELS,
  ASYNCAPI_ASYNCAPIVERSION_2_0,
  ASYNCAPI_ASYNCAPIVERSION_2_1,
  ASYNCAPI_ASYNCAPIVERSION_2_2,
  ASYNCAPI_ASYNCAPIVERSION_2_3,
  ASYNCAPI_SECURITYSCHEME_TYPE_2_1__2_4,
  ASYNCAPI_SECURITYSCHEME_TYPE_2_0,
  INFO_DESCRIPTION,
  INFO_VERSION_REQUIRED,
  INFO_VERSION,
  CONTACT_NAME,
  EXTERNALDOC_OBJECT,
  EXTERNALDOC_URL_REQUIRED,
  EXTERNALDOC_URL,
  EXTERNALDOC_DESCRIPTION,
  SCHEMA_DEPRECATED,
  CONTACT_URL,
  CONTACT_EMAIL,
  ASYNCAPI_ASYNCAPIVERSION,
  ASYNCAPI_ASYNCAPIVERSION_REQUIRED,
  ASYNCAPI_ID,
  INFO_OBJECT,
  SERVERS_OBJECT,
  CHANNELS_OBJECT,
  COMPONENTS_OBJECT,
  TAGS_OBJECT,
  DEFAULTCONTENT_STRING,
  INFO_TITLE,
  INFO_TITLE_REQUIRED,
  INFO_TERMS,
  INFO_CONTACT,
  INFO_LICENSE,
  LICENSE_NAME,
  LICENSE_URL,
  LICENSE_NAME_REQUIRED,
  SERVER_URL_REQUIRED,
  SERVER_PROTOCOL_REQUIRED,
  SERVER_URL,
  SERVER_PROTOCOL,
  SERVER_PROTOCOL_VERSION,
  SERVER_DESCRIPTION,
  SERVER_VARIABLES,
  SERVER_VARIABLES_OBJECT,
  SERVER_URL_VARIABLE,
  SERVER_SECURITY,
  SERVER_SECURITY_KEYS,
  SERVER_BINDINGS,
  SECURITYREQUIREMENT_KEYS,
  SCHEMA_REQUIRED_KEYS,
  SERVERS_KEYS,
  SERVERS_SERVER_MEMBERS,
  SERVERVARIABLE_ENUM,
  SERVERVARIABLE_DEFAULT,
  SERVERVARIABLE_DESCRIPTION,
  SERVERVARIABLE_EXAMPLES,
  CHANNELS_CHANNEL_MEMBERS,
  CHANNEL_REF,
  CHANNEL_DESCRIPTION,
  CHANNEL_SERVERS,
  CHANNEL_SERVERS_KEYS,
  CHANNEL_SUBSCRIBE,
  CHANNEL_PUBLISH,
  CHANNEL_PARAMETERS,
  CHANNEL_BINDINGS,
  CHANNEL_REF_NOSIBLINGS,
  SERVER_BINDINGS_KEYS,
  OPERATION_ID,
  OPERATION_DESCRIPTION,
  OPERATION_SUMMARY,
  OPERATION_TAGS,
  OPERATION_EXTERNALDOCS,
  OPERATION_BINDINGS,
  OPERATION_TRAITS,
  OPERATION_MESSAGE,
  OPERATION_ID_UNIQUE,
  CHANNEL_PARAMETERS_EXIST,
  PARAMETER_DESCRIPTION,
  PARAMETER_SCHEMA,
  PARAMETER_LOCATION,
  PARAMETER_OBJECT,
  PARAMETER_REF,
  PARAMETER_REF_SIBLINGS,
  ALL_NOT_ALLOWED_FIELDS,
  SERVER_BINDING,
  SERVER_BINDING_HTTP,
  SERVER_BINDING_WS,
  SERVER_BINDING_KAFKA,
  SERVER_BINDING_ANYPOINTMQ,
  SERVER_BINDING_AMQP,
  SERVER_BINDING_AMQP1,
  SERVER_BINDING_MQTT,
  SERVER_BINDING_MQTT5,
  SERVER_BINDING_NATS,
  SERVER_BINDING_JMS,
  SERVER_BINDING_SNS,
  SERVER_BINDING_SOLACE,
  SERVER_BINDING_SQS,
  SERVER_BINDING_STOMP,
  SERVER_BINDING_REDIS,
  SERVER_BINDING_MERCURE,
  SERVER_BINDING_IBMMQ,
  MESSAGE_BINDING,
  MESSAGE_BINDING_HTTP,
  MESSAGE_BINDING_WS,
  MESSAGE_BINDING_KAFKA,
  MESSAGE_BINDING_ANYPOINTMQ,
  MESSAGE_BINDING_AMQP,
  MESSAGE_BINDING_AMQP1,
  MESSAGE_BINDING_MQTT,
  MESSAGE_BINDING_MQTT5,
  MESSAGE_BINDING_NATS,
  MESSAGE_BINDING_JMS,
  MESSAGE_BINDING_SNS,
  MESSAGE_BINDING_SOLACE,
  MESSAGE_BINDING_SQS,
  MESSAGE_BINDING_STOMP,
  MESSAGE_BINDING_REDIS,
  MESSAGE_BINDING_MERCURE,
  MESSAGE_BINDING_IBMMQ,
  MESSAGE_BINDING_HTTP_HEADERS,
  MESSAGE_BINDING_HTTP_BINDINGVERSION,
  MESSAGE_BINDING_KAFKA_KEY,
  MESSAGE_BINDING_KAFKA_BINDINGVERSION,
  MESSAGE_DESCRIPTION,
  MESSAGE_SUMMARY,
  MESSAGE_TAGS,
  MESSAGE_EXTERNALDOCS,
  MESSAGE_BINDINGS,
  MESSAGE_TRAITS,
  MESSAGE_HEADERS,
  MESSAGE_PAYLOAD,
  MESSAGE_CORRELATIONID,
  MESSAGE_SCHEMAFORMAT,
  MESSAGE_CONTENTTYPE,
  MESSAGE_NAME,
  MESSAGE_TITLE,
  MESSAGE_EXAMPLES,
  MESSAGE_REF,
  MESSAGE_REF_SIBLINGS,
  COMPONENTS_KEYS,
  COMPONENTS_SCHEMAS,
  COMPONENTS_SCHEMAS_OBJECT,
  COMPONENTS_MESSAGES,
  COMPONENTS_SECURITYSCHEMES,
  COMPONENTS_PARAMETERS,
  COMPONENTS_CORRELATIONIDS,
  COMPONENTS_OPERATIONTRAITS,
  COMPONENTS_MESSAGETRAITS,
  COMPONENTS_SERVERBINDINGS,
  COMPONENTS_CHANNELBINDINGS,
  COMPONENTS_OPERATIONBINDINGS,
  COMPONENTS_MESSAGEBINDINGS,
  DUPLICATE_KEYS,
  SCHEMA_REQUIRED_WITHOUT_PROPERTIES,
  OPERATION_BINDING_HTTP,
  OPERATION_BINDING_WS,
  OPERATION_BINDING_KAFKA,
  OPERATION_BINDING_ANYPOINTMQ,
  OPERATION_BINDING_AMQP,
  OPERATION_BINDING_AMQP1,
  OPERATION_BINDING_MQTT,
  OPERATION_BINDING_MQTT5,
  OPERATION_BINDING_NATS,
  OPERATION_BINDING_JMS,
  OPERATION_BINDING_SNS,
  OPERATION_BINDING_SOLACE,
  OPERATION_BINDING_SQS,
  OPERATION_BINDING_STOMP,
  OPERATION_BINDING_REDIS,
  OPERATION_BINDING_MERCURE,
  OPERATION_REF,
  OPERATION_REF_NO_SIBLINGS,
  CHANNEL_BINDING_HTTP,
  CHANNEL_BINDING_WS,
  CHANNEL_BINDING_KAFKA,
  CHANNEL_BINDING_ANYPOINTMQ,
  CHANNEL_BINDING_AMQP,
  CHANNEL_BINDING_AMQP1,
  CHANNEL_BINDING_MQTT,
  CHANNEL_BINDING_MQTT5,
  CHANNEL_BINDING_NATS,
  CHANNEL_BINDING_JMS,
  CHANNEL_BINDING_SNS,
  CHANNEL_BINDING_SOLACE,
  CHANNEL_BINDING_SQS,
  CHANNEL_BINDING_STOMP,
  CHANNEL_BINDING_REDIS,
  CHANNEL_BINDING_MERCURE,
  CHANNEL_BINDING_IBMMQ,
  INFO_SUMMARY,
  ASYNCAPI_ASYNCAPIVERSION_2_4,
  COMPONENTS_SERVERS,
  COMPONENTS_SERVER_VARIABLES,
  SERVER_REF,
  SERVER_REF_SIBLINGS,
  MESSAGE_ID,
  MESSAGE_TRAIT_BINDINGS,
  MESSAGE_TRAIT_CONTENTTYPE,
  MESSAGE_TRAIT_CORRELATIONID,
  MESSAGE_TRAIT_DESCRIPTION,
  MESSAGE_TRAIT_EXAMPLES,
  MESSAGE_TRAIT_HEADERS,
  MESSAGE_TRAIT_ID,
  MESSAGE_TRAIT_NAME,
  MESSAGE_TRAIT_REF,
  MESSAGE_TRAIT_REF_SIBLINGS,
  MESSAGE_TRAIT_SCHEMAFORMAT,
  MESSAGE_TRAIT_SUMMARY,
  MESSAGE_TRAIT_TAGS,
  MESSAGE_TRAIT_TITLE,
  TAG_DESCRIPTION,
  TAG_NAME,
  TAG_NAME_REQUIRED,
  CORRELATIONID_DESCRIPTION,
  CORRELATIONID_LOCATION,
  CORRELATIONID_LOCATION_REQUIRED,
  CORRELATIONID_REF,
  CORRELATIONID_REF_SIBLINGS,
  OAUTH_FLOWS_IMPLICIT,
  OAUTH_FLOWS_PASSWORD,
  OAUTH_FLOWS_CLIENT_CREDENTIALS,
  OAUTH_FLOWS_AUTHORIZATION_CODE,
  OAUTH_FLOW_AUTHORIZATION_URL,
  OAUTH_FLOW_AUTHORIZATION_URL_REQUIRED,
  OAUTH_FLOW_TOKEN_URL,
  OAUTH_FLOW_TOKEN_URL_REQUIRED,
  OAUTH_FLOW_REFRESH_URL,
  OAUTH_FLOW_SCOPES,
  OAUTH_FLOW_SCOPES_REQUIRED,
  ASYNCAPI_SECURITYSCHEME_DESCRIPTION,
  ASYNCAPI_SECURITYSCHEME_NAME,
  ASYNCAPI_SECURITYSCHEME_NAME_REQUIRED,
  ASYNCAPI_SECURITYSCHEME_IN,
  ASYNCAPI_SECURITYSCHEME_IN_REQUIRED,
  ASYNCAPI_SECURITYSCHEME_SCHEME,
  ASYNCAPI_SECURITYSCHEME_SCHEME_REQUIRED,
  ASYNCAPI_SECURITYSCHEME_BEARER_FORMAT,
  ASYNCAPI_SECURITYSCHEME_FLOWS,
  ASYNCAPI_SECURITYSCHEME_FLOWS_REQUIRED,
  ASYNCAPI_SECURITYSCHEME_OPEN_ID_CONNECT_URL,
  ASYNCAPI_SECURITYSCHEME_OPEN_ID_CONNECT_URL_REQUIRED,
  OPERATION_BINDING_HTTP_TYPE,
  OPERATION_BINDING_HTTP_TYPE_REQUIRED,
  OPERATION_BINDING_HTTP_METHOD,
  OPERATION_BINDING_HTTP_QUERY,
  OPERATION_BINDING_HTTP_BINDINGVERSION,
  OPERATION_BINDING_KAFKA_BINDINGVERSION,
  OPERATION_BINDING_KAFKA_GROUP_ID,
  OPERATION_BINDING_KAFKA_CLIENT_ID,
  CHANNEL_BINDING_WEBSOCKET_BINDINGVERSION,
  CHANNEL_BINDING_WEBSOCKET_METHOD,
  CHANNEL_BINDING_WEBSOCKET_QUERY,
  CHANNEL_BINDING_WEBSOCKET_HEADERS,
  MESSAGE_BINDING_ANYPOINTMQ_BINDINGVERSION,
  MESSAGE_BINDING_ANYPOINTMQ_HEADERS,
  CHANNEL_BINDING_ANYPOINTMQ_DESTINATION,
  CHANNEL_BINDING_ANYPOINTMQ_DESTINATION_TYPE,
  CHANNEL_BINDING_ANYPOINTMQ_BINDINGVERSION,
  OPERATION_BINDING_NATS_QUEUE,
  OPERATION_BINDING_NATS_QUEUE_MAX_LENGTH,
  OPERATION_BINDING_NATS_BINDINGVERSION,
  SERVER_BINDING_SOLACE_BINDINGVERSION,
  SERVER_BINDING_SOLACE_MSG_VPN,
}

export default ApilintCodes;
