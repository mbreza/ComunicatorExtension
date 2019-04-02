import "../css/popup.css";

var $ = require("jquery");
var openpgp = require('openpgp');


$('#create').click(function(){
   
    var options = {
        userIds: [{ name:$('#name').val(), email:$('#emailaddress').val() }],
        numBits: 4096,
        passphrase: $('#password').val()
    };

    openpgp.generateKey(options).then(function(key) {
        var privkey = key.privateKeyArmored;
        var pubkey = key.publicKeyArmored;
        var revocationCertificate = key.revocationCertificate;
        chrome.storage.local.set({prywatny: privkey});
    });

})

/*
var options = {
    userIds: [{ name:'Jon Smith', email:'jon@example.com' }],
    numBits: 4096,
    passphrase: 'super long and hard to guess secret'
};

openpgp.generateKey(options).then(function(key) {
    var privkey = key.privateKeyArmored;
    var pubkey = key.publicKeyArmored;
    var revocationCertificate = key.revocationCertificate;
    chrome.storage.sync.set({prywatny: privkey});
});

chrome.storage.sync.get(['prywatny'], function(result) {
    console.log('Value currently is ' + result.prywatny);
})

$(function () {
    $('#test1').text("Test2");

})

$(function () {
    chrome.storage.sync.set({login: 'Mateusz'}, function() {
        console.log('Value is set to Mateusz');
      });
});

$('#test2').click(function(){
    chrome.storage.sync.get(['login'], function(result) {
        $('#test1').text(result.login);
        console.log('Value currently is ' + result.login);
    })
})
*/