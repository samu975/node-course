---
title: Project manifest
---

# Project manifest

Usually Node.js projects will need to have a package.json file. What is a package.json file?

A package.json file is a manifest of your project that describes the packages and applications it depends on and specific metadata like the project's name, description, and author.
You can create this file by your own or generate base manifest using npm cli, that is more exquisite way:

```shell
npm init
```

Command above will ask you to answer some questions to specify base metadata of you project tp generate package.json file. You can add `-y` flag in the end of the command to skip this questions and use default metadata for you project.

## Manifest structure

We have discovered what is package.json is, and now lets check how the project manifest looks like by example:

```json
{
  "name": "gmp-node", // The name of your project
  "version": "0.0.1", // The version of your project
  "description": "Project developed during GMP node course.", // The description of your project
  "main": "app.js", // Entry point
  "license": "MIT", // The license of your project
  "scripts": {
    "start": "node app.js"
  },
  "devDependencies": {
    "cross-env": "~7.0.3",
    "supertest": "6.2.3",
    "jest": "^28.1.0"
  },
  "dependencies": {
    "pg": "8.7.3",
    "uuid": "~8.3.2",
    "express": "^4.18.1"
  }
}
```

There are more sections that can be used inside package.json and you can find them in official [documentation](https://docs.npmjs.com/cli/v8/configuring-npm/package-json)

### Base metadata

As you can see the package.json file is structured in the JSON format, which allows it to be easily read as metadata and parsed by machines.
Such field like `name`, `version`, `description`, `main` and `license` is base metadata that describe you project. Section `scripts` is a commands that can be described by developer to run npm modules with specified argument. As example, we can create script that set up environment and run node server in one line.

### Scripts

The `scripts` property of your package.json file supports a number of built-in scripts and their preset life cycle events as well as arbitrary scripts. These all can be executed by running `npm run <stage>` for short:

```shell
npm run start
```

### Dependencies

One of the important aspect of a package.json is that it contains a collection of any given project's dependencies. These dependencies are the modules that the project relies on to function properly. 

Having these dependencies in your package.json allows the project to install the versions of the modules it depends on. To install all the dependencies from the package.json file you need to run the following command:

```shell
npm install
```

If you are planning on downloading and using module in your project for testing or on building phase, it's best to map these additional dependencies in a `devDependencies` object. Those dependencies will be installed during `npm install` command unless you pass `--production` flag or `NODE_ENV=production`.


## Managing dependencies
NPM provide command `npm install <module>` to install modules. In case if you need install this dependency and save it to package json you can add `--save` flag or `--save-dev` to save it as development dependency.

For example, if you want to install Express (the most used and most well known Node.js web framework), you will run the following command:

```shell
npm install <express> --save
```

This command will install the module into `./node_modules` folder in the current directory and add it to package.json. Whenever you install a module from npm, it will be installed into the node_modules folder.

Install command has one more option, it allows installing modules globally: 

To install a module from npm globally, you'll simply need to use the `--global` flag when running the `install` command:
```shell
npm install <module> --global
```

It can be useful when you have some utility that can improve you development experience but not related to the current project. 


