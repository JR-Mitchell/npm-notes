const JestConfig = {
    "transform": {
        "^.+\\.jsx?$": "babel-jest",
        "^.+\\.tsx?$": "ts-jest"
    },
    "moduleFileExtensions": [
        "js",
        "jsx",
        "tsx",
        "ts",
        "node"
    ]
};

module.exports = JestConfig;
