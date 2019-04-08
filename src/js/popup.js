import "../css/popup.css";
import { User } from './user.js'

var $ = require("jquery");
var openpgp = require('openpgp');

$(function () {

    chrome.storage.local.get(['UserList'], function(result) {
        if(result.UserList === undefined){
            chrome.storage.local.set({UserList: []});
        }
        console.log(result.UserList);
    }) 
})

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

        chrome.storage.local.get(['UserList'], function(result) {
            let user = new User($('#name').val(), $('#emailaddress').val(), $('#password').val(),
                                privkey, pubkey, revocationCertificate);
            
            var LocalUserList = result.UserList;
            LocalUserList.push(user);
            chrome.storage.local.set({UserList: LocalUserList});
            console.log("nosz kurwa");
        })
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