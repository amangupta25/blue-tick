
var sc = document.getElementById("tweetified")
if(sc) {
    // if(typeof nodeInsertedCallback !== "undefined") {
    //     window.removeEventListener('load', nodeInsertedCallback);
    //     document.removeEventListener('scroll', nodeInsertedCallback);
    // }
    // let tab = await getCurrentTab();
    // await chrome.storage.local.get(
    //     {
    //         "tabId": tab.id,
    //     }
    // )
    observer.disconnect()
    sc.remove();

}

