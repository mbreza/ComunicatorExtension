import 'bootstrap';
import '../scss/options.scss';
import User from './modules/user.js'

var openpgp = require('openpgp');
var $ = require("jquery");

////////////kod do testow
$(function () {
    chrome.storage.local.get(['currentPrivKey', 'currentPubKey'], function (result) {
        var user = {};
        user.priv = result.currentPrivKey;
        user.publ = result.currentPubKey;

        const encryptDecryptFunction = async () => {
            var passphrase = "Aq1"
            const privKeyObj = (await openpgp.key.readArmored(user.priv)).keys[0]
            await privKeyObj.decrypt(passphrase)

            const options = {
                message: openpgp.message.fromText('test1'),
                publicKeys: (await openpgp.key.readArmored(user.publ)).keys,
                privateKeys: [privKeyObj]
            }
            var encrypted;
            openpgp.encrypt(options).then(ciphertext => {
                encrypted = ciphertext.data
                console.log(encrypted);
                //$("#wiadomosc").text(encrypted);
                return encrypted
            })
                .then(async encrypted => {
                    const options = {
                        message: await openpgp.message.readArmored(encrypted),
                        publicKeys: (await openpgp.key.readArmored(user.publ)).keys,
                        privateKeys: [privKeyObj]
                    }
                    openpgp.decrypt(options).then(plaintext => {
                        console.log(plaintext.data)
                        return plaintext.data
                    })
                })
        }
        encryptDecryptFunction();
    })
})
////////////////nizej normalny kod
function logInVisibility() {
    chrome.storage.local.get(['loggedIn'], function (result) {

        if (result.loggedIn == "Const" || result.loggedIn == "Temp") {
            $('#logoutDiv').removeClass('cantsee');
            $('#loginDiv').addClass('cantsee');
            $('#loginKey').removeClass('is-invalid');

        } else {
            $('#loginDiv').removeClass('cantsee');
            $('#logoutDiv').addClass('cantsee');
        }
    })
}
logInVisibility()

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.type == "check") {
        logInVisibility()
    }
});

$("#createKey").click(function () {
    chrome.storage.local.get(['UserList'], function (result) {
        console.log(result.UserList);

        if (validationCreate(result)) {

            $('#progressBar').removeClass('invisible');
            $('#progressBar').addClass('visible');
            $('#inputOwner').removeClass('is-valid');
            $('#inputEmail').removeClass('is-valid');
            $('#inputPassword').removeClass('is-valid');

            createKey();
            console.log('OK');
        } else {
            console.log('NIE OK');
        }
    })
});

$("#loginKey").click(function () {
    chrome.storage.local.get(['UserList'], function (result) {
        var userList = result.UserList
        var validation = false

        userList.forEach(function (user) {
            if (user.name == $('#loginOwner').val() && user.password == $('#loginPassword').val()) {
                if ($('#rememberCheck').is(":checked")) {
                    chrome.storage.local.set({ loggedIn: "Const", currentOwner: user.name, currentPrivKey: user.privkey, currentPubKey: user.publicKey });
                } else {
                    chrome.storage.local.set({ loggedIn: "Temp" });
                    chrome.runtime.sendMessage({ type: "Login", name: user.name, privkey: user.privkey, publicKey: user.publicKey });
                }
                validation = true;
            }
        });
        if (!validation) {
            $('#loginKey').addClass('is-invalid');
        }
        logInVisibility();
    })
});

$("#logoutKey").click(function () {
    chrome.storage.local.get(['loggedIn'], function (result) {
        if (result.loggedIn == "Const") {
            chrome.storage.local.remove(['currentOwner', 'currentPrivKey', 'currentPubKey']);
        } else if (result.loggedIn == "Temp") {
            chrome.runtime.sendMessage({ type: "Logout" });
        }
        chrome.storage.local.remove(['loggedIn']);
        logInVisibility();
    });
});

function createKey() {
    let user = new User($('#inputOwner').val(), $('#inputEmail').val(), $('#inputPassword').val(),
        null, null, null);

    var options = {
        userIds: [{ name: user.name, email: user.emailaddress }],
        numBits: 4096,
        passphrase: user.password
    };

    openpgp.generateKey(options).then(function (key) {
        var privkey = key.privateKeyArmored;
        var pubkey = key.publicKeyArmored;
        var revocationCertificate = key.revocationCertificate;

        chrome.storage.local.get(['UserList'], function (result) {
            user.privkey = privkey;
            user.publicKey = pubkey;
            user.revocationCertificate = revocationCertificate;

            var LocalUserList = result.UserList;
            LocalUserList.push(user);
            chrome.storage.local.set({ UserList: LocalUserList });
            $('#progressBar').removeClass('visible');
            $('#progressBar').addClass('invisible');
        })
    });
}