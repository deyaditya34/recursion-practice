const obj = {
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

function stringifyObject(obj: {}, index = 0, result = "{") {
  const objKeys: string[] = Object.keys(obj);
  const resultKeys: string[] = objKeys.slice(index, objKeys.length);

  // if (index === 0) {
  //   result += "{";
  // }

  if (resultKeys.length <= 0) {
    result += "}";
    return result;
  }

  const resultKey: string = resultKeys[0];
  const resultKeyValue: string | number | {} | [] = Reflect.get(obj, resultKey);

  if (typeof resultKeyValue === "string") {
    result += insertDoubleQuote(resultKey);
    if (resultKeys.length === 1) {
      result += ":" + insertDoubleQuote(resultKeyValue);
    } else {
      result += ":" + insertDoubleQuote(resultKeyValue) + ",";
    }
  }

  if (typeof resultKeyValue === "number") {
    result += insertDoubleQuote(resultKey);
    if (resultKeys.length === 1) {
      result += ":" + resultKeyValue;
    } else {
      result += ":" + resultKeyValue + ",";
    }
  }

  if (typeof resultKeyValue === "object") {
    if (Array.isArray(resultKeyValue)) {
      result += insertDoubleQuote(resultKey);

      const resultArrKeyValue = resultKeyValue.map((key: object) =>
        stringifyObject(key),
      );
      result += ":[";

      resultArrKeyValue.forEach((key, i) => {
        if (i === resultArrKeyValue.length - 1) {
          result += key + "]";
        } else {
          result += key + ",";
        }
      });
    } else {
      result += "{" + 
      console.log("result key value -", resultKeyValue);
      return stringifyObject(resultKeyValue, 0, result);
    }
  }
  
  return stringifyObject(obj, ++index, result);
}

const a = JSON.stringify(obj);
console.log(a);
console.log(stringifyObject(obj));

function insertDoubleQuote(string: string): string {
  let result = "";
  result += '"' + string + '"';
  return result;
}

