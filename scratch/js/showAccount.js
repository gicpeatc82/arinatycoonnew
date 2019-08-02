

if (typeof web3 !== 'undefined') {
 web3 = new Web3(web3.currentProvider);
 console.log('您已經使用Metamask錢包');
} else {
  alert("請安裝web3錢包如Metamask")
 web3 = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/v3/620fcd8166d344cda5ece4736817c451"));
}

var contract_address =  "0xcCdA5213d453388fB5fB43054BC261c8636b1e51";


var contract = new web3.eth.Contract(abi, contract_address);

function show(){
getAccounts();
}


function getAccounts()
{
  web3.eth.getAccounts(function(error, result) {
    userAccount = result[0];

    //document.form1.address.value = result[0];
    //document.form2.address.value = result[0];

    contract.methods.level_judgment(userAccount).call().then((_level)=>{
        //document.form1.PlayersLevel.value = _level;
        //$("#show").html(_level);
    });

  })

}

setInterval(function(){getAccounts()},5000);

web3.eth.getAccounts(function(error, result) {
  userAccount = result[0];

  //document.form1.address.value = result[0];
  //document.form2.address.value = result[0];

  contract.methods.level_judgment(userAccount).call().then((_level)=>{
      //document.form1.PlayersLevel.value = _level;
      //$("#show").html(_level);
      console.log(_level);
  });

})
