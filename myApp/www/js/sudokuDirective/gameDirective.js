angular.module('game.directive',[])
.directive('gameDirective', function(){
    return{
        restrict: 'E',
        scope: {},
        //replace: true,
        templateUrl: 'js/templates/sudokuggame.html',
        /* controller:function($scope){
            alert('controller');
            console.log("directive live");
        } */
        controller: 'sudokucontroller as vm'
    };
});