/*
 * Module for managing background mode in Chrome.
 */

require.def("stream/background",
  function() {
    
    if(location.search.indexOf('background=true') != -1) {
      $(document).bind("streamie:init:complete", function () {
        window.Streamie_Loaded = true;
      })
    } else {
      if(window.chrome.app.isInstalled) {
        var bg = window.open('/?background=true#yah', 'background', 'background');
        window.Background = bg;
      }
    }
    
    return {}
  }
);