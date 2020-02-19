(function() {
    'use strict';

    angular
        .module('sudoku')
        .controller('sudokucontroller', control);

    control.$inject = [
        '$state',
        '$scope',
        '$rootScope',
        'winService'
    ];
    var vm = [];


    function control(
        $state,
        $scope,
        $rootScope,
        winService

    ) {
        var vm = angular.extend(this, {
            aaa: "AAA"
        });

        vm.working = "print grid to console";
        //$scope.workingg="print grid to console";

        vm.test = function() {
            //console.log("aaaaaaaaa");
            //alert("test");
            //ctx.font= "30px Arial";
            //ctx.fillText("1",50,50);
            //console.log(gridSquares);

            /*   var str = "";

              var urlMT = btoa(emptysudoku);
              var urlFil = btoa(filledSudokku);
              if (window.location.href.includes("?")) {
                  console.log(window.location.href);
              } else {
                  console.log(window.location.href + "?MT=" + urlMT + "&FILL=" + urlFil);
              } */

            /* str = window.location.href + "?MT=" + emptysudoku + "&FILL=" + filledSudokku;
            var el = document.createElement('textarea');
            el.value = str;
            document.body.appendChild(el);
            el.select();
            document.execCommand('copy');
            document.body.removeChild(el); */

            clearInterval(ticking);
            console.log(winService.test());
            //complete = true;
            console.log("ALIVE");


        }



        console.log("ALIVE");



        var complete;
        //for complete clearInterval(ticking);
        // TODO: Error Handling



        function init() {
            complete = false;
            var QueryString = window.location.href;
            if (QueryString.includes("?")) {
                var b = QueryString.split("?");
                var c = b[1].split("=");
                var newEmpty = atob(c[1].split("&")[0]);
                var newFilled = atob(c[2]);
                console.log(newEmpty);
                console.log(newFilled);
                if ((newEmpty != null) && (newFilled != null)) {
                    console.log("updating to match params");

                    emptysudoku = newEmpty;
                    filledSudokku = newFilled;
                }
            } else { console.log("newGame") }
            /* var urlParams = new URLSearchParams(QueryString);
            var newEmpty = urlParams.get("MT");
            var newFilled = urlParams.get("FILL")
            console.log("checking url for params");
            console.log("MT", newEmpty);
            console.log("fill", newFilled); */


            /* for (var i = 0; i<20;i++){
                outPut[i]="top Left= "+ w[wcount] + ", " + h[hcount];
                itCount();
                console.log(outPut[i]);
              } */

            /* var w=[0,100,200,300,400,500,600,700,800,900];
            var h = [0,100,200,300,400,500,600,700,800,900];
            var hcount=0;
            var wcount=0;
            var outPut = [];
            var gridSquares=[]; */

            for (var i = 0; i < 81; i++) {
                outPut[i] = "top Left= " + w[wcount] + ", " + h[hcount];

                //console.log(outPut[i]);
                if (emptysudoku[i] == 0) {
                    gridSquares[i] = { "gridNumber": i, "tl": [w[wcount], h[hcount]], "currentValue": emptysudoku[i], "correctValue": filledSudokku[i], "highlighted": false, "editable": true }
                } else {
                    gridSquares[i] = { "gridNumber": i, "tl": [w[wcount], h[hcount]], "currentValue": filledSudokku[i], "correctValue": filledSudokku[i], "highlighted": false, "editable": false }
                }

                /* gridSquares[
                {"gridNumber": 5,"tl":[100,100],"x":[100,200], "y":[100,200], "currentValue": 0, "correctValue": 9 ,"highlighted":false }
                ] */
                //console.table(gridSquares[i])
                itCount();
            }





            startCanvas();
            // consider making fill only encoded blanks???
            var urlMT = btoa(emptysudoku);
            var urlFil = btoa(filledSudokku);
            console.log(window.location.href + "?MT=" + urlMT + "&FILL=" + urlFil);

            //var timer=document.getElementById("timer");


        }
        var timer;
        var filColour = "black"

        function fillNumbers() {
            ctx.font = "30px Arial";
            //ctx.fillStyle = filColour;
            //ctx.fillText("5",40,60);
            /*  gridSquares.forEach(square => {
                 if (square.currentValue != 0) {
                     ctx.fillText(square.currentValue, square.tl[0] + 40, square.tl[1] + 60)
                 }

             }); */


            for (var i = 0; i < gridSquares.length; i++) {
                if (gridSquares[i].currentValue != 0) {
                    if (emptysudoku[i] != 0) {
                        ctx.font = "30px Arial";
                        ctx.fillStyle = "black";
                    } else {
                        ctx.font = "30px Arial";
                        ctx.fillStyle = "grey";
                    }
                    ctx.fillText(gridSquares[i].currentValue, gridSquares[i].tl[0] + 40, gridSquares[i].tl[1] + 60);
                }
            }
            filColour = "grey";
        }
        //change to run off size
        var w = [0, 100, 200, 300, 400, 500, 600, 700, 800];
        var h = [0, 100, 200, 300, 400, 500, 600, 700, 800];
        var hcount = 0;
        var wcount = 0;
        var outPut = [];
        var gridSquares = [];

        var emptysudoku = "530070000600195000098000060800060003400803001700020006060000280000419005000080079";
        var filledSudokku = "534678912672195348198342567859761423426853791713924856961537284287419635345286179";

        function itCount() {
            if (wcount == 8) {
                wcount = 0;
                hcount++;
            } else {
                wcount++;
            }
        }
        var canvas;
        var ctx;

        /* var gridSquares = [
            {"gridNumber": 1, "points": [{ "x": 0, "y": 2 }, { "x": 100, "y": 2 }, { "x": 100, "y": 100 }, { "x": 0, "y": 100 }], "currentValue": 1, "correctValue": 9, "highlighted":false },
            {"gridNumber": 5, "points": [{ "x": 100, "y": 100 }, { "x": 200, "y": 100 }, { "x": 200, "y": 200 }, { "x": 100, "y": 200 }], "currentValue": 1, "correctValue": 9 ,"highlighted":false },
        ] */

        /*     var gridSquares = [
                {"gridNumber": 1,"tl":[0,0], "currentValue": 1, "correctValue": 9, "highlighted":false },
                {"gridNumber": 5,"tl":[100,100],  "currentValue": 1, "correctValue": 9 ,"highlighted":false },
            ]; */
        var size = 100;

        function hilightSquare(gridSquare) {

            /* if (!gridSquare.editable) { */




            var points = [];
            /*          points[0]= { x:gridSquare.x[0], "y": gridSquare.y[0] }
                     points[1]= { x:gridSquare.x[1], "y": gridSquare.y[0] }
                     points[2]= { x:gridSquare.x[1], "y": gridSquare.y[1] }
                     points[3]= { x:gridSquare.x[0], "y": gridSquare.y[1] } */

            var minX = gridSquare.tl[0];
            var minY = gridSquare.tl[1];

            points[0] = { x: minX, "y": minY }
            points[1] = { x: minX + size, "y": minY }
            points[2] = { x: minX + size, "y": minY + size }
            points[3] = { x: minX, "y": minY + size }





            ctx.fillStyle = "skyblue";
            ctx.strokeStyle = "black";
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(points[0].x, points[0].y);
            for (var i = 1; i < points.length; i++) {
                ctx.lineTo(points[i].x, points[i].y);
            }
            ctx.lineTo(points[0].x, points[0].y);
            ctx.fill();
            ctx.stroke();

            ctx.closePath();
            /* }else{
                console.error("can't edit this square")
            } */
        }

        /*     function hilightSquare(gridSquare) {
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
            } */

        function clearSquare(gridSquare) {
            var points = [];

            var minX = gridSquare.tl[0];
            var minY = gridSquare.tl[1];

            points[0] = { x: minX, "y": minY }
            points[1] = { x: minX + size, "y": minY }
            points[2] = { x: minX + size, "y": minY + size }
            points[3] = { x: minX, "y": minY + size }


            ctx.fillStyle = "white";
            ctx.strokeStyle = "black";
            ctx.lineWidth = 1;
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
        make draw rectangle function for square highlight
        make mouseclick function approx clicks to the nearest square/ square they're in then trigger square draw/highlight
        make square highlight remove function
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
            "Square!":{"gridNumber":1,"points":[{"x":0,"y":0},{"x":100,"y":0},{"x":100,"y":100},{"x":0,"y":100}],"currentValue":1,"correctValue":9},
            "Square2":{"gridNumber":5,"points":[{"x":100,"y":100},{"x":200,"y":100},{"x":200,"y":200},{"x":100,"y":200}],"currentValue":1,"correctValue":9},
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
            "correctValue":9
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
                    timer = document.getElementById("timer");
                    startTimer();
                }


            } else {
                setTimeout(() => {
                    startCanvas();
                }, 10);
            }
        }

        function initCanvas() {
            var c = document.getElementById("myCanvas");
            ctx = c.getContext("2d");

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
            fillNumbers();
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

            //console.log("clicked!", "x:" + mouseX, "y:" + mouseY);

            /* if (mouseX<300) {
                toggleHilight(gridSquares[0]);
                
            } */
            var clickedSquare = null;
            clickedSquare = getSquare(mouseX, mouseY);
            if (clickedSquare != null) {
                toggleHilight(clickedSquare);
            }
            //toggleHilight(getSquare(mouseX,mouseY));

            gridSquares.forEach(square => {
                if ((square.highlighted == true) && (square != clickedSquare)) {
                    square.highlighted = false;
                }
            });

            draw()


        }

        function getSquare(x, y) {
            var clickedSquare = null;
            gridSquares.forEach(square => {
                /*             var minX=square.x[0];
                            var maxX=square.x[1];
                            var minY=square.y[0];
                            var maxY=square.y[1]; */

                var minX = square.tl[0];
                var minY = square.tl[1];
                var maxX = square.tl[0] + size;
                var maxY = square.tl[1] + size;



                if ((minX < x) && (x < maxX) && (minY < y) && (y < maxY)) {
                    clickedSquare = square;

                }
            });

            if (clickedSquare != null) {
                return clickedSquare;
            } else {
                console.warn("couldn't find clicked square");
                return null;
            }


        }

        function toggleHilight(square) {
            if (square.editable) {
                square.highlighted = !square.highlighted;
            } else {
                console.log("square isn't editable")
            }
        }

        function draw() {



            gridSquares.forEach(square => {
                if (square.highlighted) {
                    hilightSquare(square);
                } else {
                    clearSquare(square);
                }
            });



            initCanvas();

            fillNumbers();
            checkComplete();

            //do numbers
        }

        document.addEventListener("keydown", function(event) {
            var inputNumber;


            if ((event.keyCode >= 49) && (event.keyCode <= 57)) {
                inputNumber = event.keyCode - 48;
                console.log("input num" + inputNumber);
                gridSquares.forEach(square => {
                    if (square.highlighted) {
                        square.currentValue = inputNumber + "";
                        draw();
                    }
                });

            } else if ((event.keyCode >= 97) && (event.keyCode <= 105)) {
                inputNumber = event.keyCode - 96;
                console.log("input num" + inputNumber);
                gridSquares.forEach(square => {
                    if (square.highlighted) {
                        square.currentValue = inputNumber + "";
                        draw();
                    }
                });
            } else if (event.keyCode == 8 || event.keyCode == 46) {
                gridSquares.forEach(square => {
                    if (square.highlighted) {
                        square.currentValue = "0";
                        draw();
                    }
                });
            }

        })

        function getValuesAsString() {
            var numbers = gridSquares.map(function(square) { return square.currentValue; });
            //console.log("nums: ", numbers);
            return numbers.join("");
        }

        function checkComplete() {
            var values = getValuesAsString();
            /* console.log("outputting current then true values");
            console.log(values);
            console.log(filledSudokku); */
            if (values == filledSudokku) {
                alert("CONGRATULATIONS");
            }

        }

        vm.share = function() {
            console.log("share");
            var str = window.location.href
            if (!str.includes("?")) {
                str += "?MT=" + emptysudoku + "&FILL=" + filledSudokku;
            }
            /* var str = window.location.href + "?MT=" + emptysudoku + "&FILL=" + filledSudokku; */
            var el = document.createElement('textarea');
            el.value = str;
            document.body.appendChild(el);
            el.select();
            document.execCommand('copy');
            document.body.removeChild(el);
            console.log("open modal");

            openShareModal();
            setTimeout(function() {
                closeModal();
            }, 500);
        }

        //modal stuff

        function openShareModal() {
            var modalWindow = document.getElementById("ShareModal");

            modalWindow.classList ? modalWindow.classList.add('open') : modalWindow.className += ' ' + 'open';

        };

        function closeModal() {
            var modalWindow = document.getElementById("ShareModal");
            modalWindow.classList ? modalWindow.classList.remove('open') : modalWindow.className = modalWindow.className.replace(new RegExp('(^|\\b)' + 'open'.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
            modalWindow.classList ? modalWindow.classList.remove('open') : modalWindow.className = modalWindow.className.replace(new RegExp('(^|\\b)' + 'open'.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
        }

        //timer stuff
        var seconds = 0;
        var minutes = 0;
        var ticking;

        function startTimer() {

            ticking = setInterval(function() {
                tick()
            }, 1000)
        };

        function tick() {
            seconds++
            if (seconds > 59) {
                seconds = 0;
                minutes++;
            }
            timer.textContent = (minutes > 9 ? minutes : "0" + minutes) + ":" + (seconds > 9 ? seconds : "0" + seconds);
        };






        init()
            //return vm;

    }
})();