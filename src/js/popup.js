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

    let user = new User($('#name').val(), $('#emailaddress').val(), $('#password').val(),
                        null, null, null);

    chrome.runtime.sendMessage(user);
/*
    chrome.runtime.sendMessage(user, function(response) {
        console.log(response);
      });
*/
})