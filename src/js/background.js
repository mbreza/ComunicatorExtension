import '../img/128.png'
import '../img/icon-34.png'
import { User } from './user.js'

var openpgp = require('openpgp');

chrome.runtime.onMessage.addListener(function(message) {
    console.log('aaa');
    console.log(message.name);

    var options = {
      userIds: [{ name:message.name, email:message.emailaddress }],
      numBits: 4096,
      passphrase:message.password
    };

    openpgp.generateKey(options).then(function(key) {
      var privkey = key.privateKeyArmored;
      var pubkey = key.publicKeyArmored;
      var revocationCertificate = key.revocationCertificate;

      chrome.storage.local.get(['UserList'], function(result) {
          message.privkey = privkey;
          message.publicKey = pubkey;
          message.revocationCertificate = revocationCertificate;
          
          var LocalUserList = result.UserList;
          LocalUserList.push(message);
          chrome.storage.local.set({UserList: LocalUserList});
          console.log("nosz kurwa");
      })

  });

//    sendResponse('jebac')
});