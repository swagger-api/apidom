'use strict';

const { partition } = require('ramda');
const { addSourceMap } = require('../source-map');
const { isOpenApiExtension } = require('../predicates');
const { parseOpenApiExtension, parseOpenApiExtensions } = require('./open-api-extension');

// parseContact :: (Options, JsonNode) -> Element
const parseContact = ({ namespace, sourceMap }, node) => {
  const contactKeyElement = new namespace.elements.String('contact');
  let contactElement = new namespace.elements.Object();
  const { MemberElement } = namespace.elements.Element.prototype;
  const [openApiExtensions, properties] = partition(isOpenApiExtension({}), node.value.properties);

  properties.forEach(propertyNode => {
    const keyElement = new namespace.elements.String(propertyNode.key.value);
    const valueElement = new namespace.elements.String(propertyNode.value.value);

    contactElement.content.push(new MemberElement(
      sourceMap ? addSourceMap(propertyNode.key, keyElement) : keyElement,
      sourceMap ? addSourceMap(propertyNode.value, valueElement): valueElement,
    ))
  });

  contactElement = contactElement.concat(
    parseOpenApiExtensions({ namespace, sourceMap }, openApiExtensions)
  );

  contactElement.classes.push('contact');

  return new MemberElement(
    sourceMap ? addSourceMap(node.key, contactKeyElement) : contactKeyElement,
    sourceMap ? addSourceMap(node.value, contactElement) : contactElement
  );
};

// parseLicense :: (Options, JsonNode) -> Element
const parseLicense = ({ namespace, sourceMap }, node) => {
  const licenseKeyElement = new namespace.elements.String('license');
  let licenseElement = new namespace.elements.Object();
  const { MemberElement } = namespace.elements.Element.prototype;
  const [openApiExtensions, properties] = partition(isOpenApiExtension({}), node.value.properties);

  properties.forEach(propertyNode => {
    const keyElement = new namespace.elements.String(propertyNode.key.value);
    const valueElement = new namespace.elements.String(propertyNode.value.value);

    licenseElement.content.push(new MemberElement(
      sourceMap ? addSourceMap(propertyNode.key, keyElement) : keyElement,
      sourceMap ? addSourceMap(propertyNode.value, valueElement): valueElement,
    ))
  });

  licenseElement = licenseElement.concat(
    parseOpenApiExtensions({ namespace, sourceMap }, openApiExtensions)
  );

  licenseElement.classes.push('license');

  return new MemberElement(
    sourceMap ? addSourceMap(node.key, licenseKeyElement) : licenseKeyElement,
    sourceMap ? addSourceMap(node.value, licenseElement) : licenseElement
  );
};

// parseInfo :: (Options, JsonNode) -> Element
const parseInfo = ({ namespace, sourceMap }, node) => {
  const infoKeyElement = new namespace.elements.String('info');
  const infoElement = new namespace.elements.Info();
  const state = { namespace, sourceMap };
  const { MemberElement } = namespace.elements.Element.prototype;

  node.value.properties.forEach(propertyNode => {
    if (['title', 'description', 'termsOfService', 'version'].includes(propertyNode.key.value)) {
      const keyElement = new namespace.elements.String(propertyNode.key.value);
      const valueElement = new namespace.elements.String(propertyNode.value.value);

      infoElement.content.push(new MemberElement(
        sourceMap ? addSourceMap(propertyNode.key, keyElement) : keyElement,
        sourceMap ? addSourceMap(propertyNode.value, valueElement): valueElement,
      ));
    } else if (isOpenApiExtension({}, propertyNode)) {
      infoElement.content.push(parseOpenApiExtension(state, propertyNode));
    } else if (propertyNode.key.value === 'contact') {
      infoElement.content.push(parseContact(state, propertyNode));
    } else if (propertyNode.key.value === 'license') {
      infoElement.content.push(parseLicense(state, propertyNode));
    }
  });

  return new MemberElement(
    sourceMap ? addSourceMap(node.key, infoKeyElement) : infoKeyElement,
    sourceMap ? addSourceMap(node.value, infoElement) : infoElement
  );
};

module.exports = parseInfo;
