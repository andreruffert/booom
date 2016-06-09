# BOOOM!

> A simple CLI to scaffold some files or folder structures to kickstart new projects.

BOOOM! is a tool which helps you to rapidly get started with a new project. 
A common use cases would be to create some basic config files like e.g. `.editorconfig`, `.gitattributes`, `.gitignore` etc.
To create them every time manually can be really annoying. With `booom` it's just a simple terminal command and you can start coding immediately. "BOOOM!" that's it.

## Install

First thing is to install `booom` globally using `npm`:

```console
$ npm install --global booom
```

## Usage

```console
$ booom --help
  
  Usage:
    $ booom <url>

  Options:
    --help      Show information
    --version   Show current version

  <url> should be a .zip file
  
  Examples
    $ booom https://github.com/andreruffert/booom--standard/archive/master.zip
```

## Scaffolding templates

A very simple scaffolding template could be e.g. [this](https://github.com/andreruffert/booom--standard/).
All files/folders located in the templates directory would be extracted to your current working directory (i.e. the directory from which you invoked the `booom` command).

## License

MIT © [André Ruffert](http://andreruffert.com)
