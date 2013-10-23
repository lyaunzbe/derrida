/**
 * Loading images
 */

var time = moment();
var fps = 400;
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
    var url = "../img/harem/crop"+currentX+"_"+currentY+".jpg";
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

function startAnim(){
  setInterval(function(){
      if(!paused){
        if(!reconf){
          var image1 = images[randRange(0,images.length-1)];    
          var image2 = images[randRange(0,images.length-1)];
          if(image2.attr('filters') == false){
            image2.attr('filters',  new filter.Grayscale(1));
          }
          image1.animate('.3s', {x:image2.attr('x'), y:image2.attr('y')}, {easing: 'expoInOut'});
          image2.animate('.3s', {x:image1.attr('x'), y:image1.attr('y')}, {easing: 'expoInOut'});
        }else{
          for(var i=0; i< images.length;i++){
            var image1 = images[i];
            var xy = image1._attributes._source.split('crop')[1].split('.')[0].split('_');
            image1.animate('.35s',{
              x:parseInt(xy[0]),
              y:parseInt(xy[1])
            },  {easing: 'expoInOut'});
          }

          reconf = !reconf;
        }
      }
  },fps);
}

stage.on('keydown', function(e){
  if(e.keyCode == 80){
    paused = !paused;
  }

  if(e.keyCode == 82){
    reconf = !reconf;
  }
});
setTimeout(startAnim, 1000);


