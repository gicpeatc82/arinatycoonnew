//
var history_amout = 5 //顯示歷史紀錄數目

var web = "http://127.0.0.1:8545"
//https://ropsten.infura.io/v3/4a4b1a18a1c74e8ca0ec6fd4126aa6d9
//http://localhost:8545

if (typeof web3 !== 'undefined') {
 web3 = new Web3(web3.currentProvider);
 console.log('metamask found');
} else {
  alert("請安裝web3錢包如metamask");
  $(".snip1104").removeAttr("onclick");
  $("figcaption h2").html("尚未安裝metamask");
  $(".snip1104").attr("onclick","howplay()");
  console.log('Using' + web);
  web3 = new Web3(new Web3.providers.HttpProvider(web));
}
function howplay(){
  location.href="howToPlay.html"
}


//test
var address = '0xbc82a950d16a2077a363f6fcc5f1764bd6ddeff0'

var infoContract = new web3.eth.Contract(abi, address);

var ArinaContract = new web3.eth.Contract(abi_erc20,'0x0bd0c2036fd2b00af041b3e20850c40923c56895');

/**** *producion
var address = '0xcCdA5213d453388fB5fB43054BC261c8636b1e51'

var infoContract = new web3.eth.Contract(abi, address);

var ArinaContract = new web3.eth.Contract(abi_erc20,'0xE6987CD613Dfda0995A95b3E6acBAbECecd41376');
***********/

var userAccount;

window.addEventListener('load', async () => {
  if (window.ethereum) {
      try {
          await ethereum.enable()
          console.log(window.ethereum)
      } catch (error) {
          console.error(error)
      }
  }
})


//const function(判斷輸贏及剪刀石頭布的函數,因區塊練回傳值為0,1,2)
function win(_result){
// 0 => 輸   1 => 平手   2 => 贏
var gameLose = jQuery.i18n.prop('gameLose');
var gameWin = jQuery.i18n.prop('gameWin');
if (_result == 0 || _result == 1){
        return gameLose;
    }else if (_result == 2){
        return gameWin;
    }else {
        return "error";
    }
}

// function mora(_orig){
//   // 0 => 布   1 => 剪刀   2 => 石頭
//       if (_orig == 0){
//         return "布";
//       }else if (_orig == 1){
//         return "剪刀";
//       }else if (_orig == 2){
//         return "石頭";
//       }else {
//         return "error";
//       }
// }

function Arina_judgment(Arina_totBalance, total_airdrop_Arina , airdrop_Arina){
  if (Arina_totBalance >= total_airdrop_Arina/2){
      return airdrop_Arina;
  }else if(total_airdrop_Arina/2 > Arina_totBalance && Arina_totBalance >= total_airdrop_Arina/4){
      return airdrop_Arina/2;
  }else if(total_airdrop_Arina/4 > Arina_totBalance && Arina_totBalance >= total_airdrop_Arina/8){
      return airdrop_Arina/4;
  }else if(total_airdrop_Arina/8 > Arina_totBalance && Arina_totBalance >= total_airdrop_Arina/16){
      return airdrop_Arina/8;
  }else if(total_airdrop_Arina/16 > Arina_totBalance && Arina_totBalance >= total_airdrop_Arina/32){
      return airdrop_Arina/16;
  }else if(total_airdrop_Arina/32 > Arina_totBalance && Arina_totBalance >= total_airdrop_Arina/64){
      return airdrop_Arina/32;
  }else if(total_airdrop_Arina/64 > Arina_totBalance && Arina_totBalance >= total_airdrop_Arina/128){
      return airdrop_Arina/64;
  }else if(total_airdrop_Arina/128 > Arina_totBalance && Arina_totBalance >= total_airdrop_Arina/256){
      return airdrop_Arina/128;
  }else if(total_airdrop_Arina/256 > Arina_totBalance && Arina_totBalance >= total_airdrop_Arina/512){
      return airdrop_Arina/256;
  }else if(total_airdrop_Arina/512 > Arina_totBalance && Arina_totBalance){
      return airdrop_Arina/512;
  }else return 0;
}

function Arina_amount_judgment(_level, _Arina) {
    if (_level == 1){
        return _Arina*5/10;
    }else if (_level == 2){
        return _Arina*6/10;
    }else if (_level == 3){
        return _Arina*7/10;
    }else if (_level == 4){
        return _Arina*8/10;
    }else if (_level == 5){
        return _Arina*9/10;
    }else return "error";
}

function eth_amount_judgment(_level){
  if (_level == 1){
      return 1 ;
  }else if (_level == 2){
      return 3 ;
  }else if (_level == 3){
      return 5 ;
  }else if (_level == 4){
      return 10 ;
  }else if (_level == 5){
      return 20 ;
  }else return "error";
}


function randLottery(){
  var rand = Math.floor(Math.random()*3)+1
  $("#loadingbg").show();
  $(".container-fluid").hide();
  
  if(rand == 1){
    web3.eth.getAccounts(function(error, result) {
      userAccount = result[0];
      infoContract.methods.play_paper().send({from:userAccount,gas:250000})
        .on('transactionHash', function(hash){
          $("#loadingbg").show();
          $(".container-fluid").hide();
          
          //_hash(hash);
        }).on('receipt', function(receipt){

          var event = receipt.events.Play_game;
          let record = event.returnValues.record;

          var event_Random = receipt.events.Random;
          let random_lottery = event_Random.returnValues.random_lottery;
          let random_player = event_Random.returnValues.random_player;

          let bgScratch;
          var bgScratchrand = Math.floor(Math.random()*5)+1;
          if(record == 0 || record == 1){
            bgScratch ="img/noWinning/noWinning0"+bgScratchrand+".png";
          }else if(record == 2){
            if(random_lottery == random_player){
              bgScratch ="img/scratchOffWholeWinning.png.png";
            }else{
              bgScratch ="img/winningArina/winningArina0"+bgScratchrand+".png";
            }            
          }
          $('#promo').wScratchPad('reset');
          //_receipt(receipt);
          $('#promo').wScratchPad({
            size: 60,       
            bg:  bgScratch,
            //realtime    : true, 
            fg: 'img/scratch_off.png',
            'cursor': 'url("http://jennamolby.com/scratch-and-win/images/coin1.png") 5 5, default',
          });
          
          $("#loadingbg").hide();
          //$(".container-fluid").show();
          $("#lottery00").click();
          
        }).on('error', function(error){
          $("#loadingbg").hide();
          $(".container-fluid").show("sold");
        });
    });
  }else if(rand = 2){
    web3.eth.getAccounts(function(error, result) {
      userAccount = result[0];
      infoContract.methods.play_scissors().send({from:userAccount,gas:250000})
      .on('transactionHash', function(hash){
        $("#loadingbg").show();
        $(".container-fluid").hide();
        //_hash(hash);
      }).on('receipt', function(receipt){
        //_receipt(receipt);
        var event = receipt.events.Play_game;
        let record = event.returnValues.record;
        var event_Random = receipt.events.Random;
        let random_lottery = event_Random.returnValues.random_lottery;
        let random_player = event_Random.returnValues.random_player;
        let bgScratch;
        var bgScratchrand = Math.floor(Math.random()*5)+1;
        if(record == 0 || record == 1){
          bgScratch ="img/noWinning/noWinning0"+bgScratchrand+".png";
        }else if(record == 2){
          if(random_lottery == random_player){
            bgScratch ="img/scratchOffWholeWinning.png.png";
          }else{
            bgScratch ="img/winningArina/winningArina0"+bgScratchrand+".png";
          }
        }
        $('#promo').wScratchPad('reset');
        $('#promo').wScratchPad({
          size: 60,       
          bg:bgScratch,
          //realtime: true, 
          fg: 'img/scratch_off.png',
          'cursor': 'url("http://jennamolby.com/scratch-and-win/images/coin1.png") 5 5, default',
        });
        $("#loadingbg").hide();
        //$(".container-fluid").show();
        $("#lottery00").click();
        
      }).on('error', function(error){
        //_error(error);
        $("#loadingbg").hide();
        $(".container-fluid").show("sold");
      });
    });
  }else {
    web3.eth.getAccounts(function(error, result) {
      userAccount = result[0];
      infoContract.methods.play_stone().send({from:userAccount,gas:250000})
      .on('transactionHash', function(hash){
        $("#loadingbg").show();
        $(".container-fluid").hide();
        //_hash(hash);
      }).on('receipt', function(receipt){
        var event = receipt.events.Play_game;
          let record = event.returnValues.record;
          var event_Random = receipt.events.Random;
          let random_lottery = event_Random.returnValues.random_lottery;
          let random_player = event_Random.returnValues.random_player;
          let bgScratch;
          var bgScratchrand = Math.floor(Math.random()*5)+1;
          if(record == 0 || record == 1){
            bgScratch ="img/noWinning/noWinning0"+bgScratchrand+".png";
          }else if(record == 2){
            if(random_lottery == random_player){
              bgScratch ="img/scratchOffWholeWinning.png.png";
            }else{
              bgScratch ="img/winningArina/winningArina0"+bgScratchrand+".png";
            }
          }
          $('#promo').wScratchPad('reset');
        //_receipt(receipt);
        $('#promo').wScratchPad({
          size: 60,       
          bg: bgScratch,
          //realtime    : true, 
          fg: 'img/scratch_off.png',
          'cursor': 'url("http://jennamolby.com/scratch-and-win/images/coin1.png") 5 5, default',
        });
        $("#loadingbg").hide();
        //$(".container-fluid").show();
        $("#lottery00").click();

      }).on('error', function(error){
        //_error(error);
        $("#loadingbg").hide();
        $(".container-fluid").show("sold");
      });
    });
  }
}

//show函數包裝給setInterval做每秒刷新
function show(){
//讀取地址(web3.js beta版在讀取地址後地址可能會丟失,所以每次動作都先讀取地址)
web3.eth.getAccounts(function(error, result) {
    userAccount = result[0];
    if(userAccount != old_address){
      console.log("New address");
    }
    if (userAccount == undefined){
      $("#address").html("Address not fonund");
    }
    else{
      $("#playeraddress").html(userAccount);
      console.log(userAccount);
    }
//顯示猜拳紀錄
infoContract.getPastEvents("Play_game",{filter:{from:userAccount},fromBlock:0,toBlock:'latest'})
.then(function(events) {
  //console.log(events);
  let length = events.length;

    if (userAccount == undefined){

      $("#record0").html("Address not fonund");
      $("#record").html("Address not fonund");

    }else if (length == 0){

      $("#record0").html("No Record");
      $("#record").html("No Record");

    }else{

      var event_last = events[length-1]
      var record = event_last.returnValues.record;
      //var play = event_last.returnValues.player;
      //var comp = event_last.returnValues.comp;
      $("#record0").html(win(record)+"<br>");

      if (length < 2){
        $("#record").html("No Record");
      }else{
        var event_last = events[length-2]
        var record = event_last.returnValues.record;
        var play = event_last.returnValues.player;
        var  comp = event_last.returnValues.comp;
        $("#record").html(win(record)+"<br>");

        for(var i=3; i<history_amout+2; i++){

          if(length-i<0){
            break
          }
          var event_last = events[length-i]
          var record = event_last.returnValues.record;
          var play = event_last.returnValues.player;
          var comp = event_last.returnValues.comp;
          $("#record").append(win(record)+"<br>");
         }
       }
     }
   });

//顯示開獎紀錄
infoContract.getPastEvents("Random",{filter:{from:userAccount},fromBlock:0,toBlock:'latest'})
.then(function(events) {
    let length = events.length;

    if (userAccount == undefined){
      $("#lottery0").html("Address not fonund");
      $("#lottery").html("Address not fonund");
    }

    else if (length == 0){
      $("#lottery0").html("No Record");
      $("#lottery").html("No Record");

    }
    else{
      var event_last = events[length-1]
      var random_player = event_last.returnValues.random_player;
      var random_lottery = event_last.returnValues.random_lottery;
      $("#lottery0").html("玩家開獎號碼為"+random_player+", 電腦開獎號碼為"+random_lottery+"<br>");
      if (length < 2){
      $("#lottery").html("未有開獎紀錄");
      }
      else{
        var event_last = events[length-2]
        var random_player = event_last.returnValues.random_player;
        var random_lottery = event_last.returnValues.random_lottery;
        $("#lottery").html("玩家開獎號碼為"+random_player+", 電腦開獎號碼為"+random_lottery+"<br>");

        for(var i=3; i<history_amout+2; i++){
          if(length-i<0){
            break
          }
          var event_last = events[length-i]
          var random_player = event_last.returnValues.random_player;
          var random_lottery = event_last.returnValues.random_lottery;
          $("#lottery").append("玩家開獎號碼為"+random_player+", 電腦開獎號碼為"+random_lottery+"<br>");
        }
      }
    }
  });
/*
  
    infoContract.getPastEvents("Play_game",{filter:{from:userAccount},fromBlock:0,toBlock:'latest'}).then(function(events) {
      let length = events.length;
      var event_last = events[length-1];
      

      if (length == 0){
        $("#readyTime").html('0秒');
        $(".snip1104").attr("onclick","randLottery()");
        $(".red figcaption h2").html("選我<span>1</span>");
        $(".blue figcaption h2").html("選我<span>2</span>");
        $(".green figcaption h2").html("選我<span>3</span>");
      }else{
        var blockNumber = event_last.blockNumber;
        var record = event_last.returnValues.record;
        web3.eth.getBlock(blockNumber, (error, block) => {
          var timestamp = block.timestamp;
            if(timestamp+600 > Math.floor(Date.now() / 1000)){
              $(".snip1104"). removeAttr("onclick");
              $("#readyTime").html(((timestamp+600)-Math.floor(Date.now() / 1000))+'秒');
              $("figcaption h2").text("冷卻中..");
            }else{
              if (userAccount == undefined){
                $("#readyTime").html("未載入地址");
              }else{
                $("#readyTime").html('0秒');
              }              
              $(".snip1104").attr("onclick","randLottery()");
              $(".red figcaption h2").html("選我<span>1</span>");
              $(".blue figcaption h2").html("選我<span>2</span>");
              $(".green figcaption h2").html("選我<span>3</span>");
            }      
        });
      }


          
    });       */   
  });
  var old_address = userAccount; //判斷更改地址用
}


/*
function show_token(){
  web3.eth.getAccounts(function(error, result) {
    if (userAccount == undefined){
      $("#amount_token").html("請登入Ethereum錢包");
    }
    else{

      Promise.all(
        [
          ArinaContract.methods.balanceOf(address).call(),
          infoContract.methods.total_airdrop_Arina().call(),
          infoContract.methods.airdrop_Arina().call(),
          infoContract.methods.level_judgment(userAccount).call(),
          infoContract.methods.airdrop_GIC().call(),
        ])
        .then(([Arina_totBalance, total_airdrop_Arina, airdrop_Arina, _level, airdrop_GIC])=>{
        //console.log(Arina_totBalance, total_airdrop_Arina, airdrop_Arina, _level, airdrop_GIC);

        var  Arina_totBalance = Arina_totBalance/(10**8)
        var  total_airdrop_Arina =  total_airdrop_Arina/(10**8)
        var  airdrop_Arina =  airdrop_Arina/(10**8)
        var  GIC =  airdrop_GIC/(10**18)

        //console.log(Arina_totBalance, total_airdrop_Arina, airdrop_Arina, _level, airdrop_GIC);
        var now_airdrop = Arina_judgment(Arina_totBalance, total_airdrop_Arina, airdrop_Arina);
        //console.log(now_airdrop);
        var Arina = Arina_amount_judgment(_level, now_airdrop);

        var ETH = eth_amount_judgment(_level);


          $("#amount_token").html("猜拳獲勝 可獲得: '"+GIC+"顆GIC' 和 '"+Arina+"顆Arina'");
          $("#amount_ETH").html("中獎時 可獲得: '"+ETH+"顆ETH'");

      });
    }
  })
};*/

show();

/*show_token();*/
setInterval(function(){show()},1000); //指定1秒重新整理一次
//setInterval(function(){show_token()},1000); //指定20秒重新整理一次
