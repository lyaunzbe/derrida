var gm = require('gm')
  , path = require('path')
  , async = require('async')
  , dir = path.resolve(__dirname, '..', 'public/img')

var im = gm.subClass({ imageMagick: true });

exports.dinosaurs = function(req,res){
  var width = 50
     ,height = 50;
  
  var x = 0
     ,y = 0;

  async.whilst(
    function(){
          console.log(x);
      console.log(y);

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
