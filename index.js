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

      fs.writeFile(translatedFile, data, 'utf8', function (err) {
        if (err) translateFinished = false;
        callback();
      });
    }
  });
}