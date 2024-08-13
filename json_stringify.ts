import { assert } from "console";

const obj = {
  name: "John Doe",
  age: 30,
  address: {
    street: "123 Main St",
    city: "Metropolis",
    postalCode: "12345",
    coordinates: {
      latitude: 40.7128,
      longitude: -74.006,
      details: {
        isUrban: true,
        nearbyLandmarks: [
          {
            name: "Central Park",
            type: "Park",
            facilities: [
              {
                name: "Playground",
                openHours: "6 AM - 9 PM",
                equipment: ["Swings", "Slides", "Climbing Frames"],
              },
              {
                name: "Zoo",
                openHours: "8 AM - 5 PM",
                animals: ["Lions", "Tigers", "Bears"],
              },
            ],
          },
          {
            name: "Empire State Building",
            type: "Skyscraper",
            floors: 102,
            observationDecks: [
              {
                level: "86th Floor",
                view: "Panoramic",
                binocularsAvailable: true,
              },
              {
                level: "102nd Floor",
                view: "Top Floor View",
                binocularsAvailable: false,
              },
            ],
          },
        ],
      },
    },
  },
  contactDetails: {
    email: "johndoe@example.com",
    phones: [
      { type: "home", number: "555-1234" },
      { type: "work", number: "555-5678" },
      { type: "mobile", number: "555-8765" },
    ],
  },
  preferences: {
    favoriteFoods: ["Pizza", "Sushi", "Ice Cream"],
    hobbies: ["Hiking", "Reading", "Coding"],
    languagesSpoken: [
      {
        language: "English",
        proficiency: "Fluent",
      },
      {
        language: "Spanish",
        proficiency: "Intermediate",
      },
    ],
  },
  family: {
    spouse: {
      name: "Jane Doe",
      age: 28,
      occupation: "Software Engineer",
      hobbies: ["Painting", "Cycling"],
    },
    children: [
      {
        name: "Jimmy Doe",
        age: 5,
        school: {
          name: "Metropolis Elementary",
          grade: "Kindergarten",
          favoriteSubjects: ["Math", "Art"],
          extracurriculars: ["Soccer", "Chess Club"],
        },
      },
      {
        name: "Jenny Doe",
        age: 3,
        daycare: {
          name: "Little Learners",
          favoriteActivities: ["Storytime", "Nap Time"],
        },
      },
    ],
  },
};

function stringifyObject(obj) {
  if (typeof obj === "number" || typeof obj === "boolean") {
    return obj;
  }

  if (typeof obj === "string") {
    return `"${obj}"`;
  }

  if (Array.isArray(obj)) {
    let result = "[";
    const arrMapValue = obj.map((val) => stringifyObject(val));
    result += arrMapValue.join(",") + "]";

    return result;
  }

  if (typeof obj === "object") {
    // const objKeysValuesArr = Object.entries(obj);
    const objKeysArr = Object.keys(obj);

    let result = "{";

    // for (let i = 0; i < objKeysValuesArr.length; i++) {
    //   if (i === objKeysValuesArr.length - 1) {
    //     result +=
    //       `"${objKeysValuesArr[i][0]}"` +
    //       ":" +
    //       stringifyObject(objKeysValuesArr[i][1]);
    //   } else {
    //     result +=
    //       `"${objKeysValuesArr[i][0]}"` +
    //       ":" +
    //       stringifyObject(objKeysValuesArr[i][1]) +
    //       ",";
    //   }
    // }

    let count = 0;
    for (const key in obj) {
      if (count === objKeysArr.length - 1) {
        result += `"${key}":${stringifyObject(obj[key])}`;
      } else {
        result += `"${key}":${stringifyObject(obj[key])},`;
      }
      count++;
    }

    result += "}";
    return result;

    // return "{" + Object.entries(obj).map(([key, val]) => `"${key}":${stringifyObject(val)}`).join(",") + "}"
  }

  return "stringifying data failed.";
}

function repeatFunction(number: number, fn: ({}) => {}, obj: {}) {
  for (let i = 0; i < number; i++) {
    fn(obj);
  }
}

function testDefaultAndCustomFunctions() {
  test(1000);
  test(10000);
  test(50000);
}

function test(num: number) {
  let startingTime = Date.now();
  repeatFunction(num, JSON.stringify, obj);
  let endingTime = Date.now();

  console.log(
    `DEFAULT STRINGIFY FUNCTION TIME TAKEN FOR ${num} TIMES -`,
    (endingTime - startingTime) / 1000,
    "seconds"
  );

  startingTime = Date.now();
  repeatFunction(num, stringifyObject, obj);
  endingTime = Date.now();

  console.log(
    `CUSTOM STRINGIFY FUNCTION TIME TAKEN FOR ${num} TIMES -`,
    (endingTime - startingTime) / 1000,
    "seconds"
  );
}

testDefaultAndCustomFunctions();
