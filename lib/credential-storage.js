"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
exports.InMemoryStorageBackend = InMemoryStorageBackend;
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
exports.CredentialStorage = CredentialStorage;
//# sourceMappingURL=credential-storage.js.map