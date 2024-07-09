

const WalletService = require("./src/WalletService");

const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

let myAddres = null;

function menu(){
    setTimeout(() => {
        console.clear();

        if(myAddres)
            console.log(`You are logged as ${myAddres}`);
        else
            console.log(`You aren't logged!`)

        console.log("1 - Create Wallet");
        console.log("2 - Recover Wallet");        
        
        rl.question("Choose your option: ", (answer) => {
            switch(answer){
                case "1": createWallet(); break;
                case "2": recoverWallet(); break;                
                default: {
                    console.log("Wrong option!");
                    menu();
                }
            }
        })
    }, 1000)
}

function createWallet(){
    const myWallet = WalletService.createWallet();
    myAddres = myWallet.address;
    console.log(`Your new wallet:`);
    console.log(myAddres);
    console.log("PK: "+ myWallet.privateKey);
    console.log("seed: "+ myWallet.seed);    
    preMenu();
}

function recoverWallet(){
    console.clear();
    rl.question(`What is your mnemonic?`, (mnemonic) => {
        const myWallet = WalletService.recoverWallet(mnemonic);
        myAddres = myWallet.address;

        console.log(`Your recoverd wallet: `);
        //console.log(myAddres);
        console.log(`Private Key: `+ myWallet.privateKey)
        console.log(`Public Key: `+ myWallet.publicKey)
        console.log("seed: "+ mnemonic);    
        preMenu();
    })
}

function preMenu(){
    rl.question("Press any key to continue...", () => {
        menu();
    })
}



menu();