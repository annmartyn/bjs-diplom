"use strict";
let callback = method => response => (response.success) && method(response.data);
let userForm = new UserForm();


userForm.loginFormCallback = data => ApiConnector.login(data, response => {
    if (response.success === true) {
        window.location.reload();
    } else {
        alert(response.error);
    };
});

userForm.registerFormCallback = data => ApiConnector.register(data, response => {
    if (response.success === true) {
        ApiConnector(data, callback(window.location.reload()))
    } else {
        alert('Something went wrong');
    };
});