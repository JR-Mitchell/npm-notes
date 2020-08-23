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

## Packing HTML

So far, this will pack your index.js file, and any other files or packages it imports.
But what about our HTML?
You can install the HTML webpack plugin:
```
npm install html-webpack-plugin --save-dev
```

Now, this will not just work by default.
In order to make this work, a non-default configuration file will need to be created.

A config file (perhaps named `wp.config.js` or something similar) does two things:
1. Creates an object containing any configuration options you wish to set
2. Exports said object

A minimal example of such a config (which may also be found [here](https://github.com/OneSlightWeirdo/npm-notes/tree/master/webpack-demo/wp.base_config.js) reads as:

```js
const WebpackConfig = {
};

module.exports = WebpackConfig;
```

However, we wish to set up the HTML Webpack plugin, and therefore will make a few modifications.
A full config file with the following steps may be found [here](https://github.com/OneSlightWeirdo/npm-notes/tree/master/webpack-demo/wp.html_config.js).

First, we require the plugin (at the top of the file):
```js
const HTMLWebpackPlugin = require('html-webpack-plugin')
```

Then, we set it up by modifying the `WebpackConfig` object.

```js
const WebpackConfig = {
    plugins: [
        new HTMLWebpackPlugin({
            template: "src/html/index.html",
            filename: "index.html"
        })
    ]
}
```
Note that this presupposes that our "src" has a file for each filetype, even though we were previously entering at `src/index.js`.
In order to make this consistent, a new directory `src/js` is created, `index.js` moved into it and the following item added to the WebpackConfig:

```js
    entry: "./src/js/index.js",
```

Now, this leaves us with one final thing to do - ensure that we're using this config file.
Modifying the npm script we defined earlier to:
```
    "build:pack": "webpack --config wp.html_config.js"
```
allows us to call `npm run build:pack` and pack both the javascript and HTML into the `dist` directory.


