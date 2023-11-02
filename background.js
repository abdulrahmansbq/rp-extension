/**
 * @name background.js
 * @description background script for the extension
 * @version 1.0
 */
chrome.commands.onCommand.addListener(async (command) => {
    const tab = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript({
        target: { tabId: tab[0].id },
        files: ["views/assets/js/inc/utils.js"],
    });

    if (command === 'showOptions') {
        chrome.scripting.insertCSS({
            target: { tabId: tab[0].id },
            files: ["views/assets/css/style.css"],
        });
        chrome.scripting.executeScript({
            target: { tabId: tab[0].id },
            files: ["views/assets/js/main.js"],
        });
    }
    if(command == 'showGrid'){
        chrome.tabs.create({url: 'views/grid.html'});
    }
    if (command == 'cursorFinder') {
        chrome.scripting.insertCSS({
            target: { tabId: tab[0].id },
            files: ["views/assets/css/fx/cursor_finder.css"],
        });
        chrome.scripting.executeScript({
            target: { tabId: tab[0].id },
            files: ["views/assets/js/inc/cursor_finder.js"],
        });
    }
});


// listen to saveTunnelVision message from the content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action == 'saveTunnelVision') {
        // save the data to the local storage
        chrome.storage.local.get(['tunnelVision']).then((result) => {
            let tunnelVision = result.tunnelVision;
            if (tunnelVision == undefined) {
                tunnelVision = [];
            }
            tunnelVision.push(request.data);
            chrome.storage.local.set({ tunnelVision: tunnelVision }, () => {
                sendResponse({ success: true });
            });
        });
        return true;
    }
});