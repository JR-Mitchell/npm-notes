# TypeScript with Babel with Webpack

## Intro

TypeScript is a language built to introduce typing to JavaScript.
A TypeScript file with `.ts` extension is compiled down to a JavaScript file with `.js` extension, but if there are any errors due to variables of particular types being misused, a compiler-time error will be thrown and the `.ts` will not be compiled to `.js`.
This allows the programmer to spot and remedy certain issues with their code early on.

As with much in node, there are multiple ways to get TypeScript working.
If you want something done in node, there are always at least two different packages that do the same thing completely differently and cause all sorts of new and exotic conflicts.
There are two different ways that I know of to compile TypeScript with Babel with Webpack in node, and one way that I've actually been able to get working.

1. Using Babel's `@babel/preset-typescript`
2. Using the `ts-loader` webpack typescript loader

I work with the second, as I was singularly unable to get the first to work in the way that I wished to.
You may choose to differ and use the first, and it's perfectly fine if you do, but the rest of this document doesn't cover it in any detail.

## Setting up ts-loader

The first thing to do is install:

```bash
$ npm install typescript ts-loader --save-dev
```

Now, to get `ts-loader` working with babel, we wish to first convert all `.ts` files with this loader, and then take the output and push it through Babel.
In our Webpack Config file, we add another rule:

```js
    entry: "./src/ts/index.ts",
    ...
    module: {
        rules: [
            {
                test: /\.(js)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
+           },
+           {
+               test: /\.(ts)$/,
+               exclude: /node_modules/,
+               use: [
+                   'babel-loader',
+                   'ts-loader'
+               ]
            }
        ]
    }
```

When loaders are chained in such a way in Webpack, it will execute them one by one in reverse order.
Thus, the above code first converts the TypeScript into JavaScript with `ts-loader`, and then processes that typescript with `babel-loader`.

## tsconfig

The `ts-loader` expects a `tsconfig.json` file.
This can simply be a blank json object:
```json
{
}
```

Now, you may use TypeScript and it will compile fine.
*However,* imports from other local TypeScript files will not be followed.

## Getting imports to work

In order to inform webpack that it should look for `.ts` files, the following must be added to the Webpack Config file:
```js
    resolve: {
        extensions: ['.ts', '.js']
    }
```

## Typing with external packages

Many external packages/modules will not come pre-shipped with type declarations for their code.
In this case, the loader will throw an error telling you to install the relevant `@types/` package.
Simply run `npm install --save-dev @types/(package name)`, and the loader will now have access to all the relevant type declarations.
