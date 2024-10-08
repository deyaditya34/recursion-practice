"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var obj = {
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
        return "\"".concat(obj, "\"");
    }
    if (Array.isArray(obj)) {
        var result = "[";
        var arrMapValue = obj.map(function (val) { return stringifyObject(val); });
        result += arrMapValue.join(",") + "]";
        return result;
    }
    if (typeof obj === "object") {
        // const objKeysValuesArr = Object.entries(obj);
        var objKeysArr = Object.keys(obj);
        var result = "{";
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
        var count = 0;
        for (var key in obj) {
            if (count === objKeysArr.length - 1) {
                result += "\"".concat(key, "\":").concat(stringifyObject(obj[key]));
            }
            else {
                result += "\"".concat(key, "\":").concat(stringifyObject(obj[key]), ",");
            }
            count++;
        }
        result += "}";
        return result;
        // return "{" + Object.entries(obj).map(([key, val]) => `"${key}":${stringifyObject(val)}`).join(",") + "}"
    }
    return "stringifying data failed.";
}
function repeatFunction(number, fn, obj) {
    for (var i = 0; i < number; i++) {
        fn(obj);
    }
}
function testDefaultAndCustomFunctions() {
    test(1000);
    test(10000);
    test(50000);
}
function test(num) {
    var startingTime = Date.now();
    repeatFunction(num, JSON.stringify, obj);
    var endingTime = Date.now();
    console.log("DEFAULT STRINGIFY FUNCTION TIME TAKEN FOR ".concat(num, " TIMES -"), (endingTime - startingTime) / 1000, "seconds");
    startingTime = Date.now();
    repeatFunction(num, stringifyObject, obj);
    endingTime = Date.now();
    console.log("CUSTOM STRINGIFY FUNCTION TIME TAKEN FOR ".concat(num, " TIMES -"), (endingTime - startingTime) / 1000, "seconds");
}
testDefaultAndCustomFunctions();
