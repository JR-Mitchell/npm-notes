# npm scripts and arguments

Sometimes you will wish to send additional arguments to the underlying programs run by npm scripts.
There are a few ways of going about this.

Imagine that we have the following script to launch a development server:

```
    "dev": "webpack-dev-server --mode development"
```

and wish to be able to change the port it runs on.

## Using `--`

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

## Using passed arguments

Modifying the script to read

```
    "dev": "webpack-dev-server --mode development --port $npm_config_port"
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

This behaviour can be changed by setting a default value to `$npm_config_port` using the `npm config` command:

```bash
$ npm set config port 5000
```

**However, be aware** that this command sets the value of `$npm_config_port` **globally**, not just for the individual command.

## Using config arguments

Modifying the script to read

```
    "dev": "webpack-dev-server --mode development --port $npm_package_config_port"
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

**NB**: The documentation for `npm config` asserts that running `npm set (packagename):port 5000` will change the value of `$npm_package_config_port` to `5000`, automatically modifying `package.json`.
However, I tried this on my machine and it just... didn't do that. So, if this works for you, then that's great, and will probably make your life easier. However, it ain't working for me.

## A not so elegant combination

The above allows you to have a default value for `port`, but also to specify a different value using `--(packagename):port=`.
However, what if you want to do away with the clunky necessity of prepending the package name every time you wish to use a different port?
Here's a solution that uses bash logical conditions to give this behaviour:

```
    "dev": "[ ! -z "$npm_config_port" ] && webpack-dev-server --mode development --port $npm_config_port || npm run dev --port=$npm_package_config_port"
```

This does the following:

1. Check if `$npm_config_port` is set (either this was called with `--port=` or `npm set config port` has been called
2. If it is, runs `webpack-dev-server` on this port
3. If it isn't, calls this function again with `$npm-config-port = $npm-package-config-port`.

Thus, **as long as `$npm_config_port` hasn't been globally set**, calling

```bash
$ npm run dev
```

will run with the default port, and calling

```bash
$ npm run dev --port=5000
```

will run with port `5000`.
