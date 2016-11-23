'use strict';

angular.module('myApp.subjects', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/subjects', {
            templateUrl: 'views/subjects/subjects.html',
            controller: 'SubjectsCtrl'
        });
    }])
    .controller('UsersCtrl', function ($scope, $http) {
        $scope.subjects = {};
        $http.get(urlapi + '/subjects')
            .success(function (data) {
                console.log('data success');
                console.log(data); // for browser console
                $scope.subjects = data; // for UI
            })
            .error(function (data, status) {
                console.log('data error');
                console.log(status);
                console.log(data);
            })
            .then(function (result) {
            });
    });
