class User {

  constructor(name, emailaddress, password, privkey, publicKey, revocationCertificate) {
    this.name = name;
    this.emailaddress = emailaddress;
    this.password= password;
    this.privkey = privkey;
    this.publicKey = publicKey;
    this.revocationCertificate = revocationCertificate;
  };
}

User.prototype.toString = function userToString() {
  return 'User: ' + this.name + ', ' + this.emailaddress + ', ' + this.password + ', ' + this.privkey +
          ', ' + this.publicKey +  ', ' + this.revocationCertificate;
};

export default User
