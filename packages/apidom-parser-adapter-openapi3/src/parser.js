'use strict';

const { path } = require('ramda');
const { isString, isObj } = require('ramda-adjunct');
const apiDOM = require('apidom');
const openapi3 = require('apidom-ns-openapi3');

const parse = source => {
    const namespace = apiDOM.createNamespace(openapi3);
    const pojo = JSON.parse(source); // very simplified parsing

    // constructing openapi
    const openapi = new namespace.elements.Openapi();
    openapi.set(pojo.openapi);

    // constructing info
    const info = new namespace.elements.Info();
    info.title = pojo.info.title;
    if (isString(pojo.info.description)) {
        info.description = pojo.info.description;
    }
    if (isString(pojo.info.termsOfService)) {
        info.termsOfService = pojo.info.termsOfService;
    }
    if (isString(pojo.info.version)) {
        info.version = pojo.info.version;
    }
    // constructing info.license
    if (isObj(path(['info', 'license'], pojo))) {
        const license = new namespace.elements.License();
        license.name = pojo.info.license.name;
        if (isString(pojo.info.license.url)) {
            license.url = pojo.info.license.url;
        }
        info.license = license;
    }
    // constructing info.contact
    if (isObj(path(['info', 'contact'], pojo))) {
        const contact = new namespace.elements.Contact();
        if (isString(pojo.info.contact.name)) {
            contact.name = pojo.info.contact.name;
        }
        if (isString(pojo.info.contact.url)) {
            contact.url = pojo.info.contact.url;
        }
        if (isString(pojo.info.contact.email)) {
            contact.email = pojo.info.contact.email;
        }
        info.contact = contact;
    }

    // constructing OAS3 ApiDOM representation
    const openApi3 = new namespace.elements.OpenApi3();
    openApi3.set('openapi', openapi);
    openApi3.set('info', info);

    return openApi3;
};

module.exports = parse;
