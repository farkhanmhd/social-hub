/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  coverageProvider: "babel",
  transform: {
    "\\.[jt]sx?$": "babel-jest",
  },
};
