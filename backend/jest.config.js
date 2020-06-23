module.exports = {
  roots: ["<rootDir>/src", "<rootDir>/__mocks__"],
  modulePathIgnorePatterns: ["<rootDir>/src/build/"],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 75,
      statements: 75,
    },
  },
  coverageReporters: ["json", "lcov", "text", "clover"],
  coveragePathIgnorePatterns: ["<rootDir>/src/jobs/"],
};
