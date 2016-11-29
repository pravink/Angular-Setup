'use strict';

/*angular.module('confusionApp', ['ngRoute'])
.config(function($routeProvider) {
        $routeProvider
            // route for the contactus page
            .when('/contactus', {
                templateUrl : 'views/contactus.html',
                controller  : 'FeedbackController'
            })
            // route for the menu page
            .when('/menu', {
                templateUrl : 'views/menu.html',
                controller  : 'MenuController'
            })
            // route for the dish details page
            .when('/menu/:id', {
                templateUrl : 'views/dishdetail.html',
                controller  : 'DishDetailController'
            })
            .otherwise('/contactus');
    })*/

angular.module('confusionApp', ['ui.router','ngResource'])
.constant("baseURL","http://localhost:3000/")
.config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
                    // route for the home page
            .state('app', {
                url:'/',
                views: {
                    'header': {
                        templateUrl : 'views/header.html'
                    },
                    'content': {
                        templateUrl : 'views/home.html',
                        controller  : 'IndexController'
                    },
                    'footer': {
                        templateUrl : 'views/footer.html'
                    }
                }
            })
            // route for the aboutus page             
            .state('app.aboutus', {
                url:'aboutus',
                views: {
                    'content@': {
                        templateUrl : 'views/aboutus.html',
                        controller  : 'AboutController'                  
                    }
                }
            })
                    // route for the contactus page
            .state('app.contactus', {
                url:'contactus',
                views: {
                    'content@': {
                        templateUrl : 'views/contactus.html',
                        controller  : 'ContactController'
                     }
                }
            })

            // route for the menu page
            .state('app.menu', {
                url: 'menu',
                views: {
                    'content@': {
                        templateUrl : 'views/menu.html',
                        controller  : 'MenuController'
                    }
                }
            })

            // route for the dishdetail page
            .state('app.dishdetails', {
                url: 'menu/:id',
                views: {
                    'content@': {
                        templateUrl : 'views/dishdetail.html',
                        controller  : 'DishDetailController'
                   }
                }
            });
            $urlRouterProvider.otherwise('/');
    })

// Controllers

.controller('MenuController', ['$scope', 'menuFactory', function($scope,menuFactory) {
            
            $scope.tab = 1;
            $scope.filtText = '';
            $scope.showDetails = true;
            $scope.showMenu = false;
            $scope.dishes= [];
            /*menuFactory.getDishes()
                    .then(
                        function(response) {
                            $scope.dishes = response.data;
                            console.log(response);
                            $scope.showMenu= true;
                    },
                function(response) {
                    $scope.message = "Error: "+response.status + " " + response.statusText;
                    console.log(response.status);
                    console.log(response);
                }
                );*/
            $scope.dishes = menuFactory.getDishes().query(
                function(response) {
                    $scope.dishes = response;
                    $scope.showMenu = true;
                },
                function(response) {
                    $scope.message = "Error: "+response.status + " " + response.statusText;
                });  
            
            $scope.select = function(setTab) {
                $scope.tab = setTab;
                
                if (setTab === 2) {
                    $scope.filtText = "appetizer";
                }
                else if (setTab === 3) {
                    $scope.filtText = "mains";
                }
                else if (setTab === 4) {
                    $scope.filtText = "dessert";
                }
                else {
                    $scope.filtText = "";
                }
            };

            $scope.isSelected = function (checkTab) {
                return ($scope.tab === checkTab);
            };
    
            $scope.toggleDetails = function() {
                $scope.showDetails = !$scope.showDetails;
            };
        }])

        .controller('ContactController', ['$scope', function($scope) {

            $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
            
            var channels = [{value:"tel", label:"Tel."}, {value:"Email",label:"Email"}];
            
            $scope.channels = channels;
            $scope.invalidChannelSelection = true;
            $scope.calc = 1; 
            $scope.calculator = {
                sum: function(x, y) {
		          return x + y;
	           }
            };
                        
        }])
    .controller('AboutController', ['$scope','corporateFactory', 
        function($scope,corporateFactory){

       /*     $scope.leaders = corporateFactory.getLeaders();*/
             $scope.showLeader = false;
            $scope.leaderStatus = "Loading...";
          /*  $scope.leader = corporateFactory.getLeader(parseInt(first.id,10));*/
             $scope.leaders = corporateFactory.query()
                .$promise.then(
                    function(response) {
                        $scope.leaders = response;
                        $scope.showLeader = true;
                    },
                    function(response) {
                      $scope.leaderStatus = "Error: " + response.status + " " + response.statusText;
                    }
                );
            
                        
        }])
        .controller('IndexController', ['$scope', 'menuFactory', 'corporateFactory', function($scope, menuFactory, corporateFactory) {
            $scope.showDish = false;
            $scope.message="Loading ...";
            var first = {id:0};
            /*menuFactory.getDish(0)
                    .then(
                            function(response){
                                $scope.dish = response.data;
                                $scope.showDish = true;
                            },
                            function(response) {
                                $scope.message = "Error: "+response.status + " " + response.statusText;
                            }
                        );*/
            
             $scope.dish = menuFactory.getDishes().get({id:0})
              .$promise.then(
                            function(response){
                                $scope.dish = response;
                                $scope.showDish = true;
                            },
                            function(response) {
                                $scope.message = "Error: "+response.status + " " + response.statusText;
                            }
                        );            
         
            $scope.showPromotion = false;
            $scope.promotionMessage = "Loading...";
            /*$scope.promotion = menuFactory.getPromotion(parseInt(first.id,10));*/
             $scope.promotion = menuFactory.getPromotion().get({id:0})
                .$promise.then(
                    function(response) {
                        $scope.promotion = response;
                        $scope.showPromotion = true;
                    },
                    function(response) {
                        $scope.promotionMessage = "Error: " + response.status + " " + response.statusText;
                    }
                );

            $scope.showLeader = false;
            $scope.leaderStatus = "Loading...";
          /*  $scope.leader = corporateFactory.getLeader(parseInt(first.id,10));*/
             //$scope.leader = Leaders.getLeader().get({id:0})
            $scope.leader = corporateFactory.get({ id: parseInt(first.id,10) })
                .$promise.then(
                    function(response) {
                        $scope.leader = response;
                        $scope.showLeader = true;
                    },
                    function(response) {
                      $scope.leaderStatus = "Error: " + response.status + " " + response.statusText;
                    }
                );

        }])
        .controller('FeedbackController', ['$scope','feedbackFactory', 
                        function($scope,   feedbackFactory) {           
                     
            
            $scope.sendFeedback = function() {                
                console.log($scope.feedback);                
                if ($scope.feedback.agree && ($scope.feedback.mychannel === "")) {
                    $scope.invalidChannelSelection = true;
                    console.log('incorrect');
                }
                else {
                    
                    feedbackFactory.pushFeedback().save($scope.feedback);
                  
                    
                    $scope.invalidChannelSelection = false;
                    $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
                    $scope.feedback.mychannel="";
                    $scope.feedbackForm.$setPristine();
                    console.log($scope.feedback);
                }
            };
        }])

       /* .controller('DishDetailController', ['$scope',  '$routeParams', 'menuFactory', function($scope,  $routeParams, menuFactory) {
      
            var dish= menuFactory.getDish(parseInt($routeParams.id,10));
             $scope.dish = dish;
            
        }])
*/
            .controller('DishDetailController', ['$scope', '$stateParams', 'menuFactory', function($scope, $stateParams, menuFactory) {
                $scope.dishes= [];
                $scope.showDish = false;
               /* menuFactory.getDish(parseInt($stateParams.id,10))
                             .then(
                            function(response){
                                $scope.dish = response.data;
                                $scope.showDish=true;
                            },
                            function(response) {
                                $scope.message = "Error: "+response.status + " " + response.statusText;
                            }
                        ); */                       
                $scope.dish = menuFactory.getDishes().get({id:parseInt($stateParams.id,10)})
                .$promise.then(
                            function(response){
                                $scope.dish = response;
                                $scope.showDish = true;
                            },
                            function(response) {
                                $scope.message = "Error: "+response.status + " " + response.statusText;
                            }
                );
                    }])

        .controller('DishCommentController', ['$scope','menuFactory', function($scope,menuFactory) {
            
            //Step 1: Create a JavaScript object to hold the comment from the form
            
            $scope.comments = {
                    author:"", rating:5, comment:"", date:""
            };
            
            $scope.submitComment = function () {
                
                //Step 2: This is how you record the date
               /* "The date property of your JavaScript object holding the comment" = new Date().toISOString();*/
               $scope.comments.date = new Date().toISOString();                
                
                // Step 3: Push your comment into the dish's comment array
            /*    $scope.dish.comments.push("Your JavaScript Object holding the comment");*/
                
                var commentToPush =    $scope.comments; 
                $scope.dish.comments.push(commentToPush);
                 
                menuFactory.getDishes().update({id:$scope.dish.id},$scope.dish);
                /*$scope.commentForm.$setPristine();
                $scope.comments = {rating:5, comment:"", author:"", date:""};
                */
                //Step 4: reset your form to pristine
                
                //Step 5: reset your JavaScript object that holds your comment
                
                if ($scope.comments.author === "") {                    
                    console.log('incorrect');
                }
                else {                    
                    $scope.comments = {
                            author:"", rating:5, comment:"", date:""
                        };
                   
                    $scope.commentForm.$setPristine();
                    console.log($scope.comments);
                }
                
                
            };
        }])

// services
.factory('corporateFactory',['$http', '$resource', 'baseURL', function($http, $resource,baseURL) {
  return $resource(baseURL+'leadership/:id'); // Note the full endpoint address
}])

.factory('feedbackFactory',['$http', '$resource', 'baseURL', 
                    function($http,$resource, baseURL){
    
        var fbFac = {};
        fbFac.getFeedback = function(){
            /*return leadership;*/
             return $resource(baseURL+'feedback/:id');//,null,  {'update':{method:'PUT' }});
        };
        fbFac.pushFeedback = function(){
            /*return leadership;*/
             return $resource(baseURL+"feedback");//,null,  {'save':{method:'POST' }});
        };
        /*corpfac.getLeader = function (index) {
            return leadership[index];
        };*/
        return fbFac;
    
        }])

/*.factory('corporateFactory',['$http', '$resource', 'baseURL',
                    function($http,$resource, baseURL){
    
            var corpfac = {};
    
          
     
            // Implement two functions, one named getLeaders,
            // the other named getLeader(index)
            // Remember this is a factory not a service
        corpfac.getLeader = function(){
            /*return leadership;
            return $resource(baseURL+"leadership/:id",null,  {'update':{method:'PUT' }});
            /*return Leaders.query(function() {
                    console.log(allLeaders);               
            }); */ 
            /*return $resource(baseURL+'leadership/:id').get({id:$scope.id}, function(){
                             
                             });
           
            
        };
        /*corpfac.getLeader = function (index) {
            return leadership[index];
        };
        return corpfac;
    
        }])*/




 /* .factory('menuFactory', function() {*/
        .service('menuFactory',['$http', '$resource', 'baseURL', 
                    function($http,$resource, baseURL) {
    
       /*var menufac = {};*/
       
     /*var promotions = [
                {
                          _id:0,
                          name:'Weekend Grand Buffet', 
                          image: 'images/buffet.png',
                          label:'New',
                          price:'19.99',
                          description:'Featuring mouthwatering combinations with a choice of five different salads, six enticing appetizers, six main entrees and five choicest desserts. Free flowing bubbly and soft drinks. All for just $19.99 per person ',
                }
                
            ];*/
    
    
                        
       

       /* menufac.getDishes = function(){
            return dishes;
        };
        menufac.getDish = function (index) {
            return dishes[index];
        };
        return menufac;*/
    
        this.getDishes = function(){
            /*return $http.get(baseURL+"dishes");*/
             return $resource(baseURL+"dishes/:id",null,  {'update':{method:'PUT' }});
        };
        /*this.getDish = function (index) {
            return $http.get(baseURL+"dishes/"+index);       

        };*/
     
                // implement a function named getPromotion
                // that returns a selected promotion.
    
        this.getPromotion = function(){
            /*return promotions;*/
             return $resource(baseURL+'promotions/:id');            
        };
        /*this.getPromotion = function(index){
            return promotions[index];
        };*/
    
        }]);