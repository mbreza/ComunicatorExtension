module.exports = {
    validationCreate : function (result) {
    var email = true;
    var owner = true;
    var password = true;

    if (ownerExist(result)) {
        $('#inputOwner').removeClass('is-valid');
        $('#inputOwner').addClass('is-invalid');
        $('#invalidOwner').text("This owner exists");
        owner = false;
    } else if ($('#inputOwner').val() == "") {
        $('#inputOwner').removeClass('is-valid');
        $('#inputOwner').addClass('is-invalid');
        $('#invalidOwner').text("Enter owner");
        owner = false;
    } else {
        $('#inputOwner').removeClass('is-invalid');
        $('#inputOwner').addClass('is-valid');
    }

    if (emailExist(result)) {
        $('#inputEmail').removeClass('is-valid');
        $('#inputEmail').addClass('is-invalid');
        $('#invalidEmail').text("This email exists");
        email = false;
    } else if (!validateEmail($('#inputEmail').val())) {
        $('#inputEmail').removeClass('is-valid');
        $('#inputEmail').addClass('is-invalid');
        $('#invalidEmail').text("Enter proper email");
        email = false;
    } else {
        $('#inputEmail').removeClass('is-invalid');
        $('#inputEmail').addClass('is-valid');
    }

    if (!hasNumber($('#inputPassword').val()) || !hasLowerAndUpper($('#inputPassword').val())) {
        $('#inputPassword').removeClass('is-valid');
        $('#inputPassword').addClass('is-invalid');
        password = false
    } else {
        $('#inputPassword').removeClass('is-invalid');
        $('#inputPassword').addClass('is-valid');
    }

    if (email && password && owner) {
        return true;
    } else {
        return false;
    }
},

ownerExist : function (result) {
    var exists = false;
    result.UserList.forEach(function (element) {
        if (element.name == $('#inputOwner').val()) {
            exists = true;
        }
    });
    return exists;
},

emailExist : function (result) {
    var exists = false;
    result.UserList.forEach(function (element) {
        if (element.emailaddress == $('#inputEmail').val()) {
            exists = true;
        }
    });
    return exists;
},

validateEmail : function (email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
},

hasNumber : function (str) {
    return /\d/.test(str);
},

hasLowerAndUpper : function (str) {
    return str.match(/[a-z]/) && str.match(/[A-Z]/);
}
}