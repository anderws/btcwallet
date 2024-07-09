//Dependencies
const bip32 = require('bip32')
const bip39 = require('bip39')
const bitcoin = require('bitcoinjs-lib')

//Network testnet
const network = bitcoin.networks.testnet


function createWallet(){
    //Wallets derivation HD
    const path = `m/49'/1'/0'/0`

    //Mnemonic seeds
    let mnemonic = bip39.generateMnemonic()
    const seed = bip39.mnemonicToSeedSync(mnemonic)

    //Wallet root HD
    let root = bip32.fromSeed(seed, network)

    //count create - pvt-pubs keys
    let account = root.derivePath(path) 
    let node = account.derive(0).derive(0)

    let btcAddress = bitcoin.payments.p2pkh({
        pubkey: node.publicKey,
        network: network,
    }).address

    return {
        address: btcAddress,
        privateKey: node.toWIF(),
        seed: mnemonic
    }
}

module.exports = {
    createWallet
}