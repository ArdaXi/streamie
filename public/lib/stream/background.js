/*
 * Module for managing background mode in Chrome.
 */

require.def("stream/background",
  function() {
    
    var m = {};
    
    if(location.search.indexOf('background=true') != -1) {
      $(document).bind("streamie:init:complete", function () {
        window.Streamie_Loaded = true;
      });
      $(function () {
        $('body').hide(); // no need to *actually* render anything. Just need the HTML.
      });
    } else {
      if(window.chrome.app.isInstalled) {
        var bg = window.open('/?background=true#yah', 'background', 'background');
        window.Background = m.page = bg;
      }
    }
    
    return m;
  }
);