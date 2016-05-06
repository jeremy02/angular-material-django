(function ()
{
    'use strict';

    angular
        .module('app.core')
        .directive('onEnter', onEnterDirective);

        /** @ngInject */
        function onEnterDirective($timeout, $q, $interpolate)
        {
            //directive('onEnter',function() {

            var linkFn = function(scope,element,attrs) {
                element.bind("keypress", function(event) {
                    if(event.which === 13) {
                        scope.$apply(function() {
                            scope.$eval(attrs.onEnter);
                        });
                        event.preventDefault();
                    }
                });
            };

            return {
                link:linkFn
            };
            //})
        }
})();

