/**
 * Loading images
 */

var time = moment();
var diff = randRange(10,15);
var reconf = false,
    paused = false;

var currentX = 0,
    currentY = 0;

var images = [];
var imageHandler = function(){
  console.log(this._attributes._source);
  var xy = this._attributes._source.split('crop')[1].split('.')[0].split('_');
  this.attr({
    x:parseInt(xy[0]),
    y:parseInt(xy[1])
  });
  this.addTo(stage);
}

function init(){
  while(!((currentX == 700) && (currentY == 450))){
    var url = "../img/temp/crop"+currentX+"_"+currentY+".jpg";
    images.push(new Bitmap(url).on('load', imageHandler));
    amet();
  }
}

init();

function amet(){
      currentX+=50;
      if((currentY!==450) && (currentX == 700)){
        currentX = 0;
        if(currentY !== 450) currentY+=50;
      }
}


setInterval(function(){
    if(!paused){
      var now = moment();
      if(now.diff(time, 'seconds') == diff){
        reconf = !reconf;
      }
      if(!reconf){
        var image1 = images[randRange(0,images.length-1)];    
        var image2 = images[randRange(0,images.length-1)];
        if(image2.attr('filters') == false){
          image2.attr('filters',  new filter.Grayscale(1));
        }else{
          image2.attr('filters',  new filter.Grayscale(0));
        }

        if(image1.attr('filters') == false){
          image1.attr('filters',  new filter.Grayscale(1));
        }else{
          image1.attr('filters',  new filter.Grayscale(0));
        }

        image1.animate('.5s', {x:image2.attr('x'), y:image2.attr('y')}, {easing: 'expoInOut'});
        image2.animate('.5s', {x:image1.attr('x'), y:image1.attr('y')}, {easing: 'expoInOut'});
      }else{
        for(var i=0; i< images.length;i++){
          var image1 = images[i];
          var xy = image1._attributes._source.split('crop')[1].split('.')[0].split('_');
          image1.animate('.35s',{
            x:parseInt(xy[0]),
            y:parseInt(xy[1])
          },  {easing: 'expoInOut'});
        }
        time = moment();
        diff = randRange(2,10);
        reconf = !reconf;
      }
    }
},700);

stage.on('keydown', function(e){
  console.log(e);
  if(e.keyCode == 80){
    paused = !paused;
    time = moment();
    diff = randRange(2,10);
  }  
});

