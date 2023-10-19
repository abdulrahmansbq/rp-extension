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

