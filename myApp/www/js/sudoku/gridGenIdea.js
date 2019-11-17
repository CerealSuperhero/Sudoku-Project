
/* var w=[0,100,200,300,400,500,600,700,800,900];
var h = [0,100,200,300,400,500,600,700,800,900];
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
init(); */

gridSquares = [
  {"gridNumber": 1,"tl":[0,0],"x":[0,100], "y":[0,100], "points": [{ "x": 0, "y": 0 }, { "x": 100, "y": 0 }, { "x": 100, "y": 100 }, { "x": 0, "y": 100 }], "currentValue": 1, "CorrectValue": 9, "hilighted":false },
  {"gridNumber": 5,"tl":[100,100],"x":[100,200], "y":[100,200], "points": [{ "x": 100, "y": 100 }, { "x": 200, "y": 100 }, { "x": 200, "y": 200 }, { "x": 100, "y": 200 }], "currentValue": 1, "CorrectValue": 9 ,"hilighted":false },
];


var w=[0,100,200,300,400,500,600,700,800,900];
var h = [0,100,200,300,400,500,600,700,800,900];
var hcount=0;
var wcount=0;
var outPut = [];
var emptysudoku=    "530070000600195000098000060800060003400803001700020006060000280000419005000080079";
var filledSudokku=  "534678912672195348198342567859761423426853791713924856961537284287419635345286179";
var gridSquares=[];

function init(){
  for (var i = 0; i<20;i++){
    outPut[i]="top Left= "+ w[wcount] + ", " + h[hcount];
    itCount();
    console.log(outPut[i]);
    gridSquares[i]={"gridNumber": 5,"tl":[w[wcount],h[hcount]], "currentValue": 0, "CorrectValue": filledSudokku[i] ,"hilighted":false }
    /* gridSquares[
    {"gridNumber": 5,"tl":[100,100],"x":[100,200], "y":[100,200], "currentValue": 0, "CorrectValue": 9 ,"hilighted":false }
    ] */
    console.table(gridSquares[i])
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