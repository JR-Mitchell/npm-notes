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
$ npm run jest
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
