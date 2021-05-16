const CryptoJS = require("crypto-js");

const key = "43777217A25432A462D4A614E645267556B58703272357538782F413F44";

const encryptWithAES = (text) => {
      return CryptoJS.AES.encrypt(text, key).toString();
};

const decryptWithAES = (ciphertext) => {
      const bytes = CryptoJS.AES.decrypt(ciphertext, key);
      const originalText = bytes.toString(CryptoJS.enc.Utf8);
      return originalText;
};

let encryptText = encryptWithAES("SAVE FOR ME A LOT OF TEXT"); 
console.log(encryptText)

let decryptText = decryptWithAES(encryptText);
console.log(decryptText)
