/*
 * spraypaint.js
 * @version 0.10.22
 * @copyright (c) 2016 - Lee Richmond<richmolj@gmail.com> & Wade Tandy<wade.tandy@gmail.com>
 * @license MIT <https://github.com/graphiti-api/spraypaint.js/blob/master/LICENSE>
 */

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.spraypaint = {})));
}(this, (function (exports) { 'use strict';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};



function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}





function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

var ValidationErrorBuilder = /** @class */ (function () {
    function ValidationErrorBuilder(model, payload) {
        this.model = model;
        this.payload = payload;
    }
    ValidationErrorBuilder.apply = function (model, payload) {
        var instance = new ValidationErrorBuilder(model, payload);
        instance.apply();
    };
    ValidationErrorBuilder.prototype.apply = function () {
        var _this = this;
        var errorsAccumulator = {};
        if (!this.payload.errors) {
            return;
        }
        this.payload.errors.forEach(function (err) {
            var meta = err.meta;
            if (!meta) {
                throw new Error("invalid json");
            }
            var metaRelationship = meta.relationship;
            if (metaRelationship) {
                _this._processRelationship(_this.model, metaRelationship, err);
            }
            else {
                _this._processResource(errorsAccumulator, meta, err);
            }
        });
        this.model.errors = errorsAccumulator;
    };
    ValidationErrorBuilder.prototype._processResource = function (errorsAccumulator, meta, error) {
        var attribute = this.model.klass.deserializeKey(meta.attribute);
        errorsAccumulator[attribute] = {
            title: error.title,
            code: error.code,
            attribute: meta.attribute,
            message: meta.message,
            fullMessage: attribute === "base" ? meta.message : error.detail,
            rawPayload: error
        };
    };
    ValidationErrorBuilder.prototype._processRelationship = function (model, meta, err) {
        var relatedObject = model[model.klass.deserializeKey(meta.name)];
        if (Array.isArray(relatedObject)) {
            relatedObject = relatedObject.find(function (r) {
                // For now graphiti is returning the related object id as an integer
                // where the related object's ID is a string
                return ((r.id && String(r.id) === String(meta.id)) ||
                    (r.temp_id && r.temp_id === meta["temp-id"]));
            });
        }
        if (meta.relationship) {
            this._processRelationship(relatedObject, meta.relationship, err);
        }
        else {
            var relatedAccumulator_1 = {};
            this._processResource(relatedAccumulator_1, meta, err);
            // make sure to assign a new error object, instead of mutating
            // the existing one, otherwise js frameworks with object tracking
            // won't be able to keep up. Validate vue.js when changing this code:
            var newErrs_1 = {};
            Object.keys(relatedObject.errors).forEach(function (key) {
                newErrs_1[key] = relatedObject.errors[key];
            });
            Object.keys(relatedAccumulator_1).forEach(function (key) {
                var error = relatedAccumulator_1[key];
                if (error !== undefined) {
                    newErrs_1[key] = error;
                }
            });
            relatedObject.errors = newErrs_1;
        }
    };
    return ValidationErrorBuilder;
}());

var refreshJWT = function (klass, serverResponse) {
    var jwt = serverResponse.headers.get("X-JWT");
    if (jwt) {
        klass.setJWT(jwt);
    }
};

// Build a hash like
// {
//   posts: [{id: 1, type: 'posts'}],
//   category: [{id: 1, type: 'categories}]
// }
// Will be array regardless of relationship type
// This will only contain persisted objects
// Used for dirty tracking associations
var relationshipIdentifiersFor = (function (model, relationNames) {
    var identifiers = {};
    relationNames.forEach(function (relationName) {
        var relatedObjects = model.relationship(relationName);
        if (relatedObjects) {
            if (!Array.isArray(relatedObjects)) {
                relatedObjects = [relatedObjects];
            }
            relatedObjects.forEach(function (r) {
                if (r.isPersisted) {
                    if (!identifiers[relationName]) {
                        identifiers[relationName] = [];
                    }
                    identifiers[relationName].push(r.resourceIdentifier);
                }
            });
        }
    });
    return identifiers;
});

var COLORS = {
    green: [32, 39],
    cyan: [36, 39],
    magenta: [35, 39],
    bold: [1, 22]
};
var colorize = (function (color, text) {
    if (supportsColor()) {
        var map = COLORS[color];
        return "\u001B[" + map[0] + "m" + text + "\u001B[" + map[1] + "m";
    }
    else {
        return text;
    }
});
var supportsColor = function () {
    if (typeof window === undefined) {
        if (/^screen|^xterm|^vt100|color|ansi|cygwin|linux/i.test((process.env.TERM))) {
            return true;
        }
        else {
            return false;
        }
    }
    else {
        return false;
    }
};

var Request = /** @class */ (function () {
    function Request(middleware, logger, config) {
        this.middleware = middleware;
        this.logger = logger;
        this.config = Object.assign({ patchAsPost: false }, config);
    }
    Request.prototype.get = function (url, options) {
        options.method = "GET";
        return this._fetchWithLogging(url, options);
    };
    Request.prototype.post = function (url, payload, options) {
        options.method = "POST";
        options.body = JSON.stringify(payload);
        return this._fetchWithLogging(url, options);
    };
    Request.prototype.patch = function (url, payload, options) {
        if (this.config.patchAsPost) {
            options.method = "POST";
            if (!options.headers)
                options.headers = {};
            options.headers["X-HTTP-Method-Override"] = "PATCH";
        }
        else {
            options.method = "PATCH";
        }
        options.body = JSON.stringify(payload);
        return this._fetchWithLogging(url, options);
    };
    Request.prototype.delete = function (url, options) {
        options.method = "DELETE";
        return this._fetchWithLogging(url, options);
    };
    // private
    Request.prototype._logRequest = function (verb, url) {
        this.logger.info(colorize("cyan", verb + ": ") + colorize("magenta", url));
    };
    Request.prototype._logResponse = function (responseJSON) {
        this.logger.debug(colorize("bold", JSON.stringify(responseJSON, null, 4)));
    };
    Request.prototype._fetchWithLogging = function (url, options) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this._logRequest(options.method || "UNDEFINED METHOD", url);
                        return [4 /*yield*/, this._fetch(url, options)];
                    case 1:
                        response = _a.sent();
                        this._logResponse(response.jsonPayload);
                        return [2 /*return*/, response];
                }
            });
        });
    };
    Request.prototype._fetch = function (url, options) {
        return __awaiter(this, void 0, void 0, function () {
            var e_1, response, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.middleware.beforeFetch(url, options)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _a.sent();
                        throw new RequestError("beforeFetch failed; review middleware.beforeFetch stack", url, options, e_1);
                    case 3:
                        _a.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, fetch(url, options)];
                    case 4:
                        response = _a.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        e_2 = _a.sent();
                        throw new ResponseError(null, e_2.message, e_2);
                    case 6: return [4 /*yield*/, this._handleResponse(response, options)];
                    case 7:
                        _a.sent();
                        return [2 /*return*/, response];
                }
            });
        });
    };
    Request.prototype._handleResponse = function (response, requestOptions) {
        return __awaiter(this, void 0, void 0, function () {
            var wasDelete, json, e_3, isEmptyResponse, e_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        wasDelete = requestOptions.method === "DELETE" &&
                            [204, 200].indexOf(response.status) > -1;
                        if (wasDelete)
                            return [2 /*return*/];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, response.clone().json()];
                    case 2:
                        json = _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        e_3 = _a.sent();
                        isEmptyResponse = [202, 204].indexOf(response.status) > -1;
                        if (isEmptyResponse)
                            return [2 /*return*/];
                        throw new ResponseError(response, "invalid json", e_3);
                    case 4:
                        _a.trys.push([4, 6, , 7]);
                        return [4 /*yield*/, this.middleware.afterFetch(response, json)];
                    case 5:
                        _a.sent();
                        return [3 /*break*/, 7];
                    case 6:
                        e_4 = _a.sent();
                        // afterFetch middleware failed
                        throw new ResponseError(response, "afterFetch failed; review middleware.afterFetch stack", e_4);
                    case 7:
                        if (response.status >= 500) {
                            throw new ResponseError(response, "Server Error");
                            // Allow 422 since we specially handle validation errors
                        }
                        else if (response.status !== 422 && json.data === undefined) {
                            if (response.status === 404) {
                                throw new ResponseError(response, "record not found");
                            }
                            else {
                                // Bad JSON, for instance an errors payload
                                throw new ResponseError(response, "invalid json");
                            }
                        }
                        ;
                        response.jsonPayload = json;
                        return [2 /*return*/];
                }
            });
        });
    };
    return Request;
}());
var RequestError = /** @class */ (function (_super) {
    __extends(RequestError, _super);
    function RequestError(message, url, options, originalError) {
        var _this = _super.call(this, message) || this;
        _this.stack = originalError.stack;
        _this.url = url;
        _this.options = options;
        _this.originalError = originalError;
        return _this;
    }
    return RequestError;
}(Error));
var ResponseError = /** @class */ (function (_super) {
    __extends(ResponseError, _super);
    function ResponseError(response, message, originalError) {
        var _this = _super.call(this, message || "Invalid Response") || this;
        _this.response = response;
        _this.originalError = originalError;
        return _this;
    }
    return ResponseError;
}(Error));

var IncludeDirective = /** @class */ (function () {
    function IncludeDirective(arg) {
        this.dct = {};
        var includeHash = this._parseIncludeArgs(arg);
        for (var key in includeHash) {
            if (includeHash.hasOwnProperty(key)) {
                this.dct[key] = new IncludeDirective(includeHash[key]);
            }
        }
    }
    IncludeDirective.prototype.toScopeObject = function () {
        var hash = {};
        for (var key in this.dct) {
            if (this.dct.hasOwnProperty(key)) {
                hash[key] = this.dct[key].toScopeObject();
            }
        }
        return hash;
    };
    IncludeDirective.prototype.toString = function () {
        var stringArray = [];
        var _loop_1 = function (key) {
            if (this_1.dct.hasOwnProperty(key)) {
                var stringValue = this_1.dct[key].toString();
                if (stringValue === "") {
                    stringArray.push(key);
                }
                else {
                    var split = stringValue.split(",");
                    split = split.map(function (x) { return key + "." + x; });
                    stringArray.push(split.join(","));
                }
            }
        };
        var this_1 = this;
        for (var key in this.dct) {
            _loop_1(key);
        }
        return stringArray.join(",");
    };
    IncludeDirective.prototype._parseIncludeArgs = function (includeArgs) {
        if (Array.isArray(includeArgs)) {
            return this._parseArray(includeArgs);
        }
        else if (typeof includeArgs === "string") {
            var obj = {};
            obj[includeArgs] = {};
            return obj;
        }
        else if (typeof includeArgs === "object") {
            return this._parseObject(includeArgs);
        }
        else {
            return {};
        }
    };
    IncludeDirective.prototype._parseObject = function (includeObj) {
        var parsed = {};
        for (var key in includeObj) {
            if (includeObj.hasOwnProperty(key)) {
                parsed[key] = this._parseIncludeArgs(includeObj[key]);
            }
        }
        return parsed;
    };
    IncludeDirective.prototype._parseArray = function (includeArray) {
        var parsed = {};
        for (var _i = 0, includeArray_1 = includeArray; _i < includeArray_1.length; _i++) {
            var value = includeArray_1[_i];
            var parsedEl = this._parseIncludeArgs(value);
            for (var key in parsedEl) {
                if (parsedEl.hasOwnProperty(key)) {
                    parsed[key] = parsedEl[key];
                }
            }
        }
        return parsed;
    };
    return IncludeDirective;
}());

var memo = 0;
var generate = function () {
    memo++;
    return "temp-id-" + memo;
};
var tempId = {
    generate: generate
};

var WritePayload = /** @class */ (function () {
    function WritePayload(model, relationships, idOnly) {
        if (idOnly === void 0) { idOnly = false; }
        this.included = [];
        this.idOnly = false;
        var includeDirective = new IncludeDirective(relationships);
        this.includeDirective = includeDirective.toScopeObject();
        this.model = model;
        this.idOnly = idOnly;
        if (!model.klass.jsonapiType) {
            throw new Error("Cannot serialize model: Undefined jsonapiType");
        }
        this.jsonapiType = model.klass.jsonapiType;
    }
    WritePayload.prototype.attributes = function () {
        var _this = this;
        var attrs = {};
        this._eachAttribute(function (key, value, attrDef) {
            var writeKey = _this.model.klass.serializeKey(key);
            if (attrDef.type === Number && value === "") {
                attrs[writeKey] = null;
            }
            else {
                attrs[writeKey] = value;
            }
        });
        return attrs;
    };
    WritePayload.prototype.removeDeletions = function (model, includeDirective) {
        var _this = this;
        Object.keys(includeDirective).forEach(function (key) {
            var nested = includeDirective[key];
            var modelIdx = model;
            var relatedObjects = modelIdx[key];
            if (relatedObjects) {
                if (Array.isArray(relatedObjects)) {
                    relatedObjects.forEach(function (relatedObject, index) {
                        if (relatedObject.isMarkedForDestruction ||
                            relatedObject.isMarkedForDisassociation) {
                            modelIdx[key].splice(index, 1);
                        }
                        else {
                            _this.removeDeletions(relatedObject, nested);
                        }
                    });
                }
                else {
                    var relatedObject = relatedObjects;
                    if (relatedObject.isMarkedForDestruction ||
                        relatedObject.isMarkedForDisassociation) {
                        modelIdx[key] = null;
                    }
                    else {
                        _this.removeDeletions(relatedObject, nested);
                    }
                }
            }
        });
    };
    WritePayload.prototype.postProcess = function () {
        this.removeDeletions(this.model, this.includeDirective);
        this.model.resetRelationTracking(this.includeDirective);
    };
    WritePayload.prototype.relationships = function () {
        var _this = this;
        var _relationships = {};
        Object.keys(this.model.klass.attributeList).forEach(function (key) {
            var attribute = _this.model.klass.attributeList[key];
            var attributeName = attribute.name;
            if (!attribute.isRelationship) {
                // Don't process attributes that are not relations
                return;
            }
            var nested = _this.includeDirective[key];
            var idOnly = false;
            if (key.indexOf(".") > -1) {
                key = key.split(".")[0];
                idOnly = true;
            }
            var data;
            var relatedModels = _this.model[attributeName];
            if (relatedModels) {
                if (Array.isArray(relatedModels)) {
                    data = [];
                    relatedModels.forEach(function (relatedModel) {
                        data.push(_this._processRelatedModel(relatedModel, nested, idOnly));
                    });
                    if (data.length === 0) {
                        data = null;
                    }
                }
                else {
                    data = _this._processRelatedModel(relatedModels, nested, idOnly);
                }
                if (data) {
                    _relationships[_this.model.klass.serializeKey(attributeName)] = {
                        data: data
                    };
                }
            }
        });
        return _relationships;
    };
    WritePayload.prototype.asJSON = function () {
        var data = {
            type: this.jsonapiType
        };
        if (this.model.id) {
            data.id = this.model.id;
        }
        if (this.model.temp_id) {
            data["temp-id"] = this.model.temp_id;
        }
        if (!this.idOnly) {
            var _attributes = this.attributes();
            if (Object.keys(_attributes).length > 0) {
                data.attributes = _attributes;
            }
        }
        var relationshipData = this.relationships();
        if (Object.keys(relationshipData).length > 0) {
            data.relationships = relationshipData;
        }
        var json = { data: data };
        if (this.included.length > 0) {
            json.included = this.included;
        }
        var _meta = this.model.meta;
        if (this.model.isMetaDirty && Object.keys(_meta).length > 0) {
            data.meta = _meta;
        }
        return json;
    };
    // private
    WritePayload.prototype._isNewAndMarkedForDestruction = function (model) {
        return !model.isPersisted && model.isMarkedForDestruction;
    };
    WritePayload.prototype._processRelatedModel = function (model, nested, idOnly) {
        var _this = this;
        model.clearErrors();
        if (!model.isPersisted) {
            model.temp_id = tempId.generate();
        }
        var wp = new WritePayload(model, nested, idOnly);
        var relatedJSON = wp.asJSON().data;
        if (!this._isNewAndMarkedForDestruction(model)) {
            this._pushInclude(relatedJSON);
        }
        wp.included.forEach(function (incl) {
            if (!_this._isNewAndMarkedForDestruction(model)) {
                _this._pushInclude(incl);
            }
        });
        var resourceIdentifier = this._resourceIdentifierFor(model);
        return resourceIdentifier;
    };
    WritePayload.prototype._resourceIdentifierFor = function (model) {
        if (!model.klass.jsonapiType) {
            throw new Error("Cannot serialize model: Undefined jsonapiType for model " + model);
        }
        var identifier = {
            type: model.klass.jsonapiType
        };
        if (model.id) {
            identifier.id = model.id;
        }
        if (model.temp_id) {
            identifier["temp-id"] = model.temp_id;
        }
        return identifier;
    };
    WritePayload.prototype._pushInclude = function (include) {
        if (!this._isIncluded(include)) {
            // We don't want the included part in the json-payload for writing
            // this.included.push(include)
        }
    };
    WritePayload.prototype._isIncluded = function (include) {
        this.included.forEach(function (incl) {
            if (incl.type === include.type) {
                if (incl.id === include.id || incl["temp-id"] === include["temp-id"]) {
                    return true;
                }
            }
        });
        return false;
    };
    WritePayload.prototype._eachAttribute = function (callback) {
        var _this = this;
        var modelAttrs = this.model.typedAttributes;
        Object.keys(modelAttrs).forEach(function (key) {
            var attrDef = _this.model.klass.attributeList[key];
            if (attrDef.persist) {
                var value = modelAttrs[key];
                callback(key, value, attrDef);
            }
        });
    };
    return WritePayload;
}());

var InMemoryStorageBackend = /** @class */ (function () {
    function InMemoryStorageBackend() {
        this._data = {};
    }
    InMemoryStorageBackend.prototype.getItem = function (key) {
        return this._data[key] || null; // Cast undefined to null
    };
    InMemoryStorageBackend.prototype.setItem = function (key, value) {
        this._data[key] = value;
    };
    InMemoryStorageBackend.prototype.removeItem = function (key) {
        delete this._data[key];
    };
    return InMemoryStorageBackend;
}());
var defaultBackend;
// In case no localStorage available, defauilt to a noop implementation
try {
    defaultBackend = localStorage;
}
catch (e) {
    defaultBackend = new InMemoryStorageBackend();
}
var CredentialStorage = /** @class */ (function () {
    function CredentialStorage(jwtKey, backend) {
        if (backend === void 0) { backend = defaultBackend; }
        this._jwtKey = jwtKey;
        this._backend = backend;
    }
    Object.defineProperty(CredentialStorage.prototype, "backend", {
        get: function () {
            return this._backend;
        },
        enumerable: true,
        configurable: true
    });
    CredentialStorage.prototype.getJWT = function () {
        return this._backend.getItem(this._jwtKey) || undefined;
    };
    CredentialStorage.prototype.setJWT = function (value) {
        if (value) {
            this._backend.setItem(this._jwtKey, value);
        }
        else {
            this._backend.removeItem(this._jwtKey);
        }
    };
    return CredentialStorage;
}());

/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear() {
  this.__data__ = [];
  this.size = 0;
}

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

/** Used for built-in method references. */
var arrayProto = Array.prototype;

/** Built-in value references. */
var splice = arrayProto.splice;

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  --this.size;
  return true;
}

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  return index < 0 ? undefined : data[index][1];
}

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet(key, value) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `ListCache`.
ListCache.prototype.clear = listCacheClear;
ListCache.prototype['delete'] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;

/**
 * Removes all key-value entries from the stack.
 *
 * @private
 * @name clear
 * @memberOf Stack
 */
function stackClear() {
  this.__data__ = new ListCache;
  this.size = 0;
}

/**
 * Removes `key` and its value from the stack.
 *
 * @private
 * @name delete
 * @memberOf Stack
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function stackDelete(key) {
  var data = this.__data__,
      result = data['delete'](key);

  this.size = data.size;
  return result;
}

/**
 * Gets the stack value for `key`.
 *
 * @private
 * @name get
 * @memberOf Stack
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function stackGet(key) {
  return this.__data__.get(key);
}

/**
 * Checks if a stack value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Stack
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function stackHas(key) {
  return this.__data__.has(key);
}

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/** Built-in value references. */
var Symbol$1 = root.Symbol;

/** Used for built-in method references. */
var objectProto$1 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$1 = objectProto$1.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto$1.toString;

/** Built-in value references. */
var symToStringTag$1 = Symbol$1 ? Symbol$1.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty$1.call(value, symToStringTag$1),
      tag = value[symToStringTag$1];

  try {
    value[symToStringTag$1] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag$1] = tag;
    } else {
      delete value[symToStringTag$1];
    }
  }
  return result;
}

/** Used for built-in method references. */
var objectProto$2 = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString$1 = objectProto$2.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString$1.call(value);
}

/** `Object#toString` result references. */
var nullTag = '[object Null]';
var undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = Symbol$1 ? Symbol$1.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

/** `Object#toString` result references. */
var asyncTag = '[object AsyncFunction]';
var funcTag$1 = '[object Function]';
var genTag$1 = '[object GeneratorFunction]';
var proxyTag = '[object Proxy]';

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  if (!isObject(value)) {
    return false;
  }
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 9 which returns 'object' for typed arrays and other constructors.
  var tag = baseGetTag(value);
  return tag == funcTag$1 || tag == genTag$1 || tag == asyncTag || tag == proxyTag;
}

/** Used to detect overreaching core-js shims. */
var coreJsData = root['__core-js_shared__'];

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && (maskSrcKey in func);
}

/** Used for built-in method references. */
var funcProto$1 = Function.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString$1 = funcProto$1.toString;

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to convert.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString$1.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used for built-in method references. */
var funcProto = Function.prototype;
var objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

/* Built-in method references that are verified to be native. */
var Map = getNative(root, 'Map');

/* Built-in method references that are verified to be native. */
var nativeCreate = getNative(Object, 'create');

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear() {
  this.__data__ = nativeCreate ? nativeCreate(null) : {};
  this.size = 0;
}

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(key) {
  var result = this.has(key) && delete this.__data__[key];
  this.size -= result ? 1 : 0;
  return result;
}

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/** Used for built-in method references. */
var objectProto$3 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$2 = objectProto$3.hasOwnProperty;

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }
  return hasOwnProperty$2.call(data, key) ? data[key] : undefined;
}

/** Used for built-in method references. */
var objectProto$4 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$3 = objectProto$4.hasOwnProperty;

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate ? (data[key] !== undefined) : hasOwnProperty$3.call(data, key);
}

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED$1 = '__lodash_hash_undefined__';

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED$1 : value;
  return this;
}

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `Hash`.
Hash.prototype.clear = hashClear;
Hash.prototype['delete'] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear() {
  this.size = 0;
  this.__data__ = {
    'hash': new Hash,
    'map': new (Map || ListCache),
    'string': new Hash
  };
}

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  var type = typeof value;
  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
    ? (value !== '__proto__')
    : (value === null);
}

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable(key)
    ? data[typeof key == 'string' ? 'string' : 'hash']
    : data.map;
}

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete(key) {
  var result = getMapData(this, key)['delete'](key);
  this.size -= result ? 1 : 0;
  return result;
}

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet(key, value) {
  var data = getMapData(this, key),
      size = data.size;

  data.set(key, value);
  this.size += data.size == size ? 0 : 1;
  return this;
}

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `MapCache`.
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype['delete'] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/**
 * Sets the stack `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Stack
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the stack cache instance.
 */
function stackSet(key, value) {
  var data = this.__data__;
  if (data instanceof ListCache) {
    var pairs = data.__data__;
    if (!Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
      pairs.push([key, value]);
      this.size = ++data.size;
      return this;
    }
    data = this.__data__ = new MapCache(pairs);
  }
  data.set(key, value);
  this.size = data.size;
  return this;
}

/**
 * Creates a stack cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Stack(entries) {
  var data = this.__data__ = new ListCache(entries);
  this.size = data.size;
}

// Add methods to `Stack`.
Stack.prototype.clear = stackClear;
Stack.prototype['delete'] = stackDelete;
Stack.prototype.get = stackGet;
Stack.prototype.has = stackHas;
Stack.prototype.set = stackSet;

/**
 * A specialized version of `_.forEach` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns `array`.
 */
function arrayEach(array, iteratee) {
  var index = -1,
      length = array == null ? 0 : array.length;

  while (++index < length) {
    if (iteratee(array[index], index, array) === false) {
      break;
    }
  }
  return array;
}

var defineProperty = (function() {
  try {
    var func = getNative(Object, 'defineProperty');
    func({}, '', {});
    return func;
  } catch (e) {}
}());

/**
 * The base implementation of `assignValue` and `assignMergeValue` without
 * value checks.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function baseAssignValue(object, key, value) {
  if (key == '__proto__' && defineProperty) {
    defineProperty(object, key, {
      'configurable': true,
      'enumerable': true,
      'value': value,
      'writable': true
    });
  } else {
    object[key] = value;
  }
}

/** Used for built-in method references. */
var objectProto$5 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$4 = objectProto$5.hasOwnProperty;

/**
 * Assigns `value` to `key` of `object` if the existing value is not equivalent
 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function assignValue(object, key, value) {
  var objValue = object[key];
  if (!(hasOwnProperty$4.call(object, key) && eq(objValue, value)) ||
      (value === undefined && !(key in object))) {
    baseAssignValue(object, key, value);
  }
}

/**
 * Copies properties of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy properties from.
 * @param {Array} props The property identifiers to copy.
 * @param {Object} [object={}] The object to copy properties to.
 * @param {Function} [customizer] The function to customize copied values.
 * @returns {Object} Returns `object`.
 */
function copyObject(source, props, object, customizer) {
  var isNew = !object;
  object || (object = {});

  var index = -1,
      length = props.length;

  while (++index < length) {
    var key = props[index];

    var newValue = customizer
      ? customizer(object[key], source[key], key, object, source)
      : undefined;

    if (newValue === undefined) {
      newValue = source[key];
    }
    if (isNew) {
      baseAssignValue(object, key, newValue);
    } else {
      assignValue(object, key, newValue);
    }
  }
  return object;
}

/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

/** `Object#toString` result references. */
var argsTag$1 = '[object Arguments]';

/**
 * The base implementation of `_.isArguments`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 */
function baseIsArguments(value) {
  return isObjectLike(value) && baseGetTag(value) == argsTag$1;
}

/** Used for built-in method references. */
var objectProto$7 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$6 = objectProto$7.hasOwnProperty;

/** Built-in value references. */
var propertyIsEnumerable = objectProto$7.propertyIsEnumerable;

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
var isArguments = baseIsArguments(function() { return arguments; }()) ? baseIsArguments : function(value) {
  return isObjectLike(value) && hasOwnProperty$6.call(value, 'callee') &&
    !propertyIsEnumerable.call(value, 'callee');
};

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

/**
 * This method returns `false`.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {boolean} Returns `false`.
 * @example
 *
 * _.times(2, _.stubFalse);
 * // => [false, false]
 */
function stubFalse() {
  return false;
}

/** Detect free variable `exports`. */
var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Built-in value references. */
var Buffer = moduleExports ? root.Buffer : undefined;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined;

/**
 * Checks if `value` is a buffer.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
 * @example
 *
 * _.isBuffer(new Buffer(2));
 * // => true
 *
 * _.isBuffer(new Uint8Array(2));
 * // => false
 */
var isBuffer = nativeIsBuffer || stubFalse;

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  var type = typeof value;
  length = length == null ? MAX_SAFE_INTEGER : length;

  return !!length &&
    (type == 'number' ||
      (type != 'symbol' && reIsUint.test(value))) &&
        (value > -1 && value % 1 == 0 && value < length);
}

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER$1 = 9007199254740991;

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER$1;
}

/** `Object#toString` result references. */
var argsTag$2 = '[object Arguments]';
var arrayTag$1 = '[object Array]';
var boolTag$1 = '[object Boolean]';
var dateTag$1 = '[object Date]';
var errorTag$1 = '[object Error]';
var funcTag$2 = '[object Function]';
var mapTag$1 = '[object Map]';
var numberTag$1 = '[object Number]';
var objectTag$1 = '[object Object]';
var regexpTag$1 = '[object RegExp]';
var setTag$1 = '[object Set]';
var stringTag$1 = '[object String]';
var weakMapTag$1 = '[object WeakMap]';

var arrayBufferTag$1 = '[object ArrayBuffer]';
var dataViewTag$1 = '[object DataView]';
var float32Tag$1 = '[object Float32Array]';
var float64Tag$1 = '[object Float64Array]';
var int8Tag$1 = '[object Int8Array]';
var int16Tag$1 = '[object Int16Array]';
var int32Tag$1 = '[object Int32Array]';
var uint8Tag$1 = '[object Uint8Array]';
var uint8ClampedTag$1 = '[object Uint8ClampedArray]';
var uint16Tag$1 = '[object Uint16Array]';
var uint32Tag$1 = '[object Uint32Array]';

/** Used to identify `toStringTag` values of typed arrays. */
var typedArrayTags = {};
typedArrayTags[float32Tag$1] = typedArrayTags[float64Tag$1] =
typedArrayTags[int8Tag$1] = typedArrayTags[int16Tag$1] =
typedArrayTags[int32Tag$1] = typedArrayTags[uint8Tag$1] =
typedArrayTags[uint8ClampedTag$1] = typedArrayTags[uint16Tag$1] =
typedArrayTags[uint32Tag$1] = true;
typedArrayTags[argsTag$2] = typedArrayTags[arrayTag$1] =
typedArrayTags[arrayBufferTag$1] = typedArrayTags[boolTag$1] =
typedArrayTags[dataViewTag$1] = typedArrayTags[dateTag$1] =
typedArrayTags[errorTag$1] = typedArrayTags[funcTag$2] =
typedArrayTags[mapTag$1] = typedArrayTags[numberTag$1] =
typedArrayTags[objectTag$1] = typedArrayTags[regexpTag$1] =
typedArrayTags[setTag$1] = typedArrayTags[stringTag$1] =
typedArrayTags[weakMapTag$1] = false;

/**
 * The base implementation of `_.isTypedArray` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 */
function baseIsTypedArray(value) {
  return isObjectLike(value) &&
    isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
}

/**
 * The base implementation of `_.unary` without support for storing metadata.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @returns {Function} Returns the new capped function.
 */
function baseUnary(func) {
  return function(value) {
    return func(value);
  };
}

/** Detect free variable `exports`. */
var freeExports$1 = typeof exports == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule$1 = freeExports$1 && typeof module == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports$1 = freeModule$1 && freeModule$1.exports === freeExports$1;

/** Detect free variable `process` from Node.js. */
var freeProcess = moduleExports$1 && freeGlobal.process;

/** Used to access faster Node.js helpers. */
var nodeUtil = (function() {
  try {
    // Use `util.types` for Node.js 10+.
    var types = freeModule$1 && freeModule$1.require && freeModule$1.require('util').types;

    if (types) {
      return types;
    }

    // Legacy `process.binding('util')` for Node.js < 10.
    return freeProcess && freeProcess.binding && freeProcess.binding('util');
  } catch (e) {}
}());

/* Node.js helper references. */
var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;

/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */
var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;

/** Used for built-in method references. */
var objectProto$6 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$5 = objectProto$6.hasOwnProperty;

/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
function arrayLikeKeys(value, inherited) {
  var isArr = isArray(value),
      isArg = !isArr && isArguments(value),
      isBuff = !isArr && !isArg && isBuffer(value),
      isType = !isArr && !isArg && !isBuff && isTypedArray(value),
      skipIndexes = isArr || isArg || isBuff || isType,
      result = skipIndexes ? baseTimes(value.length, String) : [],
      length = result.length;

  for (var key in value) {
    if ((inherited || hasOwnProperty$5.call(value, key)) &&
        !(skipIndexes && (
           // Safari 9 has enumerable `arguments.length` in strict mode.
           key == 'length' ||
           // Node.js 0.10 has enumerable non-index properties on buffers.
           (isBuff && (key == 'offset' || key == 'parent')) ||
           // PhantomJS 2 has enumerable non-index properties on typed arrays.
           (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
           // Skip index properties.
           isIndex(key, length)
        ))) {
      result.push(key);
    }
  }
  return result;
}

/** Used for built-in method references. */
var objectProto$9 = Object.prototype;

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto$9;

  return value === proto;
}

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeKeys = overArg(Object.keys, Object);

/** Used for built-in method references. */
var objectProto$8 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$7 = objectProto$8.hasOwnProperty;

/**
 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeys(object) {
  if (!isPrototype(object)) {
    return nativeKeys(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty$7.call(object, key) && key != 'constructor') {
      result.push(key);
    }
  }
  return result;
}

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
function keys(object) {
  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
}

/**
 * The base implementation of `_.assign` without support for multiple sources
 * or `customizer` functions.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @returns {Object} Returns `object`.
 */
function baseAssign(object, source) {
  return object && copyObject(source, keys(source), object);
}

/**
 * This function is like
 * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * except that it includes inherited enumerable properties.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function nativeKeysIn(object) {
  var result = [];
  if (object != null) {
    for (var key in Object(object)) {
      result.push(key);
    }
  }
  return result;
}

/** Used for built-in method references. */
var objectProto$10 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$8 = objectProto$10.hasOwnProperty;

/**
 * The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeysIn(object) {
  if (!isObject(object)) {
    return nativeKeysIn(object);
  }
  var isProto = isPrototype(object),
      result = [];

  for (var key in object) {
    if (!(key == 'constructor' && (isProto || !hasOwnProperty$8.call(object, key)))) {
      result.push(key);
    }
  }
  return result;
}

/**
 * Creates an array of the own and inherited enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keysIn(new Foo);
 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
 */
function keysIn(object) {
  return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
}

/**
 * The base implementation of `_.assignIn` without support for multiple sources
 * or `customizer` functions.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @returns {Object} Returns `object`.
 */
function baseAssignIn(object, source) {
  return object && copyObject(source, keysIn(source), object);
}

/** Detect free variable `exports`. */
var freeExports$2 = typeof exports == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule$2 = freeExports$2 && typeof module == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports$2 = freeModule$2 && freeModule$2.exports === freeExports$2;

/** Built-in value references. */
var Buffer$1 = moduleExports$2 ? root.Buffer : undefined;
var allocUnsafe = Buffer$1 ? Buffer$1.allocUnsafe : undefined;

/**
 * Creates a clone of  `buffer`.
 *
 * @private
 * @param {Buffer} buffer The buffer to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Buffer} Returns the cloned buffer.
 */
function cloneBuffer(buffer, isDeep) {
  if (isDeep) {
    return buffer.slice();
  }
  var length = buffer.length,
      result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);

  buffer.copy(result);
  return result;
}

/**
 * Copies the values of `source` to `array`.
 *
 * @private
 * @param {Array} source The array to copy values from.
 * @param {Array} [array=[]] The array to copy values to.
 * @returns {Array} Returns `array`.
 */
function copyArray(source, array) {
  var index = -1,
      length = source.length;

  array || (array = Array(length));
  while (++index < length) {
    array[index] = source[index];
  }
  return array;
}

/**
 * A specialized version of `_.filter` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {Array} Returns the new filtered array.
 */
function arrayFilter(array, predicate) {
  var index = -1,
      length = array == null ? 0 : array.length,
      resIndex = 0,
      result = [];

  while (++index < length) {
    var value = array[index];
    if (predicate(value, index, array)) {
      result[resIndex++] = value;
    }
  }
  return result;
}

/**
 * This method returns a new empty array.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {Array} Returns the new empty array.
 * @example
 *
 * var arrays = _.times(2, _.stubArray);
 *
 * console.log(arrays);
 * // => [[], []]
 *
 * console.log(arrays[0] === arrays[1]);
 * // => false
 */
function stubArray() {
  return [];
}

/** Used for built-in method references. */
var objectProto$11 = Object.prototype;

/** Built-in value references. */
var propertyIsEnumerable$1 = objectProto$11.propertyIsEnumerable;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeGetSymbols = Object.getOwnPropertySymbols;

/**
 * Creates an array of the own enumerable symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */
var getSymbols = !nativeGetSymbols ? stubArray : function(object) {
  if (object == null) {
    return [];
  }
  object = Object(object);
  return arrayFilter(nativeGetSymbols(object), function(symbol) {
    return propertyIsEnumerable$1.call(object, symbol);
  });
};

/**
 * Copies own symbols of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy symbols from.
 * @param {Object} [object={}] The object to copy symbols to.
 * @returns {Object} Returns `object`.
 */
function copySymbols(source, object) {
  return copyObject(source, getSymbols(source), object);
}

/**
 * Appends the elements of `values` to `array`.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {Array} values The values to append.
 * @returns {Array} Returns `array`.
 */
function arrayPush(array, values) {
  var index = -1,
      length = values.length,
      offset = array.length;

  while (++index < length) {
    array[offset + index] = values[index];
  }
  return array;
}

/** Built-in value references. */
var getPrototype = overArg(Object.getPrototypeOf, Object);

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeGetSymbols$1 = Object.getOwnPropertySymbols;

/**
 * Creates an array of the own and inherited enumerable symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */
var getSymbolsIn = !nativeGetSymbols$1 ? stubArray : function(object) {
  var result = [];
  while (object) {
    arrayPush(result, getSymbols(object));
    object = getPrototype(object);
  }
  return result;
};

/**
 * Copies own and inherited symbols of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy symbols from.
 * @param {Object} [object={}] The object to copy symbols to.
 * @returns {Object} Returns `object`.
 */
function copySymbolsIn(source, object) {
  return copyObject(source, getSymbolsIn(source), object);
}

/**
 * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
 * `keysFunc` and `symbolsFunc` to get the enumerable property names and
 * symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @param {Function} symbolsFunc The function to get the symbols of `object`.
 * @returns {Array} Returns the array of property names and symbols.
 */
function baseGetAllKeys(object, keysFunc, symbolsFunc) {
  var result = keysFunc(object);
  return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
}

/**
 * Creates an array of own enumerable property names and symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */
function getAllKeys(object) {
  return baseGetAllKeys(object, keys, getSymbols);
}

/**
 * Creates an array of own and inherited enumerable property names and
 * symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */
function getAllKeysIn(object) {
  return baseGetAllKeys(object, keysIn, getSymbolsIn);
}

/* Built-in method references that are verified to be native. */
var DataView = getNative(root, 'DataView');

/* Built-in method references that are verified to be native. */
var Promise$1 = getNative(root, 'Promise');

/* Built-in method references that are verified to be native. */
var Set = getNative(root, 'Set');

/* Built-in method references that are verified to be native. */
var WeakMap = getNative(root, 'WeakMap');

/** `Object#toString` result references. */
var mapTag$2 = '[object Map]';
var objectTag$2 = '[object Object]';
var promiseTag = '[object Promise]';
var setTag$2 = '[object Set]';
var weakMapTag$2 = '[object WeakMap]';

var dataViewTag$2 = '[object DataView]';

/** Used to detect maps, sets, and weakmaps. */
var dataViewCtorString = toSource(DataView);
var mapCtorString = toSource(Map);
var promiseCtorString = toSource(Promise$1);
var setCtorString = toSource(Set);
var weakMapCtorString = toSource(WeakMap);

/**
 * Gets the `toStringTag` of `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
var getTag = baseGetTag;

// Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.
if ((DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag$2) ||
    (Map && getTag(new Map) != mapTag$2) ||
    (Promise$1 && getTag(Promise$1.resolve()) != promiseTag) ||
    (Set && getTag(new Set) != setTag$2) ||
    (WeakMap && getTag(new WeakMap) != weakMapTag$2)) {
  getTag = function(value) {
    var result = baseGetTag(value),
        Ctor = result == objectTag$2 ? value.constructor : undefined,
        ctorString = Ctor ? toSource(Ctor) : '';

    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString: return dataViewTag$2;
        case mapCtorString: return mapTag$2;
        case promiseCtorString: return promiseTag;
        case setCtorString: return setTag$2;
        case weakMapCtorString: return weakMapTag$2;
      }
    }
    return result;
  };
}

var getTag$1 = getTag;

/** Used for built-in method references. */
var objectProto$12 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$9 = objectProto$12.hasOwnProperty;

/**
 * Initializes an array clone.
 *
 * @private
 * @param {Array} array The array to clone.
 * @returns {Array} Returns the initialized clone.
 */
function initCloneArray(array) {
  var length = array.length,
      result = new array.constructor(length);

  // Add properties assigned by `RegExp#exec`.
  if (length && typeof array[0] == 'string' && hasOwnProperty$9.call(array, 'index')) {
    result.index = array.index;
    result.input = array.input;
  }
  return result;
}

/** Built-in value references. */
var Uint8Array = root.Uint8Array;

/**
 * Creates a clone of `arrayBuffer`.
 *
 * @private
 * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
 * @returns {ArrayBuffer} Returns the cloned array buffer.
 */
function cloneArrayBuffer(arrayBuffer) {
  var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
  new Uint8Array(result).set(new Uint8Array(arrayBuffer));
  return result;
}

/**
 * Creates a clone of `dataView`.
 *
 * @private
 * @param {Object} dataView The data view to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned data view.
 */
function cloneDataView(dataView, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
  return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
}

/** Used to match `RegExp` flags from their coerced string values. */
var reFlags = /\w*$/;

/**
 * Creates a clone of `regexp`.
 *
 * @private
 * @param {Object} regexp The regexp to clone.
 * @returns {Object} Returns the cloned regexp.
 */
function cloneRegExp(regexp) {
  var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
  result.lastIndex = regexp.lastIndex;
  return result;
}

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol$1 ? Symbol$1.prototype : undefined;
var symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;

/**
 * Creates a clone of the `symbol` object.
 *
 * @private
 * @param {Object} symbol The symbol object to clone.
 * @returns {Object} Returns the cloned symbol object.
 */
function cloneSymbol(symbol) {
  return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};
}

/**
 * Creates a clone of `typedArray`.
 *
 * @private
 * @param {Object} typedArray The typed array to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned typed array.
 */
function cloneTypedArray(typedArray, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
  return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
}

/** `Object#toString` result references. */
var boolTag$2 = '[object Boolean]';
var dateTag$2 = '[object Date]';
var mapTag$3 = '[object Map]';
var numberTag$2 = '[object Number]';
var regexpTag$2 = '[object RegExp]';
var setTag$3 = '[object Set]';
var stringTag$2 = '[object String]';
var symbolTag$1 = '[object Symbol]';

var arrayBufferTag$2 = '[object ArrayBuffer]';
var dataViewTag$3 = '[object DataView]';
var float32Tag$2 = '[object Float32Array]';
var float64Tag$2 = '[object Float64Array]';
var int8Tag$2 = '[object Int8Array]';
var int16Tag$2 = '[object Int16Array]';
var int32Tag$2 = '[object Int32Array]';
var uint8Tag$2 = '[object Uint8Array]';
var uint8ClampedTag$2 = '[object Uint8ClampedArray]';
var uint16Tag$2 = '[object Uint16Array]';
var uint32Tag$2 = '[object Uint32Array]';

/**
 * Initializes an object clone based on its `toStringTag`.
 *
 * **Note:** This function only supports cloning values with tags of
 * `Boolean`, `Date`, `Error`, `Map`, `Number`, `RegExp`, `Set`, or `String`.
 *
 * @private
 * @param {Object} object The object to clone.
 * @param {string} tag The `toStringTag` of the object to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the initialized clone.
 */
function initCloneByTag(object, tag, isDeep) {
  var Ctor = object.constructor;
  switch (tag) {
    case arrayBufferTag$2:
      return cloneArrayBuffer(object);

    case boolTag$2:
    case dateTag$2:
      return new Ctor(+object);

    case dataViewTag$3:
      return cloneDataView(object, isDeep);

    case float32Tag$2: case float64Tag$2:
    case int8Tag$2: case int16Tag$2: case int32Tag$2:
    case uint8Tag$2: case uint8ClampedTag$2: case uint16Tag$2: case uint32Tag$2:
      return cloneTypedArray(object, isDeep);

    case mapTag$3:
      return new Ctor;

    case numberTag$2:
    case stringTag$2:
      return new Ctor(object);

    case regexpTag$2:
      return cloneRegExp(object);

    case setTag$3:
      return new Ctor;

    case symbolTag$1:
      return cloneSymbol(object);
  }
}

/** Built-in value references. */
var objectCreate = Object.create;

/**
 * The base implementation of `_.create` without support for assigning
 * properties to the created object.
 *
 * @private
 * @param {Object} proto The object to inherit from.
 * @returns {Object} Returns the new object.
 */
var baseCreate = (function() {
  function object() {}
  return function(proto) {
    if (!isObject(proto)) {
      return {};
    }
    if (objectCreate) {
      return objectCreate(proto);
    }
    object.prototype = proto;
    var result = new object;
    object.prototype = undefined;
    return result;
  };
}());

/**
 * Initializes an object clone.
 *
 * @private
 * @param {Object} object The object to clone.
 * @returns {Object} Returns the initialized clone.
 */
function initCloneObject(object) {
  return (typeof object.constructor == 'function' && !isPrototype(object))
    ? baseCreate(getPrototype(object))
    : {};
}

/** `Object#toString` result references. */
var mapTag$4 = '[object Map]';

/**
 * The base implementation of `_.isMap` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a map, else `false`.
 */
function baseIsMap(value) {
  return isObjectLike(value) && getTag$1(value) == mapTag$4;
}

/* Node.js helper references. */
var nodeIsMap = nodeUtil && nodeUtil.isMap;

/**
 * Checks if `value` is classified as a `Map` object.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a map, else `false`.
 * @example
 *
 * _.isMap(new Map);
 * // => true
 *
 * _.isMap(new WeakMap);
 * // => false
 */
var isMap = nodeIsMap ? baseUnary(nodeIsMap) : baseIsMap;

/** `Object#toString` result references. */
var setTag$4 = '[object Set]';

/**
 * The base implementation of `_.isSet` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a set, else `false`.
 */
function baseIsSet(value) {
  return isObjectLike(value) && getTag$1(value) == setTag$4;
}

/* Node.js helper references. */
var nodeIsSet = nodeUtil && nodeUtil.isSet;

/**
 * Checks if `value` is classified as a `Set` object.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a set, else `false`.
 * @example
 *
 * _.isSet(new Set);
 * // => true
 *
 * _.isSet(new WeakSet);
 * // => false
 */
var isSet = nodeIsSet ? baseUnary(nodeIsSet) : baseIsSet;

/** Used to compose bitmasks for cloning. */
var CLONE_DEEP_FLAG$1 = 1;
var CLONE_FLAT_FLAG = 2;
var CLONE_SYMBOLS_FLAG$1 = 4;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]';
var arrayTag = '[object Array]';
var boolTag = '[object Boolean]';
var dateTag = '[object Date]';
var errorTag = '[object Error]';
var funcTag = '[object Function]';
var genTag = '[object GeneratorFunction]';
var mapTag = '[object Map]';
var numberTag = '[object Number]';
var objectTag = '[object Object]';
var regexpTag = '[object RegExp]';
var setTag = '[object Set]';
var stringTag = '[object String]';
var symbolTag = '[object Symbol]';
var weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]';
var dataViewTag = '[object DataView]';
var float32Tag = '[object Float32Array]';
var float64Tag = '[object Float64Array]';
var int8Tag = '[object Int8Array]';
var int16Tag = '[object Int16Array]';
var int32Tag = '[object Int32Array]';
var uint8Tag = '[object Uint8Array]';
var uint8ClampedTag = '[object Uint8ClampedArray]';
var uint16Tag = '[object Uint16Array]';
var uint32Tag = '[object Uint32Array]';

/** Used to identify `toStringTag` values supported by `_.clone`. */
var cloneableTags = {};
cloneableTags[argsTag] = cloneableTags[arrayTag] =
cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] =
cloneableTags[boolTag] = cloneableTags[dateTag] =
cloneableTags[float32Tag] = cloneableTags[float64Tag] =
cloneableTags[int8Tag] = cloneableTags[int16Tag] =
cloneableTags[int32Tag] = cloneableTags[mapTag] =
cloneableTags[numberTag] = cloneableTags[objectTag] =
cloneableTags[regexpTag] = cloneableTags[setTag] =
cloneableTags[stringTag] = cloneableTags[symbolTag] =
cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] =
cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
cloneableTags[errorTag] = cloneableTags[funcTag] =
cloneableTags[weakMapTag] = false;

/**
 * The base implementation of `_.clone` and `_.cloneDeep` which tracks
 * traversed objects.
 *
 * @private
 * @param {*} value The value to clone.
 * @param {boolean} bitmask The bitmask flags.
 *  1 - Deep clone
 *  2 - Flatten inherited properties
 *  4 - Clone symbols
 * @param {Function} [customizer] The function to customize cloning.
 * @param {string} [key] The key of `value`.
 * @param {Object} [object] The parent object of `value`.
 * @param {Object} [stack] Tracks traversed objects and their clone counterparts.
 * @returns {*} Returns the cloned value.
 */
function baseClone(value, bitmask, customizer, key, object, stack) {
  var result,
      isDeep = bitmask & CLONE_DEEP_FLAG$1,
      isFlat = bitmask & CLONE_FLAT_FLAG,
      isFull = bitmask & CLONE_SYMBOLS_FLAG$1;

  if (customizer) {
    result = object ? customizer(value, key, object, stack) : customizer(value);
  }
  if (result !== undefined) {
    return result;
  }
  if (!isObject(value)) {
    return value;
  }
  var isArr = isArray(value);
  if (isArr) {
    result = initCloneArray(value);
    if (!isDeep) {
      return copyArray(value, result);
    }
  } else {
    var tag = getTag$1(value),
        isFunc = tag == funcTag || tag == genTag;

    if (isBuffer(value)) {
      return cloneBuffer(value, isDeep);
    }
    if (tag == objectTag || tag == argsTag || (isFunc && !object)) {
      result = (isFlat || isFunc) ? {} : initCloneObject(value);
      if (!isDeep) {
        return isFlat
          ? copySymbolsIn(value, baseAssignIn(result, value))
          : copySymbols(value, baseAssign(result, value));
      }
    } else {
      if (!cloneableTags[tag]) {
        return object ? value : {};
      }
      result = initCloneByTag(value, tag, isDeep);
    }
  }
  // Check for circular references and return its corresponding clone.
  stack || (stack = new Stack);
  var stacked = stack.get(value);
  if (stacked) {
    return stacked;
  }
  stack.set(value, result);

  if (isSet(value)) {
    value.forEach(function(subValue) {
      result.add(baseClone(subValue, bitmask, customizer, subValue, value, stack));
    });
  } else if (isMap(value)) {
    value.forEach(function(subValue, key) {
      result.set(key, baseClone(subValue, bitmask, customizer, key, value, stack));
    });
  }

  var keysFunc = isFull
    ? (isFlat ? getAllKeysIn : getAllKeys)
    : (isFlat ? keysIn : keys);

  var props = isArr ? undefined : keysFunc(value);
  arrayEach(props || value, function(subValue, key) {
    if (props) {
      key = subValue;
      subValue = value[key];
    }
    // Recursively populate clone (susceptible to call stack limits).
    assignValue(result, key, baseClone(subValue, bitmask, customizer, key, value, stack));
  });
  return result;
}

/** Used to compose bitmasks for cloning. */
var CLONE_DEEP_FLAG = 1;
var CLONE_SYMBOLS_FLAG = 4;

/**
 * This method is like `_.clone` except that it recursively clones `value`.
 *
 * @static
 * @memberOf _
 * @since 1.0.0
 * @category Lang
 * @param {*} value The value to recursively clone.
 * @returns {*} Returns the deep cloned value.
 * @see _.clone
 * @example
 *
 * var objects = [{ 'a': 1 }, { 'b': 2 }];
 *
 * var deep = _.cloneDeep(objects);
 * console.log(deep[0] === objects[0]);
 * // => false
 */
function cloneDeep(value) {
  return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG);
}

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};





function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var eventbus_min = createCommonjsModule(function (module, exports) {
(function(root,factory){module.exports=factory();})(commonjsGlobal,function(){var EventBusClass={};EventBusClass=function(){this.listeners={};};EventBusClass.prototype={addEventListener:function(type,callback,scope){var args=[];var numOfArgs=arguments.length;for(var i=0;i<numOfArgs;i++){args.push(arguments[i]);}args=args.length>3?args.splice(3,args.length-1):[];if(typeof this.listeners[type]!="undefined"){this.listeners[type].push({scope:scope,callback:callback,args:args});}else{this.listeners[type]=[{scope:scope,callback:callback,args:args}];}},removeEventListener:function(type,callback,scope){if(typeof this.listeners[type]!="undefined"){var numOfCallbacks=this.listeners[type].length;var newArray=[];for(var i=0;i<numOfCallbacks;i++){var listener=this.listeners[type][i];if(listener.scope==scope&&listener.callback==callback){}else{newArray.push(listener);}}this.listeners[type]=newArray;}},hasEventListener:function(type,callback,scope){if(typeof this.listeners[type]!="undefined"){var numOfCallbacks=this.listeners[type].length;if(callback===undefined&&scope===undefined){return numOfCallbacks>0}for(var i=0;i<numOfCallbacks;i++){var listener=this.listeners[type][i];if((scope?listener.scope==scope:true)&&listener.callback==callback){return true}}}return false},dispatch:function(type,target){var event={type:type,target:target};var args=[];var numOfArgs=arguments.length;for(var i=0;i<numOfArgs;i++){args.push(arguments[i]);}args=args.length>2?args.splice(2,args.length-1):[];args=[event].concat(args);if(typeof this.listeners[type]!="undefined"){var listeners=this.listeners[type].slice();var numOfCallbacks=listeners.length;for(var i=0;i<numOfCallbacks;i++){var listener=listeners[i];if(listener&&listener.callback){var concatArgs=args.concat(listener.args);listener.callback.apply(listener.scope,concatArgs);}}}},getEvents:function(){var str="";for(var type in this.listeners){var numOfCallbacks=this.listeners[type].length;for(var i=0;i<numOfCallbacks;i++){var listener=this.listeners[type][i];str+=listener.scope&&listener.scope.className?listener.scope.className:"anonymous";str+=" listen for '"+type+"'\n";}}return str}};var EventBus=new EventBusClass;return EventBus});
});



var EventBusAny = Object.freeze({
	default: eventbus_min,
	__moduleExports: eventbus_min
});

var EventBus = EventBusAny;

var IDMap = /** @class */ (function () {
    function IDMap() {
        this.data = {};
    }
    Object.defineProperty(IDMap.prototype, "count", {
        get: function () {
            return Object.keys(this.data).length;
        },
        enumerable: true,
        configurable: true
    });
    IDMap.prototype.find = function (model, key) {
        if (key === void 0) { key = null; }
        if (!key)
            key = model.storeKey;
        return this.data[key];
    };
    IDMap.prototype.findAll = function (models) {
        var _this = this;
        var records = [];
        models.forEach(function (m) {
            var found = _this.find(m);
            if (found) {
                records.push(found);
            }
        });
        return records;
    };
    IDMap.prototype.create = function (model, key) {
        model.storeKey = key;
        model.stale = false;
        this.data[key] = cloneDeep(model.attributes);
    };
    IDMap.prototype.updateOrCreate = function (model) {
        if (model.storeKey) {
            this.create(model, model.storeKey);
        }
        else {
            var key = this.keyFor(model);
            this.create(model, key);
        }
        EventBus.dispatch(model.storeKey, {}, this.data[model.storeKey]);
    };
    IDMap.prototype.destroy = function (model) {
        model.stale = true;
        delete this.data[model.storeKey];
    };
    IDMap.prototype.keyFor = function (model) {
        return model.klass.jsonapiType + "-" + model.id;
    };
    return IDMap;
}());

var deserialize = function (registry, datum, payload) {
    var deserializer = new Deserializer(registry, payload);
    return deserializer.deserialize(datum);
};
var deserializeInstance = function (instance, resource, payload, includeDirective) {
    if (includeDirective === void 0) { includeDirective = {}; }
    var deserializer = new Deserializer(instance.klass.typeRegistry, payload);
    return deserializer.deserializeInstance(instance, resource, includeDirective);
};
var Deserializer = /** @class */ (function () {
    function Deserializer(registry, payload) {
        this._deserialized = [];
        this._resources = [];
        this.registry = registry;
        this.payload = payload;
        this.addResources(payload.data);
        this.addResources(payload.included);
    }
    Deserializer.prototype.addResources = function (data) {
        if (!data) {
            return;
        }
        if (Array.isArray(data)) {
            for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
                var datum = data_1[_i];
                this._resources.push(datum);
            }
        }
        else {
            this._resources.push(data);
        }
    };
    Deserializer.prototype.instanceFor = function (type) {
        var klass = this.registry.get(type);
        if (!klass) {
            throw new Error("Unknown type \"" + type + "\"");
        }
        return new klass();
    };
    Deserializer.prototype.relationshipInstanceFor = function (datum, records) {
        var record = records.find(function (r) {
            return !!(r.klass.jsonapiType === datum.type &&
                ((r.id && datum.id && r.id === datum.id) ||
                    (r.temp_id && datum["temp-id"] && r.temp_id === datum["temp-id"])));
        });
        if (!record) {
            record = this.instanceFor(datum.type);
        }
        return record;
    };
    // todo null temp id
    Deserializer.prototype.lookupAssociated = function (recordSet, record) {
        return recordSet.find(function (r) {
            return !!(r.klass.jsonapiType === record.klass.jsonapiType &&
                ((r.temp_id && record.temp_id && r.temp_id === record.temp_id) ||
                    (r.id && record.id && r.id === record.id)));
        });
    };
    Deserializer.prototype.pushRelation = function (model, associationName, record) {
        var modelIdx = model;
        var associationRecords = modelIdx[associationName];
        var existingInstance = this.lookupAssociated(associationRecords, record);
        if (!existingInstance) {
            modelIdx[associationName].push(record);
        }
    };
    Deserializer.prototype.deserialize = function (datum) {
        var instance = this.instanceFor(datum.type);
        return this.deserializeInstance(instance, datum, {});
    };
    Deserializer.prototype.deserializeInstance = function (instance, datum, includeDirective) {
        if (includeDirective === void 0) { includeDirective = {}; }
        var existing = this.alreadyDeserialized(datum);
        if (existing) {
            return existing;
        }
        // assign ids
        instance.id = datum.id;
        instance.temp_id = datum["temp-id"];
        // assign attrs
        instance.assignAttributes(datum.attributes);
        // assign links
        instance.assignLinks(datum.links);
        // assign meta
        instance.setMeta(datum.meta, false);
        // so we don't double-process the same thing
        // must push before relationships
        this._deserialized.push(instance);
        this._processRelationships(instance, datum.relationships || {}, includeDirective);
        // remove objects marked for destruction
        this._removeDeletions(instance, includeDirective);
        // came from server, must be persisted
        instance.isPersisted = true;
        instance.reset();
        return instance;
    };
    Deserializer.prototype._removeDeletions = function (model, includeDirective) {
        var _this = this;
        Object.keys(includeDirective).forEach(function (key) {
            var modelIdx = model;
            var relatedObjects = modelIdx[key];
            if (relatedObjects) {
                if (Array.isArray(relatedObjects)) {
                    relatedObjects.forEach(function (relatedObject, index) {
                        if (relatedObject.isMarkedForDestruction) {
                            modelIdx.klass.store.destroy(relatedObject);
                        }
                        else if (relatedObject.isMarkedForDisassociation) {
                            modelIdx[key].splice(index, 1);
                        }
                        else {
                            _this._removeDeletions(relatedObject, includeDirective[key] || {});
                        }
                    });
                }
                else {
                    var relatedObject = relatedObjects;
                    if (relatedObject.isMarkedForDestruction) {
                        modelIdx.klass.store.destroy(relatedObject);
                    }
                    else if (relatedObject.isMarkedForDisassociation) {
                        modelIdx[key] = null;
                    }
                    else {
                        _this._removeDeletions(relatedObject, includeDirective[key] || {});
                    }
                }
            }
        });
    };
    Deserializer.prototype._processRelationships = function (instance, relationships, includeDirective) {
        var _this = this;
        this._iterateValidRelationships(instance, relationships, function (relationName, relationData) {
            var nestedIncludeDirective = includeDirective[relationName];
            var instanceIdx = instance;
            if (Array.isArray(relationData)) {
                for (var _i = 0, relationData_1 = relationData; _i < relationData_1.length; _i++) {
                    var datum = relationData_1[_i];
                    var hydratedDatum = _this.findResource(datum);
                    var associationRecords = instanceIdx[relationName];
                    var relatedInstance = _this.relationshipInstanceFor(hydratedDatum, associationRecords);
                    relatedInstance = _this.deserializeInstance(relatedInstance, hydratedDatum, nestedIncludeDirective);
                    _this.pushRelation(instance, relationName, relatedInstance);
                }
            }
            else {
                var hydratedDatum = _this.findResource(relationData);
                var existing = instanceIdx[relationName];
                var associated = existing || _this.instanceFor(hydratedDatum.type);
                associated = _this.deserializeInstance(associated, hydratedDatum, nestedIncludeDirective);
                if (!existing) {
                    instanceIdx[relationName] = associated;
                }
            }
        });
    };
    Deserializer.prototype._iterateValidRelationships = function (instance, relationships, callback) {
        for (var key in relationships) {
            if (relationships.hasOwnProperty(key)) {
                var relationName = instance.klass.deserializeKey(key);
                if (instance.klass.attributeList[relationName]) {
                    var relationData = relationships[key].data;
                    if (!relationData) {
                        continue;
                    } // only links, empty, etc
                    callback(relationName, relationData);
                }
            }
        }
    };
    Deserializer.prototype.alreadyDeserialized = function (resourceIdentifier) {
        return this._deserialized.find(function (m) {
            return !!(m.klass.jsonapiType === resourceIdentifier.type &&
                ((m.id && resourceIdentifier.id && m.id === resourceIdentifier.id) ||
                    (m.temp_id &&
                        resourceIdentifier.temp_id &&
                        m.temp_id === resourceIdentifier["temp-id"])));
        });
    };
    Deserializer.prototype.findResource = function (resourceIdentifier) {
        var found = this._resources.find(function (r) {
            return !!(r.type === resourceIdentifier.type &&
                ((r.id && resourceIdentifier.id && r.id === resourceIdentifier.id) ||
                    (r["temp-id"] &&
                        resourceIdentifier["temp-id"] &&
                        r["temp-id"] === resourceIdentifier["temp-id"])));
        });
        return found || resourceIdentifier;
    };
    return Deserializer;
}());

/** `Object#toString` result references. */
var mapTag$5 = '[object Map]';
var setTag$5 = '[object Set]';

/** Used for built-in method references. */
var objectProto$13 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$10 = objectProto$13.hasOwnProperty;

/**
 * Checks if `value` is an empty object, collection, map, or set.
 *
 * Objects are considered empty if they have no own enumerable string keyed
 * properties.
 *
 * Array-like values such as `arguments` objects, arrays, buffers, strings, or
 * jQuery-like collections are considered empty if they have a `length` of `0`.
 * Similarly, maps and sets are considered empty if they have a `size` of `0`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is empty, else `false`.
 * @example
 *
 * _.isEmpty(null);
 * // => true
 *
 * _.isEmpty(true);
 * // => true
 *
 * _.isEmpty(1);
 * // => true
 *
 * _.isEmpty([1, 2, 3]);
 * // => false
 *
 * _.isEmpty({ 'a': 1 });
 * // => false
 */
function isEmpty(value) {
  if (value == null) {
    return true;
  }
  if (isArrayLike(value) &&
      (isArray(value) || typeof value == 'string' || typeof value.splice == 'function' ||
        isBuffer(value) || isTypedArray(value) || isArguments(value))) {
    return !value.length;
  }
  var tag = getTag$1(value);
  if (tag == mapTag$5 || tag == setTag$5) {
    return !value.size;
  }
  if (isPrototype(value)) {
    return !baseKeys(value).length;
  }
  for (var key in value) {
    if (hasOwnProperty$10.call(value, key)) {
      return false;
    }
  }
  return true;
}

var DirtyChecker = /** @class */ (function () {
    function DirtyChecker(model) {
        this.model = model;
    }
    // Check if we are switching persisted objects. Either:
    // * adding a new already-persisted object to a hasMany array
    // * switching an existing persisted hasOne/belongsTo object
    DirtyChecker.prototype.checkRelation = function (relationName, relatedModel) {
        var dirty = false;
        if (relatedModel.isPersisted) {
            var identifiers = this.model._originalRelationships[relationName] || [];
            var found = identifiers.find(function (ri) {
                return (JSON.stringify(ri) === JSON.stringify(relatedModel.resourceIdentifier));
            });
            if (!found) {
                dirty = true;
            }
        }
        return dirty;
    };
    // Either:
    // * attributes changed
    // * marked for destruction / disassociation
    // * not persisted (and thus must be send to server)
    // * not itself dirty, but has nested relations that are dirty
    DirtyChecker.prototype.check = function (relationships) {
        if (relationships === void 0) { relationships = {}; }
        var includeDirective = new IncludeDirective(relationships);
        var includeHash = includeDirective.toScopeObject();
        return (this._hasDirtyAttributes() ||
            this._hasDirtyRelationships(includeHash) ||
            this.model.isMarkedForDestruction ||
            this.model.isMarkedForDisassociation ||
            this._isUnpersisted());
    };
    DirtyChecker.prototype.dirtyAttributes = function () {
        var dirty = {};
        for (var _i = 0, _a = Object.keys(this.model.attributes); _i < _a.length; _i++) {
            var key = _a[_i];
            var prior = this.model._originalAttributes[key];
            var current = this.model.attributes[key];
            var attrDef = this.model.klass.attributeList[key];
            if (!this.model.isPersisted) {
                dirty[key] = [null, current];
            }
            else if (attrDef.dirtyChecker(prior, current)) {
                dirty[key] = [prior, current];
            }
        }
        return dirty;
    };
    // TODO: allow attributes == {} configurable
    DirtyChecker.prototype._isUnpersisted = function () {
        return (!this.model.isPersisted &&
            JSON.stringify(this.model.attributes) !== JSON.stringify({}));
    };
    DirtyChecker.prototype._hasDirtyAttributes = function () {
        return !isEmpty(this.dirtyAttributes());
    };
    DirtyChecker.prototype._hasDirtyRelationships = function (includeHash) {
        var _this = this;
        var dirty = false;
        this._eachRelatedObject(includeHash, function (relationName, relatedObject, nested) {
            if (relatedObject.isDirty(nested)) {
                dirty = true;
            }
            if (_this.checkRelation(relationName, relatedObject)) {
                dirty = true;
            }
        });
        return dirty;
    };
    DirtyChecker.prototype._eachRelatedObject = function (includeHash, callback) {
        var _this = this;
        Object.keys(includeHash).forEach(function (key) {
            var nested = includeHash[key];
            var relatedObjects = _this.model[key];
            if (!Array.isArray(relatedObjects)) {
                relatedObjects = [relatedObjects];
            }
            relatedObjects.forEach(function (relatedObject) {
                if (relatedObject) {
                    callback(key, relatedObject, nested);
                }
            });
        });
    };
    return DirtyChecker;
}());

var parameterize = function (obj, prefix) {
    var str = [];
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            var value = obj[key];
            if (value !== undefined && value !== null && value !== "") {
                if (prefix) {
                    key = prefix + "[" + key + "]";
                }
                if (Array.isArray(value)) {
                    value = value.map(function (v) {
                        return maybeEncode(v);
                    });
                    if (value.length > 0) {
                        str.push(key + "=" + value.join(","));
                    }
                }
                else if (typeof value === "object") {
                    str.push(parameterize(value, key));
                }
                else {
                    str.push(key + "=" + maybeEncode(value));
                }
            }
        }
    }
    // remove blanks
    str = str.filter(function (p) {
        return !!p;
    });
    return str.join("&");
};
// IE does not encode by default like other browsers
var maybeEncode = function (value) {
    var isBrowser = typeof window !== "undefined" &&
        typeof window.navigator.userAgent !== "undefined";
    var isIE = isBrowser && window.navigator.userAgent.match(/(MSIE|Trident)/);
    var isEncoded = typeof value === "string" && value.indexOf("%") !== -1;
    var shouldEncode = isBrowser && isIE && !isEncoded;
    return shouldEncode ? encodeURIComponent(value) : value;
};

var CollectionProxy = /** @class */ (function () {
    function CollectionProxy(collection, raw_json) {
        if (raw_json === void 0) { raw_json = { data: [] }; }
        this._collection = collection;
        this._raw_json = raw_json;
    }
    Object.defineProperty(CollectionProxy.prototype, "raw", {
        get: function () {
            return this._raw_json;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CollectionProxy.prototype, "data", {
        get: function () {
            return this._collection;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CollectionProxy.prototype, "meta", {
        get: function () {
            return this.raw.meta || {};
        },
        enumerable: true,
        configurable: true
    });
    return CollectionProxy;
}());

var RecordProxy = /** @class */ (function () {
    function RecordProxy(record, raw_json) {
        this._record = record;
        this._raw_json = raw_json;
    }
    Object.defineProperty(RecordProxy.prototype, "raw", {
        get: function () {
            return this._raw_json;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RecordProxy.prototype, "data", {
        get: function () {
            return this._record;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RecordProxy.prototype, "meta", {
        get: function () {
            return this.raw.meta || {};
        },
        enumerable: true,
        configurable: true
    });
    return RecordProxy;
}());

var NullProxy = /** @class */ (function () {
    function NullProxy(raw_json) {
        this._raw_json = raw_json;
    }
    Object.defineProperty(NullProxy.prototype, "raw", {
        get: function () {
            return this._raw_json;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NullProxy.prototype, "data", {
        get: function () {
            return null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NullProxy.prototype, "meta", {
        get: function () {
            return this.raw.meta || {};
        },
        enumerable: true,
        configurable: true
    });
    return NullProxy;
}());

var Scope = /** @class */ (function () {
    function Scope(model) {
        this._associations = {};
        this._pagination = {};
        this._filter = {};
        this._sort = {};
        this._fields = {};
        this._extra_fields = {};
        this._include = {};
        this._stats = {};
        this._extraParams = {};
        this._extraFetchOptions = {};
        this.model = model;
    }
    Scope.prototype.all = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._fetch(this.model.url())];
                    case 1:
                        response = (_a.sent());
                        return [2 /*return*/, this._buildCollectionResult(response)];
                }
            });
        });
    };
    Scope.prototype.find = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var json;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._fetch(this.model.url(id))];
                    case 1:
                        json = (_a.sent());
                        return [2 /*return*/, this._buildRecordResult(json)];
                }
            });
        });
    };
    Scope.prototype.first = function () {
        return __awaiter(this, void 0, void 0, function () {
            var newScope, rawResult;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        newScope = this.per(1);
                        return [4 /*yield*/, newScope._fetch(newScope.model.url())];
                    case 1:
                        rawResult = (_a.sent());
                        return [2 /*return*/, this._buildRecordResult(rawResult)];
                }
            });
        });
    };
    Scope.prototype.merge = function (obj) {
        var _this = this;
        var copy = this.copy();
        Object.keys(obj).forEach(function (k) {
            var serverCasedKey = _this.model.serializeKey(k);
            copy._associations[serverCasedKey] = obj[k];
        });
        return copy;
    };
    Scope.prototype.page = function (pageNumber) {
        var copy = this.copy();
        copy._pagination.number = pageNumber;
        return copy;
    };
    Scope.prototype.per = function (size) {
        var copy = this.copy();
        copy._pagination.size = size;
        return copy;
    };
    Scope.prototype.where = function (clause) {
        var copy = this.copy();
        clause = this._serverCasedWhereClause(clause);
        for (var key in clause) {
            if (clause.hasOwnProperty(key)) {
                copy._filter[key] = clause[key];
            }
        }
        return copy;
    };
    Scope.prototype.extraParams = function (clause) {
        var copy = this.copy();
        for (var key in clause) {
            if (clause.hasOwnProperty(key)) {
                copy._extraParams[key] = clause[key];
            }
        }
        return copy;
    };
    Scope.prototype.stats = function (clause) {
        var copy = this.copy();
        clause = this._serverCasedStatsClause(clause);
        for (var key in clause) {
            if (clause.hasOwnProperty(key)) {
                copy._stats[key] = clause[key];
            }
        }
        return copy;
    };
    Scope.prototype.order = function (clause) {
        var copy = this.copy();
        clause = this._serverCasedOrderClause(clause);
        if (typeof clause === "object") {
            for (var key in clause) {
                if (clause.hasOwnProperty(key)) {
                    copy._sort[key] = clause[key];
                }
            }
        }
        else {
            copy._sort[clause] = "asc";
        }
        return copy;
    };
    Scope.prototype.select = function (clause) {
        var copy = this.copy();
        clause = this._serverCasedFieldsClause(clause);
        if (Array.isArray(clause)) {
            var _clause = clause;
            var jsonapiType = this.model.jsonapiType;
            copy._fields[jsonapiType] = _clause;
        }
        else {
            for (var key in clause) {
                if (clause.hasOwnProperty(key)) {
                    copy._fields[key] = clause[key];
                }
            }
        }
        return copy;
    };
    Scope.prototype.selectExtra = function (clause) {
        var copy = this.copy();
        clause = this._serverCasedFieldsClause(clause);
        if (Array.isArray(clause)) {
            var _clause = clause;
            var jsonapiType = this.model.jsonapiType;
            copy._extra_fields[jsonapiType] = _clause;
        }
        else {
            for (var key in clause) {
                if (clause.hasOwnProperty(key)) {
                    copy._extra_fields[key] = clause[key];
                }
            }
        }
        return copy;
    };
    Scope.prototype.includes = function (clause) {
        var copy = this.copy();
        clause = this._serverCasedIncludesClause(clause);
        var directive = new IncludeDirective(clause);
        var directiveObject = directive.toScopeObject();
        for (var key in directiveObject) {
            if (directiveObject.hasOwnProperty(key)) {
                copy._include[key] = directiveObject[key];
            }
        }
        return copy;
    };
    Scope.prototype.extraFetchOptions = function (options) {
        var copy = this.copy();
        for (var key in options) {
            if (options.hasOwnProperty(key)) {
                copy._extraFetchOptions[key] = options[key];
            }
        }
        return copy;
    };
    // The `Model` class has a `scope()` method to return the scope for it.
    // This method makes it possible for methods to expect either a model or
    // a scope and reliably cast them to a scope for use via `scope()`
    Scope.prototype.scope = function () {
        return this;
    };
    Scope.prototype.asQueryParams = function () {
        var _this = this;
        var qp = {
            page: this._pagination,
            filter: this._filter,
            sort: this._sortParam(this._sort) || [],
            fields: this._fields,
            extra_fields: this._extra_fields,
            stats: this._stats,
            include: new IncludeDirective(this._include).toString()
        };
        this._mergeAssociationQueryParams(qp, this._associations);
        Object.keys(this._extraParams).forEach(function (k) {
            qp[k] = _this._extraParams[k];
        });
        return qp;
    };
    Scope.prototype.toQueryParams = function () {
        var paramString = parameterize(this.asQueryParams());
        if (paramString !== "") {
            return paramString;
        }
    };
    Scope.prototype.fetchOptions = function () {
        return __assign({}, this.model.fetchOptions(), this._extraFetchOptions);
    };
    Scope.prototype.copy = function () {
        var newScope = cloneDeep(this);
        return newScope;
    };
    // private
    Scope.prototype._mergeAssociationQueryParams = function (queryParams, associations) {
        var _this = this;
        var _loop_1 = function (key) {
            if (associations.hasOwnProperty(key)) {
                var associationScope = associations[key];
                var associationQueryParams = associationScope.asQueryParams();
                queryParams.page[key] = associationQueryParams.page;
                queryParams.filter[key] = associationQueryParams.filter;
                queryParams.stats[key] = associationQueryParams.stats;
                Object.assign(queryParams.fields, associationQueryParams.fields);
                Object.assign(queryParams.extra_fields, associationQueryParams.extra_fields);
                associationQueryParams.sort.forEach(function (s) {
                    var transformed = _this._transformAssociationSortParam(key, s);
                    queryParams.sort.push(transformed);
                });
            }
        };
        for (var key in associations) {
            _loop_1(key);
        }
    };
    Scope.prototype._transformAssociationSortParam = function (associationName, param) {
        if (param.indexOf("-") !== -1) {
            param = param.replace("-", "");
            associationName = "-" + associationName;
        }
        return associationName + "." + param;
    };
    Scope.prototype._sortParam = function (clause) {
        if (clause && Object.keys(clause).length > 0) {
            var params = [];
            for (var key in clause) {
                if (clause.hasOwnProperty(key)) {
                    if (clause[key] !== "asc") {
                        key = "-" + key;
                    }
                    params.push(key);
                }
            }
            return params;
        }
    };
    Scope.prototype._fetch = function (url) {
        return __awaiter(this, void 0, void 0, function () {
            var qp, request, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        qp = this.toQueryParams();
                        if (qp) {
                            url = url + "?" + qp;
                        }
                        request = new Request(this.model.middlewareStack, this.model.logger);
                        return [4 /*yield*/, request.get(url, this.fetchOptions())];
                    case 1:
                        response = _a.sent();
                        refreshJWT(this.model, response);
                        return [2 /*return*/, response.jsonPayload];
                }
            });
        });
    };
    Scope.prototype._buildRecordResult = function (jsonResult) {
        var record;
        var rawRecord;
        if (jsonResult.data instanceof Array) {
            rawRecord = jsonResult.data[0];
            if (!rawRecord) {
                return new NullProxy(jsonResult);
            }
        }
        else {
            rawRecord = jsonResult.data;
        }
        record = this.model.fromJsonapi(rawRecord, jsonResult);
        return new RecordProxy(record, jsonResult);
    };
    Scope.prototype._buildCollectionResult = function (jsonResult) {
        var _this = this;
        var recordArray = [];
        jsonResult.data.forEach(function (record) {
            recordArray.push(_this.model.fromJsonapi(record, jsonResult));
        });
        return new CollectionProxy(recordArray, jsonResult);
    };
    Scope.prototype._serverCasedWhereClause = function (clause) {
        return this._serverCasedClause(clause, false);
    };
    Scope.prototype._serverCasedOrderClause = function (clause) {
        if (typeof clause === "string") {
            return this._serverCasedClause(clause, true);
        }
        else {
            return this._serverCasedClause(clause, false);
        }
    };
    Scope.prototype._serverCasedFieldsClause = function (clause) {
        return this._serverCasedClause(clause, true);
    };
    Scope.prototype._serverCasedIncludesClause = function (clause) {
        return this._serverCasedClause(clause, true);
    };
    Scope.prototype._serverCasedStatsClause = function (clause) {
        return this._serverCasedClause(clause, true);
    };
    Scope.prototype._serverCasedClause = function (thing, transformValues) {
        var _this = this;
        if (transformValues === void 0) { transformValues = false; }
        if (typeof thing === "string") {
            return transformValues ? this.model.serializeKey(thing) : thing;
        }
        else if (thing instanceof Array) {
            return thing.map(function (item) { return _this._serverCasedClause(item, transformValues); });
        }
        else if (thing instanceof Object) {
            var serverCasedThing = {};
            for (var property in thing) {
                if (thing.hasOwnProperty(property)) {
                    var serverCasedProperty = this.model.serializeKey(property);
                    var serverCasedPropertyValue = this._serverCasedClause(thing[property], transformValues);
                    serverCasedThing[serverCasedProperty] = serverCasedPropertyValue;
                }
            }
            return serverCasedThing;
        }
        else {
            return thing;
        }
    };
    return Scope;
}());

var JsonapiTypeRegistry = /** @class */ (function () {
    function JsonapiTypeRegistry(base) {
        this._typeMap = {};
        this._baseClass = base;
    }
    JsonapiTypeRegistry.prototype.register = function (type, model) {
        if (this._typeMap[type]) {
            throw new Error("Type \"" + type + "\" already registered on base class " + this._baseClass);
        }
        this._typeMap[type] = model;
    };
    JsonapiTypeRegistry.prototype.get = function (type) {
        return this._typeMap[type];
    };
    return JsonapiTypeRegistry;
}());

var toString = Object.prototype.toString;

function isFunc(obj) {
  return toString.call(obj) === "[object Function]";
}

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

function icPart(str) {
  return str.split("").map(function (c) {
    return "(?:" + c.toUpperCase() + "|" + c.toLowerCase() + ")";
  }).join("");
}

function remove(arr, elem) {
  for (var i = arr.length - 1; i >= 0; i--) {
    if (arr[i] === elem) {
      Array.prototype.splice.call(arr, i, 1);
    }
  }
}

function hasProp(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key);
}

var instances = {};

var Inflector = function () {
  createClass(Inflector, null, [{
    key: "getInstance",
    value: function getInstance(locale) {
      instances[locale] = instances[locale] || new Inflector();
      return instances[locale];
    }
  }]);

  function Inflector() {
    classCallCheck(this, Inflector);

    this.plurals = [];
    this.singulars = [];
    this.uncountables = [];
    this.humans = [];
    this.acronyms = {};
    this.acronymRegex = /(?=a)b/;
  }

  createClass(Inflector, [{
    key: "acronym",
    value: function acronym(word) {
      this.acronyms[word.toLowerCase()] = word;

      var values = [];

      for (var key in this.acronyms) {
        if (hasProp(this.acronyms, key)) {
          values.push(this.acronyms[key]);
        }
      }

      this.acronymRegex = new RegExp(values.join("|"));
    }
  }, {
    key: "plural",
    value: function plural(rule, replacement) {
      if (typeof rule === "string") {
        remove(this.uncountables, rule);
      }

      remove(this.uncountables, replacement);
      this.plurals.unshift([rule, replacement]);
    }
  }, {
    key: "singular",
    value: function singular(rule, replacement) {
      if (typeof rule === "string") {
        remove(this.uncountables, rule);
      }

      remove(this.uncountables, replacement);
      this.singulars.unshift([rule, replacement]);
    }
  }, {
    key: "irregular",
    value: function irregular(singular, plural) {
      remove(this.uncountables, singular);
      remove(this.uncountables, plural);

      var s0 = singular[0];
      var sRest = singular.substr(1);

      var p0 = plural[0];
      var pRest = plural.substr(1);

      if (s0.toUpperCase() === p0.toUpperCase()) {
        this.plural(new RegExp("(" + s0 + ")" + sRest + "$", "i"), "$1" + pRest);
        this.plural(new RegExp("(" + p0 + ")" + pRest + "$", "i"), "$1" + pRest);

        this.singular(new RegExp("(" + s0 + ")" + sRest + "$", "i"), "$1" + sRest);
        this.singular(new RegExp("(" + p0 + ")" + pRest + "$", "i"), "$1" + sRest);
      } else {
        var sRestIC = icPart(sRest);
        var pRestIC = icPart(pRest);

        this.plural(new RegExp(s0.toUpperCase() + sRestIC + "$"), p0.toUpperCase() + pRest);
        this.plural(new RegExp(s0.toLowerCase() + sRestIC + "$"), p0.toLowerCase() + pRest);
        this.plural(new RegExp(p0.toUpperCase() + pRestIC + "$"), p0.toUpperCase() + pRest);
        this.plural(new RegExp(p0.toLowerCase() + pRestIC + "$"), p0.toLowerCase() + pRest);

        this.singular(new RegExp(s0.toUpperCase() + sRestIC + "$"), s0.toUpperCase() + sRest);
        this.singular(new RegExp(s0.toLowerCase() + sRestIC + "$"), s0.toLowerCase() + sRest);
        this.singular(new RegExp(p0.toUpperCase() + pRestIC + "$"), s0.toUpperCase() + sRest);
        this.singular(new RegExp(p0.toLowerCase() + pRestIC + "$"), s0.toLowerCase() + sRest);
      }
    }
  }, {
    key: "uncountable",
    value: function uncountable() {
      for (var _len = arguments.length, words = Array(_len), _key = 0; _key < _len; _key++) {
        words[_key] = arguments[_key];
      }

      this.uncountables = this.uncountables.concat(words);
    }
  }, {
    key: "human",
    value: function human(rule, replacement) {
      this.humans.unshift([rule, replacement]);
    }
  }, {
    key: "clear",
    value: function clear() {
      var scope = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "all";

      if (scope === "all") {
        this.plurals = [];
        this.singulars = [];
        this.uncountables = [];
        this.humans = [];
      } else {
        this[scope] = [];
      }
    }
  }]);
  return Inflector;
}();

function en(inflector) {
  inflector.plural(/$/, "s");
  inflector.plural(/s$/i, "s");
  inflector.plural(/^(ax|test)is$/i, "$1es");
  inflector.plural(/(octop|vir)us$/i, "$1i");
  inflector.plural(/(octop|vir)i$/i, "$1i");
  inflector.plural(/(alias|status)$/i, "$1es");
  inflector.plural(/(bu)s$/i, "$1ses");
  inflector.plural(/(buffal|tomat)o$/i, "$1oes");
  inflector.plural(/([ti])um$/i, "$1a");
  inflector.plural(/([ti])a$/i, "$1a");
  inflector.plural(/sis$/i, "ses");
  inflector.plural(/(?:([^f])fe|([lr])f)$/i, "$1$2ves");
  inflector.plural(/(hive)$/i, "$1s");
  inflector.plural(/([^aeiouy]|qu)y$/i, "$1ies");
  inflector.plural(/(x|ch|ss|sh)$/i, "$1es");
  inflector.plural(/(matr|vert|ind)(?:ix|ex)$/i, "$1ices");
  inflector.plural(/^(m|l)ouse$/i, "$1ice");
  inflector.plural(/^(m|l)ice$/i, "$1ice");
  inflector.plural(/^(ox)$/i, "$1en");
  inflector.plural(/^(oxen)$/i, "$1");
  inflector.plural(/(quiz)$/i, "$1zes");

  inflector.singular(/s$/i, "");
  inflector.singular(/(ss)$/i, "$1");
  inflector.singular(/(n)ews$/i, "$1ews");
  inflector.singular(/([ti])a$/i, "$1um");
  inflector.singular(/((a)naly|(b)a|(d)iagno|(p)arenthe|(p)rogno|(s)ynop|(t)he)(sis|ses)$/i, "$1sis");
  inflector.singular(/(^analy)(sis|ses)$/i, "$1sis");
  inflector.singular(/([^f])ves$/i, "$1fe");
  inflector.singular(/(hive)s$/i, "$1");
  inflector.singular(/(tive)s$/i, "$1");
  inflector.singular(/([lr])ves$/i, "$1f");
  inflector.singular(/([^aeiouy]|qu)ies$/i, "$1y");
  inflector.singular(/(s)eries$/i, "$1eries");
  inflector.singular(/(m)ovies$/i, "$1ovie");
  inflector.singular(/(x|ch|ss|sh)es$/i, "$1");
  inflector.singular(/^(m|l)ice$/i, "$1ouse");
  inflector.singular(/(bus)(es)?$/i, "$1");
  inflector.singular(/(o)es$/i, "$1");
  inflector.singular(/(shoe)s$/i, "$1");
  inflector.singular(/(cris|test)(is|es)$/i, "$1is");
  inflector.singular(/^(a)x[ie]s$/i, "$1xis");
  inflector.singular(/(octop|vir)(us|i)$/i, "$1us");
  inflector.singular(/(alias|status)(es)?$/i, "$1");
  inflector.singular(/^(ox)en/i, "$1");
  inflector.singular(/(vert|ind)ices$/i, "$1ex");
  inflector.singular(/(matr)ices$/i, "$1ix");
  inflector.singular(/(quiz)zes$/i, "$1");
  inflector.singular(/(database)s$/i, "$1");

  inflector.irregular("person", "people");
  inflector.irregular("man", "men");
  inflector.irregular("child", "children");
  inflector.irregular("sex", "sexes");
  inflector.irregular("move", "moves");
  inflector.irregular("zombie", "zombies");

  inflector.uncountable("equipment", "information", "rice", "money", "species", "series", "fish", "sheep", "jeans", "police");
}

var defaults$1 = {
  en: en
};

function inflections(locale, fn) {
  if (isFunc(locale)) {
    fn = locale;
    locale = null;
  }

  locale = locale || "en";

  if (fn) {
    fn(Inflector.getInstance(locale));
  } else {
    return Inflector.getInstance(locale);
  }
}

for (var locale in defaults$1) {
  inflections(locale, defaults$1[locale]);
}

function applyInflections(word, rules) {
  var result = "" + word,
      rule,
      regex,
      replacement;

  if (result.length === 0) {
    return result;
  } else {
    var match = result.toLowerCase().match(/\b\w+$/);

    if (match && inflections().uncountables.indexOf(match[0]) > -1) {
      return result;
    } else {
      for (var i = 0, ii = rules.length; i < ii; i++) {
        rule = rules[i];

        regex = rule[0];
        replacement = rule[1];

        if (result.match(regex)) {
          result = result.replace(regex, replacement);
          break;
        }
      }

      return result;
    }
  }
}

function pluralize(word) {
  var locale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "en";

  return applyInflections(word, inflections(locale).plurals);
}

function capitalize(str) {
  var result = str === null || str === undefined ? "" : String(str);
  return result.charAt(0).toUpperCase() + result.slice(1);
}

function camelize(term, uppercaseFirstLetter) {
  if (uppercaseFirstLetter === null || uppercaseFirstLetter === undefined) {
    uppercaseFirstLetter = true;
  }

  var result = "" + term;

  if (uppercaseFirstLetter) {
    result = result.replace(/^[a-z\d]*/, function (a) {
      return inflections().acronyms[a] || capitalize(a);
    });
  } else {
    result = result.replace(new RegExp("^(?:" + inflections().acronymRegex.source + "(?=\\b|[A-Z_])|\\w)"), function (a) {
      return a.toLowerCase();
    });
  }

  result = result.replace(/(?:_|(\/))([a-z\d]*)/gi, function (match, a, b, idx, string) {
    a || (a = "");
    return "" + a + (inflections().acronyms[b] || capitalize(b));
  });

  return result;
}

function underscore(camelCasedWord) {
  var result = "" + camelCasedWord;

  result = result.replace(new RegExp("(?:([A-Za-z\\d])|^)(" + inflections().acronymRegex.source + ")(?=\\b|[^a-z])", "g"), function (match, $1, $2) {
    return "" + ($1 || "") + ($1 ? "_" : "") + $2.toLowerCase();
  });

  result = result.replace(/([A-Z\d]+)([A-Z][a-z])/g, "$1_$2");
  result = result.replace(/([a-z\d])([A-Z])/g, "$1_$2");
  result = result.replace(/-/g, "_");

  return result.toLowerCase();
}

function dasherize(underscoredWord) {
  return underscoredWord.replace(/_/g, "-");
}

// prettier-ignore
var DEFAULT_APPROXIMATIONS = {
  'À': 'A', 'Á': 'A', 'Â': 'A', 'Ã': 'A', 'Ä': 'A', 'Å': 'A', 'Æ': 'AE',
  'Ç': 'C', 'È': 'E', 'É': 'E', 'Ê': 'E', 'Ë': 'E', 'Ì': 'I', 'Í': 'I',
  'Î': 'I', 'Ï': 'I', 'Ð': 'D', 'Ñ': 'N', 'Ò': 'O', 'Ó': 'O', 'Ô': 'O',
  'Õ': 'O', 'Ö': 'O', '×': 'x', 'Ø': 'O', 'Ù': 'U', 'Ú': 'U', 'Û': 'U',
  'Ü': 'U', 'Ý': 'Y', 'Þ': 'Th', 'ß': 'ss', 'à': 'a', 'á': 'a', 'â': 'a',
  'ã': 'a', 'ä': 'a', 'å': 'a', 'æ': 'ae', 'ç': 'c', 'è': 'e', 'é': 'e',
  'ê': 'e', 'ë': 'e', 'ì': 'i', 'í': 'i', 'î': 'i', 'ï': 'i', 'ð': 'd',
  'ñ': 'n', 'ò': 'o', 'ó': 'o', 'ô': 'o', 'õ': 'o', 'ö': 'o', 'ø': 'o',
  'ù': 'u', 'ú': 'u', 'û': 'u', 'ü': 'u', 'ý': 'y', 'þ': 'th', 'ÿ': 'y',
  'Ā': 'A', 'ā': 'a', 'Ă': 'A', 'ă': 'a', 'Ą': 'A', 'ą': 'a', 'Ć': 'C',
  'ć': 'c', 'Ĉ': 'C', 'ĉ': 'c', 'Ċ': 'C', 'ċ': 'c', 'Č': 'C', 'č': 'c',
  'Ď': 'D', 'ď': 'd', 'Đ': 'D', 'đ': 'd', 'Ē': 'E', 'ē': 'e', 'Ĕ': 'E',
  'ĕ': 'e', 'Ė': 'E', 'ė': 'e', 'Ę': 'E', 'ę': 'e', 'Ě': 'E', 'ě': 'e',
  'Ĝ': 'G', 'ĝ': 'g', 'Ğ': 'G', 'ğ': 'g', 'Ġ': 'G', 'ġ': 'g', 'Ģ': 'G',
  'ģ': 'g', 'Ĥ': 'H', 'ĥ': 'h', 'Ħ': 'H', 'ħ': 'h', 'Ĩ': 'I', 'ĩ': 'i',
  'Ī': 'I', 'ī': 'i', 'Ĭ': 'I', 'ĭ': 'i', 'Į': 'I', 'į': 'i', 'İ': 'I',
  'ı': 'i', 'Ĳ': 'IJ', 'ĳ': 'ij', 'Ĵ': 'J', 'ĵ': 'j', 'Ķ': 'K', 'ķ': 'k',
  'ĸ': 'k', 'Ĺ': 'L', 'ĺ': 'l', 'Ļ': 'L', 'ļ': 'l', 'Ľ': 'L', 'ľ': 'l',
  'Ŀ': 'L', 'ŀ': 'l', 'Ł': 'L', 'ł': 'l', 'Ń': 'N', 'ń': 'n', 'Ņ': 'N',
  'ņ': 'n', 'Ň': 'N', 'ň': 'n', 'ŉ': '\'n', 'Ŋ': 'NG', 'ŋ': 'ng',
  'Ō': 'O', 'ō': 'o', 'Ŏ': 'O', 'ŏ': 'o', 'Ő': 'O', 'ő': 'o', 'Œ': 'OE',
  'œ': 'oe', 'Ŕ': 'R', 'ŕ': 'r', 'Ŗ': 'R', 'ŗ': 'r', 'Ř': 'R', 'ř': 'r',
  'Ś': 'S', 'ś': 's', 'Ŝ': 'S', 'ŝ': 's', 'Ş': 'S', 'ş': 's', 'Š': 'S',
  'š': 's', 'Ţ': 'T', 'ţ': 't', 'Ť': 'T', 'ť': 't', 'Ŧ': 'T', 'ŧ': 't',
  'Ũ': 'U', 'ũ': 'u', 'Ū': 'U', 'ū': 'u', 'Ŭ': 'U', 'ŭ': 'u', 'Ů': 'U',
  'ů': 'u', 'Ű': 'U', 'ű': 'u', 'Ų': 'U', 'ų': 'u', 'Ŵ': 'W', 'ŵ': 'w',
  'Ŷ': 'Y', 'ŷ': 'y', 'Ÿ': 'Y', 'Ź': 'Z', 'ź': 'z', 'Ż': 'Z', 'ż': 'z',
  'Ž': 'Z', 'ž': 'z',
  'А': 'A', 'Б': 'B', 'В': 'V', 'Г': 'G', 'Д': 'D', 'Е': 'E', 'Ё': 'E',
  'Ж': 'ZH', 'З': 'Z', 'И': 'I', 'Й': 'J', 'К': 'K', 'Л': 'L', 'М': 'M',
  'Н': 'N', 'О': 'O', 'П': 'P', 'Р': 'R', 'С': 'S', 'Т': 'T', 'У': 'U',
  'Ф': 'F', 'Х': 'KH', 'Ц': 'C', 'Ч': 'CH', 'Ш': 'SH', 'Щ': 'SHCH',
  'Ъ': '', 'Ы': 'Y', 'Ь': '', 'Э': 'E', 'Ю': 'YU', 'Я': 'YA',
  'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'e',
  'ж': 'zh', 'з': 'z', 'и': 'i', 'й': 'j', 'к': 'k', 'л': 'l', 'м': 'm',
  'н': 'n', 'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u',
  'ф': 'f', 'х': 'kh', 'ц': 'c', 'ч': 'ch', 'ш': 'sh', 'щ': 'shch',
  'ъ': '', 'ы': 'y', 'ь': '', 'э': 'e', 'ю': 'yu', 'я': 'ya'
};

var DEFAULT_REPLACEMENT_CHAR = "?";

var instances$1 = {};

var Transliterator = function () {
  createClass(Transliterator, null, [{
    key: 'getInstance',
    value: function getInstance(locale) {
      instances$1[locale] = instances$1[locale] || new Transliterator();
      return instances$1[locale];
    }
  }]);

  function Transliterator() {
    classCallCheck(this, Transliterator);

    this.approximations = {};

    for (var char in DEFAULT_APPROXIMATIONS) {
      this.approximate(char, DEFAULT_APPROXIMATIONS[char]);
    }
  }

  createClass(Transliterator, [{
    key: 'approximate',
    value: function approximate(char, replacement) {
      this.approximations[char] = replacement;
    }
  }, {
    key: 'transliterate',
    value: function transliterate(string, replacement) {
      var _this = this;

      return string.replace(/[^\u0000-\u007f]/g, function (c) {
        return _this.approximations[c] || replacement || DEFAULT_REPLACEMENT_CHAR;
      });
    }
  }]);
  return Transliterator;
}();

/* tslint:disable:no-console */
var LogLevel;
(function (LogLevel) {
    LogLevel[LogLevel["debug"] = 1] = "debug";
    LogLevel[LogLevel["info"] = 2] = "info";
    LogLevel[LogLevel["warn"] = 3] = "warn";
    LogLevel[LogLevel["error"] = 4] = "error";
})(LogLevel || (LogLevel = {}));
var LOG_LEVELS = {
    debug: 1,
    info: 2,
    warn: 3,
    error: 4
};
var Logger = /** @class */ (function () {
    function Logger(level) {
        if (level === void 0) { level = "warn"; }
        this._level = LogLevel.info;
        if (typeof level === "number") {
            this._level = level;
        }
        else {
            this.level = level;
        }
    }
    Logger.prototype.debug = function (stmt) {
        if (this._level <= LogLevel.debug) {
            console.info(stmt);
        }
    };
    Logger.prototype.info = function (stmt) {
        if (this._level <= LogLevel.info) {
            console.info(stmt);
        }
    };
    Logger.prototype.warn = function (stmt) {
        if (this._level <= LogLevel.warn) {
            console.warn(stmt);
        }
    };
    Logger.prototype.error = function (stmt) {
        if (this._level <= LogLevel.warn) {
            console.error(stmt);
        }
    };
    Object.defineProperty(Logger.prototype, "level", {
        get: function () {
            var key;
            for (key in LogLevel) {
                if (LogLevel.hasOwnProperty(key)) {
                    var val = LogLevel[key];
                    if (val === this._level) {
                        return key;
                    }
                }
            }
            throw new Error("Invalid log level: " + this._level);
        },
        set: function (value) {
            var lvlValue = LogLevel[value];
            if (lvlValue) {
                this._level = lvlValue;
            }
            else {
                throw new Error("Log level must be one of " + Object.keys(LOG_LEVELS).join(", "));
            }
        },
        enumerable: true,
        configurable: true
    });
    return Logger;
}());
var logger = new Logger();

function asyncForEach(array, callback) {
    return __awaiter(this, void 0, void 0, function () {
        var index;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    index = 0;
                    _a.label = 1;
                case 1:
                    if (!(index < array.length)) return [3 /*break*/, 4];
                    return [4 /*yield*/, callback(array[index], index, array)];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    index += 1;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/];
            }
        });
    });
}
var MiddlewareStack = /** @class */ (function () {
    function MiddlewareStack(before, after) {
        if (before === void 0) { before = []; }
        if (after === void 0) { after = []; }
        this._beforeFilters = [];
        this._afterFilters = [];
        this._beforeFilters = before;
        this._afterFilters = after;
    }
    Object.defineProperty(MiddlewareStack.prototype, "beforeFilters", {
        get: function () {
            return this._beforeFilters;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MiddlewareStack.prototype, "afterFilters", {
        get: function () {
            return this._afterFilters;
        },
        enumerable: true,
        configurable: true
    });
    MiddlewareStack.prototype.beforeFetch = function (requestUrl, options) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, asyncForEach(this._beforeFilters, function (filter) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, filter(requestUrl, options)];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    MiddlewareStack.prototype.afterFetch = function (response, json) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, asyncForEach(this._afterFilters, function (filter) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, filter(response, json)];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return MiddlewareStack;
}());

var nonenumerable = function (target, key) {
    // first property defined in prototype, that's why we use getters/setters
    // (otherwise assignment in object will override property in prototype)
    Object.defineProperty(target, key, {
        get: function () {
            return undefined;
        },
        set: function (val) {
            // here we have reference to instance and can set property directly to it
            Object.defineProperty(this, key, {
                value: val,
                writable: true,
                configurable: true,
                enumerable: false
            });
        },
        configurable: true,
        enumerable: false
    });
};

var applyModelConfig = function (ModelClass, config) {
    var k;
    config = __assign({}, config); // clone since we're going to mutate it
    // Handle all JWT configuration at once since it's run-order dependent
    // We'll delete each key we encounter then pass the rest off to
    // a loop for assigning other arbitrary options
    if (config.credentialStorageBackend) {
        ModelClass.credentialStorageBackend = config.credentialStorageBackend;
        delete config.jwtStorage;
    }
    if (config.jwtStorage) {
        ModelClass.jwtStorage = config.jwtStorage;
        delete config.jwtStorage;
    }
    if (config.jwt) {
        ModelClass.setJWT(config.jwt);
        delete config.jwt;
    }
    for (k in config) {
        if (config.hasOwnProperty(k)) {
            ModelClass[k] = config[k];
        }
    }
    if (ModelClass.isBaseClass === undefined) {
        ModelClass.setAsBase();
    }
    else if (ModelClass.isBaseClass === true) {
        ModelClass.isBaseClass = false;
    }
};
var SpraypaintBase = /** @class */ (function () {
    function SpraypaintBase(attrs) {
        this.stale = false;
        this.storeKey = "";
        this.relationships = {};
        this._persisted = false;
        this._markedForDestruction = false;
        this._markedForDisassociation = false;
        this._originalRelationships = {};
        this._metaDirty = false;
        this._errors = {};
        this._initializeAttributes();
        this._initializeLinks();
        this.assignAttributes(attrs);
        this._originalAttributes = cloneDeep(this._attributes);
        this._originalLinks = cloneDeep(this._links);
        this._originalRelationships = this.relationshipResourceIdentifiers(Object.keys(this.relationships));
    }
    Object.defineProperty(SpraypaintBase, "credentialStorage", {
        get: function () {
            return this._credentialStorage;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SpraypaintBase, "jwtStorage", {
        get: function () {
            return this._jwtStorage;
        },
        set: function (val) {
            if (val !== this._jwtStorage) {
                this._jwtStorage = val;
                this.credentialStorageBackend = this._credentialStorageBackend;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SpraypaintBase, "credentialStorageBackend", {
        get: function () {
            return this._credentialStorageBackend;
        },
        set: function (backend) {
            this._credentialStorageBackend = backend;
            this._credentialStorage = new CredentialStorage(this.jwtStorage || "jwt", this._credentialStorageBackend);
        },
        enumerable: true,
        configurable: true
    });
    SpraypaintBase.initializeCredentialStorage = function () {
        if (this.jwtStorage && typeof localStorage !== "undefined") {
            this.credentialStorageBackend = localStorage;
        }
        else {
            this.credentialStorageBackend = new InMemoryStorageBackend();
        }
    };
    SpraypaintBase.fromJsonapi = function (resource, payload) {
        return deserialize(this.typeRegistry, resource, payload);
    };
    SpraypaintBase.inherited = function (subclass) {
        subclass.parentClass = this;
        subclass.currentClass = subclass;
        subclass.prototype.klass = subclass;
        subclass.attributeList = cloneDeep(subclass.attributeList);
        subclass.linkList = cloneDeep(subclass.linkList);
    };
    SpraypaintBase.setAsBase = function () {
        this.isBaseClass = true;
        this.jsonapiType = undefined;
        if (!this.typeRegistry) {
            this.typeRegistry = new JsonapiTypeRegistry(this);
        }
        if (!this.middlewareStack) {
            this._middlewareStack = new MiddlewareStack();
        }
        if (!this._IDMap) {
            this._IDMap = new IDMap();
        }
    };
    SpraypaintBase.isSubclassOf = function (maybeSuper) {
        var current = this.currentClass;
        while (current) {
            if (current === maybeSuper) {
                return true;
            }
            current = current.parentClass;
        }
        return false;
    };
    Object.defineProperty(SpraypaintBase, "baseClass", {
        get: function () {
            var current = this.currentClass;
            while (current) {
                if (current.isBaseClass) {
                    return current;
                }
                current = current.parentClass;
            }
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SpraypaintBase, "store", {
        get: function () {
            if (this.baseClass === undefined) {
                throw new Error("No base class for " + this.name);
            }
            return this.baseClass._IDMap;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SpraypaintBase, "typeRegistry", {
        get: function () {
            if (this.baseClass === undefined) {
                throw new Error("No base class for " + this.name);
            }
            return this.baseClass._typeRegistry;
        },
        set: function (registry) {
            if (!this.isBaseClass) {
                throw new Error("Cannot set a registry on a non-base class");
            }
            this._typeRegistry = registry;
        },
        enumerable: true,
        configurable: true
    });
    SpraypaintBase.registerType = function () {
        if (!this.jsonapiType) {
            return;
        }
        var existingType = this.typeRegistry.get(this.jsonapiType);
        if (existingType) {
            // Don't try to register a type of we're looking
            // at a subclass. Otherwise we'll make a register
            // call which will fail in order to get a helpful
            // error message from the registry
            if (this.isSubclassOf(existingType)) {
                return;
            }
        }
        this.typeRegistry.register(this.jsonapiType, this);
    };
    SpraypaintBase.extend = function (options) {
        var Subclass = /** @class */ (function (_super) {
            __extends(Subclass, _super);
            function Subclass() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return Subclass;
        }((this)));
        this.inherited(Subclass);
        var attrs = {};
        if (options.attrs) {
            for (var key in options.attrs) {
                if (options.attrs.hasOwnProperty(key)) {
                    var attr = options.attrs[key];
                    if (!attr.name) {
                        attr.name = key;
                    }
                    attr.owner = Subclass;
                    attrs[key] = attr;
                }
            }
        }
        Subclass.attributeList = Object.assign({}, Subclass.attributeList, attrs);
        Subclass.linkList = Subclass.linkList.slice();
        applyModelConfig(Subclass, options.static || {});
        Subclass.registerType();
        if (options.methods) {
            for (var methodName in options.methods) {
                if (options.methods.hasOwnProperty(methodName)) {
                    
                    Subclass.prototype[methodName] = options.methods[methodName];
                }
            }
        }
        return Subclass;
    };
    SpraypaintBase.prototype._initializeAttributes = function () {
        this._attributes = {};
        this._copyPrototypeDescriptors();
    };
    SpraypaintBase.prototype._initializeLinks = function () {
        this._links = {};
    };
    /*
     * VueJS, along with a few other frameworks rely on objects being "reactive". In practice, this
     * means that when passing an object into an context where you would need change detection, vue
     * will inspect it for any enumerable properties that exist and might be depended on in templates
     * and other functions that will trigger changes.  In the case of vue, it intentionally avoids
     * resolving properties on the prototype chain and instead determines which it should override
     * using `Object.hasOwnProperty()`.  To get proper observability, we need to move all attribute
     * methods plus a few other utility getters to the object itself.
     */
    SpraypaintBase.prototype._copyPrototypeDescriptors = function () {
        var _this = this;
        var attrs = this.klass.attributeList;
        for (var key in attrs) {
            if (attrs.hasOwnProperty(key)) {
                var attr = attrs[key];
                Object.defineProperty(this, key, attr.descriptor());
            }
        }
        
        [
            "errors",
            "isPersisted",
            "isMarkedForDestruction",
            "isMarkedForDisassociation"
        ].forEach(function (property) {
            var descriptor = Object.getOwnPropertyDescriptor(SpraypaintBase.prototype, property);
            if (descriptor) {
                Object.defineProperty(_this, property, descriptor);
            }
        });
    };
    SpraypaintBase.prototype.isType = function (jsonapiType) {
        return this.klass.jsonapiType === jsonapiType;
    };
    Object.defineProperty(SpraypaintBase.prototype, "isPersisted", {
        get: function () {
            return this._persisted;
        },
        set: function (val) {
            this._persisted = val;
            if (val)
                this.reset();
        },
        enumerable: true,
        configurable: true
    });
    SpraypaintBase.prototype.onSyncRelationships = function () {
        var _this = this;
        if (this._onSyncRelationships)
            return this._onSyncRelationships;
        this._onSyncRelationships = function (event, relationships) {
            _this.relationships = relationships;
        };
        return this._onSyncRelationships;
    };
    SpraypaintBase.prototype.onStoreChange = function () {
        var _this = this;
        if (this._onStoreChange)
            return this._onStoreChange;
        this._onStoreChange = function (event, attrs) {
            var diff = {};
            // Update all non-dirty attributes
            Object.keys(attrs).forEach(function (k) {
                var self = _this;
                var changes = _this.changes();
                var attrDef = _this.klass.attributeList[k];
                if (attrDef.dirtyChecker(self[k], attrs[k]) && !changes[k]) {
                    diff[k] = [self[k], attrs[k]];
                    self[k] = attrs[k];
                    // ensure this property is not marked as dirty
                    self._originalAttributes[k] = attrs[k];
                }
            });
            // fire afterSync hook if applicable
            var hasDiff = Object.keys(diff).length > 0;
            if (hasDiff && typeof _this.afterSync !== "undefined") {
                _this.afterSync(diff);
            }
        };
        return this._onStoreChange;
    };
    SpraypaintBase.prototype.unlisten = function () {
        var _this = this;
        if (!this.klass.sync)
            return;
        if (this.storeKey) {
            EventBus.removeEventListener(this.storeKey, this.onStoreChange());
            EventBus.removeEventListener(this.storeKey + "-sync-relationships", this.onSyncRelationships());
        }
        Object.keys(this.relationships).forEach(function (k) {
            var related = _this.relationships[k];
            if (related) {
                if (Array.isArray(related)) {
                    related.forEach(function (r) { return r.unlisten(); });
                }
                else {
                    related.unlisten();
                }
            }
        });
    };
    SpraypaintBase.prototype.listen = function () {
        if (!this.klass.sync)
            return;
        if (!this._onStoreChange) {
            // not already registered
            EventBus.addEventListener(this.storeKey, this.onStoreChange());
            EventBus.addEventListener(this.storeKey + "-sync-relationships", this.onSyncRelationships());
        }
    };
    SpraypaintBase.prototype.syncRelationships = function () {
        EventBus.dispatch(this.storeKey + "-sync-relationships", {}, this.relationships);
    };
    SpraypaintBase.prototype.reset = function () {
        if (this.klass.sync) {
            this.klass.store.updateOrCreate(this);
            this.listen();
        }
        this._originalAttributes = cloneDeep(this._attributes);
        this._originalRelationships = this.relationshipResourceIdentifiers(Object.keys(this.relationships));
    };
    SpraypaintBase.prototype.rollback = function () {
        this._attributes = cloneDeep(this._originalAttributes);
    };
    Object.defineProperty(SpraypaintBase.prototype, "isMarkedForDestruction", {
        get: function () {
            return this._markedForDestruction;
        },
        set: function (val) {
            this._markedForDestruction = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SpraypaintBase.prototype, "isMarkedForDisassociation", {
        get: function () {
            return this._markedForDisassociation;
        },
        set: function (val) {
            this._markedForDisassociation = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SpraypaintBase.prototype, "attributes", {
        get: function () {
            return this._attributes;
        },
        set: function (attrs) {
            this._attributes = {};
            this.assignAttributes(attrs);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SpraypaintBase.prototype, "stored", {
        get: function () {
            return this.klass.store.find(this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SpraypaintBase.prototype, "typedAttributes", {
        /*
         * This is a (hopefully) temporary method for typescript users.
         *
         * Currently the attributes() setter takes an arbitrary hash which
         * may or may not include valid attributes. In non-strict mode, it
         * silently drops those that it doesn't know. This is all perfectly fine
         * from a functionality point, but it means we can't correctly type
         * the attributes() getter return object, as it must match the setter's
         * type. I propose we change the type definition to require sending
         * abitrary hashes through the assignAttributes() method instead.
         */
        get: function () {
            return this._attributes;
        },
        enumerable: true,
        configurable: true
    });
    SpraypaintBase.prototype.relationship = function (name) {
        return this.relationships[name];
    };
    SpraypaintBase.prototype.assignAttributes = function (attrs) {
        if (!attrs) {
            return;
        }
        for (var key in attrs) {
            if (attrs.hasOwnProperty(key)) {
                var attributeName = key;
                attributeName = this.klass.deserializeKey(key);
                if (key === "id" || this.klass.attributeList[attributeName]) {
                    
                    this[attributeName] = attrs[key];
                }
                else if (this.klass.strictAttributes) {
                    throw new Error("Unknown attribute: " + key);
                }
            }
        }
    };
    SpraypaintBase.prototype.setMeta = function (metaObj, markDirty) {
        if (markDirty === void 0) { markDirty = true; }
        this.__meta__ = metaObj;
        if (markDirty) {
            this._metaDirty = true;
        }
    };
    Object.defineProperty(SpraypaintBase.prototype, "meta", {
        get: function () {
            return this.__meta__ || {};
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SpraypaintBase.prototype, "isMetaDirty", {
        get: function () {
            return this._metaDirty;
        },
        enumerable: true,
        configurable: true
    });
    SpraypaintBase.prototype.relationshipResourceIdentifiers = function (relationNames) {
        return relationshipIdentifiersFor(this, relationNames);
    };
    SpraypaintBase.prototype.fromJsonapi = function (resource, payload, includeDirective) {
        if (includeDirective === void 0) { includeDirective = {}; }
        return deserializeInstance(this, resource, payload, includeDirective);
    };
    Object.defineProperty(SpraypaintBase.prototype, "resourceIdentifier", {
        get: function () {
            if (this.klass.jsonapiType === undefined) {
                throw new Error("Cannot build resource identifier for class. No JSONAPI Type specified.");
            }
            return {
                id: this.id,
                type: this.klass.jsonapiType
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SpraypaintBase.prototype, "errors", {
        get: function () {
            return this._errors;
        },
        set: function (errs) {
            this._errors = errs;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SpraypaintBase.prototype, "hasError", {
        get: function () {
            return !!Object.keys(this._errors).length;
        },
        enumerable: true,
        configurable: true
    });
    SpraypaintBase.prototype.clearErrors = function () {
        this.errors = {};
    };
    SpraypaintBase.prototype.isDirty = function (relationships) {
        var dc = new DirtyChecker(this);
        return dc.check(relationships);
    };
    SpraypaintBase.prototype.changes = function () {
        var dc = new DirtyChecker(this);
        return dc.dirtyAttributes();
    };
    SpraypaintBase.prototype.hasDirtyRelation = function (relationName, relatedModel) {
        var dc = new DirtyChecker(this);
        return !this.isPersisted || dc.checkRelation(relationName, relatedModel);
    };
    SpraypaintBase.prototype.dup = function () {
        var attrs = Object.assign({}, this.attributes, this.relationships);
        var cloned = new this.klass(attrs);
        cloned.id = this.id;
        cloned.isPersisted = this.isPersisted;
        cloned.isMarkedForDestruction = this.isMarkedForDestruction;
        cloned.isMarkedForDisassociation = this.isMarkedForDisassociation;
        cloned.errors = Object.assign({}, this.errors);
        cloned.links = Object.assign({}, this.links);
        return cloned;
    };
    /*
     *
     * Model Persistence Methods
     *
     */
    SpraypaintBase.fetchOptions = function () {
        var _a;
        var options = {
            credentials: "same-origin",
            headers: (_a = {
                    Accept: "application/vnd.api+json"
                }, _a["Content-Type"] = "application/vnd.api+json", _a)
        };
        if (this.credentials) {
            options.credentials = this.credentials;
        }
        if (this.clientApplication) {
            options.headers["Client-Application"] = this.clientApplication;
        }
        var jwt = this.getJWT();
        if (jwt) {
            options.headers.Authorization = this.generateAuthHeader(jwt);
        }
        return options;
    };
    SpraypaintBase.url = function (id) {
        var endpoint = this.endpoint || "/" + this.jsonapiType;
        var base = "" + this.fullBasePath() + endpoint;
        if (id) {
            base = base + "/" + id;
        }
        return base;
    };
    SpraypaintBase.fullBasePath = function () {
        return "" + this.baseUrl + this.apiNamespace;
    };
    Object.defineProperty(SpraypaintBase, "middlewareStack", {
        get: function () {
            if (this.baseClass) {
                var stack = this.baseClass._middlewareStack;
                // Normally we want to use the middleware stack defined on the baseClass, but in the event
                // that our subclass has overridden one or the other, we create a middleware stack that
                // replaces the normal filters with the class override.
                if (this.beforeFetch || this.afterFetch) {
                    var before_1 = this.beforeFetch
                        ? [this.beforeFetch]
                        : stack.beforeFilters;
                    var after_1 = this.afterFetch ? [this.afterFetch] : stack.afterFilters;
                    return new MiddlewareStack(before_1, after_1);
                }
                else {
                    return stack;
                }
            }
            else {
                // Shouldn't ever get here, as this should only happen on SpraypaintBase
                return new MiddlewareStack();
            }
        },
        set: function (stack) {
            this._middlewareStack = stack;
        },
        enumerable: true,
        configurable: true
    });
    SpraypaintBase.scope = function () {
        return new Scope(this);
    };
    SpraypaintBase.first = function () {
        return this.scope().first();
    };
    SpraypaintBase.all = function () {
        return this.scope().all();
    };
    SpraypaintBase.find = function (id) {
        return this.scope().find(id);
    };
    SpraypaintBase.where = function (clause) {
        return this.scope().where(clause);
    };
    SpraypaintBase.page = function (pageNum) {
        return this.scope().page(pageNum);
    };
    SpraypaintBase.per = function (size) {
        return this.scope().per(size);
    };
    SpraypaintBase.extraParams = function (clause) {
        return this.scope().extraParams(clause);
    };
    SpraypaintBase.extraFetchOptions = function (options) {
        return this.scope().extraFetchOptions(options);
    };
    SpraypaintBase.order = function (clause) {
        return this.scope().order(clause);
    };
    SpraypaintBase.select = function (clause) {
        return this.scope().select(clause);
    };
    SpraypaintBase.selectExtra = function (clause) {
        return this.scope().selectExtra(clause);
    };
    SpraypaintBase.stats = function (clause) {
        return this.scope().stats(clause);
    };
    SpraypaintBase.includes = function (clause) {
        return this.scope().includes(clause);
    };
    SpraypaintBase.merge = function (obj) {
        return this.scope().merge(obj);
    };
    SpraypaintBase.setJWT = function (token) {
        this.credentialStorage.setJWT(token);
    };
    SpraypaintBase.getJWT = function () {
        return this.credentialStorage.getJWT();
    };
    Object.defineProperty(SpraypaintBase, "jwt", {
        get: function () {
            return this.getJWT();
        },
        set: function (token) {
            this.setJWT(token);
        },
        enumerable: true,
        configurable: true
    });
    SpraypaintBase.generateAuthHeader = function (jwt) {
        return "Token token=\"" + jwt + "\"";
    };
    SpraypaintBase.getJWTOwner = function () {
        this.logger.warn("SpraypaintBase#getJWTOwner() is deprecated. Use #baseClass property instead");
        return this.baseClass;
    };
    SpraypaintBase.serializeKey = function (key) {
        switch (this.keyCase.server) {
            case "dash": {
                return dasherize(underscore(key));
            }
            case "snake": {
                return underscore(key);
            }
            case "camel": {
                return camelize(underscore(key), false);
            }
        }
    };
    SpraypaintBase.deserializeKey = function (key) {
        switch (this.keyCase.client) {
            case "dash": {
                return dasherize(underscore(key));
            }
            case "snake": {
                return underscore(key);
            }
            case "camel": {
                return camelize(underscore(key), false);
            }
        }
    };
    SpraypaintBase.prototype.destroy = function () {
        return __awaiter(this, void 0, void 0, function () {
            var url, verb, request, response, err_1, base;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = this.klass.url(this.id);
                        
                        request = new Request(this._middleware(), this.klass.logger);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, request.delete(url, this._fetchOptions())];
                    case 2:
                        response = _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _a.sent();
                        throw err_1;
                    case 4:
                        if (!(response.status === 202)) return [3 /*break*/, 6];
                        return [4 /*yield*/, this._handleAcceptedResponse(response, this.onDeferredDestroy)];
                    case 5: return [2 /*return*/, _a.sent()];
                    case 6:
                        base = this.klass.baseClass;
                        base.store.destroy(this);
                        return [4 /*yield*/, this._handleResponse(response, function () {
                                _this.isPersisted = false;
                            })];
                    case 7: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    SpraypaintBase.prototype.save = function (options) {
        if (options === void 0) { options = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var url, verb, request, payload, response, scope, json, err_2;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = this.klass.url();
                        verb = "post";
                        request = new Request(this._middleware(), this.klass.logger, {
                            patchAsPost: this.klass.patchAsPost
                        });
                        payload = new WritePayload(this, options.with);
                        if (this.isPersisted) {
                            url = this.klass.url(this.id);
                            verb = "patch";
                        }
                        if (options.returnScope) {
                            scope = options.returnScope;
                            if (scope.model !== this.klass) {
                                throw new Error("returnScope must be a scope of type Scope<" + this.klass.name + ">");
                            }
                            url = url + "?" + scope.toQueryParams();
                        }
                        this.clearErrors();
                        json = payload.asJSON();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, request[verb](url, json, this._fetchOptions())];
                    case 2:
                        response = _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        err_2 = _a.sent();
                        throw err_2;
                    case 4:
                        if (!(response.status === 202 || response.status === 204)) return [3 /*break*/, 6];
                        return [4 /*yield*/, this._handleAcceptedResponse(response, this.onDeferredUpdate)];
                    case 5: return [2 /*return*/, _a.sent()];
                    case 6: return [4 /*yield*/, this._handleResponse(response, function () {
                            _this.fromJsonapi(response.jsonPayload.data, response.jsonPayload, payload.includeDirective);
                            payload.postProcess();
                        })];
                    case 7: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    SpraypaintBase.prototype._handleAcceptedResponse = function (response, callback) {
        return __awaiter(this, void 0, void 0, function () {
            var responseObject;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (response.jsonPayload && callback) {
                            responseObject = this.klass.fromJsonapi(response.jsonPayload.data, response.jsonPayload);
                            callback(responseObject);
                        }
                        return [4 /*yield*/, this._handleResponse(response, function () { })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    SpraypaintBase.prototype._handleResponse = function (response, callback) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                refreshJWT(this.klass, response);
                if (response.status === 422) {
                    try {
                        ValidationErrorBuilder.apply(this, response.jsonPayload);
                    }
                    catch (e) {
                        throw new ResponseError(response, "validation failed", e);
                    }
                    return [2 /*return*/, false];
                }
                else {
                    callback();
                    return [2 /*return*/, true];
                }
                return [2 /*return*/];
            });
        });
    };
    SpraypaintBase.prototype._fetchOptions = function () {
        return this.klass.fetchOptions();
    };
    SpraypaintBase.prototype._middleware = function () {
        return this.klass.middlewareStack;
    };
    // Todo:
    // * needs to recurse the directive
    // * remove the corresponding code from isPersisted and handle here (likely
    // only an issue with test setup)
    // * Make all calls go through resetRelationTracking();
    SpraypaintBase.prototype.resetRelationTracking = function (includeDirective) {
        this._originalRelationships = this.relationshipResourceIdentifiers(Object.keys(includeDirective));
    };
    Object.defineProperty(SpraypaintBase.prototype, "links", {
        get: function () {
            return this._links;
        },
        set: function (links) {
            this._links = {};
            this.assignLinks(links);
        },
        enumerable: true,
        configurable: true
    });
    SpraypaintBase.prototype.assignLinks = function (links) {
        if (!links)
            return;
        for (var key in links) {
            var attributeName = this.klass.deserializeKey(key);
            if (this.klass.linkList.indexOf(attributeName) > -1) {
                this._links[attributeName] = links[key];
            }
        }
    };
    SpraypaintBase.baseUrl = "http://please-set-a-base-url.com";
    SpraypaintBase.apiNamespace = "/";
    SpraypaintBase.keyCase = { server: "snake", client: "camel" };
    SpraypaintBase.strictAttributes = false;
    SpraypaintBase.logger = logger;
    SpraypaintBase.sync = false;
    SpraypaintBase.clientApplication = null;
    SpraypaintBase.patchAsPost = false;
    SpraypaintBase.attributeList = {};
    SpraypaintBase.linkList = [];
    SpraypaintBase.currentClass = SpraypaintBase;
    SpraypaintBase._jwtStorage = "jwt";
    /*
     *
     * This is to allow for sane type checking in collaboration with the
     * isModelClass function exported below.  It is very hard to find out
     * whether something is a class of a certain type or subtype
     * (as opposed to an instance of that class), so we set a magic prop on
     * this for use around the codebase. For example, if you have a function:
     *
     * ``` typescript
     * function(arg : typeof SpraypaintBase | { foo : string }) {
     *   if(arg.isSpraypaintModel) {
     *     let modelClass : typeof SpraypaintBase = arg
     *   }
     * }
     * ```
     *
     */
    SpraypaintBase.isSpraypaintModel = true;
    __decorate([
        nonenumerable
    ], SpraypaintBase.prototype, "afterSync", void 0);
    __decorate([
        nonenumerable
    ], SpraypaintBase.prototype, "relationships", void 0);
    __decorate([
        nonenumerable
    ], SpraypaintBase.prototype, "klass", void 0);
    __decorate([
        nonenumerable
    ], SpraypaintBase.prototype, "_persisted", void 0);
    __decorate([
        nonenumerable
    ], SpraypaintBase.prototype, "_markedForDestruction", void 0);
    __decorate([
        nonenumerable
    ], SpraypaintBase.prototype, "_markedForDisassociation", void 0);
    __decorate([
        nonenumerable
    ], SpraypaintBase.prototype, "_originalRelationships", void 0);
    __decorate([
        nonenumerable
    ], SpraypaintBase.prototype, "_attributes", void 0);
    __decorate([
        nonenumerable
    ], SpraypaintBase.prototype, "_originalAttributes", void 0);
    __decorate([
        nonenumerable
    ], SpraypaintBase.prototype, "_links", void 0);
    __decorate([
        nonenumerable
    ], SpraypaintBase.prototype, "_originalLinks", void 0);
    __decorate([
        nonenumerable
    ], SpraypaintBase.prototype, "__meta__", void 0);
    __decorate([
        nonenumerable
    ], SpraypaintBase.prototype, "_metaDirty", void 0);
    __decorate([
        nonenumerable
    ], SpraypaintBase.prototype, "_errors", void 0);
    return SpraypaintBase;
}());
SpraypaintBase.prototype.klass = SpraypaintBase;
SpraypaintBase.initializeCredentialStorage();
var isModelClass = function (arg) {
    if (!arg) {
        return false;
    }
    return arg.currentClass && arg.currentClass.isSpraypaintModel;
};
var isModelInstance = function (arg) {
    if (!arg) {
        return false;
    }
    return isModelClass(arg.constructor.currentClass);
};

var attr = function (options) {
    if (!options) {
        options = {};
    }
    return new Attribute(options);
};
var STRICT_EQUALITY_DIRTY_CHECKER = function (prior, current) { return prior !== current; };
var Attribute = /** @class */ (function () {
    function Attribute(options) {
        this.isRelationship = false;
        this.type = undefined;
        this.persist = true;
        this.dirtyChecker = STRICT_EQUALITY_DIRTY_CHECKER;
        if (!options) {
            return;
        }
        if (options.name) {
            this.name = options.name;
        }
        if (options.type) {
            this.type = options.type;
        }
        if (options.persist !== undefined) {
            this.persist = !!options.persist;
        }
        if (options.dirtyChecker) {
            this.dirtyChecker = options.dirtyChecker;
        }
    }
    Attribute.prototype.apply = function (ModelClass) {
        Object.defineProperty(ModelClass.prototype, this.name, this.descriptor());
    };
    // The model calls this setter
    Attribute.prototype.setter = function (context, val) {
        var privateContext = context;
        privateContext._attributes[this.name] = val;
    };
    // The model calls this getter
    Attribute.prototype.getter = function (context) {
        return context.attributes[this.name];
    };
    // This returns the getters/setters for use on the *model*
    Attribute.prototype.descriptor = function () {
        var attrDef = this;
        return {
            configurable: true,
            enumerable: true,
            get: function () {
                return attrDef.getter(this);
            },
            set: function (value) {
                attrDef.setter(this, value);
            }
        };
    };
    return Attribute;
}());

var wasDestroyed = function (model) {
    if (!model.klass.sync)
        return false; // not supported if idmap is off
    return (model.isPersisted || model.stale) && !model.stored;
};
var SingleAssociationBase = /** @class */ (function (_super) {
    __extends(SingleAssociationBase, _super);
    function SingleAssociationBase(options) {
        var _this = _super.call(this, options) || this;
        _this.isRelationship = true;
        if (options.jsonapiType) {
            _this.jsonapiType = options.jsonapiType;
        }
        if (_this.type) {
            _this._klass = _this.type;
        }
        return _this;
    }
    Object.defineProperty(SingleAssociationBase.prototype, "klass", {
        get: function () {
            if (!this._klass) {
                this._klass = modelForType(this, this.jsonapiType);
            }
            return this._klass;
        },
        enumerable: true,
        configurable: true
    });
    SingleAssociationBase.prototype.getter = function (context) {
        var gotten = context.relationships[this.name];
        if (gotten && wasDestroyed(gotten)) {
            delete context.relationships[this.name];
        }
        return context.relationships[this.name];
    };
    SingleAssociationBase.prototype.setter = function (context, val) {
        if (val && !val.hasOwnProperty("isRelationship")) {
            if (!(val instanceof SpraypaintBase) && !Array.isArray(val)) {
                val = new this.klass(val);
            }
            context.relationships[this.name] = val;
        }
        else if (val === null || val === undefined) {
            context.relationships[this.name] = val;
        }
    };
    return SingleAssociationBase;
}(Attribute));
var HasMany = /** @class */ (function (_super) {
    __extends(HasMany, _super);
    function HasMany(options) {
        var _this = _super.call(this, options) || this;
        _this.isRelationship = true;
        if (options.jsonapiType) {
            _this.jsonapiType = options.jsonapiType;
        }
        if (_this.type) {
            _this._klass = _this.type;
        }
        return _this;
    }
    Object.defineProperty(HasMany.prototype, "klass", {
        get: function () {
            if (!this._klass) {
                this._klass = modelForType(this, this.jsonapiType);
            }
            return this._klass;
        },
        enumerable: true,
        configurable: true
    });
    HasMany.prototype.getter = function (context) {
        var gotten = context.relationships[this.name];
        if (!gotten) {
            this.setter(context, []);
            return context.relationships[this.name];
        }
        var index = gotten.length;
        while (index--) {
            if (wasDestroyed(gotten[index])) {
                var related = context.relationships[this.name];
                gotten.splice(index, 1);
            }
        }
        return context.relationships[this.name];
    };
    HasMany.prototype.setter = function (context, val) {
        if (val && !val.hasOwnProperty("isRelationship")) {
            if (!(val instanceof SpraypaintBase) && !Array.isArray(val)) {
                val = new this.klass(val);
            }
            context.relationships[this.name] = val;
        }
        else if (val === null || val === undefined) {
            context.relationships[this.name] = val;
        }
    };
    return HasMany;
}(Attribute));
var HasOne = /** @class */ (function (_super) {
    __extends(HasOne, _super);
    function HasOne() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return HasOne;
}(SingleAssociationBase));
var BelongsTo = /** @class */ (function (_super) {
    __extends(BelongsTo, _super);
    function BelongsTo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return BelongsTo;
}(SingleAssociationBase));
var hasOne = function (options) {
    var opts = extractAssocOpts(options);
    return new HasOne(opts);
};
var belongsTo = function (options) {
    var opts = extractAssocOpts(options);
    return new BelongsTo(opts);
};
var hasMany = function (options) {
    var opts = extractAssocOpts(options);
    return new HasMany(opts);
};
var extractAssocOpts = function (options) {
    var associationOpts = {};
    if (options !== undefined) {
        if (typeof options === "string") {
            associationOpts = {
                jsonapiType: options
            };
        }
        else {
            associationOpts = {
                persist: options.persist,
                name: options.name
            };
            if (typeof options.type === "string") {
                associationOpts.jsonapiType = options.type;
            }
            else {
                associationOpts.type = options.type;
            }
        }
    }
    return associationOpts;
};
var modelForType = function (association, jsonapiType) {
    var klass = association.owner.typeRegistry.get(jsonapiType);
    if (klass) {
        return klass;
    }
    else {
        throw new Error("Unknown type \"" + jsonapiType + "\"");
    }
};

var inBrowser = typeof window !== "undefined";
var isProd = process.env.NODE_ENV === "production";
var config = {
    productionTip: !isProd
};

function shimDecoratorProposalCompatibility(finisher) {
    return function (descriptor) {
        if (isModernDecoratorDescriptor(descriptor)) {
            return Object.assign(descriptor, {
                finisher: finisher
            });
        }
        else {
            return finisher(descriptor);
        }
    };
}
var isModernDecoratorDescriptor = function (obj) {
    return obj && obj.kind !== undefined;
};
var ModelDecorator = function (config$$1) {
    return shimDecoratorProposalCompatibility(function (target) {
        modelFactory(target, config$$1);
        return target;
    });
};

var modelFactory = function (ModelClass, config$$1) {
    ensureModelInheritance(ModelClass);
    applyModelConfig(ModelClass, config$$1 || {});
    if (!ModelClass.jsonapiType && !ModelClass.isBaseClass) {
        ModelClass.jsonapiType = pluralize(underscore(ModelClass.name));
        if (config.productionTip && inBrowser) {
            logger.warn("Inferring model jsonapiType as \"" + ModelClass.jsonapiType + "\".\nYou should explicitly set this on your model if targeting a minified code bundle.");
        }
    }
    ModelClass.registerType();
};
var AttrDecoratorFactory = function (configOrTarget, propertyKey, attrConfig) {
    var attrDefinition = new Attribute({ name: propertyKey });
    var attrFunction = function (ModelClass, propKey) {
        ensureModelInheritance(ModelClass);
        if (!attrDefinition.name) {
            attrDefinition.name = propKey;
        }
        ModelClass.attributeList[propKey] = attrDefinition;
        attrDefinition.apply(ModelClass);
        return attrDefinition.descriptor();
    };
    if (isModernDecoratorDescriptor(configOrTarget)) {
        return Object.assign(configOrTarget, {
            finisher: function (Model) {
                attrFunction(Model, configOrTarget.key);
            }
        });
    }
    else if (isModelClass(configOrTarget) || isModelInstance(configOrTarget)) {
        // For type checking. Can't have a model AND no property key
        if (!propertyKey) {
            throw new Error("Must provide a propertyKey");
        }
        var target = configOrTarget;
        if (isModelClass(target)) {
            if (attrConfig) {
                attrDefinition = new Attribute(attrConfig);
            }
            attrFunction(target, propertyKey);
        }
        else {
            return attrFunction(target.constructor, propertyKey);
        }
    }
    else {
        if (configOrTarget) {
            attrDefinition = new Attribute(configOrTarget);
        }
        return function (target, propKey) {
            return attrFunction(target.constructor, propKey);
        };
    }
};
var LinkDecoratorFactory = function (fieldDetail) {
    var trackLink = function (Model, propKey) {
        ensureModelInheritance(Model);
        Model.linkList.push(propKey);
    };
    if (isModernDecoratorDescriptor(fieldDetail)) {
        return Object.assign(fieldDetail, {
            finisher: function (Model) {
                trackLink(Model, fieldDetail.key);
            }
        });
    }
    else {
        return function (target, propKey) {
            trackLink(target.constructor, propKey);
        };
    }
};
var ensureModelInheritance = function (ModelClass) {
    if (ModelClass.currentClass !== ModelClass) {
        ModelClass.currentClass.inherited(ModelClass);
    }
};
/*
 * Yup that's a super-Java-y method name.  Decorators in
 * ES7/TS are either of the form:
 *
 * @decorator foo : string
 * or
 * @decorator(options) foo : string
 *
 * The first is a function that directly decorates the
 * property, while this second is a factory function
 * that returns a decorator function.
 *
 * This method builds the factory function for each of our
 * association types.
 *
 * Additionally, users without decorator support can apply these
 * to their ES6-compatible classes directly if they prefer:
 *
 * ``` javascript
 * class Person extends ApplicationRecord {
 *   fullName() { `${this.firstName} ${this.lastName} `}
 * }
 * Attr(Person, 'firstName')
 * Attr(Person, 'lastName')
 * BelongsTo(Person, 'mother', { type: Person })
 * ```
 *
 */
var AssociationDecoratorFactoryBuilder = function (AttrType) {
    var DecoratorFactory = function (targetOrConfig, propertyKey, optsOrType) {
        var extend = function (ModelClass) {
            ensureModelInheritance(ModelClass);
            return ModelClass;
        };
        var opts;
        var factoryFn = function (target, propKey) {
            if (optsOrType === undefined) {
                var inferredType = pluralize(underscore(propKey));
                opts = {
                    jsonapiType: inferredType
                };
            }
            else if (typeof optsOrType === "string") {
                opts = {
                    jsonapiType: optsOrType
                };
            }
            else if (isModelClass(optsOrType)) {
                opts = {
                    type: optsOrType
                };
            }
            else {
                opts = {
                    persist: optsOrType.persist,
                    name: optsOrType.name
                };
                if (typeof optsOrType.type === "string") {
                    opts.jsonapiType = optsOrType.type;
                }
                else {
                    opts.type = optsOrType.type;
                }
            }
            var attrDefinition = new AttrType(opts);
            if (!attrDefinition.name) {
                attrDefinition.name = propKey;
            }
            var ModelClass = extend(target.constructor);
            ModelClass.attributeList[propKey] = attrDefinition;
            attrDefinition.owner = target.constructor;
            attrDefinition.apply(ModelClass);
            return attrDefinition.descriptor();
        };
        if (isModernDecoratorDescriptor(targetOrConfig)) {
            return Object.assign(targetOrConfig, {
                finisher: function (ModelClass) {
                    factoryFn(ModelClass.prototype, targetOrConfig.key);
                }
            });
        }
        else if (isModelClass(targetOrConfig) && propertyKey) {
            var target = targetOrConfig;
            factoryFn(target.prototype, propertyKey);
        }
        else {
            var fn = function (targetOrDescriptor, propKey) {
                if (isModernDecoratorDescriptor(targetOrDescriptor)) {
                    return Object.assign(targetOrDescriptor, {
                        finisher: function (ModelClass) {
                            factoryFn(ModelClass.prototype, targetOrDescriptor.key);
                        }
                    });
                }
                else {
                    optsOrType = targetOrConfig;
                    return factoryFn(targetOrDescriptor, propKey);
                }
            };
            return fn;
        }
    };
    return DecoratorFactory;
};
var HasManyDecoratorFactory = AssociationDecoratorFactoryBuilder(HasMany);
var HasOneDecoratorFactory = AssociationDecoratorFactoryBuilder(HasOne);
var BelongsToDecoratorFactory = AssociationDecoratorFactoryBuilder(BelongsTo);

exports.SpraypaintBase = SpraypaintBase;
exports.Attribute = Attribute;
exports.attr = attr;
exports.hasMany = hasMany;
exports.hasOne = hasOne;
exports.belongsTo = belongsTo;
exports.Model = ModelDecorator;
exports.Attr = AttrDecoratorFactory;
exports.HasMany = HasManyDecoratorFactory;
exports.HasOne = HasOneDecoratorFactory;
exports.BelongsTo = BelongsToDecoratorFactory;
exports.Link = LinkDecoratorFactory;
exports.MiddlewareStack = MiddlewareStack;
exports.Scope = Scope;
exports.Request = Request;

Object.defineProperty(exports, '__esModule', { value: true });

})));
