import type { Config } from "jest";

const config: Config = {
    verbose: false,
    silent: false,
    automock: false,
    collectCoverage: true,
    collectCoverageFrom: [
        "src/**/*.{js,jsx}",
        "src/**/*.{ts,tsx}",
        "!vendor/**/*.{js,jsx}",
        "!**/node_modules/**",
    ],
    coverageProvider: "babel",
    preset: "ts-jest",
    coverageDirectory: "src/test/coverage",
};

export default config;
