const obj = {
  number1: 1,
  // name: "name",
  // color: "color",
  // city: "city",
  // number2: 2,
  // newName: "newName",
  arr: [
    { name: "name", color: "color", city: "city" },
    { name: "name", city: "city" },
    { number1: 1, number2: { number3: 2 } },
  ],
  newObj: {
    number1: { name: "name" },
    number2: { name: "name" },
    // arr: [
    //   { name: "name", color: "color" },
    // ],
  },
};

function stringifyObject(
  obj: {},
  index = 0,
  result = "",
  endBracketCount = 0
): string {
  const objKeys: string[] = Object.keys(obj);
  const resultKeys: string[] = objKeys.slice(index, objKeys.length);

  if (index === 0) {
    result += "{";
  }

  if (resultKeys.length <= 0) {
    console.log("obj keys -", objKeys);
    result += "}";
    return result;
  }

  const resultKey: string = resultKeys[0];
  const resultKeyValue: string | number | {} | [] = Reflect.get(obj, resultKey);

  // console.log("result key -", resultKey);
  // console.log("result key value -", resultKeyValue);

  if (typeof resultKeyValue === "string") {
    result += insertDoubleQuote(resultKey);
    if (resultKeys.length === 1) {
      result +=
        ":" +
        insertDoubleQuote(resultKeyValue) +
        insertEndBracket(endBracketCount);
    } else {
      result += ":" + insertDoubleQuote(resultKeyValue) + ",";
    }
  }

  if (typeof resultKeyValue === "number") {
    result += insertDoubleQuote(resultKey);
    if (resultKeys.length === 1) {
      result += ":" + resultKeyValue + insertEndBracket(endBracketCount);
    } else {
      result += ":" + resultKeyValue + ",";
    }
  }

  if (typeof resultKeyValue === "object") {
    if (Array.isArray(resultKeyValue)) {
      result += insertDoubleQuote(resultKey);

      const resultArrKeyValue = resultKeyValue.map((key: {}) =>
        stringifyObject(key)
      );
      result += ":[";

      resultArrKeyValue.forEach((key, i) => {
        if (i === resultArrKeyValue.length - 1) {
          if (resultKeys.length > 1) {
            result += key + "]" + ",";
          } else {
            result += key + "]";
          }
        } else {
          result += key + ",";
        }
      });
    } else {
      endBracketCount++;

      result += insertDoubleQuote(resultKey) + ":";
      return stringifyObject(resultKeyValue, 0, result, endBracketCount);

      // console.log("obj keys -", objKeys);
      // console.log("result key -", resultKey);
      // console.log("result key value -", resultKeyValue);
    }
  }

  index++;
  return stringifyObject(obj, index, result, endBracketCount);
}

const a = JSON.stringify(obj);
console.log(a);
console.log(stringifyObject(obj));

function insertDoubleQuote(string: string): string {
  let result = "";
  result += '"' + string + '"';
  return result;
}

function insertEndBracket(count: number): string {
  let result = "";

  for (let i = 0; i < count; i++) {
    result += "}";
  }

  return result;
}
