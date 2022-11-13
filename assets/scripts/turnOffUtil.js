var ss = document.getElementById("tweetified-off")
if(!ss) {
    var s = document.createElement("script")
    s.id = "tweetified-off";
    s.src = chrome.runtime.getURL("/assets/scripts/turnOff.js");
    s.onload = function () {
    };
    document.head.appendChild(s);
}
