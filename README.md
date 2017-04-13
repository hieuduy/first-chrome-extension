### Prerequisite:
- Browser as Chrome version 57 or higher.

### Description:
- This is an extension used on Chrome.
- The main functionality of this extension is used for checking the number of awaiting assignments in DM system.
- The process will be run after an given interval.
- A popup UI where allow user to config.

### Installation:
- Go to the [link](chrome://extensions/) on Chrome browser.
- Find the file name as `dmt-chrome-extension.crx` in the DM source code.
- Drag and drop this file onto the Chrome Extensions page.
- Then allow to add the extension for your chrome.

**Notes**: In case of there is no file as '.crx' then let create it manually following these steps as below:
- Go to the [link](chrome://extensions/) on Chrome browser.
- Click on the button as `Package extension...`.
- Click on the first button as Browser belongs to label `Extension root directory`.
- Select the folder dmt-chrome-extension in the DM source code.
- Press on `Package extension` to generate the '.crx' file or cancel unless do nothing.
- Find the generated '.crx' file then drag & drop this file onto the Chrome Extensions page.
- Then allow to add the extension for your Chrome.

### Configuration:
- After the install is completed there will be have a DM icon in black displayed at the top-right corner of Chrome browser.
- Click on the icon to show the configuration popup.
- There are two main text-fields:
```
 - URL: The main URL of DM Application, default as `http://127.0.0.1:8989`.
 - Timeout: The interval number, default as `1 minutes`.
```
- Click `Save` to update the setting or `Clear` to clear off the form.

### Presentation:
- `DM icon with a Exclamation character in orange`: 'Failed to connect DM Server'.
- `DM icon with a X number in green`: 'Getting X awaiting assignments'.
- `A spinning Globe`: Click on this icon to see the details.