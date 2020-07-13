module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  reporters: ['default'],
  coverageDirectory: 'coverage',
  coverageReporters: ['lcov'],
  collectCoverageFrom: ['src/**/*.{ts,js}'],
};
