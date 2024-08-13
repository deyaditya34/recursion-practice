const { assert } = require("console");
const { json_stringify } = require("./json_stringify");

/**
 * run the tests
 */
function validity_test() {
  const test_values = [
    12,
    "string test",
    [12, 34, 1],
    [12, true, 1, false],
    { name: "ajay", age: 23 },
    {
      name: "Ajay",
      age: 23,
      courses: ["english", "maths"],
      last_year_grades: [{ english: 78, maths: 86 }],
      portal_configs: {
        course_names: {
          english: "Advaned poetry",
          maths: "advanced maths",
        },
      },
    },
  ];

  for (const test_value of test_values) {
    assert(JSON.stringify(test_value) == json_stringify(test_value));
    console.log("testing with", test_value, "works!");
  }
}

function performance_test(counts) {
  const test_obj = {
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
  console.log("Starting performance test with", test_obj);

  for (const count of counts) {
    let start_time, end_time, duration;
    console.log("Count", count);

    start_time = Date.now();
    for (let i = 0; i < count; i++) {
      JSON.stringify(test_obj);
    }
    end_time = Date.now();

    duration = end_time - start_time;
    console.log("\tStd lib JSON.stringify() took", duration, "ms");

    start_time = Date.now();
    for (let i = 0; i < count; i++) {
      json_stringify(test_obj);
    }
    end_time = Date.now();

    duration = end_time - start_time;
    console.log("\tcustom made json_stringify() took", duration, "ms");
  }
}

validity_test();
performance_test([1000, 10_000, 100_000, 1000_000]);
