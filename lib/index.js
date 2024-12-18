(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("moo");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.unbox = exports.doubleQuoted = exports.box = exports.track = exports.tracking = exports.trackingComments = exports.lexerAny = exports.lexer = void 0;
const moo_1 = __webpack_require__(0);
const keywords_1 = __webpack_require__(3);
// build keywords
const keywordsMap = {};
for (const k of keywords_1.sqlKeywords) {
    keywordsMap['kw_' + k.toLowerCase()] = k;
}
const caseInsensitiveKeywords = (map) => {
    const transform = (0, moo_1.keywords)(map);
    return (text) => transform(text.toUpperCase());
};
// build lexer
exports.lexer = (0, moo_1.compile)({
    word: {
        match: /[eE](?!')[A-Za-z0-9_]*|[a-df-zA-DF-Z_][A-Za-z0-9_]*/,
        type: caseInsensitiveKeywords(keywordsMap),
        value: x => x.toLowerCase(),
    },
    wordQuoted: {
        match: /"(?:[^"\*]|"")+"/,
        type: () => 'quoted_word',
        value: x => x.substring(1, x.length - 1),
    },
    string: {
        match: /'(?:[^']|\'\')*'/,
        value: x => {
            return x.substring(1, x.length - 1)
                .replace(/''/g, '\'');
        },
    },
    eString: {
        match: /\b(?:e|E)'(?:[^'\\]|[\r\n\s]|(?:\\\s)|(?:\\\n)|(?:\\.)|(?:\'\'))+'/,
        value: x => {
            return x.substring(2, x.length - 1)
                .replace(/''/g, '\'')
                .replace(/\\([\s\n])/g, (_, x) => x)
                .replace(/\\./g, m => JSON.parse('"' + m + '"'));
        },
    },
    qparam: {
        match: /\$\d+/,
    },
    commentLine: /\-\-.*?$[\s\r\n]*/,
    commentFullOpen: /\/\*/,
    commentFullClose: /\*\/[\s\r\n]*/,
    star: '*',
    comma: ',',
    space: { match: /[\s\t\n\v\f\r]+/, lineBreaks: true, },
    int: /\-?\d+(?![\.\d])/,
    float: /\-?(?:(?:\d*\.\d+)|(?:\d+\.\d*))/,
    // word: /[a-zA-Z][A-Za-z0-9_\-]*/,
    lparen: '(',
    rparen: ')',
    lbracket: '[',
    rbracket: ']',
    semicolon: ';',
    dot: /\.(?!\d)/,
    op_cast: '::',
    op_colon: ':',
    op_plus: '+',
    op_eq: '=',
    op_neq: {
        match: /(?:!=)|(?:\<\>)/,
        value: () => '!=',
    },
    op_membertext: '->>',
    op_member: '->',
    op_minus: '-',
    op_div: /\//,
    op_not_ilike: /\!~~\*/,
    op_not_like: /\!~~/,
    op_ilike: /~~\*/,
    op_like: /~~/,
    op_mod: '%',
    op_exp: '^',
    op_additive: {
        // group other additive operators
        match: ['||', '-', '#-', '&&'],
    },
    op_compare: {
        // group other comparison operators
        // ... to add: "IN" and "NOT IN" that are matched by keywords
        match: ['>', '>=', '<', '<=', '@>', '<@', '?', '?|', '?&', '#>>', '>>', '<<', '~', '~*', '!~', '!~*'],
    },
    ops_others: {
        // referenced as (any other operator) in https://www.postgresql.org/docs/12/sql-syntax-lexical.html#SQL-PRECEDENCE
        // see also https://www.postgresql.org/docs/9.0/functions-math.html
        match: ['|', '&', '^', '#'],
    },
    codeblock: {
        match: /\$\$(?:.|[\s\t\n\v\f\r])*?\$\$/s,
        lineBreaks: true,
        value: (x) => x.substring(2, x.length - 2),
    },
});
exports.lexer.next = (next => () => {
    let tok;
    let commentFull = null;
    while (tok = next.call(exports.lexer)) {
        // js regex can't be recursive, so we'll keep track of nested opens (/*) and closes (*/).
        if (tok.type === 'commentFullOpen') {
            if (commentFull === null) { // initial open - start collecting content
                commentFull = {
                    nested: 0,
                    offset: tok.offset,
                    text: tok.text
                };
                continue;
            }
            commentFull.nested++;
        }
        if (commentFull != null) {
            // collect comment content
            commentFull.text += tok.text;
            if (tok.type === 'commentFullClose') {
                if (commentFull.nested === 0) { // finish comment, if not nested
                    comments === null || comments === void 0 ? void 0 : comments.push(makeComment(commentFull));
                    commentFull = null;
                    continue;
                }
                commentFull.nested--;
            }
            continue;
        }
        if (tok.type === 'space') {
            continue;
        }
        if (tok.type === 'commentLine') {
            comments === null || comments === void 0 ? void 0 : comments.push(makeComment(tok));
            continue;
        }
        break;
    }
    if (trackingLoc && tok) {
        const start = tok.offset;
        const loc = {
            start,
            end: start + tok.text.length,
        };
        tok._location = loc;
    }
    return tok;
})(exports.lexer.next);
exports.lexerAny = exports.lexer;
let comments = null;
const makeComment = ({ offset, text }) => ({
    _location: { start: offset, end: offset + text.length },
    comment: text,
});
function trackingComments(act) {
    if (comments) {
        throw new Error('WAT ? Recursive comments tracking 🤔🤨 ?');
    }
    try {
        comments = [];
        const ast = act();
        return { comments, ast };
    }
    finally {
        comments = null;
    }
}
exports.trackingComments = trackingComments;
let trackingLoc = false;
function tracking(act) {
    if (trackingLoc) {
        return act();
    }
    try {
        trackingLoc = true;
        return act();
    }
    finally {
        trackingLoc = false;
    }
}
exports.tracking = tracking;
function track(xs, ret) {
    if (!trackingLoc || !ret || typeof ret !== 'object') {
        return ret;
    }
    const start = seek(xs, true);
    const end = seek(xs, false);
    if (!start || !end) {
        return ret;
    }
    if (start === end) {
        ret._location = start;
    }
    else {
        const loc = {
            start: start.start,
            end: end.end,
        };
        ret._location = loc;
    }
    return ret;
}
exports.track = track;
const literal = Symbol('_literal');
const doubleQuotedSym = Symbol('_doublequoted');
function box(xs, value, doubleQuoted) {
    if (!trackingLoc && !doubleQuoted) {
        return value;
    }
    return track(xs, { [literal]: value, [doubleQuotedSym]: doubleQuoted });
}
exports.box = box;
function unwrapNoBox(e) {
    if (Array.isArray(e) && e.length === 1) {
        e = unwrapNoBox(e[0]);
    }
    if (Array.isArray(e) && !e.length) {
        return null;
    }
    return e;
}
function doubleQuoted(value) {
    const uw = unwrapNoBox(value);
    if (typeof value === 'object' && (uw === null || uw === void 0 ? void 0 : uw[doubleQuotedSym])) {
        return { doubleQuoted: true };
    }
    return undefined;
}
exports.doubleQuoted = doubleQuoted;
function unbox(value) {
    var _a;
    if (typeof value === 'object') {
        return (_a = value === null || value === void 0 ? void 0 : value[literal]) !== null && _a !== void 0 ? _a : value;
    }
    return value;
}
exports.unbox = unbox;
function seek(xs, start) {
    if (!xs) {
        return null;
    }
    if (Array.isArray(xs)) {
        const diff = start ? 1 : -1;
        for (let i = start ? 0 : xs.length - 1; i >= 0 && i < xs.length; i += diff) {
            const v = seek(xs[i], start);
            if (v) {
                return v;
            }
        }
        return null;
    }
    if (typeof xs !== 'object') {
        return null;
    }
    return xs._location;
}


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.AstDefaultMapper = exports.arrayNilMap = exports.assignChanged = exports.astMapper = void 0;
const utils_1 = __webpack_require__(6);
/**
 * Builds an AST modifier based on the default implementation, merged with the one you provide.
 *
 * Example of a modifier that renames all reference to columns 'foo' to 'bar'
 * ```ts
 *  const mapper = astMapper(b => ({
 *       ref: a => assignChanged(a, {
 *           name: a.name === 'foo'
 *               ? 'bar'
 *               : a.name
 *       })
 *   }));
 *
 * const modified = mapper.statement(myStatementToModify);
 * ```
 */
function astMapper(modifierBuilder) {
    const instance = new AstDefaultMapper();
    instance.wrapped = modifierBuilder(instance);
    return instance;
}
exports.astMapper = astMapper;
/**
 * An helper function that returns a copy of an object with modified properties
 * (similar to Object.assign()), but ONLY if thos properties have changed.
 * Will return the original object if not.
 */
function assignChanged(orig, assign) {
    if (!orig) {
        return orig;
    }
    let changed = false;
    for (const k of Object.keys(assign)) {
        if (orig[k] !== assign[k]) {
            changed = true;
            break;
        }
    }
    if (!changed) {
        return orig;
    }
    return (0, utils_1.trimNullish)({
        ...orig,
        ...assign,
    }, 0);
}
exports.assignChanged = assignChanged;
/**
 * An helper function that returns a map of an array, but:
 * - It will return the original array if it is null-ish
 * - It will remove all null-ish entries
 * - It will return the original array if nothing has changed
 */
function arrayNilMap(collection, mapper) {
    if (!(collection === null || collection === void 0 ? void 0 : collection.length)) {
        return collection;
    }
    let changed = false;
    let ret = collection;
    for (let i = 0; i < collection.length; i++) {
        const orig = collection[i];
        const val = mapper(orig);
        if (!changed && (!val || val !== orig)) {
            changed = true;
            ret = collection.slice(0, i);
        }
        if (!val) {
            continue;
        }
        if (changed) {
            ret.push(val);
        }
    }
    return ret;
}
exports.arrayNilMap = arrayNilMap;
function withAccepts(val) {
    switch (val === null || val === void 0 ? void 0 : val.type) {
        case 'select':
        case 'delete':
        case 'insert':
        case 'update':
        case 'union':
        case 'union all':
        case 'with':
            return true;
        default:
            return false;
    }
}
/**
 * Can be used to modify an AST.
 *
 * You will have to override functions that you're interested in to use this class.
 *
 * Example: Will remove all references in
 */
class AstDefaultMapper {
    super() {
        return new SkipModifier(this);
    }
    statement(val) {
        switch (val.type) {
            case 'alter table':
                return this.alterTable(val);
            case 'alter index':
                return this.alterIndex(val);
            case 'commit':
            case 'start transaction':
            case 'rollback':
                return this.transaction(val);
            case 'create index':
                return this.createIndex(val);
            case 'create table':
                return this.createTable(val);
            case 'truncate table':
                return this.truncateTable(val);
            case 'delete':
                return this.delete(val);
            case 'insert':
                return this.insert(val);
            case 'with':
                return this.with(val);
            case 'with recursive':
                return this.withRecursive(val);
            case 'select':
                return this.selection(val);
            case 'update':
                return this.update(val);
            case 'create extension':
                return this.createExtension(val);
            case 'tablespace':
                return this.tablespace(val);
            case 'set':
                return this.setGlobal(val);
            case 'set timezone':
                return this.setTimezone(val);
            case 'create sequence':
                return this.createSequence(val);
            case 'alter sequence':
                return this.alterSequence(val);
            case 'begin':
                return this.begin(val);
            case 'drop table':
            case 'drop index':
            case 'drop sequence':
            case 'drop type':
            case 'drop trigger':
                return this.drop(val);
            case 'create enum':
                return this.createEnum(val);
            case 'create composite type':
                return this.createCompositeType(val);
            case 'union':
            case 'union all':
                return this.union(val);
            case 'show':
                return this.show(val);
            case 'prepare':
                return this.prepare(val);
            case 'deallocate':
                return this.deallocate(val);
            case 'create view':
                return this.createView(val);
            case 'create materialized view':
                return this.createMaterializedView(val);
            case 'refresh materialized view':
                return this.refreshMaterializedView(val);
            case 'create schema':
                return this.createSchema(val);
            case 'raise':
                return this.raise(val);
            case 'comment':
                return this.comment(val);
            case 'do':
                return this.do(val);
            case 'create function':
                return this.createFunction(val);
            case 'drop function':
                return this.dropFunction(val);
            case 'values':
                return this.values(val);
            default:
                throw utils_1.NotSupported.never(val);
        }
    }
    comment(val) {
        // not really supported :/
        return val;
    }
    createView(val) {
        const query = this.select(val.query);
        if (!query) {
            return null;
        }
        const ref = this.tableRef(val.name);
        if (!ref) {
            return null;
        }
        return assignChanged(val, {
            query,
            name: ref,
        });
    }
    createMaterializedView(val) {
        const query = this.select(val.query);
        if (!query) {
            return null;
        }
        const ref = this.tableRef(val.name);
        if (!ref) {
            return null;
        }
        return assignChanged(val, {
            query,
            name: ref,
        });
    }
    refreshMaterializedView(val) {
        return val;
    }
    do(val) {
        return val;
    }
    createFunction(val) {
        // process arguments
        const args = arrayNilMap(val.arguments, a => {
            const type = this.dataType(a.type);
            return assignChanged(a, { type });
        });
        // process return type
        let returns;
        if (val.returns) {
            switch (val.returns.kind) {
                case 'table':
                    returns = assignChanged(val.returns, {
                        columns: arrayNilMap(val.returns.columns, v => {
                            const type = this.dataType(v.type);
                            return type && assignChanged(v, { type });
                        })
                    });
                    break;
                case undefined:
                case null:
                case 'array':
                    returns = this.dataType(val.returns);
                    break;
                default:
                    throw utils_1.NotSupported.never(val.returns);
            }
        }
        return assignChanged(val, {
            returns,
            arguments: args,
        });
    }
    dropFunction(val) {
        const args = arrayNilMap(val.arguments, a => {
            const type = this.dataType(a.type);
            return assignChanged(a, { type });
        });
        return assignChanged(val, {
            arguments: args,
        });
    }
    show(val) {
        return val;
    }
    createEnum(val) {
        return val;
    }
    createCompositeType(val) {
        const attributes = arrayNilMap(val.attributes, a => assignChanged(a, {
            dataType: this.dataType(a.dataType),
        }));
        return assignChanged(val, { attributes });
    }
    drop(val) {
        return val;
    }
    alterSequence(seq) {
        if (seq.change.type === 'set options') {
            if (seq.change.as) {
                this.dataType(seq.change.as);
            }
        }
        return seq;
    }
    begin(begin) {
        return begin;
    }
    createSequence(seq) {
        if (seq.options.as) {
            this.dataType(seq.options.as);
        }
        return seq;
    }
    tablespace(val) {
        return val;
    }
    setGlobal(val) {
        return val;
    }
    setTimezone(val) {
        return val;
    }
    update(val) {
        if (!val) {
            return val;
        }
        const table = this.tableRef(val.table);
        if (!table) {
            return null; // nothing to update
        }
        const from = val.from && this.from(val.from);
        const where = val.where && this.expr(val.where);
        const sets = arrayNilMap(val.sets, x => this.set(x));
        if (!(sets === null || sets === void 0 ? void 0 : sets.length)) {
            return null; // nothing to update
        }
        const returning = arrayNilMap(val.returning, c => this.selectionColumn(c));
        return assignChanged(val, {
            table,
            where,
            sets,
            from,
            returning,
        });
    }
    insert(val) {
        var _a, _b;
        const into = this.tableRef(val.into);
        if (!into) {
            return null; // nowhere to insert into
        }
        const select = val.insert && this.select(val.insert);
        if (!select) {
            // nothing to insert
            return null;
        }
        const returning = arrayNilMap(val.returning, c => this.selectionColumn(c));
        let on = (_a = val.onConflict) === null || _a === void 0 ? void 0 : _a.on;
        switch (on === null || on === void 0 ? void 0 : on.type) {
            case 'on constraint':
                // nothing to do
                break;
            case 'on expr':
                on = assignChanged(on, {
                    exprs: arrayNilMap(on.exprs, e => this.expr(e)),
                });
                break;
            case null:
            case undefined:
                break;
            default:
                throw utils_1.NotSupported.never(on);
        }
        let ocdo = (_b = val.onConflict) === null || _b === void 0 ? void 0 : _b.do;
        if (ocdo && ocdo !== 'do nothing') {
            const sets = arrayNilMap(ocdo.sets, x => this.set(x));
            if (!(sets === null || sets === void 0 ? void 0 : sets.length)) {
                ocdo = 'do nothing';
            }
            else if (ocdo.sets !== sets) {
                ocdo = { sets };
            }
        }
        return assignChanged(val, {
            into,
            insert: select,
            returning,
            onConflict: !ocdo ? val.onConflict : assignChanged(val.onConflict, {
                do: ocdo,
                on,
            }),
        });
    }
    raise(val) {
        return assignChanged(val, {
            formatExprs: val.formatExprs && arrayNilMap(val.formatExprs, x => this.expr(x)),
            using: val.using && arrayNilMap(val.using, u => {
                return assignChanged(u, {
                    value: this.expr(u.value),
                });
            }),
        });
    }
    delete(val) {
        const from = this.tableRef(val.from);
        if (!from) {
            return null; // nothing to delete
        }
        const where = val.where && this.expr(val.where);
        const returning = arrayNilMap(val.returning, c => this.selectionColumn(c));
        return assignChanged(val, {
            where,
            returning,
            from,
        });
    }
    createSchema(val) {
        return val;
    }
    createTable(val) {
        const columns = arrayNilMap(val.columns, col => {
            switch (col.kind) {
                case 'column':
                    return this.createColumn(col);
                case 'like table':
                    return this.likeTable(col);
                default:
                    throw utils_1.NotSupported.never(col);
            }
        });
        if (!(columns === null || columns === void 0 ? void 0 : columns.length)) {
            return null; // no column to create
        }
        return assignChanged(val, {
            columns,
        });
    }
    likeTable(col) {
        const like = this.tableRef(col.like);
        if (!like) {
            return null;
        }
        return assignChanged(col, { like });
    }
    truncateTable(val) {
        return val;
    }
    constraint(c) {
        switch (c.type) {
            case 'not null':
            case 'null':
            case 'primary key':
            case 'unique':
            case 'add generated':
                return c;
            case 'default': {
                const def = this.expr(c.default);
                if (!def) {
                    return null;
                }
                return assignChanged(c, {
                    default: def,
                });
            }
            case 'check': {
                const def = this.expr(c.expr);
                if (!def) {
                    return null;
                }
                return assignChanged(c, {
                    expr: def,
                });
            }
            case 'reference': {
                const foreignTable = this.tableRef(c.foreignTable);
                if (!foreignTable) {
                    return null;
                }
                return assignChanged(c, {
                    foreignTable,
                });
            }
            default:
                throw utils_1.NotSupported.never(c);
        }
    }
    set(st) {
        const value = this.expr(st.value);
        if (!value) {
            return null;
        }
        return assignChanged(st, {
            value,
        });
    }
    // =========================================
    // ================ STUFF ==================
    // =========================================
    /** Called when a data type definition is encountered */
    dataType(dataType) {
        return dataType;
    }
    /** Called when an alias of a table is created */
    tableRef(st) {
        return st;
    }
    transaction(val) {
        return val;
    }
    createExtension(val) {
        return val;
    }
    createIndex(val) {
        const expressions = arrayNilMap(val.expressions, e => {
            const expression = this.expr(e.expression);
            if (expression === e.expression) {
                return e;
            }
            if (!expression) {
                return null; // no more index expression
            }
            return {
                ...e,
                expression,
            };
        });
        if (!(expressions === null || expressions === void 0 ? void 0 : expressions.length)) {
            return null; // no columns to create index on
        }
        return assignChanged(val, {
            expressions,
        });
    }
    prepare(st) {
        const statement = this.statement(st.statement);
        if (!statement) {
            return null;
        }
        return assignChanged(st, {
            args: arrayNilMap(st.args, a => this.dataType(a)),
            statement,
        });
    }
    deallocate(st) {
        return st;
    }
    // =========================================
    // ============== ALTER INDEX ==============
    // =========================================
    alterIndex(st) {
        // not much as of today...might improve this in the future
        return st;
    }
    // =========================================
    // ============== ALTER TABLE ==============
    // =========================================
    alterTable(st) {
        var _a;
        const table = this.tableRef(st.table);
        if (!table) {
            return null; // no table
        }
        let changes = [];
        let hasChanged = false;
        for (let i = 0; i < (((_a = st.changes) === null || _a === void 0 ? void 0 : _a.length) || 0); i++) {
            const currentChange = st.changes[i];
            const change = this.tableAlteration(currentChange, st.table);
            hasChanged = hasChanged || (change != currentChange);
            if (!!change) {
                changes.push(change);
            }
        }
        if (!changes.length) {
            return null; // no change left
        }
        if (!hasChanged) {
            return st;
        }
        return assignChanged(st, {
            table,
            changes,
        });
    }
    tableAlteration(change, table) {
        switch (change.type) {
            case 'add column':
                return this.addColumn(change, table);
            case 'add constraint':
                return this.addConstraint(change, table);
            case 'alter column':
                return this.alterColumn(change, table);
            case 'rename':
                return this.renameTable(change, table);
            case 'rename column':
                return this.renameColumn(change, table);
            case 'rename constraint':
                return this.renameConstraint(change, table);
            case 'drop column':
                return this.dropColumn(change, table);
            case 'drop constraint':
                return this.dropConstraint(change, table);
            case 'owner':
                return this.setTableOwner(change, table);
            default:
                throw utils_1.NotSupported.never(change);
        }
    }
    dropColumn(change, table) {
        return change;
    }
    dropConstraint(change, table) {
        return change;
    }
    setTableOwner(change, table) {
        return change;
    }
    renameConstraint(change, table) {
        return change;
    }
    renameColumn(change, table) {
        return change;
    }
    renameTable(change, table) {
        return change;
    }
    alterColumn(change, inTable) {
        let alter;
        switch (change.alter.type) {
            case 'set default':
                alter = this.setColumnDefault(change.alter, inTable, change.column);
                break;
            case 'set type':
                alter = this.setColumnType(change.alter, inTable, change.column);
                break;
            case 'drop default':
            case 'set not null':
            case 'drop not null':
                alter = this.alterColumnSimple(change.alter, inTable, change.column);
                break;
            case 'add generated':
                alter = this.alterColumnAddGenerated(change.alter, inTable, change.column);
                break;
            default:
                throw utils_1.NotSupported.never(change.alter);
        }
        if (!alter) {
            return null; // no more alter
        }
        return assignChanged(change, {
            alter,
        });
    }
    setColumnType(alter, inTable, inColumn) {
        const dataType = this.dataType(alter.dataType);
        return assignChanged(alter, {
            dataType,
        });
    }
    alterColumnAddGenerated(alter, inTable, inColumn) {
        return alter;
    }
    alterColumnSimple(alter, inTable, inColumn) {
        return alter;
    }
    setColumnDefault(alter, inTable, inColumn) {
        const def = this.expr(alter.default);
        if (!def) {
            return null; // no more default to set
        }
        return assignChanged(alter, {
            default: def,
        });
    }
    addConstraint(change, inTable) {
        return change;
    }
    addColumn(change, inTable) {
        const column = this.createColumn(change.column);
        if (!column) {
            return null; // no more column to add
        }
        return assignChanged(change, {
            column,
        });
    }
    createColumn(col) {
        var _a;
        // to be overriden
        const dataType = this.dataType(col.dataType);
        if (!dataType) {
            return null; // no data type => remove column
        }
        const constraints = (_a = arrayNilMap(col.constraints, m => this.constraint(m))) !== null && _a !== void 0 ? _a : undefined;
        return assignChanged(col, {
            dataType,
            constraints,
        });
    }
    // =========================================
    // ============== SELECTIONS ==============
    // =========================================
    select(val) {
        switch (val.type) {
            case 'select':
                return this.selection(val);
            case 'union':
            case 'union all':
                return this.union(val);
            case 'with':
                return this.with(val);
            case 'values':
                return this.values(val);
            case 'with recursive':
                return this.withRecursive(val);
            default:
                throw utils_1.NotSupported.never(val);
        }
    }
    selection(val) {
        var _a, _b;
        const from = arrayNilMap(val.from, c => this.from(c));
        const columns = arrayNilMap(val.columns, c => this.selectionColumn(c));
        const where = val.where && this.expr(val.where);
        const groupBy = arrayNilMap(val.groupBy, c => this.expr(c));
        const orderBy = this.orderBy(val.orderBy);
        const limit = assignChanged(val.limit, {
            limit: this.expr((_a = val.limit) === null || _a === void 0 ? void 0 : _a.limit),
            offset: this.expr((_b = val.limit) === null || _b === void 0 ? void 0 : _b.offset),
        });
        return assignChanged(val, {
            from,
            columns,
            where,
            groupBy,
            orderBy,
            limit,
        });
    }
    orderBy(orderBy) {
        return arrayNilMap(orderBy, c => {
            const by = this.expr(c.by);
            if (!by) {
                return null;
            }
            if (by === c.by) {
                return c;
            }
            return {
                ...c,
                by,
            };
        });
    }
    union(val) {
        const left = this.select(val.left);
        const right = this.select(val.right);
        if (!left || !right) {
            return left !== null && left !== void 0 ? left : right;
        }
        return assignChanged(val, {
            left,
            right
        });
    }
    with(val) {
        const bind = arrayNilMap(val.bind, s => {
            const statement = this.statement(s.statement);
            return withAccepts(statement)
                ? assignChanged(s, { statement })
                : null;
        });
        // no bindngs
        if (!bind) {
            return null;
        }
        const _in = this.statement(val.in);
        if (!withAccepts(_in)) {
            return null;
        }
        return assignChanged(val, {
            bind,
            in: _in,
        });
    }
    withRecursive(val) {
        const statement = this.union(val.bind);
        if (!statement) {
            return null;
        }
        // 'with recursive' only accepts unions
        if (statement.type !== 'union' && statement.type !== 'union all') {
            return null;
        }
        const _in = this.statement(val.in);
        if (!withAccepts(_in)) {
            return null;
        }
        return assignChanged(val, {
            bind: statement,
            in: _in,
        });
    }
    from(from) {
        switch (from.type) {
            case 'table':
                return this.fromTable(from);
            case 'statement':
                return this.fromStatement(from);
            case 'call':
                return this.fromCall(from);
            default:
                throw utils_1.NotSupported.never(from);
        }
    }
    fromCall(from) {
        const call = this.call(from);
        if (!call || call.type !== 'call') {
            return null;
        }
        return assignChanged(from, call);
    }
    fromStatement(from) {
        const statement = this.select(from.statement);
        if (!statement) {
            return null; // nothing to select from
        }
        const join = from.join && this.join(from.join);
        return assignChanged(from, {
            statement,
            join,
        });
    }
    values(from) {
        const values = arrayNilMap(from.values, x => arrayNilMap(x, y => this.expr(y)));
        if (!(values === null || values === void 0 ? void 0 : values.length)) {
            return null; // nothing to select from
        }
        return assignChanged(from, {
            values,
        });
    }
    join(join) {
        const on = join.on && this.expr(join.on);
        if (!on && !join.using) {
            return join;
        }
        return assignChanged(join, {
            on,
        });
    }
    fromTable(from) {
        const nfrom = this.tableRef(from.name);
        if (!nfrom) {
            return null; // nothing to select from
        }
        const join = from.join && this.join(from.join);
        return assignChanged(from, {
            name: nfrom,
            join,
        });
    }
    selectionColumn(val) {
        const expr = this.expr(val.expr);
        if (!expr) {
            return null; // not selected anymore
        }
        return assignChanged(val, {
            expr,
        });
    }
    // =========================================
    // ============== EXPRESSIONS ==============
    // =========================================
    expr(val) {
        if (!val) {
            return val;
        }
        switch (val.type) {
            case 'binary':
                return this.binary(val);
            case 'unary':
                return this.unary(val);
            case 'ref':
                return this.ref(val);
            case 'string':
            case 'numeric':
            case 'integer':
            case 'boolean':
            case 'constant':
            case 'null':
                return this.constant(val);
            case 'list':
            case 'array':
                return this.array(val);
            case 'array select':
                return this.arraySelect(val);
            case 'call':
                return this.call(val);
            case 'cast':
                return this.cast(val);
            case 'case':
                return this.case(val);
            case 'member':
                return this.member(val);
            case 'arrayIndex':
                return this.arrayIndex(val);
            case 'ternary':
                return this.ternary(val);
            case 'select':
            case 'union':
            case 'union all':
            case 'with':
            case 'with recursive':
                return this.select(val);
            case 'keyword':
                return this.valueKeyword(val);
            case 'parameter':
                return this.parameter(val);
            case 'extract':
                return this.extract(val);
            case 'overlay':
                return this.callOverlay(val);
            case 'substring':
                return this.callSubstring(val);
            case 'values':
                return this.values(val);
            case 'default':
                return this.default(val);
            default:
                throw utils_1.NotSupported.never(val);
        }
    }
    arraySelect(val) {
        const select = this.select(val.select);
        if (!select) {
            return null;
        }
        return assignChanged(val, { select });
    }
    extract(st) {
        const from = this.expr(st.from);
        if (!from) {
            return null;
        }
        return assignChanged(st, { from });
    }
    valueKeyword(val) {
        return val;
    }
    ternary(val) {
        const value = this.expr(val.value);
        const lo = this.expr(val.lo);
        const hi = this.expr(val.hi);
        if (!value || !lo || !hi) {
            return null; // missing a branch
        }
        return assignChanged(val, {
            value,
            lo,
            hi,
        });
    }
    parameter(st) {
        return st;
    }
    arrayIndex(val) {
        const array = this.expr(val.array);
        const index = this.expr(val.index);
        if (!array || !index) {
            return null;
        }
        return assignChanged(val, {
            array,
            index,
        });
    }
    member(val) {
        const operand = this.expr(val.operand);
        if (!operand) {
            return null;
        }
        return assignChanged(val, {
            operand,
        });
    }
    case(val) {
        const value = val.value && this.expr(val.value);
        const whens = arrayNilMap(val.whens, w => {
            const when = this.expr(w.when);
            const value = this.expr(w.value);
            if (!when || !value) {
                return null;
            }
            return assignChanged(w, {
                value,
                when,
            });
        });
        if (!(whens === null || whens === void 0 ? void 0 : whens.length)) {
            return null; // no case
        }
        const els = val.else && this.expr(val.else);
        return assignChanged(val, {
            value,
            whens,
            else: els,
        });
    }
    cast(val) {
        const operand = this.expr(val.operand);
        if (!operand) {
            return null;
        }
        return assignChanged(val, {
            operand,
        });
    }
    call(val) {
        const args = arrayNilMap(val.args, a => this.expr(a));
        if (!args) {
            return null;
        }
        const orderBy = this.orderBy(val.orderBy);
        const filter = this.expr(val.filter);
        return assignChanged(val, {
            args,
            orderBy,
            filter,
        });
    }
    callSubstring(val) {
        return assignChanged(val, {
            value: this.expr(val.value),
            from: this.expr(val.from),
            for: this.expr(val.for),
        });
    }
    callOverlay(val) {
        return assignChanged(val, {
            value: this.expr(val.value),
            placing: this.expr(val.placing),
            from: this.expr(val.from),
            for: this.expr(val.for),
        });
    }
    array(val) {
        const expressions = arrayNilMap(val.expressions, a => this.expr(a));
        if (!expressions) {
            return null;
        }
        return assignChanged(val, {
            expressions,
        });
    }
    constant(value) {
        return value;
    }
    default(value) {
        return value;
    }
    /** Called when a reference is used */
    ref(val) {
        return val;
    }
    unary(val) {
        const operand = this.expr(val.operand);
        if (!operand) {
            return null;
        }
        return assignChanged(val, {
            operand,
        });
    }
    binary(val) {
        const left = this.expr(val.left);
        const right = this.expr(val.right);
        if (!left || !right) {
            return null;
        }
        return assignChanged(val, {
            left,
            right,
        });
    }
}
exports.AstDefaultMapper = AstDefaultMapper;
// ====== auto implement the replace mechanism
const proto = AstDefaultMapper.prototype;
for (const k of Object.getOwnPropertyNames(proto)) {
    const orig = proto[k];
    if (k === 'constructor' || k === 'super' || typeof orig !== 'function') {
        continue;
    }
    Object.defineProperty(proto, k, {
        configurable: false,
        get() {
            return function (...args) {
                var _a;
                if (this.skipNext) {
                    this.skipNext = false;
                    return orig.apply(this, args);
                }
                const impl = (_a = this.wrapped) === null || _a === void 0 ? void 0 : _a[k];
                if (!impl) {
                    return orig.apply(this, args);
                }
                return impl.apply(this.wrapped, args);
            };
        }
    });
}
// ====== auto implement the skip mechanism
class SkipModifier extends AstDefaultMapper {
    constructor(parent) {
        super();
        this.parent = parent;
    }
}
for (const k of Object.getOwnPropertyNames(proto)) {
    const orig = proto[k];
    if (k === 'constructor' || k === 'super' || typeof orig !== 'function') {
        continue;
    }
    Object.defineProperty(SkipModifier.prototype, k, {
        configurable: false,
        get() {
            return function (...args) {
                this.parent.skipNext = true;
                return orig.apply(this.parent, args);
            };
        }
    });
}


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.sqlKeywords = void 0;
// https://www.postgresql.org/docs/current/sql-keywords-appendix.html
// $('table.table').children('tbody').children().toArray().filter(x => { const txt = $($(x).children()[1]).text(); return txt.includes('reserved') && !txt.includes('non-reserved')}).map(x => $($(x).children()[0]).text())
exports.sqlKeywords = [
    "ALL", "ANALYSE", "ANALYZE", "AND", "ANY", "ARRAY", "AS", "ASC", "ASYMMETRIC", "AUTHORIZATION", "BINARY", "BOTH", "CASE", "CAST", "CHECK", "COLLATE", "COLLATION", "CONCURRENTLY", "CONSTRAINT", "CREATE", "CROSS", "CURRENT_CATALOG", "CURRENT_DATE", "CURRENT_ROLE", "CURRENT_SCHEMA", "CURRENT_TIME", "CURRENT_TIMESTAMP", "CURRENT_USER", "DEFAULT", "DEFERRABLE", "DESC", "DISTINCT", "DO", "ELSE", "END", "EXCEPT", "FALSE", "FETCH", "FOR", "FOREIGN", "FREEZE", "FROM", "FULL", "GRANT", "GROUP", "HAVING", "ILIKE", "IN", "INITIALLY", "INNER", "INTERSECT", "INTO", "IS", "ISNULL", "JOIN", "LATERAL", "LEADING", "LEFT", "LIKE", "LIMIT", "LOCALTIME", "LOCALTIMESTAMP", "NATURAL", "NOT", "NOTNULL", "NULL", "OFFSET", "ON", "ONLY", "OR", "ORDER", "OUTER", "OVERLAPS", "PLACING", "PRIMARY", "REFERENCES", "RETURNING", "RIGHT", "SELECT", "SESSION_USER", "SIMILAR", "SOME", "SYMMETRIC", "TABLE", "TABLESAMPLE", "THEN", "TO", "TRAILING", "TRUE", "UNION", "UNIQUE", "USER", "USING", "VARIADIC", "VERBOSE", "WHEN", "WHERE", "WINDOW", "WITH"
    // added manually
    ,
    "PRECISION"
];


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.intervalToString = exports.normalizeInterval = exports.buildInterval = void 0;
const types = [
    ['years', 12],
    ['months', 30],
    ['days', 24],
    ['hours', 60],
    ['minutes', 60],
    ['seconds', 1000],
    ['milliseconds', 0],
];
function* unwrap(k) {
    if (typeof k[1] === 'number') {
        yield k;
    }
    else {
        for (const v of k) {
            yield* unwrap(v);
        }
    }
}
function buildInterval(orig, vals) {
    var _a;
    const ret = {};
    if (vals === 'invalid') {
        throw new Error(`invalid input syntax for type interval: "${orig}"`);
    }
    for (const [k, v] of unwrap(vals)) {
        ret[k] = ((_a = ret[k]) !== null && _a !== void 0 ? _a : 0) + v;
    }
    return ret;
}
exports.buildInterval = buildInterval;
/** Returns a normalized copy of the given interval */
function normalizeInterval(value) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    const ret = { ...value };
    // trim non-integers
    for (let i = 0; i < types.length; i++) {
        const [k, mul] = types[i];
        const v = (_a = ret[k]) !== null && _a !== void 0 ? _a : 0;
        const int = v >= 0
            ? Math.floor(v)
            : Math.ceil(v);
        if (!v || int === v) {
            continue;
        }
        const nk = (_b = types[i + 1]) === null || _b === void 0 ? void 0 : _b[0];
        if (nk) {
            ret[nk] = ((_c = ret[nk]) !== null && _c !== void 0 ? _c : 0) + mul * (v - int);
        }
        ret[k] = int;
    }
    if (ret.months || ret.years) {
        const m = ((_d = ret.months) !== null && _d !== void 0 ? _d : 0) + ((_e = ret.years) !== null && _e !== void 0 ? _e : 0) * 12;
        ret.months = m % 12;
        ret.years = (m - ret.months) / 12;
    }
    // normalize time
    let t = ((_f = ret.hours) !== null && _f !== void 0 ? _f : 0) * 3600
        + ((_g = ret.minutes) !== null && _g !== void 0 ? _g : 0) * 60
        + ((_h = ret.seconds) !== null && _h !== void 0 ? _h : 0)
        + ((_j = ret.milliseconds) !== null && _j !== void 0 ? _j : 0) / 1000;
    let sign = 1;
    if (t < 0) {
        sign = -1;
        t = -t;
    }
    if (t >= 3600) {
        ret.hours = sign * Math.floor(t / 3600);
        t -= sign * ret.hours * 3600;
    }
    else {
        delete ret.hours;
    }
    if (t >= 60) {
        ret.minutes = sign * Math.floor(t / 60);
        t -= sign * ret.minutes * 60;
    }
    else {
        delete ret.minutes;
    }
    if (t > 0) {
        ret.seconds = sign * Math.floor(t);
        t -= sign * ret.seconds;
    }
    else {
        delete ret.seconds;
    }
    if (t > 0) {
        ret.milliseconds = sign * Math.round(t * 1000);
    }
    else {
        delete ret.milliseconds;
    }
    // trim zeros.
    for (const [k] of types) {
        if (!ret[k]) {
            delete ret[k];
        }
    }
    return ret;
}
exports.normalizeInterval = normalizeInterval;
/** Interval value to postgres string representation  */
function intervalToString(value) {
    var _a, _b, _c;
    value = normalizeInterval(value);
    const ret = [];
    if (value.years) {
        ret.push(value.years === 1 ? '1 year' : value.years + ' years');
    }
    if (value.months) {
        ret.push(value.months === 1 ? '1 month' : value.months + ' months');
    }
    if (value.days) {
        ret.push(value.days === 1 ? '1 day' : value.days + ' days');
    }
    if (value.hours || value.minutes || value.seconds || value.milliseconds) {
        let time = `${num((_a = value.hours) !== null && _a !== void 0 ? _a : 0)}:${num((_b = value.minutes) !== null && _b !== void 0 ? _b : 0)}:${num((_c = value.seconds) !== null && _c !== void 0 ? _c : 0)}`;
        if (value.milliseconds) {
            time = time + (value.milliseconds / 1000).toString().substr(1);
        }
        if (neg(value.hours) || neg(value.minutes) || neg(value.seconds) || neg(value.milliseconds)) {
            time = '-' + time;
        }
        ret.push(time);
    }
    return ret.join(' ');
}
exports.intervalToString = intervalToString;
function num(v) {
    v = Math.abs(v);
    return v < 10 ? '0' + v : v.toString();
}
function neg(v) {
    return v && v < 0;
}


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.astVisitor = void 0;
const ast_mapper_1 = __webpack_require__(2);
class Visitor {
    super() {
        return new SkipVisitor(this);
    }
}
// =============== auto implement the mapper
const mapperProto = ast_mapper_1.AstDefaultMapper.prototype;
for (const k of Object.getOwnPropertyNames(mapperProto)) {
    const orig = mapperProto[k];
    if (k === 'constructor' || k === 'super' || typeof orig !== 'function') {
        continue;
    }
    Object.defineProperty(Visitor.prototype, k, {
        configurable: false,
        get() {
            return function (...args) {
                const impl = this.visitor[k];
                if (!impl) {
                    // just ignore & forward call to mapper
                    return orig.apply(this, args);
                }
                // return first argument
                // ...which means "I dont wana change anything"
                //    in the ast-modifier language.
                impl.apply(this.visitor, args);
                return args[0];
            };
        }
    });
}
// ====== auto implement the skip mechanism
class SkipVisitor {
    constructor(parent) {
        this.parent = parent;
    }
}
for (const k of Object.getOwnPropertyNames(mapperProto)) {
    const orig = mapperProto[k];
    if (k === 'constructor' || k === 'super' || typeof orig !== 'function') {
        continue;
    }
    Object.defineProperty(SkipVisitor.prototype, k, {
        configurable: false,
        get() {
            return function (...args) {
                return orig.apply(this.parent, args);
            };
        }
    });
}
/**
 * Builds an AST visitor based on the default implementation, merged with the one you provide.
 *
 * Example of visitor which counts references to a column 'foo':
 *
 * ```ts
 * let cnt = 0;
 * const visitor = astVisitor(v => ({
 *      ref: r => {
 *          if (r.name === 'foo') {
 *              cnt++;
 *          }
 *          v.super().ref(r);
 *      }
 *  }));
 *
 * visitor.statement(myStatementToCount);
 * console.log(`${cnt} references to foo !`);
 * ```
 */
function astVisitor(visitorBuilder) {
    return (0, ast_mapper_1.astMapper)(m => {
        const ret = new Visitor();
        ret.mapper = m;
        ret.visitor = visitorBuilder(ret);
        return ret;
    });
}
exports.astVisitor = astVisitor;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.trimNullish = exports.NotSupported = void 0;
class NotSupported extends Error {
    constructor(what) {
        super('Not supported' + (what ? ': ' + what : ''));
    }
    static never(value, msg) {
        return new NotSupported(`${msg !== null && msg !== void 0 ? msg : ''} ${JSON.stringify(value)}`);
    }
}
exports.NotSupported = NotSupported;
function trimNullish(value, depth = 5) {
    if (depth < 0)
        return value;
    if (value instanceof Array) {
        value.forEach(x => trimNullish(x, depth - 1));
    }
    if (typeof value !== 'object' || value instanceof Date)
        return value;
    if (!value) {
        return value;
    }
    for (const k of Object.keys(value)) {
        const val = value[k];
        if (val === undefined || val === null)
            delete value[k];
        else
            trimNullish(val, depth - 1);
    }
    return value;
}
exports.trimNullish = trimNullish;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeInterval = exports.intervalToString = exports.toSql = exports.astMapper = exports.assignChanged = exports.arrayNilMap = exports.astVisitor = exports.parseWithComments = exports.parseIntervalLiteral = exports.parseGeometricLiteral = exports.parseArrayLiteral = exports.parseFirst = exports.parse = void 0;
var parser_1 = __webpack_require__(8);
Object.defineProperty(exports, "parse", { enumerable: true, get: function () { return parser_1.parse; } });
Object.defineProperty(exports, "parseFirst", { enumerable: true, get: function () { return parser_1.parseFirst; } });
Object.defineProperty(exports, "parseArrayLiteral", { enumerable: true, get: function () { return parser_1.parseArrayLiteral; } });
Object.defineProperty(exports, "parseGeometricLiteral", { enumerable: true, get: function () { return parser_1.parseGeometricLiteral; } });
Object.defineProperty(exports, "parseIntervalLiteral", { enumerable: true, get: function () { return parser_1.parseIntervalLiteral; } });
Object.defineProperty(exports, "parseWithComments", { enumerable: true, get: function () { return parser_1.parseWithComments; } });
var ast_visitor_1 = __webpack_require__(5);
Object.defineProperty(exports, "astVisitor", { enumerable: true, get: function () { return ast_visitor_1.astVisitor; } });
var ast_mapper_1 = __webpack_require__(2);
Object.defineProperty(exports, "arrayNilMap", { enumerable: true, get: function () { return ast_mapper_1.arrayNilMap; } });
Object.defineProperty(exports, "assignChanged", { enumerable: true, get: function () { return ast_mapper_1.assignChanged; } });
Object.defineProperty(exports, "astMapper", { enumerable: true, get: function () { return ast_mapper_1.astMapper; } });
var to_sql_1 = __webpack_require__(19);
Object.defineProperty(exports, "toSql", { enumerable: true, get: function () { return to_sql_1.toSql; } });
__exportStar(__webpack_require__(21), exports);
var interval_builder_1 = __webpack_require__(4);
Object.defineProperty(exports, "intervalToString", { enumerable: true, get: function () { return interval_builder_1.intervalToString; } });
Object.defineProperty(exports, "normalizeInterval", { enumerable: true, get: function () { return interval_builder_1.normalizeInterval; } });


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseGeometricLiteral = exports.parseIntervalLiteral = exports.parseArrayLiteral = exports.parse = exports.parseWithComments = exports.parseFirst = void 0;
const nearley_1 = __webpack_require__(9);
const main_ne_1 = __importDefault(__webpack_require__(10));
const array_ne_1 = __importDefault(__webpack_require__(11));
const geometric_ne_1 = __importDefault(__webpack_require__(13));
const interval_ne_1 = __importDefault(__webpack_require__(15));
const interval_iso_ne_1 = __importDefault(__webpack_require__(17));
const interval_builder_1 = __webpack_require__(4);
const lexer_1 = __webpack_require__(1);
let sqlCompiled;
let arrayCompiled;
let geometricCompiled;
let intervalTextCompiled;
let intervalIsoCompiled;
/** Parse the first SQL statement in the given text (discards the rest), and return its AST */
function parseFirst(sql) {
    const first = parse(sql);
    return first[0];
}
exports.parseFirst = parseFirst;
/** Parse an AST from SQL, and get the comments */
function parseWithComments(sql, options) {
    return (0, lexer_1.trackingComments)(() => parse(sql, options));
}
exports.parseWithComments = parseWithComments;
function parse(sql, optEntry) {
    if (!sqlCompiled) {
        sqlCompiled = nearley_1.Grammar.fromCompiled(main_ne_1.default);
    }
    const entry = typeof optEntry === 'string'
        ? optEntry
        : optEntry === null || optEntry === void 0 ? void 0 : optEntry.entry;
    const opts = typeof optEntry === 'string' ? null : optEntry;
    // parse sql
    const doParse = () => _parse(sql, sqlCompiled, entry);
    let parsed = (opts === null || opts === void 0 ? void 0 : opts.locationTracking)
        ? (0, lexer_1.tracking)(doParse)
        : doParse();
    // always return an array of statements.
    if (typeof optEntry !== 'string' && !Array.isArray(parsed)) {
        parsed = [parsed];
    }
    return parsed;
}
exports.parse = parse;
function parseArrayLiteral(sql) {
    if (!arrayCompiled) {
        arrayCompiled = nearley_1.Grammar.fromCompiled(array_ne_1.default);
    }
    return _parse(sql, arrayCompiled);
}
exports.parseArrayLiteral = parseArrayLiteral;
function parseIntervalLiteral(literal) {
    if (literal.startsWith('P')) {
        if (!intervalIsoCompiled) {
            intervalIsoCompiled = nearley_1.Grammar.fromCompiled(interval_iso_ne_1.default);
        }
        return (0, interval_builder_1.buildInterval)(literal, _parse(literal, intervalIsoCompiled));
    }
    else {
        if (!intervalTextCompiled) {
            intervalTextCompiled = nearley_1.Grammar.fromCompiled(interval_ne_1.default);
        }
        const low = literal.toLowerCase(); // full text syntax is case insensitive
        return (0, interval_builder_1.buildInterval)(literal, _parse(low, intervalTextCompiled));
    }
}
exports.parseIntervalLiteral = parseIntervalLiteral;
function parseGeometricLiteral(sql, type) {
    if (!geometricCompiled) {
        geometricCompiled = nearley_1.Grammar.fromCompiled(geometric_ne_1.default);
    }
    return _parse(sql, geometricCompiled, type);
}
exports.parseGeometricLiteral = parseGeometricLiteral;
function _parse(sql, grammar, entry) {
    try {
        grammar.start = entry !== null && entry !== void 0 ? entry : 'main';
        const parser = new nearley_1.Parser(grammar);
        parser.feed(sql);
        const asts = parser.finish();
        if (!asts.length) {
            throw new Error('Unexpected end of input');
        }
        else if (asts.length !== 1) {
            throw new Error(`💀 Ambiguous SQL syntax: Please file an issue stating the request that has failed at https://github.com/oguimbal/pgsql-ast-parser:

        ${sql}

        `);
        }
        return asts[0];
    }
    catch (e) {
        if (typeof (e === null || e === void 0 ? void 0 : e.message) !== 'string') {
            throw e;
        }
        let msg = e.message;
        // remove all the stack crap of nearley parser
        let begin = null;
        const parts = [];
        const reg = /A (.+) token based on:/g;
        let m;
        while (m = reg.exec(msg)) {
            begin = begin !== null && begin !== void 0 ? begin : msg.substr(0, m.index);
            parts.push(`    - A "${m[1]}" token`);
        }
        if (begin) {
            msg = begin + parts.join('\n') + '\n\n';
        }
        e.message = msg;
        throw e;
    }
}


/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("nearley");

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// Generated automatically by nearley, version unknown
// http://github.com/Hardmath123/nearley
// Bypasses TS6133. Allow declared but unused functions.
// @ts-ignore
function id(d) { return d[0]; }
const lexer_1 = __webpack_require__(1);
const lexer_2 = __webpack_require__(1);
// usage ex:  replace track(whatever) with debug(track)(whatever)
function debug(fn) {
    fn = fn || ((x) => x);
    return ((x, ...args) => {
        debugger;
        return fn(x, ...args);
    });
}
function asName(val) {
    return asNameWithColumns(val, undefined);
}
function asNameWithColumns(val, columns) {
    const name = toStr(val);
    if (!columns || columns.length === 0) {
        return (0, lexer_2.track)(val, { name });
    }
    return (0, lexer_2.track)(val, {
        name,
        columns: columns.map(c => ({ name: toStr(c) })),
    });
}
function asLit(val) {
    const value = toStr(val);
    return (0, lexer_2.track)(val, { value });
}
function unwrap(e) {
    if (Array.isArray(e) && e.length === 1) {
        e = unwrap(e[0]);
    }
    if (Array.isArray(e) && !e.length) {
        return null;
    }
    return (0, lexer_2.unbox)(e);
}
const get = (i) => (x) => (0, lexer_2.track)(x, x[i]);
const last = (x) => Array.isArray(x) ? (0, lexer_2.track)(x[x.length - 1], x[x.length - 1]) : x;
const trim = (x) => x && x.trim();
const value = (x) => x && x.value;
function flatten(e) {
    if (Array.isArray(e)) {
        const ret = [];
        for (const i of e) {
            ret.push(...flatten(i));
        }
        return ret;
    }
    if (!e) {
        return [];
    }
    return [e];
}
function asStr(value) {
    var _a;
    value = (0, lexer_2.unbox)(value);
    return (_a = value === null || value === void 0 ? void 0 : value.value) !== null && _a !== void 0 ? _a : value;
}
function flattenStr(e) {
    const fl = flatten((0, lexer_2.unbox)(e));
    return fl.filter(x => !!x)
        .map(x => asStr(x))
        .filter(x => typeof x === 'string')
        .map(x => x.trim())
        .filter(x => !!x);
}
function toStr(e, join) {
    return flattenStr(e).join(join || '');
}
function fromEntries(vals) {
    const ret = {};
    for (const [k, v] of vals) {
        ret[k] = v;
    }
    return ret;
}
const kwSensitivity = { sensitivity: 'accent' };
const eqInsensitive = (a, b) => a.localeCompare(b, undefined, kwSensitivity) === 0;
const notReservedKw = (kw) => (x, _, rej) => {
    const val = asStr(x[0]);
    if (eqInsensitive(val, kw)) {
        return (0, lexer_2.box)(x, kw);
    }
    return rej;
};
const kw = notReservedKw;
const anyKw = (...kw) => {
    const kwSet = new Set(kw);
    return (x, _, rej) => {
        const val = typeof x[0] === 'string' ? x[0] : x[0].value;
        return kwSet.has(val) ? val : rej;
    };
};
function setSeqOpts(ret, opts) {
    const defs = new Set();
    const unboxed = opts.map(lexer_2.unbox);
    for (const [k, v] of unboxed) {
        if (defs.has(k)) {
            throw new Error('conflicting or redundant options');
        }
        defs.add(k);
        ret[k] = (0, lexer_2.unbox)(v);
    }
}
;
;
;
;
const grammar = {
    Lexer: lexer_1.lexerAny,
    ParserRules: [
        { "name": "lparen", "symbols": [(lexer_1.lexerAny.has("lparen") ? { type: "lparen" } : lparen)] },
        { "name": "rparen", "symbols": [(lexer_1.lexerAny.has("rparen") ? { type: "rparen" } : rparen)] },
        { "name": "number$subexpression$1", "symbols": ["float"] },
        { "name": "number$subexpression$1", "symbols": ["int"] },
        { "name": "number", "symbols": ["number$subexpression$1"], "postprocess": unwrap },
        { "name": "dot", "symbols": [(lexer_1.lexerAny.has("dot") ? { type: "dot" } : dot)], "postprocess": id },
        { "name": "float", "symbols": [(lexer_1.lexerAny.has("float") ? { type: "float" } : float)], "postprocess": x => (0, lexer_2.box)(x, parseFloat(unwrap(x))) },
        { "name": "int", "symbols": [(lexer_1.lexerAny.has("int") ? { type: "int" } : int)], "postprocess": x => (0, lexer_2.box)(x, parseInt(unwrap(x), 10)) },
        { "name": "comma", "symbols": [(lexer_1.lexerAny.has("comma") ? { type: "comma" } : comma)], "postprocess": id },
        { "name": "star", "symbols": [(lexer_1.lexerAny.has("star") ? { type: "star" } : star)], "postprocess": x => (0, lexer_2.box)(x, x[0].value) },
        { "name": "string$subexpression$1", "symbols": [(lexer_1.lexerAny.has("string") ? { type: "string" } : string)] },
        { "name": "string$subexpression$1", "symbols": [(lexer_1.lexerAny.has("eString") ? { type: "eString" } : eString)] },
        { "name": "string", "symbols": ["string$subexpression$1"], "postprocess": x => (0, lexer_2.box)(x, unwrap(x[0]).value) },
        { "name": "ident", "symbols": ["word"], "postprocess": get(0) },
        { "name": "word", "symbols": [(lexer_1.lexerAny.has("kw_primary") ? { type: "kw_primary" } : kw_primary)], "postprocess": x => (0, lexer_2.box)(x, 'primary') },
        { "name": "word", "symbols": [(lexer_1.lexerAny.has("kw_unique") ? { type: "kw_unique" } : kw_unique)], "postprocess": x => (0, lexer_2.box)(x, 'unique') },
        { "name": "word", "symbols": [(lexer_1.lexerAny.has("quoted_word") ? { type: "quoted_word" } : quoted_word)], "postprocess": x => (0, lexer_2.box)(x, x[0].value, true) },
        { "name": "word", "symbols": [(lexer_1.lexerAny.has("word") ? { type: "word" } : word)], "postprocess": x => (0, lexer_2.box)(x, x[0].value) },
        { "name": "collist_paren", "symbols": ["lparen", "collist", "rparen"], "postprocess": get(1) },
        { "name": "collist$ebnf$1", "symbols": [] },
        { "name": "collist$ebnf$1$subexpression$1", "symbols": ["comma", "ident"], "postprocess": last },
        { "name": "collist$ebnf$1", "symbols": ["collist$ebnf$1", "collist$ebnf$1$subexpression$1"], "postprocess": (d) => d[0].concat([d[1]]) },
        { "name": "collist", "symbols": ["ident", "collist$ebnf$1"], "postprocess": ([head, tail]) => {
                return [head, ...(tail || [])];
            } },
        { "name": "kw_between", "symbols": [(lexer_1.lexerAny.has("word") ? { type: "word" } : word)], "postprocess": notReservedKw('between') },
        { "name": "kw_conflict", "symbols": [(lexer_1.lexerAny.has("word") ? { type: "word" } : word)], "postprocess": notReservedKw('conflict') },
        { "name": "kw_nothing", "symbols": [(lexer_1.lexerAny.has("word") ? { type: "word" } : word)], "postprocess": notReservedKw('nothing') },
        { "name": "kw_begin", "symbols": [(lexer_1.lexerAny.has("word") ? { type: "word" } : word)], "postprocess": notReservedKw('begin') },
        { "name": "kw_if", "symbols": [(lexer_1.lexerAny.has("word") ? { type: "word" } : word)], "postprocess": notReservedKw('if') },
        { "name": "kw_exists", "symbols": [(lexer_1.lexerAny.has("word") ? { type: "word" } : word)], "postprocess": notReservedKw('exists') },
        { "name": "kw_key", "symbols": [(lexer_1.lexerAny.has("word") ? { type: "word" } : word)], "postprocess": notReservedKw('key') },
        { "name": "kw_index", "symbols": [(lexer_1.lexerAny.has("word") ? { type: "word" } : word)], "postprocess": notReservedKw('index') },
        { "name": "kw_extension", "symbols": [(lexer_1.lexerAny.has("word") ? { type: "word" } : word)], "postprocess": notReservedKw('extension') },
        { "name": "kw_schema", "symbols": [(lexer_1.lexerAny.has("word") ? { type: "word" } : word)], "postprocess": notReservedKw('schema') },
        { "name": "kw_nulls", "symbols": [(lexer_1.lexerAny.has("word") ? { type: "word" } : word)], "postprocess": notReservedKw('nulls') },
        { "name": "kw_first", "symbols": [(lexer_1.lexerAny.has("word") ? { type: "word" } : word)], "postprocess": notReservedKw('first') },
        { "name": "kw_last", "symbols": [(lexer_1.lexerAny.has("word") ? { type: "word" } : word)], "postprocess": notReservedKw('last') },
        { "name": "kw_start", "symbols": [(lexer_1.lexerAny.has("word") ? { type: "word" } : word)], "postprocess": notReservedKw('start') },
        { "name": "kw_restart", "symbols": [(lexer_1.lexerAny.has("word") ? { type: "word" } : word)], "postprocess": notReservedKw('restart') },
        { "name": "kw_filter", "symbols": [(lexer_1.lexerAny.has("word") ? { type: "word" } : word)], "postprocess": notReservedKw('filter') },
        { "name": "kw_commit", "symbols": [(lexer_1.lexerAny.has("word") ? { type: "word" } : word)], "postprocess": notReservedKw('commit') },
        { "name": "kw_tablespace", "symbols": [(lexer_1.lexerAny.has("word") ? { type: "word" } : word)], "postprocess": notReservedKw('tablespace') },
        { "name": "kw_transaction", "symbols": [(lexer_1.lexerAny.has("word") ? { type: "word" } : word)], "postprocess": notReservedKw('transaction') },
        { "name": "kw_work", "symbols": [(lexer_1.lexerAny.has("word") ? { type: "word" } : word)], "postprocess": notReservedKw('work') },
        { "name": "kw_read", "symbols": [(lexer_1.lexerAny.has("word") ? { type: "word" } : word)], "postprocess": notReservedKw('read') },
        { "name": "kw_write", "symbols": [(lexer_1.lexerAny.has("word") ? { type: "word" } : word)], "postprocess": notReservedKw('write') },
        { "name": "kw_isolation", "symbols": [(lexer_1.lexerAny.has("word") ? { type: "word" } : word)], "postprocess": notReservedKw('isolation') },
        { "name": "kw_level", "symbols": [(lexer_1.lexerAny.has("word") ? { type: "word" } : word)], "postprocess": notReservedKw('level') },
        { "name": "kw_serializable", "symbols": [(lexer_1.lexerAny.has("word") ? { type: "word" } : word)], "postprocess": notReservedKw('serializable') },
        { "name": "kw_rollback", "symbols": [(lexer_1.lexerAny.has("word") ? { type: "word" } : word)], "postprocess": notReservedKw('rollback') },
        { "name": "kw_insert", "symbols": [(lexer_1.lexerAny.has("word") ? { type: "word" } : word)], "postprocess": notReservedKw('insert') },
        { "name": "kw_value", "symbols": [(lexer_1.lexerAny.has("word") ? { type: "word" } : word)], "postprocess": notReservedKw('value') },
        { "name": "kw_values", "symbols": [(lexer_1.lexerAny.has("word") ? { type: "word" } : word)], "postprocess": notReservedKw('values') },
        { "name": "kw_update", "symbols": [(lexer_1.lexerAny.has("word") ? { type: "word" } : word)], "postprocess": notReservedKw('update') },
        { "name": "kw_column", "symbols": [(lexer_1.lexerAny.has("word") ? { type: "word" } : word)], "postprocess": notReservedKw('column') },
        { "name": "kw_set", "symbols": [(lexer_1.lexerAny.has("word") ? { type: "word" } : word)], "postprocess": notReservedKw('set') },
        { "name": "kw_version", "symbols": [(lexer_1.lexerAny.has("word") ? { type: "word" } : word)], "postprocess": notReservedKw('version') },
        { "name": "kw_alter", "symbols": [(lexer_1.lexerAny.has("word") ? { type: "word" } : word)], "postprocess": notReservedKw('alter') },
        { "name": "kw_rename", "symbols": [(lexer_1.lexerAny.has("word") ? { type: "word" } : word)], "postprocess": notReservedKw('rename') },
        { "name": "kw_sequence", "symbols": [(lexer_1.lexerAny.has("word") ? { type: "word" } : word)], "postprocess": notReservedKw('sequence') },
        { "name": "kw_temp", "symbols": [(lexer_1.lexerAny.has("word") ? { type: "word" } : word)], "postprocess": notReservedKw('temp') },
        { "name": "kw_temporary", "symbols": [(lexer_1.lexerAny.has("word") ? { type: "word" } : word)], "postprocess": notReservedKw('temporary') },
        { "name": "kw_add", "symbols": [(lexer_1.lexerAny.has("word") ? { type: "word" } : word)], "postprocess": notReservedKw('add') },
        { "name": "kw_owner", "symbols": [(lexer_1.lexerAny.has("word") ? { type: "word" } : word)], "postprocess": notReservedKw('owner') },
        { "name": "kw_owned", "symbols": [(lexer_1.lexerAny.has("word") ? { type: "word" } : word)], "postprocess": notReservedKw('owned') },
        { "name": "kw_including", "symbols": [(lexer_1.lexerAny.has("word") ? { type: "word" } : word)], "postprocess": notReservedKw('including') },
        { "name": "kw_excluding", "symbols": [(lexer_1.lexerAny.has("word") ? { type: "word" } : word)], "postprocess": notReservedKw('excluding') },
        { "name": "kw_none", "symbols": [(lexer_1.lexerAny.has("word") ? { type: "word" } : word)], "postprocess": notReservedKw('none') },
        { "name": "kw_drop", "symbols": [(lexer_1.lexerAny.has("word") ? { type: "word" } : word)], "postprocess": notReservedKw('drop') },
        { "name": "kw_operator", "symbols": [(lexer_1.lexerAny.has("word") ? { type: "word" } : word)], "postprocess": notReservedKw('operator') },
        { "name": "kw_minvalue", "symbols": [(lexer_1.lexerAny.has("word") ? { type: "word" } : word)], "postprocess": notReservedKw('minvalue') },
        { "name": "kw_maxvalue", "symbols": [(lexer_1.lexerAny.has("word") ? { type: "word" } : word)], "postprocess": notReservedKw('maxvalue') },
        { "name": "kw_data", "symbols": [(lexer_1.lexerAny.has("word") ? { type: "word" } : word)], "postprocess": notReservedKw('data') },
        { "name": "kw_type", "symbols": [(lexer_1.lexerAny.has("word") ? { type: "word" } : word)], "postprocess": notReservedKw('type') },
        { "name": "kw_trigger", "symbols": [(lexer_1.lexerAny.has("word") ? { type: "word" } : word)], "postprocess": notReservedKw('trigger') },
        { "name": "kw_delete", "symbols": [(lexer_1.lexerAny.has("word") ? { type: "word" } : word)], "postprocess": notReservedKw('delete') },
        { "name": "kw_cache", "symbols": [(lexer_1.lexerAny.has("word") ? { type: "word" } : word)], "postprocess": notReservedKw('cache') },
        { "name": "kw_cascade", "symbols": [(lexer_1.lexerAny.has("word") ? { type: "word" } : word)], "postprocess": notReservedKw('cascade') },
        { "name": "kw_no", "symbols": [(lexer_1.lexerAny.has("word") ? { type: "word" } : word)], "postprocess": notReservedKw('no') },
        { "name": "kw_timestamp", "symbols": [(lexer_1.lexerAny.has("word") ? { type: "word" } : word)], "postprocess": notReservedKw('timestamp') },
        { "name": "kw_cycle", "symbols": [(lexer_1.lexerAny.has("word") ? { type: "word" } : word)], "postprocess": notReservedKw('cycle') },
        { "name": "kw_function", "symbols": [(lexer_1.lexerAny.has("word") ? { type: "word" } : word)], "postprocess": notReservedKw('function') },
        { "name": "kw_returns", "symbols": [(lexer_1.lexerAny.has("word") ? { type: "word" } : word)], "postprocess": notReservedKw('returns') },
        { "name": "kw_language", "symbols": [(lexer_1.lexerAny.has("word") ? { type: "word" } : word)], "postprocess": notReservedKw('language') },
        { "name": "kw_out", "symbols": [(lexer_1.lexerAny.has("word") ? { type: "word" } : word)], "postprocess": notReservedKw('out') },
        { "name": "kw_inout", "symbols": [(lexer_1.lexerAny.has("word") ? { type: "word" } : word)], "postprocess": notReservedKw('inout') },
        { "name": "kw_variadic", "symbols": [(lexer_1.lexerAny.has("word") ? { type: "word" } : word)], "postprocess": notReservedKw('variadic') },
        { "name": "kw_action", "symbols": [(lexer_1.lexerAny.has("word") ? { type: "word" } : word)], "postprocess": notReservedKw('action') },
        { "name": "kw_restrict", "symbols": [(lexer_1.lexerAny.has("word") ? { type: "word" } : word)], "postprocess": notReservedKw('restrict') },
        { "name": "kw_truncate", "symbols": [(lexer_1.lexerAny.has("word") ? { type: "word" } : word)], "postprocess": notReservedKw('truncate') },
        { "name": "kw_increment", "symbols": [(lexer_1.lexerAny.has("word") ? { type: "word" } : word)], "postprocess": notReservedKw('increment') },
        { "name": "kw_by", "symbols": [(lexer_1.lexerAny.has("word") ? { type: "word" } : word)], "postprocess": notReservedKw('by') },
        { "name": "kw_row", "symbols": [(lexer_1.lexerAny.has("word") ? { type: "word" } : word)], "postprocess": notReservedKw('row') },
        { "name": "kw_rows", "symbols": [(lexer_1.lexerAny.has("word") ? { type: "word" } : word)], "postprocess": notReservedKw('rows') },
        { "name": "kw_next", "symbols": [(lexer_1.lexerAny.has("word") ? { type: "word" } : word)], "postprocess": notReservedKw('next') },
        { "name": "kw_match", "symbols": [(lexer_1.lexerAny.has("word") ? { type: "word" } : word)], "postprocess": notReservedKw('match') },
        { "name": "kw_replace", "symbols": [(lexer_1.lexerAny.has("word") ? { type: "word" } : word)], "postprocess": notReservedKw('replace') },
        { "name": "kw_recursive", "symbols": [(lexer_1.lexerAny.has("word") ? { type: "word" } : word)], "postprocess": notReservedKw('recursive') },
        { "name": "kw_view", "symbols": [(lexer_1.lexerAny.has("word") ? { type: "word" } : word)], "postprocess": notReservedKw('view') },
        { "name": "kw_cascaded", "symbols": [(lexer_1.lexerAny.has("word") ? { type: "word" } : word)], "postprocess": notReservedKw('cascaded') },
        { "name": "kw_unlogged", "symbols": [(lexer_1.lexerAny.has("word") ? { type: "word" } : word)], "postprocess": notReservedKw('unlogged') },
        { "name": "kw_global", "symbols": [(lexer_1.lexerAny.has("word") ? { type: "word" } : word)], "postprocess": notReservedKw('global') },
        { "name": "kw_option", "symbols": [(lexer_1.lexerAny.has("word") ? { type: "word" } : word)], "postprocess": notReservedKw('option') },
        { "name": "kw_materialized", "symbols": [(lexer_1.lexerAny.has("word") ? { type: "word" } : word)], "postprocess": notReservedKw('materialized') },
        { "name": "kw_partial", "symbols": [(lexer_1.lexerAny.has("word") ? { type: "word" } : word)], "postprocess": notReservedKw('partial') },
        { "name": "kw_partition", "symbols": [(lexer_1.lexerAny.has("word") ? { type: "word" } : word)], "postprocess": notReservedKw('partition') },
        { "name": "kw_simple", "symbols": [(lexer_1.lexerAny.has("word") ? { type: "word" } : word)], "postprocess": notReservedKw('simple') },
        { "name": "kw_generated", "symbols": [(lexer_1.lexerAny.has("word") ? { type: "word" } : word)], "postprocess": notReservedKw('generated') },
        { "name": "kw_always", "symbols": [(lexer_1.lexerAny.has("word") ? { type: "word" } : word)], "postprocess": notReservedKw('always') },
        { "name": "kw_identity", "symbols": [(lexer_1.lexerAny.has("word") ? { type: "word" } : word)], "postprocess": notReservedKw('identity') },
        { "name": "kw_name", "symbols": [(lexer_1.lexerAny.has("word") ? { type: "word" } : word)], "postprocess": notReservedKw('name') },
        { "name": "kw_enum", "symbols": [(lexer_1.lexerAny.has("word") ? { type: "word" } : word)], "postprocess": notReservedKw('enum') },
        { "name": "kw_show", "symbols": [(lexer_1.lexerAny.has("word") ? { type: "word" } : word)], "postprocess": notReservedKw('show') },
        { "name": "kw_ordinality", "symbols": [(lexer_1.lexerAny.has("word") ? { type: "word" } : word)], "postprocess": notReservedKw('ordinality') },
        { "name": "kw_overriding", "symbols": [(lexer_1.lexerAny.has("word") ? { type: "word" } : word)], "postprocess": notReservedKw('overriding') },
        { "name": "kw_over", "symbols": [(lexer_1.lexerAny.has("word") ? { type: "word" } : word)], "postprocess": notReservedKw('over') },
        { "name": "kw_system", "symbols": [(lexer_1.lexerAny.has("word") ? { type: "word" } : word)], "postprocess": notReservedKw('system') },
        { "name": "kw_comment", "symbols": [(lexer_1.lexerAny.has("word") ? { type: "word" } : word)], "postprocess": notReservedKw('comment') },
        { "name": "kw_time", "symbols": [(lexer_1.lexerAny.has("word") ? { type: "word" } : word)], "postprocess": notReservedKw('time') },
        { "name": "kw_at", "symbols": [(lexer_1.lexerAny.has("word") ? { type: "word" } : word)], "postprocess": notReservedKw('at') },
        { "name": "kw_zone", "symbols": [(lexer_1.lexerAny.has("word") ? { type: "word" } : word)], "postprocess": notReservedKw('zone') },
        { "name": "kw_interval", "symbols": [(lexer_1.lexerAny.has("word") ? { type: "word" } : word)], "postprocess": notReservedKw('interval') },
        { "name": "kw_hour", "symbols": [(lexer_1.lexerAny.has("word") ? { type: "word" } : word)], "postprocess": notReservedKw('hour') },
        { "name": "kw_minute", "symbols": [(lexer_1.lexerAny.has("word") ? { type: "word" } : word)], "postprocess": notReservedKw('minute') },
        { "name": "kw_local", "symbols": [(lexer_1.lexerAny.has("word") ? { type: "word" } : word)], "postprocess": notReservedKw('local') },
        { "name": "kw_prepare", "symbols": [(lexer_1.lexerAny.has("word") ? { type: "word" } : word)], "postprocess": notReservedKw('prepare') },
        { "name": "kw_deallocate", "symbols": [(lexer_1.lexerAny.has("word") ? { type: "word" } : word)], "postprocess": notReservedKw('deallocate') },
        { "name": "kw_raise", "symbols": [(lexer_1.lexerAny.has("word") ? { type: "word" } : word)], "postprocess": notReservedKw('raise') },
        { "name": "kw_continue", "symbols": [(lexer_1.lexerAny.has("word") ? { type: "word" } : word)], "postprocess": notReservedKw('continue') },
        { "name": "kw_share", "symbols": [(lexer_1.lexerAny.has("word") ? { type: "word" } : word)], "postprocess": notReservedKw('share') },
        { "name": "kw_refresh", "symbols": [(lexer_1.lexerAny.has("word") ? { type: "word" } : word)], "postprocess": notReservedKw('refresh') },
        { "name": "kw_ifnotexists", "symbols": ["kw_if", (lexer_1.lexerAny.has("kw_not") ? { type: "kw_not" } : kw_not), "kw_exists"] },
        { "name": "kw_ifexists", "symbols": ["kw_if", "kw_exists"] },
        { "name": "kw_withordinality", "symbols": [(lexer_1.lexerAny.has("kw_with") ? { type: "kw_with" } : kw_with), "kw_ordinality"] },
        { "name": "kw_not_null", "symbols": [(lexer_1.lexerAny.has("kw_not") ? { type: "kw_not" } : kw_not), (lexer_1.lexerAny.has("kw_null") ? { type: "kw_null" } : kw_null)] },
        { "name": "kw_primary_key", "symbols": [(lexer_1.lexerAny.has("kw_primary") ? { type: "kw_primary" } : kw_primary), "kw_key"] },
        { "name": "data_type$ebnf$1$subexpression$1$macrocall$2", "symbols": ["int"] },
        { "name": "data_type$ebnf$1$subexpression$1$macrocall$1$ebnf$1", "symbols": [] },
        { "name": "data_type$ebnf$1$subexpression$1$macrocall$1$ebnf$1$subexpression$1", "symbols": [(lexer_1.lexerAny.has("comma") ? { type: "comma" } : comma), "data_type$ebnf$1$subexpression$1$macrocall$2"], "postprocess": last },
        { "name": "data_type$ebnf$1$subexpression$1$macrocall$1$ebnf$1", "symbols": ["data_type$ebnf$1$subexpression$1$macrocall$1$ebnf$1", "data_type$ebnf$1$subexpression$1$macrocall$1$ebnf$1$subexpression$1"], "postprocess": (d) => d[0].concat([d[1]]) },
        { "name": "data_type$ebnf$1$subexpression$1$macrocall$1", "symbols": ["data_type$ebnf$1$subexpression$1$macrocall$2", "data_type$ebnf$1$subexpression$1$macrocall$1$ebnf$1"], "postprocess": ([head, tail]) => {
                return [head, ...(tail || [])];
            } },
        { "name": "data_type$ebnf$1$subexpression$1", "symbols": ["lparen", "data_type$ebnf$1$subexpression$1$macrocall$1", "rparen"], "postprocess": get(1) },
        { "name": "data_type$ebnf$1", "symbols": ["data_type$ebnf$1$subexpression$1"], "postprocess": id },
        { "name": "data_type$ebnf$1", "symbols": [], "postprocess": () => null },
        { "name": "data_type$ebnf$2$subexpression$1", "symbols": [(lexer_1.lexerAny.has("kw_array") ? { type: "kw_array" } : kw_array)] },
        { "name": "data_type$ebnf$2$subexpression$1$ebnf$1$subexpression$1", "symbols": [(lexer_1.lexerAny.has("lbracket") ? { type: "lbracket" } : lbracket), (lexer_1.lexerAny.has("rbracket") ? { type: "rbracket" } : rbracket)] },
        { "name": "data_type$ebnf$2$subexpression$1$ebnf$1", "symbols": ["data_type$ebnf$2$subexpression$1$ebnf$1$subexpression$1"] },
        { "name": "data_type$ebnf$2$subexpression$1$ebnf$1$subexpression$2", "symbols": [(lexer_1.lexerAny.has("lbracket") ? { type: "lbracket" } : lbracket), (lexer_1.lexerAny.has("rbracket") ? { type: "rbracket" } : rbracket)] },
        { "name": "data_type$ebnf$2$subexpression$1$ebnf$1", "symbols": ["data_type$ebnf$2$subexpression$1$ebnf$1", "data_type$ebnf$2$subexpression$1$ebnf$1$subexpression$2"], "postprocess": (d) => d[0].concat([d[1]]) },
        { "name": "data_type$ebnf$2$subexpression$1", "symbols": ["data_type$ebnf$2$subexpression$1$ebnf$1"] },
        { "name": "data_type$ebnf$2", "symbols": ["data_type$ebnf$2$subexpression$1"], "postprocess": id },
        { "name": "data_type$ebnf$2", "symbols": [], "postprocess": () => null },
        { "name": "data_type", "symbols": ["data_type_simple", "data_type$ebnf$1", "data_type$ebnf$2"], "postprocess": x => {
                let asArray = x[2];
                const name = unwrap(x[0]);
                let ret;
                ret = {
                    ...name,
                    ...Array.isArray(x[1]) && x[1].length ? { config: x[1].map(unwrap) } : {},
                };
                if (asArray) {
                    if (asArray[0].type === 'kw_array') {
                        asArray = [['array']];
                    }
                    for (const _ of asArray[0]) {
                        ret = {
                            kind: 'array',
                            arrayOf: ret,
                        };
                    }
                }
                return (0, lexer_2.track)(x, ret);
            } },
        { "name": "data_type_list$ebnf$1", "symbols": [] },
        { "name": "data_type_list$ebnf$1$subexpression$1", "symbols": ["comma", "data_type"], "postprocess": last },
        { "name": "data_type_list$ebnf$1", "symbols": ["data_type_list$ebnf$1", "data_type_list$ebnf$1$subexpression$1"], "postprocess": (d) => d[0].concat([d[1]]) },
        { "name": "data_type_list", "symbols": ["data_type", "data_type_list$ebnf$1"], "postprocess": ([head, tail]) => {
                return [head, ...(tail || [])];
            } },
        { "name": "data_type_simple", "symbols": ["data_type_text"], "postprocess": x => (0, lexer_2.track)(x, { name: toStr(x, ' ') }) },
        { "name": "data_type_simple", "symbols": ["data_type_numeric"], "postprocess": x => (0, lexer_2.track)(x, { name: toStr(x, ' ') }) },
        { "name": "data_type_simple", "symbols": ["data_type_date"] },
        { "name": "data_type_simple", "symbols": ["qualified_name_mark_quotes"] },
        { "name": "data_type_numeric$subexpression$1", "symbols": [(lexer_1.lexerAny.has("word") ? { type: "word" } : word)], "postprocess": kw('double') },
        { "name": "data_type_numeric", "symbols": ["data_type_numeric$subexpression$1", (lexer_1.lexerAny.has("kw_precision") ? { type: "kw_precision" } : kw_precision)] },
        { "name": "data_type_text$subexpression$1", "symbols": [(lexer_1.lexerAny.has("word") ? { type: "word" } : word)], "postprocess": anyKw('character', 'bit') },
        { "name": "data_type_text$subexpression$2", "symbols": [(lexer_1.lexerAny.has("word") ? { type: "word" } : word)], "postprocess": kw('varying') },
        { "name": "data_type_text", "symbols": ["data_type_text$subexpression$1", "data_type_text$subexpression$2"] },
        { "name": "data_type_date$subexpression$1", "symbols": [(lexer_1.lexerAny.has("word") ? { type: "word" } : word)], "postprocess": anyKw('timestamp', 'time') },
        { "name": "data_type_date$subexpression$2", "symbols": [(lexer_1.lexerAny.has("kw_with") ? { type: "kw_with" } : kw_with)] },
        { "name": "data_type_date$subexpression$2", "symbols": [(lexer_1.lexerAny.has("word") ? { type: "word" } : word)], "postprocess": kw('without') },
        { "name": "data_type_date$subexpression$3", "symbols": [(lexer_1.lexerAny.has("word") ? { type: "word" } : word)], "postprocess": kw('time') },
        { "name": "data_type_date$subexpression$4", "symbols": [(lexer_1.lexerAny.has("word") ? { type: "word" } : word)], "postprocess": kw('zone') },
        { "name": "data_type_date", "symbols": ["data_type_date$subexpression$1", "data_type_date$subexpression$2", "data_type_date$subexpression$3", "data_type_date$subexpression$4"], "postprocess": x => (0, lexer_2.track)(x, { name: toStr(x, ' ') }) },
        { "name": "data_type_date$subexpression$5", "symbols": [(lexer_1.lexerAny.has("word") ? { type: "word" } : word)], "postprocess": anyKw('timestamp', 'time') },
        { "name": "data_type_date$subexpression$6", "symbols": ["lparen", "int", "rparen"], "postprocess": get(1) },
        { "name": "data_type_date$subexpression$7", "symbols": [(lexer_1.lexerAny.has("kw_with") ? { type: "kw_with" } : kw_with)] },
        { "name": "data_type_date$subexpression$7", "symbols": [(lexer_1.lexerAny.has("word") ? { type: "word" } : word)], "postprocess": kw('without') },
        { "name": "data_type_date$subexpression$8", "symbols": [(lexer_1.lexerAny.has("word") ? { type: "word" } : word)], "postprocess": kw('time') },
        { "name": "data_type_date$subexpression$9", "symbols": [(lexer_1.lexerAny.has("word") ? { type: "word" } : word)], "postprocess": kw('zone') },
        { "name": "data_type_date", "symbols": ["data_type_date$subexpression$5", "data_type_date$subexpression$6", "data_type_date$subexpression$7", "data_type_date$subexpression$8", "data_type_date$subexpression$9"], "postprocess": x => (0, lexer_2.track)(x, { name: `timestamp ${toStr(x[2])} time zone`, config: [(0, lexer_2.unbox)(x[1])] }) },
        { "name": "ident_aliased$subexpression$1", "symbols": [(lexer_1.lexerAny.has("kw_as") ? { type: "kw_as" } : kw_as), "ident"], "postprocess": last },
        { "name": "ident_aliased", "symbols": ["ident_aliased$subexpression$1"] },
        { "name": "ident_aliased", "symbols": ["ident"], "postprocess": unwrap },
        { "name": "table_ref", "symbols": ["qualified_name"], "postprocess": unwrap },
        { "name": "qcolumn$ebnf$1$subexpression$1", "symbols": ["dot", "ident"], "postprocess": last },
        { "name": "qcolumn$ebnf$1", "symbols": ["qcolumn$ebnf$1$subexpression$1"], "postprocess": id },
        { "name": "qcolumn$ebnf$1", "symbols": [], "postprocess": () => null },
        { "name": "qcolumn", "symbols": ["ident", "dot", "ident", "qcolumn$ebnf$1"], "postprocess": x => {
                if (!x[3]) {
                    return (0, lexer_2.track)(x, {
                        table: (0, lexer_2.unbox)(x[0]),
                        column: (0, lexer_2.unbox)(x[2]),
                    });
                }
                return (0, lexer_2.track)(x, {
                    schema: (0, lexer_2.unbox)(x[0]),
                    table: (0, lexer_2.unbox)(x[2]),
                    column: (0, lexer_2.unbox)(x[3]),
                });
            } },
        { "name": "table_ref_aliased$ebnf$1", "symbols": ["ident_aliased"], "postprocess": id },
        { "name": "table_ref_aliased$ebnf$1", "symbols": [], "postprocess": () => null },
        { "name": "table_ref_aliased", "symbols": ["table_ref", "table_ref_aliased$ebnf$1"], "postprocess": x => {
                const alias = unwrap(x[1]);
                return (0, lexer_2.track)(x, {
                    ...unwrap(x[0]),
                    ...alias ? { alias } : {},
                });
            } },
        { "name": "qualified_name", "symbols": ["qname_ident"], "postprocess": x => (0, lexer_2.track)(x, { name: toStr(x) }) },
        { "name": "qualified_name", "symbols": ["ident", "dot", "ident_extended"], "postprocess": x => {
                const schema = toStr(x[0]);
                const name = toStr(x[2]);
                return (0, lexer_2.track)(x, { schema, name });
            } },
        { "name": "qualified_name", "symbols": [(lexer_1.lexerAny.has("kw_current_schema") ? { type: "kw_current_schema" } : kw_current_schema)], "postprocess": x => (0, lexer_2.track)(x, { name: 'current_schema' }) },
        { "name": "qualified_name_mark_quotes", "symbols": ["qname_ident"], "postprocess": x => (0, lexer_2.track)(x, { name: toStr(x), ...(0, lexer_2.doubleQuoted)(x) }) },
        { "name": "qualified_name_mark_quotes", "symbols": ["ident", "dot", "ident_extended"], "postprocess": x => {
                const schema = toStr(x[0]);
                const name = toStr(x[2]);
                return (0, lexer_2.track)(x, { schema, name, ...(0, lexer_2.doubleQuoted)(x[2]) });
            } },
        { "name": "qualified_name_mark_quotes", "symbols": [(lexer_1.lexerAny.has("kw_current_schema") ? { type: "kw_current_schema" } : kw_current_schema)], "postprocess": x => (0, lexer_2.track)(x, { name: 'current_schema' }) },
        { "name": "qname_ident", "symbols": ["ident"] },
        { "name": "qname_ident", "symbols": [(lexer_1.lexerAny.has("kw_precision") ? { type: "kw_precision" } : kw_precision)] },
        { "name": "qname", "symbols": ["qualified_name"], "postprocess": unwrap },
        { "name": "any_keyword", "symbols": [(lexer_1.lexerAny.has("kw_all") ? { type: "kw_all" } : kw_all)] },
        { "name": "any_keyword", "symbols": [(lexer_1.lexerAny.has("kw_analyse") ? { type: "kw_analyse" } : kw_analyse)] },
        { "name": "any_keyword", "symbols": [(lexer_1.lexerAny.has("kw_analyze") ? { type: "kw_analyze" } : kw_analyze)] },
        { "name": "any_keyword", "symbols": [(lexer_1.lexerAny.has("kw_and") ? { type: "kw_and" } : kw_and)] },
        { "name": "any_keyword", "symbols": [(lexer_1.lexerAny.has("kw_any") ? { type: "kw_any" } : kw_any)] },
        { "name": "any_keyword", "symbols": [(lexer_1.lexerAny.has("kw_array") ? { type: "kw_array" } : kw_array)] },
        { "name": "any_keyword", "symbols": [(lexer_1.lexerAny.has("kw_as") ? { type: "kw_as" } : kw_as)] },
        { "name": "any_keyword", "symbols": [(lexer_1.lexerAny.has("kw_asc") ? { type: "kw_asc" } : kw_asc)] },
        { "name": "any_keyword", "symbols": [(lexer_1.lexerAny.has("kw_asymmetric") ? { type: "kw_asymmetric" } : kw_asymmetric)] },
        { "name": "any_keyword", "symbols": [(lexer_1.lexerAny.has("kw_authorization") ? { type: "kw_authorization" } : kw_authorization)] },
        { "name": "any_keyword", "symbols": [(lexer_1.lexerAny.has("kw_binary") ? { type: "kw_binary" } : kw_binary)] },
        { "name": "any_keyword", "symbols": [(lexer_1.lexerAny.has("kw_both") ? { type: "kw_both" } : kw_both)] },
        { "name": "any_keyword", "symbols": [(lexer_1.lexerAny.has("kw_case") ? { type: "kw_case" } : kw_case)] },
        { "name": "any_keyword", "symbols": [(lexer_1.lexerAny.has("kw_cast") ? { type: "kw_cast" } : kw_cast)] },
        { "name": "any_keyword", "symbols": [(lexer_1.lexerAny.has("kw_check") ? { type: "kw_check" } : kw_check)] },
        { "name": "any_keyword", "symbols": [(lexer_1.lexerAny.has("kw_collate") ? { type: "kw_collate" } : kw_collate)] },
        { "name": "any_keyword", "symbols": [(lexer_1.lexerAny.has("kw_collation") ? { type: "kw_collation" } : kw_collation)] },
        { "name": "any_keyword", "symbols": [(lexer_1.lexerAny.has("kw_concurrently") ? { type: "kw_concurrently" } : kw_concurrently)] },
        { "name": "any_keyword", "symbols": [(lexer_1.lexerAny.has("kw_constraint") ? { type: "kw_constraint" } : kw_constraint)] },
        { "name": "any_keyword", "symbols": [(lexer_1.lexerAny.has("kw_create") ? { type: "kw_create" } : kw_create)] },
        { "name": "any_keyword", "symbols": [(lexer_1.lexerAny.has("kw_cross") ? { type: "kw_cross" } : kw_cross)] },
        { "name": "any_keyword", "symbols": [(lexer_1.lexerAny.has("kw_current_catalog") ? { type: "kw_current_catalog" } : kw_current_catalog)] },
        { "name": "any_keyword", "symbols": [(lexer_1.lexerAny.has("kw_current_date") ? { type: "kw_current_date" } : kw_current_date)] },
        { "name": "any_keyword", "symbols": [(lexer_1.lexerAny.has("kw_current_role") ? { type: "kw_current_role" } : kw_current_role)] },
        { "name": "any_keyword", "symbols": [(lexer_1.lexerAny.has("kw_current_schema") ? { type: "kw_current_schema" } : kw_current_schema)] },
        { "name": "any_keyword", "symbols": [(lexer_1.lexerAny.has("kw_current_time") ? { type: "kw_current_time" } : kw_current_time)] },
        { "name": "any_keyword", "symbols": [(lexer_1.lexerAny.has("kw_current_timestamp") ? { type: "kw_current_timestamp" } : kw_current_timestamp)] },
        { "name": "any_keyword", "symbols": [(lexer_1.lexerAny.has("kw_current_user") ? { type: "kw_current_user" } : kw_current_user)] },
        { "name": "any_keyword", "symbols": [(lexer_1.lexerAny.has("kw_default") ? { type: "kw_default" } : kw_default)] },
        { "name": "any_keyword", "symbols": [(lexer_1.lexerAny.has("kw_deferrable") ? { type: "kw_deferrable" } : kw_deferrable)] },
        { "name": "any_keyword", "symbols": [(lexer_1.lexerAny.has("kw_desc") ? { type: "kw_desc" } : kw_desc)] },
        { "name": "any_keyword", "symbols": [(lexer_1.lexerAny.has("kw_distinct") ? { type: "kw_distinct" } : kw_distinct)] },
        { "name": "any_keyword", "symbols": [(lexer_1.lexerAny.has("kw_do") ? { type: "kw_do" } : kw_do)] },
        { "name": "any_keyword", "symbols": [(lexer_1.lexerAny.has("kw_else") ? { type: "kw_else" } : kw_else)] },
        { "name": "any_keyword", "symbols": [(lexer_1.lexerAny.has("kw_end") ? { type: "kw_end" } : kw_end)] },
        { "name": "any_keyword", "symbols": [(lexer_1.lexerAny.has("kw_except") ? { type: "kw_except" } : kw_except)] },
        { "name": "any_keyword", "symbols": [(lexer_1.lexerAny.has("kw_false") ? { type: "kw_false" } : kw_false)] },
        { "name": "any_keyword", "symbols": [(lexer_1.lexerAny.has("kw_fetch") ? { type: "kw_fetch" } : kw_fetch)] },
        { "name": "any_keyword", "symbols": [(lexer_1.lexerAny.has("kw_for") ? { type: "kw_for" } : kw_for)] },
        { "name": "any_keyword", "symbols": [(lexer_1.lexerAny.has("kw_foreign") ? { type: "kw_foreign" } : kw_foreign)] },
        { "name": "any_keyword", "symbols": [(lexer_1.lexerAny.has("kw_freeze") ? { type: "kw_freeze" } : kw_freeze)] },
        { "name": "any_keyword", "symbols": [(lexer_1.lexerAny.has("kw_from") ? { type: "kw_from" } : kw_from)] },
        { "name": "any_keyword", "symbols": [(lexer_1.lexerAny.has("kw_full") ? { type: "kw_full" } : kw_full)] },
        { "name": "any_keyword", "symbols": [(lexer_1.lexerAny.has("kw_grant") ? { type: "kw_grant" } : kw_grant)] },
        { "name": "any_keyword", "symbols": [(lexer_1.lexerAny.has("kw_group") ? { type: "kw_group" } : kw_group)] },
        { "name": "any_keyword", "symbols": [(lexer_1.lexerAny.has("kw_having") ? { type: "kw_having" } : kw_having)] },
        { "name": "any_keyword", "symbols": [(lexer_1.lexerAny.has("kw_ilike") ? { type: "kw_ilike" } : kw_ilike)] },
        { "name": "any_keyword", "symbols": [(lexer_1.lexerAny.has("kw_in") ? { type: "kw_in" } : kw_in)] },
        { "name": "any_keyword", "symbols": [(lexer_1.lexerAny.has("kw_initially") ? { type: "kw_initially" } : kw_initially)] },
        { "name": "any_keyword", "symbols": [(lexer_1.lexerAny.has("kw_inner") ? { type: "kw_inner" } : kw_inner)] },
        { "name": "any_keyword", "symbols": [(lexer_1.lexerAny.has("kw_intersect") ? { type: "kw_intersect" } : kw_intersect)] },
        { "name": "any_keyword", "symbols": [(lexer_1.lexerAny.has("kw_into") ? { type: "kw_into" } : kw_into)] },
        { "name": "any_keyword", "symbols": [(lexer_1.lexerAny.has("kw_is") ? { type: "kw_is" } : kw_is)] },
        { "name": "any_keyword", "symbols": [(lexer_1.lexerAny.has("kw_isnull") ? { type: "kw_isnull" } : kw_isnull)] },
        { "name": "any_keyword", "symbols": [(lexer_1.lexerAny.has("kw_join") ? { type: "kw_join" } : kw_join)] },
        { "name": "any_keyword", "symbols": [(lexer_1.lexerAny.has("kw_lateral") ? { type: "kw_lateral" } : kw_lateral)] },
        { "name": "any_keyword", "symbols": [(lexer_1.lexerAny.has("kw_leading") ? { type: "kw_leading" } : kw_leading)] },
        { "name": "any_keyword", "symbols": [(lexer_1.lexerAny.has("kw_left") ? { type: "kw_left" } : kw_left)] },
        { "name": "any_keyword", "symbols": [(lexer_1.lexerAny.has("kw_like") ? { type: "kw_like" } : kw_like)] },
        { "name": "any_keyword", "symbols": [(lexer_1.lexerAny.has("kw_limit") ? { type: "kw_limit" } : kw_limit)] },
        { "name": "any_keyword", "symbols": [(lexer_1.lexerAny.has("kw_localtime") ? { type: "kw_localtime" } : kw_localtime)] },
        { "name": "any_keyword", "symbols": [(lexer_1.lexerAny.has("kw_localtimestamp") ? { type: "kw_localtimestamp" } : kw_localtimestamp)] },
        { "name": "any_keyword", "symbols": [(lexer_1.lexerAny.has("kw_natural") ? { type: "kw_natural" } : kw_natural)] },
        { "name": "any_keyword", "symbols": [(lexer_1.lexerAny.has("kw_not") ? { type: "kw_not" } : kw_not)] },
        { "name": "any_keyword", "symbols": [(lexer_1.lexerAny.has("kw_notnull") ? { type: "kw_notnull" } : kw_notnull)] },
        { "name": "any_keyword", "symbols": [(lexer_1.lexerAny.has("kw_null") ? { type: "kw_null" } : kw_null)] },
        { "name": "any_keyword", "symbols": [(lexer_1.lexerAny.has("kw_offset") ? { type: "kw_offset" } : kw_offset)] },
        { "name": "any_keyword", "symbols": [(lexer_1.lexerAny.has("kw_on") ? { type: "kw_on" } : kw_on)] },
        { "name": "any_keyword", "symbols": [(lexer_1.lexerAny.has("kw_only") ? { type: "kw_only" } : kw_only)] },
        { "name": "any_keyword", "symbols": [(lexer_1.lexerAny.has("kw_or") ? { type: "kw_or" } : kw_or)] },
        { "name": "any_keyword", "symbols": [(lexer_1.lexerAny.has("kw_order") ? { type: "kw_order" } : kw_order)] },
        { "name": "any_keyword", "symbols": [(lexer_1.lexerAny.has("kw_outer") ? { type: "kw_outer" } : kw_outer)] },
        { "name": "any_keyword", "symbols": [(lexer_1.lexerAny.has("kw_overlaps") ? { type: "kw_overlaps" } : kw_overlaps)] },
        { "name": "any_keyword", "symbols": [(lexer_1.lexerAny.has("kw_placing") ? { type: "kw_placing" } : kw_placing)] },
        { "name": "any_keyword", "symbols": [(lexer_1.lexerAny.has("kw_primary") ? { type: "kw_primary" } : kw_primary)] },
        { "name": "any_keyword", "symbols": [(lexer_1.lexerAny.has("kw_references") ? { type: "kw_references" } : kw_references)] },
        { "name": "any_keyword", "symbols": [(lexer_1.lexerAny.has("kw_returning") ? { type: "kw_returning" } : kw_returning)] },
        { "name": "any_keyword", "symbols": [(lexer_1.lexerAny.has("kw_right") ? { type: "kw_right" } : kw_right)] },
        { "name": "any_keyword", "symbols": [(lexer_1.lexerAny.has("kw_select") ? { type: "kw_select" } : kw_select)] },
        { "name": "any_keyword", "symbols": [(lexer_1.lexerAny.has("kw_session_user") ? { type: "kw_session_user" } : kw_session_user)] },
        { "name": "any_keyword", "symbols": [(lexer_1.lexerAny.has("kw_similar") ? { type: "kw_similar" } : kw_similar)] },
        { "name": "any_keyword", "symbols": [(lexer_1.lexerAny.has("kw_some") ? { type: "kw_some" } : kw_some)] },
        { "name": "any_keyword", "symbols": [(lexer_1.lexerAny.has("kw_symmetric") ? { type: "kw_symmetric" } : kw_symmetric)] },
        { "name": "any_keyword", "symbols": [(lexer_1.lexerAny.has("kw_table") ? { type: "kw_table" } : kw_table)] },
        { "name": "any_keyword", "symbols": [(lexer_1.lexerAny.has("kw_tablesample") ? { type: "kw_tablesample" } : kw_tablesample)] },
        { "name": "any_keyword", "symbols": [(lexer_1.lexerAny.has("kw_then") ? { type: "kw_then" } : kw_then)] },
        { "name": "any_keyword", "symbols": [(lexer_1.lexerAny.has("kw_to") ? { type: "kw_to" } : kw_to)] },
        { "name": "any_keyword", "symbols": [(lexer_1.lexerAny.has("kw_trailing") ? { type: "kw_trailing" } : kw_trailing)] },
        { "name": "any_keyword", "symbols": [(lexer_1.lexerAny.has("kw_true") ? { type: "kw_true" } : kw_true)] },
        { "name": "any_keyword", "symbols": [(lexer_1.lexerAny.has("kw_union") ? { type: "kw_union" } : kw_union)] },
        { "name": "any_keyword", "symbols": [(lexer_1.lexerAny.has("kw_unique") ? { type: "kw_unique" } : kw_unique)] },
        { "name": "any_keyword", "symbols": [(lexer_1.lexerAny.has("kw_user") ? { type: "kw_user" } : kw_user)] },
        { "name": "any_keyword", "symbols": [(lexer_1.lexerAny.has("kw_using") ? { type: "kw_using" } : kw_using)] },
        { "name": "any_keyword", "symbols": [(lexer_1.lexerAny.has("kw_variadic") ? { type: "kw_variadic" } : kw_variadic)] },
        { "name": "any_keyword", "symbols": [(lexer_1.lexerAny.has("kw_verbose") ? { type: "kw_verbose" } : kw_verbose)] },
        { "name": "any_keyword", "symbols": [(lexer_1.lexerAny.has("kw_when") ? { type: "kw_when" } : kw_when)] },
        { "name": "any_keyword", "symbols": [(lexer_1.lexerAny.has("kw_where") ? { type: "kw_where" } : kw_where)] },
        { "name": "any_keyword", "symbols": [(lexer_1.lexerAny.has("kw_window") ? { type: "kw_window" } : kw_window)] },
        { "name": "any_keyword", "symbols": [(lexer_1.lexerAny.has("kw_with") ? { type: "kw_with" } : kw_with)] },
        { "name": "ident_extended", "symbols": ["ident"] },
        { "name": "ident_extended", "symbols": ["any_keyword"] },
        { "name": "select_statement$ebnf$1", "symbols": ["select_from"], "postprocess": id },
        { "name": "select_statement$ebnf$1", "symbols": [], "postprocess": () => null },
        { "name": "select_statement$ebnf$2", "symbols": ["select_where"], "postprocess": id },
        { "name": "select_statement$ebnf$2", "symbols": [], "postprocess": () => null },
        { "name": "select_statement$ebnf$3", "symbols": ["select_groupby"], "postprocess": id },
        { "name": "select_statement$ebnf$3", "symbols": [], "postprocess": () => null },
        { "name": "select_statement$ebnf$4", "symbols": ["select_order_by"], "postprocess": id },
        { "name": "select_statement$ebnf$4", "symbols": [], "postprocess": () => null },
        { "name": "select_statement$ebnf$5", "symbols": ["select_limit_offset"], "postprocess": id },
        { "name": "select_statement$ebnf$5", "symbols": [], "postprocess": () => null },
        { "name": "select_statement$ebnf$6", "symbols": ["select_for"], "postprocess": id },
        { "name": "select_statement$ebnf$6", "symbols": [], "postprocess": () => null },
        { "name": "select_statement", "symbols": ["select_what", "select_statement$ebnf$1", "select_statement$ebnf$2", "select_statement$ebnf$3", "select_statement$ebnf$4", "select_statement$ebnf$5", "select_statement$ebnf$6"], "postprocess": x => {
                let [what, from, where, groupBy, orderBy, limit, selectFor] = x;
                from = unwrap(from);
                groupBy = groupBy && (groupBy.length === 1 && groupBy[0].type === 'list' ? groupBy[0].expressions : groupBy);
                return (0, lexer_2.track)(x, {
                    ...what,
                    ...from ? { from: Array.isArray(from) ? from : [from] } : {},
                    ...groupBy ? { groupBy } : {},
                    ...limit ? { limit: unwrap(limit) } : {},
                    ...orderBy ? { orderBy } : {},
                    ...where ? { where } : {},
                    ...selectFor ? { for: selectFor[1] } : {},
                    type: 'select',
                });
            } },
        { "name": "select_from", "symbols": [(lexer_1.lexerAny.has("kw_from") ? { type: "kw_from" } : kw_from), "select_from_items"], "postprocess": last },
        { "name": "select_from_items$ebnf$1", "symbols": [] },
        { "name": "select_from_items$ebnf$1$subexpression$1", "symbols": ["comma", "select_from_item"], "postprocess": last },
        { "name": "select_from_items$ebnf$1", "symbols": ["select_from_items$ebnf$1", "select_from_items$ebnf$1$subexpression$1"], "postprocess": (d) => d[0].concat([d[1]]) },
        { "name": "select_from_items", "symbols": ["select_from_item", "select_from_items$ebnf$1"], "postprocess": ([head, tail]) => {
                return [...head, ...(flatten(tail) || [])];
            } },
        { "name": "select_from_item", "symbols": ["select_from_subject"] },
        { "name": "select_from_item", "symbols": ["select_from_item_joins"], "postprocess": get(0) },
        { "name": "select_from_item_joins$subexpression$1", "symbols": ["select_from_item"], "postprocess": get(0) },
        { "name": "select_from_item_joins", "symbols": ["select_from_item_joins$subexpression$1", "select_table_join"], "postprocess": flatten },
        { "name": "select_from_item_joins", "symbols": ["lparen", "select_from_item_joins", "rparen"], "postprocess": get(1) },
        { "name": "select_from_subject", "symbols": ["stb_table"], "postprocess": unwrap },
        { "name": "select_from_subject", "symbols": ["stb_statement"], "postprocess": unwrap },
        { "name": "select_from_subject", "symbols": ["stb_call"], "postprocess": unwrap },
        { "name": "stb_opts$ebnf$1", "symbols": ["collist_paren"], "postprocess": id },
        { "name": "stb_opts$ebnf$1", "symbols": [], "postprocess": () => null },
        { "name": "stb_opts", "symbols": ["ident_aliased", "stb_opts$ebnf$1"], "postprocess": x => (0, lexer_2.track)(x, {
                alias: toStr(x[0]),
                ...x[1] && { columnNames: (0, lexer_2.unbox)(x[1]).map(asName) },
            }) },
        { "name": "stb_table$ebnf$1", "symbols": ["stb_opts"], "postprocess": id },
        { "name": "stb_table$ebnf$1", "symbols": [], "postprocess": () => null },
        { "name": "stb_table", "symbols": ["table_ref", "stb_table$ebnf$1"], "postprocess": x => {
                return (0, lexer_2.track)(x, {
                    type: 'table',
                    name: (0, lexer_2.track)(x, {
                        ...x[0],
                        ...x[1],
                    }),
                });
            } },
        { "name": "stb_statement", "symbols": ["selection_paren", "stb_opts"], "postprocess": x => (0, lexer_2.track)(x, {
                type: 'statement',
                statement: unwrap(x[0]),
                ...x[1],
            }) },
        { "name": "select_values", "symbols": ["kw_values", "insert_values"], "postprocess": x => (0, lexer_2.track)(x, {
                type: 'values',
                values: x[1],
            }) },
        { "name": "stb_call$ebnf$1", "symbols": ["kw_withordinality"], "postprocess": id },
        { "name": "stb_call$ebnf$1", "symbols": [], "postprocess": () => null },
        { "name": "stb_call$ebnf$2", "symbols": ["stb_call_alias"], "postprocess": id },
        { "name": "stb_call$ebnf$2", "symbols": [], "postprocess": () => null },
        { "name": "stb_call", "symbols": ["expr_function_call", "stb_call$ebnf$1", "stb_call$ebnf$2"], "postprocess": x => {
                const withOrdinality = x[1];
                const alias = x[2];
                if (!withOrdinality && !alias) {
                    return x[0];
                }
                return (0, lexer_2.track)(x, {
                    ...x[0],
                    ...withOrdinality && { withOrdinality: true },
                    alias: alias ? asNameWithColumns(alias[0], alias[1]) : undefined,
                });
            } },
        { "name": "stb_call_alias$subexpression$1$ebnf$1", "symbols": [(lexer_1.lexerAny.has("kw_as") ? { type: "kw_as" } : kw_as)], "postprocess": id },
        { "name": "stb_call_alias$subexpression$1$ebnf$1", "symbols": [], "postprocess": () => null },
        { "name": "stb_call_alias$subexpression$1", "symbols": ["stb_call_alias$subexpression$1$ebnf$1", "ident"], "postprocess": last },
        { "name": "stb_call_alias$ebnf$1", "symbols": ["stb_call_alias_list"], "postprocess": id },
        { "name": "stb_call_alias$ebnf$1", "symbols": [], "postprocess": () => null },
        { "name": "stb_call_alias", "symbols": ["stb_call_alias$subexpression$1", "stb_call_alias$ebnf$1"] },
        { "name": "stb_call_alias_list", "symbols": ["lparen", "stb_call_alias_list_raw", "rparen"], "postprocess": get(1) },
        { "name": "stb_call_alias_list_raw$ebnf$1", "symbols": [] },
        { "name": "stb_call_alias_list_raw$ebnf$1$subexpression$1", "symbols": ["comma", "ident"], "postprocess": last },
        { "name": "stb_call_alias_list_raw$ebnf$1", "symbols": ["stb_call_alias_list_raw$ebnf$1", "stb_call_alias_list_raw$ebnf$1$subexpression$1"], "postprocess": (d) => d[0].concat([d[1]]) },
        { "name": "stb_call_alias_list_raw", "symbols": ["ident", "stb_call_alias_list_raw$ebnf$1"], "postprocess": ([head, tail]) => {
                return [head, ...(tail || [])];
            } },
        { "name": "select_table_join$ebnf$1", "symbols": ["select_table_join_clause"], "postprocess": id },
        { "name": "select_table_join$ebnf$1", "symbols": [], "postprocess": () => null },
        { "name": "select_table_join", "symbols": ["select_join_op", (lexer_1.lexerAny.has("kw_join") ? { type: "kw_join" } : kw_join), "select_from_subject", "select_table_join$ebnf$1"], "postprocess": x => (0, lexer_2.track)(x, {
                ...unwrap(x[2]),
                join: {
                    type: toStr(x[0], ' '),
                    ...x[3] && unwrap(x[3]),
                }
            }) },
        { "name": "select_table_join_clause", "symbols": [(lexer_1.lexerAny.has("kw_on") ? { type: "kw_on" } : kw_on), "expr"], "postprocess": x => (0, lexer_2.track)(x, { on: last(x) }) },
        { "name": "select_table_join_clause$macrocall$2", "symbols": ["ident"] },
        { "name": "select_table_join_clause$macrocall$1$ebnf$1", "symbols": [] },
        { "name": "select_table_join_clause$macrocall$1$ebnf$1$subexpression$1", "symbols": [(lexer_1.lexerAny.has("comma") ? { type: "comma" } : comma), "select_table_join_clause$macrocall$2"], "postprocess": last },
        { "name": "select_table_join_clause$macrocall$1$ebnf$1", "symbols": ["select_table_join_clause$macrocall$1$ebnf$1", "select_table_join_clause$macrocall$1$ebnf$1$subexpression$1"], "postprocess": (d) => d[0].concat([d[1]]) },
        { "name": "select_table_join_clause$macrocall$1", "symbols": ["select_table_join_clause$macrocall$2", "select_table_join_clause$macrocall$1$ebnf$1"], "postprocess": ([head, tail]) => {
                return [unwrap(head), ...(tail.map(unwrap) || [])];
            } },
        { "name": "select_table_join_clause", "symbols": [(lexer_1.lexerAny.has("kw_using") ? { type: "kw_using" } : kw_using), "lparen", "select_table_join_clause$macrocall$1", "rparen"], "postprocess": x => (0, lexer_2.track)(x, { using: x[2].map(asName) }) },
        { "name": "select_join_op$subexpression$1$ebnf$1", "symbols": [(lexer_1.lexerAny.has("kw_inner") ? { type: "kw_inner" } : kw_inner)], "postprocess": id },
        { "name": "select_join_op$subexpression$1$ebnf$1", "symbols": [], "postprocess": () => null },
        { "name": "select_join_op$subexpression$1", "symbols": ["select_join_op$subexpression$1$ebnf$1"], "postprocess": x => (0, lexer_2.box)(x, 'INNER JOIN') },
        { "name": "select_join_op", "symbols": ["select_join_op$subexpression$1"] },
        { "name": "select_join_op$subexpression$2", "symbols": [(lexer_1.lexerAny.has("kw_cross") ? { type: "kw_cross" } : kw_cross)], "postprocess": x => (0, lexer_2.box)(x, 'CROSS JOIN') },
        { "name": "select_join_op", "symbols": ["select_join_op$subexpression$2"] },
        { "name": "select_join_op$subexpression$3$ebnf$1", "symbols": [(lexer_1.lexerAny.has("kw_outer") ? { type: "kw_outer" } : kw_outer)], "postprocess": id },
        { "name": "select_join_op$subexpression$3$ebnf$1", "symbols": [], "postprocess": () => null },
        { "name": "select_join_op$subexpression$3", "symbols": [(lexer_1.lexerAny.has("kw_left") ? { type: "kw_left" } : kw_left), "select_join_op$subexpression$3$ebnf$1"], "postprocess": x => (0, lexer_2.box)(x, 'LEFT JOIN') },
        { "name": "select_join_op", "symbols": ["select_join_op$subexpression$3"] },
        { "name": "select_join_op$subexpression$4$ebnf$1", "symbols": [(lexer_1.lexerAny.has("kw_outer") ? { type: "kw_outer" } : kw_outer)], "postprocess": id },
        { "name": "select_join_op$subexpression$4$ebnf$1", "symbols": [], "postprocess": () => null },
        { "name": "select_join_op$subexpression$4", "symbols": [(lexer_1.lexerAny.has("kw_right") ? { type: "kw_right" } : kw_right), "select_join_op$subexpression$4$ebnf$1"], "postprocess": x => (0, lexer_2.box)(x, 'RIGHT JOIN') },
        { "name": "select_join_op", "symbols": ["select_join_op$subexpression$4"] },
        { "name": "select_join_op$subexpression$5$ebnf$1", "symbols": [(lexer_1.lexerAny.has("kw_outer") ? { type: "kw_outer" } : kw_outer)], "postprocess": id },
        { "name": "select_join_op$subexpression$5$ebnf$1", "symbols": [], "postprocess": () => null },
        { "name": "select_join_op$subexpression$5", "symbols": [(lexer_1.lexerAny.has("kw_full") ? { type: "kw_full" } : kw_full), "select_join_op$subexpression$5$ebnf$1"], "postprocess": x => (0, lexer_2.box)(x, 'FULL JOIN') },
        { "name": "select_join_op", "symbols": ["select_join_op$subexpression$5"] },
        { "name": "select_what$ebnf$1", "symbols": ["select_distinct"], "postprocess": id },
        { "name": "select_what$ebnf$1", "symbols": [], "postprocess": () => null },
        { "name": "select_what$ebnf$2", "symbols": ["select_expr_list_aliased"], "postprocess": id },
        { "name": "select_what$ebnf$2", "symbols": [], "postprocess": () => null },
        { "name": "select_what", "symbols": [(lexer_1.lexerAny.has("kw_select") ? { type: "kw_select" } : kw_select), "select_what$ebnf$1", "select_what$ebnf$2"], "postprocess": x => (0, lexer_2.track)(x, {
                columns: x[2],
                ...x[1] && { distinct: (0, lexer_2.unbox)(x[1]) },
            }) },
        { "name": "select_expr_list_aliased$ebnf$1", "symbols": [] },
        { "name": "select_expr_list_aliased$ebnf$1$subexpression$1", "symbols": ["comma", "select_expr_list_item"], "postprocess": last },
        { "name": "select_expr_list_aliased$ebnf$1", "symbols": ["select_expr_list_aliased$ebnf$1", "select_expr_list_aliased$ebnf$1$subexpression$1"], "postprocess": (d) => d[0].concat([d[1]]) },
        { "name": "select_expr_list_aliased", "symbols": ["select_expr_list_item", "select_expr_list_aliased$ebnf$1"], "postprocess": ([head, tail]) => {
                return [head, ...(tail || [])];
            } },
        { "name": "select_expr_list_item$ebnf$1", "symbols": ["ident_aliased"], "postprocess": id },
        { "name": "select_expr_list_item$ebnf$1", "symbols": [], "postprocess": () => null },
        { "name": "select_expr_list_item", "symbols": ["expr", "select_expr_list_item$ebnf$1"], "postprocess": x => (0, lexer_2.track)(x, {
                expr: x[0],
                ...x[1] ? { alias: asName(x[1]) } : {},
            }) },
        { "name": "select_distinct", "symbols": [(lexer_1.lexerAny.has("kw_all") ? { type: "kw_all" } : kw_all)], "postprocess": x => (0, lexer_2.box)(x, 'all') },
        { "name": "select_distinct$ebnf$1$subexpression$1", "symbols": [(lexer_1.lexerAny.has("kw_on") ? { type: "kw_on" } : kw_on), "lparen", "expr_list_raw", "rparen"], "postprocess": get(2) },
        { "name": "select_distinct$ebnf$1", "symbols": ["select_distinct$ebnf$1$subexpression$1"], "postprocess": id },
        { "name": "select_distinct$ebnf$1", "symbols": [], "postprocess": () => null },
        { "name": "select_distinct", "symbols": [(lexer_1.lexerAny.has("kw_distinct") ? { type: "kw_distinct" } : kw_distinct), "select_distinct$ebnf$1"], "postprocess": x => (0, lexer_2.box)(x, x[1] || 'distinct') },
        { "name": "select_where", "symbols": [(lexer_1.lexerAny.has("kw_where") ? { type: "kw_where" } : kw_where), "expr"], "postprocess": last },
        { "name": "select_groupby", "symbols": [(lexer_1.lexerAny.has("kw_group") ? { type: "kw_group" } : kw_group), "kw_by", "expr_list_raw"], "postprocess": last },
        { "name": "select_limit_offset$ebnf$1$subexpression$1", "symbols": ["select_offset"] },
        { "name": "select_limit_offset$ebnf$1$subexpression$1", "symbols": ["select_limit"] },
        { "name": "select_limit_offset$ebnf$1", "symbols": ["select_limit_offset$ebnf$1$subexpression$1"] },
        { "name": "select_limit_offset$ebnf$1$subexpression$2", "symbols": ["select_offset"] },
        { "name": "select_limit_offset$ebnf$1$subexpression$2", "symbols": ["select_limit"] },
        { "name": "select_limit_offset$ebnf$1", "symbols": ["select_limit_offset$ebnf$1", "select_limit_offset$ebnf$1$subexpression$2"], "postprocess": (d) => d[0].concat([d[1]]) },
        { "name": "select_limit_offset", "symbols": ["select_limit_offset$ebnf$1"], "postprocess": (x, rej) => {
                const value = unwrap(x);
                if (!Array.isArray(value)) {
                    return (0, lexer_2.track)(x, value);
                }
                if (value.length != 2) {
                    return rej;
                }
                const a = unwrap(value[0]);
                const b = unwrap(value[1]);
                if (a.offset && b.offset || a.limit && b.limit) {
                    return rej;
                }
                return (0, lexer_2.track)(x, {
                    ...a,
                    ...b,
                });
            } },
        { "name": "select_offset$ebnf$1$subexpression$1", "symbols": ["kw_row"] },
        { "name": "select_offset$ebnf$1$subexpression$1", "symbols": ["kw_rows"] },
        { "name": "select_offset$ebnf$1", "symbols": ["select_offset$ebnf$1$subexpression$1"], "postprocess": id },
        { "name": "select_offset$ebnf$1", "symbols": [], "postprocess": () => null },
        { "name": "select_offset", "symbols": [(lexer_1.lexerAny.has("kw_offset") ? { type: "kw_offset" } : kw_offset), "expr_nostar", "select_offset$ebnf$1"], "postprocess": x => (0, lexer_2.track)(x, { offset: unwrap(x[1]) }) },
        { "name": "select_limit$subexpression$1", "symbols": ["select_limit_1"] },
        { "name": "select_limit$subexpression$1", "symbols": ["select_limit_2"] },
        { "name": "select_limit", "symbols": ["select_limit$subexpression$1"], "postprocess": x => (0, lexer_2.track)(x, { limit: unwrap(x) }) },
        { "name": "select_limit_1", "symbols": [(lexer_1.lexerAny.has("kw_limit") ? { type: "kw_limit" } : kw_limit), "expr_nostar"], "postprocess": last },
        { "name": "select_limit_2$ebnf$1$subexpression$1", "symbols": ["kw_first"] },
        { "name": "select_limit_2$ebnf$1$subexpression$1", "symbols": ["kw_next"] },
        { "name": "select_limit_2$ebnf$1", "symbols": ["select_limit_2$ebnf$1$subexpression$1"], "postprocess": id },
        { "name": "select_limit_2$ebnf$1", "symbols": [], "postprocess": () => null },
        { "name": "select_limit_2$subexpression$1", "symbols": ["kw_row"] },
        { "name": "select_limit_2$subexpression$1", "symbols": ["kw_rows"] },
        { "name": "select_limit_2", "symbols": [(lexer_1.lexerAny.has("kw_fetch") ? { type: "kw_fetch" } : kw_fetch), "select_limit_2$ebnf$1", "expr_nostar", "select_limit_2$subexpression$1", (lexer_1.lexerAny.has("kw_only") ? { type: "kw_only" } : kw_only)], "postprocess": get(2) },
        { "name": "select_for$subexpression$1", "symbols": ["kw_update"], "postprocess": x => (0, lexer_2.track)(x, { type: 'update' }) },
        { "name": "select_for$subexpression$1", "symbols": ["kw_no", "kw_key", "kw_update"], "postprocess": x => (0, lexer_2.track)(x, { type: 'no key update' }) },
        { "name": "select_for$subexpression$1", "symbols": ["kw_share"], "postprocess": x => (0, lexer_2.track)(x, { type: 'share' }) },
        { "name": "select_for$subexpression$1", "symbols": ["kw_key", "kw_share"], "postprocess": x => (0, lexer_2.track)(x, { type: 'key share' }) },
        { "name": "select_for", "symbols": [(lexer_1.lexerAny.has("kw_for") ? { type: "kw_for" } : kw_for), "select_for$subexpression$1"] },
        { "name": "select_order_by$subexpression$1", "symbols": [(lexer_1.lexerAny.has("kw_order") ? { type: "kw_order" } : kw_order), "kw_by"] },
        { "name": "select_order_by$ebnf$1", "symbols": [] },
        { "name": "select_order_by$ebnf$1$subexpression$1", "symbols": ["comma", "select_order_by_expr"], "postprocess": last },
        { "name": "select_order_by$ebnf$1", "symbols": ["select_order_by$ebnf$1", "select_order_by$ebnf$1$subexpression$1"], "postprocess": (d) => d[0].concat([d[1]]) },
        { "name": "select_order_by", "symbols": ["select_order_by$subexpression$1", "select_order_by_expr", "select_order_by$ebnf$1"], "postprocess": ([_, head, tail]) => {
                return [head, ...(tail || [])];
            } },
        { "name": "select_order_by_expr$ebnf$1$subexpression$1", "symbols": [(lexer_1.lexerAny.has("kw_asc") ? { type: "kw_asc" } : kw_asc)] },
        { "name": "select_order_by_expr$ebnf$1$subexpression$1", "symbols": [(lexer_1.lexerAny.has("kw_desc") ? { type: "kw_desc" } : kw_desc)] },
        { "name": "select_order_by_expr$ebnf$1", "symbols": ["select_order_by_expr$ebnf$1$subexpression$1"], "postprocess": id },
        { "name": "select_order_by_expr$ebnf$1", "symbols": [], "postprocess": () => null },
        { "name": "select_order_by_expr$ebnf$2$subexpression$1$subexpression$1", "symbols": ["kw_first"] },
        { "name": "select_order_by_expr$ebnf$2$subexpression$1$subexpression$1", "symbols": ["kw_last"] },
        { "name": "select_order_by_expr$ebnf$2$subexpression$1", "symbols": ["kw_nulls", "select_order_by_expr$ebnf$2$subexpression$1$subexpression$1"], "postprocess": last },
        { "name": "select_order_by_expr$ebnf$2", "symbols": ["select_order_by_expr$ebnf$2$subexpression$1"], "postprocess": id },
        { "name": "select_order_by_expr$ebnf$2", "symbols": [], "postprocess": () => null },
        { "name": "select_order_by_expr", "symbols": ["expr", "select_order_by_expr$ebnf$1", "select_order_by_expr$ebnf$2"], "postprocess": x => (0, lexer_2.track)(x, {
                by: x[0],
                ...x[1] && { order: toStr(x[1]).toUpperCase() },
                ...x[2] && { nulls: toStr(x[2]).toUpperCase() },
            }) },
        { "name": "expr", "symbols": ["expr_nostar"], "postprocess": unwrap },
        { "name": "expr", "symbols": ["expr_star"], "postprocess": unwrap },
        { "name": "expr_nostar", "symbols": ["expr_paren"], "postprocess": unwrap },
        { "name": "expr_nostar", "symbols": ["expr_or"], "postprocess": unwrap },
        { "name": "expr_paren$subexpression$1", "symbols": ["expr_or_select"] },
        { "name": "expr_paren$subexpression$1", "symbols": ["expr_list_many"] },
        { "name": "expr_paren", "symbols": ["lparen", "expr_paren$subexpression$1", "rparen"], "postprocess": get(1) },
        { "name": "expr_or$macrocall$2$macrocall$2", "symbols": [(lexer_1.lexerAny.has("kw_or") ? { type: "kw_or" } : kw_or)] },
        { "name": "expr_or$macrocall$2$macrocall$1", "symbols": ["expr_or$macrocall$2$macrocall$2"], "postprocess": x => (0, lexer_2.track)(x, {
                op: (toStr(x, ' ') || '<error>').toUpperCase()
            }) },
        { "name": "expr_or$macrocall$2", "symbols": ["expr_or$macrocall$2$macrocall$1"] },
        { "name": "expr_or$macrocall$3", "symbols": ["expr_or"] },
        { "name": "expr_or$macrocall$4", "symbols": ["expr_and"] },
        { "name": "expr_or$macrocall$1$subexpression$1", "symbols": ["expr_or$macrocall$3"] },
        { "name": "expr_or$macrocall$1$subexpression$1", "symbols": ["expr_paren"] },
        { "name": "expr_or$macrocall$1$subexpression$2", "symbols": ["expr_or$macrocall$4"] },
        { "name": "expr_or$macrocall$1$subexpression$2", "symbols": ["expr_paren"] },
        { "name": "expr_or$macrocall$1", "symbols": ["expr_or$macrocall$1$subexpression$1", "expr_or$macrocall$2", "expr_or$macrocall$1$subexpression$2"], "postprocess": x => (0, lexer_2.track)(x, {
                type: 'binary',
                left: unwrap(x[0]),
                right: unwrap(x[2]),
                ...unwrap(x[1]),
            }) },
        { "name": "expr_or$macrocall$1", "symbols": ["expr_or$macrocall$4"], "postprocess": unwrap },
        { "name": "expr_or", "symbols": ["expr_or$macrocall$1"] },
        { "name": "expr_and$macrocall$2$macrocall$2", "symbols": [(lexer_1.lexerAny.has("kw_and") ? { type: "kw_and" } : kw_and)] },
        { "name": "expr_and$macrocall$2$macrocall$1", "symbols": ["expr_and$macrocall$2$macrocall$2"], "postprocess": x => (0, lexer_2.track)(x, {
                op: (toStr(x, ' ') || '<error>').toUpperCase()
            }) },
        { "name": "expr_and$macrocall$2", "symbols": ["expr_and$macrocall$2$macrocall$1"] },
        { "name": "expr_and$macrocall$3", "symbols": ["expr_and"] },
        { "name": "expr_and$macrocall$4", "symbols": ["expr_not"] },
        { "name": "expr_and$macrocall$1$subexpression$1", "symbols": ["expr_and$macrocall$3"] },
        { "name": "expr_and$macrocall$1$subexpression$1", "symbols": ["expr_paren"] },
        { "name": "expr_and$macrocall$1$subexpression$2", "symbols": ["expr_and$macrocall$4"] },
        { "name": "expr_and$macrocall$1$subexpression$2", "symbols": ["expr_paren"] },
        { "name": "expr_and$macrocall$1", "symbols": ["expr_and$macrocall$1$subexpression$1", "expr_and$macrocall$2", "expr_and$macrocall$1$subexpression$2"], "postprocess": x => (0, lexer_2.track)(x, {
                type: 'binary',
                left: unwrap(x[0]),
                right: unwrap(x[2]),
                ...unwrap(x[1]),
            }) },
        { "name": "expr_and$macrocall$1", "symbols": ["expr_and$macrocall$4"], "postprocess": unwrap },
        { "name": "expr_and", "symbols": ["expr_and$macrocall$1"] },
        { "name": "expr_not$macrocall$2$macrocall$2", "symbols": [(lexer_1.lexerAny.has("kw_not") ? { type: "kw_not" } : kw_not)] },
        { "name": "expr_not$macrocall$2$macrocall$1", "symbols": ["expr_not$macrocall$2$macrocall$2"], "postprocess": x => (0, lexer_2.track)(x, {
                op: (toStr(x, ' ') || '<error>').toUpperCase()
            }) },
        { "name": "expr_not$macrocall$2", "symbols": ["expr_not$macrocall$2$macrocall$1"] },
        { "name": "expr_not$macrocall$3", "symbols": ["expr_not"] },
        { "name": "expr_not$macrocall$4", "symbols": ["expr_eq"] },
        { "name": "expr_not$macrocall$1$subexpression$1", "symbols": ["expr_not$macrocall$3"] },
        { "name": "expr_not$macrocall$1$subexpression$1", "symbols": ["expr_paren"] },
        { "name": "expr_not$macrocall$1", "symbols": ["expr_not$macrocall$2", "expr_not$macrocall$1$subexpression$1"], "postprocess": x => (0, lexer_2.track)(x, {
                type: 'unary',
                ...unwrap(x[0]),
                operand: unwrap(x[1]),
            }) },
        { "name": "expr_not$macrocall$1", "symbols": ["expr_not$macrocall$4"], "postprocess": unwrap },
        { "name": "expr_not", "symbols": ["expr_not$macrocall$1"] },
        { "name": "expr_eq$macrocall$2$macrocall$2$subexpression$1", "symbols": [(lexer_1.lexerAny.has("op_eq") ? { type: "op_eq" } : op_eq)] },
        { "name": "expr_eq$macrocall$2$macrocall$2$subexpression$1", "symbols": [(lexer_1.lexerAny.has("op_neq") ? { type: "op_neq" } : op_neq)] },
        { "name": "expr_eq$macrocall$2$macrocall$2", "symbols": ["expr_eq$macrocall$2$macrocall$2$subexpression$1"] },
        { "name": "expr_eq$macrocall$2$macrocall$1$macrocall$2", "symbols": ["expr_eq$macrocall$2$macrocall$2"] },
        { "name": "expr_eq$macrocall$2$macrocall$1$macrocall$1", "symbols": ["expr_eq$macrocall$2$macrocall$1$macrocall$2"], "postprocess": x => (0, lexer_2.track)(x, {
                op: (toStr(x, ' ') || '<error>').toUpperCase()
            }) },
        { "name": "expr_eq$macrocall$2$macrocall$1", "symbols": ["expr_eq$macrocall$2$macrocall$1$macrocall$1"], "postprocess": unwrap },
        { "name": "expr_eq$macrocall$2$macrocall$1", "symbols": ["kw_operator", "lparen", "ident", "dot", "expr_eq$macrocall$2$macrocall$2", "rparen"], "postprocess": x => (0, lexer_2.track)(x, {
                op: (toStr(x[4], ' ') || '<error>').toUpperCase(),
                opSchema: toStr(x[2]),
            }) },
        { "name": "expr_eq$macrocall$2", "symbols": ["expr_eq$macrocall$2$macrocall$1"] },
        { "name": "expr_eq$macrocall$3", "symbols": ["expr_eq"] },
        { "name": "expr_eq$macrocall$4", "symbols": ["expr_isdistinctfrom"] },
        { "name": "expr_eq$macrocall$1$subexpression$1", "symbols": ["expr_eq$macrocall$3"] },
        { "name": "expr_eq$macrocall$1$subexpression$1", "symbols": ["expr_paren"] },
        { "name": "expr_eq$macrocall$1$subexpression$2", "symbols": ["expr_eq$macrocall$4"] },
        { "name": "expr_eq$macrocall$1$subexpression$2", "symbols": ["expr_paren"] },
        { "name": "expr_eq$macrocall$1", "symbols": ["expr_eq$macrocall$1$subexpression$1", "expr_eq$macrocall$2", "expr_eq$macrocall$1$subexpression$2"], "postprocess": x => (0, lexer_2.track)(x, {
                type: 'binary',
                left: unwrap(x[0]),
                right: unwrap(x[2]),
                ...unwrap(x[1]),
            }) },
        { "name": "expr_eq$macrocall$1", "symbols": ["expr_eq$macrocall$4"], "postprocess": unwrap },
        { "name": "expr_eq", "symbols": ["expr_eq$macrocall$1"] },
        { "name": "expr_star", "symbols": ["star"], "postprocess": x => (0, lexer_2.track)(x, { type: 'ref', name: '*' }) },
        { "name": "expr_isdistinctfrom$macrocall$2$subexpression$1", "symbols": [(lexer_1.lexerAny.has("kw_is") ? { type: "kw_is" } : kw_is), (lexer_1.lexerAny.has("kw_distinct") ? { type: "kw_distinct" } : kw_distinct), (lexer_1.lexerAny.has("kw_from") ? { type: "kw_from" } : kw_from)] },
        { "name": "expr_isdistinctfrom$macrocall$2", "symbols": ["expr_isdistinctfrom$macrocall$2$subexpression$1"], "postprocess": x => (0, lexer_2.track)(x, { op: 'IS DISTINCT FROM' }) },
        { "name": "expr_isdistinctfrom$macrocall$3", "symbols": ["expr_isdistinctfrom"] },
        { "name": "expr_isdistinctfrom$macrocall$4", "symbols": ["expr_isnotdistinctfrom"] },
        { "name": "expr_isdistinctfrom$macrocall$1$subexpression$1", "symbols": ["expr_isdistinctfrom$macrocall$3"] },
        { "name": "expr_isdistinctfrom$macrocall$1$subexpression$1", "symbols": ["expr_paren"] },
        { "name": "expr_isdistinctfrom$macrocall$1$subexpression$2", "symbols": ["expr_isdistinctfrom$macrocall$4"] },
        { "name": "expr_isdistinctfrom$macrocall$1$subexpression$2", "symbols": ["expr_paren"] },
        { "name": "expr_isdistinctfrom$macrocall$1", "symbols": ["expr_isdistinctfrom$macrocall$1$subexpression$1", "expr_isdistinctfrom$macrocall$2", "expr_isdistinctfrom$macrocall$1$subexpression$2"], "postprocess": x => (0, lexer_2.track)(x, {
                type: 'binary',
                left: unwrap(x[0]),
                right: unwrap(x[2]),
                ...unwrap(x[1]),
            }) },
        { "name": "expr_isdistinctfrom$macrocall$1", "symbols": ["expr_isdistinctfrom$macrocall$4"], "postprocess": unwrap },
        { "name": "expr_isdistinctfrom", "symbols": ["expr_isdistinctfrom$macrocall$1"] },
        { "name": "expr_isnotdistinctfrom$macrocall$2$subexpression$1", "symbols": [(lexer_1.lexerAny.has("kw_is") ? { type: "kw_is" } : kw_is), (lexer_1.lexerAny.has("kw_not") ? { type: "kw_not" } : kw_not), (lexer_1.lexerAny.has("kw_distinct") ? { type: "kw_distinct" } : kw_distinct), (lexer_1.lexerAny.has("kw_from") ? { type: "kw_from" } : kw_from)] },
        { "name": "expr_isnotdistinctfrom$macrocall$2", "symbols": ["expr_isnotdistinctfrom$macrocall$2$subexpression$1"], "postprocess": x => (0, lexer_2.track)(x, { op: 'IS NOT DISTINCT FROM' }) },
        { "name": "expr_isnotdistinctfrom$macrocall$3", "symbols": ["expr_isnotdistinctfrom"] },
        { "name": "expr_isnotdistinctfrom$macrocall$4", "symbols": ["expr_is"] },
        { "name": "expr_isnotdistinctfrom$macrocall$1$subexpression$1", "symbols": ["expr_isnotdistinctfrom$macrocall$3"] },
        { "name": "expr_isnotdistinctfrom$macrocall$1$subexpression$1", "symbols": ["expr_paren"] },
        { "name": "expr_isnotdistinctfrom$macrocall$1$subexpression$2", "symbols": ["expr_isnotdistinctfrom$macrocall$4"] },
        { "name": "expr_isnotdistinctfrom$macrocall$1$subexpression$2", "symbols": ["expr_paren"] },
        { "name": "expr_isnotdistinctfrom$macrocall$1", "symbols": ["expr_isnotdistinctfrom$macrocall$1$subexpression$1", "expr_isnotdistinctfrom$macrocall$2", "expr_isnotdistinctfrom$macrocall$1$subexpression$2"], "postprocess": x => (0, lexer_2.track)(x, {
                type: 'binary',
                left: unwrap(x[0]),
                right: unwrap(x[2]),
                ...unwrap(x[1]),
            }) },
        { "name": "expr_isnotdistinctfrom$macrocall$1", "symbols": ["expr_isnotdistinctfrom$macrocall$4"], "postprocess": unwrap },
        { "name": "expr_isnotdistinctfrom", "symbols": ["expr_isnotdistinctfrom$macrocall$1"] },
        { "name": "expr_is$subexpression$1", "symbols": ["expr_is"] },
        { "name": "expr_is$subexpression$1", "symbols": ["expr_paren"] },
        { "name": "expr_is$subexpression$2", "symbols": [(lexer_1.lexerAny.has("kw_isnull") ? { type: "kw_isnull" } : kw_isnull)] },
        { "name": "expr_is$subexpression$2", "symbols": [(lexer_1.lexerAny.has("kw_is") ? { type: "kw_is" } : kw_is), (lexer_1.lexerAny.has("kw_null") ? { type: "kw_null" } : kw_null)] },
        { "name": "expr_is", "symbols": ["expr_is$subexpression$1", "expr_is$subexpression$2"], "postprocess": x => (0, lexer_2.track)(x, { type: 'unary', op: 'IS NULL', operand: unwrap(x[0]) }) },
        { "name": "expr_is$subexpression$3", "symbols": ["expr_is"] },
        { "name": "expr_is$subexpression$3", "symbols": ["expr_paren"] },
        { "name": "expr_is$subexpression$4", "symbols": [(lexer_1.lexerAny.has("kw_notnull") ? { type: "kw_notnull" } : kw_notnull)] },
        { "name": "expr_is$subexpression$4", "symbols": [(lexer_1.lexerAny.has("kw_is") ? { type: "kw_is" } : kw_is), "kw_not_null"] },
        { "name": "expr_is", "symbols": ["expr_is$subexpression$3", "expr_is$subexpression$4"], "postprocess": x => (0, lexer_2.track)(x, { type: 'unary', op: 'IS NOT NULL', operand: unwrap(x[0]) }) },
        { "name": "expr_is$subexpression$5", "symbols": ["expr_is"] },
        { "name": "expr_is$subexpression$5", "symbols": ["expr_paren"] },
        { "name": "expr_is$ebnf$1", "symbols": [(lexer_1.lexerAny.has("kw_not") ? { type: "kw_not" } : kw_not)], "postprocess": id },
        { "name": "expr_is$ebnf$1", "symbols": [], "postprocess": () => null },
        { "name": "expr_is$subexpression$6", "symbols": [(lexer_1.lexerAny.has("kw_true") ? { type: "kw_true" } : kw_true)] },
        { "name": "expr_is$subexpression$6", "symbols": [(lexer_1.lexerAny.has("kw_false") ? { type: "kw_false" } : kw_false)] },
        { "name": "expr_is", "symbols": ["expr_is$subexpression$5", (lexer_1.lexerAny.has("kw_is") ? { type: "kw_is" } : kw_is), "expr_is$ebnf$1", "expr_is$subexpression$6"], "postprocess": x => (0, lexer_2.track)(x, {
                type: 'unary',
                op: 'IS ' + flattenStr([x[2], x[3]])
                    .join(' ')
                    .toUpperCase(),
                operand: unwrap(x[0]),
            }) },
        { "name": "expr_is", "symbols": ["expr_compare"], "postprocess": unwrap },
        { "name": "expr_compare$macrocall$2$macrocall$2", "symbols": [(lexer_1.lexerAny.has("op_compare") ? { type: "op_compare" } : op_compare)] },
        { "name": "expr_compare$macrocall$2$macrocall$1$macrocall$2", "symbols": ["expr_compare$macrocall$2$macrocall$2"] },
        { "name": "expr_compare$macrocall$2$macrocall$1$macrocall$1", "symbols": ["expr_compare$macrocall$2$macrocall$1$macrocall$2"], "postprocess": x => (0, lexer_2.track)(x, {
                op: (toStr(x, ' ') || '<error>').toUpperCase()
            }) },
        { "name": "expr_compare$macrocall$2$macrocall$1", "symbols": ["expr_compare$macrocall$2$macrocall$1$macrocall$1"], "postprocess": unwrap },
        { "name": "expr_compare$macrocall$2$macrocall$1", "symbols": ["kw_operator", "lparen", "ident", "dot", "expr_compare$macrocall$2$macrocall$2", "rparen"], "postprocess": x => (0, lexer_2.track)(x, {
                op: (toStr(x[4], ' ') || '<error>').toUpperCase(),
                opSchema: toStr(x[2]),
            }) },
        { "name": "expr_compare$macrocall$2", "symbols": ["expr_compare$macrocall$2$macrocall$1"] },
        { "name": "expr_compare$macrocall$3", "symbols": ["expr_compare"] },
        { "name": "expr_compare$macrocall$4", "symbols": ["expr_range"] },
        { "name": "expr_compare$macrocall$1$subexpression$1", "symbols": ["expr_compare$macrocall$3"] },
        { "name": "expr_compare$macrocall$1$subexpression$1", "symbols": ["expr_paren"] },
        { "name": "expr_compare$macrocall$1$subexpression$2", "symbols": ["expr_compare$macrocall$4"] },
        { "name": "expr_compare$macrocall$1$subexpression$2", "symbols": ["expr_paren"] },
        { "name": "expr_compare$macrocall$1", "symbols": ["expr_compare$macrocall$1$subexpression$1", "expr_compare$macrocall$2", "expr_compare$macrocall$1$subexpression$2"], "postprocess": x => (0, lexer_2.track)(x, {
                type: 'binary',
                left: unwrap(x[0]),
                right: unwrap(x[2]),
                ...unwrap(x[1]),
            }) },
        { "name": "expr_compare$macrocall$1", "symbols": ["expr_compare$macrocall$4"], "postprocess": unwrap },
        { "name": "expr_compare", "symbols": ["expr_compare$macrocall$1"] },
        { "name": "expr_range$macrocall$2", "symbols": ["ops_between"] },
        { "name": "expr_range$macrocall$3", "symbols": [(lexer_1.lexerAny.has("kw_and") ? { type: "kw_and" } : kw_and)] },
        { "name": "expr_range$macrocall$4", "symbols": ["expr_range"] },
        { "name": "expr_range$macrocall$5", "symbols": ["expr_others"] },
        { "name": "expr_range$macrocall$1$subexpression$1", "symbols": ["expr_range$macrocall$4"] },
        { "name": "expr_range$macrocall$1$subexpression$1", "symbols": ["expr_paren"] },
        { "name": "expr_range$macrocall$1$subexpression$2", "symbols": ["expr_range$macrocall$4"] },
        { "name": "expr_range$macrocall$1$subexpression$2", "symbols": ["expr_paren"] },
        { "name": "expr_range$macrocall$1$subexpression$3", "symbols": ["expr_range$macrocall$5"] },
        { "name": "expr_range$macrocall$1$subexpression$3", "symbols": ["expr_paren"] },
        { "name": "expr_range$macrocall$1", "symbols": ["expr_range$macrocall$1$subexpression$1", "expr_range$macrocall$2", "expr_range$macrocall$1$subexpression$2", "expr_range$macrocall$3", "expr_range$macrocall$1$subexpression$3"], "postprocess": x => (0, lexer_2.track)(x, {
                type: 'ternary',
                value: unwrap(x[0]),
                lo: unwrap(x[2]),
                hi: unwrap(x[4]),
                op: (flattenStr(x[1]).join(' ') || '<error>').toUpperCase(),
            }) },
        { "name": "expr_range$macrocall$1", "symbols": ["expr_range$macrocall$5"], "postprocess": unwrap },
        { "name": "expr_range", "symbols": ["expr_range$macrocall$1"] },
        { "name": "expr_others$macrocall$2$macrocall$2", "symbols": [(lexer_1.lexerAny.has("ops_others") ? { type: "ops_others" } : ops_others)] },
        { "name": "expr_others$macrocall$2$macrocall$1$macrocall$2", "symbols": ["expr_others$macrocall$2$macrocall$2"] },
        { "name": "expr_others$macrocall$2$macrocall$1$macrocall$1", "symbols": ["expr_others$macrocall$2$macrocall$1$macrocall$2"], "postprocess": x => (0, lexer_2.track)(x, {
                op: (toStr(x, ' ') || '<error>').toUpperCase()
            }) },
        { "name": "expr_others$macrocall$2$macrocall$1", "symbols": ["expr_others$macrocall$2$macrocall$1$macrocall$1"], "postprocess": unwrap },
        { "name": "expr_others$macrocall$2$macrocall$1", "symbols": ["kw_operator", "lparen", "ident", "dot", "expr_others$macrocall$2$macrocall$2", "rparen"], "postprocess": x => (0, lexer_2.track)(x, {
                op: (toStr(x[4], ' ') || '<error>').toUpperCase(),
                opSchema: toStr(x[2]),
            }) },
        { "name": "expr_others$macrocall$2", "symbols": ["expr_others$macrocall$2$macrocall$1"] },
        { "name": "expr_others$macrocall$3", "symbols": ["expr_others"] },
        { "name": "expr_others$macrocall$4", "symbols": ["expr_like"] },
        { "name": "expr_others$macrocall$1$subexpression$1", "symbols": ["expr_others$macrocall$3"] },
        { "name": "expr_others$macrocall$1$subexpression$1", "symbols": ["expr_paren"] },
        { "name": "expr_others$macrocall$1$subexpression$2", "symbols": ["expr_others$macrocall$4"] },
        { "name": "expr_others$macrocall$1$subexpression$2", "symbols": ["expr_paren"] },
        { "name": "expr_others$macrocall$1", "symbols": ["expr_others$macrocall$1$subexpression$1", "expr_others$macrocall$2", "expr_others$macrocall$1$subexpression$2"], "postprocess": x => (0, lexer_2.track)(x, {
                type: 'binary',
                left: unwrap(x[0]),
                right: unwrap(x[2]),
                ...unwrap(x[1]),
            }) },
        { "name": "expr_others$macrocall$1", "symbols": ["expr_others$macrocall$4"], "postprocess": unwrap },
        { "name": "expr_others", "symbols": ["expr_others$macrocall$1"] },
        { "name": "expr_like$macrocall$2$macrocall$2", "symbols": ["ops_like"] },
        { "name": "expr_like$macrocall$2$macrocall$1", "symbols": ["expr_like$macrocall$2$macrocall$2"], "postprocess": x => (0, lexer_2.track)(x, {
                op: (toStr(x, ' ') || '<error>').toUpperCase()
            }) },
        { "name": "expr_like$macrocall$2", "symbols": ["expr_like$macrocall$2$macrocall$1"] },
        { "name": "expr_like$macrocall$3", "symbols": ["expr_like"] },
        { "name": "expr_like$macrocall$4", "symbols": ["expr_in"] },
        { "name": "expr_like$macrocall$1$subexpression$1", "symbols": ["expr_like$macrocall$3"] },
        { "name": "expr_like$macrocall$1$subexpression$1", "symbols": ["expr_paren"] },
        { "name": "expr_like$macrocall$1$subexpression$2", "symbols": ["expr_like$macrocall$4"] },
        { "name": "expr_like$macrocall$1$subexpression$2", "symbols": ["expr_paren"] },
        { "name": "expr_like$macrocall$1", "symbols": ["expr_like$macrocall$1$subexpression$1", "expr_like$macrocall$2", "expr_like$macrocall$1$subexpression$2"], "postprocess": x => (0, lexer_2.track)(x, {
                type: 'binary',
                left: unwrap(x[0]),
                right: unwrap(x[2]),
                ...unwrap(x[1]),
            }) },
        { "name": "expr_like$macrocall$1", "symbols": ["expr_like$macrocall$4"], "postprocess": unwrap },
        { "name": "expr_like", "symbols": ["expr_like$macrocall$1"] },
        { "name": "expr_in$macrocall$2$macrocall$2", "symbols": ["ops_in"] },
        { "name": "expr_in$macrocall$2$macrocall$1", "symbols": ["expr_in$macrocall$2$macrocall$2"], "postprocess": x => (0, lexer_2.track)(x, {
                op: (toStr(x, ' ') || '<error>').toUpperCase()
            }) },
        { "name": "expr_in$macrocall$2", "symbols": ["expr_in$macrocall$2$macrocall$1"] },
        { "name": "expr_in$macrocall$3", "symbols": ["expr_in"] },
        { "name": "expr_in$macrocall$4", "symbols": ["expr_add"] },
        { "name": "expr_in$macrocall$1$subexpression$1", "symbols": ["expr_in$macrocall$3"] },
        { "name": "expr_in$macrocall$1$subexpression$1", "symbols": ["expr_paren"] },
        { "name": "expr_in$macrocall$1$subexpression$2", "symbols": ["expr_in$macrocall$4"] },
        { "name": "expr_in$macrocall$1$subexpression$2", "symbols": ["expr_paren"] },
        { "name": "expr_in$macrocall$1", "symbols": ["expr_in$macrocall$1$subexpression$1", "expr_in$macrocall$2", "expr_in$macrocall$1$subexpression$2"], "postprocess": x => (0, lexer_2.track)(x, {
                type: 'binary',
                left: unwrap(x[0]),
                right: unwrap(x[2]),
                ...unwrap(x[1]),
            }) },
        { "name": "expr_in$macrocall$1", "symbols": ["expr_in$macrocall$4"], "postprocess": unwrap },
        { "name": "expr_in", "symbols": ["expr_in$macrocall$1"] },
        { "name": "expr_add$macrocall$2$macrocall$2$subexpression$1", "symbols": [(lexer_1.lexerAny.has("op_plus") ? { type: "op_plus" } : op_plus)] },
        { "name": "expr_add$macrocall$2$macrocall$2$subexpression$1", "symbols": [(lexer_1.lexerAny.has("op_minus") ? { type: "op_minus" } : op_minus)] },
        { "name": "expr_add$macrocall$2$macrocall$2$subexpression$1", "symbols": [(lexer_1.lexerAny.has("op_additive") ? { type: "op_additive" } : op_additive)] },
        { "name": "expr_add$macrocall$2$macrocall$2", "symbols": ["expr_add$macrocall$2$macrocall$2$subexpression$1"] },
        { "name": "expr_add$macrocall$2$macrocall$1$macrocall$2", "symbols": ["expr_add$macrocall$2$macrocall$2"] },
        { "name": "expr_add$macrocall$2$macrocall$1$macrocall$1", "symbols": ["expr_add$macrocall$2$macrocall$1$macrocall$2"], "postprocess": x => (0, lexer_2.track)(x, {
                op: (toStr(x, ' ') || '<error>').toUpperCase()
            }) },
        { "name": "expr_add$macrocall$2$macrocall$1", "symbols": ["expr_add$macrocall$2$macrocall$1$macrocall$1"], "postprocess": unwrap },
        { "name": "expr_add$macrocall$2$macrocall$1", "symbols": ["kw_operator", "lparen", "ident", "dot", "expr_add$macrocall$2$macrocall$2", "rparen"], "postprocess": x => (0, lexer_2.track)(x, {
                op: (toStr(x[4], ' ') || '<error>').toUpperCase(),
                opSchema: toStr(x[2]),
            }) },
        { "name": "expr_add$macrocall$2", "symbols": ["expr_add$macrocall$2$macrocall$1"] },
        { "name": "expr_add$macrocall$3", "symbols": ["expr_add"] },
        { "name": "expr_add$macrocall$4", "symbols": ["expr_mult"] },
        { "name": "expr_add$macrocall$1$subexpression$1", "symbols": ["expr_add$macrocall$3"] },
        { "name": "expr_add$macrocall$1$subexpression$1", "symbols": ["expr_paren"] },
        { "name": "expr_add$macrocall$1$subexpression$2", "symbols": ["expr_add$macrocall$4"] },
        { "name": "expr_add$macrocall$1$subexpression$2", "symbols": ["expr_paren"] },
        { "name": "expr_add$macrocall$1", "symbols": ["expr_add$macrocall$1$subexpression$1", "expr_add$macrocall$2", "expr_add$macrocall$1$subexpression$2"], "postprocess": x => (0, lexer_2.track)(x, {
                type: 'binary',
                left: unwrap(x[0]),
                right: unwrap(x[2]),
                ...unwrap(x[1]),
            }) },
        { "name": "expr_add$macrocall$1", "symbols": ["expr_add$macrocall$4"], "postprocess": unwrap },
        { "name": "expr_add", "symbols": ["expr_add$macrocall$1"] },
        { "name": "expr_mult$macrocall$2$macrocall$2$subexpression$1", "symbols": [(lexer_1.lexerAny.has("star") ? { type: "star" } : star)] },
        { "name": "expr_mult$macrocall$2$macrocall$2$subexpression$1", "symbols": [(lexer_1.lexerAny.has("op_div") ? { type: "op_div" } : op_div)] },
        { "name": "expr_mult$macrocall$2$macrocall$2$subexpression$1", "symbols": [(lexer_1.lexerAny.has("op_mod") ? { type: "op_mod" } : op_mod)] },
        { "name": "expr_mult$macrocall$2$macrocall$2", "symbols": ["expr_mult$macrocall$2$macrocall$2$subexpression$1"] },
        { "name": "expr_mult$macrocall$2$macrocall$1$macrocall$2", "symbols": ["expr_mult$macrocall$2$macrocall$2"] },
        { "name": "expr_mult$macrocall$2$macrocall$1$macrocall$1", "symbols": ["expr_mult$macrocall$2$macrocall$1$macrocall$2"], "postprocess": x => (0, lexer_2.track)(x, {
                op: (toStr(x, ' ') || '<error>').toUpperCase()
            }) },
        { "name": "expr_mult$macrocall$2$macrocall$1", "symbols": ["expr_mult$macrocall$2$macrocall$1$macrocall$1"], "postprocess": unwrap },
        { "name": "expr_mult$macrocall$2$macrocall$1", "symbols": ["kw_operator", "lparen", "ident", "dot", "expr_mult$macrocall$2$macrocall$2", "rparen"], "postprocess": x => (0, lexer_2.track)(x, {
                op: (toStr(x[4], ' ') || '<error>').toUpperCase(),
                opSchema: toStr(x[2]),
            }) },
        { "name": "expr_mult$macrocall$2", "symbols": ["expr_mult$macrocall$2$macrocall$1"] },
        { "name": "expr_mult$macrocall$3", "symbols": ["expr_mult"] },
        { "name": "expr_mult$macrocall$4", "symbols": ["expr_exp"] },
        { "name": "expr_mult$macrocall$1$subexpression$1", "symbols": ["expr_mult$macrocall$3"] },
        { "name": "expr_mult$macrocall$1$subexpression$1", "symbols": ["expr_paren"] },
        { "name": "expr_mult$macrocall$1$subexpression$2", "symbols": ["expr_mult$macrocall$4"] },
        { "name": "expr_mult$macrocall$1$subexpression$2", "symbols": ["expr_paren"] },
        { "name": "expr_mult$macrocall$1", "symbols": ["expr_mult$macrocall$1$subexpression$1", "expr_mult$macrocall$2", "expr_mult$macrocall$1$subexpression$2"], "postprocess": x => (0, lexer_2.track)(x, {
                type: 'binary',
                left: unwrap(x[0]),
                right: unwrap(x[2]),
                ...unwrap(x[1]),
            }) },
        { "name": "expr_mult$macrocall$1", "symbols": ["expr_mult$macrocall$4"], "postprocess": unwrap },
        { "name": "expr_mult", "symbols": ["expr_mult$macrocall$1"] },
        { "name": "expr_exp$macrocall$2$macrocall$2", "symbols": [(lexer_1.lexerAny.has("op_exp") ? { type: "op_exp" } : op_exp)] },
        { "name": "expr_exp$macrocall$2$macrocall$1$macrocall$2", "symbols": ["expr_exp$macrocall$2$macrocall$2"] },
        { "name": "expr_exp$macrocall$2$macrocall$1$macrocall$1", "symbols": ["expr_exp$macrocall$2$macrocall$1$macrocall$2"], "postprocess": x => (0, lexer_2.track)(x, {
                op: (toStr(x, ' ') || '<error>').toUpperCase()
            }) },
        { "name": "expr_exp$macrocall$2$macrocall$1", "symbols": ["expr_exp$macrocall$2$macrocall$1$macrocall$1"], "postprocess": unwrap },
        { "name": "expr_exp$macrocall$2$macrocall$1", "symbols": ["kw_operator", "lparen", "ident", "dot", "expr_exp$macrocall$2$macrocall$2", "rparen"], "postprocess": x => (0, lexer_2.track)(x, {
                op: (toStr(x[4], ' ') || '<error>').toUpperCase(),
                opSchema: toStr(x[2]),
            }) },
        { "name": "expr_exp$macrocall$2", "symbols": ["expr_exp$macrocall$2$macrocall$1"] },
        { "name": "expr_exp$macrocall$3", "symbols": ["expr_exp"] },
        { "name": "expr_exp$macrocall$4", "symbols": ["expr_unary_add"] },
        { "name": "expr_exp$macrocall$1$subexpression$1", "symbols": ["expr_exp$macrocall$3"] },
        { "name": "expr_exp$macrocall$1$subexpression$1", "symbols": ["expr_paren"] },
        { "name": "expr_exp$macrocall$1$subexpression$2", "symbols": ["expr_exp$macrocall$4"] },
        { "name": "expr_exp$macrocall$1$subexpression$2", "symbols": ["expr_paren"] },
        { "name": "expr_exp$macrocall$1", "symbols": ["expr_exp$macrocall$1$subexpression$1", "expr_exp$macrocall$2", "expr_exp$macrocall$1$subexpression$2"], "postprocess": x => (0, lexer_2.track)(x, {
                type: 'binary',
                left: unwrap(x[0]),
                right: unwrap(x[2]),
                ...unwrap(x[1]),
            }) },
        { "name": "expr_exp$macrocall$1", "symbols": ["expr_exp$macrocall$4"], "postprocess": unwrap },
        { "name": "expr_exp", "symbols": ["expr_exp$macrocall$1"] },
        { "name": "expr_unary_add$macrocall$2$macrocall$2$subexpression$1", "symbols": [(lexer_1.lexerAny.has("op_plus") ? { type: "op_plus" } : op_plus)] },
        { "name": "expr_unary_add$macrocall$2$macrocall$2$subexpression$1", "symbols": [(lexer_1.lexerAny.has("op_minus") ? { type: "op_minus" } : op_minus)] },
        { "name": "expr_unary_add$macrocall$2$macrocall$2", "symbols": ["expr_unary_add$macrocall$2$macrocall$2$subexpression$1"] },
        { "name": "expr_unary_add$macrocall$2$macrocall$1$macrocall$2", "symbols": ["expr_unary_add$macrocall$2$macrocall$2"] },
        { "name": "expr_unary_add$macrocall$2$macrocall$1$macrocall$1", "symbols": ["expr_unary_add$macrocall$2$macrocall$1$macrocall$2"], "postprocess": x => (0, lexer_2.track)(x, {
                op: (toStr(x, ' ') || '<error>').toUpperCase()
            }) },
        { "name": "expr_unary_add$macrocall$2$macrocall$1", "symbols": ["expr_unary_add$macrocall$2$macrocall$1$macrocall$1"], "postprocess": unwrap },
        { "name": "expr_unary_add$macrocall$2$macrocall$1", "symbols": ["kw_operator", "lparen", "ident", "dot", "expr_unary_add$macrocall$2$macrocall$2", "rparen"], "postprocess": x => (0, lexer_2.track)(x, {
                op: (toStr(x[4], ' ') || '<error>').toUpperCase(),
                opSchema: toStr(x[2]),
            }) },
        { "name": "expr_unary_add$macrocall$2", "symbols": ["expr_unary_add$macrocall$2$macrocall$1"] },
        { "name": "expr_unary_add$macrocall$3", "symbols": ["expr_unary_add"] },
        { "name": "expr_unary_add$macrocall$4", "symbols": ["expr_various_constructs"] },
        { "name": "expr_unary_add$macrocall$1$subexpression$1", "symbols": ["expr_unary_add$macrocall$3"] },
        { "name": "expr_unary_add$macrocall$1$subexpression$1", "symbols": ["expr_paren"] },
        { "name": "expr_unary_add$macrocall$1", "symbols": ["expr_unary_add$macrocall$2", "expr_unary_add$macrocall$1$subexpression$1"], "postprocess": x => (0, lexer_2.track)(x, {
                type: 'unary',
                ...unwrap(x[0]),
                operand: unwrap(x[1]),
            }) },
        { "name": "expr_unary_add$macrocall$1", "symbols": ["expr_unary_add$macrocall$4"], "postprocess": unwrap },
        { "name": "expr_unary_add", "symbols": ["expr_unary_add$macrocall$1"] },
        { "name": "expr_various_constructs$macrocall$2$macrocall$2", "symbols": ["various_binaries"] },
        { "name": "expr_various_constructs$macrocall$2$macrocall$1", "symbols": ["expr_various_constructs$macrocall$2$macrocall$2"], "postprocess": x => (0, lexer_2.track)(x, {
                op: (toStr(x, ' ') || '<error>').toUpperCase()
            }) },
        { "name": "expr_various_constructs$macrocall$2", "symbols": ["expr_various_constructs$macrocall$2$macrocall$1"] },
        { "name": "expr_various_constructs$macrocall$3", "symbols": ["expr_various_constructs"] },
        { "name": "expr_various_constructs$macrocall$4", "symbols": ["expr_array_index"] },
        { "name": "expr_various_constructs$macrocall$1$subexpression$1", "symbols": ["expr_various_constructs$macrocall$3"] },
        { "name": "expr_various_constructs$macrocall$1$subexpression$1", "symbols": ["expr_paren"] },
        { "name": "expr_various_constructs$macrocall$1$subexpression$2", "symbols": ["expr_various_constructs$macrocall$4"] },
        { "name": "expr_various_constructs$macrocall$1$subexpression$2", "symbols": ["expr_paren"] },
        { "name": "expr_various_constructs$macrocall$1", "symbols": ["expr_various_constructs$macrocall$1$subexpression$1", "expr_various_constructs$macrocall$2", "expr_various_constructs$macrocall$1$subexpression$2"], "postprocess": x => (0, lexer_2.track)(x, {
                type: 'binary',
                left: unwrap(x[0]),
                right: unwrap(x[2]),
                ...unwrap(x[1]),
            }) },
        { "name": "expr_various_constructs$macrocall$1", "symbols": ["expr_various_constructs$macrocall$4"], "postprocess": unwrap },
        { "name": "expr_various_constructs", "symbols": ["expr_various_constructs$macrocall$1"] },
        { "name": "expr_array_index$subexpression$1", "symbols": ["expr_array_index"] },
        { "name": "expr_array_index$subexpression$1", "symbols": ["expr_paren"] },
        { "name": "expr_array_index", "symbols": ["expr_array_index$subexpression$1", (lexer_1.lexerAny.has("lbracket") ? { type: "lbracket" } : lbracket), "expr_nostar", (lexer_1.lexerAny.has("rbracket") ? { type: "rbracket" } : rbracket)], "postprocess": x => (0, lexer_2.track)(x, {
                type: 'arrayIndex',
                array: unwrap(x[0]),
                index: unwrap(x[2]),
            }) },
        { "name": "expr_array_index", "symbols": ["expr_member"], "postprocess": unwrap },
        { "name": "expr_member$subexpression$1", "symbols": ["expr_member"] },
        { "name": "expr_member$subexpression$1", "symbols": ["expr_paren"] },
        { "name": "expr_member$subexpression$2", "symbols": ["string"] },
        { "name": "expr_member$subexpression$2", "symbols": ["int"] },
        { "name": "expr_member", "symbols": ["expr_member$subexpression$1", "ops_member", "expr_member$subexpression$2"], "postprocess": x => (0, lexer_2.track)(x, {
                type: 'member',
                operand: unwrap(x[0]),
                op: x[1],
                member: unwrap(x[2])
            }) },
        { "name": "expr_member$subexpression$3", "symbols": ["expr_member"] },
        { "name": "expr_member$subexpression$3", "symbols": ["expr_paren"] },
        { "name": "expr_member", "symbols": ["expr_member$subexpression$3", (lexer_1.lexerAny.has("op_cast") ? { type: "op_cast" } : op_cast), "data_type"], "postprocess": x => (0, lexer_2.track)(x, {
                type: 'cast',
                operand: unwrap(x[0]),
                to: x[2],
            }) },
        { "name": "expr_member", "symbols": [(lexer_1.lexerAny.has("kw_cast") ? { type: "kw_cast" } : kw_cast), "lparen", "expr_nostar", (lexer_1.lexerAny.has("kw_as") ? { type: "kw_as" } : kw_as), "data_type", "rparen"], "postprocess": x => (0, lexer_2.track)(x, {
                type: 'cast',
                operand: unwrap(x[2]),
                to: x[4],
            }) },
        { "name": "expr_member", "symbols": ["data_type", "string"], "postprocess": x => (0, lexer_2.track)(x, {
                type: 'cast',
                operand: (0, lexer_2.track)(x[1], {
                    type: 'string',
                    value: (0, lexer_2.unbox)(x[1]),
                }),
                to: (0, lexer_2.unbox)(x[0]),
            }) },
        { "name": "expr_member", "symbols": ["expr_dot"], "postprocess": unwrap },
        { "name": "expr_dot$subexpression$1", "symbols": ["word"] },
        { "name": "expr_dot$subexpression$1", "symbols": ["star"] },
        { "name": "expr_dot", "symbols": ["qname", (lexer_1.lexerAny.has("dot") ? { type: "dot" } : dot), "expr_dot$subexpression$1"], "postprocess": x => (0, lexer_2.track)(x, {
                type: 'ref',
                table: unwrap(x[0]),
                name: toStr(x[2])
            }) },
        { "name": "expr_dot", "symbols": ["expr_final"], "postprocess": unwrap },
        { "name": "expr_final", "symbols": ["expr_basic"] },
        { "name": "expr_final", "symbols": ["expr_primary"] },
        { "name": "expr_basic", "symbols": ["expr_special_calls"] },
        { "name": "expr_basic", "symbols": ["expr_call"] },
        { "name": "expr_basic", "symbols": ["expr_array"] },
        { "name": "expr_basic", "symbols": ["expr_case"] },
        { "name": "expr_basic", "symbols": ["expr_extract"] },
        { "name": "expr_basic", "symbols": ["word"], "postprocess": x => (0, lexer_2.track)(x, {
                type: 'ref',
                name: unwrap(x[0]),
            }) },
        { "name": "expr_array$ebnf$1", "symbols": ["expr_subarray_items"], "postprocess": id },
        { "name": "expr_array$ebnf$1", "symbols": [], "postprocess": () => null },
        { "name": "expr_array", "symbols": [(lexer_1.lexerAny.has("kw_array") ? { type: "kw_array" } : kw_array), (lexer_1.lexerAny.has("lbracket") ? { type: "lbracket" } : lbracket), "expr_array$ebnf$1", (lexer_1.lexerAny.has("rbracket") ? { type: "rbracket" } : rbracket)], "postprocess": x => (0, lexer_2.track)(x, {
                type: 'array',
                expressions: x[2] || [],
            }) },
        { "name": "expr_array", "symbols": [(lexer_1.lexerAny.has("kw_array") ? { type: "kw_array" } : kw_array), "lparen", "selection", "rparen"], "postprocess": x => (0, lexer_2.track)(x, {
                type: 'array select',
                select: unwrap(x[2]),
            }) },
        { "name": "expr_subarray$ebnf$1", "symbols": ["expr_subarray_items"], "postprocess": id },
        { "name": "expr_subarray$ebnf$1", "symbols": [], "postprocess": () => null },
        { "name": "expr_subarray", "symbols": [(lexer_1.lexerAny.has("lbracket") ? { type: "lbracket" } : lbracket), "expr_subarray$ebnf$1", (lexer_1.lexerAny.has("rbracket") ? { type: "rbracket" } : rbracket)], "postprocess": get(1) },
        { "name": "expr_subarray_items$macrocall$2", "symbols": ["expr_list_item"] },
        { "name": "expr_subarray_items$macrocall$1$ebnf$1", "symbols": [] },
        { "name": "expr_subarray_items$macrocall$1$ebnf$1$subexpression$1", "symbols": [(lexer_1.lexerAny.has("comma") ? { type: "comma" } : comma), "expr_subarray_items$macrocall$2"], "postprocess": last },
        { "name": "expr_subarray_items$macrocall$1$ebnf$1", "symbols": ["expr_subarray_items$macrocall$1$ebnf$1", "expr_subarray_items$macrocall$1$ebnf$1$subexpression$1"], "postprocess": (d) => d[0].concat([d[1]]) },
        { "name": "expr_subarray_items$macrocall$1", "symbols": ["expr_subarray_items$macrocall$2", "expr_subarray_items$macrocall$1$ebnf$1"], "postprocess": ([head, tail]) => {
                return [head, ...(tail || [])];
            } },
        { "name": "expr_subarray_items", "symbols": ["expr_subarray_items$macrocall$1"], "postprocess": x => x[0].map(unwrap) },
        { "name": "expr_subarray_items$macrocall$4", "symbols": ["expr_subarray"] },
        { "name": "expr_subarray_items$macrocall$3$ebnf$1", "symbols": [] },
        { "name": "expr_subarray_items$macrocall$3$ebnf$1$subexpression$1", "symbols": [(lexer_1.lexerAny.has("comma") ? { type: "comma" } : comma), "expr_subarray_items$macrocall$4"], "postprocess": last },
        { "name": "expr_subarray_items$macrocall$3$ebnf$1", "symbols": ["expr_subarray_items$macrocall$3$ebnf$1", "expr_subarray_items$macrocall$3$ebnf$1$subexpression$1"], "postprocess": (d) => d[0].concat([d[1]]) },
        { "name": "expr_subarray_items$macrocall$3", "symbols": ["expr_subarray_items$macrocall$4", "expr_subarray_items$macrocall$3$ebnf$1"], "postprocess": ([head, tail]) => {
                return [head, ...(tail || [])];
            } },
        { "name": "expr_subarray_items", "symbols": ["expr_subarray_items$macrocall$3"], "postprocess": (x) => {
                return x[0].map((v) => {
                    return (0, lexer_2.track)(v, {
                        type: 'array',
                        expressions: v[0].map(unwrap),
                    });
                });
            } },
        { "name": "expr_function_call$ebnf$1", "symbols": ["expr_list_raw"], "postprocess": id },
        { "name": "expr_function_call$ebnf$1", "symbols": [], "postprocess": () => null },
        { "name": "expr_function_call", "symbols": ["expr_fn_name", "lparen", "expr_function_call$ebnf$1", "rparen"], "postprocess": x => (0, lexer_2.track)(x, {
                type: 'call',
                function: unwrap(x[0]),
                args: x[2] || [],
            }) },
        { "name": "expr_call$ebnf$1$subexpression$1", "symbols": [(lexer_1.lexerAny.has("kw_all") ? { type: "kw_all" } : kw_all)] },
        { "name": "expr_call$ebnf$1$subexpression$1", "symbols": [(lexer_1.lexerAny.has("kw_distinct") ? { type: "kw_distinct" } : kw_distinct)] },
        { "name": "expr_call$ebnf$1", "symbols": ["expr_call$ebnf$1$subexpression$1"], "postprocess": id },
        { "name": "expr_call$ebnf$1", "symbols": [], "postprocess": () => null },
        { "name": "expr_call$ebnf$2", "symbols": ["expr_list_raw"], "postprocess": id },
        { "name": "expr_call$ebnf$2", "symbols": [], "postprocess": () => null },
        { "name": "expr_call$ebnf$3", "symbols": ["select_order_by"], "postprocess": id },
        { "name": "expr_call$ebnf$3", "symbols": [], "postprocess": () => null },
        { "name": "expr_call$ebnf$4$subexpression$1", "symbols": ["kw_filter", "lparen", (lexer_1.lexerAny.has("kw_where") ? { type: "kw_where" } : kw_where), "expr", "rparen"], "postprocess": get(3) },
        { "name": "expr_call$ebnf$4", "symbols": ["expr_call$ebnf$4$subexpression$1"], "postprocess": id },
        { "name": "expr_call$ebnf$4", "symbols": [], "postprocess": () => null },
        { "name": "expr_call$ebnf$5", "symbols": ["expr_call_over"], "postprocess": id },
        { "name": "expr_call$ebnf$5", "symbols": [], "postprocess": () => null },
        { "name": "expr_call", "symbols": ["expr_fn_name", "lparen", "expr_call$ebnf$1", "expr_call$ebnf$2", "expr_call$ebnf$3", "rparen", "expr_call$ebnf$4", "expr_call$ebnf$5"], "postprocess": x => (0, lexer_2.track)(x, {
                type: 'call',
                function: unwrap(x[0]),
                ...x[2] && { distinct: toStr(x[2]) },
                args: x[3] || [],
                ...x[4] && { orderBy: x[4] },
                ...x[6] && { filter: unwrap(x[6]) },
                ...x[7] && { over: unwrap(x[7]) },
            }) },
        { "name": "expr_call_over$ebnf$1$subexpression$1", "symbols": ["kw_partition", "kw_by", "expr_list_raw"], "postprocess": last },
        { "name": "expr_call_over$ebnf$1", "symbols": ["expr_call_over$ebnf$1$subexpression$1"], "postprocess": id },
        { "name": "expr_call_over$ebnf$1", "symbols": [], "postprocess": () => null },
        { "name": "expr_call_over$ebnf$2", "symbols": ["select_order_by"], "postprocess": id },
        { "name": "expr_call_over$ebnf$2", "symbols": [], "postprocess": () => null },
        { "name": "expr_call_over", "symbols": ["kw_over", "lparen", "expr_call_over$ebnf$1", "expr_call_over$ebnf$2", "rparen"], "postprocess": x => (0, lexer_2.track)(x, {
                ...x[2] && { partitionBy: x[2] },
                ...x[3] && { orderBy: x[3] },
            }) },
        { "name": "expr_extract$subexpression$1", "symbols": ["word"], "postprocess": kw('extract') },
        { "name": "expr_extract", "symbols": ["expr_extract$subexpression$1", "lparen", "word", (lexer_1.lexerAny.has("kw_from") ? { type: "kw_from" } : kw_from), "expr", "rparen"], "postprocess": x => (0, lexer_2.track)(x, {
                type: 'extract',
                field: asName(x[2]),
                from: x[4],
            }) },
        { "name": "expr_primary", "symbols": ["float"], "postprocess": x => (0, lexer_2.track)(x, { type: 'numeric', value: (0, lexer_2.unbox)(x[0]) }) },
        { "name": "expr_primary", "symbols": ["int"], "postprocess": x => (0, lexer_2.track)(x, { type: 'integer', value: (0, lexer_2.unbox)(x[0]) }) },
        { "name": "expr_primary", "symbols": ["string"], "postprocess": x => (0, lexer_2.track)(x, { type: 'string', value: (0, lexer_2.unbox)(x[0]) }) },
        { "name": "expr_primary", "symbols": [(lexer_1.lexerAny.has("kw_true") ? { type: "kw_true" } : kw_true)], "postprocess": x => (0, lexer_2.track)(x, { type: 'boolean', value: true }) },
        { "name": "expr_primary", "symbols": [(lexer_1.lexerAny.has("kw_false") ? { type: "kw_false" } : kw_false)], "postprocess": x => (0, lexer_2.track)(x, { type: 'boolean', value: false }) },
        { "name": "expr_primary", "symbols": [(lexer_1.lexerAny.has("kw_null") ? { type: "kw_null" } : kw_null)], "postprocess": x => (0, lexer_2.track)(x, { type: 'null' }) },
        { "name": "expr_primary", "symbols": ["value_keyword"], "postprocess": x => (0, lexer_2.track)(x, { type: 'keyword', keyword: toStr(x) }) },
        { "name": "expr_primary", "symbols": [(lexer_1.lexerAny.has("qparam") ? { type: "qparam" } : qparam)], "postprocess": x => (0, lexer_2.track)(x, { type: 'parameter', name: toStr(x[0]) }) },
        { "name": "expr_primary", "symbols": [(lexer_1.lexerAny.has("kw_default") ? { type: "kw_default" } : kw_default)], "postprocess": x => (0, lexer_2.track)(x, { type: 'default' }) },
        { "name": "ops_like", "symbols": ["ops_like_keywors"] },
        { "name": "ops_like", "symbols": ["ops_like_operators"] },
        { "name": "ops_like_keywors$ebnf$1", "symbols": [(lexer_1.lexerAny.has("kw_not") ? { type: "kw_not" } : kw_not)], "postprocess": id },
        { "name": "ops_like_keywors$ebnf$1", "symbols": [], "postprocess": () => null },
        { "name": "ops_like_keywors$subexpression$1", "symbols": [(lexer_1.lexerAny.has("kw_like") ? { type: "kw_like" } : kw_like)] },
        { "name": "ops_like_keywors$subexpression$1", "symbols": [(lexer_1.lexerAny.has("kw_ilike") ? { type: "kw_ilike" } : kw_ilike)] },
        { "name": "ops_like_keywors", "symbols": ["ops_like_keywors$ebnf$1", "ops_like_keywors$subexpression$1"] },
        { "name": "ops_like_operators$subexpression$1", "symbols": [(lexer_1.lexerAny.has("op_like") ? { type: "op_like" } : op_like)], "postprocess": () => 'LIKE' },
        { "name": "ops_like_operators", "symbols": ["ops_like_operators$subexpression$1"] },
        { "name": "ops_like_operators$subexpression$2", "symbols": [(lexer_1.lexerAny.has("op_ilike") ? { type: "op_ilike" } : op_ilike)], "postprocess": () => 'ILIKE' },
        { "name": "ops_like_operators", "symbols": ["ops_like_operators$subexpression$2"] },
        { "name": "ops_like_operators$subexpression$3", "symbols": [(lexer_1.lexerAny.has("op_not_like") ? { type: "op_not_like" } : op_not_like)], "postprocess": () => 'NOT LIKE' },
        { "name": "ops_like_operators", "symbols": ["ops_like_operators$subexpression$3"] },
        { "name": "ops_like_operators$subexpression$4", "symbols": [(lexer_1.lexerAny.has("op_not_ilike") ? { type: "op_not_ilike" } : op_not_ilike)], "postprocess": () => 'NOT ILIKE' },
        { "name": "ops_like_operators", "symbols": ["ops_like_operators$subexpression$4"] },
        { "name": "ops_in$ebnf$1", "symbols": [(lexer_1.lexerAny.has("kw_not") ? { type: "kw_not" } : kw_not)], "postprocess": id },
        { "name": "ops_in$ebnf$1", "symbols": [], "postprocess": () => null },
        { "name": "ops_in", "symbols": ["ops_in$ebnf$1", (lexer_1.lexerAny.has("kw_in") ? { type: "kw_in" } : kw_in)] },
        { "name": "ops_between$ebnf$1", "symbols": [(lexer_1.lexerAny.has("kw_not") ? { type: "kw_not" } : kw_not)], "postprocess": id },
        { "name": "ops_between$ebnf$1", "symbols": [], "postprocess": () => null },
        { "name": "ops_between", "symbols": ["ops_between$ebnf$1", "kw_between"] },
        { "name": "ops_member$subexpression$1", "symbols": [(lexer_1.lexerAny.has("op_member") ? { type: "op_member" } : op_member)] },
        { "name": "ops_member$subexpression$1", "symbols": [(lexer_1.lexerAny.has("op_membertext") ? { type: "op_membertext" } : op_membertext)] },
        { "name": "ops_member", "symbols": ["ops_member$subexpression$1"], "postprocess": x => { var _a; return (_a = unwrap(x)) === null || _a === void 0 ? void 0 : _a.value; } },
        { "name": "expr_list_item", "symbols": ["expr_or_select"], "postprocess": unwrap },
        { "name": "expr_list_item", "symbols": ["expr_star"], "postprocess": unwrap },
        { "name": "expr_list_raw$macrocall$2", "symbols": ["expr_list_item"] },
        { "name": "expr_list_raw$macrocall$1$ebnf$1", "symbols": [] },
        { "name": "expr_list_raw$macrocall$1$ebnf$1$subexpression$1", "symbols": [(lexer_1.lexerAny.has("comma") ? { type: "comma" } : comma), "expr_list_raw$macrocall$2"], "postprocess": last },
        { "name": "expr_list_raw$macrocall$1$ebnf$1", "symbols": ["expr_list_raw$macrocall$1$ebnf$1", "expr_list_raw$macrocall$1$ebnf$1$subexpression$1"], "postprocess": (d) => d[0].concat([d[1]]) },
        { "name": "expr_list_raw$macrocall$1", "symbols": ["expr_list_raw$macrocall$2", "expr_list_raw$macrocall$1$ebnf$1"], "postprocess": ([head, tail]) => {
                return [head, ...(tail || [])];
            } },
        { "name": "expr_list_raw", "symbols": ["expr_list_raw$macrocall$1"], "postprocess": ([x]) => x.map(unwrap) },
        { "name": "expr_list_raw_many$macrocall$2", "symbols": ["expr_list_item"] },
        { "name": "expr_list_raw_many$macrocall$1$ebnf$1$subexpression$1", "symbols": [(lexer_1.lexerAny.has("comma") ? { type: "comma" } : comma), "expr_list_raw_many$macrocall$2"], "postprocess": last },
        { "name": "expr_list_raw_many$macrocall$1$ebnf$1", "symbols": ["expr_list_raw_many$macrocall$1$ebnf$1$subexpression$1"] },
        { "name": "expr_list_raw_many$macrocall$1$ebnf$1$subexpression$2", "symbols": [(lexer_1.lexerAny.has("comma") ? { type: "comma" } : comma), "expr_list_raw_many$macrocall$2"], "postprocess": last },
        { "name": "expr_list_raw_many$macrocall$1$ebnf$1", "symbols": ["expr_list_raw_many$macrocall$1$ebnf$1", "expr_list_raw_many$macrocall$1$ebnf$1$subexpression$2"], "postprocess": (d) => d[0].concat([d[1]]) },
        { "name": "expr_list_raw_many$macrocall$1", "symbols": ["expr_list_raw_many$macrocall$2", "expr_list_raw_many$macrocall$1$ebnf$1"], "postprocess": ([head, tail]) => {
                return [head, ...(tail || [])];
            } },
        { "name": "expr_list_raw_many", "symbols": ["expr_list_raw_many$macrocall$1"], "postprocess": ([x]) => x.map(unwrap) },
        { "name": "expr_or_select", "symbols": ["expr_nostar"], "postprocess": unwrap },
        { "name": "expr_or_select", "symbols": ["selection"], "postprocess": unwrap },
        { "name": "expr_list_many", "symbols": ["expr_list_raw_many"], "postprocess": x => (0, lexer_2.track)(x, {
                type: 'list',
                expressions: x[0],
            }) },
        { "name": "expr_case$ebnf$1", "symbols": ["expr_nostar"], "postprocess": id },
        { "name": "expr_case$ebnf$1", "symbols": [], "postprocess": () => null },
        { "name": "expr_case$ebnf$2", "symbols": [] },
        { "name": "expr_case$ebnf$2", "symbols": ["expr_case$ebnf$2", "expr_case_whens"], "postprocess": (d) => d[0].concat([d[1]]) },
        { "name": "expr_case$ebnf$3", "symbols": ["expr_case_else"], "postprocess": id },
        { "name": "expr_case$ebnf$3", "symbols": [], "postprocess": () => null },
        { "name": "expr_case", "symbols": [(lexer_1.lexerAny.has("kw_case") ? { type: "kw_case" } : kw_case), "expr_case$ebnf$1", "expr_case$ebnf$2", "expr_case$ebnf$3", (lexer_1.lexerAny.has("kw_end") ? { type: "kw_end" } : kw_end)], "postprocess": x => (0, lexer_2.track)(x, {
                type: 'case',
                value: x[1],
                whens: x[2],
                else: x[3],
            }) },
        { "name": "expr_case_whens", "symbols": [(lexer_1.lexerAny.has("kw_when") ? { type: "kw_when" } : kw_when), "expr_nostar", (lexer_1.lexerAny.has("kw_then") ? { type: "kw_then" } : kw_then), "expr_nostar"], "postprocess": x => (0, lexer_2.track)(x, {
                when: x[1],
                value: x[3],
            }) },
        { "name": "expr_case_else", "symbols": [(lexer_1.lexerAny.has("kw_else") ? { type: "kw_else" } : kw_else), "expr_nostar"], "postprocess": last },
        { "name": "expr_fn_name$subexpression$1$ebnf$1$subexpression$1", "symbols": ["word", (lexer_1.lexerAny.has("dot") ? { type: "dot" } : dot)] },
        { "name": "expr_fn_name$subexpression$1$ebnf$1", "symbols": ["expr_fn_name$subexpression$1$ebnf$1$subexpression$1"], "postprocess": id },
        { "name": "expr_fn_name$subexpression$1$ebnf$1", "symbols": [], "postprocess": () => null },
        { "name": "expr_fn_name$subexpression$1", "symbols": ["expr_fn_name$subexpression$1$ebnf$1", "word_or_keyword"], "postprocess": x => (0, lexer_2.track)(x, {
                name: (0, lexer_2.unbox)(unwrap(x[1])),
                ...x[0] && { schema: toStr(x[0][0]) },
            }) },
        { "name": "expr_fn_name", "symbols": ["expr_fn_name$subexpression$1"] },
        { "name": "expr_fn_name$subexpression$2$subexpression$1", "symbols": [(lexer_1.lexerAny.has("kw_any") ? { type: "kw_any" } : kw_any)] },
        { "name": "expr_fn_name$subexpression$2$subexpression$1", "symbols": [(lexer_1.lexerAny.has("kw_some") ? { type: "kw_some" } : kw_some)] },
        { "name": "expr_fn_name$subexpression$2$subexpression$1", "symbols": [(lexer_1.lexerAny.has("kw_all") ? { type: "kw_all" } : kw_all)] },
        { "name": "expr_fn_name$subexpression$2", "symbols": ["expr_fn_name$subexpression$2$subexpression$1"], "postprocess": x => (0, lexer_2.track)(x, {
                name: toStr(unwrap(x)),
            }) },
        { "name": "expr_fn_name", "symbols": ["expr_fn_name$subexpression$2"] },
        { "name": "word_or_keyword", "symbols": ["word"] },
        { "name": "word_or_keyword", "symbols": ["value_keyword"], "postprocess": x => (0, lexer_2.box)(x, toStr(x)) },
        { "name": "value_keyword", "symbols": [(lexer_1.lexerAny.has("kw_current_catalog") ? { type: "kw_current_catalog" } : kw_current_catalog)] },
        { "name": "value_keyword", "symbols": [(lexer_1.lexerAny.has("kw_current_date") ? { type: "kw_current_date" } : kw_current_date)] },
        { "name": "value_keyword", "symbols": [(lexer_1.lexerAny.has("kw_current_role") ? { type: "kw_current_role" } : kw_current_role)] },
        { "name": "value_keyword", "symbols": [(lexer_1.lexerAny.has("kw_current_schema") ? { type: "kw_current_schema" } : kw_current_schema)] },
        { "name": "value_keyword", "symbols": [(lexer_1.lexerAny.has("kw_current_timestamp") ? { type: "kw_current_timestamp" } : kw_current_timestamp)] },
        { "name": "value_keyword", "symbols": [(lexer_1.lexerAny.has("kw_current_time") ? { type: "kw_current_time" } : kw_current_time)] },
        { "name": "value_keyword", "symbols": [(lexer_1.lexerAny.has("kw_localtimestamp") ? { type: "kw_localtimestamp" } : kw_localtimestamp)] },
        { "name": "value_keyword", "symbols": [(lexer_1.lexerAny.has("kw_localtime") ? { type: "kw_localtime" } : kw_localtime)] },
        { "name": "value_keyword", "symbols": [(lexer_1.lexerAny.has("kw_session_user") ? { type: "kw_session_user" } : kw_session_user)] },
        { "name": "value_keyword", "symbols": [(lexer_1.lexerAny.has("kw_user") ? { type: "kw_user" } : kw_user)] },
        { "name": "value_keyword", "symbols": [(lexer_1.lexerAny.has("kw_current_user") ? { type: "kw_current_user" } : kw_current_user)] },
        { "name": "expr_special_calls", "symbols": ["spe_overlay"] },
        { "name": "expr_special_calls", "symbols": ["spe_substring"] },
        { "name": "spe_overlay$subexpression$1", "symbols": ["word"], "postprocess": kw('overlay') },
        { "name": "spe_overlay$subexpression$2", "symbols": [(lexer_1.lexerAny.has("lparen") ? { type: "lparen" } : lparen), "expr_nostar"] },
        { "name": "spe_overlay$subexpression$3", "symbols": [(lexer_1.lexerAny.has("kw_placing") ? { type: "kw_placing" } : kw_placing), "expr_nostar"] },
        { "name": "spe_overlay$subexpression$4", "symbols": [(lexer_1.lexerAny.has("kw_from") ? { type: "kw_from" } : kw_from), "expr_nostar"] },
        { "name": "spe_overlay$ebnf$1$subexpression$1", "symbols": [(lexer_1.lexerAny.has("kw_for") ? { type: "kw_for" } : kw_for), "expr_nostar"] },
        { "name": "spe_overlay$ebnf$1", "symbols": ["spe_overlay$ebnf$1$subexpression$1"], "postprocess": id },
        { "name": "spe_overlay$ebnf$1", "symbols": [], "postprocess": () => null },
        { "name": "spe_overlay", "symbols": ["spe_overlay$subexpression$1", "spe_overlay$subexpression$2", "spe_overlay$subexpression$3", "spe_overlay$subexpression$4", "spe_overlay$ebnf$1", (lexer_1.lexerAny.has("rparen") ? { type: "rparen" } : rparen)], "postprocess": x => (0, lexer_2.track)(x, {
                type: 'overlay',
                value: x[1][1],
                placing: x[2][1],
                from: x[3][1],
                ...x[4] && { for: x[4][1] },
            }) },
        { "name": "spe_substring$subexpression$1", "symbols": ["word"], "postprocess": kw('substring') },
        { "name": "spe_substring$subexpression$2", "symbols": [(lexer_1.lexerAny.has("lparen") ? { type: "lparen" } : lparen), "expr_nostar"] },
        { "name": "spe_substring$ebnf$1$subexpression$1", "symbols": [(lexer_1.lexerAny.has("kw_from") ? { type: "kw_from" } : kw_from), "expr_nostar"] },
        { "name": "spe_substring$ebnf$1", "symbols": ["spe_substring$ebnf$1$subexpression$1"], "postprocess": id },
        { "name": "spe_substring$ebnf$1", "symbols": [], "postprocess": () => null },
        { "name": "spe_substring$ebnf$2$subexpression$1", "symbols": [(lexer_1.lexerAny.has("kw_for") ? { type: "kw_for" } : kw_for), "expr_nostar"] },
        { "name": "spe_substring$ebnf$2", "symbols": ["spe_substring$ebnf$2$subexpression$1"], "postprocess": id },
        { "name": "spe_substring$ebnf$2", "symbols": [], "postprocess": () => null },
        { "name": "spe_substring", "symbols": ["spe_substring$subexpression$1", "spe_substring$subexpression$2", "spe_substring$ebnf$1", "spe_substring$ebnf$2", (lexer_1.lexerAny.has("rparen") ? { type: "rparen" } : rparen)], "postprocess": x => (0, lexer_2.track)(x, {
                type: 'substring',
                value: x[1][1],
                ...x[2] && { from: x[2][1] },
                ...x[3] && { for: x[3][1] },
            }) },
        { "name": "various_binaries", "symbols": ["kw_at", "kw_time", "kw_zone"], "postprocess": () => 'AT TIME ZONE' },
        { "name": "createtable_statement$ebnf$1", "symbols": ["createtable_modifiers"], "postprocess": id },
        { "name": "createtable_statement$ebnf$1", "symbols": [], "postprocess": () => null },
        { "name": "createtable_statement$ebnf$2", "symbols": ["kw_ifnotexists"], "postprocess": id },
        { "name": "createtable_statement$ebnf$2", "symbols": [], "postprocess": () => null },
        { "name": "createtable_statement$ebnf$3", "symbols": ["createtable_opts"], "postprocess": id },
        { "name": "createtable_statement$ebnf$3", "symbols": [], "postprocess": () => null },
        { "name": "createtable_statement", "symbols": [(lexer_1.lexerAny.has("kw_create") ? { type: "kw_create" } : kw_create), "createtable_statement$ebnf$1", (lexer_1.lexerAny.has("kw_table") ? { type: "kw_table" } : kw_table), "createtable_statement$ebnf$2", "qname", "lparen", "createtable_declarationlist", "rparen", "createtable_statement$ebnf$3"], "postprocess": x => {
                const cols = x[6].filter((v) => 'kind' in v);
                const constraints = x[6].filter((v) => !('kind' in v));
                return (0, lexer_2.track)(x, {
                    type: 'create table',
                    ...!!x[3] ? { ifNotExists: true } : {},
                    name: x[4],
                    columns: cols,
                    ...unwrap(x[1]),
                    ...constraints.length ? { constraints } : {},
                    ...last(x),
                });
            } },
        { "name": "createtable_modifiers", "symbols": ["kw_unlogged"], "postprocess": x => x[0] ? { unlogged: true } : {} },
        { "name": "createtable_modifiers", "symbols": ["m_locglob"] },
        { "name": "createtable_modifiers", "symbols": ["m_tmp"] },
        { "name": "createtable_modifiers", "symbols": ["m_locglob", "m_tmp"], "postprocess": ([a, b]) => ({ ...a, ...b }) },
        { "name": "m_locglob$subexpression$1", "symbols": ["kw_local"] },
        { "name": "m_locglob$subexpression$1", "symbols": ["kw_global"] },
        { "name": "m_locglob", "symbols": ["m_locglob$subexpression$1"], "postprocess": x => ({ locality: toStr(x) }) },
        { "name": "m_tmp$subexpression$1", "symbols": ["kw_temp"] },
        { "name": "m_tmp$subexpression$1", "symbols": ["kw_temporary"] },
        { "name": "m_tmp", "symbols": ["m_tmp$subexpression$1"], "postprocess": x => ({ temporary: true }) },
        { "name": "createtable_declarationlist$ebnf$1", "symbols": [] },
        { "name": "createtable_declarationlist$ebnf$1$subexpression$1", "symbols": ["comma", "createtable_declaration"], "postprocess": last },
        { "name": "createtable_declarationlist$ebnf$1", "symbols": ["createtable_declarationlist$ebnf$1", "createtable_declarationlist$ebnf$1$subexpression$1"], "postprocess": (d) => d[0].concat([d[1]]) },
        { "name": "createtable_declarationlist", "symbols": ["createtable_declaration", "createtable_declarationlist$ebnf$1"], "postprocess": ([head, tail]) => {
                return [head, ...(tail || [])];
            } },
        { "name": "createtable_declaration$subexpression$1", "symbols": ["createtable_constraint"] },
        { "name": "createtable_declaration$subexpression$1", "symbols": ["createtable_column"] },
        { "name": "createtable_declaration$subexpression$1", "symbols": ["createtable_like"] },
        { "name": "createtable_declaration", "symbols": ["createtable_declaration$subexpression$1"], "postprocess": unwrap },
        { "name": "createtable_constraint$macrocall$2", "symbols": ["createtable_constraint_def"] },
        { "name": "createtable_constraint$macrocall$1$ebnf$1$subexpression$1", "symbols": [(lexer_1.lexerAny.has("kw_constraint") ? { type: "kw_constraint" } : kw_constraint), "word"] },
        { "name": "createtable_constraint$macrocall$1$ebnf$1", "symbols": ["createtable_constraint$macrocall$1$ebnf$1$subexpression$1"], "postprocess": id },
        { "name": "createtable_constraint$macrocall$1$ebnf$1", "symbols": [], "postprocess": () => null },
        { "name": "createtable_constraint$macrocall$1", "symbols": ["createtable_constraint$macrocall$1$ebnf$1", "createtable_constraint$macrocall$2"], "postprocess": x => {
                const name = x[0] && asName(x[0][1]);
                if (!name) {
                    return (0, lexer_2.track)(x, unwrap(x[1]));
                }
                return (0, lexer_2.track)(x, {
                    constraintName: name,
                    ...unwrap(x[1]),
                });
            } },
        { "name": "createtable_constraint", "symbols": ["createtable_constraint$macrocall$1"], "postprocess": unwrap },
        { "name": "createtable_constraint_def", "symbols": ["createtable_constraint_def_unique"] },
        { "name": "createtable_constraint_def", "symbols": ["createtable_constraint_def_check"] },
        { "name": "createtable_constraint_def", "symbols": ["createtable_constraint_foreignkey"] },
        { "name": "createtable_constraint_def_unique$subexpression$1", "symbols": [(lexer_1.lexerAny.has("kw_unique") ? { type: "kw_unique" } : kw_unique)] },
        { "name": "createtable_constraint_def_unique$subexpression$1", "symbols": ["kw_primary_key"] },
        { "name": "createtable_constraint_def_unique", "symbols": ["createtable_constraint_def_unique$subexpression$1", "lparen", "createtable_collist", "rparen"], "postprocess": x => (0, lexer_2.track)(x, {
                type: toStr(x[0], ' '),
                columns: x[2].map(asName),
            }) },
        { "name": "createtable_constraint_def_check", "symbols": [(lexer_1.lexerAny.has("kw_check") ? { type: "kw_check" } : kw_check), "expr_paren"], "postprocess": x => (0, lexer_2.track)(x, {
                type: 'check',
                expr: unwrap(x[1]),
            }) },
        { "name": "createtable_constraint_foreignkey", "symbols": [(lexer_1.lexerAny.has("kw_foreign") ? { type: "kw_foreign" } : kw_foreign), "kw_key", "collist_paren", "createtable_references"], "postprocess": (x) => {
                return (0, lexer_2.track)(x, {
                    type: 'foreign key',
                    localColumns: x[2].map(asName),
                    ...x[3],
                });
            } },
        { "name": "createtable_references$ebnf$1", "symbols": [] },
        { "name": "createtable_references$ebnf$1", "symbols": ["createtable_references$ebnf$1", "createtable_constraint_foreignkey_onsometing"], "postprocess": (d) => d[0].concat([d[1]]) },
        { "name": "createtable_references", "symbols": [(lexer_1.lexerAny.has("kw_references") ? { type: "kw_references" } : kw_references), "table_ref", "collist_paren", "createtable_references$ebnf$1"], "postprocess": (x) => {
                return (0, lexer_2.track)(x, {
                    foreignTable: unwrap(x[1]),
                    foreignColumns: x[2].map(asName),
                    ...x[3].reduce((a, b) => ({ ...a, ...b }), {}),
                });
            } },
        { "name": "createtable_constraint_foreignkey_onsometing", "symbols": [(lexer_1.lexerAny.has("kw_on") ? { type: "kw_on" } : kw_on), "kw_delete", "createtable_constraint_on_action"], "postprocess": x => (0, lexer_2.track)(x, { onDelete: last(x) }) },
        { "name": "createtable_constraint_foreignkey_onsometing", "symbols": [(lexer_1.lexerAny.has("kw_on") ? { type: "kw_on" } : kw_on), "kw_update", "createtable_constraint_on_action"], "postprocess": x => (0, lexer_2.track)(x, { onUpdate: last(x) }) },
        { "name": "createtable_constraint_foreignkey_onsometing$subexpression$1", "symbols": [(lexer_1.lexerAny.has("kw_full") ? { type: "kw_full" } : kw_full)] },
        { "name": "createtable_constraint_foreignkey_onsometing$subexpression$1", "symbols": ["kw_partial"] },
        { "name": "createtable_constraint_foreignkey_onsometing$subexpression$1", "symbols": ["kw_simple"] },
        { "name": "createtable_constraint_foreignkey_onsometing", "symbols": ["kw_match", "createtable_constraint_foreignkey_onsometing$subexpression$1"], "postprocess": x => (0, lexer_2.track)(x, { match: toStr(last(x)) }) },
        { "name": "createtable_constraint_on_action$subexpression$1", "symbols": ["kw_cascade"] },
        { "name": "createtable_constraint_on_action$subexpression$1$subexpression$1", "symbols": ["kw_no", "kw_action"] },
        { "name": "createtable_constraint_on_action$subexpression$1", "symbols": ["createtable_constraint_on_action$subexpression$1$subexpression$1"] },
        { "name": "createtable_constraint_on_action$subexpression$1", "symbols": ["kw_restrict"] },
        { "name": "createtable_constraint_on_action$subexpression$1$subexpression$2", "symbols": [(lexer_1.lexerAny.has("kw_null") ? { type: "kw_null" } : kw_null)] },
        { "name": "createtable_constraint_on_action$subexpression$1$subexpression$2", "symbols": [(lexer_1.lexerAny.has("kw_default") ? { type: "kw_default" } : kw_default)] },
        { "name": "createtable_constraint_on_action$subexpression$1", "symbols": ["kw_set", "createtable_constraint_on_action$subexpression$1$subexpression$2"] },
        { "name": "createtable_constraint_on_action", "symbols": ["createtable_constraint_on_action$subexpression$1"], "postprocess": x => toStr(x, ' ') },
        { "name": "createtable_collist$ebnf$1", "symbols": [] },
        { "name": "createtable_collist$ebnf$1$subexpression$1", "symbols": ["comma", "ident"], "postprocess": last },
        { "name": "createtable_collist$ebnf$1", "symbols": ["createtable_collist$ebnf$1", "createtable_collist$ebnf$1$subexpression$1"], "postprocess": (d) => d[0].concat([d[1]]) },
        { "name": "createtable_collist", "symbols": ["ident", "createtable_collist$ebnf$1"], "postprocess": ([head, tail]) => {
                return [head, ...(tail || [])];
            } },
        { "name": "createtable_column$ebnf$1", "symbols": ["createtable_collate"], "postprocess": id },
        { "name": "createtable_column$ebnf$1", "symbols": [], "postprocess": () => null },
        { "name": "createtable_column$ebnf$2", "symbols": [] },
        { "name": "createtable_column$ebnf$2", "symbols": ["createtable_column$ebnf$2", "createtable_column_constraint"], "postprocess": (d) => d[0].concat([d[1]]) },
        { "name": "createtable_column", "symbols": ["word", "data_type", "createtable_column$ebnf$1", "createtable_column$ebnf$2"], "postprocess": x => {
                return (0, lexer_2.track)(x, {
                    kind: 'column',
                    name: asName(x[0]),
                    dataType: x[1],
                    ...x[2] ? { collate: x[2][1] } : {},
                    ...x[3] && x[3].length ? { constraints: x[3] } : {},
                });
            } },
        { "name": "createtable_like$ebnf$1", "symbols": [] },
        { "name": "createtable_like$ebnf$1", "symbols": ["createtable_like$ebnf$1", "createtable_like_opt"], "postprocess": (d) => d[0].concat([d[1]]) },
        { "name": "createtable_like", "symbols": [(lexer_1.lexerAny.has("kw_like") ? { type: "kw_like" } : kw_like), "qname", "createtable_like$ebnf$1"], "postprocess": x => (0, lexer_2.track)(x, {
                kind: 'like table',
                like: x[1],
                options: x[2],
            }) },
        { "name": "createtable_like_opt$subexpression$1", "symbols": ["kw_including"] },
        { "name": "createtable_like_opt$subexpression$1", "symbols": ["kw_excluding"] },
        { "name": "createtable_like_opt", "symbols": ["createtable_like_opt$subexpression$1", "createtable_like_opt_val"], "postprocess": x => (0, lexer_2.track)(x, {
                verb: toStr(x[0]),
                option: toStr(x[1]),
            }) },
        { "name": "createtable_like_opt_val", "symbols": ["word"], "postprocess": anyKw('defaults', 'constraints', 'indexes', 'storage', 'comments') },
        { "name": "createtable_like_opt_val", "symbols": [(lexer_1.lexerAny.has("kw_all") ? { type: "kw_all" } : kw_all)] },
        { "name": "createtable_column_constraint$macrocall$2", "symbols": ["createtable_column_constraint_def"] },
        { "name": "createtable_column_constraint$macrocall$1$ebnf$1$subexpression$1", "symbols": [(lexer_1.lexerAny.has("kw_constraint") ? { type: "kw_constraint" } : kw_constraint), "word"] },
        { "name": "createtable_column_constraint$macrocall$1$ebnf$1", "symbols": ["createtable_column_constraint$macrocall$1$ebnf$1$subexpression$1"], "postprocess": id },
        { "name": "createtable_column_constraint$macrocall$1$ebnf$1", "symbols": [], "postprocess": () => null },
        { "name": "createtable_column_constraint$macrocall$1", "symbols": ["createtable_column_constraint$macrocall$1$ebnf$1", "createtable_column_constraint$macrocall$2"], "postprocess": x => {
                const name = x[0] && asName(x[0][1]);
                if (!name) {
                    return (0, lexer_2.track)(x, unwrap(x[1]));
                }
                return (0, lexer_2.track)(x, {
                    constraintName: name,
                    ...unwrap(x[1]),
                });
            } },
        { "name": "createtable_column_constraint", "symbols": ["createtable_column_constraint$macrocall$1"], "postprocess": unwrap },
        { "name": "createtable_column_constraint_def", "symbols": [(lexer_1.lexerAny.has("kw_unique") ? { type: "kw_unique" } : kw_unique)], "postprocess": x => (0, lexer_2.track)(x, { type: 'unique' }) },
        { "name": "createtable_column_constraint_def", "symbols": ["kw_primary_key"], "postprocess": x => (0, lexer_2.track)(x, { type: 'primary key' }) },
        { "name": "createtable_column_constraint_def", "symbols": ["kw_not_null"], "postprocess": x => (0, lexer_2.track)(x, { type: 'not null' }) },
        { "name": "createtable_column_constraint_def", "symbols": [(lexer_1.lexerAny.has("kw_null") ? { type: "kw_null" } : kw_null)], "postprocess": x => (0, lexer_2.track)(x, { type: 'null' }) },
        { "name": "createtable_column_constraint_def", "symbols": [(lexer_1.lexerAny.has("kw_default") ? { type: "kw_default" } : kw_default), "expr"], "postprocess": x => (0, lexer_2.track)(x, { type: 'default', default: unwrap(x[1]) }) },
        { "name": "createtable_column_constraint_def", "symbols": [(lexer_1.lexerAny.has("kw_check") ? { type: "kw_check" } : kw_check), "expr_paren"], "postprocess": x => (0, lexer_2.track)(x, { type: 'check', expr: unwrap(x[1]) }) },
        { "name": "createtable_column_constraint_def", "symbols": ["createtable_references"], "postprocess": x => (0, lexer_2.track)(x, { type: 'reference', ...unwrap(x) }) },
        { "name": "createtable_column_constraint_def", "symbols": ["altercol_generated"] },
        { "name": "createtable_collate", "symbols": [(lexer_1.lexerAny.has("kw_collate") ? { type: "kw_collate" } : kw_collate), "qualified_name"] },
        { "name": "createtable_opts$subexpression$1", "symbols": ["word"], "postprocess": kw('inherits') },
        { "name": "createtable_opts$macrocall$2", "symbols": ["qname"] },
        { "name": "createtable_opts$macrocall$1$ebnf$1", "symbols": [] },
        { "name": "createtable_opts$macrocall$1$ebnf$1$subexpression$1", "symbols": [(lexer_1.lexerAny.has("comma") ? { type: "comma" } : comma), "createtable_opts$macrocall$2"], "postprocess": last },
        { "name": "createtable_opts$macrocall$1$ebnf$1", "symbols": ["createtable_opts$macrocall$1$ebnf$1", "createtable_opts$macrocall$1$ebnf$1$subexpression$1"], "postprocess": (d) => d[0].concat([d[1]]) },
        { "name": "createtable_opts$macrocall$1", "symbols": ["createtable_opts$macrocall$2", "createtable_opts$macrocall$1$ebnf$1"], "postprocess": ([head, tail]) => {
                return [unwrap(head), ...(tail.map(unwrap) || [])];
            } },
        { "name": "createtable_opts", "symbols": ["createtable_opts$subexpression$1", "lparen", "createtable_opts$macrocall$1", "rparen"], "postprocess": x => (0, lexer_2.track)(x, { inherits: x[2] }) },
        { "name": "createindex_statement$ebnf$1", "symbols": [(lexer_1.lexerAny.has("kw_unique") ? { type: "kw_unique" } : kw_unique)], "postprocess": id },
        { "name": "createindex_statement$ebnf$1", "symbols": [], "postprocess": () => null },
        { "name": "createindex_statement$ebnf$2", "symbols": ["kw_ifnotexists"], "postprocess": id },
        { "name": "createindex_statement$ebnf$2", "symbols": [], "postprocess": () => null },
        { "name": "createindex_statement$ebnf$3", "symbols": ["word"], "postprocess": id },
        { "name": "createindex_statement$ebnf$3", "symbols": [], "postprocess": () => null },
        { "name": "createindex_statement$ebnf$4$subexpression$1", "symbols": [(lexer_1.lexerAny.has("kw_using") ? { type: "kw_using" } : kw_using), "ident"], "postprocess": last },
        { "name": "createindex_statement$ebnf$4", "symbols": ["createindex_statement$ebnf$4$subexpression$1"], "postprocess": id },
        { "name": "createindex_statement$ebnf$4", "symbols": [], "postprocess": () => null },
        { "name": "createindex_statement$ebnf$5", "symbols": ["createindex_with"], "postprocess": id },
        { "name": "createindex_statement$ebnf$5", "symbols": [], "postprocess": () => null },
        { "name": "createindex_statement$ebnf$6", "symbols": ["createindex_tblspace"], "postprocess": id },
        { "name": "createindex_statement$ebnf$6", "symbols": [], "postprocess": () => null },
        { "name": "createindex_statement$ebnf$7", "symbols": ["createindex_predicate"], "postprocess": id },
        { "name": "createindex_statement$ebnf$7", "symbols": [], "postprocess": () => null },
        { "name": "createindex_statement", "symbols": [(lexer_1.lexerAny.has("kw_create") ? { type: "kw_create" } : kw_create), "createindex_statement$ebnf$1", "kw_index", "createindex_statement$ebnf$2", "createindex_statement$ebnf$3", (lexer_1.lexerAny.has("kw_on") ? { type: "kw_on" } : kw_on), "table_ref", "createindex_statement$ebnf$4", "lparen", "createindex_expressions", "rparen", "createindex_statement$ebnf$5", "createindex_statement$ebnf$6", "createindex_statement$ebnf$7"], "postprocess": x => (0, lexer_2.track)(x, {
                type: 'create index',
                ...x[1] && { unique: true },
                ...x[3] && { ifNotExists: true },
                ...x[4] && { indexName: asName(x[4]) },
                table: x[6],
                ...x[7] && { using: asName(x[7]) },
                expressions: x[9],
                ...x[11] && { with: x[11] },
                ...x[12] && { tablespace: unwrap(x[12]) },
                ...x[13] && { where: unwrap(x[13]) },
            }) },
        { "name": "createindex_expressions$ebnf$1", "symbols": [] },
        { "name": "createindex_expressions$ebnf$1$subexpression$1", "symbols": ["comma", "createindex_expression"], "postprocess": last },
        { "name": "createindex_expressions$ebnf$1", "symbols": ["createindex_expressions$ebnf$1", "createindex_expressions$ebnf$1$subexpression$1"], "postprocess": (d) => d[0].concat([d[1]]) },
        { "name": "createindex_expressions", "symbols": ["createindex_expression", "createindex_expressions$ebnf$1"], "postprocess": ([head, tail]) => {
                return [head, ...(tail || [])];
            } },
        { "name": "createindex_expression$subexpression$1", "symbols": ["expr_basic"] },
        { "name": "createindex_expression$subexpression$1", "symbols": ["expr_paren"] },
        { "name": "createindex_expression$ebnf$1$subexpression$1", "symbols": [(lexer_1.lexerAny.has("kw_collate") ? { type: "kw_collate" } : kw_collate), "qualified_name"], "postprocess": last },
        { "name": "createindex_expression$ebnf$1", "symbols": ["createindex_expression$ebnf$1$subexpression$1"], "postprocess": id },
        { "name": "createindex_expression$ebnf$1", "symbols": [], "postprocess": () => null },
        { "name": "createindex_expression$ebnf$2", "symbols": ["qualified_name"], "postprocess": id },
        { "name": "createindex_expression$ebnf$2", "symbols": [], "postprocess": () => null },
        { "name": "createindex_expression$ebnf$3$subexpression$1", "symbols": [(lexer_1.lexerAny.has("kw_asc") ? { type: "kw_asc" } : kw_asc)] },
        { "name": "createindex_expression$ebnf$3$subexpression$1", "symbols": [(lexer_1.lexerAny.has("kw_desc") ? { type: "kw_desc" } : kw_desc)] },
        { "name": "createindex_expression$ebnf$3", "symbols": ["createindex_expression$ebnf$3$subexpression$1"], "postprocess": id },
        { "name": "createindex_expression$ebnf$3", "symbols": [], "postprocess": () => null },
        { "name": "createindex_expression$ebnf$4$subexpression$1$subexpression$1", "symbols": ["kw_first"] },
        { "name": "createindex_expression$ebnf$4$subexpression$1$subexpression$1", "symbols": ["kw_last"] },
        { "name": "createindex_expression$ebnf$4$subexpression$1", "symbols": ["kw_nulls", "createindex_expression$ebnf$4$subexpression$1$subexpression$1"], "postprocess": last },
        { "name": "createindex_expression$ebnf$4", "symbols": ["createindex_expression$ebnf$4$subexpression$1"], "postprocess": id },
        { "name": "createindex_expression$ebnf$4", "symbols": [], "postprocess": () => null },
        { "name": "createindex_expression", "symbols": ["createindex_expression$subexpression$1", "createindex_expression$ebnf$1", "createindex_expression$ebnf$2", "createindex_expression$ebnf$3", "createindex_expression$ebnf$4"], "postprocess": x => (0, lexer_2.track)(x, {
                expression: unwrap(x[0]),
                ...x[1] && { collate: unwrap(x[1]) },
                ...x[2] && { opclass: unwrap(x[2]) },
                ...x[3] && { order: unwrap(x[3]).value },
                ...x[4] && { nulls: unwrap(x[4]) },
            }) },
        { "name": "createindex_predicate", "symbols": [(lexer_1.lexerAny.has("kw_where") ? { type: "kw_where" } : kw_where), "expr"], "postprocess": last },
        { "name": "createindex_with$macrocall$2", "symbols": ["createindex_with_item"] },
        { "name": "createindex_with$macrocall$1$ebnf$1", "symbols": [] },
        { "name": "createindex_with$macrocall$1$ebnf$1$subexpression$1", "symbols": [(lexer_1.lexerAny.has("comma") ? { type: "comma" } : comma), "createindex_with$macrocall$2"], "postprocess": last },
        { "name": "createindex_with$macrocall$1$ebnf$1", "symbols": ["createindex_with$macrocall$1$ebnf$1", "createindex_with$macrocall$1$ebnf$1$subexpression$1"], "postprocess": (d) => d[0].concat([d[1]]) },
        { "name": "createindex_with$macrocall$1", "symbols": ["createindex_with$macrocall$2", "createindex_with$macrocall$1$ebnf$1"], "postprocess": ([head, tail]) => {
                return [unwrap(head), ...(tail.map(unwrap) || [])];
            } },
        { "name": "createindex_with", "symbols": [(lexer_1.lexerAny.has("kw_with") ? { type: "kw_with" } : kw_with), "lparen", "createindex_with$macrocall$1", "rparen"], "postprocess": get(2) },
        { "name": "createindex_with_item$subexpression$1", "symbols": ["string"] },
        { "name": "createindex_with_item$subexpression$1", "symbols": ["int"] },
        { "name": "createindex_with_item", "symbols": ["ident", (lexer_1.lexerAny.has("op_eq") ? { type: "op_eq" } : op_eq), "createindex_with_item$subexpression$1"], "postprocess": x => (0, lexer_2.track)(x, { parameter: toStr(x[0]), value: unwrap(x[2]).toString() }) },
        { "name": "createindex_tblspace", "symbols": ["kw_tablespace", "ident"], "postprocess": last },
        { "name": "createextension_statement$ebnf$1", "symbols": ["kw_ifnotexists"], "postprocess": id },
        { "name": "createextension_statement$ebnf$1", "symbols": [], "postprocess": () => null },
        { "name": "createextension_statement$ebnf$2", "symbols": [(lexer_1.lexerAny.has("kw_with") ? { type: "kw_with" } : kw_with)], "postprocess": id },
        { "name": "createextension_statement$ebnf$2", "symbols": [], "postprocess": () => null },
        { "name": "createextension_statement$ebnf$3$subexpression$1", "symbols": ["kw_schema", "word"], "postprocess": last },
        { "name": "createextension_statement$ebnf$3", "symbols": ["createextension_statement$ebnf$3$subexpression$1"], "postprocess": id },
        { "name": "createextension_statement$ebnf$3", "symbols": [], "postprocess": () => null },
        { "name": "createextension_statement$ebnf$4$subexpression$1", "symbols": ["kw_version", "string"], "postprocess": last },
        { "name": "createextension_statement$ebnf$4", "symbols": ["createextension_statement$ebnf$4$subexpression$1"], "postprocess": id },
        { "name": "createextension_statement$ebnf$4", "symbols": [], "postprocess": () => null },
        { "name": "createextension_statement$ebnf$5$subexpression$1", "symbols": [(lexer_1.lexerAny.has("kw_from") ? { type: "kw_from" } : kw_from), "string"], "postprocess": last },
        { "name": "createextension_statement$ebnf$5", "symbols": ["createextension_statement$ebnf$5$subexpression$1"], "postprocess": id },
        { "name": "createextension_statement$ebnf$5", "symbols": [], "postprocess": () => null },
        { "name": "createextension_statement", "symbols": [(lexer_1.lexerAny.has("kw_create") ? { type: "kw_create" } : kw_create), "kw_extension", "createextension_statement$ebnf$1", "word", "createextension_statement$ebnf$2", "createextension_statement$ebnf$3", "createextension_statement$ebnf$4", "createextension_statement$ebnf$5"], "postprocess": x => (0, lexer_2.track)(x, {
                type: 'create extension',
                ...!!x[2] ? { ifNotExists: true } : {},
                extension: asName(x[3]),
                ...!!x[5] ? { schema: asName(x[5]) } : {},
                ...!!x[6] ? { version: asLit(x[6]) } : {},
                ...!!x[7] ? { from: asLit(x[7]) } : {},
            }) },
        { "name": "simplestatements_all", "symbols": ["simplestatements_start_transaction"] },
        { "name": "simplestatements_all", "symbols": ["simplestatements_commit"] },
        { "name": "simplestatements_all", "symbols": ["simplestatements_rollback"] },
        { "name": "simplestatements_all", "symbols": ["simplestatements_tablespace"] },
        { "name": "simplestatements_all", "symbols": ["simplestatements_set"] },
        { "name": "simplestatements_all", "symbols": ["simplestatements_show"] },
        { "name": "simplestatements_all", "symbols": ["simplestatements_begin"] },
        { "name": "simplestatements_start_transaction$subexpression$1", "symbols": ["kw_start", "kw_transaction"] },
        { "name": "simplestatements_start_transaction", "symbols": ["simplestatements_start_transaction$subexpression$1"], "postprocess": x => (0, lexer_2.track)(x, { type: 'start transaction' }) },
        { "name": "simplestatements_commit", "symbols": ["kw_commit"], "postprocess": x => (0, lexer_2.track)(x, { type: 'commit' }) },
        { "name": "simplestatements_rollback", "symbols": ["kw_rollback"], "postprocess": x => (0, lexer_2.track)(x, { type: 'rollback' }) },
        { "name": "simplestatements_tablespace", "symbols": ["kw_tablespace", "word"], "postprocess": x => (0, lexer_2.track)(x, {
                type: 'tablespace',
                tablespace: asName(x[1]),
            }) },
        { "name": "simplestatements_set$subexpression$1", "symbols": ["simplestatements_set_simple"] },
        { "name": "simplestatements_set$subexpression$1", "symbols": ["simplestatements_set_timezone"] },
        { "name": "simplestatements_set", "symbols": ["kw_set", "simplestatements_set$subexpression$1"], "postprocess": last },
        { "name": "simplestatements_set_timezone", "symbols": ["kw_time", "kw_zone", "simplestatements_set_timezone_val"], "postprocess": x => (0, lexer_2.track)(x, { type: 'set timezone', to: x[2] }) },
        { "name": "simplestatements_set_timezone_val$subexpression$1", "symbols": ["string"] },
        { "name": "simplestatements_set_timezone_val$subexpression$1", "symbols": ["int"] },
        { "name": "simplestatements_set_timezone_val", "symbols": ["simplestatements_set_timezone_val$subexpression$1"], "postprocess": x => (0, lexer_2.track)(x, { type: 'value', value: unwrap(x[0]) }) },
        { "name": "simplestatements_set_timezone_val", "symbols": ["kw_local"], "postprocess": x => (0, lexer_2.track)(x, { type: 'local' }) },
        { "name": "simplestatements_set_timezone_val", "symbols": [(lexer_1.lexerAny.has("kw_default") ? { type: "kw_default" } : kw_default)], "postprocess": x => (0, lexer_2.track)(x, { type: 'default' }) },
        { "name": "simplestatements_set_timezone_val", "symbols": ["kw_interval", "string", "kw_hour", (lexer_1.lexerAny.has("kw_to") ? { type: "kw_to" } : kw_to), "kw_minute"], "postprocess": x => (0, lexer_2.track)(x, { type: 'interval', value: (0, lexer_2.unbox)(x[1]) }) },
        { "name": "simplestatements_set_simple$subexpression$1", "symbols": [(lexer_1.lexerAny.has("op_eq") ? { type: "op_eq" } : op_eq)] },
        { "name": "simplestatements_set_simple$subexpression$1", "symbols": [(lexer_1.lexerAny.has("kw_to") ? { type: "kw_to" } : kw_to)] },
        { "name": "simplestatements_set_simple", "symbols": ["ident", "simplestatements_set_simple$subexpression$1", "simplestatements_set_val"], "postprocess": x => (0, lexer_2.track)(x, {
                type: 'set',
                variable: asName(x[0]),
                set: (0, lexer_2.unbox)(x[2]),
            }) },
        { "name": "simplestatements_set_val", "symbols": ["simplestatements_set_val_raw"], "postprocess": unwrap },
        { "name": "simplestatements_set_val", "symbols": [(lexer_1.lexerAny.has("kw_default") ? { type: "kw_default" } : kw_default)], "postprocess": x => (0, lexer_2.track)(x, { type: 'default' }) },
        { "name": "simplestatements_set_val$ebnf$1$subexpression$1", "symbols": ["comma", "simplestatements_set_val_raw"] },
        { "name": "simplestatements_set_val$ebnf$1", "symbols": ["simplestatements_set_val$ebnf$1$subexpression$1"] },
        { "name": "simplestatements_set_val$ebnf$1$subexpression$2", "symbols": ["comma", "simplestatements_set_val_raw"] },
        { "name": "simplestatements_set_val$ebnf$1", "symbols": ["simplestatements_set_val$ebnf$1", "simplestatements_set_val$ebnf$1$subexpression$2"], "postprocess": (d) => d[0].concat([d[1]]) },
        { "name": "simplestatements_set_val", "symbols": ["simplestatements_set_val_raw", "simplestatements_set_val$ebnf$1"], "postprocess": x => (0, lexer_2.track)(x, {
                type: 'list',
                values: [x[0], ...(x[1] || [])]
            }) },
        { "name": "simplestatements_set_val_raw$subexpression$1", "symbols": ["string"] },
        { "name": "simplestatements_set_val_raw$subexpression$1", "symbols": ["int"] },
        { "name": "simplestatements_set_val_raw", "symbols": ["simplestatements_set_val_raw$subexpression$1"], "postprocess": x => (0, lexer_2.track)(x, { type: 'value', value: unwrap(x) }) },
        { "name": "simplestatements_set_val_raw$subexpression$2", "symbols": [(lexer_1.lexerAny.has("word") ? { type: "word" } : word)] },
        { "name": "simplestatements_set_val_raw$subexpression$2", "symbols": [(lexer_1.lexerAny.has("kw_on") ? { type: "kw_on" } : kw_on)] },
        { "name": "simplestatements_set_val_raw$subexpression$2", "symbols": [(lexer_1.lexerAny.has("kw_true") ? { type: "kw_true" } : kw_true)] },
        { "name": "simplestatements_set_val_raw$subexpression$2", "symbols": [(lexer_1.lexerAny.has("kw_false") ? { type: "kw_false" } : kw_false)] },
        { "name": "simplestatements_set_val_raw", "symbols": ["simplestatements_set_val_raw$subexpression$2"], "postprocess": x => (0, lexer_2.track)(x, { type: 'identifier', name: unwrap(x).value }) },
        { "name": "simplestatements_set_val_raw", "symbols": [(lexer_1.lexerAny.has("quoted_word") ? { type: "quoted_word" } : quoted_word)], "postprocess": x => (0, lexer_2.track)(x, { type: 'identifier', doubleQuoted: true, name: unwrap(x).value }) },
        { "name": "simplestatements_show", "symbols": ["kw_show", "ident"], "postprocess": x => (0, lexer_2.track)(x, { type: 'show', variable: asName(x[1]) }) },
        { "name": "create_schema$subexpression$1", "symbols": [(lexer_1.lexerAny.has("kw_create") ? { type: "kw_create" } : kw_create), "kw_schema"] },
        { "name": "create_schema$ebnf$1", "symbols": ["kw_ifnotexists"], "postprocess": id },
        { "name": "create_schema$ebnf$1", "symbols": [], "postprocess": () => null },
        { "name": "create_schema", "symbols": ["create_schema$subexpression$1", "create_schema$ebnf$1", "ident"], "postprocess": x => (0, lexer_2.track)(x, {
                type: 'create schema',
                name: asName(x[2]),
                ...!!x[1] ? { ifNotExists: true } : {},
            }) },
        { "name": "raise_statement$ebnf$1$subexpression$1", "symbols": [(lexer_1.lexerAny.has("word") ? { type: "word" } : word)], "postprocess": anyKw('debug', 'log', 'info', 'notice', 'warning', 'exception') },
        { "name": "raise_statement$ebnf$1", "symbols": ["raise_statement$ebnf$1$subexpression$1"], "postprocess": id },
        { "name": "raise_statement$ebnf$1", "symbols": [], "postprocess": () => null },
        { "name": "raise_statement$ebnf$2$subexpression$1", "symbols": ["comma", "expr_list_raw"], "postprocess": last },
        { "name": "raise_statement$ebnf$2", "symbols": ["raise_statement$ebnf$2$subexpression$1"], "postprocess": id },
        { "name": "raise_statement$ebnf$2", "symbols": [], "postprocess": () => null },
        { "name": "raise_statement$ebnf$3", "symbols": ["raise_using"], "postprocess": id },
        { "name": "raise_statement$ebnf$3", "symbols": [], "postprocess": () => null },
        { "name": "raise_statement", "symbols": ["kw_raise", "raise_statement$ebnf$1", "string", "raise_statement$ebnf$2", "raise_statement$ebnf$3"], "postprocess": x => (0, lexer_2.track)(x, {
                type: 'raise',
                format: toStr(x[2]),
                ...x[1] && { level: toStr(x[1]) },
                ...x[3] && x[3].length && { formatExprs: x[3] },
                ...x[4] && x[4].length && { using: x[4] },
            }) },
        { "name": "raise_using$macrocall$2", "symbols": ["raise_using_one"] },
        { "name": "raise_using$macrocall$1$ebnf$1", "symbols": [] },
        { "name": "raise_using$macrocall$1$ebnf$1$subexpression$1", "symbols": [(lexer_1.lexerAny.has("comma") ? { type: "comma" } : comma), "raise_using$macrocall$2"], "postprocess": last },
        { "name": "raise_using$macrocall$1$ebnf$1", "symbols": ["raise_using$macrocall$1$ebnf$1", "raise_using$macrocall$1$ebnf$1$subexpression$1"], "postprocess": (d) => d[0].concat([d[1]]) },
        { "name": "raise_using$macrocall$1", "symbols": ["raise_using$macrocall$2", "raise_using$macrocall$1$ebnf$1"], "postprocess": ([head, tail]) => {
                return [unwrap(head), ...(tail.map(unwrap) || [])];
            } },
        { "name": "raise_using", "symbols": [(lexer_1.lexerAny.has("kw_using") ? { type: "kw_using" } : kw_using), "raise_using$macrocall$1"], "postprocess": last },
        { "name": "raise_using_one", "symbols": ["raise_using_what", (lexer_1.lexerAny.has("op_eq") ? { type: "op_eq" } : op_eq), "expr"], "postprocess": x => (0, lexer_2.track)(x, {
                type: toStr(x[0]),
                value: x[2],
            }) },
        { "name": "raise_using_what", "symbols": [(lexer_1.lexerAny.has("kw_table") ? { type: "kw_table" } : kw_table)] },
        { "name": "raise_using_what", "symbols": [(lexer_1.lexerAny.has("word") ? { type: "word" } : word)], "postprocess": anyKw('message', 'detail', 'hint', 'errcode', 'column', 'constraint', 'datatype', 'schema') },
        { "name": "comment_statement", "symbols": ["kw_comment", (lexer_1.lexerAny.has("kw_on") ? { type: "kw_on" } : kw_on), "comment_what", (lexer_1.lexerAny.has("kw_is") ? { type: "kw_is" } : kw_is), "string"], "postprocess": x => (0, lexer_2.track)(x, {
                type: 'comment',
                comment: (0, lexer_2.unbox)(last(x)),
                on: unwrap(x[2]),
            }) },
        { "name": "comment_what", "symbols": ["comment_what_col"] },
        { "name": "comment_what", "symbols": ["comment_what_nm"] },
        { "name": "comment_what_nm$subexpression$1", "symbols": [(lexer_1.lexerAny.has("kw_table") ? { type: "kw_table" } : kw_table)] },
        { "name": "comment_what_nm$subexpression$1", "symbols": ["kw_materialized", "kw_view"] },
        { "name": "comment_what_nm$subexpression$1", "symbols": [(lexer_1.lexerAny.has("word") ? { type: "word" } : word)], "postprocess": anyKw('database', 'index', 'trigger', 'type', 'view') },
        { "name": "comment_what_nm", "symbols": ["comment_what_nm$subexpression$1", "qualified_name"], "postprocess": x => (0, lexer_2.track)(x, {
                type: toStr(x[0]),
                name: x[1],
            }) },
        { "name": "comment_what_col", "symbols": ["kw_column", "qcolumn"], "postprocess": x => (0, lexer_2.track)(x, {
                type: 'column',
                column: last(x),
            }) },
        { "name": "simplestatements_begin$ebnf$1$subexpression$1", "symbols": ["kw_transaction"] },
        { "name": "simplestatements_begin$ebnf$1$subexpression$1", "symbols": ["kw_work"] },
        { "name": "simplestatements_begin$ebnf$1", "symbols": ["simplestatements_begin$ebnf$1$subexpression$1"], "postprocess": id },
        { "name": "simplestatements_begin$ebnf$1", "symbols": [], "postprocess": () => null },
        { "name": "simplestatements_begin$ebnf$2", "symbols": [] },
        { "name": "simplestatements_begin$ebnf$2$subexpression$1", "symbols": ["simplestatements_begin_isol"] },
        { "name": "simplestatements_begin$ebnf$2$subexpression$1", "symbols": ["simplestatements_begin_writ"] },
        { "name": "simplestatements_begin$ebnf$2$subexpression$1", "symbols": ["simplestatements_begin_def"] },
        { "name": "simplestatements_begin$ebnf$2", "symbols": ["simplestatements_begin$ebnf$2", "simplestatements_begin$ebnf$2$subexpression$1"], "postprocess": (d) => d[0].concat([d[1]]) },
        { "name": "simplestatements_begin", "symbols": ["kw_begin", "simplestatements_begin$ebnf$1", "simplestatements_begin$ebnf$2"], "postprocess": x => (0, lexer_2.track)(x, {
                type: 'begin',
                ...x[2].reduce((a, b) => ({ ...unwrap(a), ...unwrap(b) }), {}),
            })
        },
        { "name": "simplestatements_begin_isol$subexpression$1", "symbols": ["kw_isolation", "kw_level"] },
        { "name": "simplestatements_begin_isol$subexpression$2", "symbols": ["kw_serializable"] },
        { "name": "simplestatements_begin_isol$subexpression$2$subexpression$1", "symbols": ["word"], "postprocess": kw('repeatable') },
        { "name": "simplestatements_begin_isol$subexpression$2", "symbols": ["simplestatements_begin_isol$subexpression$2$subexpression$1", "kw_read"] },
        { "name": "simplestatements_begin_isol$subexpression$2$subexpression$2", "symbols": ["word"], "postprocess": kw('committed') },
        { "name": "simplestatements_begin_isol$subexpression$2", "symbols": ["kw_read", "simplestatements_begin_isol$subexpression$2$subexpression$2"] },
        { "name": "simplestatements_begin_isol$subexpression$2$subexpression$3", "symbols": ["word"], "postprocess": kw('uncommitted') },
        { "name": "simplestatements_begin_isol$subexpression$2", "symbols": ["kw_read", "simplestatements_begin_isol$subexpression$2$subexpression$3"] },
        { "name": "simplestatements_begin_isol", "symbols": ["simplestatements_begin_isol$subexpression$1", "simplestatements_begin_isol$subexpression$2"], "postprocess": x => (0, lexer_2.track)(x, {
                isolationLevel: toStr(x[1], ' '),
            }) },
        { "name": "simplestatements_begin_writ$subexpression$1", "symbols": ["kw_read", "kw_write"] },
        { "name": "simplestatements_begin_writ$subexpression$1", "symbols": ["kw_read", (lexer_1.lexerAny.has("kw_only") ? { type: "kw_only" } : kw_only)] },
        { "name": "simplestatements_begin_writ", "symbols": ["simplestatements_begin_writ$subexpression$1"], "postprocess": x => (0, lexer_2.track)(x, {
                writeable: toStr(x, ' '),
            }) },
        { "name": "simplestatements_begin_def$ebnf$1", "symbols": [(lexer_1.lexerAny.has("kw_not") ? { type: "kw_not" } : kw_not)], "postprocess": id },
        { "name": "simplestatements_begin_def$ebnf$1", "symbols": [], "postprocess": () => null },
        { "name": "simplestatements_begin_def", "symbols": ["simplestatements_begin_def$ebnf$1", (lexer_1.lexerAny.has("kw_deferrable") ? { type: "kw_deferrable" } : kw_deferrable)], "postprocess": x => (0, lexer_2.track)(x, {
                deferrable: !x[0]
            }) },
        { "name": "insert_statement$subexpression$1", "symbols": ["kw_insert", (lexer_1.lexerAny.has("kw_into") ? { type: "kw_into" } : kw_into)] },
        { "name": "insert_statement$ebnf$1", "symbols": ["collist_paren"], "postprocess": id },
        { "name": "insert_statement$ebnf$1", "symbols": [], "postprocess": () => null },
        { "name": "insert_statement$ebnf$2$subexpression$1$subexpression$1", "symbols": ["kw_system"] },
        { "name": "insert_statement$ebnf$2$subexpression$1$subexpression$1", "symbols": [(lexer_1.lexerAny.has("kw_user") ? { type: "kw_user" } : kw_user)] },
        { "name": "insert_statement$ebnf$2$subexpression$1", "symbols": ["kw_overriding", "insert_statement$ebnf$2$subexpression$1$subexpression$1", "kw_value"], "postprocess": get(1) },
        { "name": "insert_statement$ebnf$2", "symbols": ["insert_statement$ebnf$2$subexpression$1"], "postprocess": id },
        { "name": "insert_statement$ebnf$2", "symbols": [], "postprocess": () => null },
        { "name": "insert_statement$ebnf$3$subexpression$1", "symbols": ["selection"] },
        { "name": "insert_statement$ebnf$3$subexpression$1", "symbols": ["selection_paren"] },
        { "name": "insert_statement$ebnf$3", "symbols": ["insert_statement$ebnf$3$subexpression$1"], "postprocess": id },
        { "name": "insert_statement$ebnf$3", "symbols": [], "postprocess": () => null },
        { "name": "insert_statement$ebnf$4$subexpression$1", "symbols": [(lexer_1.lexerAny.has("kw_on") ? { type: "kw_on" } : kw_on), "kw_conflict", "insert_on_conflict"], "postprocess": last },
        { "name": "insert_statement$ebnf$4", "symbols": ["insert_statement$ebnf$4$subexpression$1"], "postprocess": id },
        { "name": "insert_statement$ebnf$4", "symbols": [], "postprocess": () => null },
        { "name": "insert_statement$ebnf$5$subexpression$1", "symbols": [(lexer_1.lexerAny.has("kw_returning") ? { type: "kw_returning" } : kw_returning), "select_expr_list_aliased"], "postprocess": last },
        { "name": "insert_statement$ebnf$5", "symbols": ["insert_statement$ebnf$5$subexpression$1"], "postprocess": id },
        { "name": "insert_statement$ebnf$5", "symbols": [], "postprocess": () => null },
        { "name": "insert_statement", "symbols": ["insert_statement$subexpression$1", "table_ref_aliased", "insert_statement$ebnf$1", "insert_statement$ebnf$2", "insert_statement$ebnf$3", "insert_statement$ebnf$4", "insert_statement$ebnf$5"], "postprocess": x => {
                const columns = x[2] && x[2].map(asName);
                const overriding = toStr(x[3]);
                const insert = unwrap(x[4]);
                const onConflict = x[5];
                const returning = x[6];
                return (0, lexer_2.track)(x, {
                    type: 'insert',
                    into: unwrap(x[1]),
                    insert,
                    ...overriding && { overriding },
                    ...columns && { columns },
                    ...returning && { returning },
                    ...onConflict && { onConflict },
                });
            } },
        { "name": "insert_values$ebnf$1", "symbols": [] },
        { "name": "insert_values$ebnf$1$subexpression$1", "symbols": ["comma", "insert_value"], "postprocess": last },
        { "name": "insert_values$ebnf$1", "symbols": ["insert_values$ebnf$1", "insert_values$ebnf$1$subexpression$1"], "postprocess": (d) => d[0].concat([d[1]]) },
        { "name": "insert_values", "symbols": ["insert_value", "insert_values$ebnf$1"], "postprocess": ([head, tail]) => {
                return [head, ...(tail || [])];
            } },
        { "name": "insert_value", "symbols": ["lparen", "insert_expr_list_raw", "rparen"], "postprocess": get(1) },
        { "name": "insert_expr_list_raw$ebnf$1", "symbols": [] },
        { "name": "insert_expr_list_raw$ebnf$1$subexpression$1", "symbols": ["comma", "expr_or_select"], "postprocess": last },
        { "name": "insert_expr_list_raw$ebnf$1", "symbols": ["insert_expr_list_raw$ebnf$1", "insert_expr_list_raw$ebnf$1$subexpression$1"], "postprocess": (d) => d[0].concat([d[1]]) },
        { "name": "insert_expr_list_raw", "symbols": ["expr_or_select", "insert_expr_list_raw$ebnf$1"], "postprocess": ([head, tail]) => {
                return [head, ...(tail || [])];
            } },
        { "name": "insert_on_conflict$ebnf$1", "symbols": ["insert_on_conflict_what"], "postprocess": id },
        { "name": "insert_on_conflict$ebnf$1", "symbols": [], "postprocess": () => null },
        { "name": "insert_on_conflict", "symbols": ["insert_on_conflict$ebnf$1", "insert_on_conflict_do"], "postprocess": x => (0, lexer_2.track)(x, {
                ...x[0] ? { on: unwrap(x[0]) } : {},
                ...x[1],
            }) },
        { "name": "insert_on_conflict_what", "symbols": ["lparen", "expr_list_raw", "rparen"], "postprocess": x => (0, lexer_2.track)(x, {
                type: 'on expr',
                exprs: x[1],
            }) },
        { "name": "insert_on_conflict_what", "symbols": [(lexer_1.lexerAny.has("kw_on") ? { type: "kw_on" } : kw_on), (lexer_1.lexerAny.has("kw_constraint") ? { type: "kw_constraint" } : kw_constraint), "qname"], "postprocess": x => (0, lexer_2.track)(x, {
                type: 'on constraint',
                constraint: last(x),
            }) },
        { "name": "insert_on_conflict_do", "symbols": [(lexer_1.lexerAny.has("kw_do") ? { type: "kw_do" } : kw_do), "kw_nothing"], "postprocess": x => ({ do: 'do nothing' }) },
        { "name": "insert_on_conflict_do$subexpression$1", "symbols": [(lexer_1.lexerAny.has("kw_do") ? { type: "kw_do" } : kw_do), "kw_update", "kw_set"] },
        { "name": "insert_on_conflict_do$ebnf$1$subexpression$1", "symbols": [(lexer_1.lexerAny.has("kw_where") ? { type: "kw_where" } : kw_where), "expr"], "postprocess": last },
        { "name": "insert_on_conflict_do$ebnf$1", "symbols": ["insert_on_conflict_do$ebnf$1$subexpression$1"], "postprocess": id },
        { "name": "insert_on_conflict_do$ebnf$1", "symbols": [], "postprocess": () => null },
        { "name": "insert_on_conflict_do", "symbols": ["insert_on_conflict_do$subexpression$1", "update_set_list", "insert_on_conflict_do$ebnf$1"], "postprocess": x => ({
                do: { sets: x[1] },
                ...x[2] && { where: x[2] },
            }) },
        { "name": "update_statement$ebnf$1$subexpression$1", "symbols": [(lexer_1.lexerAny.has("kw_from") ? { type: "kw_from" } : kw_from), "select_from_subject"], "postprocess": last },
        { "name": "update_statement$ebnf$1", "symbols": ["update_statement$ebnf$1$subexpression$1"], "postprocess": id },
        { "name": "update_statement$ebnf$1", "symbols": [], "postprocess": () => null },
        { "name": "update_statement$ebnf$2", "symbols": ["select_where"], "postprocess": id },
        { "name": "update_statement$ebnf$2", "symbols": [], "postprocess": () => null },
        { "name": "update_statement$ebnf$3$subexpression$1", "symbols": [(lexer_1.lexerAny.has("kw_returning") ? { type: "kw_returning" } : kw_returning), "select_expr_list_aliased"], "postprocess": last },
        { "name": "update_statement$ebnf$3", "symbols": ["update_statement$ebnf$3$subexpression$1"], "postprocess": id },
        { "name": "update_statement$ebnf$3", "symbols": [], "postprocess": () => null },
        { "name": "update_statement", "symbols": ["kw_update", "table_ref_aliased", "kw_set", "update_set_list", "update_statement$ebnf$1", "update_statement$ebnf$2", "update_statement$ebnf$3"], "postprocess": x => {
                const from = unwrap(x[4]);
                const where = unwrap(x[5]);
                const returning = x[6];
                return (0, lexer_2.track)(x, {
                    type: 'update',
                    table: unwrap(x[1]),
                    sets: x[3],
                    ...where ? { where } : {},
                    ...from ? { from } : {},
                    ...returning ? { returning } : {},
                });
            } },
        { "name": "update_set_list$ebnf$1", "symbols": [] },
        { "name": "update_set_list$ebnf$1$subexpression$1", "symbols": ["comma", "update_set"], "postprocess": last },
        { "name": "update_set_list$ebnf$1", "symbols": ["update_set_list$ebnf$1", "update_set_list$ebnf$1$subexpression$1"], "postprocess": (d) => d[0].concat([d[1]]) },
        { "name": "update_set_list", "symbols": ["update_set", "update_set_list$ebnf$1"], "postprocess": ([head, tail]) => {
                const ret = [];
                for (const _t of [head, ...(tail || [])]) {
                    const t = unwrap(_t);
                    if (Array.isArray(t)) {
                        ret.push(...t);
                    }
                    else {
                        ret.push(t);
                    }
                }
                return ret;
            } },
        { "name": "update_set", "symbols": ["update_set_one"] },
        { "name": "update_set", "symbols": ["update_set_multiple"] },
        { "name": "update_set_one", "symbols": ["ident", (lexer_1.lexerAny.has("op_eq") ? { type: "op_eq" } : op_eq), "expr"], "postprocess": x => (0, lexer_2.box)(x, {
                column: asName(x[0]),
                value: unwrap(x[2]),
            }) },
        { "name": "update_set_multiple$subexpression$1", "symbols": ["lparen", "expr_list_raw", "rparen"], "postprocess": get(1) },
        { "name": "update_set_multiple", "symbols": ["collist_paren", (lexer_1.lexerAny.has("op_eq") ? { type: "op_eq" } : op_eq), "update_set_multiple$subexpression$1"], "postprocess": x => {
                const cols = x[0];
                const exprs = x[2];
                if (cols.length !== exprs.length) {
                    throw new Error('number of columns does not match number of values');
                }
                return (0, lexer_2.box)(x, cols.map((x, i) => ({
                    column: asName(x),
                    value: unwrap(exprs[i]),
                })));
            } },
        { "name": "altertable_statement$ebnf$1", "symbols": ["kw_ifexists"], "postprocess": id },
        { "name": "altertable_statement$ebnf$1", "symbols": [], "postprocess": () => null },
        { "name": "altertable_statement$ebnf$2", "symbols": [(lexer_1.lexerAny.has("kw_only") ? { type: "kw_only" } : kw_only)], "postprocess": id },
        { "name": "altertable_statement$ebnf$2", "symbols": [], "postprocess": () => null },
        { "name": "altertable_statement", "symbols": ["kw_alter", (lexer_1.lexerAny.has("kw_table") ? { type: "kw_table" } : kw_table), "altertable_statement$ebnf$1", "altertable_statement$ebnf$2", "table_ref", "altertable_actions"], "postprocess": x => (0, lexer_2.track)(x, {
                type: 'alter table',
                ...x[2] ? { ifExists: true } : {},
                ...x[3] ? { only: true } : {},
                table: unwrap(x[4]),
                changes: (0, lexer_2.unbox)(x[5]).map(unwrap),
            }) },
        { "name": "altertable_actions$ebnf$1", "symbols": [] },
        { "name": "altertable_actions$ebnf$1$subexpression$1", "symbols": ["comma", "altertable_action"], "postprocess": last },
        { "name": "altertable_actions$ebnf$1", "symbols": ["altertable_actions$ebnf$1", "altertable_actions$ebnf$1$subexpression$1"], "postprocess": (d) => d[0].concat([d[1]]) },
        { "name": "altertable_actions", "symbols": ["altertable_action", "altertable_actions$ebnf$1"], "postprocess": ([head, tail]) => {
                return [head, ...(tail || [])];
            } },
        { "name": "altertable_action", "symbols": ["altertable_rename_table"] },
        { "name": "altertable_action", "symbols": ["altertable_rename_column"] },
        { "name": "altertable_action", "symbols": ["altertable_rename_constraint"] },
        { "name": "altertable_action", "symbols": ["altertable_add_column"] },
        { "name": "altertable_action", "symbols": ["altertable_drop_column"] },
        { "name": "altertable_action", "symbols": ["altertable_alter_column"] },
        { "name": "altertable_action", "symbols": ["altertable_add_constraint"] },
        { "name": "altertable_action", "symbols": ["altertable_drop_constraint"] },
        { "name": "altertable_action", "symbols": ["altertable_owner"] },
        { "name": "altertable_rename_table", "symbols": ["kw_rename", (lexer_1.lexerAny.has("kw_to") ? { type: "kw_to" } : kw_to), "word"], "postprocess": x => (0, lexer_2.track)(x, {
                type: 'rename',
                to: asName(last(x)),
            }) },
        { "name": "altertable_rename_column$ebnf$1", "symbols": ["kw_column"], "postprocess": id },
        { "name": "altertable_rename_column$ebnf$1", "symbols": [], "postprocess": () => null },
        { "name": "altertable_rename_column", "symbols": ["kw_rename", "altertable_rename_column$ebnf$1", "ident", (lexer_1.lexerAny.has("kw_to") ? { type: "kw_to" } : kw_to), "ident"], "postprocess": x => (0, lexer_2.track)(x, {
                type: 'rename column',
                column: asName(x[2]),
                to: asName(last(x)),
            }) },
        { "name": "altertable_rename_constraint", "symbols": ["kw_rename", (lexer_1.lexerAny.has("kw_constraint") ? { type: "kw_constraint" } : kw_constraint), "ident", (lexer_1.lexerAny.has("kw_to") ? { type: "kw_to" } : kw_to), "ident"], "postprocess": x => (0, lexer_2.track)(x, {
                type: 'rename constraint',
                constraint: asName(x[2]),
                to: asName(last(x)),
            }) },
        { "name": "altertable_add_column$ebnf$1", "symbols": ["kw_column"], "postprocess": id },
        { "name": "altertable_add_column$ebnf$1", "symbols": [], "postprocess": () => null },
        { "name": "altertable_add_column$ebnf$2", "symbols": ["kw_ifnotexists"], "postprocess": id },
        { "name": "altertable_add_column$ebnf$2", "symbols": [], "postprocess": () => null },
        { "name": "altertable_add_column", "symbols": ["kw_add", "altertable_add_column$ebnf$1", "altertable_add_column$ebnf$2", "createtable_column"], "postprocess": x => (0, lexer_2.track)(x, {
                type: 'add column',
                ...x[2] ? { ifNotExists: true } : {},
                column: unwrap(x[3]),
            }) },
        { "name": "altertable_drop_column$ebnf$1", "symbols": ["kw_column"], "postprocess": id },
        { "name": "altertable_drop_column$ebnf$1", "symbols": [], "postprocess": () => null },
        { "name": "altertable_drop_column$ebnf$2", "symbols": ["kw_ifexists"], "postprocess": id },
        { "name": "altertable_drop_column$ebnf$2", "symbols": [], "postprocess": () => null },
        { "name": "altertable_drop_column$ebnf$3$subexpression$1", "symbols": ["kw_restrict"] },
        { "name": "altertable_drop_column$ebnf$3$subexpression$1", "symbols": ["kw_cascade"] },
        { "name": "altertable_drop_column$ebnf$3", "symbols": ["altertable_drop_column$ebnf$3$subexpression$1"], "postprocess": id },
        { "name": "altertable_drop_column$ebnf$3", "symbols": [], "postprocess": () => null },
        { "name": "altertable_drop_column", "symbols": ["kw_drop", "altertable_drop_column$ebnf$1", "altertable_drop_column$ebnf$2", "ident", "altertable_drop_column$ebnf$3"], "postprocess": x => (0, lexer_2.track)(x, {
                type: 'drop column',
                ...x[2] ? { ifExists: true } : {},
                column: asName(x[3]),
                ...x[4] ? { behaviour: toStr(x[4], ' ') } : {},
            }) },
        { "name": "altertable_alter_column$ebnf$1", "symbols": ["kw_column"], "postprocess": id },
        { "name": "altertable_alter_column$ebnf$1", "symbols": [], "postprocess": () => null },
        { "name": "altertable_alter_column", "symbols": ["kw_alter", "altertable_alter_column$ebnf$1", "ident", "altercol"], "postprocess": x => (0, lexer_2.track)(x, {
                type: 'alter column',
                column: asName(x[2]),
                alter: unwrap(x[3])
            }) },
        { "name": "altercol$ebnf$1$subexpression$1", "symbols": ["kw_set", "kw_data"] },
        { "name": "altercol$ebnf$1", "symbols": ["altercol$ebnf$1$subexpression$1"], "postprocess": id },
        { "name": "altercol$ebnf$1", "symbols": [], "postprocess": () => null },
        { "name": "altercol", "symbols": ["altercol$ebnf$1", "kw_type", "data_type"], "postprocess": x => (0, lexer_2.track)(x, { type: 'set type', dataType: unwrap(last(x)) }) },
        { "name": "altercol", "symbols": ["kw_set", (lexer_1.lexerAny.has("kw_default") ? { type: "kw_default" } : kw_default), "expr"], "postprocess": x => (0, lexer_2.track)(x, { type: 'set default', default: unwrap(last(x)) }) },
        { "name": "altercol", "symbols": ["kw_drop", (lexer_1.lexerAny.has("kw_default") ? { type: "kw_default" } : kw_default)], "postprocess": x => (0, lexer_2.track)(x, { type: 'drop default' }) },
        { "name": "altercol$subexpression$1", "symbols": ["kw_set"] },
        { "name": "altercol$subexpression$1", "symbols": ["kw_drop"] },
        { "name": "altercol", "symbols": ["altercol$subexpression$1", "kw_not_null"], "postprocess": x => (0, lexer_2.track)(x, { type: toStr(x, ' ') }) },
        { "name": "altercol", "symbols": ["altercol_generated_add"], "postprocess": unwrap },
        { "name": "altertable_add_constraint", "symbols": ["kw_add", "createtable_constraint"], "postprocess": x => (0, lexer_2.track)(x, {
                type: 'add constraint',
                constraint: unwrap(last(x)),
            }) },
        { "name": "altertable_drop_constraint$ebnf$1", "symbols": ["kw_ifexists"], "postprocess": id },
        { "name": "altertable_drop_constraint$ebnf$1", "symbols": [], "postprocess": () => null },
        { "name": "altertable_drop_constraint$ebnf$2$subexpression$1", "symbols": ["kw_restrict"] },
        { "name": "altertable_drop_constraint$ebnf$2$subexpression$1", "symbols": ["kw_cascade"] },
        { "name": "altertable_drop_constraint$ebnf$2", "symbols": ["altertable_drop_constraint$ebnf$2$subexpression$1"], "postprocess": id },
        { "name": "altertable_drop_constraint$ebnf$2", "symbols": [], "postprocess": () => null },
        { "name": "altertable_drop_constraint", "symbols": ["kw_drop", (lexer_1.lexerAny.has("kw_constraint") ? { type: "kw_constraint" } : kw_constraint), "altertable_drop_constraint$ebnf$1", "ident", "altertable_drop_constraint$ebnf$2"], "postprocess": x => (0, lexer_2.track)(x, {
                type: 'drop constraint',
                ...x[2] ? { ifExists: true } : {},
                constraint: asName(x[3]),
                ...x[4] ? { behaviour: toStr(x[4], ' ') } : {},
            }) },
        { "name": "altertable_owner", "symbols": ["kw_owner", (lexer_1.lexerAny.has("kw_to") ? { type: "kw_to" } : kw_to), "ident"], "postprocess": x => (0, lexer_2.track)(x, {
                type: 'owner',
                to: asName(last(x)),
            }) },
        { "name": "altercol_generated_add", "symbols": ["kw_add", "altercol_generated"], "postprocess": last },
        { "name": "altercol_generated$ebnf$1$subexpression$1", "symbols": ["kw_always"] },
        { "name": "altercol_generated$ebnf$1$subexpression$1", "symbols": ["kw_by", (lexer_1.lexerAny.has("kw_default") ? { type: "kw_default" } : kw_default)] },
        { "name": "altercol_generated$ebnf$1", "symbols": ["altercol_generated$ebnf$1$subexpression$1"], "postprocess": id },
        { "name": "altercol_generated$ebnf$1", "symbols": [], "postprocess": () => null },
        { "name": "altercol_generated$subexpression$1", "symbols": [(lexer_1.lexerAny.has("kw_as") ? { type: "kw_as" } : kw_as), "kw_identity"] },
        { "name": "altercol_generated$ebnf$2$subexpression$1", "symbols": ["lparen", "altercol_generated_seq", "rparen"], "postprocess": get(1) },
        { "name": "altercol_generated$ebnf$2", "symbols": ["altercol_generated$ebnf$2$subexpression$1"], "postprocess": id },
        { "name": "altercol_generated$ebnf$2", "symbols": [], "postprocess": () => null },
        { "name": "altercol_generated", "symbols": ["kw_generated", "altercol_generated$ebnf$1", "altercol_generated$subexpression$1", "altercol_generated$ebnf$2"], "postprocess": x => (0, lexer_2.track)(x, {
                type: 'add generated',
                ...x[1] && { always: toStr(x[1], ' ') },
                ...x[3] && { sequence: unwrap(x[3]) },
            }) },
        { "name": "altercol_generated_seq$ebnf$1$subexpression$1", "symbols": ["kw_sequence", "kw_name", "qualified_name"] },
        { "name": "altercol_generated_seq$ebnf$1", "symbols": ["altercol_generated_seq$ebnf$1$subexpression$1"], "postprocess": id },
        { "name": "altercol_generated_seq$ebnf$1", "symbols": [], "postprocess": () => null },
        { "name": "altercol_generated_seq$ebnf$2", "symbols": [] },
        { "name": "altercol_generated_seq$ebnf$2", "symbols": ["altercol_generated_seq$ebnf$2", "create_sequence_option"], "postprocess": (d) => d[0].concat([d[1]]) },
        { "name": "altercol_generated_seq", "symbols": ["altercol_generated_seq$ebnf$1", "altercol_generated_seq$ebnf$2"], "postprocess": x => {
                const ret = {
                    ...x[0] && { name: unwrap(last(x[0])) },
                };
                setSeqOpts(ret, x[1]);
                return (0, lexer_2.track)(x, ret);
            } },
        { "name": "alterindex_statement$ebnf$1", "symbols": ["kw_ifexists"], "postprocess": id },
        { "name": "alterindex_statement$ebnf$1", "symbols": [], "postprocess": () => null },
        { "name": "alterindex_statement", "symbols": ["kw_alter", "kw_index", "alterindex_statement$ebnf$1", "table_ref", "alterindex_action"], "postprocess": x => (0, lexer_2.track)(x, {
                type: 'alter index',
                ...x[2] ? { ifExists: true } : {},
                index: unwrap(x[3]),
                change: unwrap(x[4]),
            }) },
        { "name": "alterindex_action", "symbols": ["alterindex_rename"] },
        { "name": "alterindex_action", "symbols": ["alterindex_set_tablespace"] },
        { "name": "alterindex_rename", "symbols": ["kw_rename", (lexer_1.lexerAny.has("kw_to") ? { type: "kw_to" } : kw_to), "word"], "postprocess": x => (0, lexer_2.track)(x, {
                type: 'rename',
                to: asName(last(x)),
            }) },
        { "name": "alterindex_set_tablespace", "symbols": ["kw_set", "kw_tablespace", "word"], "postprocess": x => (0, lexer_2.track)(x, {
                type: 'set tablespace',
                tablespace: asName(last(x)),
            }) },
        { "name": "delete_statement", "symbols": ["delete_delete"] },
        { "name": "delete_statement", "symbols": ["delete_truncate"] },
        { "name": "delete_delete$subexpression$1", "symbols": ["kw_delete", (lexer_1.lexerAny.has("kw_from") ? { type: "kw_from" } : kw_from)] },
        { "name": "delete_delete$ebnf$1", "symbols": ["select_where"], "postprocess": id },
        { "name": "delete_delete$ebnf$1", "symbols": [], "postprocess": () => null },
        { "name": "delete_delete$ebnf$2$subexpression$1", "symbols": [(lexer_1.lexerAny.has("kw_returning") ? { type: "kw_returning" } : kw_returning), "select_expr_list_aliased"], "postprocess": last },
        { "name": "delete_delete$ebnf$2", "symbols": ["delete_delete$ebnf$2$subexpression$1"], "postprocess": id },
        { "name": "delete_delete$ebnf$2", "symbols": [], "postprocess": () => null },
        { "name": "delete_delete", "symbols": ["delete_delete$subexpression$1", "table_ref_aliased", "delete_delete$ebnf$1", "delete_delete$ebnf$2"], "postprocess": x => {
                const where = x[2];
                const returning = x[3];
                return (0, lexer_2.track)(x, {
                    type: 'delete',
                    from: unwrap(x[1]),
                    ...where ? { where } : {},
                    ...returning ? { returning } : {},
                });
            } },
        { "name": "delete_truncate$subexpression$1$ebnf$1", "symbols": [(lexer_1.lexerAny.has("kw_table") ? { type: "kw_table" } : kw_table)], "postprocess": id },
        { "name": "delete_truncate$subexpression$1$ebnf$1", "symbols": [], "postprocess": () => null },
        { "name": "delete_truncate$subexpression$1", "symbols": ["kw_truncate", "delete_truncate$subexpression$1$ebnf$1"] },
        { "name": "delete_truncate$macrocall$2", "symbols": ["table_ref"] },
        { "name": "delete_truncate$macrocall$1$ebnf$1", "symbols": [] },
        { "name": "delete_truncate$macrocall$1$ebnf$1$subexpression$1", "symbols": [(lexer_1.lexerAny.has("comma") ? { type: "comma" } : comma), "delete_truncate$macrocall$2"], "postprocess": last },
        { "name": "delete_truncate$macrocall$1$ebnf$1", "symbols": ["delete_truncate$macrocall$1$ebnf$1", "delete_truncate$macrocall$1$ebnf$1$subexpression$1"], "postprocess": (d) => d[0].concat([d[1]]) },
        { "name": "delete_truncate$macrocall$1", "symbols": ["delete_truncate$macrocall$2", "delete_truncate$macrocall$1$ebnf$1"], "postprocess": ([head, tail]) => {
                return [unwrap(head), ...(tail.map(unwrap) || [])];
            } },
        { "name": "delete_truncate$ebnf$1$subexpression$1$subexpression$1", "symbols": ["kw_restart"] },
        { "name": "delete_truncate$ebnf$1$subexpression$1$subexpression$1", "symbols": ["kw_continue"] },
        { "name": "delete_truncate$ebnf$1$subexpression$1", "symbols": ["delete_truncate$ebnf$1$subexpression$1$subexpression$1", "kw_identity"] },
        { "name": "delete_truncate$ebnf$1", "symbols": ["delete_truncate$ebnf$1$subexpression$1"], "postprocess": id },
        { "name": "delete_truncate$ebnf$1", "symbols": [], "postprocess": () => null },
        { "name": "delete_truncate$ebnf$2$subexpression$1", "symbols": ["kw_restrict"] },
        { "name": "delete_truncate$ebnf$2$subexpression$1", "symbols": ["kw_cascade"] },
        { "name": "delete_truncate$ebnf$2", "symbols": ["delete_truncate$ebnf$2$subexpression$1"], "postprocess": id },
        { "name": "delete_truncate$ebnf$2", "symbols": [], "postprocess": () => null },
        { "name": "delete_truncate", "symbols": ["delete_truncate$subexpression$1", "delete_truncate$macrocall$1", "delete_truncate$ebnf$1", "delete_truncate$ebnf$2"], "postprocess": x => (0, lexer_2.track)(x, {
                type: 'truncate table',
                tables: x[1],
                ...x[2] && { identity: toStr(x[2][0]) },
                ...x[3] && { cascade: toStr(x[3]) },
            }) },
        { "name": "create_sequence_statement$ebnf$1$subexpression$1", "symbols": ["kw_temp"] },
        { "name": "create_sequence_statement$ebnf$1$subexpression$1", "symbols": ["kw_temporary"] },
        { "name": "create_sequence_statement$ebnf$1", "symbols": ["create_sequence_statement$ebnf$1$subexpression$1"], "postprocess": id },
        { "name": "create_sequence_statement$ebnf$1", "symbols": [], "postprocess": () => null },
        { "name": "create_sequence_statement$ebnf$2", "symbols": ["kw_ifnotexists"], "postprocess": id },
        { "name": "create_sequence_statement$ebnf$2", "symbols": [], "postprocess": () => null },
        { "name": "create_sequence_statement$ebnf$3", "symbols": [] },
        { "name": "create_sequence_statement$ebnf$3", "symbols": ["create_sequence_statement$ebnf$3", "create_sequence_option"], "postprocess": (d) => d[0].concat([d[1]]) },
        { "name": "create_sequence_statement", "symbols": [(lexer_1.lexerAny.has("kw_create") ? { type: "kw_create" } : kw_create), "create_sequence_statement$ebnf$1", "kw_sequence", "create_sequence_statement$ebnf$2", "qualified_name", "create_sequence_statement$ebnf$3"], "postprocess": x => {
                const ret = {
                    type: 'create sequence',
                    ...x[1] && { temp: true },
                    ...x[3] && { ifNotExists: true },
                    name: unwrap(x[4]),
                    options: {},
                };
                setSeqOpts(ret.options, x[5]);
                return (0, lexer_2.track)(x, ret);
            } },
        { "name": "create_sequence_option", "symbols": [(lexer_1.lexerAny.has("kw_as") ? { type: "kw_as" } : kw_as), "data_type"], "postprocess": x => (0, lexer_2.box)(x, ['as', x[1]]) },
        { "name": "create_sequence_option$ebnf$1", "symbols": ["kw_by"], "postprocess": id },
        { "name": "create_sequence_option$ebnf$1", "symbols": [], "postprocess": () => null },
        { "name": "create_sequence_option", "symbols": ["kw_increment", "create_sequence_option$ebnf$1", "int"], "postprocess": x => (0, lexer_2.box)(x, ['incrementBy', x[2]]) },
        { "name": "create_sequence_option", "symbols": ["create_sequence_minvalue"], "postprocess": x => (0, lexer_2.box)(x, ['minValue', x[0]]) },
        { "name": "create_sequence_option", "symbols": ["create_sequence_maxvalue"], "postprocess": x => (0, lexer_2.box)(x, ['maxValue', x[0]]) },
        { "name": "create_sequence_option$ebnf$2", "symbols": [(lexer_1.lexerAny.has("kw_with") ? { type: "kw_with" } : kw_with)], "postprocess": id },
        { "name": "create_sequence_option$ebnf$2", "symbols": [], "postprocess": () => null },
        { "name": "create_sequence_option", "symbols": ["kw_start", "create_sequence_option$ebnf$2", "int"], "postprocess": x => (0, lexer_2.box)(x, ['startWith', x[2]]) },
        { "name": "create_sequence_option", "symbols": ["kw_cache", "int"], "postprocess": x => (0, lexer_2.box)(x, ['cache', x[1]]) },
        { "name": "create_sequence_option$ebnf$3", "symbols": ["kw_no"], "postprocess": id },
        { "name": "create_sequence_option$ebnf$3", "symbols": [], "postprocess": () => null },
        { "name": "create_sequence_option", "symbols": ["create_sequence_option$ebnf$3", "kw_cycle"], "postprocess": x => (0, lexer_2.box)(x, ['cycle', toStr(x, ' ')]) },
        { "name": "create_sequence_option", "symbols": ["create_sequence_owned_by"], "postprocess": x => (0, lexer_2.box)(x, ['ownedBy', unwrap(x)]) },
        { "name": "create_sequence_minvalue", "symbols": ["kw_minvalue", "int"], "postprocess": last },
        { "name": "create_sequence_minvalue", "symbols": ["kw_no", "kw_minvalue"], "postprocess": x => (0, lexer_2.box)(x, 'no minvalue') },
        { "name": "create_sequence_maxvalue", "symbols": ["kw_maxvalue", "int"], "postprocess": last },
        { "name": "create_sequence_maxvalue", "symbols": ["kw_no", "kw_maxvalue"], "postprocess": x => (0, lexer_2.box)(x, 'no maxvalue') },
        { "name": "create_sequence_owned_by$subexpression$1", "symbols": ["kw_none"] },
        { "name": "create_sequence_owned_by$subexpression$1", "symbols": ["qcolumn"] },
        { "name": "create_sequence_owned_by", "symbols": ["kw_owned", "kw_by", "create_sequence_owned_by$subexpression$1"], "postprocess": x => (0, lexer_2.box)(x, unwrap(last(x))) },
        { "name": "alter_sequence_statement$ebnf$1", "symbols": ["kw_ifexists"], "postprocess": id },
        { "name": "alter_sequence_statement$ebnf$1", "symbols": [], "postprocess": () => null },
        { "name": "alter_sequence_statement", "symbols": ["kw_alter", "kw_sequence", "alter_sequence_statement$ebnf$1", "qualified_name", "alter_sequence_statement_body"], "postprocess": x => {
                const ret = {
                    type: 'alter sequence',
                    ...x[2] && { ifExists: true },
                    name: unwrap(x[3]),
                    change: x[4],
                };
                return (0, lexer_2.track)(x, ret);
            } },
        { "name": "alter_sequence_statement_body$ebnf$1", "symbols": ["alter_sequence_option"] },
        { "name": "alter_sequence_statement_body$ebnf$1", "symbols": ["alter_sequence_statement_body$ebnf$1", "alter_sequence_option"], "postprocess": (d) => d[0].concat([d[1]]) },
        { "name": "alter_sequence_statement_body", "symbols": ["alter_sequence_statement_body$ebnf$1"], "postprocess": x => {
                const ret = {
                    type: 'set options',
                };
                setSeqOpts(ret, x[0]);
                return (0, lexer_2.track)(x, ret);
            } },
        { "name": "alter_sequence_statement_body$subexpression$1", "symbols": ["ident"] },
        { "name": "alter_sequence_statement_body$subexpression$1", "symbols": [(lexer_1.lexerAny.has("kw_session_user") ? { type: "kw_session_user" } : kw_session_user)] },
        { "name": "alter_sequence_statement_body$subexpression$1", "symbols": [(lexer_1.lexerAny.has("kw_current_user") ? { type: "kw_current_user" } : kw_current_user)] },
        { "name": "alter_sequence_statement_body", "symbols": ["kw_owner", (lexer_1.lexerAny.has("kw_to") ? { type: "kw_to" } : kw_to), "alter_sequence_statement_body$subexpression$1"], "postprocess": x => (0, lexer_2.track)(x, { type: 'owner to', owner: asName(last(x)), }) },
        { "name": "alter_sequence_statement_body", "symbols": ["kw_rename", (lexer_1.lexerAny.has("kw_to") ? { type: "kw_to" } : kw_to), "ident"], "postprocess": x => (0, lexer_2.track)(x, { type: 'rename', newName: asName(last(x)) }) },
        { "name": "alter_sequence_statement_body", "symbols": ["kw_set", "kw_schema", "ident"], "postprocess": x => (0, lexer_2.track)(x, { type: 'set schema', newSchema: asName(last(x)) }) },
        { "name": "alter_sequence_option", "symbols": ["create_sequence_option"], "postprocess": unwrap },
        { "name": "alter_sequence_option$ebnf$1$subexpression$1$ebnf$1", "symbols": [(lexer_1.lexerAny.has("kw_with") ? { type: "kw_with" } : kw_with)], "postprocess": id },
        { "name": "alter_sequence_option$ebnf$1$subexpression$1$ebnf$1", "symbols": [], "postprocess": () => null },
        { "name": "alter_sequence_option$ebnf$1$subexpression$1", "symbols": ["alter_sequence_option$ebnf$1$subexpression$1$ebnf$1", "int"], "postprocess": last },
        { "name": "alter_sequence_option$ebnf$1", "symbols": ["alter_sequence_option$ebnf$1$subexpression$1"], "postprocess": id },
        { "name": "alter_sequence_option$ebnf$1", "symbols": [], "postprocess": () => null },
        { "name": "alter_sequence_option", "symbols": ["kw_restart", "alter_sequence_option$ebnf$1"], "postprocess": x => (0, lexer_2.box)(x, ['restart', typeof (0, lexer_2.unbox)(x[1]) === 'number' ? (0, lexer_2.unbox)(x[1]) : true]) },
        { "name": "drop_statement$ebnf$1", "symbols": ["kw_ifexists"], "postprocess": id },
        { "name": "drop_statement$ebnf$1", "symbols": [], "postprocess": () => null },
        { "name": "drop_statement$macrocall$2", "symbols": ["qualified_name"] },
        { "name": "drop_statement$macrocall$1$ebnf$1", "symbols": [] },
        { "name": "drop_statement$macrocall$1$ebnf$1$subexpression$1", "symbols": [(lexer_1.lexerAny.has("comma") ? { type: "comma" } : comma), "drop_statement$macrocall$2"], "postprocess": last },
        { "name": "drop_statement$macrocall$1$ebnf$1", "symbols": ["drop_statement$macrocall$1$ebnf$1", "drop_statement$macrocall$1$ebnf$1$subexpression$1"], "postprocess": (d) => d[0].concat([d[1]]) },
        { "name": "drop_statement$macrocall$1", "symbols": ["drop_statement$macrocall$2", "drop_statement$macrocall$1$ebnf$1"], "postprocess": ([head, tail]) => {
                return [unwrap(head), ...(tail.map(unwrap) || [])];
            } },
        { "name": "drop_statement$ebnf$2$subexpression$1", "symbols": ["kw_cascade"] },
        { "name": "drop_statement$ebnf$2$subexpression$1", "symbols": ["kw_restrict"] },
        { "name": "drop_statement$ebnf$2", "symbols": ["drop_statement$ebnf$2$subexpression$1"], "postprocess": id },
        { "name": "drop_statement$ebnf$2", "symbols": [], "postprocess": () => null },
        { "name": "drop_statement", "symbols": ["kw_drop", "drop_what", "drop_statement$ebnf$1", "drop_statement$macrocall$1", "drop_statement$ebnf$2"], "postprocess": (x, rej) => {
                const v = unwrap(x[1]);
                return (0, lexer_2.track)(x, {
                    ...v,
                    ...x[2] && { ifExists: true },
                    names: x[3],
                    ...x[4] && { cascade: toStr(x[4]) },
                });
            } },
        { "name": "drop_what", "symbols": [(lexer_1.lexerAny.has("kw_table") ? { type: "kw_table" } : kw_table)], "postprocess": x => (0, lexer_2.track)(x, { type: 'drop table' }) },
        { "name": "drop_what", "symbols": ["kw_sequence"], "postprocess": x => (0, lexer_2.track)(x, { type: 'drop sequence' }) },
        { "name": "drop_what", "symbols": ["kw_type"], "postprocess": x => (0, lexer_2.track)(x, { type: 'drop type' }) },
        { "name": "drop_what", "symbols": ["kw_trigger"], "postprocess": x => (0, lexer_2.track)(x, { type: 'drop trigger' }) },
        { "name": "drop_what$ebnf$1", "symbols": [(lexer_1.lexerAny.has("kw_concurrently") ? { type: "kw_concurrently" } : kw_concurrently)], "postprocess": id },
        { "name": "drop_what$ebnf$1", "symbols": [], "postprocess": () => null },
        { "name": "drop_what", "symbols": ["kw_index", "drop_what$ebnf$1"], "postprocess": x => (0, lexer_2.track)(x, {
                type: 'drop index',
                ...x[1] && { concurrently: true },
            }) },
        { "name": "with_statement", "symbols": [(lexer_1.lexerAny.has("kw_with") ? { type: "kw_with" } : kw_with), "with_statement_bindings", "with_statement_statement"], "postprocess": x => (0, lexer_2.track)(x, {
                type: 'with',
                bind: x[1],
                in: unwrap(x[2]),
            }) },
        { "name": "with_recursive_statement$subexpression$1", "symbols": [(lexer_1.lexerAny.has("kw_with") ? { type: "kw_with" } : kw_with), "kw_recursive"] },
        { "name": "with_recursive_statement", "symbols": ["with_recursive_statement$subexpression$1", "ident", "collist_paren", (lexer_1.lexerAny.has("kw_as") ? { type: "kw_as" } : kw_as), "lparen", "union_statement", "rparen", "with_statement_statement"], "postprocess": x => (0, lexer_2.track)(x, {
                type: 'with recursive',
                alias: asName(x[1]),
                columnNames: x[2].map(asName),
                bind: x[5],
                in: unwrap(x[7]),
            }) },
        { "name": "with_statement_bindings$ebnf$1", "symbols": [] },
        { "name": "with_statement_bindings$ebnf$1$subexpression$1", "symbols": ["comma", "with_statement_binding"], "postprocess": last },
        { "name": "with_statement_bindings$ebnf$1", "symbols": ["with_statement_bindings$ebnf$1", "with_statement_bindings$ebnf$1$subexpression$1"], "postprocess": (d) => d[0].concat([d[1]]) },
        { "name": "with_statement_bindings", "symbols": ["with_statement_binding", "with_statement_bindings$ebnf$1"], "postprocess": ([head, tail]) => {
                return [head, ...(tail || [])];
            } },
        { "name": "with_statement_binding", "symbols": ["word", (lexer_1.lexerAny.has("kw_as") ? { type: "kw_as" } : kw_as), "lparen", "with_statement_statement", "rparen"], "postprocess": x => (0, lexer_2.track)(x, {
                alias: asName(x[0]),
                statement: unwrap(x[3]),
            }) },
        { "name": "with_statement_statement", "symbols": ["selection"] },
        { "name": "with_statement_statement", "symbols": ["insert_statement"] },
        { "name": "with_statement_statement", "symbols": ["update_statement"] },
        { "name": "with_statement_statement", "symbols": ["delete_statement"] },
        { "name": "createtype_statement$subexpression$1", "symbols": ["createtype_enum"] },
        { "name": "createtype_statement$subexpression$1", "symbols": ["createtype_composite"] },
        { "name": "createtype_statement", "symbols": [(lexer_1.lexerAny.has("kw_create") ? { type: "kw_create" } : kw_create), "kw_type", "qualified_name", "createtype_statement$subexpression$1"], "postprocess": x => (0, lexer_2.track)(x, {
                name: x[2],
                ...unwrap(x[3]),
            }) },
        { "name": "createtype_enum$macrocall$2", "symbols": ["enum_value"] },
        { "name": "createtype_enum$macrocall$1$ebnf$1", "symbols": [] },
        { "name": "createtype_enum$macrocall$1$ebnf$1$subexpression$1", "symbols": [(lexer_1.lexerAny.has("comma") ? { type: "comma" } : comma), "createtype_enum$macrocall$2"], "postprocess": last },
        { "name": "createtype_enum$macrocall$1$ebnf$1", "symbols": ["createtype_enum$macrocall$1$ebnf$1", "createtype_enum$macrocall$1$ebnf$1$subexpression$1"], "postprocess": (d) => d[0].concat([d[1]]) },
        { "name": "createtype_enum$macrocall$1", "symbols": ["createtype_enum$macrocall$2", "createtype_enum$macrocall$1$ebnf$1"], "postprocess": ([head, tail]) => {
                return [unwrap(head), ...(tail.map(unwrap) || [])];
            } },
        { "name": "createtype_enum", "symbols": [(lexer_1.lexerAny.has("kw_as") ? { type: "kw_as" } : kw_as), "kw_enum", "lparen", "createtype_enum$macrocall$1", "rparen"], "postprocess": x => (0, lexer_2.track)(x, {
                type: 'create enum',
                values: x[3],
            }) },
        { "name": "enum_value", "symbols": ["string"], "postprocess": x => (0, lexer_2.track)(x, { value: toStr(x) }) },
        { "name": "createtype_composite$macrocall$2", "symbols": ["createtype_composite_attr"] },
        { "name": "createtype_composite$macrocall$1$ebnf$1", "symbols": [] },
        { "name": "createtype_composite$macrocall$1$ebnf$1$subexpression$1", "symbols": [(lexer_1.lexerAny.has("comma") ? { type: "comma" } : comma), "createtype_composite$macrocall$2"], "postprocess": last },
        { "name": "createtype_composite$macrocall$1$ebnf$1", "symbols": ["createtype_composite$macrocall$1$ebnf$1", "createtype_composite$macrocall$1$ebnf$1$subexpression$1"], "postprocess": (d) => d[0].concat([d[1]]) },
        { "name": "createtype_composite$macrocall$1", "symbols": ["createtype_composite$macrocall$2", "createtype_composite$macrocall$1$ebnf$1"], "postprocess": ([head, tail]) => {
                return [unwrap(head), ...(tail.map(unwrap) || [])];
            } },
        { "name": "createtype_composite", "symbols": [(lexer_1.lexerAny.has("kw_as") ? { type: "kw_as" } : kw_as), "lparen", "createtype_composite$macrocall$1", "rparen"], "postprocess": x => (0, lexer_2.track)(x, {
                type: 'create composite type',
                attributes: x[2],
            }) },
        { "name": "createtype_composite_attr$ebnf$1", "symbols": ["createtable_collate"], "postprocess": id },
        { "name": "createtype_composite_attr$ebnf$1", "symbols": [], "postprocess": () => null },
        { "name": "createtype_composite_attr", "symbols": ["word", "data_type", "createtype_composite_attr$ebnf$1"], "postprocess": x => {
                return (0, lexer_2.track)(x, {
                    name: asName(x[0]),
                    dataType: x[1],
                    ...x[2] ? { collate: x[2][1] } : {},
                });
            } },
        { "name": "union_left", "symbols": ["select_statement"] },
        { "name": "union_left", "symbols": ["select_values"] },
        { "name": "union_left", "symbols": ["selection_paren"] },
        { "name": "union_right", "symbols": ["selection"] },
        { "name": "union_right", "symbols": ["selection_paren"] },
        { "name": "union_statement$subexpression$1$ebnf$1", "symbols": [(lexer_1.lexerAny.has("kw_all") ? { type: "kw_all" } : kw_all)], "postprocess": id },
        { "name": "union_statement$subexpression$1$ebnf$1", "symbols": [], "postprocess": () => null },
        { "name": "union_statement$subexpression$1", "symbols": [(lexer_1.lexerAny.has("kw_union") ? { type: "kw_union" } : kw_union), "union_statement$subexpression$1$ebnf$1"] },
        { "name": "union_statement", "symbols": ["union_left", "union_statement$subexpression$1", "union_right"], "postprocess": x => {
                return (0, lexer_2.track)(x, {
                    type: toStr(x[1], ' '),
                    left: unwrap(x[0]),
                    right: unwrap(x[2]),
                });
            } },
        { "name": "prepare$ebnf$1$subexpression$1", "symbols": ["lparen", "data_type_list", "rparen"], "postprocess": get(1) },
        { "name": "prepare$ebnf$1", "symbols": ["prepare$ebnf$1$subexpression$1"], "postprocess": id },
        { "name": "prepare$ebnf$1", "symbols": [], "postprocess": () => null },
        { "name": "prepare", "symbols": ["kw_prepare", "ident", "prepare$ebnf$1", (lexer_1.lexerAny.has("kw_as") ? { type: "kw_as" } : kw_as), "statement_noprep"], "postprocess": x => (0, lexer_2.track)(x, {
                type: 'prepare',
                name: asName(x[1]),
                ...x[2] && { args: x[2] },
                statement: unwrap(last(x)),
            }) },
        { "name": "deallocate$ebnf$1", "symbols": ["kw_prepare"], "postprocess": id },
        { "name": "deallocate$ebnf$1", "symbols": [], "postprocess": () => null },
        { "name": "deallocate", "symbols": ["kw_deallocate", "deallocate$ebnf$1", "deallocate_target"], "postprocess": x => (0, lexer_2.track)(x, {
                type: 'deallocate',
                target: x[2],
            }) },
        { "name": "deallocate_target", "symbols": ["deallocate_all"], "postprocess": unwrap },
        { "name": "deallocate_target", "symbols": ["deallocate_name"], "postprocess": unwrap },
        { "name": "deallocate_name", "symbols": ["ident"], "postprocess": x => (0, lexer_2.track)(x, asName(x[0])) },
        { "name": "deallocate_all", "symbols": [(lexer_1.lexerAny.has("kw_all") ? { type: "kw_all" } : kw_all)], "postprocess": x => (0, lexer_2.track)(x, { option: 'all' }) },
        { "name": "create_view_statements", "symbols": ["create_view"] },
        { "name": "create_view_statements", "symbols": ["create_materialized_view"] },
        { "name": "create_view$ebnf$1$subexpression$1", "symbols": [(lexer_1.lexerAny.has("kw_or") ? { type: "kw_or" } : kw_or), "kw_replace"] },
        { "name": "create_view$ebnf$1", "symbols": ["create_view$ebnf$1$subexpression$1"], "postprocess": id },
        { "name": "create_view$ebnf$1", "symbols": [], "postprocess": () => null },
        { "name": "create_view$ebnf$2$subexpression$1", "symbols": ["kw_temp"] },
        { "name": "create_view$ebnf$2$subexpression$1", "symbols": ["kw_temporary"] },
        { "name": "create_view$ebnf$2", "symbols": ["create_view$ebnf$2$subexpression$1"], "postprocess": id },
        { "name": "create_view$ebnf$2", "symbols": [], "postprocess": () => null },
        { "name": "create_view$ebnf$3", "symbols": ["kw_recursive"], "postprocess": id },
        { "name": "create_view$ebnf$3", "symbols": [], "postprocess": () => null },
        { "name": "create_view$ebnf$4$subexpression$1$macrocall$2", "symbols": ["ident"] },
        { "name": "create_view$ebnf$4$subexpression$1$macrocall$1$ebnf$1", "symbols": [] },
        { "name": "create_view$ebnf$4$subexpression$1$macrocall$1$ebnf$1$subexpression$1", "symbols": [(lexer_1.lexerAny.has("comma") ? { type: "comma" } : comma), "create_view$ebnf$4$subexpression$1$macrocall$2"], "postprocess": last },
        { "name": "create_view$ebnf$4$subexpression$1$macrocall$1$ebnf$1", "symbols": ["create_view$ebnf$4$subexpression$1$macrocall$1$ebnf$1", "create_view$ebnf$4$subexpression$1$macrocall$1$ebnf$1$subexpression$1"], "postprocess": (d) => d[0].concat([d[1]]) },
        { "name": "create_view$ebnf$4$subexpression$1$macrocall$1", "symbols": ["create_view$ebnf$4$subexpression$1$macrocall$2", "create_view$ebnf$4$subexpression$1$macrocall$1$ebnf$1"], "postprocess": ([head, tail]) => {
                return [unwrap(head), ...(tail.map(unwrap) || [])];
            } },
        { "name": "create_view$ebnf$4$subexpression$1", "symbols": ["lparen", "create_view$ebnf$4$subexpression$1$macrocall$1", "rparen"], "postprocess": get(1) },
        { "name": "create_view$ebnf$4", "symbols": ["create_view$ebnf$4$subexpression$1"], "postprocess": id },
        { "name": "create_view$ebnf$4", "symbols": [], "postprocess": () => null },
        { "name": "create_view$ebnf$5", "symbols": ["create_view_opts"], "postprocess": id },
        { "name": "create_view$ebnf$5", "symbols": [], "postprocess": () => null },
        { "name": "create_view$ebnf$6$subexpression$1$subexpression$1", "symbols": ["kw_local"] },
        { "name": "create_view$ebnf$6$subexpression$1$subexpression$1", "symbols": ["kw_cascaded"] },
        { "name": "create_view$ebnf$6$subexpression$1", "symbols": [(lexer_1.lexerAny.has("kw_with") ? { type: "kw_with" } : kw_with), "create_view$ebnf$6$subexpression$1$subexpression$1", (lexer_1.lexerAny.has("kw_check") ? { type: "kw_check" } : kw_check), "kw_option"], "postprocess": get(1) },
        { "name": "create_view$ebnf$6", "symbols": ["create_view$ebnf$6$subexpression$1"], "postprocess": id },
        { "name": "create_view$ebnf$6", "symbols": [], "postprocess": () => null },
        { "name": "create_view", "symbols": [(lexer_1.lexerAny.has("kw_create") ? { type: "kw_create" } : kw_create), "create_view$ebnf$1", "create_view$ebnf$2", "create_view$ebnf$3", "kw_view", "qualified_name", "create_view$ebnf$4", "create_view$ebnf$5", (lexer_1.lexerAny.has("kw_as") ? { type: "kw_as" } : kw_as), "selection", "create_view$ebnf$6"], "postprocess": x => {
                return (0, lexer_2.track)(x, {
                    type: 'create view',
                    ...x[1] && { orReplace: true },
                    ...x[2] && { temp: true },
                    ...x[3] && { recursive: true },
                    name: x[5],
                    ...x[6] && { columnNames: x[6].map(asName) },
                    ...x[7] && { parameters: fromEntries(x[7]) },
                    query: x[9],
                    ...x[10] && { checkOption: toStr(x[10]) },
                });
            } },
        { "name": "create_view_opt", "symbols": ["ident", (lexer_1.lexerAny.has("op_eq") ? { type: "op_eq" } : op_eq), "ident"], "postprocess": ([a, _, b]) => [toStr(a), toStr(b)] },
        { "name": "create_view_opts$macrocall$2", "symbols": ["create_view_opt"] },
        { "name": "create_view_opts$macrocall$1$ebnf$1", "symbols": [] },
        { "name": "create_view_opts$macrocall$1$ebnf$1$subexpression$1", "symbols": [(lexer_1.lexerAny.has("comma") ? { type: "comma" } : comma), "create_view_opts$macrocall$2"], "postprocess": last },
        { "name": "create_view_opts$macrocall$1$ebnf$1", "symbols": ["create_view_opts$macrocall$1$ebnf$1", "create_view_opts$macrocall$1$ebnf$1$subexpression$1"], "postprocess": (d) => d[0].concat([d[1]]) },
        { "name": "create_view_opts$macrocall$1", "symbols": ["create_view_opts$macrocall$2", "create_view_opts$macrocall$1$ebnf$1"], "postprocess": ([head, tail]) => {
                return [unwrap(head), ...(tail.map(unwrap) || [])];
            } },
        { "name": "create_view_opts", "symbols": [(lexer_1.lexerAny.has("kw_with") ? { type: "kw_with" } : kw_with), "create_view_opts$macrocall$1"], "postprocess": last },
        { "name": "create_materialized_view$ebnf$1", "symbols": ["kw_ifnotexists"], "postprocess": id },
        { "name": "create_materialized_view$ebnf$1", "symbols": [], "postprocess": () => null },
        { "name": "create_materialized_view$ebnf$2$subexpression$1$macrocall$2", "symbols": ["ident"] },
        { "name": "create_materialized_view$ebnf$2$subexpression$1$macrocall$1$ebnf$1", "symbols": [] },
        { "name": "create_materialized_view$ebnf$2$subexpression$1$macrocall$1$ebnf$1$subexpression$1", "symbols": [(lexer_1.lexerAny.has("comma") ? { type: "comma" } : comma), "create_materialized_view$ebnf$2$subexpression$1$macrocall$2"], "postprocess": last },
        { "name": "create_materialized_view$ebnf$2$subexpression$1$macrocall$1$ebnf$1", "symbols": ["create_materialized_view$ebnf$2$subexpression$1$macrocall$1$ebnf$1", "create_materialized_view$ebnf$2$subexpression$1$macrocall$1$ebnf$1$subexpression$1"], "postprocess": (d) => d[0].concat([d[1]]) },
        { "name": "create_materialized_view$ebnf$2$subexpression$1$macrocall$1", "symbols": ["create_materialized_view$ebnf$2$subexpression$1$macrocall$2", "create_materialized_view$ebnf$2$subexpression$1$macrocall$1$ebnf$1"], "postprocess": ([head, tail]) => {
                return [unwrap(head), ...(tail.map(unwrap) || [])];
            } },
        { "name": "create_materialized_view$ebnf$2$subexpression$1", "symbols": ["lparen", "create_materialized_view$ebnf$2$subexpression$1$macrocall$1", "rparen"], "postprocess": get(1) },
        { "name": "create_materialized_view$ebnf$2", "symbols": ["create_materialized_view$ebnf$2$subexpression$1"], "postprocess": id },
        { "name": "create_materialized_view$ebnf$2", "symbols": [], "postprocess": () => null },
        { "name": "create_materialized_view$ebnf$3", "symbols": ["create_view_opts"], "postprocess": id },
        { "name": "create_materialized_view$ebnf$3", "symbols": [], "postprocess": () => null },
        { "name": "create_materialized_view$ebnf$4$subexpression$1", "symbols": ["kw_tablespace", "ident"], "postprocess": last },
        { "name": "create_materialized_view$ebnf$4", "symbols": ["create_materialized_view$ebnf$4$subexpression$1"], "postprocess": id },
        { "name": "create_materialized_view$ebnf$4", "symbols": [], "postprocess": () => null },
        { "name": "create_materialized_view$ebnf$5$subexpression$1$ebnf$1", "symbols": ["kw_no"], "postprocess": id },
        { "name": "create_materialized_view$ebnf$5$subexpression$1$ebnf$1", "symbols": [], "postprocess": () => null },
        { "name": "create_materialized_view$ebnf$5$subexpression$1", "symbols": [(lexer_1.lexerAny.has("kw_with") ? { type: "kw_with" } : kw_with), "create_materialized_view$ebnf$5$subexpression$1$ebnf$1", "kw_data"] },
        { "name": "create_materialized_view$ebnf$5", "symbols": ["create_materialized_view$ebnf$5$subexpression$1"], "postprocess": id },
        { "name": "create_materialized_view$ebnf$5", "symbols": [], "postprocess": () => null },
        { "name": "create_materialized_view", "symbols": [(lexer_1.lexerAny.has("kw_create") ? { type: "kw_create" } : kw_create), "kw_materialized", "kw_view", "create_materialized_view$ebnf$1", "qualified_name", "create_materialized_view$ebnf$2", "create_materialized_view$ebnf$3", "create_materialized_view$ebnf$4", (lexer_1.lexerAny.has("kw_as") ? { type: "kw_as" } : kw_as), "selection", "create_materialized_view$ebnf$5"], "postprocess": x => {
                return (0, lexer_2.track)(x, {
                    type: 'create materialized view',
                    ...x[3] && { ifNotExists: true },
                    name: x[4],
                    ...x[5] && { columnNames: x[6].map(asName) },
                    ...x[6] && { parameters: fromEntries(x[6]) },
                    ...x[7] && { tablespace: asName(x[7]) },
                    query: x[9],
                    ...x[10] && { withData: toStr(x[10][1]) !== 'no' },
                });
            } },
        { "name": "refresh_view_statements$ebnf$1", "symbols": [(lexer_1.lexerAny.has("kw_concurrently") ? { type: "kw_concurrently" } : kw_concurrently)], "postprocess": id },
        { "name": "refresh_view_statements$ebnf$1", "symbols": [], "postprocess": () => null },
        { "name": "refresh_view_statements$ebnf$2$subexpression$1$ebnf$1", "symbols": ["kw_no"], "postprocess": id },
        { "name": "refresh_view_statements$ebnf$2$subexpression$1$ebnf$1", "symbols": [], "postprocess": () => null },
        { "name": "refresh_view_statements$ebnf$2$subexpression$1", "symbols": [(lexer_1.lexerAny.has("kw_with") ? { type: "kw_with" } : kw_with), "refresh_view_statements$ebnf$2$subexpression$1$ebnf$1", "kw_data"] },
        { "name": "refresh_view_statements$ebnf$2", "symbols": ["refresh_view_statements$ebnf$2$subexpression$1"], "postprocess": id },
        { "name": "refresh_view_statements$ebnf$2", "symbols": [], "postprocess": () => null },
        { "name": "refresh_view_statements", "symbols": ["kw_refresh", "kw_materialized", "kw_view", "refresh_view_statements$ebnf$1", "qname", "refresh_view_statements$ebnf$2"], "postprocess": x => (0, lexer_2.track)(x, {
                type: 'refresh materialized view',
                ...!!x[3] ? { concurrently: true } : {},
                name: x[4],
                ...!!x[5] ? { withData: toStr(x[5][1]) !== 'no' } : {},
            }) },
        { "name": "functions_statements", "symbols": ["create_func"] },
        { "name": "functions_statements", "symbols": ["do_stm"] },
        { "name": "functions_statements", "symbols": ["drop_func"] },
        { "name": "create_func$ebnf$1$subexpression$1", "symbols": [(lexer_1.lexerAny.has("kw_or") ? { type: "kw_or" } : kw_or), "kw_replace"] },
        { "name": "create_func$ebnf$1", "symbols": ["create_func$ebnf$1$subexpression$1"], "postprocess": id },
        { "name": "create_func$ebnf$1", "symbols": [], "postprocess": () => null },
        { "name": "create_func$subexpression$1$ebnf$1$macrocall$2", "symbols": ["func_argdef"] },
        { "name": "create_func$subexpression$1$ebnf$1$macrocall$1$ebnf$1", "symbols": [] },
        { "name": "create_func$subexpression$1$ebnf$1$macrocall$1$ebnf$1$subexpression$1", "symbols": [(lexer_1.lexerAny.has("comma") ? { type: "comma" } : comma), "create_func$subexpression$1$ebnf$1$macrocall$2"], "postprocess": last },
        { "name": "create_func$subexpression$1$ebnf$1$macrocall$1$ebnf$1", "symbols": ["create_func$subexpression$1$ebnf$1$macrocall$1$ebnf$1", "create_func$subexpression$1$ebnf$1$macrocall$1$ebnf$1$subexpression$1"], "postprocess": (d) => d[0].concat([d[1]]) },
        { "name": "create_func$subexpression$1$ebnf$1$macrocall$1", "symbols": ["create_func$subexpression$1$ebnf$1$macrocall$2", "create_func$subexpression$1$ebnf$1$macrocall$1$ebnf$1"], "postprocess": ([head, tail]) => {
                return [unwrap(head), ...(tail.map(unwrap) || [])];
            } },
        { "name": "create_func$subexpression$1$ebnf$1", "symbols": ["create_func$subexpression$1$ebnf$1$macrocall$1"], "postprocess": id },
        { "name": "create_func$subexpression$1$ebnf$1", "symbols": [], "postprocess": () => null },
        { "name": "create_func$subexpression$1", "symbols": ["lparen", "create_func$subexpression$1$ebnf$1", "rparen"], "postprocess": get(1) },
        { "name": "create_func$ebnf$2", "symbols": ["func_spec"] },
        { "name": "create_func$ebnf$2", "symbols": ["create_func$ebnf$2", "func_spec"], "postprocess": (d) => d[0].concat([d[1]]) },
        { "name": "create_func", "symbols": [(lexer_1.lexerAny.has("kw_create") ? { type: "kw_create" } : kw_create), "create_func$ebnf$1", "kw_function", "qname", "create_func$subexpression$1", "create_func$ebnf$2"], "postprocess": (x, rej) => {
                var _a;
                const specs = {};
                for (const s of x[5]) {
                    for (const k in s) {
                        if (k[0] !== '_' && k in specs) {
                            throw new Error('conflicting or redundant options ' + k);
                        }
                    }
                    Object.assign(specs, s);
                }
                return (0, lexer_2.track)(x, {
                    type: 'create function',
                    ...x[1] && { orReplace: true },
                    name: x[3],
                    arguments: (_a = x[4]) !== null && _a !== void 0 ? _a : [],
                    ...specs,
                });
            } },
        { "name": "func_argdef$ebnf$1", "symbols": ["func_argopts"], "postprocess": id },
        { "name": "func_argdef$ebnf$1", "symbols": [], "postprocess": () => null },
        { "name": "func_argdef$ebnf$2", "symbols": ["func_argdefault"], "postprocess": id },
        { "name": "func_argdef$ebnf$2", "symbols": [], "postprocess": () => null },
        { "name": "func_argdef", "symbols": ["func_argdef$ebnf$1", "data_type", "func_argdef$ebnf$2"], "postprocess": x => (0, lexer_2.track)(x, {
                default: x[2],
                type: x[1],
                ...x[0],
            }) },
        { "name": "func_argdefault", "symbols": [(lexer_1.lexerAny.has("kw_default") ? { type: "kw_default" } : kw_default), "expr"], "postprocess": x => x[1]
        },
        { "name": "func_argdefault", "symbols": [(lexer_1.lexerAny.has("op_eq") ? { type: "op_eq" } : op_eq), "expr"], "postprocess": x => x[1] },
        { "name": "func_argopts$ebnf$1", "symbols": ["word"], "postprocess": id },
        { "name": "func_argopts$ebnf$1", "symbols": [], "postprocess": () => null },
        { "name": "func_argopts", "symbols": ["func_argmod", "func_argopts$ebnf$1"], "postprocess": x => (0, lexer_2.track)(x, {
                mode: toStr(x[0]),
                ...x[1] && { name: asName(x[1]) },
            }) },
        { "name": "func_argopts", "symbols": ["word"], "postprocess": (x, rej) => {
                const name = asName(x);
                if (name === 'out' || name === 'inout' || name === 'variadic') {
                    return rej; // avoid ambiguous syntax
                }
                return (0, lexer_2.track)(x, { name });
            } },
        { "name": "func_argmod", "symbols": [(lexer_1.lexerAny.has("kw_in") ? { type: "kw_in" } : kw_in)] },
        { "name": "func_argmod", "symbols": ["kw_out"] },
        { "name": "func_argmod", "symbols": ["kw_inout"] },
        { "name": "func_argmod", "symbols": ["kw_variadic"] },
        { "name": "func_spec", "symbols": ["kw_language", "word"], "postprocess": x => (0, lexer_2.track)(x, { language: asName(last(x)) }) },
        { "name": "func_spec", "symbols": ["func_purity"], "postprocess": x => (0, lexer_2.track)(x, { purity: toStr(x) }) },
        { "name": "func_spec$subexpression$1", "symbols": [(lexer_1.lexerAny.has("codeblock") ? { type: "codeblock" } : codeblock)] },
        { "name": "func_spec$subexpression$1", "symbols": ["string"] },
        { "name": "func_spec", "symbols": [(lexer_1.lexerAny.has("kw_as") ? { type: "kw_as" } : kw_as), "func_spec$subexpression$1"], "postprocess": x => ({ code: toStr(last(x)) }) },
        { "name": "func_spec$ebnf$1", "symbols": [(lexer_1.lexerAny.has("kw_not") ? { type: "kw_not" } : kw_not)], "postprocess": id },
        { "name": "func_spec$ebnf$1", "symbols": [], "postprocess": () => null },
        { "name": "func_spec$subexpression$2", "symbols": ["word"], "postprocess": kw('leakproof') },
        { "name": "func_spec", "symbols": ["func_spec$ebnf$1", "func_spec$subexpression$2"], "postprocess": x => (0, lexer_2.track)(x, { leakproof: !x[0] }) },
        { "name": "func_spec", "symbols": ["func_returns"], "postprocess": x => (0, lexer_2.track)(x, { returns: unwrap(x) }) },
        { "name": "func_spec$subexpression$3", "symbols": ["word"], "postprocess": kw('called') },
        { "name": "func_spec", "symbols": ["func_spec$subexpression$3", "oninp"], "postprocess": () => ({ onNullInput: 'call' }) },
        { "name": "func_spec$subexpression$4", "symbols": ["word"], "postprocess": kw('returns') },
        { "name": "func_spec", "symbols": ["func_spec$subexpression$4", (lexer_1.lexerAny.has("kw_null") ? { type: "kw_null" } : kw_null), "oninp"], "postprocess": () => ({ onNullInput: 'null' }) },
        { "name": "func_spec$subexpression$5", "symbols": ["word"], "postprocess": kw('strict') },
        { "name": "func_spec", "symbols": ["func_spec$subexpression$5"], "postprocess": () => ({ onNullInput: 'strict' }) },
        { "name": "func_purity", "symbols": ["word"], "postprocess": kw('immutable') },
        { "name": "func_purity", "symbols": ["word"], "postprocess": kw('stable') },
        { "name": "func_purity", "symbols": ["word"], "postprocess": kw('volatile') },
        { "name": "oninp$subexpression$1", "symbols": ["word"], "postprocess": kw('input') },
        { "name": "oninp", "symbols": [(lexer_1.lexerAny.has("kw_on") ? { type: "kw_on" } : kw_on), (lexer_1.lexerAny.has("kw_null") ? { type: "kw_null" } : kw_null), "oninp$subexpression$1"] },
        { "name": "func_returns", "symbols": ["kw_returns", "data_type"], "postprocess": last },
        { "name": "func_returns$macrocall$2", "symbols": ["func_ret_table_col"] },
        { "name": "func_returns$macrocall$1$ebnf$1", "symbols": [] },
        { "name": "func_returns$macrocall$1$ebnf$1$subexpression$1", "symbols": [(lexer_1.lexerAny.has("comma") ? { type: "comma" } : comma), "func_returns$macrocall$2"], "postprocess": last },
        { "name": "func_returns$macrocall$1$ebnf$1", "symbols": ["func_returns$macrocall$1$ebnf$1", "func_returns$macrocall$1$ebnf$1$subexpression$1"], "postprocess": (d) => d[0].concat([d[1]]) },
        { "name": "func_returns$macrocall$1", "symbols": ["func_returns$macrocall$2", "func_returns$macrocall$1$ebnf$1"], "postprocess": ([head, tail]) => {
                return [unwrap(head), ...(tail.map(unwrap) || [])];
            } },
        { "name": "func_returns", "symbols": ["kw_returns", (lexer_1.lexerAny.has("kw_table") ? { type: "kw_table" } : kw_table), "lparen", "func_returns$macrocall$1", "rparen"], "postprocess": x => (0, lexer_2.track)(x, {
                kind: 'table',
                columns: x[3],
            }) },
        { "name": "func_ret_table_col", "symbols": ["word", "data_type"], "postprocess": x => (0, lexer_2.track)(x, { name: asName(x[0]), type: x[1] }) },
        { "name": "do_stm$ebnf$1$subexpression$1", "symbols": ["kw_language", "word"], "postprocess": last },
        { "name": "do_stm$ebnf$1", "symbols": ["do_stm$ebnf$1$subexpression$1"], "postprocess": id },
        { "name": "do_stm$ebnf$1", "symbols": [], "postprocess": () => null },
        { "name": "do_stm", "symbols": [(lexer_1.lexerAny.has("kw_do") ? { type: "kw_do" } : kw_do), "do_stm$ebnf$1", (lexer_1.lexerAny.has("codeblock") ? { type: "codeblock" } : codeblock)], "postprocess": x => (0, lexer_2.track)(x, {
                type: 'do',
                ...x[1] && { language: asName(x[1]) },
                code: x[2].value,
            }) },
        { "name": "drop_func$ebnf$1$subexpression$1", "symbols": ["kw_if", "kw_exists"] },
        { "name": "drop_func$ebnf$1", "symbols": ["drop_func$ebnf$1$subexpression$1"], "postprocess": id },
        { "name": "drop_func$ebnf$1", "symbols": [], "postprocess": () => null },
        { "name": "drop_func$ebnf$2", "symbols": ["drop_func_overload"], "postprocess": id },
        { "name": "drop_func$ebnf$2", "symbols": [], "postprocess": () => null },
        { "name": "drop_func", "symbols": ["kw_drop", "kw_function", "drop_func$ebnf$1", "qname", "drop_func$ebnf$2"], "postprocess": x => (0, lexer_2.track)(x, {
                type: 'drop function',
                ...x[2] && { ifExists: true },
                name: x[3],
                ...x[4] && { arguments: x[4] },
            }) },
        { "name": "drop_func_overload$macrocall$2", "symbols": ["drop_func_overload_col"] },
        { "name": "drop_func_overload$macrocall$1$ebnf$1", "symbols": [] },
        { "name": "drop_func_overload$macrocall$1$ebnf$1$subexpression$1", "symbols": [(lexer_1.lexerAny.has("comma") ? { type: "comma" } : comma), "drop_func_overload$macrocall$2"], "postprocess": last },
        { "name": "drop_func_overload$macrocall$1$ebnf$1", "symbols": ["drop_func_overload$macrocall$1$ebnf$1", "drop_func_overload$macrocall$1$ebnf$1$subexpression$1"], "postprocess": (d) => d[0].concat([d[1]]) },
        { "name": "drop_func_overload$macrocall$1", "symbols": ["drop_func_overload$macrocall$2", "drop_func_overload$macrocall$1$ebnf$1"], "postprocess": ([head, tail]) => {
                return [unwrap(head), ...(tail.map(unwrap) || [])];
            } },
        { "name": "drop_func_overload", "symbols": ["lparen", "drop_func_overload$macrocall$1", "rparen"], "postprocess": get(1) },
        { "name": "drop_func_overload_col$ebnf$1", "symbols": ["word"], "postprocess": id },
        { "name": "drop_func_overload_col$ebnf$1", "symbols": [], "postprocess": () => null },
        { "name": "drop_func_overload_col", "symbols": ["drop_func_overload_col$ebnf$1", "qname"], "postprocess": x => (0, lexer_2.track)(x, {
                type: x[1],
                ...x[0] && { name: asName(x[0]) },
            }) },
        { "name": "main$ebnf$1", "symbols": [] },
        { "name": "main$ebnf$1", "symbols": ["main$ebnf$1", "statement_separator"], "postprocess": (d) => d[0].concat([d[1]]) },
        { "name": "main$ebnf$2", "symbols": [] },
        { "name": "main$ebnf$2$subexpression$1$ebnf$1", "symbols": ["statement_separator"] },
        { "name": "main$ebnf$2$subexpression$1$ebnf$1", "symbols": ["main$ebnf$2$subexpression$1$ebnf$1", "statement_separator"], "postprocess": (d) => d[0].concat([d[1]]) },
        { "name": "main$ebnf$2$subexpression$1", "symbols": ["main$ebnf$2$subexpression$1$ebnf$1", "statement"] },
        { "name": "main$ebnf$2", "symbols": ["main$ebnf$2", "main$ebnf$2$subexpression$1"], "postprocess": (d) => d[0].concat([d[1]]) },
        { "name": "main$ebnf$3", "symbols": [] },
        { "name": "main$ebnf$3", "symbols": ["main$ebnf$3", "statement_separator"], "postprocess": (d) => d[0].concat([d[1]]) },
        { "name": "main", "symbols": ["main$ebnf$1", "statement", "main$ebnf$2", "main$ebnf$3"], "postprocess": ([_, head, _tail]) => {
                const tail = _tail;
                const ret = [unwrap(head), ...tail.map((x) => unwrap(x[1]))];
                return ret.length === 1
                    ? ret[0]
                    : ret;
            } },
        { "name": "statement_separator", "symbols": [(lexer_1.lexerAny.has("semicolon") ? { type: "semicolon" } : semicolon)] },
        { "name": "statement", "symbols": ["statement_noprep"] },
        { "name": "statement", "symbols": ["prepare"] },
        { "name": "statement", "symbols": ["deallocate"] },
        { "name": "statement_noprep", "symbols": ["selection"] },
        { "name": "statement_noprep", "symbols": ["createtable_statement"] },
        { "name": "statement_noprep", "symbols": ["createextension_statement"] },
        { "name": "statement_noprep", "symbols": ["createindex_statement"] },
        { "name": "statement_noprep", "symbols": ["simplestatements_all"] },
        { "name": "statement_noprep", "symbols": ["insert_statement"] },
        { "name": "statement_noprep", "symbols": ["update_statement"] },
        { "name": "statement_noprep", "symbols": ["altertable_statement"] },
        { "name": "statement_noprep", "symbols": ["alterindex_statement"] },
        { "name": "statement_noprep", "symbols": ["delete_statement"] },
        { "name": "statement_noprep", "symbols": ["create_sequence_statement"] },
        { "name": "statement_noprep", "symbols": ["alter_sequence_statement"] },
        { "name": "statement_noprep", "symbols": ["drop_statement"] },
        { "name": "statement_noprep", "symbols": ["createtype_statement"] },
        { "name": "statement_noprep", "symbols": ["create_view_statements"] },
        { "name": "statement_noprep", "symbols": ["refresh_view_statements"] },
        { "name": "statement_noprep", "symbols": ["create_schema"] },
        { "name": "statement_noprep", "symbols": ["raise_statement"] },
        { "name": "statement_noprep", "symbols": ["comment_statement"] },
        { "name": "statement_noprep", "symbols": ["functions_statements"] },
        { "name": "selection", "symbols": ["select_statement"], "postprocess": unwrap },
        { "name": "selection", "symbols": ["select_values"], "postprocess": unwrap },
        { "name": "selection", "symbols": ["with_statement"], "postprocess": unwrap },
        { "name": "selection", "symbols": ["with_recursive_statement"], "postprocess": unwrap },
        { "name": "selection", "symbols": ["union_statement"], "postprocess": unwrap },
        { "name": "selection_paren", "symbols": ["lparen", "selection", "rparen"], "postprocess": get(1) }
    ],
    ParserStart: "main",
};
exports.default = grammar;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// Generated automatically by nearley, version unknown
// http://github.com/Hardmath123/nearley
// Bypasses TS6133. Allow declared but unused functions.
// @ts-ignore
function id(d) { return d[0]; }
const array_lexer_1 = __webpack_require__(12);
const get = (i) => (x) => x[i];
const last = (x) => x && x[x.length - 1];
;
;
;
;
const grammar = {
    Lexer: array_lexer_1.lexerAny,
    ParserRules: [
        { "name": "main$ebnf$1", "symbols": ["elements"], "postprocess": id },
        { "name": "main$ebnf$1", "symbols": [], "postprocess": () => null },
        { "name": "main", "symbols": [(array_lexer_1.lexerAny.has("start_list") ? { type: "start_list" } : start_list), "main$ebnf$1", (array_lexer_1.lexerAny.has("end_list") ? { type: "end_list" } : end_list)], "postprocess": x => x[1] || [] },
        { "name": "elements$ebnf$1", "symbols": [] },
        { "name": "elements$ebnf$1$subexpression$1", "symbols": [(array_lexer_1.lexerAny.has("comma") ? { type: "comma" } : comma), "elt"], "postprocess": last },
        { "name": "elements$ebnf$1", "symbols": ["elements$ebnf$1", "elements$ebnf$1$subexpression$1"], "postprocess": (d) => d[0].concat([d[1]]) },
        { "name": "elements", "symbols": ["elt", "elements$ebnf$1"], "postprocess": ([head, tail]) => {
                return [head, ...(tail || [])];
            } },
        { "name": "elt", "symbols": [(array_lexer_1.lexerAny.has("value") ? { type: "value" } : value)], "postprocess": x => x[0].value },
        { "name": "elt", "symbols": ["main"], "postprocess": x => x[0] }
    ],
    ParserStart: "main",
};
exports.default = grammar;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.lexerAny = exports.lexer = void 0;
const moo_1 = __webpack_require__(0);
// build lexer
exports.lexer = (0, moo_1.compile)({
    valueString: {
        match: /"(?:\\["\\]|[^\n"\\])*"/,
        value: x => JSON.parse(x),
        type: x => 'value',
    },
    valueRaw: {
        match: /[^\s,\{\}"](?:[^,\{\}"]*[^\s,\{\}"])?/,
        type: () => 'value',
    },
    comma: ',',
    space: { match: /[\s\t\n\v\f\r]+/, lineBreaks: true, },
    start_list: '{',
    end_list: '}',
});
exports.lexer.next = (next => () => {
    let tok;
    while ((tok = next.call(exports.lexer)) && (tok.type === 'space')) {
    }
    return tok;
})(exports.lexer.next);
exports.lexerAny = exports.lexer;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// Generated automatically by nearley, version unknown
// http://github.com/Hardmath123/nearley
// Bypasses TS6133. Allow declared but unused functions.
// @ts-ignore
function id(d) { return d[0]; }
const geometric_lexer_1 = __webpack_require__(14);
const get = (i) => (x) => x[i];
const last = (x) => x && x[x.length - 1];
function unwrap(e) {
    if (Array.isArray(e) && e.length === 1) {
        e = unwrap(e[0]);
    }
    if (Array.isArray(e) && !e.length) {
        return null;
    }
    return e;
}
;
;
;
;
const grammar = {
    Lexer: geometric_lexer_1.lexerAny,
    ParserRules: [
        { "name": "number$subexpression$1", "symbols": ["float"] },
        { "name": "number$subexpression$1", "symbols": ["int"] },
        { "name": "number", "symbols": ["number$subexpression$1"], "postprocess": unwrap },
        { "name": "float", "symbols": [(geometric_lexer_1.lexerAny.has("float") ? { type: "float" } : float)], "postprocess": args => parseFloat(unwrap(args)) },
        { "name": "int", "symbols": [(geometric_lexer_1.lexerAny.has("int") ? { type: "int" } : int)], "postprocess": arg => parseInt(unwrap(arg), 10) },
        { "name": "comma", "symbols": [(geometric_lexer_1.lexerAny.has("comma") ? { type: "comma" } : comma)], "postprocess": id },
        { "name": "point$macrocall$2", "symbols": ["point_content"] },
        { "name": "point$macrocall$1$subexpression$1", "symbols": ["point$macrocall$2"] },
        { "name": "point$macrocall$1$subexpression$1", "symbols": [(geometric_lexer_1.lexerAny.has("lparen") ? { type: "lparen" } : lparen), "point$macrocall$2", (geometric_lexer_1.lexerAny.has("rparen") ? { type: "rparen" } : rparen)], "postprocess": get(1) },
        { "name": "point$macrocall$1", "symbols": ["point$macrocall$1$subexpression$1"], "postprocess": unwrap },
        { "name": "point", "symbols": ["point$macrocall$1"], "postprocess": unwrap },
        { "name": "point_content", "symbols": ["number", "comma", "number"], "postprocess": x => ({ x: x[0], y: x[2] }) },
        { "name": "line", "symbols": [(geometric_lexer_1.lexerAny.has("lcurl") ? { type: "lcurl" } : lcurl), "number", "comma", "number", "comma", "number", (geometric_lexer_1.lexerAny.has("rcurl") ? { type: "rcurl" } : rcurl)], "postprocess": x => ({
                a: x[1],
                b: x[3],
                c: x[5],
            }) },
        { "name": "box", "symbols": ["closed_path"], "postprocess": ([x], rej) => {
                if (x.length !== 2) {
                    return rej;
                }
                return x;
            } },
        { "name": "lseg", "symbols": ["path"], "postprocess": ([x], rej) => {
                if (x.path.length !== 2) {
                    return rej;
                }
                return x.path;
            } },
        { "name": "path", "symbols": ["open_path"], "postprocess": ([path]) => ({ closed: false, path }) },
        { "name": "path", "symbols": ["closed_path"], "postprocess": ([path]) => ({ closed: true, path }) },
        { "name": "open_path$macrocall$2", "symbols": [(geometric_lexer_1.lexerAny.has("lbracket") ? { type: "lbracket" } : lbracket)] },
        { "name": "open_path$macrocall$3", "symbols": [(geometric_lexer_1.lexerAny.has("rbracket") ? { type: "rbracket" } : rbracket)] },
        { "name": "open_path$macrocall$1$macrocall$2", "symbols": ["point"] },
        { "name": "open_path$macrocall$1$macrocall$1$ebnf$1", "symbols": [] },
        { "name": "open_path$macrocall$1$macrocall$1$ebnf$1$subexpression$1", "symbols": [(geometric_lexer_1.lexerAny.has("comma") ? { type: "comma" } : comma), "open_path$macrocall$1$macrocall$2"], "postprocess": last },
        { "name": "open_path$macrocall$1$macrocall$1$ebnf$1", "symbols": ["open_path$macrocall$1$macrocall$1$ebnf$1", "open_path$macrocall$1$macrocall$1$ebnf$1$subexpression$1"], "postprocess": (d) => d[0].concat([d[1]]) },
        { "name": "open_path$macrocall$1$macrocall$1", "symbols": ["open_path$macrocall$1$macrocall$2", "open_path$macrocall$1$macrocall$1$ebnf$1"], "postprocess": ([head, tail]) => {
                return [unwrap(head), ...(tail.map(unwrap) || [])];
            } },
        { "name": "open_path$macrocall$1", "symbols": ["open_path$macrocall$2", "open_path$macrocall$1$macrocall$1", "open_path$macrocall$3"], "postprocess": get(1) },
        { "name": "open_path", "symbols": ["open_path$macrocall$1"], "postprocess": last },
        { "name": "closed_path$subexpression$1$macrocall$2", "symbols": [(geometric_lexer_1.lexerAny.has("lparen") ? { type: "lparen" } : lparen)] },
        { "name": "closed_path$subexpression$1$macrocall$3", "symbols": [(geometric_lexer_1.lexerAny.has("rparen") ? { type: "rparen" } : rparen)] },
        { "name": "closed_path$subexpression$1$macrocall$1$macrocall$2", "symbols": ["point"] },
        { "name": "closed_path$subexpression$1$macrocall$1$macrocall$1$ebnf$1", "symbols": [] },
        { "name": "closed_path$subexpression$1$macrocall$1$macrocall$1$ebnf$1$subexpression$1", "symbols": [(geometric_lexer_1.lexerAny.has("comma") ? { type: "comma" } : comma), "closed_path$subexpression$1$macrocall$1$macrocall$2"], "postprocess": last },
        { "name": "closed_path$subexpression$1$macrocall$1$macrocall$1$ebnf$1", "symbols": ["closed_path$subexpression$1$macrocall$1$macrocall$1$ebnf$1", "closed_path$subexpression$1$macrocall$1$macrocall$1$ebnf$1$subexpression$1"], "postprocess": (d) => d[0].concat([d[1]]) },
        { "name": "closed_path$subexpression$1$macrocall$1$macrocall$1", "symbols": ["closed_path$subexpression$1$macrocall$1$macrocall$2", "closed_path$subexpression$1$macrocall$1$macrocall$1$ebnf$1"], "postprocess": ([head, tail]) => {
                return [unwrap(head), ...(tail.map(unwrap) || [])];
            } },
        { "name": "closed_path$subexpression$1$macrocall$1", "symbols": ["closed_path$subexpression$1$macrocall$2", "closed_path$subexpression$1$macrocall$1$macrocall$1", "closed_path$subexpression$1$macrocall$3"], "postprocess": get(1) },
        { "name": "closed_path$subexpression$1", "symbols": ["closed_path$subexpression$1$macrocall$1"], "postprocess": last },
        { "name": "closed_path$subexpression$1$macrocall$5", "symbols": ["point"] },
        { "name": "closed_path$subexpression$1$macrocall$4$ebnf$1", "symbols": [] },
        { "name": "closed_path$subexpression$1$macrocall$4$ebnf$1$subexpression$1", "symbols": [(geometric_lexer_1.lexerAny.has("comma") ? { type: "comma" } : comma), "closed_path$subexpression$1$macrocall$5"], "postprocess": last },
        { "name": "closed_path$subexpression$1$macrocall$4$ebnf$1", "symbols": ["closed_path$subexpression$1$macrocall$4$ebnf$1", "closed_path$subexpression$1$macrocall$4$ebnf$1$subexpression$1"], "postprocess": (d) => d[0].concat([d[1]]) },
        { "name": "closed_path$subexpression$1$macrocall$4", "symbols": ["closed_path$subexpression$1$macrocall$5", "closed_path$subexpression$1$macrocall$4$ebnf$1"], "postprocess": ([head, tail]) => {
                return [unwrap(head), ...(tail.map(unwrap) || [])];
            } },
        { "name": "closed_path$subexpression$1", "symbols": ["closed_path$subexpression$1$macrocall$4"], "postprocess": last },
        { "name": "closed_path", "symbols": ["closed_path$subexpression$1"], "postprocess": get(0) },
        { "name": "polygon", "symbols": ["closed_path"], "postprocess": get(0) },
        { "name": "circle_body", "symbols": ["point", "comma", "number"], "postprocess": x => ({ c: x[0], r: x[2] }) },
        { "name": "circle$subexpression$1$macrocall$2", "symbols": [(geometric_lexer_1.lexerAny.has("lcomp") ? { type: "lcomp" } : lcomp)] },
        { "name": "circle$subexpression$1$macrocall$3", "symbols": [(geometric_lexer_1.lexerAny.has("rcomp") ? { type: "rcomp" } : rcomp)] },
        { "name": "circle$subexpression$1$macrocall$1", "symbols": ["circle$subexpression$1$macrocall$2", "circle_body", "circle$subexpression$1$macrocall$3"], "postprocess": get(1) },
        { "name": "circle$subexpression$1", "symbols": ["circle$subexpression$1$macrocall$1"] },
        { "name": "circle$subexpression$1$macrocall$5", "symbols": [(geometric_lexer_1.lexerAny.has("lparen") ? { type: "lparen" } : lparen)] },
        { "name": "circle$subexpression$1$macrocall$6", "symbols": [(geometric_lexer_1.lexerAny.has("rparen") ? { type: "rparen" } : rparen)] },
        { "name": "circle$subexpression$1$macrocall$4", "symbols": ["circle$subexpression$1$macrocall$5", "circle_body", "circle$subexpression$1$macrocall$6"], "postprocess": get(1) },
        { "name": "circle$subexpression$1", "symbols": ["circle$subexpression$1$macrocall$4"] },
        { "name": "circle$subexpression$1", "symbols": ["circle_body"] },
        { "name": "circle", "symbols": ["circle$subexpression$1"], "postprocess": unwrap }
    ],
    ParserStart: "number",
};
exports.default = grammar;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.lexerAny = exports.lexer = void 0;
const moo_1 = __webpack_require__(0);
// build lexer
exports.lexer = (0, moo_1.compile)({
    comma: ',',
    space: { match: /[\s\t\n\v\f\r]+/, lineBreaks: true, },
    int: /\-?\d+(?![\.\d])/,
    float: /\-?(?:(?:\d*\.\d+)|(?:\d+\.\d*))/,
    lcurl: '{',
    rcurl: '}',
    lparen: '(',
    rparen: ')',
    lbracket: '[',
    rbracket: ']',
    lcomp: '<',
    rcomp: '>',
});
exports.lexer.next = (next => () => {
    let tok;
    while ((tok = next.call(exports.lexer)) && (tok.type === 'space')) {
    }
    return tok;
})(exports.lexer.next);
exports.lexerAny = exports.lexer;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// Generated automatically by nearley, version unknown
// http://github.com/Hardmath123/nearley
// Bypasses TS6133. Allow declared but unused functions.
// @ts-ignore
function id(d) { return d[0]; }
const interval_lexer_1 = __webpack_require__(16);
;
;
;
;
const grammar = {
    Lexer: interval_lexer_1.lexerAny,
    ParserRules: [
        { "name": "main$ebnf$1", "symbols": ["elt"] },
        { "name": "main$ebnf$1", "symbols": ["main$ebnf$1", "elt"], "postprocess": (d) => d[0].concat([d[1]]) },
        { "name": "main", "symbols": ["main$ebnf$1"], "postprocess": ([elts]) => {
                // check unicity
                const s = new Set();
                for (const e of elts) {
                    const k = typeof e[1] === 'number'
                        ? e[0]
                        : 'time';
                    if (s.has(k)) {
                        return 'invalid';
                    }
                    s.add(k);
                }
                return elts;
            } },
        { "name": "elt", "symbols": ["time"] },
        { "name": "elt", "symbols": ["num", "unit"], "postprocess": ([[n], u]) => {
                u = u[0].type;
                return [u, n];
            } },
        { "name": "unit", "symbols": [(interval_lexer_1.lexerAny.has("years") ? { type: "years" } : years)] },
        { "name": "unit", "symbols": [(interval_lexer_1.lexerAny.has("months") ? { type: "months" } : months)] },
        { "name": "unit", "symbols": [(interval_lexer_1.lexerAny.has("days") ? { type: "days" } : days)] },
        { "name": "unit", "symbols": [(interval_lexer_1.lexerAny.has("hours") ? { type: "hours" } : hours)] },
        { "name": "unit", "symbols": [(interval_lexer_1.lexerAny.has("minutes") ? { type: "minutes" } : minutes)] },
        { "name": "unit", "symbols": [(interval_lexer_1.lexerAny.has("seconds") ? { type: "seconds" } : seconds)] },
        { "name": "unit", "symbols": [(interval_lexer_1.lexerAny.has("milliseconds") ? { type: "milliseconds" } : milliseconds)] },
        { "name": "num", "symbols": ["int"] },
        { "name": "num", "symbols": ["float"] },
        { "name": "uint", "symbols": [(interval_lexer_1.lexerAny.has("int") ? { type: "int" } : int)], "postprocess": ([x]) => parseInt(x, 10) },
        { "name": "int$ebnf$1$subexpression$1", "symbols": [(interval_lexer_1.lexerAny.has("neg") ? { type: "neg" } : neg)] },
        { "name": "int$ebnf$1", "symbols": ["int$ebnf$1$subexpression$1"], "postprocess": id },
        { "name": "int$ebnf$1", "symbols": [], "postprocess": () => null },
        { "name": "int", "symbols": ["int$ebnf$1", (interval_lexer_1.lexerAny.has("int") ? { type: "int" } : int)], "postprocess": ([neg, x]) => parseInt(x, 10) * (neg ? -1 : 1) },
        { "name": "float$ebnf$1$subexpression$1", "symbols": [(interval_lexer_1.lexerAny.has("neg") ? { type: "neg" } : neg)] },
        { "name": "float$ebnf$1", "symbols": ["float$ebnf$1$subexpression$1"], "postprocess": id },
        { "name": "float$ebnf$1", "symbols": [], "postprocess": () => null },
        { "name": "float$ebnf$2", "symbols": [(interval_lexer_1.lexerAny.has("int") ? { type: "int" } : int)], "postprocess": id },
        { "name": "float$ebnf$2", "symbols": [], "postprocess": () => null },
        { "name": "float", "symbols": ["float$ebnf$1", "float$ebnf$2", (interval_lexer_1.lexerAny.has("dot") ? { type: "dot" } : dot), (interval_lexer_1.lexerAny.has("int") ? { type: "int" } : int)], "postprocess": ([neg, ...v]) => parseFloat(v.map(v => v ? v.text : '0').join('')) * (neg ? -1 : 1) },
        { "name": "time$ebnf$1$subexpression$1", "symbols": [(interval_lexer_1.lexerAny.has("colon") ? { type: "colon" } : colon), "uint"] },
        { "name": "time$ebnf$1", "symbols": ["time$ebnf$1$subexpression$1"], "postprocess": id },
        { "name": "time$ebnf$1", "symbols": [], "postprocess": () => null },
        { "name": "time$ebnf$2$subexpression$1", "symbols": [(interval_lexer_1.lexerAny.has("dot") ? { type: "dot" } : dot), (interval_lexer_1.lexerAny.has("int") ? { type: "int" } : int)] },
        { "name": "time$ebnf$2", "symbols": ["time$ebnf$2$subexpression$1"], "postprocess": id },
        { "name": "time$ebnf$2", "symbols": [], "postprocess": () => null },
        { "name": "time", "symbols": ["uint", (interval_lexer_1.lexerAny.has("colon") ? { type: "colon" } : colon), "uint", "time$ebnf$1", "time$ebnf$2"], "postprocess": ([a, _, b, c, d]) => {
                c = c && c[1];
                d = d && d[1];
                const ret = typeof c === 'number' ? [
                    ['hours', a],
                    ['minutes', b],
                    ['seconds', c],
                ] : [
                    ['minutes', a],
                    ['seconds', b],
                ];
                if (d) {
                    ret.push(['milliseconds', parseFloat('0.' + d) * 1000]);
                }
                return ret;
            } }
    ],
    ParserStart: "main",
};
exports.default = grammar;


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.lexerAny = exports.lexer = void 0;
const moo_1 = __webpack_require__(0);
// build lexer
exports.lexer = (0, moo_1.compile)({
    int: /\d+/,
    neg: '-',
    dot: '.',
    years: /(?:y|yrs?|years?)\b/,
    months: /(?:mon(?:th)?s?)\b/,
    days: /(?:d|days?)\b/,
    hours: /(?:h|hrs?|hours?)\b/,
    minutes: /(?:m|mins?|minutes?)\b/,
    seconds: /(?:s|secs?|seconds?)\b/,
    milliseconds: /(?:ms|milliseconds?)\b/,
    space: { match: /[\s\t\n\v\f\r]+/, lineBreaks: true, },
    colon: ':',
});
exports.lexer.next = (next => () => {
    let tok;
    while ((tok = next.call(exports.lexer)) && (tok.type === 'space')) {
    }
    return tok;
})(exports.lexer.next);
exports.lexerAny = exports.lexer;


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// Generated automatically by nearley, version unknown
// http://github.com/Hardmath123/nearley
// Bypasses TS6133. Allow declared but unused functions.
// @ts-ignore
function id(d) { return d[0]; }
const interval_iso_lexer_1 = __webpack_require__(18);
;
;
;
;
const grammar = {
    Lexer: interval_iso_lexer_1.lexerAny,
    ParserRules: [
        { "name": "num", "symbols": [(interval_iso_lexer_1.lexerAny.has("int") ? { type: "int" } : int)] },
        { "name": "num", "symbols": [(interval_iso_lexer_1.lexerAny.has("float") ? { type: "float" } : float)] },
        { "name": "main$ebnf$1", "symbols": [] },
        { "name": "main$ebnf$1", "symbols": ["main$ebnf$1", "long"], "postprocess": (d) => d[0].concat([d[1]]) },
        { "name": "main$ebnf$2$subexpression$1$ebnf$1", "symbols": ["short"] },
        { "name": "main$ebnf$2$subexpression$1$ebnf$1", "symbols": ["main$ebnf$2$subexpression$1$ebnf$1", "short"], "postprocess": (d) => d[0].concat([d[1]]) },
        { "name": "main$ebnf$2$subexpression$1", "symbols": [(interval_iso_lexer_1.lexerAny.has("T") ? { type: "T" } : T), "main$ebnf$2$subexpression$1$ebnf$1"] },
        { "name": "main$ebnf$2", "symbols": ["main$ebnf$2$subexpression$1"], "postprocess": id },
        { "name": "main$ebnf$2", "symbols": [], "postprocess": () => null },
        { "name": "main", "symbols": [(interval_iso_lexer_1.lexerAny.has("P") ? { type: "P" } : P), "main$ebnf$1", "main$ebnf$2"], "postprocess": ([_, a, b], rej) => {
                b = !b ? [] : b[1];
                { }
                if (!a.length && !b.length) {
                    return rej;
                }
                return !a.length ? b
                    : !b.length ? a
                        : [...a, ...b];
            } },
        { "name": "long$subexpression$1", "symbols": [(interval_iso_lexer_1.lexerAny.has("Y") ? { type: "Y" } : Y)] },
        { "name": "long$subexpression$1", "symbols": [(interval_iso_lexer_1.lexerAny.has("M") ? { type: "M" } : M)] },
        { "name": "long$subexpression$1", "symbols": [(interval_iso_lexer_1.lexerAny.has("W") ? { type: "W" } : W)] },
        { "name": "long$subexpression$1", "symbols": [(interval_iso_lexer_1.lexerAny.has("D") ? { type: "D" } : D)] },
        { "name": "long", "symbols": ["num", "long$subexpression$1"], "postprocess": ([n, u]) => {
                n = parseFloat(n[0].value);
                u = u[0].type;
                switch (u) {
                    case 'Y':
                        return ['years', n];
                    case 'M':
                        return ['months', n];
                    case 'W':
                        return ['days', n * 7];
                    case 'D':
                        return ['days', n];
                    default:
                        throw new Error('Unexpected unit ' + u);
                }
            } },
        { "name": "short$ebnf$1", "symbols": [(interval_iso_lexer_1.lexerAny.has("T") ? { type: "T" } : T)], "postprocess": id },
        { "name": "short$ebnf$1", "symbols": [], "postprocess": () => null },
        { "name": "short$subexpression$1", "symbols": [(interval_iso_lexer_1.lexerAny.has("H") ? { type: "H" } : H)] },
        { "name": "short$subexpression$1", "symbols": [(interval_iso_lexer_1.lexerAny.has("M") ? { type: "M" } : M)] },
        { "name": "short$subexpression$1", "symbols": [(interval_iso_lexer_1.lexerAny.has("S") ? { type: "S" } : S)] },
        { "name": "short", "symbols": ["short$ebnf$1", "num", "short$subexpression$1"], "postprocess": ([_, n, u]) => {
                n = parseFloat(n[0].value);
                u = u[0].type;
                switch (u) {
                    case 'H':
                        return ['hours', n];
                    case 'M':
                        return ['minutes', n];
                    case 'S':
                        return ['seconds', n];
                    default:
                        throw new Error('Unexpected unit ' + u);
                }
            } }
    ],
    ParserStart: "num",
};
exports.default = grammar;


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.lexerAny = exports.lexer = void 0;
const moo_1 = __webpack_require__(0);
// build lexer
exports.lexer = (0, moo_1.compile)({
    int: /\-?\d+(?![\.\d])/,
    float: /\-?(?:(?:\d*\.\d+)|(?:\d+\.\d*))/,
    P: 'P',
    Y: 'Y',
    M: 'M',
    W: 'W',
    D: 'D',
    H: 'H',
    S: 'S',
    T: 'T',
});
exports.lexerAny = exports.lexer;


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.toSql = void 0;
const ast_mapper_1 = __webpack_require__(2);
const ast_visitor_1 = __webpack_require__(5);
const utils_1 = __webpack_require__(6);
const pg_escape_1 = __webpack_require__(20);
const keywords_1 = __webpack_require__(3);
const kwSet = new Set(keywords_1.sqlKeywords.map(x => x.toLowerCase()));
let ret = [];
function name(nm) {
    return ident(nm.name);
}
function ident(nm, forceDoubleQuote) {
    if (!forceDoubleQuote) {
        // only add quotes if has upper cases, or if it is a keyword.
        const low = nm.toLowerCase();
        if (low === nm && !kwSet.has(low) && /^[a-z][a-z0-9_]*$/.test(low)) {
            return nm;
        }
    }
    return '"' + nm + '"';
}
function list(elems, act, addParen) {
    if (addParen) {
        ret.push('(');
    }
    let first = true;
    for (const e of elems) {
        if (!first) {
            ret.push(', ');
        }
        first = false;
        act(e);
    }
    if (addParen) {
        ret.push(')');
    }
}
function addConstraint(c, m) {
    switch (c.type) {
        case 'foreign key':
            ret.push(' foreign key (', ...c.localColumns.map(name).join(', '), ')');
        // 👈 There is no "break" here... that's not an error, we want to fall throught the 'reference' case
        case 'reference':
            ret.push(' REFERENCES ');
            m.tableRef(c.foreignTable);
            ret.push('(', ...c.foreignColumns.map(name).join(', '), ') ');
            if (c.match) {
                ret.push(' MATCH ', c.match.toUpperCase());
            }
            if (c.onDelete) {
                ret.push(' ON DELETE ', c.onDelete);
            }
            if (c.onUpdate) {
                ret.push(' ON UPDATE ', c.onUpdate);
            }
            break;
        case 'primary key':
        case 'unique':
            ret.push(' ', c.type, ' ');
            if ('columns' in c) {
                ret.push('(', ...c.columns.map(name).join(', '), ') ');
            }
            break;
        case 'check':
            ret.push(' check ');
            m.expr(c.expr);
            break;
        case 'not null':
        case 'null':
            ret.push(' ', c.type, ' ');
            break;
        case 'default':
            ret.push(' default ');
            m.expr(c.default);
            break;
        case 'add generated':
            ret.push(' GENERATED ');
            visitGenerated(m, c);
            break;
        default:
            throw utils_1.NotSupported.never(c);
    }
    ret.push(' ');
}
function visitQualifiedName(cs, forceDoubleQuote) {
    if (cs.schema) {
        ret.push(ident(cs.schema), '.');
    }
    ret.push(ident(cs.name, forceDoubleQuote), ' ');
}
function visitQualifiedNameAliased(cs) {
    visitQualifiedName(cs);
    if (cs.alias) {
        ret.push(' AS ', ident(cs.alias), ' ');
    }
}
function visitOrderBy(m, orderBy) {
    ret.push(' ORDER BY ');
    list(orderBy, e => {
        m.expr(e.by);
        if (e.order) {
            ret.push(' ', e.order, ' ');
        }
        if (e.nulls) {
            ret.push(' NULLS ', e.nulls, ' ');
        }
    }, false);
}
function visitSetVal(set) {
    switch (set.type) {
        case 'default':
            ret.push('DEFAULT ');
            break;
        case 'identifier':
            ret.push(set.name);
            break;
        case 'list':
            let first = true;
            for (const v of set.values) {
                if (!first) {
                    ret.push(', ');
                }
                first = false;
                visitSetVal(v);
            }
            break;
        case 'value':
            ret.push(typeof set.value === 'number' ? set.value.toString() : (0, pg_escape_1.literal)(set.value));
            break;
        default:
            throw utils_1.NotSupported.never(set);
    }
}
function visitGenerated(m, alter) {
    if (alter.always) {
        ret.push(alter.always.toUpperCase(), ' ');
    }
    ret.push('AS IDENTITY ');
    if (alter.sequence) {
        ret.push('(');
        if (alter.sequence.name) {
            ret.push('SEQUENCE NAME ');
            visitQualifiedName(alter.sequence.name);
            ret.push(' ');
        }
        visitSeqOpts(m, alter.sequence);
        ret.push(') ');
    }
}
function visitSeqOpts(m, cs) {
    if (cs.as) {
        ret.push('AS ');
        m.dataType(cs.as);
        ret.push(' ');
    }
    if (typeof cs.incrementBy === 'number') {
        ret.push('INCREMENT BY ', cs.incrementBy.toString(), ' ');
    }
    if (cs.minValue === 'no minvalue') {
        ret.push('NO MINVALUE ');
    }
    if (typeof cs.minValue === 'number') {
        ret.push('MINVALUE ', cs.minValue.toString(), ' ');
    }
    if (cs.maxValue === 'no maxvalue') {
        ret.push('NO MAXVALUE ');
    }
    if (typeof cs.maxValue === 'number') {
        ret.push('MAXVALUE ', cs.maxValue.toString(), ' ');
    }
    if (typeof cs.startWith === 'number') {
        ret.push('START WITH ', cs.startWith.toString(), ' ');
    }
    if (typeof cs.cache === 'number') {
        ret.push('CACHE ', cs.cache.toString(), ' ');
    }
    if (cs.cycle) {
        ret.push(cs.cycle, ' ');
    }
    if (cs.ownedBy === 'none') {
        ret.push('OWNED BY NONE ');
    }
    else if (cs.ownedBy) {
        ret.push('OWNED BY ');
        visitQColumn(cs.ownedBy);
    }
    if ('restart' in cs) {
        if (cs.restart === true) {
            ret.push('RESTART ');
        }
        else if (cs.restart) {
            ret.push('RESTART WITH ', cs.restart.toString(), ' ');
        }
    }
}
function visitQColumn(col) {
    if (col.schema) {
        ret.push(ident(col.schema), '.');
    }
    ret.push(ident(col.table), '.', ident(col.column), ' ');
}
function join(m, j, tbl) {
    if (!j) {
        tbl();
        return;
    }
    ret.push(j.type, ' ');
    tbl();
    if (j.on) {
        ret.push('ON ');
        m.expr(j.on);
    }
    if (j.using) {
        ret.push('USING (');
        list(j.using, x => ret.push(name(x)), false);
        ret.push(') ');
    }
    ret.push(' ');
}
function visitOp(v) {
    if (v.opSchema) {
        ret.push(' operator(', ident(v.opSchema), '.', v.op, ') ');
    }
    else {
        ret.push(' ', v.op, ' ');
    }
}
const visitor = (0, ast_visitor_1.astVisitor)(m => ({
    addColumn: (...args) => {
        ret.push(' ADD COLUMN ');
        if (args[0].ifNotExists) {
            ret.push('IF NOT EXISTS ');
        }
        m.super().addColumn(...args);
    },
    createExtension: e => {
        ret.push('CREATE EXTENSION ');
        if (e.ifNotExists) {
            ret.push(' IF NOT EXISTS ');
        }
        ret.push(name(e.extension));
        if (!e.from && !e.version && !e.schema) {
            return;
        }
        ret.push(' WITH');
        if (e.schema) {
            ret.push(' SCHEMA ', name(e.schema));
        }
        if (e.version) {
            ret.push(' VERSION ', (0, pg_escape_1.literal)(e.version.value));
        }
        if (e.from) {
            ret.push(' FROM ', (0, pg_escape_1.literal)(e.from.value));
        }
    },
    tablespace: t => {
        ret.push('TABLESPACE ', name(t.tablespace));
    },
    addConstraint: c => {
        ret.push(' ADD ');
        const cname = c.constraint.constraintName;
        if (cname) {
            ret.push(' CONSTRAINT ', name(cname), ' ');
        }
        addConstraint(c.constraint, m);
    },
    alterColumn: (c, t) => {
        ret.push(' ALTER COLUMN ', name(c.column), ' ');
        m.super().alterColumn(c, t);
    },
    setColumnDefault: (a, t, c) => {
        ret.push(' SET DEFAULT ');
        m.expr(a.default);
        if (a.updateExisting) {
            throw new Error('Not implemented: updateExisting on set column default');
        }
    },
    createEnum: t => {
        ret.push('CREATE TYPE ');
        visitQualifiedName(t.name);
        ret.push(' AS ENUM ');
        list(t.values, x => ret.push((0, pg_escape_1.literal)(x.value)), true);
        ret.push(' ');
    },
    createCompositeType: c => {
        ret.push('CREATE TYPE ');
        visitQualifiedName(c.name);
        ret.push(' AS ');
        list(c.attributes, x => {
            ret.push(name(x.name), ' ');
            m.dataType(x.dataType);
            if (x.collate) {
                ret.push('COLLATE ');
                visitQualifiedName(x.collate);
            }
        }, true);
        ret.push(' ');
    },
    setTableOwner: o => {
        ret.push(' OWNER TO ', name(o.to));
    },
    alterColumnSimple: c => ret.push(c.type),
    alterColumnAddGenerated: (alter) => {
        ret.push(' ADD GENERATED ');
        visitGenerated(m, alter);
    },
    setColumnType: t => {
        ret.push(' SET DATA TYPE ');
        m.dataType(t.dataType);
        ret.push(' ');
    },
    alterTable: t => {
        ret.push('ALTER TABLE ');
        if (t.ifExists) {
            ret.push(' IF EXISTS ');
        }
        if (t.only) {
            ret.push(' ONLY ');
        }
        visitQualifiedNameAliased(t.table);
        list(t.changes, change => m.tableAlteration(change, t.table), false);
    },
    alterIndex: t => {
        ret.push('ALTER INDEX ');
        if (t.ifExists) {
            ret.push(' IF EXISTS ');
        }
        visitQualifiedNameAliased(t.index);
        switch (t.change.type) {
            case 'rename':
                ret.push(' RENAME TO ');
                visitQualifiedName(t.change.to);
                ret.push(' ');
                break;
            case 'set tablespace':
                ret.push(' SET TABLESPACE ');
                visitQualifiedName(t.change.tablespace);
                ret.push(' ');
                break;
            default:
                throw utils_1.NotSupported.never(t.change, 'Alter index type not supported: ');
        }
    },
    tableAlteration: (change, table) => {
        switch (change.type) {
            case 'add column':
                return m.addColumn(change, table);
            case 'add constraint':
                return m.addConstraint(change, table);
            case 'alter column':
                return m.alterColumn(change, table);
            case 'rename':
                return m.renameTable(change, table);
            case 'rename column':
                return m.renameColumn(change, table);
            case 'rename constraint':
                return m.renameConstraint(change, table);
            case 'drop column':
                return m.dropColumn(change, table);
            case 'drop constraint':
                return m.dropConstraint(change, table);
            case 'owner':
                return m.setTableOwner(change, table);
            default:
                throw utils_1.NotSupported.never(change);
        }
    },
    array: v => {
        ret.push(v.type === 'array' ? 'ARRAY[' : '(');
        list(v.expressions, e => m.expr(e), false);
        ret.push(v.type === 'array' ? ']' : ')');
    },
    arrayIndex: v => {
        m.expr(v.array);
        ret.push('[');
        m.expr(v.index);
        ret.push('] ');
    },
    expr: e => {
        if (e.type === 'ref') {
            m.ref(e);
            return;
        }
        // lists can become incorrect with an additional set of parentheses
        if (e.type === 'list') {
            m.super().expr(e);
            return;
        }
        // this forces to respect precedence
        // (however, it will introduce lots of unecessary parenthesis)
        ret.push('(');
        m.super().expr(e);
        ret.push(')');
    },
    callOverlay: o => {
        ret.push('OVERLAY(');
        m.expr(o.value);
        ret.push(' PLACING ');
        m.expr(o.placing);
        ret.push(' FROM ');
        m.expr(o.from);
        if (o.for) {
            ret.push(' FOR ');
            m.expr(o.for);
        }
        ret.push(')');
    },
    callSubstring: s => {
        ret.push('SUBSTRING(');
        m.expr(s.value);
        if (s.from) {
            ret.push(' FROM ');
            m.expr(s.from);
        }
        if (s.for) {
            ret.push(' FOR ');
            m.expr(s.for);
        }
        ret.push(')');
    },
    binary: v => {
        m.expr(v.left);
        visitOp(v);
        m.expr(v.right);
    },
    call: v => {
        visitQualifiedName(v.function);
        ret.push('(');
        if (v.distinct) {
            ret.push(v.distinct, ' ');
        }
        list(v.args, e => m.expr(e), false);
        if (v.orderBy) {
            visitOrderBy(m, v.orderBy);
        }
        ret.push(') ');
        if (v.filter) {
            ret.push('filter (where ');
            m.expr(v.filter);
            ret.push(') ');
        }
        if (v.over) {
            ret.push('over (');
            if (v.over.partitionBy) {
                ret.push('PARTITION BY ');
                list(v.over.partitionBy, x => m.expr(x), false);
                ret.push(' ');
            }
            if (v.over.orderBy) {
                visitOrderBy(m, v.over.orderBy);
                ret.push(' ');
            }
            ret.push(') ');
        }
    },
    case: c => {
        ret.push('CASE ');
        if (c.value) {
            m.expr(c.value);
        }
        for (const e of c.whens) {
            ret.push(' WHEN ');
            m.expr(e.when);
            ret.push(' THEN ');
            m.expr(e.value);
        }
        if (c.else) {
            ret.push(' ELSE ');
            m.expr(c.else);
        }
        ret.push(' END ');
    },
    cast: c => {
        m.expr(c.operand);
        ret.push('::');
        m.dataType(c.to);
    },
    constant: c => {
        switch (c.type) {
            case 'boolean':
                ret.push(c.value ? 'true' : 'false');
                break;
            case 'integer':
                ret.push(c.value.toString(10));
                break;
            case 'numeric':
                ret.push(c.value.toString());
                if (Number.isInteger(c.value)) {
                    ret.push('.');
                }
                break;
            case 'null':
                ret.push('null');
                break;
            case 'constant':
                break;
            case 'string':
                ret.push((0, pg_escape_1.literal)(c.value));
                break;
            default:
                throw utils_1.NotSupported.never(c);
        }
    },
    valueKeyword: v => {
        ret.push(v.keyword, ' ');
    },
    comment: c => {
        ret.push('COMMENT ON ', c.on.type.toUpperCase(), ' ');
        switch (c.on.type) {
            case 'column':
                visitQColumn(c.on.column);
                break;
            default:
                visitQualifiedName(c.on.name);
                break;
        }
        ret.push(' IS ', (0, pg_escape_1.literal)(c.comment), ' ');
    },
    extract: v => {
        ret.push('EXTRACT (', v.field.name.toUpperCase(), ' FROM ');
        m.expr(v.from);
        ret.push(') ');
    },
    createColumn: c => {
        var _a;
        ret.push(name(c.name), ' ');
        m.dataType(c.dataType);
        ret.push(' ');
        if (c.collate) {
            ret.push('COLLATE ');
            visitQualifiedName(c.collate);
        }
        for (const cst of (_a = c.constraints) !== null && _a !== void 0 ? _a : []) {
            m.constraint(cst);
        }
    },
    begin: beg => {
        ret.push('BEGIN ');
        if (beg.isolationLevel) {
            ret.push('ISOLATION LEVEL ', beg.isolationLevel.toUpperCase(), ' ');
        }
        if (beg.writeable) {
            ret.push(beg.writeable.toUpperCase(), ' ');
        }
        if (typeof beg.deferrable === 'boolean') {
            if (!beg.deferrable) {
                ret.push('NOT ');
            }
            ret.push('DEFERRABLE ');
        }
    },
    alterSequence: cs => {
        ret.push('ALTER SEQUENCE ');
        if (cs.ifExists) {
            ret.push('IF EXISTS ');
        }
        visitQualifiedName(cs.name);
        switch (cs.change.type) {
            case 'set options':
                visitSeqOpts(m, cs.change);
                break;
            case 'rename':
                ret.push('RENAME TO ', name(cs.change.newName), ' ');
                break;
            case 'set schema':
                ret.push('SET SCHEMA ', name(cs.change.newSchema), ' ');
                break;
            case 'owner to':
                const own = cs.change.owner;
                ret.push('OWNER TO ', name(cs.change.owner), ' ');
                break;
            default:
                throw utils_1.NotSupported.never(cs.change);
        }
    },
    createSequence: cs => {
        ret.push('CREATE ');
        if (cs.temp) {
            ret.push('TEMPORARY ');
        }
        ret.push('SEQUENCE ');
        if (cs.ifNotExists) {
            ret.push('IF NOT EXISTS ');
        }
        visitQualifiedName(cs.name);
        visitSeqOpts(m, cs.options);
    },
    drop: val => {
        ret.push(val.type.toUpperCase(), ' ');
        if (val.concurrently) {
            ret.push('CONCURRENTLY ');
        }
        if (val.ifExists) {
            ret.push('IF EXISTS ');
        }
        list(val.names, x => m.tableRef(x), false);
        if (val.cascade) {
            ret.push(val.cascade.toUpperCase(), ' ');
        }
    },
    constraint: cst => {
        if (cst.constraintName) {
            ret.push(' CONSTRAINT ', name(cst.constraintName), ' ');
        }
        addConstraint(cst, m);
    },
    do: d => {
        ret.push('DO');
        if (d.language) {
            ret.push(' LANGUAGE ', d.language.name);
        }
        ret.push(' $$', d.code, '$$');
    },
    createFunction: c => {
        var _a;
        ret.push(c.orReplace ? 'CREATE OR REPLACE FUNCTION ' : 'CREATE FUNCTION ');
        visitQualifiedName(c.name);
        // args
        list(c.arguments, a => {
            if (a.mode) {
                ret.push(a.mode, ' ');
            }
            if (a.name) {
                ret.push(name(a.name), ' ');
            }
            m.dataType(a.type);
            if (a.default) {
                ret.push(" = ");
                m.expr(a.default);
            }
        }, true);
        // ret type
        if (c.returns) {
            switch (c.returns.kind) {
                case 'table':
                    ret.push(' RETURNS TABLE ');
                    list(c.returns.columns, t => {
                        ret.push(name(t.name), ' ');
                        m.dataType(t.type);
                    }, true);
                    break;
                case undefined:
                case null:
                case 'array':
                    ret.push(' RETURNS ');
                    m.dataType(c.returns);
                    break;
                default:
                    throw utils_1.NotSupported.never(c.returns);
            }
        }
        ret.push(' AS $$', (_a = c.code) !== null && _a !== void 0 ? _a : '', '$$');
        // function settings
        if (c.language) {
            ret.push('LANGUAGE ', c.language.name, ' ');
        }
        if (c.purity) {
            ret.push(c.purity.toUpperCase(), ' ');
        }
        if (typeof c.leakproof === 'boolean') {
            ret.push(c.leakproof ? 'LEAKPROOF ' : 'NOT LEAKPROOF ');
        }
        switch (c.onNullInput) {
            case 'call':
                ret.push('CALLED ON NULL INPUT ');
                break;
            case 'null':
                ret.push('RETURNS NULL ON NULL INPUT ');
                break;
            case 'strict':
                ret.push('STRICT ');
                break;
            case null:
            case undefined:
                break;
            default:
                throw utils_1.NotSupported.never(c.onNullInput);
        }
    },
    dropFunction: d => {
        ret.push('DROP FUNCTION ');
        if (d.ifExists) {
            ret.push('IF EXISTS ');
        }
        visitQualifiedName(d.name);
        if (d.arguments) {
            list(d.arguments, a => {
                if (a.name) {
                    visitQualifiedName(a.name);
                    ret.push(' ');
                }
                m.dataType(a.type);
            }, true);
        }
        ret.push(' ');
    },
    with: w => {
        ret.push('WITH ');
        list(w.bind, b => {
            ret.push(name(b.alias), ' AS (');
            m.statement(b.statement);
            ret.push(') ');
        }, false);
        m.statement(w.in);
    },
    withRecursive: val => {
        ret.push('WITH RECURSIVE ', name(val.alias), '(', ...val.columnNames.map(name).join(', '), ') AS (');
        m.union(val.bind);
        ret.push(') ');
        m.statement(val.in);
    },
    setGlobal: g => {
        ret.push('SET ', name(g.variable), ' = ');
        visitSetVal(g.set);
    },
    setTimezone: g => {
        ret.push('SET TIME ZONE ');
        switch (g.to.type) {
            case 'default':
            case 'local':
                ret.push(g.to.type.toUpperCase(), ' ');
                break;
            case 'value':
                ret.push(typeof g.to.value === 'string'
                    ? (0, pg_escape_1.literal)(g.to.value)
                    : g.to.value.toString(10));
                break;
            case 'interval':
                ret.push('INTERVAL ', (0, pg_escape_1.literal)(g.to.value), ' HOUR TO MINUTE');
                break;
            default:
                throw utils_1.NotSupported.never(g.to);
        }
    },
    dataType: d => {
        var _a, _b;
        if ((d === null || d === void 0 ? void 0 : d.kind) === 'array') {
            m.dataType(d.arrayOf);
            ret.push('[]');
            return;
        }
        if (!(d === null || d === void 0 ? void 0 : d.name)) {
            ret.push('unkown');
            return;
        }
        let appendConfig = true;
        if (d.schema) {
            visitQualifiedName(d, d.doubleQuoted);
        }
        else {
            // see https://www.postgresql.org/docs/13/datatype.html
            // & issue https://github.com/oguimbal/pgsql-ast-parser/issues/38
            if (d.doubleQuoted) {
                visitQualifiedName(d, true);
            }
            else {
                switch (d.name) {
                    case 'double precision':
                    case 'character varying':
                    case 'bit varying':
                        ret.push(d.name, ' ');
                        break;
                    case 'time without time zone':
                    case 'timestamp without time zone':
                    case 'time with time zone':
                    case 'timestamp with time zone':
                        const parts = d.name.split(' ');
                        ret.push(parts.shift());
                        if ((_a = d.config) === null || _a === void 0 ? void 0 : _a.length) {
                            list(d.config, v => ret.push(v.toString(10)), true);
                        }
                        ret.push(' ');
                        ret.push(parts.join(' '), ' ');
                        appendConfig = false;
                        break;
                    default:
                        visitQualifiedName(d);
                        break;
                }
            }
        }
        if (appendConfig && ((_b = d.config) === null || _b === void 0 ? void 0 : _b.length)) {
            list(d.config, v => ret.push(v.toString(10)), true);
        }
    },
    createIndex: c => {
        ret.push(c.unique ? 'CREATE UNIQUE INDEX ' : 'CREATE INDEX ');
        if (c.ifNotExists) {
            ret.push(' IF NOT EXISTS ');
        }
        if (c.indexName) {
            ret.push(name(c.indexName), ' ');
        }
        ret.push('ON ');
        m.tableRef(c.table);
        if (c.using) {
            ret.push('USING ', name(c.using), ' ');
        }
        list(c.expressions, e => {
            m.expr(e.expression);
            ret.push(' ');
            if (e.collate) {
                ret.push('COLLATE ');
                visitQualifiedName(e.collate);
            }
            if (e.opclass) {
                visitQualifiedName(e.opclass);
            }
            if (e.order) {
                ret.push(e.order, ' ');
            }
            if (e.nulls) {
                ret.push('nulls ', e.nulls, ' ');
            }
        }, true);
        if (c.with) {
            ret.push('WITH ');
            list(c.with, w => {
                ret.push(w.parameter, ' = ', (0, pg_escape_1.literal)(w.value));
            }, true);
        }
        if (c.tablespace) {
            ret.push('TABLESPACE ', ident(c.tablespace));
        }
        if (c.where) {
            ret.push(' WHERE ');
            m.expr(c.where);
        }
        ret.push(' ');
    },
    createTable: t => {
        var _a;
        ret.push('CREATE ');
        if (t.locality) {
            ret.push(t.locality.toUpperCase(), ' ');
        }
        if (t.temporary) {
            ret.push('TEMPORARY ');
        }
        if (t.unlogged) {
            ret.push('UNLOGGED ');
        }
        ret.push(t.ifNotExists ? 'TABLE IF NOT EXISTS ' : 'TABLE ');
        m.tableRef(t.name);
        ret.push('(');
        list(t.columns, c => {
            switch (c.kind) {
                case 'column':
                    return m.createColumn(c);
                case 'like table':
                    return m.likeTable(c);
                default:
                    throw utils_1.NotSupported.never(c);
            }
        }, false);
        if (t.constraints) {
            ret.push(', ');
            list(t.constraints, c => {
                const cname = c.constraintName;
                if (cname) {
                    ret.push('CONSTRAINT ', name(cname), ' ');
                }
                addConstraint(c, m);
            }, false);
        }
        ret.push(') ');
        if ((_a = t.inherits) === null || _a === void 0 ? void 0 : _a.length) {
            ret.push(' INHERITS ');
            list(t.inherits, i => visitQualifiedName(i), true);
        }
    },
    likeTable: l => {
        ret.push(' LIKE ');
        m.tableRef(l.like);
        ret.push(' ');
        for (const { verb, option } of l.options) {
            ret.push(verb.toUpperCase(), ' ', option.toUpperCase(), ' ');
        }
    },
    createSchema: s => {
        ret.push(s.ifNotExists ? 'CREATE SCHEMA IF NOT EXISTS ' : 'CREATE SCHEMA ');
        ret.push(name(s.name));
    },
    truncateTable: t => {
        ret.push('TRUNCATE TABLE ');
        let first = true;
        for (const tbl of t.tables) {
            if (!first) {
                ret.push(', ');
            }
            first = false;
            m.tableRef(tbl);
        }
        if (t.identity) {
            switch (t.identity) {
                case 'restart':
                    ret.push(' RESTART IDENTITY ');
                    break;
                case 'continue':
                    ret.push(' CONTINUE IDENTITY ');
                    break;
            }
        }
        if (t.cascade) {
            ret.push(' ', t.cascade, ' ');
        }
    },
    delete: t => {
        ret.push('DELETE FROM ');
        m.tableRef(t.from);
        if (t.where) {
            ret.push(' WHERE ');
            m.expr(t.where);
        }
        if (t.returning) {
            ret.push(' RETURNING ');
            list(t.returning, r => m.selectionColumn(r), false);
        }
        ret.push(' ');
    },
    dropColumn: t => {
        ret.push(' DROP COLUMN ');
        if (t.ifExists) {
            ret.push(' IF EXISTS ');
        }
        ret.push(name(t.column));
        if (t.behaviour) {
            ret.push(' ', t.behaviour);
        }
        ret.push(' ');
    },
    dropConstraint: t => {
        ret.push(' DROP CONSTRAINT ');
        if (t.ifExists) {
            ret.push(' IF EXISTS ');
        }
        ret.push(name(t.constraint));
        if (t.behaviour) {
            ret.push(' ', t.behaviour.toUpperCase(), ' ');
        }
    },
    from: t => m.super().from(t),
    fromCall: s => {
        join(m, s.join, () => {
            var _a, _b;
            m.call(s);
            if (s.withOrdinality) {
                ret.push(' WITH ORDINALITY');
            }
            if (s.alias) {
                ret.push(' AS ', name(s.alias), ' ');
                const len = (_b = (_a = s.alias.columns) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0;
                if (len > 0) {
                    ret.push('(');
                    for (let ix = 0; ix < len; ++ix) {
                        if (ix !== 0) {
                            ret.push(', ');
                        }
                        ret.push(name(s.alias.columns[ix]));
                    }
                    ret.push(')');
                }
            }
        });
        ret.push(' ');
    },
    fromStatement: s => {
        // todo: use 's.db' if defined
        join(m, s.join, () => {
            ret.push('(');
            m.select(s.statement);
            ret.push(') ');
            if (s.alias) {
                ret.push(' AS ', ident(s.alias));
                if (s.columnNames) {
                    list(s.columnNames, c => ret.push(name(c)), true);
                }
                ret.push(' ');
            }
        });
        ret.push(' ');
    },
    values: s => {
        ret.push('VALUES ');
        list(s.values, vlist => {
            list(vlist, e => {
                m.expr(e);
            }, true);
        }, false);
    },
    fromTable: s => {
        join(m, s.join, () => {
            m.tableRef(s.name);
            if (s.name.columnNames) {
                if (!s.name.alias) {
                    throw new Error('Cannot specify aliased column names without an alias');
                }
                list(s.name.columnNames, c => ret.push(name(c)), true);
            }
        });
    },
    join: j => {
        throw new Error('Should not happen 💀');
    },
    insert: i => {
        ret.push('INSERT INTO ');
        m.tableRef(i.into);
        if (i.columns) {
            ret.push('(', i.columns.map(name).join(', '), ')');
        }
        ret.push(' ');
        if (i.overriding) {
            ret.push('OVERRIDING ', i.overriding.toUpperCase(), ' VALUE ');
        }
        m.select(i.insert);
        ret.push(' ');
        if (i.onConflict) {
            ret.push('ON CONFLICT ');
            const on = i.onConflict.on;
            switch (on === null || on === void 0 ? void 0 : on.type) {
                case 'on expr':
                    list(on.exprs, e => m.expr(e), true);
                    break;
                case 'on constraint':
                    ret.push('ON CONSTRAINT ');
                    visitQualifiedName(on.constraint);
                case null:
                case undefined:
                    break;
                default:
                    throw utils_1.NotSupported.never(on);
            }
            if (i.onConflict.do === 'do nothing') {
                ret.push(' DO NOTHING');
            }
            else {
                ret.push(' DO UPDATE SET ');
                list(i.onConflict.do.sets, s => m.set(s), false);
                if (i.onConflict.where) {
                    ret.push(' WHERE ');
                    m.expr(i.onConflict.where);
                }
            }
            ret.push(' ');
        }
        if (i.returning) {
            ret.push(' RETURNING ');
            list(i.returning, r => m.selectionColumn(r), false);
        }
    },
    raise: r => {
        var _a, _b;
        ret.push('RAISE ');
        if (r.level) {
            ret.push(r.level.toUpperCase(), ' ');
        }
        ret.push((0, pg_escape_1.literal)(r.format), ' ');
        if ((_a = r.formatExprs) === null || _a === void 0 ? void 0 : _a.length) {
            ret.push(', ');
            list(r.formatExprs, e => m.expr(e), false);
        }
        if ((_b = r.using) === null || _b === void 0 ? void 0 : _b.length) {
            ret.push(' USING ');
            list(r.using, ({ type, value }) => {
                ret.push(type.toUpperCase(), '=');
                m.expr(value);
            }, false);
        }
        ret.push(' ');
    },
    default: () => {
        ret.push(' DEFAULT ');
    },
    member: e => {
        m.expr(e.operand);
        ret.push(e.op);
        ret.push(typeof e.member === 'number'
            ? e.member.toString(10)
            : (0, pg_escape_1.literal)(e.member));
    },
    ref: r => {
        if (r.table) {
            visitQualifiedName(r.table);
            ret.push('.');
        }
        ret.push(r.name === '*' ? '*' : ident(r.name));
    },
    parameter: p => {
        ret.push(p.name);
    },
    renameColumn: r => {
        ret.push(' RENAME COLUMN ', name(r.column), ' TO ', name(r.to));
    },
    renameConstraint: r => {
        ret.push(' RENAME CONSTRAINT ', name(r.constraint), ' TO ', name(r.to));
    },
    renameTable: r => {
        ret.push(' RENAME TO ', name(r.to));
    },
    createView: c => {
        ret.push('CREATE ');
        if (c.orReplace) {
            ret.push('OR REPLACE ');
        }
        if (c.temp) {
            ret.push('TEMP ');
        }
        if (c.recursive) {
            ret.push('RECURSIVE ');
        }
        ret.push('VIEW ');
        m.tableRef(c.name);
        if (c.columnNames) {
            list(c.columnNames, c => ret.push(name(c)), true);
        }
        const opts = c.parameters && Object.entries(c.parameters);
        if (opts === null || opts === void 0 ? void 0 : opts.length) {
            ret.push(' WITH ');
            list(opts, ([k, v]) => ret.push(k, '=', v), false);
        }
        ret.push(' AS ');
        m.select(c.query);
        if (c.checkOption) {
            ret.push(' WITH ', c.checkOption.toUpperCase(), ' CHECK OPTION');
        }
    },
    createMaterializedView: c => {
        ret.push('CREATE MATERIALIZED VIEW ');
        if (c.ifNotExists) {
            ret.push('IF NOT EXISTS ');
        }
        m.tableRef(c.name);
        if (c.columnNames) {
            list(c.columnNames, c => ret.push(name(c)), true);
        }
        const opts = c.parameters && Object.entries(c.parameters);
        if (opts === null || opts === void 0 ? void 0 : opts.length) {
            ret.push(' WITH ');
            list(opts, ([k, v]) => ret.push(k, '=', v), false);
        }
        if (c.tablespace) {
            ret.push(' TABLESPACE ', name(c.tablespace));
        }
        ret.push(' AS ');
        m.select(c.query);
        if (typeof c.withData === 'boolean') {
            ret.push(c.withData ? ' WITH DATA' : ' WITH NO DATA');
        }
    },
    refreshMaterializedView: val => {
        ret.push('REFRESH MATERIALIZED VIEW ');
        if (val.concurrently) {
            ret.push('CONCURRENTLY ');
        }
        m.tableRef(val.name);
        if (typeof val.withData === 'boolean') {
            ret.push(val.withData ? ' WITH DATA' : ' WITH NO DATA');
        }
    },
    select: s => m.super().select(s),
    selection: s => {
        ret.push('SELECT ');
        if (s.distinct) {
            if (typeof s.distinct === 'string') {
                ret.push(s.distinct.toUpperCase());
            }
            else {
                ret.push(' DISTINCT ON ');
                list(s.distinct, v => m.expr(v), true);
            }
            ret.push(' ');
        }
        if (s.columns) {
            list(s.columns, c => m.selectionColumn(c), false);
        }
        ret.push(' ');
        if (s.from) {
            ret.push('FROM ');
            const tblCnt = s.from.length;
            for (let i = 0; i < tblCnt; i++) {
                const f = s.from[i];
                if (i > 0 && !f.join) {
                    // implicit cross join (https://www.postgresql.org/docs/9.5/sql-select.html#SQL-FROM)
                    ret.push(',');
                }
                m.from(f);
            }
            ret.push(' ');
        }
        if (s.where) {
            ret.push('WHERE ');
            m.expr(s.where);
            ret.push(' ');
        }
        if (s.groupBy) {
            ret.push('GROUP BY ');
            list(s.groupBy, e => m.expr(e), false);
            ret.push(' ');
        }
        if (s.orderBy) {
            visitOrderBy(m, s.orderBy);
            ret.push(' ');
        }
        if (s.limit) {
            if (s.limit.limit) {
                ret.push(`LIMIT `);
                m.expr(s.limit.limit);
                ret.push(' ');
            }
            if (s.limit.offset) {
                ret.push(`OFFSET `);
                m.expr(s.limit.offset);
                ret.push(' ');
            }
        }
        if (s.for) {
            ret.push('FOR ', s.for.type.toUpperCase());
        }
    },
    show: s => {
        ret.push('SHOW ', name(s.variable));
    },
    prepare: s => {
        var _a;
        ret.push('PREPARE ', name(s.name));
        if ((_a = s.args) === null || _a === void 0 ? void 0 : _a.length) {
            list(s.args, a => m.dataType(a), true);
        }
        ret.push(' AS ');
        m.statement(s.statement);
    },
    deallocate: s => {
        ret.push('DEALLOCATE ');
        if ('name' in s.target) {
            ret.push(s.target.name);
            return;
        }
        ret.push('ALL');
    },
    arraySelect: s => {
        ret.push('array(');
        m.select(s.select);
        ret.push(')');
    },
    union: s => {
        ret.push('(');
        m.statement(s.left);
        ret.push(') ', s.type.toUpperCase(), ' ');
        if (s.right.type === 'union' || s.right.type === 'union all') {
            m.union(s.right);
        }
        else {
            ret.push('(');
            m.statement(s.right);
            ret.push(')');
        }
    },
    selectionColumn: c => {
        m.expr(c.expr);
        if (c.alias) {
            ret.push(' AS ', name(c.alias));
        }
        ret.push(' ');
    },
    set: s => {
        ret.push(name(s.column), ' = ');
        m.expr(s.value);
        ret.push(' ');
    },
    statement: s => m.super().statement(s),
    tableRef: r => {
        visitQualifiedName(r);
        if (r.alias) {
            ret.push(' AS ', ident(r.alias));
        }
        ret.push(' ');
    },
    ternary: t => {
        m.expr(t.value);
        ret.push(' ', t.op, ' ');
        m.expr(t.lo);
        ret.push(' AND ');
        m.expr(t.hi);
        ret.push(' ');
    },
    transaction: t => {
        ret.push(t.type);
    },
    unary: t => {
        switch (t.op) {
            case '+':
            case '-':
                // prefix ops
                visitOp(t);
                m.expr(t.operand);
                break;
            case 'NOT':
                // prefix ops
                ret.push(t.op);
                ret.push(' ');
                m.expr(t.operand);
                break;
            default:
                // postfix ops
                m.expr(t.operand);
                ret.push(' ');
                ret.push(t.op);
        }
    },
    update: u => {
        ret.push('UPDATE ');
        m.tableRef(u.table);
        ret.push(' SET ');
        list(u.sets, s => m.set(s), false);
        ret.push(' ');
        if (u.from) {
            ret.push('FROM ');
            m.from(u.from);
            ret.push(' ');
        }
        if (u.where) {
            ret.push('WHERE ');
            m.expr(u.where);
            ret.push(' ');
        }
        if (u.returning) {
            ret.push(' RETURNING ');
            list(u.returning, r => m.selectionColumn(r), false);
            ret.push(' ');
        }
    },
}));
exports.toSql = {};
const proto = ast_mapper_1.AstDefaultMapper.prototype;
for (const k of Object.getOwnPropertyNames(proto)) {
    const orig = proto[k];
    if (k === 'constructor' || k === 'super' || typeof orig !== 'function') {
        continue;
    }
    exports.toSql[k] = function (...args) {
        try {
            visitor[k].apply(visitor, args);
            return ret.join('').trim();
        }
        finally {
            ret = [];
        }
    };
}


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// stolen from https://github.com/segmentio/pg-escape/blob/master/index.js
Object.defineProperty(exports, "__esModule", { value: true });
exports.literal = void 0;
function literal(val) {
    if (null == val)
        return 'NULL';
    if (Array.isArray(val)) {
        var vals = val.map(literal);
        return "(" + vals.join(", ") + ")";
    }
    var backslash = ~val.indexOf('\\');
    var prefix = backslash ? 'E' : '';
    val = val.replace(/'/g, "''");
    val = val.replace(/\\/g, '\\\\');
    return prefix + "'" + val + "'";
}
exports.literal = literal;
;


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.locationOf = void 0;
function locationOf(node) {
    const n = node._location;
    if (!n) {
        throw new Error('This statement has not been parsed using location tracking (which has a small performance hit). ');
    }
    return n;
}
exports.locationOf = locationOf;
;
;


/***/ })
/******/ ])));
//# sourceMappingURL=index.js.map