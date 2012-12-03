/**
 *
 * VISUALIZATIONS UNO
 *
 */

paused = false;
var clips = [];
var beans = function(){
    this.addTo(stage);
    var clippingObject = new Rect(randRange(10,505), randRange(10,650),10,10);
    //clippingObject.addTo(clips);
    clips.push(clippingObject);
    this.attr('clip', clippingObject);
};

var x = 0;

while(x < 200){
  var image = new Bitmap('../img/mustachio.jpeg').
    on('load', beans);
  x++;
}


setInterval( function(){
  for(var y=0; y < clips.length;y++){     
    var dice = Math.random()*100;
    if(dice > 50){
      clips[y].animate('2s',{width: randRange(50,500)});
      clips[y].animate('5s',{y:randRange(0,400)}, {easing:'quartInOut'});
    }else{
      clips[y].animate('2s',{width: randRange(50,500)});
      clips[y].animate('5s',{y:randRange(400,700)}, {easing:'quartInOut'});

    }
  }
}, 5200);

stage.on('key', function(e){
  if(e.keyCode == 112){
    paused = !paused;
  }  
})

