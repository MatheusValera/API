module.exports = {
  roots: ['<rootDir>/src'],
  collectCoverageFrom: ['<rootDir>/src/**/*.ts',
    '!<rootDir>/**/src/data/usercases/add-account/db-add-account-protocols.ts',
    '!<rootDir>/**/src/presentation/controllers/signup/signup-protocols.ts',
    '!<rootDir>/**/src/presentation/protocols/index.ts'],
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  transform: {
    '.+\\.ts$': 'ts-jest'
  },
  preset: '@shelf/jest-mongodb'
}
