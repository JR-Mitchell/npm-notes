# Webpack

## Intro

Webpack bundles your resources (.js, .css etc.) into as few files as needed.
The `webpack-cli` package includes command line interface features for Webpack.

```
npm install webpack webpack-cli --save-dev
```

## Basic webpacking

By default, webpack will start at the entry point `src/index.js` and output to `dist/main.js`.
This can be done manually by calling `npx webpack`, but it is more consistent to set up an npm script:
```
    "build:pack": "webpack"
```
and then call `npm run build:pack`.

If a `dist` file did not exist, one will be created.
