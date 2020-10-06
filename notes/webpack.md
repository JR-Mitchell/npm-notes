# Webpack

## Intro

Webpack bundles your resources (.js, .css etc.) into as few files as needed.
The `webpack-cli` package includes command line interface features for Webpack.

```
npm install webpack webpack-cli --save-dev
```

## Basic webpacking

Consider you have some JavaScript files that you wish to bundle.
By default, webpack will start at the entry point `src/index.js` and output to `dist/main.js`.
Thus, you should ensure that there exists a `src` folder, inside which is an `index.js` which imports any other modules or scripts your JavaScript relies on.

Then, the files may be packed by calling `npx webpack`, but it is more consistent to set up an npm script:
```
    "build": "webpack"
```
and then call `npm run build`.

If a `dist` file did not exist, one will be created.

## Packing HTML

So far, this will pack your index.js file, and any other files or packages it imports.
But what if we are building a site? What do we do about our HTML?

You can install the HTML webpack plugin:
```
npm install html-webpack-plugin --save-dev
```

Now, this will not just work by default.
In order to make this work, a non-default configuration file will need to be created.

A config file (perhaps named `wp.config.js` or something similar) does two things:
1. Creates an object containing any configuration options you wish to set
2. Exports said object

A minimal example of such a config (which may also be found [here](https://github.com/JR-Mitchell/npm-notes/blob/master/webpack-demo/wp.base_config.js) reads as:

```js
const WebpackConfig = {
};

module.exports = WebpackConfig;
```

However, we wish to set up the HTML Webpack plugin, and therefore will make a few modifications.
A full config file with the following steps may be found [here](https://github.com/JR-Mitchell/npm-notes/blob/master/webpack-demo/wp.html_config.js).

First, we require the plugin (at the top of the file):
```js
const HTMLWebpackPlugin = require('html-webpack-plugin')
```

Then, we set it up by modifying the `WebpackConfig` object.

```js
const WebpackConfig = {
    plugins: [
        new HTMLWebpackPlugin({
            template: "src/index.html",
            filename: "index.html"
        })
    ]
}
```
This leaves us with one final thing to do - ensure that we're using this config file.
Modifying the npm script we defined earlier to:
```
    "build": "webpack --config wp.html_config.js"
```
allows us to call `npm run build` and pack both the javascript and HTML into the `dist` directory.

Note that, by default, the HTML webpack plugin will add the packed script into the HTML body automatically, so you do not need a <script> tag for it in your input HTML, and changes to its output name or other parts of the stack flow should not lead to 404s.

## Webpack dev server

Webpack also comes with a handy tool that creates a hot development server.

```
npm install webpack-dev-server --save-dev
```

With this in place, we need only add the npm script:
```
    "dev": "webpack-dev-server --config wp.html_config.js --mode development"
```
and then run it, and a server will spawn at localhost:8080 which will automatically update whenever the source code is modified.
See [npm scripts and arguments](https://github.com/JR-Mitchell/npm-notes/blob/master/notes/npm%20arguments.md) for an in-detail on command arguments using this script as an example.

## Next, check out my notes on [getting Babel working with webpack](https://github.com/JR-Mitchell/npm-notes/blob/master/notes/babel%20with%20webpack.md)
