
$.domReady(function(){
  var currentPage = 1;

  bonsai.run(document.getElementById('frame'), {
      url:'js/v'+currentPage+'.js',
      width:'550',
      height:'700',
      plugins: ['js/utils.js']
    });
  
  $('body').on('keydown', function(e){
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
});

