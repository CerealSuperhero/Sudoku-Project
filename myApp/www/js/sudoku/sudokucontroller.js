(function() {
    'use strict';

    angular
        .module('sudoku')
        .controller('sudokucontroller', control);

    control.$inject = [
        '$state',
        '$scope',
        '$rootScope',
        'winService',
        'genService'
    ];
    var vm = [];


    function control(
        $state,
        $scope,
        $rootScope,
        winService,
        genService

    ) {
        var vm = angular.extend(this, {
            aaa: "AAA",
            time:"",
        });
        //initialise variables for first run
        var difficulty=1;   //game difficulty
        var cellsToClear=10;    //for game difficulty
        var cavasStarted=false; //to prevent double canvas init


        var timer; //timer
        var filColour = "black"//colour to use to draw numbers

        //variables for init
        var w = [0, 100, 200, 300, 400, 500, 600, 700, 800];
        var h = [0, 100, 200, 300, 400, 500, 600, 700, 800];
        var hcount = 0;
        var wcount = 0;
        var outPut = [];
        var gridSquares = [];
        //default game used for testing
        var emptysudoku = "530070000600195000098000060800060003400803001700020006060000280000419005000080079";
        var filledSudokku = "534678912672195348198342567859761423426853791713924856961537284287419635345286179";

        //canvas value
        var canvas;
        var ctx;

        //used for future scaling
        var size = 100;

        //takes in the variable passed by the button and re-runs the init with a puzzle of a new difficulty
        vm.changeDifficulty=function(newDifficulty){
            clearInterval(ticking);
            difficulty=newDifficulty;
            gridSquares.forEach(square => {
                    square.highlighted=false;
                    square.currentValue = 0 + "";
                    draw();
            });
            resetTimer();
            init();
            draw();
        }

        //draws and populates grid 
        function init() {

            hcount = 0;
            wcount = 0;
            //changes the number of cells that will be empty depending on the difficulty
            switch (difficulty) {
                case 1:
                    cellsToClear=10;
                    break;
                case 2:
                    cellsToClear=15;
                    break;
                case 3:
                    cellsToClear=20;
                    break;
            
                default:
                    cellsToClear=10;
                    break;
            }
            //promise returns an array containing playable and full sudoku grids as strings
            var generationPromise= new Promise (function (resolve, reject){
                console.log("toClear",cellsToClear);
                
                var newSudoku=genService.generateSudoku(cellsToClear);
                
                resolve(newSudoku);
                
            })


            //upon promise return build playable sudoku string into gridSquare objects
            generationPromise.then(function (newPuzzle) {

                console.log("NEW PUZZLE",newPuzzle);
                filledSudokku=newPuzzle[0];
                emptysudoku=newPuzzle[1];

                //retrieves the game from the url if ther is one
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

                //loops over the game string creating a gridSquare object for each one
                for (var i = 0; i < 81; i++) {
                    outPut[i] = "top Left= " + w[wcount] + ", " + h[hcount];


                    if (emptysudoku[i] == 0) {
                        gridSquares[i] = { "gridNumber": i, "tl": [w[wcount], h[hcount]], "currentValue": emptysudoku[i], "correctValue": filledSudokku[i], "highlighted": false, "editable": true }
                    } else {
                        gridSquares[i] = { "gridNumber": i, "tl": [w[wcount], h[hcount]], "currentValue": filledSudokku[i], "correctValue": filledSudokku[i], "highlighted": false, "editable": false }
                    }

                    //iterates the count
                    itCount();
                }



                //if the canvas has not been started run startcanvas, otherwise run initCanvas and startTimer
                if (!cavasStarted) {
                    startCanvas();    
                }else{
                    initCanvas();
                    timer = document.getElementById("timer");
                    startTimer();
                }
                
                //encode the currnet game and log a shareable game url in the console
                var urlMT = btoa(emptysudoku);
                var urlFil = btoa(filledSudokku);
                console.log(window.location.href + "?MT=" + urlMT + "&FILL=" + urlFil);

                
            });


        }
        
        //loops over the gridsquare array filling in the numbers of all the squares that have a current value
        function fillNumbers() {
            ctx.font = "30px Arial";
            //draws if the number are given and grey if they are user entered
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

        //itterates the pointers on H and W for the grid generation
        function itCount() {
            if (wcount == 8) {
                wcount = 0;
                hcount++;
            } else {
                wcount++;
            }
        }

        //hilights the background of a clicked square if the square is editable by the user
        function hilightSquare(gridSquare) {

            var points = [];
            var minX = gridSquare.tl[0];
            var minY = gridSquare.tl[1];
            //calculates the corners of the square
            points[0] = { x: minX, "y": minY }
            points[1] = { x: minX + size, "y": minY }
            points[2] = { x: minX + size, "y": minY + size }
            points[3] = { x: minX, "y": minY + size }

            //draws a square and fills it in to colour the background
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

        }

        //like hilight but cleares the square instead of filling it
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

            ctx.closePath();
        }



        //tries to find the canvas, runs repeatedly every 10ms until the the canvas is found
        function startCanvas() {
            cavasStarted=true;
            if (document.getElementById("myCanvas")) {
                if (document.getElementById("myCanvas").getContext("2d")) {
                    //sets click event listener
                    document.getElementById("myCanvas").addEventListener('click', (e) => {
                        
                        handleCanvasClick(e);
                    })
                    //sets canvas and ctx
                    canvas = document.getElementById("myCanvas");
                    ctx = canvas.getContext("2d");
                    //draws the grid in the canvas
                    initCanvas();
                    //sets timer to be the timer element
                    timer = document.getElementById("timer");
                    //starts the timer
                    startTimer();
                }


            } else {
                //calls self until the canvas context can be found
                setTimeout(() => {
                    startCanvas();
                }, 10);
            }
        }

        //draws the horizontal and vertical lines on the canvas
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


        //canvas click event
        function handleCanvasClick(e) {
            var scrollheight=0;
            //changes the scrollheight to match scroll distance
            for (var i=0;i<document.getElementsByClassName("scroll").length;i++) {
                if (document.getElementsByClassName("scroll")[i].innerText.includes("Easy")) {
                    scrollheight=document.getElementsByClassName("scroll")[i].style.transform.split("(")[1].split(",")[1].split("p")[0];
                    console.log("update scroll");
                    
                }
                
            }
            
            //determines the canvas position
            var canvas = document.getElementById("myCanvas");
            var offsetX = canvas.offsetLeft;
            var offsetY = canvas.offsetTop;
            //gets the height of the top bar
            var topBar = document.getElementsByClassName("bar-stable bar bar-header");
            var topBarHeight = topBar[0].offsetHeight;
            //calculates where on the canvas was clicked using mouse position and offsets
            var mouseX = parseInt(e.clientX - offsetX);
            var mouseY = parseInt(e.clientY - offsetY - topBarHeight - parseInt(scrollheight));


            var clickedSquare = null;
            //searches for the square that was clicked
            clickedSquare = getSquare(mouseX, mouseY);
            if (clickedSquare != null) {
                //if a square was clicked call toggleHilight on the square
                toggleHilight(clickedSquare);
            }
            
            //removes highlight from all squares other than clicked square
            gridSquares.forEach(square => {
                if ((square.highlighted == true) && (square != clickedSquare)) {
                    square.highlighted = false;
                }
            });
            //calls draw
            draw();


        }
        //returns a square based on x y coordinates
        function getSquare(x, y) {
            var clickedSquare = null;
            //for every square calculate the area on the canvas it covers and make clicked square
            //equal that square if the clicked point is within the square
            gridSquares.forEach(square => {

                var minX = square.tl[0];
                var minY = square.tl[1];
                var maxX = square.tl[0] + size;
                var maxY = square.tl[1] + size;

                if ((minX < x) && (x < maxX) && (minY < y) && (y < maxY)) {
                    clickedSquare = square;

                }
            });
            //if there isn't a clicked square throw an error, otherwise return the square
            if (clickedSquare != null) {
                return clickedSquare;
            } else {
                console.warn("couldn't find clicked square");
                return null;
            }


        }
        //toggl the square's highlight
        function toggleHilight(square) {
           
            
            if (square.editable) {
               
                
                square.highlighted = !square.highlighted;
            } else {
                console.log("square isn't editable",square)
            }
            
            
        }
        //draw function
        function draw() {
            //higlight any squares that are supposed to be hilighted
            gridSquares.forEach(square => {
                if (square.highlighted) {
                    
                    hilightSquare(square);
                } else {
                    clearSquare(square);
                }
            });


            //draw grid lines
            initCanvas();
            //draw numbers
            fillNumbers();
            

        }
        //event listner for keypress
        //if a number (1-9) is pressed make the highlighted square's current value equal the pressed number
        //then call draw() and check for completion

        //if backspace or delete is pressed make the highlighted square's current value equal 0
        //then call draw()
        document.addEventListener("keydown", function(event) {
            var inputNumber;


            if ((event.keyCode >= 49) && (event.keyCode <= 57)) {
                inputNumber = event.keyCode - 48;
                console.log("input num: " + inputNumber);
                gridSquares.forEach(square => {
                    if (square.highlighted) {
                        square.currentValue = inputNumber + "";
                        draw();
                        checkComplete();
                    }
                });

            } else if ((event.keyCode >= 97) && (event.keyCode <= 105)) {
                inputNumber = event.keyCode - 96;
                console.log("input num: " + inputNumber);
                gridSquares.forEach(square => {
                    if (square.highlighted) {
                        square.currentValue = inputNumber + "";
                        draw();
                        checkComplete();
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

        //returns the current values of all gridsquares as a string
        function getValuesAsString() {
            var numbers = gridSquares.map(function(square) { return square.currentValue; });

            return numbers.join("");
        }

        //gets the currentvalues as a string and sends them to the win service to check if the game has been won
        //of the game is won call win()
        function checkComplete() {
            var values = getValuesAsString();
            if (!values.includes(0)) {
                console.log("checking for win", values);
                console.log("win?", winService.checkWin(values));
                if (winService.checkWin(values)) {
                    win();
                }
            }
        }

      
        //add the game as a sharable url to the clipboard and briefly display a modal explaining that the game has been added to the clipboard
        vm.share = function() {
            console.log("share");
            var str = window.location.href
            if (!str.includes("?")) {
                str += "?MT=" + btoa(emptysudoku) + "&FILL=" + btoa(filledSudokku);
            }
            
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
        //opens the share modal
        function openShareModal() {
            var modalWindow = document.getElementById("ShareModal");

            modalWindow.classList ? modalWindow.classList.add('open') : modalWindow.className += ' ' + 'open';

        };
        //closes the share modal
        function closeModal() {
            var modalWindow = document.getElementById("ShareModal");
            modalWindow.classList ? modalWindow.classList.remove('open') : modalWindow.className = modalWindow.className.replace(new RegExp('(^|\\b)' + 'open'.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
            modalWindow.classList ? modalWindow.classList.remove('open') : modalWindow.className = modalWindow.className.replace(new RegExp('(^|\\b)' + 'open'.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
        }

        //stops the timer and opens the win modal
        function win(){
            clearInterval(ticking);
            
            openWinModal();

        }
        //closes the win modal and starts a new game with a changed difficulty
        vm.winNewGame = function(newGameDifficulty){
            closeWinModal();
            vm.changeDifficulty(newGameDifficulty);

        }
        //closes the win modal and calls vm.share()
        vm.winShare= function(){
            closeWinModal();
            vm.share();
        }

        //opens win modal
        function openWinModal() {
            var modalWindow = document.getElementById("WinModal");

            modalWindow.classList ? modalWindow.classList.add('open') : modalWindow.className += ' ' + 'open';

        };
        //closes win modal
        function closeWinModal() {
            var modalWindow = document.getElementById("WinModal");
            modalWindow.classList ? modalWindow.classList.remove('open') : modalWindow.className = modalWindow.className.replace(new RegExp('(^|\\b)' + 'open'.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
            modalWindow.classList ? modalWindow.classList.remove('open') : modalWindow.className = modalWindow.className.replace(new RegExp('(^|\\b)' + 'open'.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
        }
        //closes win modal
        vm.closeWinModal=function() {
            var modalWindow = document.getElementById("WinModal");
            modalWindow.classList ? modalWindow.classList.remove('open') : modalWindow.className = modalWindow.className.replace(new RegExp('(^|\\b)' + 'open'.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
            modalWindow.classList ? modalWindow.classList.remove('open') : modalWindow.className = modalWindow.className.replace(new RegExp('(^|\\b)' + 'open'.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
        }

        //timer stuff
        //variables for timer
        var seconds = 0;
        var minutes = 0;
        var hours = 0;
        var ticking;
        //sets timer to 0
        function resetTimer() {
            seconds = 0;
            minutes = 0;
            hours = 0;
        }
        //starts timer
        function startTimer() {

            ticking = setInterval(function() {
                tick()
            }, 1000)
        };
        //increases timer by 1 second
        function tick() {
            seconds++
            if (seconds > 59) {
                seconds = 0;
                minutes++;
                if (minutes>59) {
                    hours++;
                }
            }
            vm.time= (hours > 9 ? hours : "0" + hours) + ":" + (minutes > 9 ? minutes : "0" + minutes) + ":" + (seconds > 9 ? seconds : "0" + seconds);
            timer.textContent = vm.time;
            $scope.$apply();

        };

        init()
            

    }
})();