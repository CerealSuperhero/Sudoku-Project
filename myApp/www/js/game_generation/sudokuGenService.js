angular.module('sudokuGenService', [])
    .service('genService', function () {
        this.test = function () {
            return "generation online";
        }


        var dummydoku = [{}];
        var skipped;
        var rowEndVals = [3, 6, 9, 33, 36, 39];
        var gridA = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        var gridB = [11, 12, 13, 14, 15, 16, 17, 18, 19];
        var sudokuAsString = [];

        var grids = [[1, 2, 3, 4, 5, 6, 7, 8, 9], [11, 12, 13, 14, 15, 16, 17, 18, 19], [21, 22, 23, 24, 25, 26, 27, 28, 29],
        [31, 32, 33, 34, 35, 36, 37, 38, 39], [41, 42, 43, 44, 45, 46, 47, 48, 49], [51, 52, 53, 54, 55, 56, 57, 58, 59],
        [61, 62, 63, 64, 65, 66, 67, 68, 69], [71, 72, 73, 74, 75, 76, 77, 78, 79], [81, 82, 83, 84, 85, 86, 87, 88, 89]];



        var HLines = [[1, 2, 3, 11, 12, 13, 21, 22, 23], [4, 5, 6, 14, 15, 16, 24, 25, 26], [7, 8, 9, 17, 18, 19, 27, 28, 29],
        [31, 32, 33, 41, 42, 43, 51, 52, 53], [34, 35, 36, 44, 45, 46, 54, 55, 56], [37, 38, 39, 47, 48, 49, 57, 58, 59],
        [61, 62, 63, 71, 72, 73, 81, 82, 83], [64, 65, 66, 74, 75, 76, 84, 85, 86], [67, 68, 69, 77, 78, 79, 87, 88, 89]];



        var VLines = [[1, 4, 7, 31, 34, 37, 61, 64, 67], [2, 5, 8, 32, 35, 38, 62, 65, 68], [3, 6, 9, 33, 36, 39, 63, 66, 69],
        [11, 14, 17, 41, 44, 47, 71, 74, 77], [12, 15, 18, 42, 45, 48, 72, 75, 78], [13, 16, 19, 43, 46, 49, 73, 76, 79],
        [21, 24, 27, 51, 54, 57, 81, 84, 87], [22, 25, 28, 52, 55, 58, 82, 85, 88], [23, 26, 29, 53, 56, 59, 83, 86, 89]];
        this.generateSudoku = function () {
            for (var i = 0; i <= 89; i++) {
                if (i % 10 != 0) {
                    var thisGrid;
                    var thisHLine;
                    var thisVLine;


                    thisGrid = grids.find(function (square) {
                        return square.includes(i);
                    });
                    thisHLine = HLines.find(function (HLine) {
                        return HLine.includes(i);
                    });
                    thisVLine = VLines.find(function (VLine) {
                        return VLine.includes(i);
                    });

                    dummydoku[i] = { "position": i, "value": 0, "toTry": [1, 2, 3, 4, 5, 6, 7, 8, 9], "Grid": thisGrid, "HLine": thisHLine, "VLine": thisVLine };

                }
                else {
                    skipped += "," + i;
                    dummydoku[i] = null;
                }

            }
            var consoleTableTry = [];
            fillDoku();
            printDouku(dummydoku);
            //console.table(dummydoku);
            clearCells(20, dummydoku);
            console.time("delcheck");
            deleteCheck(dummydoku, cellsToClear);
            console.timeEnd("delcheck");
            //console.table(consoleTableTry);
            //console.table(dummydoku[3]);
            //console.log(dummydoku);
            console.log(sudokuAsString);
            return(sudokuAsString);

        }

        function printDouku(printingDoku) {
            var towrite = "";
            var underscore = false;
            var k = 0;

            var tempArray = [];
            var tempString = "";
            for (var j = 1; j <= 89; j++) {

                if (printingDoku[j] != null) {
                    towrite += printingDoku[j].value + "\t";
                    tempString += printingDoku[j].value;

                    if (j % 10 == 3 || j % 10 == 6 || j % 10 == 9) {
                        //j=j-19;
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
                                    //console.log("__\t__\t__\t__\t__\t__\t__\t__\t__\t__\t__\t__")
                                    j = j - 20;
                                }
                            }
                            console.log(towrite);
                            //consoleTableTry[k]=towrite;
                            //k++;
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
            sudokuAsString[sudokuAsString.length] = tempString;
        }

        function fillDoku() {

            for (var j = 1; j <= 89; j++) {
                var testNum;
                var gridTest;
                var HLineTest;
                var VLineTest;
                if (dummydoku[j] != null) {
                    if (dummydoku[j].toTry.length > 0) {
                        testNum = dummydoku[j].toTry[arrayPick(dummydoku[j].toTry.length)];
                        dummydoku[j].toTry = dummydoku[j].toTry.filter(function (number) {
                            return number != testNum;
                        });



                        gridTest = dummydoku[j].Grid.reduce(function (testBool = true, gridCell) {
                            if (testBool == true) {
                                if (dummydoku[gridCell].value != testNum) {

                                    return true
                                } else {
                                    return false;
                                };
                            } else {
                                return false;
                            };

                        }, true);

                        HLineTest = dummydoku[j].HLine.reduce(function (testBool = true, HLineCell) {
                            if (testBool == true) {
                                if (dummydoku[HLineCell].value != testNum) {

                                    return true
                                } else {
                                    return false;
                                };
                            } else {
                                return false;
                            };

                        }, true);
                        VLineTest = dummydoku[j].VLine.reduce(function (testBool = true, VLineCell) {
                            if (testBool == true) {
                                if (dummydoku[VLineCell].value != testNum) {

                                    return true
                                } else {
                                    return false;
                                };
                            } else {
                                return false;
                            };

                        }, true);







                        if (gridTest && HLineTest && VLineTest) {

                            dummydoku[j].value = testNum;
                        } else {

                            if (dummydoku[j].toTry.length > 0) {
                                j--;
                            } else {

                                dummydoku[j].toTry = [1, 2, 3, 4, 5, 6, 7, 8, 9];
                                if (dummydoku[j - 1] != null) {
                                    dummydoku[j - 1].value = 0;
                                    j = j - 2;
                                } else {
                                    dummydoku[j - 2].value = 0;
                                    j = j - 3;
                                }
                            }
                        }
                    } else {
                        dummydoku[j].toTry = [1, 2, 3, 4, 5, 6, 7, 8, 9];
                        if (dummydoku[j - 1] != null) {
                            dummydoku[j - 1].value = 0;
                            j = j - 2;
                        } else {
                            dummydoku[j - 2].value = 0;
                            j = j - 3;
                        }
                    }






                }

            }
        }

        function arrayPick(arrayLenght) {
            return Math.floor(Math.random() * (arrayLenght - 1));

        }

        function clearCells(numToClear, dokuCopy) {

            cellsToClear = getCellsToClear(numToClear, dokuCopy);
            console.log("c2c");
            console.table(cellsToClear);

        }
        var cellsToClear = [];
        function getCellsToClear(numToClear, dokuCopy) {

            for (var i = 0; i <= numToClear; i++) {
                validDelpick = false
                pickednum = 0;
                while (validDelpick == false) {
                    pickednum = Math.floor(Math.random() * (dokuCopy.length - 1));
                    if (dokuCopy[pickednum] != null && dokuCopy[pickednum].value != 0) {
                        dokuCopy[pickednum].value = 0;
                        cellsToClear[i] = pickednum;
                        validDelpick = true;
                    }
                }

            }
            cellsToClear = cellsToClear.sort();
            return cellsToClear;
        }

        function deleteCheck(checkDoku, positions) {
            for (var i = 0; i < positions.length; i++) {
                checkDoku[positions[i]].value = -99;
                checkDoku[positions[i]].toTry = [1, 2, 3, 4, 5, 6, 7, 8, 9];
            }
            recurCheckStarter(checkDoku);
            printDouku(generatedDoku);

        }
        function recurCheckStarter(checkDoku) {
            recursiveDelCheck(checkDoku, 0);
            if (solutions = 1) {
                console.log("good");
                return true;
            }
            console.log("bad");
            return false;
        }
        var solutions = 0;
        var generatedDoku;
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
                            generatedDoku = checkDoku;

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

        function validNumberCheck(doku, position, checkNumber) {
            gridTest = doku[position].Grid.reduce(function (testBool = true, gridCell) {
                if (testBool == true) {
                    if (doku[gridCell].value != checkNumber) {

                        return true
                    } else {
                        return false;
                    };
                } else {
                    return false;
                };

            }, true);

            HLineTest = doku[position].HLine.reduce(function (testBool = true, HLineCell) {
                if (testBool == true) {
                    if (doku[HLineCell].value != checkNumber) {

                        return true
                    } else {
                        return false;
                    };
                } else {
                    return false;
                };

            }, true);
            VLineTest = doku[position].VLine.reduce(function (testBool = true, VLineCell) {
                if (testBool == true) {
                    if (doku[VLineCell].value != checkNumber) {

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