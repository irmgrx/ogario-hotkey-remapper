### Ogario Hotkey Remapper
- Remapping hotkeys of ogario extension for Agar.io
- Removed annoying command toast
- Chatbox supports icons from HKGolden
- No more &lt; &rt; &amp; ... in chatbox

### Icons preview
![ogario_icons](https://s31.postimg.org/yybh5zjx7/ogario_icons.png)

### Example user script
[user script with default hotkey](http://pastebin.com/sviL1qr4)

### How to use?
1. config ogario_key_map.json by your own preference
2. run the program
3. upload ogario.keymapped.js to somewhere
4. change correspond code of user script of ogario to the link of your uploaded ogario.keymapped.js
   original: ```var ogarioJS = '<script src="http://ogario.ovh/le/ogario.le.js"></script>';```
   to:       ```var ogarioJS = '<script src="https://googledrive.com/host/YOUR_FILE_ID"></script>';```

### Notes
- shift key is removed for split_n16
- e key is removed for Macro_feed
- keys assignment cannot be duplicated
- some keys have been used by default, cannot set it below, eg. '~', 'w', 'space'...
- only support one letter hotkey

### Example of ogario_key_map.json
```{
	"Macro_feed": "d",
	"Split_n16": "f",
	"Double_split": "g",
	"Toggle_custom_vanilla_skins": "a",
	"Show_hide_food": "o",
	"Reset_zoom": "z",
	"Chat_history_Clear_chat": "c",
	"Show_hide_names": "n",
	"Show_hide_skins": "s",
	"Toggle_own_biggest_smallest_cell": "p",
	"Show_hide_chat": "h",
	"Toggle_death_location": "x",
	"Show_hide_background_sectors": "b",
	"Show_hide_mass": "m"
}```
