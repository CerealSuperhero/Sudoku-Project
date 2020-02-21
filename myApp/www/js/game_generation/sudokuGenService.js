angular.module('sudokuGenService', [])
    .service('genService', function () {
        this.test = function () {
            return "generation online";
        }

        //variables for generatino
        var dummySudoku = [{}];
        var skipped;
        var rowEndVals = [3, 6, 9, 33, 36, 39];
        var gridA = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        var gridB = [11, 12, 13, 14, 15, 16, 17, 18, 19];
        var sudokuAsString = [];
        //arrays of the position values of each call in each grid (3*3)
        var grids = [[1, 2, 3, 4, 5, 6, 7, 8, 9], [11, 12, 13, 14, 15, 16, 17, 18, 19], [21, 22, 23, 24, 25, 26, 27, 28, 29],
        [31, 32, 33, 34, 35, 36, 37, 38, 39], [41, 42, 43, 44, 45, 46, 47, 48, 49], [51, 52, 53, 54, 55, 56, 57, 58, 59],
        [61, 62, 63, 64, 65, 66, 67, 68, 69], [71, 72, 73, 74, 75, 76, 77, 78, 79], [81, 82, 83, 84, 85, 86, 87, 88, 89]];


        //arrays of the position values of each call in each horizontal line
        var HLines = [[1, 2, 3, 11, 12, 13, 21, 22, 23], [4, 5, 6, 14, 15, 16, 24, 25, 26], [7, 8, 9, 17, 18, 19, 27, 28, 29],
        [31, 32, 33, 41, 42, 43, 51, 52, 53], [34, 35, 36, 44, 45, 46, 54, 55, 56], [37, 38, 39, 47, 48, 49, 57, 58, 59],
        [61, 62, 63, 71, 72, 73, 81, 82, 83], [64, 65, 66, 74, 75, 76, 84, 85, 86], [67, 68, 69, 77, 78, 79, 87, 88, 89]];


        //arrays of the position values of each call in each vertical line
        var VLines = [[1, 4, 7, 31, 34, 37, 61, 64, 67], [2, 5, 8, 32, 35, 38, 62, 65, 68], [3, 6, 9, 33, 36, 39, 63, 66, 69],
        [11, 14, 17, 41, 44, 47, 71, 74, 77], [12, 15, 18, 42, 45, 48, 72, 75, 78], [13, 16, 19, 43, 46, 49, 73, 76, 79],
        [21, 24, 27, 51, 54, 57, 81, 84, 87], [22, 25, 28, 52, 55, 58, 82, 85, 88], [23, 26, 29, 53, 56, 59, 83, 86, 89]];
        //number of cells to clear
        var numCellsToClear=10;

        //this.makeEasy=function(){}
        //generates a sudoku puzzle as a string
        this.generateSudoku = function (inputCellsToClear) {
            numCellsToClear=inputCellsToClear;
            //skip multiples of 10
            for (var i = 0; i <= 89; i++) {
                if (i % 10 != 0) {
                    var thisGrid;
                    var thisHLine;
                    var thisVLine;

                    //finds the grid/ horizontal line / vertical line that a cell lies in
                    thisGrid = grids.find(function (square) {
                        return square.includes(i);
                    });
                    thisHLine = HLines.find(function (HLine) {
                        return HLine.includes(i);
                    });
                    thisVLine = VLines.find(function (VLine) {
                        return VLine.includes(i);
                    });
                    //generate an object for each cell
                    dummySudoku[i] = { "position": i, "value": 0, "toTry": [1, 2, 3, 4, 5, 6, 7, 8, 9], "Grid": thisGrid, "HLine": thisHLine, "VLine": thisVLine };

                }
                else {
                    skipped += "," + i;
                    dummySudoku[i] = null;
                }

            }
            var consoleTableTry = [];
            sudokuAsString = [];
            //fill the sudoku
            fillDoku();
            //print sudoku to console
            printSudouku(dummySudoku);
            //determine which cells to clear
            clearCells(numCellsToClear, dummySudoku);
            console.time("delcheck");
            //delete the values of the chosen cells
            deleteCheck(dummySudoku, cellsToClear);
            console.timeEnd("delcheck");
            console.log(sudokuAsString);
            //return the array of filled and playable sudoku games
            return(sudokuAsString);

        }
        //print the sudoku to the console in a readable format
        function printSudouku(printingSuoku) {
            var towrite = "";
            var underscore = false;
            var k = 0;

            var tempArray = [];
            var tempString = "";
            //loop over the valuse adding them to a string which is then printed in the console
            for (var j = 1; j <= 89; j++) {

                if (printingSuoku[j] != null) {
                    towrite += printingSuoku[j].value + "\t";
                    tempString += printingSuoku[j].value;

                    if (j % 10 == 3 || j % 10 == 6 || j % 10 == 9) {
                        
                        towrite += "|" + "\t";
                        if (j.toString().startsWith("2") || j.toString().startsWith("5") || j.toString().startsWith("8")) {
                            if (j == 29 || j == 59) {
                                underscore = true;
                                j++;
                            } else {
                                if (j == 89) {
                                    underscore = true;
                                    j++;
                                } else {
                                    
                                    j = j - 20;
                                }
                            }
                            console.log(towrite);
                            
                            towrite = "";
                            if (underscore) {
                                console.log("__\t__\t__\t__\t__\t__\t__\t__\t__\t__\t__\t__");
                                underscore = false;
                            }
                        } else {
                            j = j + 7;
                        }
                    }


                }

            }
            //add sudoku to the sudoku as string array
            sudokuAsString[sudokuAsString.length] = tempString;
        }

        function fillDoku() {
            //loop over each cell randomly picking a number for it from its totry array
            //if the number isn't valid remove it from totry and pick another
            //if it is valid pick a new number
            //if no numbers are valid repopulate totry and go back to the last one
            for (var j = 1; j <= 89; j++) {
                var testNum;
                var gridTest;
                var HLineTest;
                var VLineTest;
                if (dummySudoku[j] != null) {
                    if (dummySudoku[j].toTry.length > 0) {
                        //pick random number
                        testNum = dummySudoku[j].toTry[arrayPick(dummySudoku[j].toTry.length)];
                        //remove number from totry
                        dummySudoku[j].toTry = dummySudoku[j].toTry.filter(function (number) {
                            return number != testNum;
                        });


                        //check picked number against the other numbers in the grid
                        gridTest = dummySudoku[j].Grid.reduce(function (testBool = true, gridCell) {
                            if (testBool == true) {
                                if (dummySudoku[gridCell].value != testNum) {

                                    return true
                                } else {
                                    return false;
                                };
                            } else {
                                return false;
                            };

                        }, true);

                        //check picked number against the other numbers in the horizontal line
                        HLineTest = dummySudoku[j].HLine.reduce(function (testBool = true, HLineCell) {
                            if (testBool == true) {
                                if (dummySudoku[HLineCell].value != testNum) {

                                    return true
                                } else {
                                    return false;
                                };
                            } else {
                                return false;
                            };

                        }, true);
                        //check picked number against the other numbers in the vertical line
                        VLineTest = dummySudoku[j].VLine.reduce(function (testBool = true, VLineCell) {
                            if (testBool == true) {
                                if (dummySudoku[VLineCell].value != testNum) {

                                    return true
                                } else {
                                    return false;
                                };
                            } else {
                                return false;
                            };

                        }, true);






                        //if the tests return true set the value as the picked number
                        if (gridTest && HLineTest && VLineTest) {

                            dummySudoku[j].value = testNum;
                        } else {
                            //else reduce totry by1
                            if (dummySudoku[j].toTry.length > 0) {
                                j--;
                            } else {
                                //if totry is 0, repopulate totry and go back to the last cell
                                dummySudoku[j].toTry = [1, 2, 3, 4, 5, 6, 7, 8, 9];
                                if (dummySudoku[j - 1] != null) {
                                    dummySudoku[j - 1].value = 0;
                                    j = j - 2;
                                } else {
                                    dummySudoku[j - 2].value = 0;
                                    j = j - 3;
                                }
                            }
                        }
                    } else {
                        //populate totry and go back tot he last one
                        dummySudoku[j].toTry = [1, 2, 3, 4, 5, 6, 7, 8, 9];
                        if (dummySudoku[j - 1] != null) {
                            dummySudoku[j - 1].value = 0;
                            j = j - 2;
                        } else {
                            dummySudoku[j - 2].value = 0;
                            j = j - 3;
                        }
                    }






                }

            }
        }
        //return a random number up to the size of an array
        function arrayPick(arrayLenght) {
            return Math.floor(Math.random() * (arrayLenght - 1));

        }
        //clears the selected cells' values
        function clearCells(numToClear, sudokuCopy) {

            cellsToClear = getCellsToClear(numToClear, sudokuCopy);
            console.log("cells to clear");
            console.table(cellsToClear);

        }
        var cellsToClear = [];
        //randomply picks cells to clear
        function getCellsToClear(numToClear, sudokuCopy) {

            for (var i = 0; i <= numToClear; i++) {
                validDelpick = false
                pickednum = 0;
                while (validDelpick == false) {
                    pickednum = Math.floor(Math.random() * (sudokuCopy.length - 1));
                    if (sudokuCopy[pickednum] != null && sudokuCopy[pickednum].value != 0) {
                        sudokuCopy[pickednum].value = 0;
                        cellsToClear[i] = pickednum;
                        validDelpick = true;
                    }
                }

            }
            cellsToClear = cellsToClear.sort();
            return cellsToClear;
        }
        //checks that the sudoku only has one solution [no longer needed]
        function deleteCheck(checkSudoku, positions) {
            for (var i = 0; i < positions.length; i++) {
                checkSudoku[positions[i]].value = 0;
                checkSudoku[positions[i]].toTry = [1, 2, 3, 4, 5, 6, 7, 8, 9];
            }
            recurCheckStarter(checkSudoku);
            printSudouku(generatedSudoku);

        }
        //recursively checks that there is only 1 solution
        //iterates over every possible solution to make sure that all solutions are valid
        function recurCheckStarter(checkDoku) {
            recursiveDelCheck(checkDoku, 0);
            if (solutions = 1) {
                console.log("good");
                return true;
            }
            console.log("tried to remove too many squares and crashed");
            return false;
        }
        var solutions = 0;
        var generatedSudoku;
        function recursiveDelCheck(checkDoku, checkPosition) {
            if (checkPosition >= cellsToClear.length) {
                console.error("checking empty in checkposition");
                return;
            } else {
                var delCheckCell = cellsToClear[checkPosition];

                for (var i = 1; i <= 9; i++) {

                    if (validNumberCheck(checkDoku, delCheckCell, i)) {
                        checkDoku[delCheckCell].value = i;
                        if (checkPosition == cellsToClear.length - 1) {
                            solutions++;
                            console.log("found solution ", solutions);
                            generatedSudoku = checkDoku;

                            break;
                        } else {

                            recursiveDelCheck(checkDoku, checkPosition + 1);
                            checkDoku[delCheckCell].value = "0";
                        }
                    }


                }

                return;
            }
        }
        //checks as before that the number is valid in grid and horizontal/vertical row and returns true for valid false for invalid
        function validNumberCheck(checkingSudoku, position, checkNumber) {
            gridTest = checkingSudoku[position].Grid.reduce(function (testBool = true, gridCell) {
                if (testBool == true) {
                    if (checkingSudoku[gridCell].value != checkNumber) {

                        return true
                    } else {
                        return false;
                    };
                } else {
                    return false;
                };

            }, true);

            HLineTest = checkingSudoku[position].HLine.reduce(function (testBool = true, HLineCell) {
                if (testBool == true) {
                    if (checkingSudoku[HLineCell].value != checkNumber) {

                        return true
                    } else {
                        return false;
                    };
                } else {
                    return false;
                };

            }, true);
            VLineTest = checkingSudoku[position].VLine.reduce(function (testBool = true, VLineCell) {
                if (testBool == true) {
                    if (checkingSudoku[VLineCell].value != checkNumber) {

                        return true
                    } else {
                        return false;
                    };
                } else {
                    return false;
                };

            }, true);

            if (gridTest && HLineTest && VLineTest) {
                return true;
            } else {
                return false;
            }

        }

        function sudokuStrting() {

        };


        //init();
    });