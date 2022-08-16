import { IncludeDirective } from "./include-directive";
import { tempId } from "./temp-id";
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
export { WritePayload };
//# sourceMappingURL=write-payload.js.map