var ss = document.getElementById("tweetified")
if(!ss) {
    var s = document.createElement("script")
    s.id = "tweetified";
    s.src = chrome.runtime.getURL("/assets/scripts/turnOn.js");
    s.onload = function () {
    };
    document.head.appendChild(s);
}