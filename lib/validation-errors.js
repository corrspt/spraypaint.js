"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ValidationError = /** @class */ (function () {
    function ValidationError(options) {
        var key;
        for (key in options) {
            this[key] = options[key];
        }
    }
    return ValidationError;
}());
exports.ValidationError = ValidationError;
//# sourceMappingURL=validation-errors.js.map