'use strict';

const defaultNamespace = require('./namespace');

const createNamespace = (namespacePlugin) => {
    const namespace =  new defaultNamespace.Namespace()
    namespace.use(namespacePlugin);
    return namespace;
};

// toJSON :: (Namespace, Element) -> Object
const toJSON = (namespace, element) => namespace.toRefract(element);

// toJSONString :: (Namespace, Element) -> String
const toJSONString = (namespace, element) => JSON.stringify(toJSON(namespace, element));

// fromJSON :: (Namespace, Object) -> Element
const fromJSON = (namespace, json) => namespace.fromRefract(json);

// fromJSONString :: (Namespace, String) -> Element
const fromJSONString = (namespace, jsonString) => fromJSON(JSON.parse(jsonString));

// Reconstructs the ApiDOM into JavaScript POJO.
// This POJO would be  the result of parsing the original
// JSON string with JSON.parse function.
// toValue :: Element -> Object
const toValue = element => element.toValue();

module.exports = {
    namespace: defaultNamespace,
    createNamespace,
    toJSON,
    toJSONString,
    fromJSON,
    fromJSONString,
    toValue,
}