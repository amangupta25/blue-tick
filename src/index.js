
// Copyright 2022 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

var lunr = require('lunr');

var url = chrome.runtime.getURL('assets/index/index.json');
var idx = null


chrome.runtime.onInstalled.addListener( async () => {
    chrome.action.setBadgeText({
        text: "OFF",
    });
    let tab = await getCurrentTab();
    await chrome.storage.local.set({
        "tabId": tab.id,
        "state": "OFF"
    });
    fetch(url)
        .then((response) => response.json()) // file contains json
        .then((json) => {
            idx = lunr.Index.load(json)
        });
    console.log("INSTALLED");
});

const extensions = 'https://developer.chrome.com/docs/extensions'
const webstore = 'https://developer.chrome.com/docs/webstore'

async function getCurrentTab() {
    let queryOptions = { active: true, lastFocusedWindow: true };
    // `tab` will either be a `tabs.Tab` instance or `undefined`.
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
}

// When the user clicks on the extension action
chrome.action.onClicked.addListener(async (tab) => {
    // if (tab.url.startsWith(extensions) || tab.url.startsWith(webstore)) {
    // We retrieve the action badge to check if the extension is 'ON' or 'OFF'
    let tabId = tab.id + "";
    const prevState = await chrome.storage.local.get(
        {
            "tabId": tabId,
            "state": ''
        }
    );
    // Next state will always be the opposite
    const nextState = prevState["state"] === 'ON' ? 'OFF' : 'ON'

    // Set the action badge to the next stat`e
    await chrome.action.setBadgeText({
        tabId: tab.id,
        text: nextState,
    });

    await chrome.storage.local.set({
        "tabId": tabId,
        "state": nextState
    });

    if (nextState === "ON") {
        chrome.scripting.executeScript(
            {
                target: {tabId: tab.id},
                files: ['/assets/scripts/turnOnUtil.js'],
            },
            () => { console.log("turned on") });
    } else if (nextState === "OFF") {
        chrome.scripting.executeScript(
            {
                target: {tabId: tab.id},
                files: ['assets/scripts/turnOffUtil.js'],
            },
            () => { console.log("turned off") });
    }
});

chrome.runtime.onMessage.addListener(async function (msg, sender, sendResponse) {
    if (msg.type === "contentLoaded") {
        let tab = await getCurrentTab();
        const prevState = await chrome.storage.local.get(
            {
                "tabId": tab.id,
                "state": ''
            }
        )
        await chrome.action.setBadgeText({
            tabId: tab.id,
            text: prevState['state'],
        });

        if (prevState['state'] === "ON") {
            chrome.scripting.executeScript(
                {
                    target: {tabId: tab.id},
                    files: ['/assets/scripts/turnOnUtil.js'],
                },
                () => {
                    console.log("turned on")
                });
        } else  if (prevState['state'] === "OFF") {
            chrome.scripting.executeScript(
                {
                    target: {tabId: tab.id},
                        files: ['/assets/scripts/turnOffUtil.js'],
                },
                () => {
                    console.log("turned off")
                });
        }
    } else if (msg.type === "search") {
        var result = idx.search(`handle:${msg.text}`)
        sendResponse(result);
    }
});