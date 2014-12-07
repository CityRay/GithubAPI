(function () {
  // app.js
var app = angular.module('githubsearch', []);

app.controller('SearchController', function ($scope, $http)
{
  
  this.reposFound2 = true;
  this.noUserText="No User Info Found";

  this.getGitInfo = function(){
      //onsole.log('hi');
      var foo = this;
      foo.userNotFound = false;
      foo.loaded = false;


      $http.get("https://api.github.com/users/" + foo.username)
          .success(function (data, status) {
              if (data.name == "") data.name = data.login;
              foo.user = data;
              console.log('status: '+status);
              console.log(foo.user);
              foo.loaded = true;

           }).error(function (data, status) {
              foo.userNotFound = true;
              foo.reposFound = false;
              //console.log(status);
           });

      $http.get("https://api.github.com/users/" + this.username + "/repos")
          .success(function (data) {
            foo.repos = data;
            foo.reposFound = data.length > 0;
            foo.reposFound2 = data.length > 0;
            console.log('repoData: =======================');
            console.log(data);
            console.log('=================================');
          }).error(function(e) {

          });

  };

});

})();



