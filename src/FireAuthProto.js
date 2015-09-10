/*
* Copyright © 2015 Ayush Jain & Rohan Iyer
* Deployment Version 0.0.1 (ECMA5 compiled)
*
* Permission is hereby granted, free of charge, to any person obtaining a copy
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
*
* The above copyright notice and this permission notice shall be included in
* all copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
* THE SOFTWARE.
*/

"use strict";


Firebase.prototype.tokenName = "myToken";

if(token == null){
    ref.token = "No Token";
}

Firebase.prototype.checkForAvailableToken = function(){
    this.authWithCustomToken(localStorage.getItem(this.tokenName), function(error, result) {
        if (error) {
            console.log("No token found");
        } else {
            console.log("Existing token found");
        }
    });
}


/**
* Creates a new Firebase user with Email and Password Authentication.
* @function createUserWithEmail
* @param  {string} email - The user's email
* @param  {string} password - The user's password
* @param  {Function} callback - Optional callback function with parameter userData. (Called upon successful account creation)
* @example
* fireAuthInstance.createUserWithEmail("john@doe.com", "correcthorsebatterystaple", function(userData){
*      // The user creation was successful
*      doStuffWith(userData);
* })
*/
Firebase.prototype.createUserWithEmail = function(email, password, callback){
    this.createUser({
        email    : email,
        password : password
    }, function(error, userData) {
        if (error) {
            throw "Account Creation Failed! " + error;
        } else {
            console.log("Successfully created user account with uid:", userData.uid);


            if(typeof callback === "function"){
                callback(userData);
            }
        }
    });
}

/**
* Logs in a Firebase user with Email and Password Authentication.
* @function loginWithEmail
* @param  {string} email - The user's email
* @param  {string} password - The user's password
* @param  {boolean} token - True to create an auth token, false to not create one.
* @param  {function} callback - Optional callback function with parameter authData. (Called upon successful login)
* @example
* fireAuthInstance.loginWithEmail("john@doe.com", "correcthorsebatterystaple", false, function(authData){
*      // The authentication was successful.
*      doStuffWith(authData);
* })
*/
Firebase.prototype.loginWithEmail = function(email, password, token, callback){
    var ref = this;
    this.authWithPassword({
        email    : email,
        password : password
    }, function authHandler(error, authData) {
        if (error) {
            throw "Authentication Failed! " + error;
        } else {
            console.log("Authenticated successfully with payload:", authData);
            if(token){
                console.log(authData.token)
                localStorage.setItem(ref.tokenName, authData.token);
            }

            if(typeof callback == "function"){
                callback(authData);
            }
        }
    });
}

/**
* Changes a Firebase user's password.
* @function changeUserPassword
* @param  {string} email - The user's email
* @param  {string} oldPassword - The user's original password
* @param  {string} newPassword - The user's new password
* @param  {Function} callback - Optional callback function. (Called upon successful password change)
* @example
* fireAuthInstance.changeUserPassword("john@doe.com", "correcthorsebatterystaple", "youwillneverguessthis", function(){
*      // Password has been changed - handle anything else here.
* })
*/
Firebase.prototype.changeUserPassword = function(email, oldPassword, newPassword, callback){
    this.changePassword({
        email:email,
        oldPassword:oldPassword,
        newPassword:newPassword
    }, function(error){
        if(error){
            switch (error.code) {
                case "INVALID_USER":
                throw "The specified user account does not exist.";
                break;
                case "INVALID_PASSWORD":
                throw "The specified user account password is incorrect.";
                break;
                default:
                throw "Error changing password: " + error;
            }
        }else{
            console.log("User password changed successfully!");
            callback()
        }
    })
}

/**
* Changes a Firebase user's email.
* @function changeUserEmail
* @param  {string} oldEmail - The user's original email
* @param  {string} newEmail - The user's new email
* @param  {string} password - The user's password
* @param  {Function} callback - Optional callback function. (Called upon successful email change)
* @example
* fireAuthInstance.changeUserEmail("john@doe.com", "jane@doe.com", "correcthorsebatterystaple", function(){
*      // Email has been changed - handle anything else here.
* })
*/
Firebase.prototype.changeUserEmail = function(oldEmail, newEmail, password, callback){
    this.changeEmail({
        email:email,
        oldPassword:oldPassword,
        newPassword:newPassword
    }, function(error){
        if(error){
            switch (error.code) {
                case "INVALID_USER":
                throw "The specified user account does not exist.";
                break;
                case "INVALID_PASSWORD":
                throw "The specified user account password is incorrect.";
                break;
                default:
                throw "Error changing email: " + error;
            }
        }else{
            console.log("User email changed successfully!");
            callback()
        }
    })
}

/**
* Sends a reset password email to the user.
* @function resetUserPassword
* @param  {string} email - The user's email
* @param  {Function} callback - Optional callback function. (Called once reset email is sent)
* @example
* fireAuthInstance.resetUserPassword("john@doe.com", function(){
*      // Email has been sent - handle anything else here.
* })
*/
Firebase.prototype.resetUserPassword = function(email, callback){
    this.changeEmail({
        email:email,
        oldPassword:oldPassword,
        newPassword:newPassword
    }, function(error){
        if(error){
            switch (error.code) {
                case "INVALID_USER":
                throw "The specified user account does not exist.";
                break;

                default:
                throw "Error resetting password: " + error;
            }
        }else{
            console.log("User email changed successfully!");
            callback()
        }
    })
}



/**
* Deletes a Firebase user with Email and Password Authentication.
* @function deleteUserWithEmail
* @param  {string} email - The user's email
* @param  {string} password - The user's password
* @param  {Function} callback - Optional callback function. (Called upon successful account deletion)
* @example
* fireAuthInstance.deleteUserWithEmail("john@doe.com", "correcthorsebatterystaple", function(){
*      // Successfully deleted user within Firebase - Handle anything else here.
* })
*/
Firebase.prototype.deleteUserWithEmail = function(email, password, callback){
    this.removeUser({
        email: email,
        password: password
    }, function(error) {
        if (error) {
            switch (error.code) {
                case "INVALID_USER":
                throw "The specified user account does not exist.";
                break;
                case "INVALID_PASSWORD":
                throw "The specified user account password is incorrect.";
                break;
                default:
                throw "User deletion failed! " + error;
            }
        } else {
            console.log("User account deleted successfully!");
            if(typeof callback == "function"){
                callback()
            }
        }
    });
}

/**
* Logs in a Firebase user with Facebook Authentication. Make sure your application is [configured as a Facebook App](https://www.firebase.com/docs/web/guide/login/facebook.html).
* @function loginWithFacebook
* @param {boolean} redirect - Whether the webpage should redirect the current page. If false the webpage will just open a popup to Facebook.
* @param {boolean} token - True to create an auth token, false to not create one.
* @param {string} sessionTime - If not specified - or set to default - sessions are persisted for as long as you have configured in the Login & Auth tab of your App Dashboard. To limit persistence to the lifetime of the current window, set this to sessionOnly. A value of none will not persist authentication data at all and will end authentication as soon as the page is closed.
* @param {string} permissions - A set of permissions your application may want to access from the user's Facebook account. Certain permissions will have to be approved by the user and Facebook. Each of these permissions can be accessed through the callback. [Click here](https://developers.facebook.com/docs/facebook-login/permissions/v2.4) to view some of the permissions that can be access from Facebook.
* @param {Function} callback - Optional callback function with parameter [authData](https://www.firebase.com/docs/web/guide/login/facebook.html#section-logging-in) that will not get called if redirect is true. (Called upon successful login) [NOTE: Alternatively, this can be done with the "authChangeListener" function]
* @example
* fireAuthInstance.loginWithFacebook(false, true, "default", "email, user_likes" , function(authData){
*      // The authentication was successful and opened within a popup.
*      doStuffWith(authData);
* });
*/
Firebase.prototype.loginWithFacebook = function(redirect, token, sessionTime, permissions, callback){
    if(redirect){
        this.authWithOAuthRedirect("facebook", function(error){
            if(error){
                throw "Authentication Failed! " + error;
            }
        })
    }else{
        this.authWithOAuthPopup("facebook", function(error, authData){
            if(error){
                throw "Authentication Failed! " + error;
            }else{
                console.log("Authenticated successfully with payload:", authData);
                if(token){
                    localStorage.setItem(this.tokenName, authData.token);
                }
                if(typeof callback == "function"){
                    callback(authData);
                }
            }
        },{
            remember: sessionTime,
            scope: permissions
        });
    }
}


/**
* Logs in a Firebase user with GitHub Authentication. Make sure your application is [configured as a GitHub App](https://www.firebase.com/docs/web/guide/login/github.html).
* @function loginWithGithub
* @param {boolean} redirect - Whether the webpage should redirect the current page. If false the webpage will just open a popup to GitHub.
* @param {boolean} token - True to create an auth token, false to not create one.
* @param {string} sessionTime - If not specified - or set to default - sessions are persisted for as long as you have configured in the Login & Auth tab of your App Dashboard. To limit persistence to the lifetime of the current window, set this to sessionOnly. A value of none will not persist authentication data at all and will end authentication as soon as the page is closed.
* @param {string} permissions - A set of permissions your application may want to access from the user's Github account. Certain permissions will have to be approved by the user and Github. Each of these permissions can be accessed through the callback. [Click here](https://developer.github.com/v3/oauth/#scopes) to view some of the permissions that can be access from Github.
* @param {Function} callback - Optional callback function with parameter [authData](https://www.firebase.com/docs/web/guide/login/github.html#section-logging-in) that will not get called if redirect is true. (Called upon successful login) [NOTE: Alternatively, this can be done with the "authChangeListener" function]
* @example
* fireAuthInstance.loginWithGithub(false, false, "default", "user, notifications, read:org" , function(authData){
*      // The authentication was successful and opened within a popup.
*      doStuffWith(authData);
* });
*/
Firebase.prototype.loginWithGithub = function(redirect, token, sessionTime, permissions, callback){
    if(redirect){
        this.authWithOAuthRedirect("github", function(error){
            if(error){
                throw "Authentication Failed! " + error;
            }
        })
    }else{
        this.authWithOAuthPopup("github", function(error, authData){
            if(error){
                throw "Authentication Failed! " + error;
            }else{
                console.log("Authenticated successfully with payload:", authData);
                if(token){
                    localStorage.setItem(this.tokenName, authData.token);
                }
                if(typeof callback == "function"){
                    callback(authData);
                }
            }
        }, {
            remember: sessionTime,
            scope: permissions
        });
    }
}

/**
* Logs in a Firebase user with Google Authentication. Make sure your application is [configured as a Google App](https://www.firebase.com/docs/web/guide/login/google.html).
* @function loginWithGoogle
* @param {boolean} redirect - Whether the webpage should redirect the current page. If false the webpage will just open a popup to Google.
* @param {boolean} token - True to create an auth token, false to not create one.
* @param {string} sessionTime - If not specified - or set to default - sessions are persisted for as long as you have configured in the Login & Auth tab of your App Dashboard. To limit persistence to the lifetime of the current window, set this to sessionOnly. A value of none will not persist authentication data at all and will end authentication as soon as the page is closed.
* @param {string} permissions - A set of permissions your application may want to access from the user's Google account. Certain permissions will have to be approved by the user and Google. Each of these permissions can be accessed through the callback. [Click here](https://developers.google.com/+/web/api/rest/oauth#scopes) to view some of the permissions that can be access from Google.
* @param {Function} callback - Optional callback function with parameter [authData](https://www.firebase.com/docs/web/guide/login/google.html#section-logging-in) that will not get called if redirect is true. (Called upon successful login) [NOTE: Alternatively, this can be done with the "authChangeListener" function]
* @example
* fireAuthInstance.loginWithGoogle(true, false "none", "profile, openid" , function(authData){
*      // The authentication was successful and opened within a popup.
*      doStuffWith(authData);
* });
*/
Firebase.prototype.loginWithGoogle = function(redirect, token, sessionTime, permissions, callback){
    if(redirect){
        this.authWithOAuthRedirect("google", function(error){
            if(error){
                throw "Authentication Failed! " + error;
            }
        })
    }else{
        this.authWithOAuthPopup("google", function(error, authData){
            if(error){
                throw "Authentication Failed! " + error;
            }else{
                console.log("Authenticated successfully with payload:", authData);
                if(token){
                    localStorage.setItem(this.tokenName, authData.token);
                }
                if(typeof callback == "function"){
                    callback(authData);
                }
            }
        }, {
            remember: sessionTime,
            scope: permissions
        });
    }
}

/**
* Logs in a Firebase user with Twitter Authentication. Make sure your application is [configured as a Twitter App](https://www.firebase.com/docs/web/guide/login/twitter.html).
* @function loginWithTwitter
* @param {boolean} redirect - Whether the webpage should redirect the current page. If false the webpage will just open a popup to Twitter.
* @param {boolean} token - True to create an auth token, false to not create one.
* @param {string} sessionTime - If not specified - or set to default - sessions are persisted for as long as you have configured in the Login & Auth tab of your App Dashboard. To limit persistence to the lifetime of the current window, set this to sessionOnly. A value of none will not persist authentication data at all and will end authentication as soon as the page is closed.
* @param {Function} callback - Optional callback function with parameter [authData](https://www.firebase.com/docs/web/guide/login/twitter.html#section-logging-in) that will not get called if redirect is true. (Called upon successful login)[NOTE: Alternatively, this can be done with the "authChangeListener" function]
* @example
* fireAuthInstance.loginWithTwitter(false, true, "sessionOnly", function(authData){
*      // The authentication was successful and opened within a popup.
*      doStuffWith(authData);
* });
*/
Firebase.prototype.loginWithTwitter = function(redirect, token, sessionTime, callback){
    if(redirect){
        this.authWithOAuthRedirect("twitter", function(error){
            if(error){
                throw "Authentication Failed! " + error;
            }
        })
    }else{
        this.authWithOAuthPopup("twitter", function(error, authData){
            if(error){
                throw "Authentication Failed! " + error;
            }else{
                console.log("Authenticated successfully with payload:", authData);
                if(token){
                    localStorage.setItem(this.tokenName, authData.token);
                }
                if(typeof callback == "function"){
                    callback(authData);
                }
            }
        }, {
            remember: sessionTime
        });
    }
}

/**
* Logs out a user and removes authentication token.
* @function logout
*/
Firebase.prototype.logout = function(){
    this.unauth();
    localStorage.removeItem(this.tokenName);
}

/**
* Event handler checks any changes in user authentication. Can also be used as an alternative to callbacks from other login functions.
* @function authChangeListener
* @param {Function} onLogin - A function with parameter authData that will get called if the user becomes authenticated or is already logged in.
* @param {Function} onLogout - A function with parameter authData that will get called if the user becomes unauthenticated or is already logged out.
* @example
* fireAuthInstance.authChangeListener(function(authData){
*      //The user has logged in
*      doStuffWith(authData);
* }, function(authData){
*      //The user has logged out
*      doStuffWith(authData);
* })
*/
Firebase.prototype.authChangeListener = function(onLogin, onLogout){
    this.onAuth(function(authData){
        if(this.getAuth() == null){
            //not logged in
            onLogin(authData);
        }else{
            //logged in
            onLogout(authData);
        }
    });
}

/**
* Sets the token id or name.
* @function setTokenName
* @param {string} newTokenName - the new name of your token.
* @example
* setTokenName("myTokenForMyFirstWebApp");
*/
Firebase.prototype.setTokenName = function(newTokenName){
    this.tokenName = newTokenName;
}

//regex to check if the text is an email
function checkIfEmailInString(text) {
    var re = /(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;
    return re.test(text);
}
