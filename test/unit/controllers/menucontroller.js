describe('ContactController', function () {

  // load the controller's module
  beforeEach(module('confusionApp'));

   
 var ContactController, scope, $httpBackend;
    
    
   var service, httpBackend;
   /* beforeEach(function () {
        angular.mock.inject(function ($injector) {           
            scope = $injector.get('$rootScope');
             ContactController = $injector.get('$controller');
        })
    }); */
    
    beforeEach(inject(function($rootScope, $controller) {
        scope = $rootScope.$new();
        ContactController = $controller('ContactController', {
        $scope: $rootScope.$new()
        });
        
    }));
    
    it('should have calc equal to 1', function () {
     
      
        
    });
    
    it('should have invalidChannelSelection as false', function () {
      expect(scope.invalidChannelSelection).toBeFalsy();
                
    });  
    
   /* it('should have a ContactController', inject(function($rootScope, $controller) {
        var controller = $controller('ContactController', 
                                     { $scope: $rootScope.$new(), $rootScope: $rootScope                               
                                     }) // rest of your dependencies
                                             expect(ContactController).toBeDefined();
                                            }));
   
     it('should have invalidChannelSelection as false', inject(function($controller,$rootScope){
        var controller = $controller('ContactController', 
                                     { $scope: $rootScope.$new(), $rootScope: $rootScope                               
                                     })
        expect(scope.invalidChannelSelection).toBeFalsy();
    }));*/
    
/*  beforeEach(inject(function(_$controller_,$rootScope){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    MenuController = _$controller_;
    scope = $rootScope.$new();
    expect(scope.showDetails).toBeTruthy();
    console.log("logs : "+$rootScope.$new().showDetails);
  }));
    */
 /* it('should have showDetails as true', function () {
        expect(scope.showDetails).toBeTruthy();
    });
     */

  /*  it('should have showDetails as true', function () {
        expect(scope.showDetails).toBeTruthy();
    });
        */
// Initialize the controller and a mock scope
/*  beforeEach(inject(function ($controller, _$httpBackend_,  $rootScope, menuFactory) {

          // place here mocked dependencies
      $httpBackend = _$httpBackend_;

      $httpBackend.expectGET("http://localhost:3000/dishes").respond([
        {
      "id": 0,
      "name": "Uthapizza",
      "image": "images/uthapizza.png",
      "category": "mains",
      "label": "Hot",
      "price": "4.99",
      "description": "A",
      "comments":[{}]
      },
      {
      "id": 1,
      "name": "Zucchipakoda",
      "image": "images/zucchipakoda.png",
      "category": "mains",
      "label": "New",
      "price": "4.99",
      "description": "A",
      "comments":[{}]
      }
      ]);

    scope = $rootScope.$new();
    MenuController = $controller('MenuController', {
      $scope: scope, menuFactory: menuFactory
    });
            $httpBackend.flush();

  }));
    
     it('should have showDetails as false', function () {

    expect(scope.showDetails).toBeFalsy();

  });

  it('should create "dishes" with 2 dishes fetched from xhr', function(){

      expect(scope.showMenu).toBeTruthy();
      expect(scope.dishes).toBeDefined();
      expect(scope.dishes.length).toBe(2);

  });

  it('should have the correct data order in the dishes', function() {

      expect(scope.dishes[0].name).toBe("Uthapizza");
      expect(scope.dishes[1].label).toBe("New");

  });

  it('should change the tab selected based on tab clicked', function(){

      expect(scope.tab).toEqual(1);

      scope.select(3);

      expect(scope.tab).toEqual(3);
      expect(scope.filtText).toEqual('mains');

  });  */     
});