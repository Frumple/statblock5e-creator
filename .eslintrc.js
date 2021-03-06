module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "amd": true,
        "jest" : true
    },
    "extends": "eslint:recommended",
    "globals": {
      "global": "readable",
      "process": "readable",
      "module": "readable"
    },
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "rules": {
        "indent": [
            "error",
            2, { "CallExpression": {"arguments": "first"} }
        ],
        "linebreak-style": [
            "error",
            "windows"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ]
    }
};