var wget = require('node-wget')
var fs = require('fs')

var ogarioleURI = "http://ogario.ovh/le/ogario.le.js";
var downloadDir = __dirname + "/ogario.le.js";
var translatedFile = __dirname + "/ogario.keymapped.js";
var key_map_configFile = __dirname + "/ogario_key_map.json";
var key_map = {};
const default_key_map = {
  Macro_feed: "e", //69
  Split_n16: "t", //84
  Double_split: "g", //71
  Toggle_custom_vanilla_skins: "a", //65
  Show_hide_food: "f", //70
  Reset_zoom: "z", //90
  Chat_history_Clear_chat: "c", //67
  Show_hide_names: "n", //78
  Show_hide_skins: "s", //83
  Toggle_own_biggest_smallest_cell: "d", //68
  Show_hide_chat: "h", //72
  Toggle_death_location: "x", //88
  Show_hide_background_sectors: "b", //66
  Show_hide_mass: "m", //77
};

console.log("Checking whether ogario is updated...");
fs.readFile(key_map_configFile, 'utf8', function(err, data){
  if(err){
    console.log("ERROR cannot read ogario_key_map.json");
    return;
  } 
  key_map = JSON.parse(data);
  download_ogario(downloadDir, function(){
    keyRemapping(finished_remapping);
  });
});

function finished_remapping(){
  fs.unlink(downloadDir, function(err){
    console.log("Finished remapping to ogario.keymapped.js");
  });
}

function sortObject(obj) {
    var arr = [];
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            arr.push({
                'key': prop,
                'value': obj[prop]
            });
        }
    }
    arr.sort(function(a, b) { return a.value - b.value; });
    return arr;
}

function download_ogario(download_dir, callback){
  console.log("Downloading ogario...");
  wget({url: ogarioleURI, dest: download_dir}, function(){
    fs.readFile(download_dir, function(err, buf) {
      if(err) { console.log("ERROR: cannot read download_dir");}
      callback();
    });
  });
}

function keyRemapping(callback){
  console.log("Remapping hotkey...");

  function check_no_duplicate_key(check_key_map){
    var counter = {};
    for(var key in check_key_map){
      counter[check_key_map[key]] = (counter[check_key_map[key]] || 0) + 1;
    }
    for(var key in counter){
      if(counter[key] > 1){
        console.log("ERROR: The config file contains duplicate value");
        return false;
      }
    }
    return true;
  }

  fs.readFile(downloadDir, 'utf8', function (err,data) {
    if (err) translateFinished = false;

    var wanted_key_map = key_map;
    if(check_no_duplicate_key(wanted_key_map)){

      //add global variable for icon
      var goldenIcon_dwIconLinks = "var goldenIcon_dwIconLinks = ['http://forum3.hkgolden.com/faces/draw/angel.gif', 'http://forum3.hkgolden.com/faces/draw/dead.gif', 'http://forum3.hkgolden.com/faces/draw/smile.gif', 'http://forum3.hkgolden.com/faces/draw/clown.gif', 'http://forum3.hkgolden.com/faces/draw/frown.gif', 'http://forum3.hkgolden.com/faces/draw/cry.gif', 'http://forum3.hkgolden.com/faces/draw/wink.gif', 'http://forum3.hkgolden.com/faces/draw/angry.gif', 'http://forum3.hkgolden.com/faces/draw/devil.gif', 'http://forum3.hkgolden.com/faces/draw/biggrin.gif', 'http://forum3.hkgolden.com/faces/draw/oh.gif', 'http://forum3.hkgolden.com/faces/draw/tongue.gif', 'http://forum3.hkgolden.com/faces/draw/kiss.gif', 'http://forum3.hkgolden.com/faces/draw/wonder.gif', 'http://forum3.hkgolden.com/faces/draw/agree.gif', 'http://forum3.hkgolden.com/faces/draw/donno.gif', 'http://forum3.hkgolden.com/faces/draw/hehe.gif', 'http://forum3.hkgolden.com/faces/draw/love.gif', 'http://forum3.hkgolden.com/faces/draw/surprise.gif','http://forum3.hkgolden.com/faces/draw/chicken.gif', 'http://forum3.hkgolden.com/faces/draw/ass.gif', 'http://forum3.hkgolden.com/faces/draw/sosad.gif', 'http://forum3.hkgolden.com/faces/draw/good.gif', 'http://forum3.hkgolden.com/faces/draw/hoho.gif', 'http://forum3.hkgolden.com/faces/draw/kill.gif', 'http://forum3.hkgolden.com/faces/draw/bye.gif', 'http://forum3.hkgolden.com/faces/draw/z.gif', 'http://forum3.hkgolden.com/faces/draw/@.gif', 'http://forum3.hkgolden.com/faces/draw/adore.gif', 'http://forum3.hkgolden.com/faces/draw/wonder2.gif', 'http://forum3.hkgolden.com/faces/draw/banghead.gif', 'http://forum3.hkgolden.com/faces/draw/bouncer.gif', 'http://forum3.hkgolden.com/faces/draw/bouncy.gif','http://forum3.hkgolden.com/faces/draw/censored.gif', 'http://forum3.hkgolden.com/faces/draw/flowerface.gif', 'http://forum3.hkgolden.com/faces/draw/shocking.gif', 'http://forum3.hkgolden.com/faces/draw/photo.gif', 'http://forum3.hkgolden.com/faces/draw/fire.gif', 'http://forum3.hkgolden.com/faces/draw/yipes.gif', 'http://forum3.hkgolden.com/faces/draw/369.gif', 'http://forum3.hkgolden.com/faces/draw/bomb.gif', 'http://forum3.hkgolden.com/faces/draw/slick.gif', 'http://forum3.hkgolden.com/faces/draw/fuck.gif', 'http://forum3.hkgolden.com/faces/draw/no.gif', 'http://forum3.hkgolden.com/faces/draw/kill2.gif', 'http://forum3.hkgolden.com/faces/draw/offtopic.gif'];";
      var goldenIcon_xIconStrs = "var goldenIcon_xIconStrs = ['[O:-)x]','[xx(x]','[:)x]','[:o)x]','[:o)jx]','[:-(x]','[:~(x]','[;-)x]','[:-[x]','[:-]x]','[:Dx]','[:Ox]','[:Px]','[^3^x]','[?_?x]','#yupx#','#ngx#','#hehex#','#lovex#','#ohx#','#assx#','[sosadx]','#goodx#','#hohox#','#killx#','#byex#','[Z_Zx]','[@_@x]','#adorex#','#adore2x#','[???x]','[bangheadx]','[bouncerx]','[offtopicx]','[censoredx]','[flowerfacex]','[shockingx]','[photox]','[yipesx]','[yipes2x]','[yipes3x]','[yipes4x]','[369x]','[bombx]','[slickx]','[fuckx]','#nox#','#kill2x#','#kill3x#','#cnx#','#cn2x#','[bouncyx]','[bouncy2x]','#firex#'];"
      var goldenIcon_xIconLinks = "var goldenIcon_xIconLinks = ['http://forum5.hkgolden.com/faces/xmas/angel.gif','http://forum5.hkgolden.com/faces/xmas/dead.gif','http://forum5.hkgolden.com/faces/xmas/smile.gif','http://forum5.hkgolden.com/faces/xmas/clown.gif','http://forum5.hkgolden.com/faces/xmas/clown_jesus.gif','http://forum5.hkgolden.com/faces/xmas/frown.gif','http://forum5.hkgolden.com/faces/xmas/cry.gif','http://forum5.hkgolden.com/faces/xmas/wink.gif','http://forum5.hkgolden.com/faces/xmas/angry.gif','http://forum5.hkgolden.com/faces/xmas/devil.gif','http://forum5.hkgolden.com/faces/xmas/biggrin.gif','http://forum5.hkgolden.com/faces/xmas/oh.gif','http://forum5.hkgolden.com/faces/xmas/tongue.gif','http://forum5.hkgolden.com/faces/xmas/kiss.gif','http://forum5.hkgolden.com/faces/xmas/wonder.gif','http://forum5.hkgolden.com/faces/xmas/agree.gif','http://forum5.hkgolden.com/faces/xmas/donno.gif','http://forum5.hkgolden.com/faces/xmas/hehe.gif','http://forum5.hkgolden.com/faces/xmas/love.gif','http://forum5.hkgolden.com/faces/xmas/surprise.gif','http://forum5.hkgolden.com/faces/xmas/ass.gif','http://forum5.hkgolden.com/faces/xmas/sosad.gif','http://forum5.hkgolden.com/faces/xmas/good.gif','http://forum5.hkgolden.com/faces/xmas/hoho.gif','http://forum5.hkgolden.com/faces/xmas/kill.gif','http://forum5.hkgolden.com/faces/xmas/bye.gif','http://forum5.hkgolden.com/faces/xmas/z.gif','http://forum5.hkgolden.com/faces/xmas/@.gif','http://forum5.hkgolden.com/faces/xmas/adore.gif','http://forum5.hkgolden.com/faces/xmas/adore2.gif','http://forum5.hkgolden.com/faces/xmas/wonder2.gif','http://forum5.hkgolden.com/faces/xmas/banghead.gif','http://forum5.hkgolden.com/faces/xmas/bouncer.gif','http://forum5.hkgolden.com/faces/xmas/offtopic.gif','http://forum5.hkgolden.com/faces/xmas/censored.gif','http://forum5.hkgolden.com/faces/xmas/flowerface.gif','http://forum5.hkgolden.com/faces/xmas/shocking.gif','http://forum5.hkgolden.com/faces/xmas/photo.gif','http://forum5.hkgolden.com/faces/xmas/yipes.gif','http://forum5.hkgolden.com/faces/xmas/yipes2.gif','http://forum5.hkgolden.com/faces/xmas/yipes3.gif','http://forum5.hkgolden.com/faces/xmas/yipes4.gif','http://forum5.hkgolden.com/faces/xmas/369.gif','http://forum5.hkgolden.com/faces/xmas/bomb.gif','http://forum5.hkgolden.com/faces/xmas/slick.gif','http://forum5.hkgolden.com/faces/xmas/diu.gif','http://forum5.hkgolden.com/faces/xmas/no.gif','http://forum5.hkgolden.com/faces/xmas/kill2.gif','http://forum5.hkgolden.com/faces/xmas/kill3.gif','http://forum5.hkgolden.com/faces/xmas/chicken.gif','http://forum5.hkgolden.com/faces/xmas/chicken2.gif','http://forum5.hkgolden.com/faces/xmas/bouncy.gif','http://forum5.hkgolden.com/faces/xmas/bouncy2.gif','http://forum5.hkgolden.com/faces/xmas/fire.gif'];"
      var goldenIcon_iconStrs = "var goldenIcon_iconStrs = ['O:-)', 'xx(', ':)', ':o)', ':-(', ':~(', ';-)', ':-[', ':-]', ':D', ':O', ':P', '^3^', '?_?', '#yup#', '#ng#', '#hehe#', '#love#', '#oh#','#cn#', '#ass#', '[sosad]', '#good#', '#hoho#', '#kill#', '#bye#', 'Z_Z', '@_@', '#adore#', '???', '[banghead]', '[bouncer]', '[bouncy]','[censored]', '[flowerface]', '[shocking]', '[photo]', '#fire#', '[yipes]', '[369]', '[bomb]', '[slick]', 'fuck', '#no#', '#kill2#', '[offtopic]'];"
      var goldenIcon_iconLinks = "var goldenIcon_iconLinks = ['http://forum1.hkgolden.com/faces/angel.gif', 'http://forum1.hkgolden.com/faces/dead.gif', 'http://forum1.hkgolden.com/faces/smile.gif', 'http://forum1.hkgolden.com/faces/clown.gif', 'http://forum1.hkgolden.com/faces/frown.gif', 'http://forum1.hkgolden.com/faces/cry.gif', 'http://forum1.hkgolden.com/faces/wink.gif', 'http://forum1.hkgolden.com/faces/angry.gif', 'http://forum1.hkgolden.com/faces/devil.gif', 'http://forum1.hkgolden.com/faces/biggrin.gif', 'http://forum1.hkgolden.com/faces/oh.gif', 'http://forum1.hkgolden.com/faces/tongue.gif', 'http://forum1.hkgolden.com/faces/kiss.gif', 'http://forum1.hkgolden.com/faces/wonder.gif', 'http://forum1.hkgolden.com/faces/agree.gif', 'http://forum1.hkgolden.com/faces/donno.gif', 'http://forum1.hkgolden.com/faces/hehe.gif', 'http://forum1.hkgolden.com/faces/love.gif', 'http://forum1.hkgolden.com/faces/surprise.gif','http://forum1.hkgolden.com/faces/chicken.gif', 'http://forum1.hkgolden.com/faces/ass.gif', 'http://forum1.hkgolden.com/faces/sosad.gif', 'http://forum1.hkgolden.com/faces/good.gif', 'http://forum1.hkgolden.com/faces/hoho.gif', 'http://forum1.hkgolden.com/faces/kill.gif', 'http://forum1.hkgolden.com/faces/bye.gif', 'http://forum1.hkgolden.com/faces/z.gif', 'http://forum1.hkgolden.com/faces/@.gif', 'http://forum1.hkgolden.com/faces/adore.gif', 'http://forum1.hkgolden.com/faces/wonder2.gif', 'http://forum1.hkgolden.com/faces/banghead.gif', 'http://forum1.hkgolden.com/faces/bouncer.gif', 'http://forum1.hkgolden.com/faces/bouncy.gif','http://forum1.hkgolden.com/faces/censored.gif', 'http://forum1.hkgolden.com/faces/flowerface.gif', 'http://forum1.hkgolden.com/faces/shocking.gif', 'http://forum1.hkgolden.com/faces/photo.gif', 'http://forum1.hkgolden.com/faces/fire.gif', 'http://forum1.hkgolden.com/faces/yipes.gif', 'http://forum1.hkgolden.com/faces/369.gif', 'http://forum1.hkgolden.com/faces/bomb.gif', 'http://forum1.hkgolden.com/faces/slick.gif', 'http://forum1.hkgolden.com/faces/fuck.gif', 'http://forum1.hkgolden.com/faces/no.gif', 'http://forum1.hkgolden.com/faces/kill2.gif', 'http://forum1.hkgolden.com/faces/offtopic.gif'];";

      data = goldenIcon_dwIconLinks + goldenIcon_xIconStrs + goldenIcon_xIconLinks + goldenIcon_iconStrs + goldenIcon_iconLinks + data;

      var tmp = {};
      for(var key in wanted_key_map){
        var charcode = ((wanted_key_map[key]).toLowerCase()).charCodeAt(0) - 32;
        tmp[key] = charcode;
      }
      var sorted_key_map = sortObject(tmp);
      
      var switchBlockReg = /switch\(_[\d|\w]*\[_[\d|\w]*\]\s?=\s?true,_[\d|\w]*\)\{.*case 192:window\[_[\d|\w]*\[\d+\]\]\(\);break\}/;
      var switchBlock = switchBlockReg.exec(data)[0];

      //Removed shift for Split_n16
       switchBlock = switchBlock.replace(/case 16.*?break;/, '');
      //Removed q for Double_split
       switchBlock = switchBlock.replace(/case 81.*?break;/, '');
      
      var replaced_str = "";
      sorted_key_map.forEach(function(obj){
        var originCode = ((default_key_map[obj.key]).toLowerCase()).charCodeAt(0) - 32;
        var result = switchBlock.match("case "+originCode+"(.*?break;)");
        replaced_str = replaced_str + 'case ' + (((wanted_key_map[obj.key]).toLowerCase()).charCodeAt(0) - 32) + result[1];
      });
      
      //removed from switch
      sorted_key_map.forEach(function(obj){
        var originCode = ((default_key_map[obj.key]).toLowerCase()).charCodeAt(0) - 32;
        switchBlock = switchBlock.replace(new RegExp("case "+originCode+"(.*?break;)"), '');
      });

      var match = /(switch\(.*?\)\{)/.exec(switchBlock);
      switchBlock = switchBlock.replace(/(switch\(.*?\)\{)/, match[1] + replaced_str);

      //replace the switch with modified switch
      data = data.replace(switchBlockReg, switchBlock);

      //replace release of Macro_feed
      data = data.replace(/case 69/, "case "+(((wanted_key_map["Macro_feed"]).toLowerCase()).charCodeAt(0) - 32));

      //remove send command
      var sendCommand_match = /(sendCommand:function.*?)\{.*?\},/.exec(data);
      data = data.replace(/(sendCommand:function.*?)\{.*?\},/, sendCommand_match[1] + "{},");

      var goldenIcon = "goldenIcon:function(spanStr) {\
                          var nspanStr = spanStr;\
                          for(var i = 0; i < goldenIcon_iconStrs.length; i++){\
                            var imgTag = '<img src=\"'+ goldenIcon_dwIconLinks[i] + '\">';\
                            nspanStr = this.goldenIcon_replaceAll(nspanStr, (goldenIcon_iconStrs[i] + \"dw\"), imgTag);\
                          }\
                          for(var i = 0; i < goldenIcon_xIconStrs.length; i++){\
                            var imgTag = '<img src=\"'+ goldenIcon_xIconLinks[i] + '\">';\
                            nspanStr = this.goldenIcon_replaceAll(nspanStr, goldenIcon_xIconStrs[i], imgTag);\
                          }\
                          for (var i = 0; i < goldenIcon_iconStrs.length; i++){\
                            var imgTag = '<img src=\"'+ goldenIcon_iconLinks[i] + '\">';\
                            nspanStr = this.goldenIcon_replaceAll(nspanStr, goldenIcon_iconStrs[i], imgTag);\
                          }\
                          return nspanStr;\
                        },";
      var goldenIcon_replaceAll = "goldenIcon_replaceAll:function(string, find, replace) {return string.replace(new RegExp(this.goldenIcon_escapeRegExp(find), 'g'), replace);},";
      var goldenIcon_escapeRegExp = "goldenIcon_escapeRegExp:function(string) {return string.replace(/([.*+?^=!:${}()|\\[\\]\\/\\\\])/g, \"\\\\$1\");},";

      //change the escapeHTML func & add unescapeHTML
      data = data.replace(/escapeHTML:function.*?\{.*?\},/, "escapeHTML:function(message){var escape = document.createElement('textarea');escape.textContent = message;return escape.innerHTML;},unescapeHTML: function(message){var unescape = document.createElement('textarea');unescape.innerHTML = message;return (unescape.textContent).replace(/<\\/?[^>]+(>|$)/g, \"\");}," + goldenIcon + goldenIcon_replaceAll + goldenIcon_escapeRegExp);

      //remove toasr at the send of readChatMessage
      data = data.replace(/(readChatMessage:function.*?}})(.*?)(}},)/, "$1$3");

      //readChatMessage with unescapeHTML
      data = data.replace(/((readChatMessage:function.*?};)(.*?)\+=.*?;)(.*?)(if.*)/, "$1$3=this.unescapeHTML($3);$3=this.goldenIcon($3);$5");

      fs.writeFile(translatedFile, data, 'utf8', function (err) {
        if (err) translateFinished = false;
        callback();
      });
    }
  });
}