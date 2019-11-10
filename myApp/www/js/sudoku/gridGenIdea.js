
var w=[0,100,200,300,400,500,600,700,800,900];
var h = w;
var hcount=0;
var wcount=0;
var outPut = [];

function init(){
  for (var i = 0; i<20;i++){
    outPut[i]="top Left= "+ w[wcount] + ", " + h[hcount];
    itCount();
    console.log(outPut[i]);
  }
}


function itCount(){
  if (wcount==9){
    wcount=0;
    hcount++;
  }else{
    wcount++;
  }
}
init();