'use strict';


var urlapi = "http://localhost:3006/api/";
//var urlapi="http://147.83.7.158:3005/api/";

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute',
    'ngMaterial',
    'myApp.subjects',
    'myApp.students'

]).config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');

    $routeProvider.otherwise({redirectTo: '/main'});
}]);
