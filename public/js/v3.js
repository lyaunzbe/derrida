
var images = [];
var north = true;
var currentX = 0,
    currentY = 0;
var paused = false;

var time;
var imageHandler = function(){
  console.log(this._attributes._source);
  var xy = this._attributes._source.split('crop')[1].split('.')[0].split('_');
  this.attr({
    x:parseInt(xy[0]),
    y:0
  });
  

  this.addTo(stage);
}


function init(){
  while(currentX !== 1000){
    var url = "../img/ilya/crop"+currentX+"_"+currentY+".jpg";
    images.push(new Bitmap(url).on('load', imageHandler));
    currentX+=8;
  }
  time = moment();

}

function distance(x1,y1,x2,y2){
  var xs = 0;
  var ys = 0;
  xs = x2-x1;
  xs *= xs;
  ys = y2- y1;
  ys *= ys;
  return Math.sqrt( xs + ys );
}

setInterval(function(){
  if(!paused){
  var mult = moment().diff(time,'seconds');
  if(mult>20){
    time = moment();
    mult = 0;
  }
  //console.log(1*mult);
  for(var i = 0; i<images.length;i++){
    var image = images[i];
    var rand = randRange(0,10);
    if(north){
       if(image.id % 2 == 0){
        image.animate('.8s', {y:-2-(3.5*mult)},{easing: 'sineInOut'});
      }else{
        image.animate('.8s', {y:2+(3.5*mult)},{easing: 'sineInOut'});
      }
    }else{
      if(image.id % 2 == 0){
        image.animate('.8s', {y:2+(3.5*mult)},{easing: 'sineInOut'});        
      }else{
        image.animate('.8s', {y:-2-(3.5*mult)},{easing: 'sineInOut'});                
      }
    }
  }
    north = !north;
  }
  
},800);

stage.on('keydown', function(e){
  console.log(e.keyCode);
  if(e.keyCode == 80){
    paused = !paused;
  }  
});


init();

