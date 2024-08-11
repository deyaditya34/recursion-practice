var obj = {
    number1: 1,
    // name: "name",
    // color: "color",
    // city: "city",
    // number2: 2,
    // newName: "newName",
    arr: [
        { name: "name", color: "color", city: "city" },
        { name: "name", city: "city" },
        { number1: 1, number2: { number3: 2, number2: { number3: 3, number4: { number4: 4 } } } },
    ],
    newObj: {
        arr: [
            { name: "name", color: "color" },
        ],
        number1: { name: "name" },
        number2: { name: "name" },
    },
};
function stringifyObject(obj, index, result, endBracketCount) {
    if (index === void 0) { index = 0; }
    if (result === void 0) { result = ""; }
    if (endBracketCount === void 0) { endBracketCount = 0; }
    var objKeys = Object.keys(obj);
    var resultKeys = objKeys.slice(index, objKeys.length);
    if (index === 0) {
        result += "{";
    }
    if (resultKeys.length <= 0) {
        result += "}";
        return result;
    }
    var resultKey = resultKeys[0];
    var resultKeyValue = Reflect.get(obj, resultKey);
    if (typeof resultKeyValue === "string") {
        result += insertDoubleQuote(resultKey);
        if (resultKeys.length === 1) {
            result +=
                ":" +
                    insertDoubleQuote(resultKeyValue) +
                    insertEndBracket(endBracketCount);
        }
        else {
            result += ":" + insertDoubleQuote(resultKeyValue) + ",";
        }
    }
    if (typeof resultKeyValue === "number") {
        result += insertDoubleQuote(resultKey);
        if (resultKeys.length === 1) {
            result += ":" + resultKeyValue + insertEndBracket(endBracketCount);
        }
        else {
            result += ":" + resultKeyValue + ",";
        }
    }
    if (typeof resultKeyValue === "object") {
        if (Array.isArray(resultKeyValue)) {
            result += insertDoubleQuote(resultKey);
            var resultArrKeyValue_1 = resultKeyValue.map(function (key) {
                return stringifyObject(key);
            });
            result += ":[";
            resultArrKeyValue_1.forEach(function (key, i) {
                if (i === resultArrKeyValue_1.length - 1) {
                    if (resultKeys.length > 1) {
                        result += key + "]" + ",";
                    }
                    else {
                        result += key + "]";
                    }
                }
                else {
                    result += key + ",";
                }
            });
        }
        else {
            endBracketCount++;
            result += insertDoubleQuote(resultKey) + ":";
            return stringifyObject(resultKeyValue, 0, result, endBracketCount);
        }
    }
    index++;
    return stringifyObject(obj, index, result, endBracketCount);
}
var a = JSON.stringify(obj);
console.log(a);
console.log(stringifyObject(obj));
function insertDoubleQuote(string) {
    var result = "";
    result += '"' + string + '"';
    return result;
}
function insertEndBracket(count) {
    var result = "";
    for (var i = 0; i < count; i++) {
        result += "}";
    }
    return result;
}
