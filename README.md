Backbone Example
================

### This is my attempt to make and example Contact Manager for a blog post.

### Version: 0.1

##Table Of Contents

* [Introduction](#introduction)
* [Libraries Used](#libsused)
    * Front End
    * Back End
* [Directory Structure](#directorystructure)
* [First Steps](#firststeps)

* [Change Log](#changelog)

<a name="introduction"> Introduction: </a>
---
This repo is ment to serve as an example on how to use require.js, backbone.js together in harmony. I have been using backbone for a while now and wanted to take a crack at seeing if I could possibly teach others how to use the library to the fullest extent. Also wanted to teach you about using require.js to help understand the way AMD works.

<a name="libsused"> Libraries Used: </a>
---
### Front End
  - [jQuery](https://github.com/jquery/jquery)
  - [Backbone](https://github.com/documentcloud/backbone)
    - [lodash](https://github.com/bestiejs/lodash) - I have used lodash because underscore has stripped the AMD support
  - [Require.js](https://github.com/jrburke/requirejs)
    - Template Plugin
      - [require-handlebars-plugin](https://github.com/SlexAxton/require-handlebars-plugin)

### Back End
  - [Node.js](https://github.com/joyent/node)
  - [jade](https://github.com/visionmedia/jade)
  - [express](https://github.com/visionmedia/express)
  - [underscore](https://github.com/documentcloud/underscore)
  - [connect-gzip](https://github.com/nateps/connect-gzip)

<a name="directorystructure"> Directory Structure: </a>
---
  Here is the directory structure:

  ```
--client
----assets
------css
------img
------js
----src
------collections
------models
------templates
------views

--server
----lib
----node_modules
----views

```

<a name="firststeps"> First Steps: </a>
---

  1. Install Node [Install Wiki Page](https://github.com/joyent/node/wiki/Installation)
    * I personally like to install node from the source, that way when you need to update node all you have
    to do is update the repo on you machine and check out the new branch and re-make node.

  2. Create a new Directory

  3.

  #. Create a config.js file.


```javascript
require.config({
  baseUrl: 'src/',

  deps : ['main'],

  paths: {
    jquery: '../assets/js/jquery-1.7.2.min',
    // Use lodash because underscore has removed AMD support
    underscore: '../assets/js/lodash.min',
    backbone: '../assets/js/backbone.min',

    // These are for the template handling
    hbs: '../assets/js/hbs',
    Handlebars: '../assets/js/handlebars',
    i18nprecompile : '../assets/js/i18nprecompile',
    json2 : '../assets/js/json2'
  },
  shim: {
    backbone: {
      deps: ['underscore','jquery'],
      exports: 'Backbone'
    }
  },
  hbs : {
      templateExtension : 'hbs',
      disableHelpers: true,
      disableI18n : true
  }
});
```

<a name="changelog"> Change Log:</a>
---

### v0.1
  * Initail Commit