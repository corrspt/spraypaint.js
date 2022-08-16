var ValidationError = /** @class */ (function () {
    function ValidationError(options) {
        var key;
        for (key in options) {
            this[key] = options[key];
        }
    }
    return ValidationError;
}());
export { ValidationError };
//# sourceMappingURL=validation-errors.js.map