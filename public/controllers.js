'use strict';

var smartHomeControllers = angular.module('smartHomeControllers', []);

smartHomeControllers.controller('homeCtrl',
    function ($scope, $location, $http) {
        $scope.login = function () {
            console.log('Login clicked');
            $location.path('/login/');
            $('li').removeClass("active");
            $('li[ng-click="login()"]').addClass("active");
        }
        $scope.recipes = function () {
            console.log('Recipes clicked');
            $location.path('/recipes/');
            $('li').removeClass("active");
            $('li[ng-click="recipes()"]').addClass("active");
        }
        $scope.devices = function () {
            console.log('Devices clicked');
            $location.path('/devices/');
            $('li').removeClass("active");
            $('li[ng-click="devices()"]').addClass("active");
        }
        $scope.rooms = function () {
            console.log('Rooms clicked');
            $location.path('/rooms/');
            $('li').removeClass("active");
            $('li[ng-click="rooms()"]').addClass("active");
        }
        $scope.messages = function () {
            console.log('Messages clicked');
            $location.path('/messages/');
            $('li').removeClass("active");
            $('li[ng-click="messages()"]').addClass("active");
        }
        $scope.home = function () {
            console.log('Home clicked');
            $location.path('/');
            $('li').removeClass("active");
            $('li[ng-click="home()"]').addClass("active");
        }
        $scope.active = function HeaderController($scope, $location) {
            $scope.isActive = function (viewLocation) {
                return viewLocation === $location.path();
            };
        }
    });

$(document).ready(function () {
    if (/login/.test(window.location.href)) {
        console.log("login");
        $('li').removeClass("active");
        $('li[ng-click="login()"]').addClass("active");
    };
    if (/recipes/.test(window.location.href)) {
        console.log("recipes");
        $('li').removeClass("active");
        $('li[ng-click="recipes()"]').addClass("active");
    };
    if (/devices/.test(window.location.href)) {
        console.log("devices");
        $('li').removeClass("active");
        $('li[ng-click="devices()"]').addClass("active");
    };
    if (/rooms/.test(window.location.href)) {
        console.log("rooms");
        $('li').removeClass("active");
        $('li[ng-click="rooms()"]').addClass("active");
    };
    if (/messages/.test(window.location.href)) {
        console.log("messages");
        $('li').removeClass("active");
        $('li[ng-click="messages()"]').addClass("active");
    };
});

var loginControllers = angular.module('loginControllers', []);

loginControllers.controller('loginCtrl',
    function ($scope, $http) {

        $scope.login = function () {
            $http.post('/login', angular.toJson($scope.logindata))
                .then(function (response) {
                    console.log("login post-request sent. Response.data: ", response.data);
                    if (response.data.length == 1) {
                        $scope.loginMessage = "Je bent ingelogd als " + $scope.logindata.username;

                        var d = new Date();
                        d.setTime(d.getTime() + (365 * 24 * 60 * 60 * 1000));
                        var expires = "expires=" + d.toUTCString();

                        document.cookie = "username=" + $scope.logindata.username + ";" + expires;
                        window.location.href = "#!/"
                    }
                    else {
                        $scope.loginMessage = "Login failed. Incorrect emailaddress and/or password";
                        console.log("login failed: ", $scope.loginMessage)
                    }
                })
        }

        $scope.logout = function () {
            console.log('Logout button clicked!');
            document.cookie = "username=" + getCookie("username") + ";expires=Thu, 01 Jan 1970 00:00:01 GMT";
            console.log('Logout succesfull!')
        };
    });

var roomsControllers = angular.module('roomsControllers', []);

roomsControllers.controller('roomsCtrl',
    function ($scope, $http) {
        console.log('roomsCtrl controller fired')

        checkCookie();

        function checkCookie() {
            var username = getCookie("username");
            if (username != "") {
                console.log("Je bent ingelogd als " + username);
            }
            else {
                console.log("Je bent niet ingelogd")
                window.location.href = "#!/login/"
            }
        }

        function getCookie(cname) {
            var name = cname + "=";
            var ca = document.cookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') {
                    c = c.substring(1);
                }
                if (c.indexOf(name) == 0) {
                    return c.substring(name.length, c.length);
                }
            }
            return "";
        }

        $scope.load = function () {
            $http.get('/rooms')
                .then(function (response) {
                    var username = getCookie("username");
                    $scope.results = response.data.filter(room => room.username == username);

                    console.log('Responded!')
                })
        };

        $scope.load();

        /* $scope.findAll = function () {
            console.log("In find all");
            $http.get("/login").then(function (response) {
                $scope.results = response.data;
            })
        } */

        $scope.delete = function (id) {
            $http.delete("/room/" + id)
                .then(function (response) {
                    console.log("Deleted item: ", response.data)
                    $scope.load();
                });
        };

        $scope.addRoom = function () {
            $scope.roomdata.username = getCookie("username");
            $http.post('/rooms', angular.toJson($scope.roomdata))
                .then(function (response) {
                    console.log("Room post-request sent. Response.data: ", response.data);
                    if (response.data.affectedRows == 1) {
                        $scope.roomMessage = "Room added!"
                    }
                    else {
                        $scope.roomMessage = "Room add failed.";
                    }
                    $scope.load();
                }
                )
        }
    });

var devicesControllers = angular.module('devicesControllers', []);

devicesControllers.controller('devicesCtrl',
    function ($scope, $http) {
        console.log('devicesCtrl controller fired')

        checkCookie();

        function checkCookie() {
            var username = getCookie("username");
            if (username != "") {
                console.log("Je bent ingelogd als " + username);
            }
            else {
                console.log("Je bent niet ingelogd")
                window.location.href = "#!/login/"
            }
        }

        function getCookie(cname) {
            var name = cname + "=";
            var ca = document.cookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') {
                    c = c.substring(1);
                }
                if (c.indexOf(name) == 0) {
                    return c.substring(name.length, c.length);
                }
            }
            return "";
        }

        $scope.load = function () {
            $http.get('/devices')
                .then(function (response) {
                    var username = getCookie("username");
                    $scope.results = response.data.filter(device => device.username == username);
                    /* $scope.results = response.data; */
                    console.log('Responded!')
                })
        };

        $scope.load();

        /* $scope.findAll = function () {
            console.log("In find all");
            $http.get("/login").then(function (response) {
                $scope.results = response.data;
            })
        } */

        $scope.delete = function (id) {
            $http.delete("/device/" + id)
                .then(function (response) {
                    console.log("Deleted item: ", response.data)
                    $scope.load();
                });
        };

        $scope.addDevice = function () {
            $scope.devicedata.username = getCookie("username");
            $http.post('/devices', angular.toJson($scope.devicedata))
                .then(function (response) {
                    console.log("Device post-request sent. Response.data: ", response.data);
                    if (response.data.affectedRows == 1) {
                        $scope.deviceMessage = "Device added!"
                    }
                    else {
                        $scope.deviceMessage = "Device add failed.";
                    }
                    $scope.load();
                })
        }
    });

var recipesControllers = angular.module('recipesControllers', []);

recipesControllers.controller('recipesCtrl',
    function ($scope, $http) {
        console.log('recipesCtrl controller fired')

        checkCookie();

        function checkCookie() {
            var username = getCookie("username");
            if (username != "") {
                console.log("Je bent ingelogd als " + username);
            }
            else {
                console.log("Je bent niet ingelogd")
                window.location.href = "#!/login/"
            }
        }

        function getCookie(cname) {
            var name = cname + "=";
            var ca = document.cookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') {
                    c = c.substring(1);
                }
                if (c.indexOf(name) == 0) {
                    return c.substring(name.length, c.length);
                }
            }
            return "";
        }

        $scope.load = function () {
            $http.get('/recipes')
                .then(function (response) {
                    var username = getCookie("username");
                    $scope.results = response.data.filter(recipe => recipe.username == username);
                    /* $scope.results = response.data; */
                    console.log('Responded!')
                })
        };

        $scope.load();

        /* $scope.findAll = function () {
            console.log("In find all");
            $http.get("/login").then(function (response) {
                $scope.results = response.data;
            })
        } */

        $scope.delete = function (id) {
            $http.delete("/recipe/" + id)
                .then(function (response) {
                    console.log("Deleted item: ", response.data)
                    $scope.load();
                });
        };

        $scope.addRecipe = function () {
            $scope.recipedata.username = getCookie("username");
            $http.post('/recipes', angular.toJson($scope.recipedata))
                .then(function (response) {
                    console.log("Recipe post-request sent. Response.data: ", response.data);
                    if (response.data.affectedRows == 1) {
                        $scope.recipeMessage = "Recipe added!"
                    }
                    else {
                        $scope.recipeMessage = "Recipe add failed.";
                    }
                    $scope.load();
                })
        }
    });

var registerControllers = angular.module('registerControllers', []);

registerControllers.controller('userCtrl',
    function ($scope, $http) {
        $scope.load = function () {
            $http.get('/users')
                .then(function (response) {
                    $scope.results = response.data;
                    /* console.log("response.data in angular javascript file: ", response.data) */
                })
        };

        $scope.load();

        $scope.save = function () {
            try {
                if ($scope.register.password === $scope.register.re_password) {
                    $http.post('/user', angular.toJson($scope.register))
                        .then(function () {
                            var succesfull_password = "";
                            console.log("post request is verstuurd naar de database!")
                            $scope.load();
                            $scope.register_text = "Je account " + $scope.register.username + " is aangemaakt.";
                            console.log($scope.register_text);
                            $scope.succesfull_password = true;
                        });
                }
                else {
                    console.log("Passwords matchen niet");
                    $scope.register_errortext = "Fout: Passwords matchen niet.";
                    $scope.succesfull_password = false;
                }
            }
            catch (ex) {
                console.console.log("error trad op");
            }
        }

        $scope.findAll = function () {
            console.log("In find all");
            $http.get("/login").then(function (response) {
                $scope.results = response.data;
            })
        }

        $scope.delete = function (id) {
            $http.delete("/user/" + id)
                .then(function (response) {
                    console.log("Deleted item: ", response.data)
                    $scope.load();
                });
        };

        $scope.resetPassword = function (id) {
            $http.put("/user/" + id)
                .then(function (response) {
                    console.log("Password updated: ", response.data.id)
                })
        }
    });

var profileControllers = angular.module('profileControllers', []);

profileControllers.controller('profileCtrl',
    function ($scope, $http) {

        $scope.findAll = function () {
            console.log("In find all");
            $http.get("/login").then(function (response) {
                $scope.results = response.data;
            })
        }

        $scope.load = function () {
            $http.get('/users')
                .then(function (response) {
                    console.log("test");
                    var cookieId = getCookie("id");
                    $scope.results = response.data;
                    $scope.filterresults = $scope.results.filter(i => i.id == cookieId)
                    console.log("response.data in angular javascript file: ", response.data);

                    if (cookieId != "") {
                        console.log("Je bent  ingelogd met id: " + cookieId);
                        $scope.id_tekst = cookieId;
                    }
                    else {
                        console.log("Je bent niet ingelogd");
                    }
                });
        };

        $scope.load();

        $scope.delete = function (id) {
            $http.delete("/user/" + id)
                .then(function (response) {
                    console.log("Deleted item: ", response.data)
                    $scope.load();
                });
        };

        function getCookie(cname) {
            var name = cname + "=";
            var ca = document.cookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') {
                    c = c.substring(1);
                }
                if (c.indexOf(name) == 0) {
                    return c.substring(name.length, c.length);
                }
            }
            return "";
        }
    });