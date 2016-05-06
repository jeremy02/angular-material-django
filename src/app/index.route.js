(function ()
{
    'use strict';

    angular
        .module('fuse')
        //.config(routeConfig)

        .config(function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
            $urlRouterProvider
              .otherwise('/ffs/login');

            $locationProvider.html5Mode(true);


            //$httpProvider.interceptors.push('authInterceptor');
            //$httpProvider.defaults.useXDomain = true;

            //$httpProvider.defaults.useXDomain = true;
            //delete $httpProvider.defaults.headers.common['X-Requested-With'];

            $httpProvider.defaults.useXDomain = true;
            delete $httpProvider.defaults.headers.common['X-Requested-With'];




            //$locationProvider.html5Mode(true);

            //$urlRouterProvider.otherwise('/ffs/login');

            //$urlRouterProvider.when('/sample');

            // State definitions
            $stateProvider
                .state('app', {
                    abstract: true,
                    views   : {
                        'main@'         : {
                            templateUrl: 'app/core/layouts/horizontal-navigation.html',
                            controller : 'MainController as vm'
                        },
                        'toolbar@app'   : {
                            templateUrl: 'app/toolbar/layouts/vertical-navigation/toolbar.html',
                            controller : 'ToolbarController as vm'
                        },
                        'navigation@app': {
                            templateUrl: 'app/navigation/layouts/horizontal-navigation/navigation.html',
                            controller : 'NavigationController as vm'
                        }/*,
                        'quickPanel@app': {
                            templateUrl: 'app/quick-panel/quick-panel.html',
                            controller : 'QuickPanelController as vm'
                        }*/
                    }
                });
        })

        config(function($resourceProvider) {
            $resourceProvider.defaults.stripTrailingSlashes = false;
        })

        .config(function ($httpProvider) {


            /*app.config(['$httpProvider', function ($httpProvider) {
              //Reset headers to avoid OPTIONS request (aka preflight)

            }])*/

            $httpProvider.interceptors.push(function ($rootScope, $q, $cookieStore, $location,$window,$localStorage) {
                return {
                    // Add authorization token to headers
                    request: function (config) {
                        config.headers = config.headers || {};
                        /*config.headers.common = {};
                        config.headers.post = {};
                        config.headers.put = {};

                        config.headers.patch = {};*/

                        if ($localStorage.token) {
                            config.headers.Authorization = 'Bearer ' + $localStorage.token;
                        }
                        return config;
                    },

                    // Intercept 401s and redirect you to login
                    responseError: function(response) {
                        if (response.status === 401 || response.status === 403) {
                            $location.path('/ffs/login');
                            delete $localStorage.token;
                            return $q.reject(response);
                        }else{
                            return $q.reject(response);
                        }

                    }
                };
            });
        })

        .factory('authInterceptor', function ($rootScope, $q, $cookieStore, $location,$window,$localStorage) {
            return {
                // Add authorization token to headers
                request: function (config) {
                    /*config.headers = config.headers || {};
                    if ($cookieStore.get('token')) {
                        config.headers.Authorization = 'Bearer ' + $cookieStore.get('token');
                    }
                    return config;*/

                    config.headers = config.headers || {};
                    if ($localStorage.token) {
                        config.headers.Authorization = 'Bearer ' + $localStorage.token;
                    }
                    return config;
                },

                // Intercept 401s and redirect you to login
                responseError: function(response) {
                    /*if(response.status === 401) {
                    $location.path('/login');
                    // remove any stale tokens
                    $cookieStore.remove('token');
                    return $q.reject(response);
                    }
                    else {
                    return $q.reject(response);
                    }*/
                    if (response.status === 401 || response.status === 403) {
                        $location.path('/ffs/login');
                        delete $localStorage.token;
                        return $q.reject(response);
                    }else{
                        return $q.reject(response);
                    }

                }
            };

        });

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider, $locationProvider)
    {
        $locationProvider.html5Mode(true);

        $urlRouterProvider.otherwise('/ffs/login');

        //$urlRouterProvider.when('/sample');

        // State definitions
        $stateProvider
            .state('app', {
                abstract: true,
                views   : {
                    'main@'         : {
                        templateUrl: 'app/core/layouts/vertical-navigation.html',
                        controller : 'MainController as vm'
                    },
                    'toolbar@app'   : {
                        templateUrl: 'app/toolbar/layouts/vertical-navigation/toolbar.html',
                        controller : 'ToolbarController as vm'
                    },
                    'navigation@app': {
                        templateUrl: 'app/navigation/layouts/vertical-navigation/navigation.html',
                        controller : 'NavigationController as vm'
                    }/*,
                    'quickPanel@app': {
                        templateUrl: 'app/quick-panel/quick-panel.html',
                        controller : 'QuickPanelController as vm'
                    }*/
                }
            });
    }

})();
