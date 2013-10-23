var images = [];
var count =1;
var prevImg = null;
var time;
var base;

var pos = [
  {x:290,y:110},
  {x:308, y:105},
  {x:308, y:105},
  {x:300, y:90},
  {x:275, y:95},
  {x:280, y:90},
  {x:270, y:90}
];

var imageHandler = function(){
  console.log(this.id);  
  var posn = pos[this.id-2];
  this.attr({x:posn.x,y:posn.y});
  this.attr('filters', new filter.Opacity(0));
  this.addTo(stage);
}
function init(){
  base = new Bitmap('../img/agnew.jpg').on('load', function(){

    this.on('pointermove', function(){
      if(moment().diff(time)> 200){
        delayed = false;
      }
      if(!delayed){
        if(prevImg){
          prevImg.animate('.2s',{filters: new filter.Opacity(0)});
        }
        var image = images[count];
        image.animate('.2s',{filters: new filter.Opacity(1)});
        count++;
        if(count>6){
          count = 0;
        }
        prevImg = image;
        delayed = true;
        time = moment();
      }

      });


    this.on('mouseout', function(){
      if(prevImg){
        prevImg.animate('.2s',{filters: new filter.Opacity(0)});
      }
      base.attr('filters', new filter.Grayscale(0));
    });

    this.on('mouseover', function(){
      base.attr('filters', new filter.Grayscale(1));

    });


    this.addTo(stage);
    while(count<8){
      var url = '../img/a'+count+'.png';
      images.push(new Bitmap(url).on('load', imageHandler));
      count++;
    }
    count = 0;
  });
  time = moment();
}

//setInterval(function(){
  ////if(prevImg){
    ////prevImg.attr('filters', new filter.Opacity(0));
  ////}
  ////var image = images[count];
  ////image.attr('filters', new filter.Opacity(1));
  ////count++;
  ////if(count>2){
    ////count = 0;
  ////}
  ////prevImg = image;
//},500);



init();
