# Babel with Webpack

## Intro

Babel is a JavaScript compiler which allows you to use not-yet-supported or even experimental JavaScript without fear of browser incompatibility, by compiling your new or even experimental JavaScript into a form that all browsers should be able to handle.
Handily, Babel can happily work alongside [Webpack](https://github.com/OneSlightWeirdo/npm-notes/blob/master/notes/webpack.md) using the `babel-loader` library.

```
npm install @babel/core babel-loader --save-dev
```

## Getting webpack to work with it

Now, the `WebpackConfig` object in our webpack config file needs to know that it will be running Babel.
To do this, we add a new entry `module`, and provide it with the rules to apply to our code:
```js
    module: {
        rules: [
            {
                test: /\.(js)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            }
        ]
    }
```
One by one, these set the following:
- Test (with Babel) only files whose paths match the RegEx "\.(js)$"; i.e end with the file extension `.js`.
- Exclude testing for any files whose paths match the regex "node_modules"; i.e files in the `node_modules` directory.
- Use the `babel-loader` package (which allows Babel to work with Webpack)

## `.babelrc`

The next step is to add a `.babelrc` file, and tell Babel how to translate.
More information on this may be found [here](https://babeljs.io/docs/en/usage) and [here](https://babeljs.io/docs/en/babel-preset-env); for now we will just rely on the Babel `preset-env`
Simply create a file .babelrc and open in your favourite text editor, typing:
```json
{
    "presets": [
        "@babel/preset-env"
    ]
}    
```

Next, install the preset environment:
```
npm install @babel/preset-env --save-dev
```

Now, running either the webpack or webpack dev server will automatically pass your .js code through babel before packing it.
With the webserver, a failed Babel compile will not update the server but it will keep running, ready to check again when the next modification is saved.

## Adding plugins

Now, say I want to use Optional Chaining in my JavaScript code.
Babel can handle this - I just need to set up the plugin.

```
npm install @babel/plugin-proposal-optional-chaining --save-dev
```

Now, in `.babelrc` simply add the entry `plugins` with the required plugin:

```json
    "plugins": [
        "@babel/plugin-proposal-optional-chaining"
    ]
```
Now, we may "?." to our hearts desire.

## Adding React into the mix

Babel can also handle React.js code.
A good preset for this is `@babel/preset-react`.

In order to use react, you will also of course have to `npm install` all relevant React packages.

## Adding Typescript into the mix

Finally, we will look at combining Webpack, Babel and TypeScript.
In order to do this, we will have to get Babel to first convert ts files to js, and then pass them through the usual Babel processing.

```
npm install typescript ts-loader --save-dev
```

Now, we need to make Webpack convert the .ts code to .js before passing it through Babel.
In our Webpack Config file:

```js
    entry: "./src/ts/index.ts",
    ...
    module: {
        rules: [
            {
                test: /\.(ts)$/,
                exclude: /node_modules/,
                use: [
                    'babel-loader',
                    'ts-loader'
                ]
            }
        ]
    }
```

When loaders are chained in such a way in Webpack, it will execute them one by one in reverse order.
Thus, the above code first converts the TypeScript into JavaScript with `ts-loader`, and then processes that typescript with `babel-loader`.

Finally, the `ts-loader` expects a `tsconfig.json` file.
This can simply be a blank json object:
```json
{
}
```

Now, you may use TypeScript and it will compile fine.
For any further modules you include, you may also have to `npm install --save-dev` the relevant `@types/` package. 
