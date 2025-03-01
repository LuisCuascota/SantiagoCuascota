export default {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    transform: {
        "^.+\\.tsx?$": "babel-jest"
    },
    moduleNameMapper: {
        "^.+\\.(css|less|scss|sass)$": "identity-obj-proxy"
    },
    moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
    testPathIgnorePatterns: ["/node_modules/", "/dist/"],
    collectCoverageFrom: ["./**/*.{ts,tsx}"],
    coveragePathIgnorePatterns: [
        "App.tsx",
        "main.tsx",
        "./services"
    ]
};
