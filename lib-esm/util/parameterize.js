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
export { parameterize as default };
//# sourceMappingURL=parameterize.js.map