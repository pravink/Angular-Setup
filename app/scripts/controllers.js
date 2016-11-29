'use strict';

angular.module('confusionApp')
    .controller('MenuController', ['$scope', 'menuFactory', function($scope,menuFactory) {
            
            $scope.tab = 1;
            $scope.filtText = '';
            $scope.showDetails = true;
            $scope.showMenu = false;
            $scope.dishes= [];
          
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


            .controller('DishDetailController', ['$scope', '$stateParams', 'menuFactory', function($scope, $stateParams, menuFactory) {
                $scope.dishes= [];
                $scope.showDish = false;
                                     
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
