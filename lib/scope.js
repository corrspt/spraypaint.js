"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var parameterize_1 = require("./util/parameterize");
var include_directive_1 = require("./util/include-directive");
var proxies_1 = require("./proxies");
var request_1 = require("./request");
var refresh_jwt_1 = require("./util/refresh-jwt");
var clonedeep_1 = require("./util/clonedeep");
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
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var response;
            return tslib_1.__generator(this, function (_a) {
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
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var json;
            return tslib_1.__generator(this, function (_a) {
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
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var newScope, rawResult;
            return tslib_1.__generator(this, function (_a) {
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
        var directive = new include_directive_1.IncludeDirective(clause);
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
            include: new include_directive_1.IncludeDirective(this._include).toString()
        };
        this._mergeAssociationQueryParams(qp, this._associations);
        Object.keys(this._extraParams).forEach(function (k) {
            qp[k] = _this._extraParams[k];
        });
        return qp;
    };
    Scope.prototype.toQueryParams = function () {
        var paramString = parameterize_1.default(this.asQueryParams());
        if (paramString !== "") {
            return paramString;
        }
    };
    Scope.prototype.fetchOptions = function () {
        return tslib_1.__assign({}, this.model.fetchOptions(), this._extraFetchOptions);
    };
    Scope.prototype.copy = function () {
        var newScope = clonedeep_1.cloneDeep(this);
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
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var qp, request, response;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        qp = this.toQueryParams();
                        if (qp) {
                            url = url + "?" + qp;
                        }
                        request = new request_1.Request(this.model.middlewareStack, this.model.logger);
                        return [4 /*yield*/, request.get(url, this.fetchOptions())];
                    case 1:
                        response = _a.sent();
                        refresh_jwt_1.refreshJWT(this.model, response);
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
                return new proxies_1.NullProxy(jsonResult);
            }
        }
        else {
            rawRecord = jsonResult.data;
        }
        record = this.model.fromJsonapi(rawRecord, jsonResult);
        return new proxies_1.RecordProxy(record, jsonResult);
    };
    Scope.prototype._buildCollectionResult = function (jsonResult) {
        var _this = this;
        var recordArray = [];
        jsonResult.data.forEach(function (record) {
            recordArray.push(_this.model.fromJsonapi(record, jsonResult));
        });
        return new proxies_1.CollectionProxy(recordArray, jsonResult);
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
exports.Scope = Scope;
//# sourceMappingURL=scope.js.map