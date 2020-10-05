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

Imagine that we have the following script to launch a development server:

```
dev: webpack-dev-server --mode development
```

and wish to be able to change the port it runs on.

#### Using `--`

The `--` argument to `npm run` appends all following arguments to the script, such that

```bash
$ npm run dev -- --port 8080
```

will run

```
webpack-dev-server --mode development --port 8080
```

or, more generally,

```bash
$ npm run dev -- (any arguments)
```

will run

```
webpack-dev-server --mode development (any arguments)
```

#### Using passed arguments

Modifying the script to read

```
dev: webpack-dev-server --mode development --port $npm_config_port
```

allows one to specify the port by calling

```bash
$ npm run dev --port=8080
```

This method has some advantage over `--` in that it allows the use of values anywhere in the script rather than just appending them.
However, this method falls short when it comes to default behaviour - calling

```
$ npm run dev
```

will now run

```
webpack-dev-server --mode development --port
```

(since the environmental variable has not been set and is thus empty), and thus will throw an error, as a value of `true` is not a valid port.

#### Using config arguments

Modifying the script to read

```
dev: webpack-dev-server --mode development --port $npm_package_config_port
```

and adding the line to `package.json`:

```
    "config": { "port": "8080" }
```

will make it so that the default behaviour of `npm run dev` runs on port 8080.
Furthermore, calling

```
$ npm run dev --(packagename):port=5000
```

(where `(packagename)` is replaced with the name of the package) will change the port to `5000` on this particular occasion.
This is perhaps a bit cumbersome, but it works.

Furthermore, if the user wishes to consistently use a particular port different to the one you specified, they may simply modify the value in `package.json`.

NB: The documentation for `npm config` asserts that running `npm set (packagename):port 5000` will change the value of `$npm_package_config_port` to `5000`, automatically modifying `package.json`.
However, I tried this on my machine and it just... didn't do that. So, if this works for you, then that's great, and will probably make your life easier. However, it ain't working for me.

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
```
npm install {package_name}
```
and information about the installation will be automatically added into the `dependencies` section of the `package.json` file.

If the package is a tool for development and not a package that will be included in the finalised JavaScript (e.g Babel, TypeScript, [Webpack](https://github.com/OneSlightWeirdo/npm-notes/blob/master/notes/webpack.md)), then you should instead install with
```
npm install {package_name} --save-dev
```

Doing as such will instead add the package to the `devDependencies` section of the `package.json`.
Then, if you later need to run the product but don't need any of the development tools, running
```
npm install --production
```
installs from `package.json` but ignores everything in `devDependencies`.

## Uninstalling packages

An easy (but potentially dangerous) trick to uninstall all installed packages before removing a directory is
```
cd node_modules
npm uninstall *
```

Be aware that, if you have a package both uninstalled globally and in the current package, this may uninstall it globally.
However, in most situations this should not be the case.
