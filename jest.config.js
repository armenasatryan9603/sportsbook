export default {
  // Test environment
  testEnvironment: "jsdom",

  // Setup files
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],

  // Module file extensions
  moduleFileExtensions: ["js", "jsx", "ts", "tsx", "json"],

  // Transform configuration
  transform: {
    "^.+\\.(ts|tsx)$": ["ts-jest", {
      tsconfig: {
        jsx: "react-jsx",
        esModuleInterop: true,
        module: "esnext",
        target: "ES2022",
      },
    }],
    "^.+\\.(js|jsx)$": "babel-jest",
  },

  // Module name mapping for static assets
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "\\.(jpg|jpeg|png|gif|svg)$": "<rootDir>/src/__mocks__/fileMock.js",
  },

  // Test match patterns
  testMatch: [
    "<rootDir>/src/**/__tests__/**/*.(ts|tsx|js|jsx)",
    "<rootDir>/src/**/*.(test|spec).(ts|tsx|js|jsx)",
  ],

  // Coverage configuration
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "!src/**/*.d.ts",
    "!src/main.tsx",
    "!src/vite-env.d.ts",
    "!src/setupTests.ts",
    "!src/**/__tests__/**",
    "!src/**/__mocks__/**",
  ],

  // Coverage thresholds
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },

  // Module directories
  moduleDirectories: ["node_modules", "<rootDir>/src"],

  // Clear mocks between tests
  clearMocks: true,

  // Restore mocks after each test
  restoreMocks: true,

  // Verbose output
  verbose: true,
};
