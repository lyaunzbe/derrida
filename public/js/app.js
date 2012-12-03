
$.domReady(function(){
  /**
   * Some config options for the visualizations
   */
  var pages = {
    1: {
      width: 550,
      height: 700
    },
    2: {
      width:700,
      height:500
    }
  };
  /**
   * Injects some necessary html for the current page
   */
  function loadPage(callback){
    console.log(currentPage);
    $('#wrapper').append("<div id='frame' class='v"+currentPage+"'></div>");
    callback();
  }

  /**
   * Intercepts navigation to add some sexy FX
   */
  var gateKeeper = true;
  $('a').on('click', function(e){
    var that = this;
    console.log(gateKeeper);
    if(gateKeeper){
      e.preventDefault();
      gateKeeper = false;
      $('#wrapper').fadeOut(250, function(){
        $('#wrapper').empty();
        currentPage++;
        loadPage(function(){
          $('#wrapper').fadeIn(250, function(){
            runViz();
          });
        });
      }); 
    }
    return true;
  });


  var currentPage = 1;

  /**
   * Handles bonsai run configs throughout
   */
  function runViz(){
    bonsai.setup({
      runnerContext: bonsai.IframeRunnerContext
    }).run(document.getElementById('frame'), {
      url:'js/v'+currentPage+'.js',
      width: pages[currentPage].width,
      height: pages[currentPage].height,
      plugins: ['js/utils.js', 'js/lib/moment.min.js']
    });
  }

  

  /** PAUSING,,,DO I NEED IT?? **/

  $('#wrapper').on('keydown', function(e){
    if(e.keyCode == 78){
      console.log('next');
      currentPage++;
      bonsai.run(document.getElementById('frame'), 'js/v'+currentPage+'.js');
    }else if(e.keyCode == 80){
      if(currentPage !== 1){
        console.log('prev');
        bonsai.run(document.getElementById('frame'), 'js/v'+currentPage+'.js');
        
      }
    }
  });

  /**
   * Begins the viz app
   */
  function init(){

    
    $('#frame').addClass("v"+currentPage);
    runViz();
  }

  /**
   * Go
   */
  init();

});

