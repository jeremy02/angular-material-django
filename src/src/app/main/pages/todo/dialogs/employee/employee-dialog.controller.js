(function ()
{
    'use strict';

    angular
        .module('app.ffs')
        .controller('EmployeesDialogController', EmployeesDialogController);

    /** @ngInject */
    function EmployeesDialogController($mdDialog,$mdToast,Upload,$http,$httpParamSerializer,$rootScope,DjangoAuth,User, event)
    {
        var vm = this;

        // Data
        vm.title = 'Edit Employee';

        vm.employeeData = angular.copy(User);


        vm.newEmployee = false;

        if(!vm.employeeData){

            vm.employeeData = {
                'id':'',
                'first_name': '',
                'last_name': '',
                'username': '',
                'password': ''
            };

            vm.title = 'Add Employee';
            vm.newEmployee = true;
        }



        // Methods
        vm.addNewEmployee = addNewEmployee;
        vm.saveEmployee = saveEmployee;
        vm.deleteEmployee = deleteEmployee;
        vm.closeDialog = closeDialog;

        //////////

        /**
         * Add new Employeee
         */
        function addNewEmployee()
        {
            /*DjangoAuth.employeeRegister({ }, $httpParamSerializer(
                {
                    'companyId':vm.comment.company__id,
                    'firstName': vm.comment.customerFirstname,
                    'lastName': vm.comment.customerLastname,
                    'phoneNumber': vm.comment.customerPhone,
                    'comment': vm.comment.comment
                }),
            function (response) {

            }, function (error) {

            });*/
            DjangoAuth.employeeRegister({
                firstname: vm.employeeData.first_name,
                lastname: vm.employeeData.last_name,
                username: vm.employeeData.username,
                password: vm.employeeData.password
            });

            closeDialog();
        }

        /**
        * Save Employee
         */
        function saveEmployee()
        {

            DjangoAuth.updateUserProfile({
                firstname: vm.employeeData.first_name,
                lastname: vm.employeeData.last_name,
                username: vm.employeeData.username,
                password: vm.employeeData.password
            });
            
            closeDialog();
        }

        /**
        * Delete Employee
         */
        function deleteEmployee()
        {

            var confirm = $mdDialog.confirm()
                .title('Are you sure?')
                .content('The employee/user will be deleted.')
                .ariaLabel('Delete Employee')
                .ok('Delete')
                .cancel('Cancel')
                .targetEvent(event);

            $mdDialog.show(confirm).then(function ()
            {
                alert(11111);
                // Dummy delete action
                
                /*Comments.delete({ },
                    {
                        'companyId':vm.comment.company__id
                    }, 
                function (response) {

                }, function (error) { 

                });*/

            }, function ()
            {
                // Cancel Action
            });
                        
            
            //closeDialog();
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