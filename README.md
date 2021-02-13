<p align="center">
  <img src="https://github.com/oneshadab/minigen/blob/master/docs/logo.png">
</p>
<hr>

## MiniGen
> A mini static site generator powered by [Node.js](https://nodejs.org/)

[![NPM version](https://badge.fury.io/js/minigen.svg)](https://www.npmjs.com/package/minigen)
![Build Statud](https://img.shields.io/badge/build-passing-blue)
![Required Node version](https://img.shields.io/badge/node-%3E%3D12.1.0-yellow)
![Coverage Status](https://img.shields.io/badge/coverage-92%25-green)
![NPM](https://img.shields.io/npm/l/minigen)

### Installation
```
npm install minigen
```

### Usage
```
minigen [options] [command]

Options:
  -V, --version                              output the version number
  -h, --help                                 display help for command

Commands:
  build <site-directory> [output-directory]  build site from layout and templates
  watch <site-directory> [output-directory]  watch for changes and rebuild
  serve <directory> [port]                   serve static site from directory
  help [command]                             display help for command
```

Example
```
minigen build my-site
```

### Site Layout
```
site
├── layouts
│   └── post.hbs
├── pages
│   ├── first_post.md
│   └── second_post.md
└── static
    ├── js
    │   └── script.js
    └── css
        └── styles.css

```

#### Layout folder
This folder contains the layout templates wrtting using `.hbs`.

See `example/layouts/` as an example

#### Pages folder
This folder contains the pages to be generated. A page is written using github-flavoured markdown and has a reference of the layout to use when generating the page.

See `example/pages/` as an example

#### Static folder
This folder contains the static assets to be used by the site. The folder is copied to the final site, so any directory structure is preserved as is.

See `example/static/` as an example
