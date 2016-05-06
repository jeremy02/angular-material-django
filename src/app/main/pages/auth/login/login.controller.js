(function ()
{
    'use strict';

    angular
        .module('app.pages.login')
        .controller('LoginController', LoginController);

    /** @ngInject */
    function LoginController($scope,$http, $rootScope,$localStorage,Auth)
    {
        // Data

        var vm = this;

        // Methods

        vm.login = function(){

            Auth.login({ username: vm.form.username, password: vm.form.password });
        };

    }
})();