<p align="center">
  <img src="docs/logo.png">
</p>
<hr>

> A mini static site generator powered by node

### Installation
```
npm install minigen
```

### Usage
```
minigen build [source directory] [output directory]
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