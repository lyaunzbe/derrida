
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
      title:'Harem Women Feeding Pigeons in a Courtyard',
      subtitle:'by Jean-Léon Gérôme',
      width:700,
      height:500
    },
    3: {
      title:'Reply of the Zaporozhian Cossacks',
      subtitle: 'by Ilya Repin',
      width: 1000,
      height: 590
    },
    4:{
      title:'Madame X',
      subtitle:'by John Singer Sargent',
      width:902,
      height:600
    },
    5:{
      title:'Lady Agnew of Lochnaw',
      subtitle:'by John Singer Sargent',
      width:700,
      height:877
    }
  };
  /**
   * Injects some necessary html for the current page
   */
  function loadPage(callback){
    console.log(currentPage);
    $('#wrapper').append("<div id='frame' class='v"+currentPage+"'></div>\
                         <nav class='nav"+currentPage+"'><a id='prev' href='#'>Prev</a><a id='next' href='#'>Next</a></nav>\
                         <h2 id='title'>"+pages[currentPage].title+"</h2>\
                         <h4 id='subtitle'>"+pages[currentPage].subtitle+"</h4>");
    loadHandler();
    callback();
  }

  /**)
   * Intercepts navigation to add some sexy FX
   */
  var gateKeeper = true;
  function loadHandler(){
  $('nav a').on('click', function(e){
    var that = this;
    console.log(gateKeeper);
    e.preventDefault();
    $('#wrapper').fadeOut(250, function(){
        $('#wrapper').empty();
        var id = $(that).selector.id;
        if(id == 'next'){
          if(currentPage < 5 )
          currentPage++;
        }else if(id =='prev'){
          if(currentPage > 2) currentPage--;
        }
        loadPage(function(){
          $('#wrapper').fadeIn(250, function(){
            runViz();
          });
        });
      });
    return true;
    });
  }


  var currentPage = 1;

  /**
   * Handles bonsai run configs throughout
   */
  function runViz(){
    console.log(currentPage);
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

  //$('#wrapper').on('keydown', function(e){
    //if(e.keyCode == 78){
      //console.log('next');
      //currentPage++;
      //bonsai.run(document.getElementById('frame'), 'js/v'+currentPage+'.js');
    //}else if(e.keyCode == 80){
      //if(currentPage !== 1){
        //console.log('prev');
        //bonsai.run(document.getElementById('frame'), 'js/v'+currentPage+'.js');
        
      //}
    //}
  //});

  /**
   * Begins the viz app
   */
  function init(){

    loadHandler();
    $('#frame').addClass("v"+currentPage);
    runViz();
  }

  /**
   * Go
   */
  init();

});

