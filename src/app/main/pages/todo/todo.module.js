(function ()
{
    'use strict';

    angular
        .module('app.ffs', ['ui.router','ngResource','ngStorage','ngFileUpload','ngMaterial'])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider.state('app.to-do', {
            url      : '/ffs/home',
            views    : {
                'content@app': {
                    templateUrl: 'app/main/pages/todo/todo.html',
                    controller : 'TodoController as vm'
                }
            },
            resolve  : {
                Comments: function(Comments) {
                    return Comments;
                },
                DjangoAuth: function(DjangoAuth) {
                    return DjangoAuth;
                },
                Companies: function(Companies) {
                    return Companies;
                },
                EmployeeProfile: function(EmployeeProfile) {
                    return EmployeeProfile;
                },
                CompanyFunctions: function(CompanyFunctions) {
                    return CompanyFunctions;
                }
            },
            bodyClass: 'todo'
        });

        // Translation
        $translatePartialLoaderProvider.addPart('app/main/pages/todo');

    }

})();