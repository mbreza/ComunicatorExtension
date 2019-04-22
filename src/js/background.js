import '../img/128.png'
import '../img/icon-34.png'
import { User } from './user.js'

var $ = require("jquery");
var openpgp = require('openpgp');

//sessionStorage.setItem("lastname", "Smith");
//console.log(sessionStorage.getItem("lastname"));

chrome.runtime.onInstalled.addListener(function () {
    chrome.storage.local.set({ UserList: [] });
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.type == "Login") {
        console.log(request.type)
    }
});