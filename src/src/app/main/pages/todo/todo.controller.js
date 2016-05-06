(function ()
{
    'use strict';

    angular
        .module('app.ffs')
        .controller('TodoController', TodoController);

    /** @ngInject */
    //function TodoController($document, $mdDialog, $mdSidenav, Tasks, Tags,$timeout, $q, $log,Companies,DjangoAuth)

    function TodoController($document,$rootScope,$http, $mdDialog,$mdToast, $mdSidenav, $timeout, $q, $log,Companies,DjangoAuth,Comments,EmployeeProfile,CompanyFunctions)
    {
        var vm = this;

        // Data
        vm.commentsShow = true;
        vm.employeesShow = true;
        vm.companiesShow = true;

        vm.toggleCompanyEmployeesAndComments = false;
        vm.showCompany = 'ALL COMPANIES';
        vm.showCompanyIdForDialog = '';

        vm.showCompanyNameForFilter = '';
        vm.showCompanyIdForFilterDialog = '';

        var companiesList = [];
        var array = [];
        vm.users = [];
        vm.companies = [];
        vm.selectedCompanyForComment = [];

        vm.streamingSource = 'http://52.33.44.21:3002/flexcomms/media/';


        vm.employeeAssignFormData = {
                'companyId':'',
                'employeeId':''
        };    




        vm.comments = Comments.query().$promise
            .then(function(response) {
                vm.comments = response.data;
            })
            .catch(function(response) {

            vm.comments = [];

        });

        //vm.comments = Comments.query(); //query() returns all the entries

        // Methods
        vm.preventDefault = preventDefault;
        vm.toggleSidenav = toggleSidenav;
        vm.toggleFilterWithEmpty = toggleFilterWithEmpty;
        vm.resetFilters = resetFilters;
        vm.openCompanyDialog = openCompanyDialog;
        vm.openCommentsDialog = openCommentsDialog;
        vm.openEmployeeDialog = openEmployeeDialog;
        vm.assignToCompanyForm = assignToCompanyForm;

        vm.showCompanyEmployees = showCompanyEmployees;
        vm.showCompanyComments = showCompanyComments;
        vm.addCompanyCommentsFilter = addCompanyCommentsFilter;


        init();

        //////////

        /**
         * Initialize the controller
         */
        function init()
        {
            vm.selectedCompanyForComment = [];

            Companies.get({}, function(result) {

                array = result.data;

                vm.simulateQuery = false;
                vm.isDisabled    = false;

                //vm.repos         = loadAll();
                vm.querySearch   = querySearch;
                vm.selectedItemChange = selectedItemChange;
                vm.searchTextChange   = searchTextChange;

                vm.assignEmployee = assignEmployee;

                // ******************************
                // Internal methods
                // ******************************

                /**
                 * Search for repos... use $timeout to simulate
                 * remote dataservice call.
                 */
                function querySearch (query) {


                    var results = query ? array.filter(createFilterFor(query)) : array,
                        deferred;
                    return results;
                    /*if (vm.simulateQuery) {
                    deferred = $q.defer();
                    $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
                    return deferred.promise;
                    } else {
                    return function() { return results;};
                    }*/
                }

                function searchTextChange(text) {
                  $log.info('Text changed to ' + text);
                }

                function selectedItemChange(item) {
                  $log.info('Item changed to ' + JSON.stringify(item));
                  //alert(item.id);
                  vm.employeeAssignFormData.companyId = JSON.stringify(item.id);
                  //vm.employeeAssignFormData.employeeId = 1;
                  //vm.employeeAssignFormData.employeeId = JSON.stringify(item.id);
                  //
                }

                /**
                 * Create filter function for a query string
                 */
                function createFilterFor(query) {
                  var lowercaseQuery = angular.lowercase(query);

                  return function filterFn(item) {
                    return (item.value.indexOf(lowercaseQuery) === 0);
                  };

                }


                function assignEmployee() {

                    DjangoAuth.assignEmployee({
                        companyId: vm.employeeAssignFormData.companyId,
                        userId: vm.employeeAssignFormData.employeeId
                    });

                    vm.employeeAssignFormData.companyId = '';
                    vm.employeeAssignFormData.employeeId = '';
                    vm.selectedItem = [];


                };






            });
        }

        /**
         * Prevent default
         *
         * @param e
         */
        function preventDefault(e)
        {
            e.preventDefault();
            e.stopPropagation();
        }


        /**
         * Open new company dialog
         *
         * @param ev
         * @param task
         */
        function openCompanyDialog(ev, company)
        {
            $mdDialog.show({
                controller         : 'CompanyDialogController',
                controllerAs       : 'vm',
                templateUrl        : 'app/main/pages/todo/dialogs/company/company-dialog.html',
                parent             : angular.element($document.body),
                targetEvent        : ev,
                clickOutsideToClose: true,
                locals             : {
                    Company : company,
                    event: ev
                }
            });
        }

        /**
         * Open new comments dialog
         *
         * @param ev
         * @param task
         */

        function openCommentsDialog(ev, comment,company)
        {

            $mdDialog.show({
                controller         : 'CommentsDialogController',
                controllerAs       : 'vm',
                templateUrl        : 'app/main/pages/todo/dialogs/comments/comments-dialog.html',
                parent             : angular.element($document.body),
                targetEvent        : ev,
                clickOutsideToClose: true,
                locals             : {
                    Comment        : comment,
                    Company        : company,
                    //Comments: vm.comments,
                    event: ev
                }
            });
        }

        /**
         * Open Employees dialog
         *
         * @param ev
         * @param task
         */
        function openEmployeeDialog(ev, user)
        {
            $mdDialog.show({
                controller         : 'EmployeesDialogController',
                controllerAs       : 'vm',
                templateUrl        : 'app/main/pages/todo/dialogs/employee/employee-dialog.html',
                parent             : angular.element($document.body),
                targetEvent        : ev,
                clickOutsideToClose: true,
                locals             : {
                    User : user,
                    event: ev
                }
            });
        }

        /**
         * Copy Employees Id to the Assign Employee to Company Form
         *
         * @param ev
         * @param user
         */
        function assignToCompanyForm(ev, user)
        {
            vm.employeeAssignFormData.employeeId = user.id;
            vm.employeeAssignFormData.employeeUsername = user.username;
        }

        /**
         * Show Company Employees
         *
         * @param ev
         * @param company
         */

        function showCompanyEmployees(ev,company){

            vm.toggleCompanyEmployeesAndComments = true;
            var companyName = company.name || company.companies__name;
            var companyId = company.id || company.companies__id;
            vm.showCompany = companyName;
            vm.showCompanyIdForDialog = '';

            CompanyFunctions.showCompanyEmployees({ params: { 'companyName':companyName,'companyId':companyId} })
                .success(function(res) {
                    $mdToast.show(
                        $mdToast.simple()
                        .textContent(res.message)
                        .position('bottom right')
                        .hideDelay(3000)
                    );
                    vm.companyEmployees = res.data;
                })
                .error(function(err) {
                    vm.companyEmployees = [];

                    $mdToast.show(
                        $mdToast.simple()
                        .textContent(err)
                        .position('bottom right')
                        .hideDelay(3000)
                    );

                });



        }

        /**
         * Show Company Comments
         *
         * @param ev
         * @param company
         */

        function showCompanyComments(ev,company){

            vm.toggleCompanyEmployeesAndComments = false;
            var companyName = company.name || company.companies__name;
            var companyId = company.id || company.companies__id;
            vm.showCompany = companyName;
            vm.showCompanyIdForDialog = companyId;

            CompanyFunctions.showCompanyComments({ params: { 'companyName':companyName,'companyId':companyId} })
                .success(function(res) {
                    $mdToast.show(
                        $mdToast.simple()
                        .textContent(res.message)
                        .position('bottom right')
                        .hideDelay(3000)
                    );
                    vm.comments = res.data;
                })
                .error(function(err) {
                    vm.vm.comments = [];

                    $mdToast.show(
                        $mdToast.simple()
                        .textContent(err)
                        .position('bottom right')
                        .hideDelay(3000)
                    );

                });



        }

        /**
         * Add Company filter for comments
         *
         * @param ev
         * @param company
         */

        function addCompanyCommentsFilter(ev,companyFilter){

            var companyFilterId = (companyFilter.company__id);
            var companyFilterName = (companyFilter.company__name);

            vm.showCompany = companyFilterName;
            //vm.showCompanyIdForDialog = '';

            vm.showCompanyNameForFilter = companyFilterName;
            vm.showCompanyIdForFilterDialog = companyFilterId;

        }

        /**
         * Toggle sidenav
         *
         * @param sidenavId
         */
        function toggleSidenav(sidenavId)
        {
            $mdSidenav(sidenavId).toggle();
        }

        /**
         * Toggles filter with true or empty string
         * @param filter
         */
        function toggleFilterWithEmpty(filter)
        {

            if(filter ==='employees'){

                EmployeeProfile.get({}).$promise
                .then(function(response) {
                    vm.users = response.data;              
                })
                .catch(function(response) {

                    vm.users = [];
                      
                });

                vm.employeesShow = false;
                vm.commentsShow = false;
                vm.companiesShow = true;    

            }else if(filter ==='company'){

                vm.companiesShow = false;
                vm.commentsShow = false;
                vm.employeesShow = true;

                vm.toggleCompanyEmployeesAndComments = false;
                vm.showCompany = 'ALL COMPANIES';

                Companies.query(function(res) {
                    vm.companies = res.data;
                }, function(error) {
                    vm.companies = [];
                });
                //FIND SOLUTIONS
                vm.comments = Comments.query().$promise
                    .then(function(response) {
                        vm.comments = response.data;
                    })
                    .catch(function(response) {

                    vm.comments = [];

                });

            }else if(filter ==='my companies'){

                vm.companiesShow = false;
                vm.commentsShow = false;
                vm.employeesShow = true;

                vm.toggleCompanyEmployeesAndComments = false;
                vm.showCompany = 'ALL COMPANIES';

                CompanyFunctions.getMyCompanies({ params: { userId: $rootScope.currentUser.id} })
                    .success(function(res) {
                        $mdToast.show(
                            $mdToast.simple()
                            .textContent(res.message)
                            .position('top right')
                            .hideDelay(3000)
                        );
                        vm.companies = res.data;
                    })
                    .error(function(err) {
                        vm.companies = [];

                        $mdToast.show(
                            $mdToast.simple()
                            .textContent(err)
                            .position('top right')
                            .hideDelay(3000)
                        );

                    });


                //FIND SOLUTIONS
                vm.comments = Comments.query().$promise
                    .then(function(response) {
                        vm.comments = response.data;
                    })
                    .catch(function(response) {

                    vm.comments = [];

                });




            }else{
                vm.commentsShow = true;
                vm.employeesShow = true;
                vm.companiesShow = true;

            }
        }

        /**
         * Reset filters
         */
        function resetFilters()
        {
            vm.commentsShow = true;
            vm.employeesShow = true;
            vm.companiesShow = true;

            vm.showCompany = 'ALL COMPANIES';
            vm.showCompanyIdForDialog = '';

            vm.showCompanyNameForFilter = '';
            vm.showCompanyIdForFilterDialog = '';

            Comments.query().$promise
                .then(function(response) {
                    vm.comments = response.data;
                })
                .catch(function(response) {

                vm.comments = [];

            });

        }


    }
})();