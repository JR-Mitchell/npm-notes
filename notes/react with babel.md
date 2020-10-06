# React with Babel with Webpack

## Intro

React is a library for doing loads of wild frontend stuff.
It handles state and responsiveness, so that you don't have to think too hard about all that stuff.

## Installing React

```bash
$ npm install react react-dom
$ npm install --save-dev @babel/preset-react
```

Now, as you may expect, we wish to go into our .babelrc and replace the preset with this react preset:

```json
{
    "presets": [
-       "@babel/preset-env"
+       "@babel/preset-react"
    ]
}
```

## Ensuring that webpack finds `.jsx` files

In React, `.jsx` files are extensions to `.js` files that allows a dom-like notation to be used to create React components - e.g such that

```jsx
function App(props) {
    return <div>
        Hello World!
    </div>
}
```

is a valid function in a `.jsx` file returning an object that can be rendered by `ReactDOM.render()`.

In order to use `.jsx` files, we must tell webpack which files it's supposed to be processing.

To do this, we add a `resolve` entry to our webpack config:

```js
const WebpackConfig = {
    ...
+   resolve: {
+       modules: [path.resolve(__dirname,'src'), 'node_modules'],
+       extensions: ['.js', '.jsx']
+   }
}
```

The `modules` property tells webpack where to look for imports - first, in our `src/` file and then in `node_modules`.
The `extensions` property tells webpack the extensions of files to process. In our case we wish to process both `.js` and `.jsx` files.
Note that we don't need to put `.html`, as the HTML webpack plugin deals with those on its own.

Note also that the `modules` entry calls a function `path.resolve()` to ensure files in `src/` are checked.
In order for this to work, we add at the top of the webpack config:

```js
var path = require("path");
```

## Ensuring that webpack processes `.jsx` files

Now, webpack finds our `.jsx` files, but it doesn't yet know what to do with them.
We want it to process them with Babel in much the same way that it processes `.js` files.
In order to do so, we edit the entry for `rules` in the webpack config:

```js
        rules: [
            {
-               test: /\.(js)$/,
+               test: /\.(jsx?)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            }
        ]
```

Here, we add `x?`, which is the RegEx code for zero or one 'x' characters, meaning that webpack will use this rule to process both files ending `.js` and files ending `.jsx`.

## If you've already read my notes on TypeScript, you're ready to read about combining TypeScript with React (TODO)

## If you haven't, learn about TypeScript [here](https://github.com/JR-Mitchell/npm-notes/blob/master/notes/typescript%20with%20babel.md)
