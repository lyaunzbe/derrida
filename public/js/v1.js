/**
 *
 * VISUALIZATION NUMERO UNO
 *
 */

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
  var image = new Bitmap('https://a248.e.akamai.net/camo.github.com/a931dc63120f7773908f7b895b3541567faf0fdc/687474703a2f2f342e62702e626c6f6773706f742e636f6d2f5f34466141766d4a4e5243592f544d4470496e307a6e33492f41414141414141414351732f7951326d326346494c4c632f73313630302f706f7274726169742d6f662d6361726f6c75732d647572616e2d313837392d62792d6a6f686e2d73696e6765722d73617267656e742e6a7067').
    on('load', beans);
  x++;
}

console.log(randRange(10,20));

setInterval( function() {
   for(var y=0; y < clips.length;y++){
    var dice = Math.random()*100;
    if(dice > 50){
      clips[y].animate('2s',{width: randRange(50,500)});
      clips[y].animate('5s',{y:randRange(0,200)});
    }else{
      clips[y].animate('2s',{width: randRange(50,500)});
      clips[y].animate('5s',{y:randRange(500,700)});

    }
  }
}, 5200);


