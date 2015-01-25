Fork of the once popular gulp-ember-handlebars (but now it's not maintained)

## Usage

First, install `gulp-ember-handlebarz` as a development dependency:

```shell
npm install --save-dev gulp-ember-handlebarz
```

Then, use the plugin in your `gulpfile.js`:

```javascript
var handlebars = require('gulp-ember-handlebarz');

gulp.task('templates', function(){
  gulp.src(['app/templates/*.hbs'])
    .pipe(handlebars({
      outputType: 'amd'
     }))
    .pipe(concat('templates.js'))
    .pipe(gulp.dest('build/js/'));
});
```

## API

#### options.outputType
Type: `String`
Default: `amd`

The desired output type. One of the following:

* `browser` - Produce plain JavaScript files for the browser.
* `amd` - Produce AMD modules.
* `cjs` - Produce CommonJS modules.

### options.templateRoot
Type: `String`
Default: `templates`

This option specifies the name of the root directory for template files.

### options.namespace
Type: `String`
Default: `Ember.TEMPLATES`

This option is only necessary when `options.outputType` is `browser`. This
option's value is the namespace that is assigned the pre-compiled templates.
Use dot notation (e.g. 'Ember.Templates`) for nested namespaces.

### options.processName
Type: `Function`
Default: Strip file extension

This option accepts a function which takes one argument (the template name)
and returns a string which will be used as the key for the precompiled
template object. By default, the filename minus the extension is used.

### options.compilerOptions
Type: `Object`

Compiler options to pass to `Ember.Handlebars.precompile()`
