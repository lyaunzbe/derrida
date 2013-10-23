
var images = [];
var currentX = 0,
    currentY = 0;

var time = moment();

var clockdir = 'cw';

var dir = {
  cw: {
    bottomLeft:{y:0},
    topLeft: {x:451},
    bottomRight: {x:0}, 
    topRight: {y:300}
  },
  ccw:{
    bottomLeft:{x:451},
    topLeft: {y:300},
    bottomRight: {y:0}, 
    topRight: {x:0}

  }
}

var imageHandler = function(){
  var x1, y1;
  if(this.id % 2 == 0){
    x1 = 451;
  }else{
    x1 = 0;
  }  

  if(this.id > 2){
    y1 = 300;
  }else{
    y1 = 0;
  }

  this.attr({
   x: x1,
   y: y1
  });

  this.attr('filters',new filter.HueRotate(randRange(0,360)));
  this.addTo(stage);
}

function init(){
  while(images.length < 4){
    var url = "../img/madameX.jpg";
    images.push(new Bitmap(url).on('load', imageHandler));
  }
}

var count = 0;

setInterval(function(){
  //for(var i =0; i< images.length; i++){
    if(moment().diff(time,'seconds')>10){
      time = moment();
      if(clockdir == 'cw')
        clockdir = 'ccw';
      else
        clockdir = 'cw';
    }
    //var image = images[count];
    //image.attr('filters', [ filter.Saturate(randRange(0,20)), filter.HueRotate(randRange(0,360)) ]);
    //image.attr('filters',new filter.HueRotate(randRange(0,360)));
  //}
    //var x = image.attr('x');
    //var y = image.attr('y');
    
    var currentDir = dir[clockdir];
    console.log(currentDir);
  for(var i =0; i< images.length; i++){
    var image = images[i];
    image.attr('filters', [ filter.Saturate(randRange(0,20)), filter.HueRotate(randRange(0,360)) ]);    
    var x = image.attr('x');
    var y = image.attr('y');
    //console.log(x);
    //console.log(y);

    if(x == 0){
      if(y == 300){
        console.log(currentDir.bottomLeft);
        image.animate('.5s', currentDir.bottomLeft, {easing:'quartInOut'});
      }else{
        image.animate('.5s', currentDir.topLeft,{easing:'quartInOut'});
      }
    }else{
      if(y == 300){
        image.animate('.5s', currentDir.bottomRight,{easing:'quartInOut'});

      }else{
        image.animate('.5s', currentDir.topRight,{easing:'quartInOut'});
      }
    }
   }
    //count++;
    //if(count > 3){
      //count = 0;
    //}

},3000)

init();
