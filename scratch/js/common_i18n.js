function i18n(cityCode){

    jQuery.i18n.properties({
        name:'Messages', 
        path:'i18n',   // 資原始檔所在路徑
        mode:'both',  // key值載入模式
        language:cityCode, // 指定語言編碼
        callback: function() {
            try {
                // $('[data-i18n-placeholder]').each(function () {
                //     $(this).attr('placeholder', $.i18n.prop($(this).data('i18n-placeholder')));
                // });

                $('[data-i18n-title]').each(function () {
                    $(this).attr('title', $.i18n.prop($(this).data('i18n-title')));
                });

                //圖片更換
                $('[data-i18n-img]').each(function () {
                    $(this).attr('src', 'img/'+cityCode+'/'+$(this).data('i18n-img'));
                });
                $('[data-i18n-text]').each(function () {                    
                    var html = $(this).html();
                    var reg = /<(.*)>/;
                    if (reg.test(html)) {
                        var htmlValue = reg.exec(html)[0];
                        $(this).html(htmlValue + $.i18n.prop($(this).data('i18n-text')));
                    }
                    else {
                        $(this).text($.i18n.prop($(this).data('i18n-text')));
                    }
                });
                
                // $('[data-i18n-value]').each(function () {
                //     $(this).val($.i18n.prop($(this).data('i18n-value')));
                // });
                // 帶變數字元的使用方式 testword = There are {0} sun to the east
                //$('#testword').html(jQuery.i18n.prop('testword', '10'));
            }catch(ex){
                console.log(ex + "i18n error");
            }
        }
    });
}

let getNavLanguage = function () {
    if (navigator.appName == "Netscape") {
      let navLanguage = navigator.language;
      return navLanguage.substr(0, 5).replace("-","_");
    }
    return "";
  }

  //多國語言設置
  var currentLang="";
  try {
      //localStorage.removeItem("currentLang");
      
      //1.先讀localStorage
      currentLang=localStorage.getItem("currentLang");
      $("#language").val(currentLang);
      console.log("localStorage:"+currentLang);
      //2.沒有資料再取瀏覽器預設
      if(currentLang==null || currentLang==""){
          currentLang=getNavLanguage();
          console.log("NavLanguage:"+currentLang);
          if(currentLang!=""){
              localStorage.setItem("currentLang",currentLang);
          }
      }
  }catch(ex){
      console.log(ex);
  }
  console.log("currentLang:"+currentLang);
  i18n(currentLang);      
  
  function  changelang(){
    var lang =  $("#language").val();
    localStorage.setItem("currentLang",lang);
    window.location.reload()
    //language(lang);
 }