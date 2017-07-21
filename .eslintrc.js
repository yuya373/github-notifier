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
    "react/no-unused-prop-types": ["off", {skipShapeProps: true}],
    "react/jsx-closing-bracket-location": ["error", "props-aligned"],
    "react/jsx-boolean-value": ["error", "always"],
    "react/require-extension": ["off"],
    "import/extensions": ["error", {"jsx": "always"}],
    "react/sort-comp": ["off"],
    "react/prop-types": ["off"],
    "react/require-default-props": ["off"],


    "flowtype/require-variable-type": ["warn", {"excludeVariableMatch": "^_"}],
    "flowtype/boolean-style": ["error", "boolean"],
    "flowtype/define-flow-type": "warn",
    "flowtype/generic-spacing": ["error", "never"],
    "flowtype/no-primitive-constructor-types": "error",
    "flowtype/no-types-missing-file-annotation": "error",
    "flowtype/no-weak-types": "error",
    "flowtype/object-type-delimiter": ["error", "comma"],
    "flowtype/require-parameter-type": ["error", {"excludeParameterMatch": "^_"}],
    "flowtype/require-return-type": ["warn", "always"],
    "flowtype/require-valid-file-annotation": ["error", "always"],
    "flowtype/semi": ["error", "always"],
    "flowtype/space-after-type-colon": ["error", "always"],
    "flowtype/space-before-generic-bracket": ["error", "never"],
    "flowtype/space-before-type-colon": ["error", "never"],
    "flowtype/union-intersection-spacing": ["error", "always"],
    "flowtype/use-flow-type": "warn",
    "flowtype/valid-syntax": "warn",
    "flowtype/delimiter-dangle": "off",

    "compat/compat": "error",
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
    "plugin:flowtype/recommended",
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
