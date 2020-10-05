# npm

## Intro

NPM (Node Package Manager) allows you to easily install JavaScript packages and use them in projects.
Anyone familiar with using Python on a Linux machine may see npm to Node-based JavaScript as pip is to Python.

Like pip has `pip install -r requirements.txt`, npm has `npm install`.
Note that this has no arguments - default behaviour installs from a present `package.json` file in the current working directory.
We will explore this first

## `package.json`

In a clean working directory, calling `npm init` leads you through the process of creating a basic `package.json` file.
This will ask a few questions (e.g about package keywords, license, author etc.) and generate a basic `package.json` file from your answers.

### Adding npm scripts

If you modify the `package.json` file with an editor of your choice, you will see a section named `scripts`.
Each key-value pair in the `scripts` section specifies an npm command macro - the key being the macro name and the value its command.
The macro can involve normal command line scripts, or npx commands (i.e commands calling to installed package binaries).
Commands may be run one after the other by placing a double-ampersand (`&&`) between them.
Once a key-value pair has been added to the `scripts` section, calling
```
npm run {key}
```
will execute the macro.

### npm scripts and arguments

Sometimes you will wish to send additional arguments to the underlying programs run by npm scripts.
There are a few ways of going about this.
Originally I outlined these ways here, but decided that the explanation and details were far too long for this introductory file on npm.
If you wish to learn about passing arguments to scripts, my notes on the topic may be found [here](https://github.com/JR-Mitchell/npm-notes/blob/master/notes/npm%20arguments.md).

### npx and package binaries

Some packages, such as webpack or jest, implement their own commands into the package via package binaries.
When adding an npm script, these may be run by simply calling their name - e.g the line `test: jest` in `package.json` will run the jest package binary with the command `npm run test`.
However, one may not run these binaries simply by typing the command into the terminal at package level.
Doing so will throw the following error:

```bash
$ jest
command 'jest' not found
```

Instead, in order to run an npm package binary without setting up a script (e.g if running a one-time setup command), the command `npx` will execute a package binary.

```bash
$ npx jest #This will work, presuming jest is properly set up
```

## Installing packages

Packages can be installed with
```bash
$ npm install {package_name}
```
and information about the installation will be automatically added into the `dependencies` section of the `package.json` file.

If the package is a tool for development and not a package that will be included in the finalised JavaScript (e.g Babel, TypeScript, [Webpack](https://github.com/OneSlightWeirdo/npm-notes/blob/master/notes/webpack.md)), then you should instead install with
```bash
$ npm install {package_name} --save-dev
```

Doing as such will instead add the package to the `devDependencies` section of the `package.json`.
Then, if you later need to run the product but don't need any of the development tools, running
```bash
$ npm install --production
```
installs from `package.json` but ignores everything in `devDependencies`.

## Uninstalling packages

An easy (but potentially dangerous) trick to uninstall all installed packages before removing a directory is
```bash
$ cd node_modules
$ npm uninstall *
```

Be aware that, if you have a package both uninstalled globally and in the current package, this may uninstall it globally.
However, in most situations this should not be the case.
