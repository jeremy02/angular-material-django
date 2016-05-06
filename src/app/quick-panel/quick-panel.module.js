(function ()
{
    'use strict';

    angular
        .module('app.quick-panel', ['ui.router','ngResource','ngStorage','ngFileUpload'])
        .config(config);

    /** @ngInject */
    function config($stateProvider,$translatePartialLoaderProvider)
    {

        $stateProvider.state('app.quick-panel', {
            /*url      : '/ikoclass/login',
            views    : {
                'main@'                       : {
                    templateUrl: 'app/core/layouts/content-only.html',
                    controller : 'MainController as vm'
                },
                'content@app.pages_auth_login': {
                    templateUrl: 'app/main/pages/auth/login/login.html',
                    controller : 'LoginController as vm'
                }
            },*/
            resolve: {
                LessonsContent: function(LessonsContent) {
                    return LessonsContent;
                }
            }
            //,bodyClass: 'login'
        });

        $translatePartialLoaderProvider.addPart('app/quick-panel');
    }


})();
