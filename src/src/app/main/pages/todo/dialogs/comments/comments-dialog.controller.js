(function ()
{
    'use strict';

    angular
        .module('app.ffs')
        .controller('CommentsDialogController', CommentsDialogController);

    /** @ngInject */
    function CommentsDialogController($mdDialog,$httpParamSerializer,$mdToast,Upload,$http,$rootScope,Comments,Comment,Company, event)
    {
        var vm = this;

        // Data
        vm.title = 'Edit Comment';
;

        vm.comment = angular.copy(Comment);
        vm.company = angular.copy(Company);


        //vm.comments = Comments.get({});


        vm.newComment = false;

        if(!vm.comment){

            vm.comment = {
                'id'                : '',
                'company__id'      : vm.company,
                'customerFirstname' : '',
                'customerLastname'  : '',
                'customerPhone'     : '',
                'comment'           : '',
                //'company__id'       : '',
                'company__name'     : ''
            };

            vm.title = 'Add Comment';
            vm.newComment = true;
        }


        // Methods
        vm.addNewComment = addNewComment;
        vm.saveComment = saveComment;
        vm.deleteComment = deleteComment;
        vm.closeDialog = closeDialog;

        //////////

        /**
        * Add new comment
         */
        function addNewComment()
        {
           //alert(vm.company);


            Comments.save({ }, $httpParamSerializer(
                {
                    //'companyId':vm.comment.company__id,
                    'companyId':vm.company,
                    'firstName': vm.comment.customerFirstname,
                    'lastName': vm.comment.customerLastname,
                    'phoneNumber': vm.comment.customerPhone,
                    'comment': vm.comment.comment
                }),
            function (response) {

            }, function (error) {

            });

            closeDialog();
        }

        /**
        * Save Comment
         */
        function saveComment()
        {
            //alert(vm.comment.company__id);

            Comments.update(
                {
                    'companyId':vm.comment.company__id,
                    'commentId':vm.comment.id,
                    'firstName': vm.comment.customerFirstname,
                    'lastName': vm.comment.customerLastname,
                    'phoneNumber': vm.comment.customerPhone,
                    'comment': vm.comment.comment
                },
            function (response) {

            }, function (error) {

            });

            closeDialog();
        }

        /**
        * Delete Comment
         */
        function deleteComment()
        {

            var confirm = $mdDialog.confirm()
                .title('Are you sure?')
                .content('The comment will be deleted.')
                .ariaLabel('Delete Comment')
                .ok('Delete')
                .cancel('Cancel')
                .targetEvent(event);

            $mdDialog.show(confirm).then(function ()
            {
                // Dummy delete action
                
                Comments.delete({ },
                    {
                        'companyId':vm.comment.company__id
                    }, 
                function (response) {

                }, function (error) { 

                });

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