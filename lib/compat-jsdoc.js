/** ******************************************************************************************************************
 * @file Halh-hearted attempt at JsDoc output compatibility.
 * @author Julian Jensen <jjdanois@gmail.com>
 * @since 1.0.0
 * @date 02-Apr-2018
 *
 * ## Path conventions
 * * myFunction
 * * MyConstructor
 * * MyConstructor#instanceMember
 * * MyConstructor.staticMember
 * * MyConstructor~staticMember
 *
 *********************************************************************************************************************/
"use strict";

/**
 * @typedef {object} Added
 * @property {number} count
 * @property {string} unit
 */

/**
 * @typedef {object} MetaCode
 * @property {string} id
 * @property {string} name
 * @property {string} type
 * @property {string} value
 */

/**
 * @typedef {object} Meta
 * @property {[number,number]} [range]
 * @property {string} filename
 * @property {string} path
 * @property {number} lineno
 * @property {number} columnno
 * @property {MetaCode} code
 */

/**
 * @typedef {string[]} Authors
 */

/**
 * @typedef {MetaCode & Added} Combo
 */

/** @type {Combo} */
const
    com = {
        id: 'klkl',
        name: 'l;l;',
        type: 'int',
        value: 'kl;k;l;;',
        count: 10,
        unit: 'cm'
    };

/**
 * @typedef {object} Entry
 * @property {string} comment
 * @property {Meta} meta
 * @property {string} [description]
 * @property {boolean} preserveName
 * @property {boolean} [undocumented]
 * @property {string} name
 * @property {string} kind          - "file", "member", "constant", "class", "function"
 * @property {string} longname
 * @property {string} scope         - "global"
 * @property {Authors} [author]
 * @property {string} [since]
 * @property {any[]} [params]
 * @property {boolean} [virtual]
 * @property {boolean} [async]
 * @property {boolean} [deprecated]
 * @property {boolean} [isEnum]
 * @property {boolean} [generator]
 * @property {boolean} [hideconstructor]
 * @property {boolean} [ignore]
 * @property {boolean} [readonly]
 * @property {boolean} [override]
 * @property {string} [access]      - package, private, protected, or public
 * @property {string} [alias]
 * @property {string} [extends]
 * @property {string} [classdesc]
 * @property {string} [copyright]
 * @property {string} [variation]
 * @property {*} [defaultValue]
 * @property {string} [defaultValuetype]
 * @property {string[]} [examples]
 * @property {string[]} [implements]
 * @property {string[]} [listens]
 * @property {string[]} [modifies]
 * @property {string[]} [requires]
 * @property {string[]} [returns]
 * @property {string[]} [todo]
 * @property {any[]} [properties]
 * @property {any[]} [tutorials]
 * @property {any[]} [yields]
 * @property {string} [inheritdoc]
 * @property {string} [summary]
 * @property {string} [version]
 */
