(function ()
{
    'use strict';

    /**
     * Main module of the Fuse
     */
    angular
        .module('fuse', [

            // Core
            'app.core',

            // Navigation
            'app.navigation',

            // Toolbar
            'app.toolbar',

            // Quick panel
            //'app.quick-panel',

            // Pages
            'app.pages'//,// Sample

            //,'ui.router','ngResource','ngStorage'

            // Sample
            //'app.sample'
        ]);
})();