module.exports = {
  roots: ['<rootDir>/src'],
  collectCoverageFrom: ['<rootDir>/src/**/*.ts',
    '!<rootDir>/**/src/data/usercases/add-account/db-add-account-protocols.ts',
    '!<rootDir>/**/src/presentation/controllers/signup/signup-protocols.ts',
    '!<rootDir>/**/src/presentation/protocols/index.ts',
    '!<rootDir>/**/src/main/server.ts'],
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  preset: '@shelf/jest-mongodb',
  transform: {
    '.+\\.ts$': 'ts-jest'
  }
}
