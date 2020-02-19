angular.module('sudokuWinService',[])
.service('winService',function(){
    this.test=function(){
    return "working";
    }

    var grids = [[1, 2, 3, 4, 5, 6, 7, 8, 9], [11, 12, 13, 14, 15, 16, 17, 18, 19], [21, 22, 23, 24, 25, 26, 27, 28, 29],
    [31, 32, 33, 34, 35, 36, 37, 38, 39], [41, 42, 43, 44, 45, 46, 47, 48, 49], [51, 52, 53, 54, 55, 56, 57, 58, 59],
    [61, 62, 63, 64, 65, 66, 67, 68, 69], [71, 72, 73, 74, 75, 76, 77, 78, 79], [81, 82, 83, 84, 85, 86, 87, 88, 89]];

    var HLines = [[1, 2, 3, 11, 12, 13, 21, 22, 23], [4, 5, 6, 14, 15, 16, 24, 25, 26], [7, 8, 9, 17, 18, 19, 27, 28, 29],
    [31, 32, 33, 41, 42, 43, 51, 52, 53], [34, 35, 36, 44, 45, 46, 54, 55, 56], [37, 38, 39, 47, 48, 49, 57, 58, 59],
    [61, 62, 63, 71, 72, 73, 81, 82, 83], [64, 65, 66, 74, 75, 76, 84, 85, 86], [67, 68, 69, 77, 78, 79, 87, 88, 89]];

    var VLines = [[1, 4, 7, 31, 34, 37, 61, 64, 67], [2, 5, 8, 32, 35, 38, 62, 65, 68], [3, 6, 9, 33, 36, 39, 63, 66, 69],
    [11, 14, 17, 41, 44, 47, 71, 74, 77], [12, 15, 18, 42, 45, 48, 72, 75, 78], [13, 16, 19, 43, 46, 49, 73, 76, 79],
    [21, 24, 27, 51, 54, 57, 81, 84, 87], [22, 25, 28, 52, 55, 58, 82, 85, 88], [23, 26, 29, 53, 56, 59, 83, 86, 89]];

    var order=[1, 2, 3, 11, 12, 13, 21, 22, 23, 4, 5, 6, 14, 15, 16, 24, 25, 26, 7, 8, 9, 17, 18, 19, 27, 28, 29,
    31, 32, 33, 41, 42, 43, 51, 52, 53, 34, 35, 36, 44, 45, 46, 54, 55, 56, 37, 38, 39, 47, 48, 49, 57, 58, 59,
    61, 62, 63, 71, 72, 73, 81, 82, 83, 64, 65, 66, 74, 75, 76, 84, 85, 86, 67, 68, 69, 77, 78, 79, 87, 88, 89];


    this.makeArray = function(sudokuString){
        imported=[{}]
        if (sudokuString.length()==81) {
            for (var i = 0; i < order.length; i++) {


                thisGrid = grids.find(function (square) {
                    return square.includes(order[i]);
                });
                thisHLine = HLines.find(function (HLine) {
                    return HLine.includes(order[i]);
                });
                thisVLine = VLines.find(function (VLine) {
                    return VLine.includes(order[i]);
                });


                imported[i] = { "position": order[i], "value": sudokuString[i], "toTry": [1, 2, 3, 4, 5, 6, 7, 8, 9], "Grid": thisGrid, "HLine": thisHLine, "VLine": thisVLine };
                
            }
        }
        //imported[i] = { "position": i, "value": 0, "toTry": [1, 2, 3, 4, 5, 6, 7, 8, 9], "Grid": thisGrid, "HLine": thisHLine, "VLine": thisVLine };
    }






















});