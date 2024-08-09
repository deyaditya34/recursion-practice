var obj = {
    number1: 1,
    name: "name",
    color: "color",
    // city: "city",
    // number2: 2,
    // newName: "newName",
    // arr: [
    //   { name: "name", color: "color", city: "city" },
    //   { name: "name", city: "city" },
    //   { number1: 1 },
    // ],
    newObj: { newArr: "newArr", arr: { arr: "arr" } },
};
function stringifyObject(obj, index, result) {
    if (index === void 0) { index = 0; }
    if (result === void 0) { result = "{"; }
    var objKeys = Object.keys(obj);
    var resultKeys = objKeys.slice(index, objKeys.length);
    // if (index === 0) {
    //   result += "{";
    // }
    if (resultKeys.length <= 0) {
        result += "}";
        return result;
    }
    var resultKey = resultKeys[0];
    var resultKeyValue = Reflect.get(obj, resultKey);
    if (typeof resultKeyValue === "string") {
        result += insertDoubleQuote(resultKey);
        if (resultKeys.length === 1) {
            result += ":" + insertDoubleQuote(resultKeyValue);
        }
        else {
            result += ":" + insertDoubleQuote(resultKeyValue) + ",";
        }
    }
    if (typeof resultKeyValue === "number") {
        result += insertDoubleQuote(resultKey);
        if (resultKeys.length === 1) {
            result += ":" + resultKeyValue;
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
                    result += key + "]";
                }
                else {
                    result += key + ",";
                }
            });
        }
        else {
            // result += "{"
            console.log("result key value -", resultKeyValue);
            return stringifyObject(resultKeyValue, 0, result);
        }
    }
    return stringifyObject(obj, ++index, result);
}
var a = JSON.stringify(obj);
console.log(a);
console.log(stringifyObject(obj));
function insertDoubleQuote(string) {
    var result = "";
    result += '"' + string + '"';
    return result;
}
