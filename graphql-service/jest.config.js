module.exports = {
  verbose: true,
  testURL: 'http://localhost/',
  collectCoverage: false,
  coverageDirectory: 'coverage',
  coverageReporters: ['json', 'html'],
  modulePathIgnorePatterns: ['<rootDir>/.*/__mocks__'],
  testEnvironment: 'node',
  preset: 'ts-jest/presets/js-with-ts',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};
