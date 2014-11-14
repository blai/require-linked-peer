#require-linked-peer

> Require from a module installed through `npm link`, for a module as peer dependency.

Those who are developing plugins for tools like `grunt` and `gulp` knows the pain when you try to link your local plugin module into your testing project.

I have tried `[node-parent-require](https://github.com/jaredhanson/node-parent-require)`, which is trying to solve this problem for frameworks like `mongoose`. But it didn't seem to solve the problem well for things like `gulp`, which also has a copy of the module living under the global `node_modules`.

## The scenario

Say I want to organize a set of gulp tasks in a npm module so I can reuse them for a number of projects that shares the same technologies/conventions/structures. So I have this:

```
/reusable-gulp-tasks
├── tasks
│   ├── build.js
│   ├── clean.js
│   ├── serve.js
│   └── watch.js
└── package.json
```

and my `tasks/build.js` may look something like this:

```js
var gulp = require('gulp');

gulp.task('build', function () {
  ...
});
```

Now let's say I use my yeoman generator to scaffold a new project, which looks like this:

```
/my-next-big-project
├── gulpfile.json
└── package.json
``` 

with `gulpfile.json` looking like this:

```js
var gulp = require('gulp');

gulp.task('buildAndMore', ['build'], function () {
  // do something
  ...
});
```

and the `package.json`:

```json
{
  ...
  devDependencies: {
    "gulp": "^3.8.0",
    "reusable-gulp-tasks": "latest"
  }
}
```

Imagine if I used `npm link reusable-gulp-tasks` to bring a local copy of my package into `my-next-big-project`'s child modules list. Then I would run into error: when I do `gulp buildAndMore`, the gulp cli would complain about the `build` task didn't exist. In a typical setup, this is because your `reusable-gulp-tasks` would resolve `gulp` from the global `node_modules` (where the gulp cli is installed), and your `my-next-big-project/gulpfile.json` would resolve `gulp` from the local `node_modules`.

To make this work, I used this `require-linked-peer` module.


## Usage

Install the module with: `npm install require-linked-peer`.

Then in your plugin (e.g. `reusable-gulp-tasks` in the above example)

```js
var requirePeer = require('require-linked-peer');
var gulp = requireLink('gulp');
```


## License

Copyright (c) 2014   
Licensed under the MIT license.
