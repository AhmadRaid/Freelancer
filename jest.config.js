/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: "ts-jest",
  //This property specifies that the Jest preset being used is "ts-jest", which is a preset designed for TypeScript projects.
  testEnvironment: "node",
  //This property specifies that the test environment being used is Node.js. This means that the tests will run in a Node.js environment rather than in a browser.
  testMatch: ["**/**/*.test.ts"],
  //This property specifies the pattern for the files that should be considered as test files. In this case, it's any file that ends with .test.ts. The ** before the file pattern is a wildcard that matches any number of directories before the file name.
  verbose: true,
  //This property specifies that Jest should output a detailed log of the tests being run.
  forceExit: true,
  //This property specifies that Jest should force the test suite to exit after all tests have completed
  clearMocks: true,
  //This property specifies that Jest should automatically clear mock calls and instances before each test
  resetMocks: true,
  //This property specifies that Jest should reset all mock implementations before each test
  restoreMocks: true,
  //This property specifies that Jest should restore all mock implementations after each test.
};
