# React and TypeScript with Babel with Webpack

## Intro

In this step of my notes, we have explored setting up React with Babel, and setting up TypeScript with Babel, separately.
Now is the time to combine both - using TypeScript with React.

For React, as explored previously, the following packages are installed:

```bash
$ npm install react react-dom
$ npm install --save-dev @babel/preset-react
```

and the `.babelrc` file should be set up to use `@babel/preset-react` as explored in the React notes.

For TypeScript, the following packages are installed:

```bash
$ npm install --save-dev typescript ts-loader
```

As before, we should have a `tsconfig.json` file (at the moment, just a blank JSON object).

## File extensions and webpack

Much of this should be familiar from the notes on React and TypeScript, but we wish to set up the `resolve` entry for all our filetypes - `.js`, React's `.jsx`, TypeScript's `.ts`, and then one we haven't encountered yet - `.tsx`, which is to `.jsx` what `.ts` is to `.js`.
To do this, the `resolve` entry should be modified from however it appears to:

```js
    resolve: {
        modules: [path.resolve(__dirname,'src'), 'node_modules'],
        extensions: ['.js', '.jsx', '.ts', '.tsx']
    }
```

not forgetting that the import line

```js
var path = require('path');
```

must be included near the top of the file.

If it isn't there already, ensure the line

```js
    entry: "./src/index.ts",
```

is in there (as in the TypeScript info).

As should also be familiar, we must set up the `module` `rules` entry to correctly process our files:

```js
    module: {
        rules: [
            {
                test: /\.(jsx?)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.(tsx?)$/,
                exclude: /node_modules/,
                use: [
                    'babel-loader',
                    'ts-loader'
                ]
            }
        ]
    }
```

As covered in previous notes, the `x?` RegEx sequence ensures that both `.js` and `.jsx` files are processsed with the first rule, and both `.ts` and `.tsx` files are processed with the second.
Also as previously covered, the second rule passes these `.ts` and `.tsx` files through the TypeScript loader first, and then through the Babel loader.

## Modifying tsconfig

Now, if you were to try and build, or run the development server, at this point in time, you would come across an error.
The issue here is - we have Babel interpreting `.jsx` arrow bracket notation (e.g `<div />`) fine; however `.tsx` files are first being passed through `ts-loader`, and this loader won't know how to interpret this notation.
Thus, it throws the error - `TS17004 - Cannot use JSX unless the '--jsx' flag is provided`.

In order to remedy this, we modify our `tsconfig.json` to include the `jsx` compiler option:

```json
{
+   "compilerOptions": {
+       "jsx": ???
+   }
}
```

I have left question marks there as I wish to explore the values available for this option.
In the [TypeScript handbook](https://www.typescriptlang.org/docs/handbook/jsx.html), the three values this can take (`"preserve"`, `"react"` and `"react-native"`) are described, with information about the use cases.
Naively, you might think that the value we should use is `"react"`.
If you checked out the handbook, you might wisely suggest that the value we should use is `"preserve"`, as we wish to then pass it through Babel.
However, I work on the principle that whatever works, works.
I have had variable success with these options, often finding errors saying that React isn't imported in browser.
In asteroid-js, I have this option set to `"react-native"`.
In the boilerplate associated with these notes, it only worked with `"react"`.
However, whatever you can get to work, a key part of making it work is adding the tag `esModuleInterop`, which enables runtime Babel intercompatibility.

With this on, the boilerplate tsconfig reads:

```json
{
    "compilerOptions": {
        "esModuleInterop": true,
        "jsx": "react"
    }
}
```
