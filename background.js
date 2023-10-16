chrome.runtime.onInstalled.addListener(() => {
    chrome.action.setBadgeText({
      text: "OFF",
    });
  });
  

chrome.action.onClicked.addListener(async (tab) => {
    // Retrieve the action badge to check if the extension is 'ON' or 'OFF'
    const prevState = await chrome.action.getBadgeText({ tabId: tab.id });
    // Next state will always be the opposite
    const nextState = prevState === 'ON' ? 'OFF' : 'ON'

    // Set the action badge to the next state
    await chrome.action.setBadgeText({
        tabId: tab.id,
        text: nextState,
    });
  });

  chrome.commands.onCommand.addListener(async (command) => {
    const tab = await chrome.tabs.query({ active: true, currentWindow: true });
    if(command == 'contrastFX'){
        chrome.scripting.executeScript({
            target: { tabId: tab[0].id },
            files: ["views/assets/js/fx/contrast.js"],
        });
    }
    if(command == 'cursorFinder')
    {
        chrome.scripting.insertCSS({
            target: { tabId: tab[0].id },
            files: ["views/assets/css/fx/cursor_finder.css"],
        });
        chrome.scripting.executeScript({
            target: { tabId: tab[0].id },
            files: ["views/assets/js/fx/cursor_finder.js"],
        });   
    }
  });


  
//   position: absolute; 
// z-index: 3;
//  opacity: 0.5;
//  filter: alpha(opacity = 50); 
// top: 0; 
// bottom: 0; 
// left: 0; 
// right: 0; 
// width: 100%; 
// height: 100%; 
// background-color: Black; 
// color: White;