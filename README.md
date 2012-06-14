Backbone Example
================

### This is my attempt to make and example Contact Manager for a blog post.

### Version: 0.1

##Table Of Contents

* [Introduction](#introduction)
* [Libraries Used](#libsused)
  * [Front End](#frontEnd)
  * [Back End](#backEnd)
* [Directory Structure](#directorystructure)
* [First Steps](#firststeps)
* [Working witrh Node/Jade](#workingNode)
* [Starting with Require](#startRequire)
* [Main Application](#mainApplication)

* [Change Log](#changelog)

<a name="introduction"> Introduction: </a>
---
This repo is ment to serve as an example/comprehensive introduction on how to use require.js, backbone.js together in harmony. Also I will show the basics of Node. I have been using backbone for a while now and wanted to take a crack at seeing if I could possibly teach others how to use the library to the fullest extent. Also wanted to teach you about using require.js to help understand the way AMD works. These instructions will go over most of what backbone has to offer.

<a name="libsused"> Libraries Used: </a>
---
### <a name="frontEnd">Front End </a>
  - [jQuery](https://github.com/jquery/jquery)
  - [Backbone](https://github.com/documentcloud/backbone)
    - [lodash](https://github.com/bestiejs/lodash) - I have used lodash because underscore has stripped the AMD support
  - [Require.js](https://github.com/jrburke/requirejs)
      - [require-handlebars-plugin](https://github.com/SlexAxton/require-handlebars-plugin) - Template Plugin for Require
  - [LESS](https://github.com/cloudhead/less.js)
      * This is **only** for **development**! I always compile to css when in production.

### <a name="backEnd">Back End </a>
  - [Node](https://github.com/joyent/node)
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

  1. Install Node ([Install Wiki Page](https://github.com/joyent/node/wiki/Installation))
    * I personally like to install node from the source, that way when you need to update node all you have
      to do is update the repo on you machine and check out the new branch and re-make node. (Yes I know there are other options but this is the way I prefer.)
    * If you already have node installed you can just clone the repo and run npm install.

  2. Create a new Directory (eg. Backbone Example)
    * Impliment [Directory Structure](#directorystructure)

  3. Create a server to work on this locally
    * You can use the server files I have provided or spin up your own.

<a name="workingNode"> Working With Node/Jade </a>
---
###1. Installing the npm packages

      ```bash
        $ npm install express
      ```

       ```bash
        $ npm install connect-gzip
       ```

###2. Create the ```index.js``` file


  * To start define the modules/other vars  needed


    ```javascript
      var express = require('express')
        , ENV = process.env['NODE_ENV'] || 'development'
        , config = require('./config')[ENV]
        , cluster = require('cluster')
        , gzip = require('connect-gzip')
        , app = express.createServer()
        , publicDir = __dirname + '/../client'
        ;
    ```


  * Then the express server logic

    Express is a very easy to use web framework for setting up node servers. The documentation is excellent. Diving in to this
    is very easy. Below you will find a set up example.


  1. First you should should have define the vars that require the express framework logic as seen above.
  2. Then take the ```app``` that was defined and setup the configuration for the server.
  3. I am using Jade for the views so point it to the directory that is holding the views.
      ``` app.set('views', __dirname + '/views') ```
  4. Set the view options ```.set('view options', { 'layout': false, pretty: true }).set('view engine', 'jade');```
  5. Setup the other options which include the bodyParser, cookieParser, favicon, and gzip.
  6. Point the server to the directory that holds the application files (js,imgs,styles)
  7. Connect the router. ```app.use(app.router);```
    * When using Jade you can use a layout which holds the header information and base scripts/styles that are required on all the pages.


  ```javascript
    app.set('views', __dirname + '/views')
      .set('view options', { 'layout': false, pretty: true })
      .set('view engine', 'jade');


    app.use(express.bodyParser())
       .use(express.cookieParser())
       .use(express.favicon())
       .use(gzip.gzip({ flags: '--best' }))
    ;

    app.use(express.static( publicDir ));
    app.use(app.router);
  ```

###3. Set up the Routes

  If you look in the ```index.js``` file you can see this ```require('./lib')(app);``` after the server config options.
  I seperate the main server logic into the lib folder. This is so you can seperate the code in smaller files.

  1. In the lib folder there needs to be an ```index.js``` file.
    * This is going to include the pointer to the routes file

  ```js
    module.exports = function () {
      require('./routes').apply(this, arguments);
    };
  ```

  2. In the routes file you will see this which has the very basic routes
    * ```res``` is short for response.

  ```js
    module.exports = function (app) {

      app.get('/data/sampledata',function(req,res){
        res.send(sampleData);
      });

      // Index Page
      app.get('/', function(req, res) {
        res.render('index');
      });


      // All other pages
      app.get('/:page',function(req,res) {

        // View Partial
        res.partial(req.params.page);
      });

    }
  ```

  The basic route which renders the index page.

  ```js
    app.get('/', function(req, res) {
      res.render('index');
    });
  ```

  This listens for when the base url is sent then renders the index page.

  For the other pages what I am doing is just sending the view partial. In the main application logic what I am doing is sending a request ```'/somepagename'``` if it is not already cached on the client side. The server just has to return the partial page and it inserts it in the the ```main``` body. You will see the request later on.

## Jade

  With Jade it makes coding the html pages easier and faster. Also with template inheritance you can seperate parts of the html that you might reuse across the site.

  * So an example layout might look like this.

  ```jade
    !!! 5
    html(lang="en").no-js
      head
        title= typeof(title) !== 'undefined' ? title : "Site Title"
        meta(http-equiv="X-UA-Compatible", content="IE=edge,chrome=1", charset="utf-8")
        meta(name="viewport", content="width=device-width")

        link(rel="stylesheet", href="/assets/css/style.css")
        block styles

      body
        header
          p standard header stuff could go here

        block content

        script(src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js")
        block scripts
  ```

  * This would be what the index page might contain.
  * As you can see with the ```jade
  extends layout
  ``` at the top it takes everything from the layout file and then adds what is in the individual page file.
  * Where you see ```jade
  block content
  ```

  ```jade
    extends layout
    block content
      #main

      footer
  ```


<a name="startRequire"> Starting with Require.JS</a>
---
  1. Create a config.js file.
    * Place it in the ```src``` folder under the ```client``` main folder.


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

<a name="mainApplication"> Main Application</a>
---


<a name="changelog"> Change Log:</a>
---

### v0.1
  * Initail Commit