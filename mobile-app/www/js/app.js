// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('ShareGoodness', ['ionic', 'timeago', 'ngCordova'])

.run(function($ionicPlatform) {

  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });

})

.controller('AppCtrl', function($scope, $http, $storage, $cordovaSocialSharing){

  $scope.posts = [];

  $scope.likedPostIds = [];

  if ($storage.has('likedPostIds')) {
    $scope.likedPostIds = $storage.get('likedPostIds', true);
  }

  // $scope.posts = [{
  //   name: 'Sean Hill',
  //   text: 'I am awesome',
  //   date_posted: new Date(),
  //   avatar: 'http://ionicframework.com/img/docs/mcfly.jpg' ,
  //   id: '123'
  // }];

  $scope.getPosts = function(refreshPosts) {

    $http.post('http://192.168.1.149:5000/post/get', { maxTagId: $scope.maxTagId })
      .success(function(res){

        if (refreshPosts) {
          $scope.posts = [];
          $scope.posts = res.posts;
        }
        else {
          $scope.posts = $scope.posts.concat(res.posts);  
        }

        $scope.maxTagId = res.maxTagId;
        
      })
      .error(function(res){
        $scope.apiRes = res;
      })
      .finally(function() {
        $scope.$broadcast('scroll.infiniteScrollComplete');
        $scope.$broadcast('scroll.refreshComplete');
      });

  };

  $scope.refreshPosts = function() {

    $scope.maxTagId = undefined;
    $scope.getPosts(true);

  };

  $scope.likePost = function(post) {

    if (!$scope.likedPost(post)) {
      $scope.likedPostIds.push(post.id);
    }
    else {
      $scope.likedPostIds.splice($scope.likedPostIds.indexOf(post.id), 1);
    }

    $storage.set('likedPostIds', $scope.likedPostIds);

  };

  $scope.likedPost = function(post) {
    return $scope.likedPostIds.indexOf(post.id) !== -1;
  };

  $scope.sharePost = function(post) {

    $cordovaSocialSharing.share('This is awesome', 'Awesomeness', null, 'https://www.google.com')
      .then(function(result) {
        alert('Thanks for sharing!');
      }, function(err) {
        alert("Sorry, we couldn't share this post!");
      })
    ;

  };

})

.factory('$storage', function() {
  return {
    get: function(key, toJson) {
      var value = window.localStorage[key];
      return toJson ? angular.fromJson(value) : value;
    },
    set: function(key, value) {
      window.localStorage[key] = typeof value == "object" ? angular.toJson(value) : value;
    },
    has: function(key) {
      return window.localStorage[key] != undefined ? true : false;
    },
    clear: function(keys) {
      var keysToClear = keys.split(" ");
      angular.forEach(keysToClear, function(key){
        window.localStorage.removeItem(key);
      });
    }
  }
})

;
