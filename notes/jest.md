# Jest (with React and TypeScript with Babel with Webpack)

## Intro

Unit testing allows for issues or changes to the way that your code renders to be identified automatically without having to manually look through it and see what it looks like.
One library for unit testing JavaScript code is Jest (presumably a contraction of JavaScript test)

## Basic setup

### Installing

```bash
$ npm install --save-dev jest
```

### Test script

Now, we wish to modify package.json to set the `test` script to run Jest:

```json
    "scripts": {
-       "test": "echo \"No test specified yet. Check out later info on jest.\" && exit 1",
+       "test": "jest",
        ...
    },
```

### Basic test file

Next, we need some test files to run.
In a new directory named `test`, we add the simplest possible test in a file `basic.test.ts`:

```js
test("simplest possible test", () => {
    expect(1).toBe(1);
})
```

Now, simply run 

```bash
$ npm run test
```

and you will see that all tests passed.

If you were to modify the test to, say,

```js
test("simplest possible test", () => {
    expect(1).toBe(2);
})
```

then Jest would throw up an error, as the __expected__ value (`2`) is not equal to the __given__ value (`1`).
The distinction between these two isn't particularly clear here, but in future we will be calling `expect` with arguments other than a primitive.

### Ignoring test files for normal build

There is one final step to be taken for the basic Jest setup.
If you were to now run the webpack dev server, you would find errors about failing to find names `test` and `expect`.
That is because whilst Jest recognises `.test.` files as exclusively for it, none of our other systems know to _ignore_ these files.

Thus, we add the following to our tsconfig:

```json
{
    "compilerOptions": {
        "esModuleInterop": true,
        "jsx": "react"
+   },
+   "exclude": [
+       "node_modules",
+       "test"
    ]
}
```

telling the TypeScript loader to ignore all files found in the test directory.


## Snapshot testing React elements

Snapshot testing involves creating the DOM tree for a particular element, optionally calling events/functions of that element, and then checking the tree against a previously generated tree.

### Setting up

```bash
$ npm install --save-dev react-test-renderer
```

Consider we wish to test the basic `<App>` element found in previous boilerplates, which simply displays "Hello World!".
In the test folder, we would create an `App.test.tsx` file, containing:

```js
import React from 'react';
import renderer from 'react-test-renderer';
import App from '../src/App';

test("App snapshot", () => {
    const tree = renderer
        .create(<App />)
        .toJSON();
    expect(tree).toMatchSnapshot();
})
```

What this does is:

- Create a test render of the React `<App>` component
- Convert the DOM tree for this render to a JSON format
- Compare this rendered tree to the saved snapshot, or save a snapshot if none exists

### Getting Jest to work again

Now, calling

```bash
$ npm run test
```

will throw an error. Jest doesn't recognise ES6 style imports like `import React from 'react'`!
Also, we can't simply change the type of import, as it will also fail to interpret these imports from any imported file in the `src` folder.

Why does this happen?
Simply, we have set up webpack to process our files with TypeScript and with Babel, but Jest doesn't know to do the same.
Thus, we install the equivalent to ts-loader and babel-loader for Jest:

```bash
$ npm install --save-dev babel-jest ts-jest
```

and then create a new file jest.config.js telling Jest how to use these modules:

```js
const JestConfig = {
    "transform": {
        "^.+\\.jsx?$": "babel-jest",
        "^.+\\.tsx?$": "ts-jest"
    },
    "moduleFileExtensions": [
        "js",
        "jsx",
        "tsx",
        "ts",
        "node"
    ]
};

module.exports = JestConfig;
```
Now, calling

```bash
$ npm run test
```

Will pass both tests, and create a snapshot for our `<App>` component.
This snapshot can be found [here](https://github.com/JR-Mitchell/npm-notes/blob/master/jest-demo/test/__snapshots__/App.test.tsx.snap).
I recommend you take a look to see how simple this is.

If you were to then modify the `src/App.tsx` file, say, to change the text to "Yo, universe", running Jest would fail the test, as the snapshot would not match the rendered tree.
If the change to code was intended to change the element like this, you could update the snapshot with

```bash
$ npm run test -- -u
```
