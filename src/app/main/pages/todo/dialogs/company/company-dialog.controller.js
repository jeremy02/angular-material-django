(function ()
{
    'use strict';

    angular
        .module('app.ffs')
        .controller('CompanyDialogController', CompanyDialogController);

    /** @ngInject */
    function CompanyDialogController($mdDialog,$httpParamSerializer,$mdToast,Upload,$http,$rootScope,Companies, Company, event)
    {
        var vm = this;

        // Data
        vm.title = 'Edit Company';

        vm.streamingSource = 'http://127.0.0.1:9000/flexcomms/media/';

        vm.companyData = angular.copy(Company);


        vm.newCompany = false;

        if(!vm.companyData){
            //vm.companyData



            vm.companyData = {
                'id':'',
                'logo': '',
                'name': '',
                'tagline': '',
                'description': ''
            };

            vm.title = 'Add Company';
            vm.newCompany = true;
        }


        // Methods
        vm.addNewCompany = addNewCompany;
        vm.saveCompany = saveCompany;
        vm.deleteCompany = deleteCompany;
        vm.closeDialog = closeDialog;

        //////////

        /**
         * Add new upload file
         */
        function addNewCompany()
        {
            //alert(vm.companyData.companyLogoFile);
            //alert(vm.companyData.companyDescription);
            Upload.upload({
                url: 'http://localhost:9000/flexcomms/companies/',
                method: 'POST',
                //data: {'uploadCaption':vm.classUploadFile.fileCaption,'lessonId': $routeParams.id},
                data: {
                    //'companyLogoFile': 'vm.companyData.companyLogoFile',
                    'companyName': vm.companyData.name,
                    'companyTagline': vm.companyData.tagline,
                    'companyDescription': vm.companyData.description
                },
                file: vm.companyData.logo
            }).then(function (resp) {
                //console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
                //alert(resp.data.message);

                $mdToast.show(
                    $mdToast.simple()
                    .textContent(resp.data.message)
                    .position('top right')
                    .hideDelay(3000)
                );


            }, function (resp) {
                //console.log('Error status: ' + resp.status);
                $mdToast.show(
                    $mdToast.simple()
                    .textContent('Error status: ' + resp.status)
                    .position('top right')
                    .hideDelay(3000)
                );
            }, function (evt) {
                //var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                //console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
            });

            closeDialog();
        }


        /**
        * Save Company
         */
        function saveCompany()
        {

            Companies.update(
                {
                    'companyId':vm.companyData.id,
                    'name':vm.companyData.name,
                    'tagline': vm.companyData.tagline,
                    'description': vm.companyData.description
                },
            function (response) {
                $mdToast.show(
                    $mdToast.simple()
                    .textContent(response.message)
                    .position('top right')
                    .hideDelay(3000)
                );

            }, function (error) {
                $mdToast.show(
                    $mdToast.simple()
                    .textContent(error)
                    .position('top right')
                    .hideDelay(3000)
                );
            });

            closeDialog();
        }

        /**
        * Delete Company
         */
        function deleteCompany()
        {

            var confirm = $mdDialog.confirm()
                .title('Are you sure?')
                .content('The Company will be deleted.')
                .ariaLabel('Delete Company')
                .ok('Delete')
                .cancel('Cancel')
                .targetEvent(event);

            $mdDialog.show(confirm).then(function ()
            {
                // Dummy delete action
                //alert(vm.companyData.id)
                Companies.delete({ },
                    {
                        'companyId':vm.companyData.id
                    },
                function (response) {

                }, function (error) {

                });

                var data = {id:'id_from_data'};

                Companies.$delete({id: 123});
                Companies.delete_user({},data);



            }, function ()
            {
                // Cancel Action
            });


            closeDialog();
        }



        /**
         * Close dialog
         */
        function closeDialog()
        {
            $mdDialog.hide();
        }
    }
})();