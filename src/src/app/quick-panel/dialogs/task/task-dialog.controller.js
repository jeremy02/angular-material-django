(function ()
{
    'use strict';

    angular
        .module('app.quick-panel')
        .controller('TaskDialogController', TaskDialogController);

    /** @ngInject */
    function TaskDialogController($mdDialog,$mdToast,Upload,$http,$rootScope,Socket,Lesson,FileType,event,IndividualChatContact)
    {
        var vm = this;
        //var data1 =  '$scope.myChannel';
        //Socket.emit('new video', data1);
        // Data
        vm.title = 'Upload Image';
        vm.lessonId = angular.copy(Lesson);
        vm.fileUploadType = angular.copy(FileType);

        vm.dialogIndividualChatContact = angular.copy(IndividualChatContact);

        if(vm.fileUploadType == 'Audio'){
            vm.title = 'Upload Audio';
        }else if(vm.fileUploadType == 'Video'){
            vm.title = 'Upload Video';
        }else{
            vm.title = 'Upload Image';
        }

        vm.newChatUploadFile = true;

        if(!vm.lessonId){
            //vm.classChatFile
            vm.classChatFile = {
                'id'                : '',
                'fileCaption': '',
                'chatImageFile': ''
            };
            vm.title = 'Edit Image';
            newChatUploadFile = false;
        }


        // Methods
        vm.addNewChatFile = addNewChatFile;
        vm.closeDialog = closeDialog;

        //////////

        /**
         * Add new chat file
         */
        function addNewChatFile()
        {
            var individualChatContactId;
            var individualChatContactUsername;
            if(vm.classChatActive && angular.toJson(vm.dialogIndividualChatContact) !='{}' && JSON.stringify(vm.dialogIndividualChatContact) !='{}'){
                individualChatContactId = vm.dialogIndividualChatContact['_id'];
                individualChatContactUsername = vm.dialogIndividualChatContact['username'];
            }else if(!vm.classChatActive && angular.toJson(vm.dialogIndividualChatContact) =='{}' && JSON.stringify(vm.dialogIndividualChatContact) =='{}'){
                individualChatContactId = '';
                individualChatContactUsername = '';
            }else{
                individualChatContactId = '';
                individualChatContactUsername = '';
            }

            if(vm.dialogIndividualChatContact != '{}'){

                individualChatContactId = vm.dialogIndividualChatContact['_id'];
                individualChatContactUsername = vm.dialogIndividualChatContact['username'];

                Upload.upload({
                url: 'http://52.33.44.21:3000/uploadsApi/uploadFilesChatExample',
                    data: {'chatText':vm.classChatFile.fileCaption,'lessonId': vm.lessonId,'chatUsername':$rootScope.currentUser.username,'chatUserId':$rootScope.currentUser._id,'individualChatContactId':individualChatContactId,'individualChatContactUsername':individualChatContactUsername},
                    file: vm.classChatFile.chatImageFile
                }).then(function (resp) {
                    console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
                }, function (resp) {
                    console.log('Error status: ' + resp.status);
                }, function (evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
                });

            }else{


            }


            /*Upload.upload({
            //url: 'http://localhost:3000/uploadsApi/uploadChatExample',
            url: 'http://52.33.44.21:3000/uploadsApi/uploadFilesChatExample',
            method: 'POST',
                //data: {'individualChatContactId':individualChatContactId,'individualChatContactUsername':individualChatContactUsername,'lessonId': vm.lessonId,'chatUsername':$rootScope.currentUser.username,'chatUserId':$rootScope.currentUser._id},

                data: {'chatText':vm.classChatFile.fileCaption,'lessonId': vm.lessonId,'chatUsername':$rootScope.currentUser.username,'chatUserId':$rootScope.currentUser._id,'individualChatContactId':individualChatContactId,'individualChatContactUsername':individualChatContactUsername},
                ///data: {'chatText':uploadCaption,'lessonId': $routeParams.id,'chatUsername':$rootScope.currentUser.username,'chatUserId':$rootScope.currentUser._id},
                file: vm.classChatFile.chatImageFile
            }).then(function (resp) {
                //console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
            }, function (resp) {
                //console.log('Error status: ' + resp.status);
            }, function (evt) {
                //var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                //console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
            });*/



            //alert(vm.dialogIndividualChatContact);

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