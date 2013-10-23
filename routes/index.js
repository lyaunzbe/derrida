var gm = require('gm')
  , path = require('path')
  , async = require('async')
  , dir = path.resolve(__dirname, '..', 'public/img')

var im = gm.subClass({ imageMagick: true });

//Some utility routes for server-side image manipulation/cropping
exports.dinosaurs = function(req,res){
  var width = 50
    , height = 50;
  
  var x = 0
     ,y = 0;

  async.whilst(
    function(){
      return (!(x == 700 && y == 450));
    }, 
    function(callback){
      im(dir + '/harem.jpeg')
      .crop(width, height, x, y)
      .write(dir + "/temp/crop"+x+"_"+y+".jpg", function(err){
        if (err){
          callback(err);
        }else{
          x += 50;
          if((y!==450) && (x == 700)){
            x = 0;
            if(y !== 450)
              y+=50;
          }
          console.log(this.outname + " created  ::  " + arguments[3])
          callback();
        }
       });
    },
    function(err){
      if(err){console.log(err);}
      else{
        console.log('done!');
      }
    }
  )
}

exports.robots = function(req,res){
  var width = 1000,
      height = 590;
  var x = 0
     ,y = 0;

  async.whilst(
    function(){
      return (x !== 1000);
    },
    function(callback){
      im(dir + '/ilya.jpg')
      .crop(8, height, x, y)
      .write(dir + "/temp2/crop"+x+"_"+y+".jpg", function(err){
        if (err){
          callback(err);
        }else{
          x += 8;
          console.log(this.outname + " created  ::  " + arguments[3])
          callback();
        }
       });
    },
    function(err){
      if(err){
        console.log(err);
      }else{
        console.log('done!');
      }
    }
  );


}
