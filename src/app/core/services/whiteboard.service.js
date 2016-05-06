(function ()
{
    'use strict';

    angular
        .module('app.core')
        .factory('Socket2222aaa', SocketResolverService);

    /** @ngInject */
    function SocketResolverService($q, $rootScope)
    {

        var socket = io.connect('http://192.168.1.43:3000');

        return {
            join: function(board_id, user) {
                var defer = $q.defer();

                //alert(user)
                //socket = io();

                /*socket.on('connected_to_board', function(data) {
                    localStorage.board_id = data.board_id;
                    localStorage.user = JSON.stringify(data.user);
                    defer.resolve(data);
                });*/

                socket.emit('join_board', {
                    board_id: board_id || localStorage.board_id,
                    name: user.name || JSON.parse(localStorage.user).name || 'Mohammed'
                    //name: user.name || JSON.parse(localStorage.user).name || 'Mohammed'
                });

                return defer.promise;
            },
            create: function() {
                var defer = $q.defer();
                //socket = io();

                socket.emit('create_board', {
                    name: 'lalla'
                });





                return defer.promise;
            },
            is_connected: function() {
                if (socket) {
                    return true;
                } else {
                    return false;
                }
            },
            getSocket: function() {
                return socket;
            },
            connect: function() {
                //socket = io();
                return socket;
            },
            send: function(event_name, data) {
                if (event_name && data) {
                    socket.emit(event_name, data);
                }
            },
            getOrJoin: function(room_id) {

                var defer = $q.defer();
                if (socket) {
                    defer.resolve(socket);
                    //alert(111111);
                } else {
                    //alert(22222);
                    this.join(room_id, {
                        name: 'lalla'
                    }).then(function(data) {
                        defer.resolve(socket);
                    });
                }
                return defer.promise;
            },
            on: function (eventName, callback) {
              socket.on(eventName, function () {
                var args = arguments;
                $rootScope.$apply(function () {
                  callback.apply(socket, args);
                });
              });
            },
            emit: function (eventName, data, callback) {
              socket.emit(eventName, data, function () {
                var args = arguments;
                $rootScope.$apply(function () {
                  if (callback) {
                    callback.apply(socket, args);
                  }
                });
              })
            }
        }
    }

})();