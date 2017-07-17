module.exports = {
  "parser": "babel-eslint",
  "parserOptions": {
    "sourceType": "module",
    "allowImportExportEverywhere": true,
    "ecmaFeatures": {
      "jsx": true,
      experimentalObjectRestSpread: true,
      "classes": true,
    },
  },
  "env": {
    "browser": true,
    "node": true,
    "es6": true,
  },
  "rules": {
    "semi": ["error"],
    "arrow-parens": ["error", "always"],
    "arrow-spacing": ["error"],
    "arrow-body-style": ["error", "as-needed"],
    "no-var": ["error"],
    "prefer-const": ["error"],
    "object-shorthand": ["error"],
    "prefer-rest-params": ["error"],
    "prefer-spread": ["error"],
    "prefer-template": ["error"],
    "template-curly-spacing": ["error"],
    "consistent-return": ["error"],
    "prefer-arrow-callback": ["error"],
    "react/no-unused-prop-types": ["error", {skipShapeProps: true}],
    "react/jsx-closing-bracket-location": ["error", "props-aligned"],
    "react/jsx-boolean-value": ["error", "always"],
    "react/require-extension": ["off"],
    "import/extensions": ["error", {"jsx": "always"}],
  },
  "plugins": [
    "flowtype",
    "flowtype-errors",
    "import",
    "promise",
    "compat",
    "react",
  ],
  "extends": [
    "airbnb",
    "eslint:recommended",
    "plugin:react/recommended",
  ],
  "settings": {
    "import/resolver": {
      "webpack": {
        "config": "webpack.config.eslint.js",
      },
    },
  },
}
