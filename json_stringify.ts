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
    { number1: 1, number2: { number3: 2, number2: {number3: 3, number4: {number4: 4}} } },
  ],
  newObj: {
    arr: [
      { name: "name", color: "color" },
    ],
    number1: { name: "name" },
    number2: { name: "name" },
  },
};

function stringifyObject(obj: string | number| [] | {}): string {
  
}

const a = JSON.stringify(obj);
console.log(a);
console.log(stringifyObject(obj));
