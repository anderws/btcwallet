let myWallet = null;

const wallet = require("./createWallet");

function createWallet(){
    console.log("Service createWallet");
    myWallet = wallet.createWallet();
    return myWallet;
}


function recoverWallet(mnemonic){
    console.log("TODO Service recoverWallet");
    return {
        address: '',
        privateKey: '',
        seed: mnemonic
    };
}

module.exports = {
    createWallet,
    recoverWallet
}