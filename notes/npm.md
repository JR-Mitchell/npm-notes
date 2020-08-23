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


## Installing packages

Packages can be installed with
```
npm install {package_name}
```
and information about the installation will be automatically added into the `dependencies` section of the `package.json` file.

If the package is a tool for development and not a package that will be included in the finalised JavaScript (e.g Babel, TypeScript, Webpack), then you should instead install with
```
npm install {package_name} --save-dev
```

Doing as such will instead add the package to the `devDependencies` section of the `package.json`.
Then, if you later need to run the product but don't need any of the development tools, running
```
npm install --production
```
installs from `package.json` but ignores everything in `devDependencies`.
