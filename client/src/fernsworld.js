define([
  'jquery',
  'underscore',
  'backbone'
],

function( $, _, Backbone ) {

  return {
      // Set the global FernsWold Object with empty router,model,collection,view,template objects
      Router : {}
    , Models : {}
    , Collections : {}
    , Views : {}
    , Templates : {}
    , Pages : {}
    ,
    // This loads the pages
    loadPage : function (name, cb) {
      var that = this
        , $main = $('#main')
        ;
      // This determins if the page was already stored in the template object
      if(that.Pages[name]){
        $main
          .empty()
          .append(that.Pages[name]);
        return cb({ error: false });
      }
      // If not already loaded into the template object call it from the server
      $.ajax({
          'url': 'partial/' + name
        , 'type': 'GET'
        , 'dataType': 'html'
        , beforeSend : function () {
            // Empty the contents from the main body tag
            $main.empty();
          }
        , success : function (data) {
            // Put the page into the cache
            that.Pages[name] = data;
            // Append the page to the main body tag.
            $main.append(data);
            return cb({ error : false });
          }
        , error : function (data) {
            return cb({ error : true });
          }
      });
    },
    errorHandler : function (error) {
      console.log(error);
      $('#main').text('404');
    },
    indexPageHandler : function (cb) {
      var $main = $('#main')
        , that = this
        ;

      // If the index page is already stored grab it and load it
      if( that.Pages['index'] ) {
        $main
          .empty()
          .append(that.Pages['index']);
        return cb();
      }
      // If this is the first page upon visit or refresh store it in the pages
      if( _.isEmpty(that.Pages) ) {
        var indexHTML = $main.html();
        that.Pages['index'] = indexHTML;
        return cb();
      } else {
        // If this is the first visit to the index page after visting another page grab it and store it
        $.ajax({
          'url' : '/',
          'type' : 'GET',
          'dataType' : 'html',
          beforeSend : function () {
            // Empty the contents from the main body tag
            $main.empty();
          },
          success : function(data) {
            var regMain = /<div id="main">/
              , regFooter = /<footer>/
              , mainIndex = data.match(regMain).index
              , footerIndex = data.match(regFooter).index
              , indexHTML = data.slice(mainIndex,footerIndex)
              ;

            that.Pages['index'] = indexHTML;
            $main.append(indexHTML);
            return cb();
          }
        });
      }
    }
  };
});

