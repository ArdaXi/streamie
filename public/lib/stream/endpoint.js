/*

 Endpoint Resolver
 
 - Take a URL and return the resolved too address based on a HTTP Redirect
 - Uses the Location: header
 - Works well with tinyurl / snurl / is.gd / twurl

 Endpoint.resolve('http://snurl.com/2luj3', function(url, originalUrl) { 
   alert(url); 
 });

*/

// /endpoint/resolver.php?url=http://snurl.com/2luj3&callback=locate

var Endpoint = new function() {
//  var RESOLVER_URL = 'http://localhost/endpoint/resolver.php';
  var RESOLVER_URL = 'http://almaer.com/endpoint/resolver.php';
  var RESOLVER_CALLBACK = '__Endpoint_resolve';
  
  var count = 0;
  
  // touch my privates
  var append = function(url) {
    var appender = document.createElement('script');
    appender.src = url;
    appender.type = 'text/javascript';
    document.getElementsByTagName('body')[0].appendChild(appender);
  }
  
  // feeling public
  return {
    resolve: function(url, userCallback) {
      var serverCallback = RESOLVER_CALLBACK + (count++);
      var serverUrl = RESOLVER_URL 
                    + '?url=' + url
                    + '&callback=' + serverCallback;

      // Global link to run the callback
      window[serverCallback] = userCallback;

      append(serverUrl); // Hit the server proxy via script append
    },

    isRedirecting: function(newurl, originalurl) {
      return (newurl != '') && (newurl != originalurl);
    }
  };
  
};

define(Endpoint());
