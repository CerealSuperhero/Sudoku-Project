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

        startCanvas()

    }
    var canvas;
    var ctx;

    var gridSquares = {
        "Square1": { "gridNumber": 1, "points": [{ "x": 0, "y": 2 }, { "x": 100, "y": 2 }, { "x": 100, "y": 100 }, { "x": 0, "y": 100 }], "currentValue": 1, "CorrectValue": 9 },
        "Square2": { "gridNumber": 5, "points": [{ "x": 100, "y": 100 }, { "x": 200, "y": 100 }, { "x": 200, "y": 200 }, { "x": 100, "y": 200 }], "currentValue": 1, "CorrectValue": 9 },
    }

    function hilightSquare(gridSquare) {
        var points = gridSquare.points;
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

        var mouseX = parseInt(e.clientX - offsetX);
        var mouseY = parseInt(e.clientY - offsetY - 44);

        console.log("clicked!", "x:" + mouseX, "y:" + mouseY);
        
        if (mouseX<300) {
            hilightSquare(gridSquares.Square1);
        } else{
            clearSquare(gridSquares.Square1);
        }
        

    }



    init()


})();