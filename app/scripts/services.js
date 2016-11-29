'use strict';

angular.module('confusionApp')
       // services
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
        
        return fbFac;
    
        }])






 /* .factory('menuFactory', function() {*/
        .service('menuFactory',['$http', '$resource', 'baseURL', 
                    function($http,$resource, baseURL) {
    
      
    
        this.getDishes = function(){
            /*return $http.get(baseURL+"dishes");*/
             return $resource(baseURL+"dishes/:id",null,  {'update':{method:'PUT' }});
        };
       
    
        this.getPromotion = function(){
            /*return promotions;*/
             return $resource(baseURL+'promotions/:id');            
        };
        
    
        }]);