(function () {
    'use strict';

    angular
        .module('sudoku')
        .controller('sudokucontroller', control);

    control.$inject = [

    ];

    function control(

    ) {
        var vm = angular.extend(this, {

        });

        console.log("ALIVE");




        // TODO: Error Handling

    }

    function init() {

        /* for (var i = 0; i<20;i++){
            outPut[i]="top Left= "+ w[wcount] + ", " + h[hcount];
            itCount();
            console.log(outPut[i]);
          } */

        



        startCanvas()

    }

    var emptysudoku=    "530070000600195000098000060800060003400803001700020006060000280000419005000080079";
    var filledSudokku=  "534678912672195348198342567859761423426853791713924856961537284287419635345286179";

    function itCount(){
        if (wcount==9){
          wcount=0;
          hcount++;
        }else{
          wcount++;
        }
      }
    var canvas;
    var ctx;

    /* var gridSquares = [
        {"gridNumber": 1, "points": [{ "x": 0, "y": 2 }, { "x": 100, "y": 2 }, { "x": 100, "y": 100 }, { "x": 0, "y": 100 }], "currentValue": 1, "CorrectValue": 9, "hilighted":false },
        {"gridNumber": 5, "points": [{ "x": 100, "y": 100 }, { "x": 200, "y": 100 }, { "x": 200, "y": 200 }, { "x": 100, "y": 200 }], "currentValue": 1, "CorrectValue": 9 ,"hilighted":false },
    ] */

    var gridSquares = [
        {"gridNumber": 1,"x":[0,100], "y":[0,100], "points": [{ "x": 0, "y": 0 }, { "x": 100, "y": 0 }, { "x": 100, "y": 100 }, { "x": 0, "y": 100 }], "currentValue": 1, "CorrectValue": 9, "hilighted":false },
        {"gridNumber": 5,"x":[100,200], "y":[100,200], "points": [{ "x": 100, "y": 100 }, { "x": 200, "y": 100 }, { "x": 200, "y": 200 }, { "x": 100, "y": 200 }], "currentValue": 1, "CorrectValue": 9 ,"hilighted":false },
    ]

    function hilightSquare(gridSquare) {
        var points = gridSquare.points;
         points[0]= { x:gridSquare.x[0], "y": gridSquare.y[0] }
         points[1]= { x:gridSquare.x[1], "y": gridSquare.y[0] }
         points[2]= { x:gridSquare.x[1], "y": gridSquare.y[1] }
         points[3]= { x:gridSquare.x[0], "y": gridSquare.y[1] }
        ctx.fillStyle = "skyblue";
        ctx.strokeStyle = "black";
        ctx.lineWidth=1;
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        for (var i = 1; i < points.length; i++) {
            ctx.lineTo(points[i].x, points[i].y);
        }
        ctx.lineTo(points[0].x, points[0].y);
        ctx.fill();
        ctx.stroke();

        ctx.closePath();
    }

    function clearSquare(gridSquare) {
        var points = gridSquare.points;
        ctx.fillStyle = "white";
        ctx.strokeStyle = "black";
        ctx.lineWidth=1;
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        for (var i = 1; i < points.length; i++) {
            ctx.lineTo(points[i].x, points[i].y);
        }
        ctx.lineTo(points[0].x, points[0].y);
        ctx.fill();
        ctx.stroke();

        //add code to redraw number here

        ctx.closePath();
    }
    /*
    CONSIDER ATHOL'S METHOD OF HAVING THE GRID LINES GO AROUND THE SQUARES SO FILL +CLEAR DOESN'T DELDETE GRID LINE
    ^^doesn't work, just stack 2 canvases with the background one for the grid and the foreground for numbers and hilights, dont forget to  Z index

    add rectangles to array
    make draw rectangle function for square hilight
    make mouseclick function approx clicks to the nearest square/ square they're in then trigger square draw/hilight
    make square hilight remove function
    figure out why vm isnt working
    add number draw functionality
    import sudoku gen
    make sudoku gen number backgrounds a different colo
    put gen numbers into canvas
    */

    /*
    ARRAY
    json array
    [{
        "Square!":{"gridNumber":1,"points":[{"x":0,"y":0},{"x":100,"y":0},{"x":100,"y":100},{"x":0,"y":100}],"currentValue":1,"CorrectValue":9},
        "Square2":{"gridNumber":5,"points":[{"x":100,"y":100},{"x":200,"y":100},{"x":200,"y":200},{"x":100,"y":200}],"currentValue":1,"CorrectValue":9},
    }]





    expanded
    [{
        "gridNumber":1,
        "points"[
            {"x":0,"y":0},
            {"x":100,"y":0},
            {"x":100,"y":100},
            {"x":0,"y":100}
        ]},
        "currentValue":1,
        "CorrectValue":9
    }]
     */

    function startCanvas() {
        if (document.getElementById("myCanvas")) {
            if (document.getElementById("myCanvas").getContext("2d")) {

                document.getElementById("myCanvas").addEventListener('click', (e) => {
                    //console.log('clicked',e);
                    handleCanvasClick(e);
                })
                canvas = document.getElementById("myCanvas");
                ctx = canvas.getContext("2d");

                initCanvas();
            }


        } else {
            setTimeout(() => {
                startCanvas();
            }, 10);
        }
    }

    function initCanvas() {
        var c = document.getElementById("myCanvas");
        var ctx = c.getContext("2d");

        ctx.beginPath();
        for (var i = 0; i < 10; i++) {
            var j = i * 100;
            ctx.moveTo(j, 0);
            ctx.lineTo(j, 1000);
            ctx.stroke();


            ctx.moveTo(0, j);
            ctx.lineTo(1000, j);
            ctx.lineWidth = 1;
            ctx.stroke();
        }
        ctx.closePath();

        ctx.lineWidth = 5;
        ctx.beginPath();
        for (var i = 0; i < 10; i++) {
            var j = i * 300;
            ctx.moveTo(j, 0);
            ctx.lineTo(j, 1000);
            ctx.stroke();

            ctx.moveTo(0, j);
            ctx.lineTo(1000, j);
            ctx.stroke();
        }
        ctx.closePath();
    }

    // document.getElementById("myCanvas").mousedown(function (e){
    //     handleCanvasClick(e);
    // });

    function handleCanvasClick(e) {
        var canvas = document.getElementById("myCanvas");
        var offsetX = canvas.offsetLeft;
        var offsetY = canvas.offsetTop;
        //get rid of this when move into new app
        //consider adding  code for orizontal offset and vertical offset not ujst header bar
        var topBar = document.getElementsByClassName("bar-stable bar bar-header");
        var topBarHeight = topBar[0].offsetHeight;
        var mouseX = parseInt(e.clientX - offsetX);
        var mouseY = parseInt(e.clientY - offsetY - topBarHeight);

        console.log("clicked!", "x:" + mouseX, "y:" + mouseY);
        
        /* if (mouseX<300) {
            toggleHilight(gridSquares[0]);
            
        } */
        var clickedSquare=null;
        clickedSquare=getSquare(mouseX,mouseY);
        if (clickedSquare!=null) {
            toggleHilight(clickedSquare);
        }
        //toggleHilight(getSquare(mouseX,mouseY));

        draw()
        

    }

    function getSquare(x,y){
        var clickedSquare=null;
        gridSquares.forEach(square => {
            var minX=square.x[0];
            var maxX=square.x[1];
            var minY=square.y[0];
            var maxY=square.y[1];

            if ((minX<x) && (x<maxX ) && (minY<y) && (y<maxY)) {
                clickedSquare=square;
                
            }
        });
        
        if (clickedSquare!=null) {
            return clickedSquare;
        }else{
            console.warn("couldn't find clicked square");
            return null;
        }
        

    }

    function toggleHilight(square){
        square.hilighted=!square.hilighted;
    }

    function draw(){

        
        
        gridSquares.forEach(square => {
            if (square.hilighted) {
                hilightSquare(square);
            }else{
                clearSquare(square);
            }
        });

        initCanvas();

        

        //do numbers
    }



    init()


})();