var eligible = [
    'span.css-901oao.css-16my406.r-xoduu5.r-18u37iz.r-1q142lx.r-poiln3.r-bcqeeo.r-qvutc0', //header
    'div.css-901oao.r-xoduu5.r-18u37iz.r-1q142lx.r-37j5jr.r-16dba41.r-bcqeeo.r-qvutc0', //tweet page
    'span.css-901oao.css-16my406.r-xoduu5.r-18u37iz.r-1q142lx.r-poiln3.r-adyw6z.r-135wba7.r-bcqeeo.r-qvutc0', //profile
    'form > * > * > * > * > * > * > * > * > * > * > * > * > div.css-901oao.r-xoduu5.r-18u37iz.r-1q142lx.r-37j5jr.r-16dba41.r-bcqeeo.r-qvutc0', //search
    '#layers > * > * > * > * > * > * > * > * > * > * > * > * > * > * > * > * > * > * > * > * > * > * > * > * > * > * > * > div.css-901oao.r-xoduu5.r-18u37iz.r-1q142lx.r-37j5jr.r-16dba41.r-bcqeeo.r-qvutc0', // chat
    'div > aside > div:nth-child(2) > * > * >* > * > * > * > * > a > div > div.css-901oao.r-xoduu5.r-18u37iz.r-1q142lx.r-37j5jr.r-16dba41.r-bcqeeo.r-qvutc0', // you might like
    'div.css-1dbjc4n.r-1awozwy.r-ar5de.r-1777fci.r-117bsoe.r-4ukpa0.r-1pn2ns4 span.css-901oao.css-16my406.r-xoduu5.r-18u37iz.r-1q142lx.r-poiln3.r-bcqeeo.r-qvutc0', //space
]

var getAllProperties = (e, props = []) => e.__proto__ ? getAllProperties(e.__proto__, props.concat(Object.getOwnPropertyNames(e))) : [...new Set(props.concat(Object.getOwnPropertyNames(e)))];

var observer = null;

function nodeInsertedCallback(event) {
    observer = new MutationObserver(function (mutations, observer) {
        eligible.forEach(node => {

            let docs = document.querySelectorAll(node);

            docs.forEach(doc => {
                let isTick = doc.querySelector('svg path[d^="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81c-.66-1.31-1.91-2.19-3.34-2.19s-2.67.88-3.33 2.19c-1.4-.46-2.91-.2-3.92.81s-1.26 2.52-.8 3.91c-1.31.67-2.2 1.91-2.2 3.34s.89 2.67 2.2 3.34c-.46 1.39-.21 2.9.8 3.91s2.52 1.26 3.91.81c.67 1.31 1.91 2.19 3.34 2.19s2.68-.88 3.34-2.19c1.39.45 2.9.2 3.91-.81s1.27-2.52.81-3.91c1.31-.67 2.19-1.91 2.19-3.34zm-11.71 4.2L6.8 12.46l1.41-1.42 2.26 2.26 4.8-5.23 1.47 1.36-6.2 6.77z"]');
                if (isTick) {
                    let properties = Object.getOwnPropertyNames(doc.parentNode)
                    // const properties1 = doc.attributes

                    // let reactProperties = properties.find((name) => {
                    //     name.startsWith("__reactProps")
                    // });
                    let reactProperties = []
                    properties.forEach(property => {
                        if (property.startsWith("__reactProps")) {
                            reactProperties.push(property);
                        }
                    })

                    if (reactProperties) {
                        let elementProp = doc[reactProperties];
                        let isPaid =
                            elementProp.children.props.children[0][0].props.isBlueVerified;
                        let isVerified =
                            elementProp.children.props.children[0][0].props.isVerified;
                        let sTick = eligible.indexOf(node) > 2;
                        if (isVerified) {
                            // doChange(sTick, isTick)
                            doChange(sTick, isTick)
                            // isTick.parentElement.innerHTML = "<p>Paid</p>";
                        } else if (isPaid) {
                            doPaidChange(sTick, isTick)
                            // isTick.parentElement.innerHTML = "<p>Verified</p>";
                        }
                    }
                }

            })

        })

    });
    // let tab = await getCurrentTab();
    // await chrome.storage.local.set(
    //     {
    //         "tabId": tab.id,
    //         "observer": observer
    //     }
    // )

    observer.observe(document, {
        subtree: true,
        childList: true
    });

}

// async function getCurrentTab() {
//     let queryOptions = { active: true, lastFocusedWindow: true };
//     // `tab` will either be a `tabs.Tab` instance or `undefined`.
//     let [tab] = await chrome.tabs.query(queryOptions);
//     return tab;
// }

function doChange(sTick, doc) {
    if (sTick) {
        doc.parentElement.innerHTML = "<svg class=\"r-13v1u17 r-4qtqp9 r-yyyyoo r-1xvli5t r-9cviqr r-f9ja8p r-og9te1 r-bnwqim r-1plcrui r-lrvibr\" height=\"80\" viewBox=\"0 0 512 512\" width=\"2500\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"m512 268c0 17.9-4.3 34.5-12.9 49.7s-20.1 27.1-34.6 35.4c.4 2.7.6 6.9.6 12.6 0 27.1-9.1 50.1-27.1 69.1-18.1 19.1-39.9 28.6-65.4 28.6-11.4 0-22.3-2.1-32.6-6.3-8 16.4-19.5 29.6-34.6 39.7-15 10.2-31.5 15.2-49.4 15.2-18.3 0-34.9-4.9-49.7-14.9-14.9-9.9-26.3-23.2-34.3-40-10.3 4.2-21.1 6.3-32.6 6.3-25.5 0-47.4-9.5-65.7-28.6-18.3-19-27.4-42.1-27.4-69.1 0-3 .4-7.2 1.1-12.6-14.5-8.4-26-20.2-34.6-35.4-8.5-15.2-12.8-31.8-12.8-49.7 0-19 4.8-36.5 14.3-52.3s22.3-27.5 38.3-35.1c-4.2-11.4-6.3-22.9-6.3-34.3 0-27 9.1-50.1 27.4-69.1s40.2-28.6 65.7-28.6c11.4 0 22.3 2.1 32.6 6.3 8-16.4 19.5-29.6 34.6-39.7 15-10.1 31.5-15.2 49.4-15.2s34.4 5.1 49.4 15.1c15 10.1 26.6 23.3 34.6 39.7 10.3-4.2 21.1-6.3 32.6-6.3 25.5 0 47.3 9.5 65.4 28.6s27.1 42.1 27.1 69.1c0 12.6-1.9 24-5.7 34.3 16 7.6 28.8 19.3 38.3 35.1 9.5 15.9 14.3 33.4 14.3 52.4zm-266.9 77.1 105.7-158.3c2.7-4.2 3.5-8.8 2.6-13.7-1-4.9-3.5-8.8-7.7-11.4-4.2-2.7-8.8-3.6-13.7-2.9-5 .8-9 3.2-12 7.4l-93.1 140-42.9-42.8c-3.8-3.8-8.2-5.6-13.1-5.4-5 .2-9.3 2-13.1 5.4-3.4 3.4-5.1 7.7-5.1 12.9 0 5.1 1.7 9.4 5.1 12.9l58.9 58.9 2.9 2.3c3.4 2.3 6.9 3.4 10.3 3.4 6.7-.1 11.8-2.9 15.2-8.7z\" fill=\"#1da1f2\"/></svg>";
    } else {
        doc.parentElement.parentElement.parentElement.innerHTML = "<svg class=\"r-13v1u17 r-4qtqp9 r-yyyyoo r-1xvli5t r-9cviqr r-f9ja8p r-og9te1 r-bnwqim r-1plcrui r-lrvibr\" height=\"80\" viewBox=\"0 0 512 512\" width=\"2500\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"m512 268c0 17.9-4.3 34.5-12.9 49.7s-20.1 27.1-34.6 35.4c.4 2.7.6 6.9.6 12.6 0 27.1-9.1 50.1-27.1 69.1-18.1 19.1-39.9 28.6-65.4 28.6-11.4 0-22.3-2.1-32.6-6.3-8 16.4-19.5 29.6-34.6 39.7-15 10.2-31.5 15.2-49.4 15.2-18.3 0-34.9-4.9-49.7-14.9-14.9-9.9-26.3-23.2-34.3-40-10.3 4.2-21.1 6.3-32.6 6.3-25.5 0-47.4-9.5-65.7-28.6-18.3-19-27.4-42.1-27.4-69.1 0-3 .4-7.2 1.1-12.6-14.5-8.4-26-20.2-34.6-35.4-8.5-15.2-12.8-31.8-12.8-49.7 0-19 4.8-36.5 14.3-52.3s22.3-27.5 38.3-35.1c-4.2-11.4-6.3-22.9-6.3-34.3 0-27 9.1-50.1 27.4-69.1s40.2-28.6 65.7-28.6c11.4 0 22.3 2.1 32.6 6.3 8-16.4 19.5-29.6 34.6-39.7 15-10.1 31.5-15.2 49.4-15.2s34.4 5.1 49.4 15.1c15 10.1 26.6 23.3 34.6 39.7 10.3-4.2 21.1-6.3 32.6-6.3 25.5 0 47.3 9.5 65.4 28.6s27.1 42.1 27.1 69.1c0 12.6-1.9 24-5.7 34.3 16 7.6 28.8 19.3 38.3 35.1 9.5 15.9 14.3 33.4 14.3 52.4zm-266.9 77.1 105.7-158.3c2.7-4.2 3.5-8.8 2.6-13.7-1-4.9-3.5-8.8-7.7-11.4-4.2-2.7-8.8-3.6-13.7-2.9-5 .8-9 3.2-12 7.4l-93.1 140-42.9-42.8c-3.8-3.8-8.2-5.6-13.1-5.4-5 .2-9.3 2-13.1 5.4-3.4 3.4-5.1 7.7-5.1 12.9 0 5.1 1.7 9.4 5.1 12.9l58.9 58.9 2.9 2.3c3.4 2.3 6.9 3.4 10.3 3.4 6.7-.1 11.8-2.9 15.2-8.7z\" fill=\"#1da1f2\"/></svg>";
    }
}


function doPaidChange(sTick, doc) {
    if (sTick) {
        doc.parentElement.innerHTML = "<svg class=\"r-13v1u17 r-4qtqp9 r-yyyyoo r-1xvli5t r-9cviqr r-f9ja8p r-og9te1 r-bnwqim r-1plcrui r-lrvibr\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 48 48\"><defs><style>.cls-1{fill:#ffbc5a;}.cls-2{fill:#ef9d3a;}.cls-3{fill:#505572;}.cls-4{fill:#231f20;}</style></defs><title>Dollar Coin</title><g id=\"Dollar_Coin\" data-name=\"Dollar Coin\"><path class=\"cls-1\" d=\"M24,1A23,23,0,1,0,47,24,23.0256,23.0256,0,0,0,24,1Z\"/><path class=\"cls-2\" d=\"M24,5A19,19,0,1,0,43,24,19.0216,19.0216,0,0,0,24,5Z\"/><path class=\"cls-1\" d=\"M24,39A15,15,0,1,1,39,24,15.0164,15.0164,0,0,1,24,39Z\"/><path class=\"cls-3\" d=\"M27,32H21a3.0033,3.0033,0,0,1-3-3V28a1,1,0,0,1,2,0v1a1.001,1.001,0,0,0,1,1h6a1.001,1.001,0,0,0,1-1V26a1.001,1.001,0,0,0-1-1H21a3.0033,3.0033,0,0,1-3-3V19a3.0033,3.0033,0,0,1,3-3h6a3.0033,3.0033,0,0,1,3,3v1a1,1,0,0,1-2,0V19a1.001,1.001,0,0,0-1-1H21a1.001,1.001,0,0,0-1,1v3a1.001,1.001,0,0,0,1,1h6a3.0033,3.0033,0,0,1,3,3v3A3.0033,3.0033,0,0,1,27,32Z\"/><path class=\"cls-3\" d=\"M24,18a1,1,0,0,1-1-1V15a1,1,0,0,1,2,0v2A1,1,0,0,1,24,18Z\"/><path class=\"cls-3\" d=\"M24,34a1,1,0,0,1-1-1V31a1,1,0,0,1,2,0v2A1,1,0,0,1,24,34Z\"/><path class=\"cls-4\" d=\"M24,1A23,23,0,1,0,47,24,23.0259,23.0259,0,0,0,24,1Zm0,44A21,21,0,1,1,45,24,21.0239,21.0239,0,0,1,24,45Z\"/><path class=\"cls-4\" d=\"M24,5A19,19,0,1,0,43,24,19.0216,19.0216,0,0,0,24,5Zm0,36A17,17,0,1,1,41,24,17.019,17.019,0,0,1,24,41Z\"/><path class=\"cls-4\" d=\"M27,16H25V15a1,1,0,0,0-2,0v1H21a3.0033,3.0033,0,0,0-3,3v3a3.0033,3.0033,0,0,0,3,3h6a1.001,1.001,0,0,1,1,1v3a1.001,1.001,0,0,1-1,1H21a1.001,1.001,0,0,1-1-1V28a1,1,0,0,0-2,0v1a3.0033,3.0033,0,0,0,3,3h2v1a1,1,0,0,0,2,0V32h2a3.0033,3.0033,0,0,0,3-3V26a3.0033,3.0033,0,0,0-3-3H21a1.001,1.001,0,0,1-1-1V19a1.001,1.001,0,0,1,1-1h6a1.001,1.001,0,0,1,1,1v1a1,1,0,0,0,2,0V19A3.0033,3.0033,0,0,0,27,16Z\"/></g></svg>";
    } else {
        doc.parentElement.parentElement.parentElement.innerHTML = "<svg class=\"r-13v1u17 r-4qtqp9 r-yyyyoo r-1xvli5t r-9cviqr r-f9ja8p r-og9te1 r-bnwqim r-1plcrui r-lrvibr\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 48 48\"><defs><style>.cls-1{fill:#ffbc5a;}.cls-2{fill:#ef9d3a;}.cls-3{fill:#505572;}.cls-4{fill:#231f20;}</style></defs><title>Dollar Coin</title><g id=\"Dollar_Coin\" data-name=\"Dollar Coin\"><path class=\"cls-1\" d=\"M24,1A23,23,0,1,0,47,24,23.0256,23.0256,0,0,0,24,1Z\"/><path class=\"cls-2\" d=\"M24,5A19,19,0,1,0,43,24,19.0216,19.0216,0,0,0,24,5Z\"/><path class=\"cls-1\" d=\"M24,39A15,15,0,1,1,39,24,15.0164,15.0164,0,0,1,24,39Z\"/><path class=\"cls-3\" d=\"M27,32H21a3.0033,3.0033,0,0,1-3-3V28a1,1,0,0,1,2,0v1a1.001,1.001,0,0,0,1,1h6a1.001,1.001,0,0,0,1-1V26a1.001,1.001,0,0,0-1-1H21a3.0033,3.0033,0,0,1-3-3V19a3.0033,3.0033,0,0,1,3-3h6a3.0033,3.0033,0,0,1,3,3v1a1,1,0,0,1-2,0V19a1.001,1.001,0,0,0-1-1H21a1.001,1.001,0,0,0-1,1v3a1.001,1.001,0,0,0,1,1h6a3.0033,3.0033,0,0,1,3,3v3A3.0033,3.0033,0,0,1,27,32Z\"/><path class=\"cls-3\" d=\"M24,18a1,1,0,0,1-1-1V15a1,1,0,0,1,2,0v2A1,1,0,0,1,24,18Z\"/><path class=\"cls-3\" d=\"M24,34a1,1,0,0,1-1-1V31a1,1,0,0,1,2,0v2A1,1,0,0,1,24,34Z\"/><path class=\"cls-4\" d=\"M24,1A23,23,0,1,0,47,24,23.0259,23.0259,0,0,0,24,1Zm0,44A21,21,0,1,1,45,24,21.0239,21.0239,0,0,1,24,45Z\"/><path class=\"cls-4\" d=\"M24,5A19,19,0,1,0,43,24,19.0216,19.0216,0,0,0,24,5Zm0,36A17,17,0,1,1,41,24,17.019,17.019,0,0,1,24,41Z\"/><path class=\"cls-4\" d=\"M27,16H25V15a1,1,0,0,0-2,0v1H21a3.0033,3.0033,0,0,0-3,3v3a3.0033,3.0033,0,0,0,3,3h6a1.001,1.001,0,0,1,1,1v3a1.001,1.001,0,0,1-1,1H21a1.001,1.001,0,0,1-1-1V28a1,1,0,0,0-2,0v1a3.0033,3.0033,0,0,0,3,3h2v1a1,1,0,0,0,2,0V32h2a3.0033,3.0033,0,0,0,3-3V26a3.0033,3.0033,0,0,0-3-3H21a1.001,1.001,0,0,1-1-1V19a1.001,1.001,0,0,1,1-1h6a1.001,1.001,0,0,1,1,1v1a1,1,0,0,0,2,0V19A3.0033,3.0033,0,0,0,27,16Z\"/></g></svg>";
    }
}

function nodeInsertedCallback1(event) {
    var search = document.querySelectorAll("div:nth-child(2) > div > div > div.css-1dbjc4n.r-1iusvr4.r-16y2uox.r-1777fci > div > div.css-1dbjc4n.r-1wbh5a2.r-dnmrzs.r-1ny4l3l > div > div.css-1dbjc4n.r-1awozwy.r-18u37iz.r-1wbh5a2 > div > div > div > span")
    search.forEach(doc => {
        var handle = doc.innerText;
        var finalHandle = handle.substring(1)
        chrome.runtime.sendMessage({type: "search", text: finalHandle}, function (response) {
            if (doc.id !== "tweetified") {
                if (response.length > 0) {
                    doc.id = "tweetified"
                    doc.innerHTML += "<svg class=\"r-13v1u17 r-4qtqp9 r-yyyyoo r-1xvli5t r-9cviqr r-f9ja8p r-og9te1 r-bnwqim r-1plcrui r-lrvibr\" height=\"80\" viewBox=\"0 0 512 512\" width=\"2500\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"m512 268c0 17.9-4.3 34.5-12.9 49.7s-20.1 27.1-34.6 35.4c.4 2.7.6 6.9.6 12.6 0 27.1-9.1 50.1-27.1 69.1-18.1 19.1-39.9 28.6-65.4 28.6-11.4 0-22.3-2.1-32.6-6.3-8 16.4-19.5 29.6-34.6 39.7-15 10.2-31.5 15.2-49.4 15.2-18.3 0-34.9-4.9-49.7-14.9-14.9-9.9-26.3-23.2-34.3-40-10.3 4.2-21.1 6.3-32.6 6.3-25.5 0-47.4-9.5-65.7-28.6-18.3-19-27.4-42.1-27.4-69.1 0-3 .4-7.2 1.1-12.6-14.5-8.4-26-20.2-34.6-35.4-8.5-15.2-12.8-31.8-12.8-49.7 0-19 4.8-36.5 14.3-52.3s22.3-27.5 38.3-35.1c-4.2-11.4-6.3-22.9-6.3-34.3 0-27 9.1-50.1 27.4-69.1s40.2-28.6 65.7-28.6c11.4 0 22.3 2.1 32.6 6.3 8-16.4 19.5-29.6 34.6-39.7 15-10.1 31.5-15.2 49.4-15.2s34.4 5.1 49.4 15.1c15 10.1 26.6 23.3 34.6 39.7 10.3-4.2 21.1-6.3 32.6-6.3 25.5 0 47.3 9.5 65.4 28.6s27.1 42.1 27.1 69.1c0 12.6-1.9 24-5.7 34.3 16 7.6 28.8 19.3 38.3 35.1 9.5 15.9 14.3 33.4 14.3 52.4zm-266.9 77.1 105.7-158.3c2.7-4.2 3.5-8.8 2.6-13.7-1-4.9-3.5-8.8-7.7-11.4-4.2-2.7-8.8-3.6-13.7-2.9-5 .8-9 3.2-12 7.4l-93.1 140-42.9-42.8c-3.8-3.8-8.2-5.6-13.1-5.4-5 .2-9.3 2-13.1 5.4-3.4 3.4-5.1 7.7-5.1 12.9 0 5.1 1.7 9.4 5.1 12.9l58.9 58.9 2.9 2.3c3.4 2.3 6.9 3.4 10.3 3.4 6.7-.1 11.8-2.9 15.2-8.7z\" fill=\"#1da1f2\"/></svg>"
                }
            }
        });
    });
    var tweet = document.querySelectorAll("div:nth-child(2) > div > div > a > div > span")
    tweet.forEach(doc => {
        var handle = doc.innerText;
        var finalHandle = handle.substring(1)
        chrome.runtime.sendMessage({type: "search", text: finalHandle}, function (response) {
            if (doc.id !== "tweetified") {
                if (response.length > 0) {
                    doc.id = "tweetified"
                    doc.innerHTML += "<svg class=\"r-13v1u17 r-4qtqp9 r-yyyyoo r-1xvli5t r-9cviqr r-f9ja8p r-og9te1 r-bnwqim r-1plcrui r-lrvibr\" height=\"80\" viewBox=\"0 0 512 512\" width=\"2500\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"m512 268c0 17.9-4.3 34.5-12.9 49.7s-20.1 27.1-34.6 35.4c.4 2.7.6 6.9.6 12.6 0 27.1-9.1 50.1-27.1 69.1-18.1 19.1-39.9 28.6-65.4 28.6-11.4 0-22.3-2.1-32.6-6.3-8 16.4-19.5 29.6-34.6 39.7-15 10.2-31.5 15.2-49.4 15.2-18.3 0-34.9-4.9-49.7-14.9-14.9-9.9-26.3-23.2-34.3-40-10.3 4.2-21.1 6.3-32.6 6.3-25.5 0-47.4-9.5-65.7-28.6-18.3-19-27.4-42.1-27.4-69.1 0-3 .4-7.2 1.1-12.6-14.5-8.4-26-20.2-34.6-35.4-8.5-15.2-12.8-31.8-12.8-49.7 0-19 4.8-36.5 14.3-52.3s22.3-27.5 38.3-35.1c-4.2-11.4-6.3-22.9-6.3-34.3 0-27 9.1-50.1 27.4-69.1s40.2-28.6 65.7-28.6c11.4 0 22.3 2.1 32.6 6.3 8-16.4 19.5-29.6 34.6-39.7 15-10.1 31.5-15.2 49.4-15.2s34.4 5.1 49.4 15.1c15 10.1 26.6 23.3 34.6 39.7 10.3-4.2 21.1-6.3 32.6-6.3 25.5 0 47.3 9.5 65.4 28.6s27.1 42.1 27.1 69.1c0 12.6-1.9 24-5.7 34.3 16 7.6 28.8 19.3 38.3 35.1 9.5 15.9 14.3 33.4 14.3 52.4zm-266.9 77.1 105.7-158.3c2.7-4.2 3.5-8.8 2.6-13.7-1-4.9-3.5-8.8-7.7-11.4-4.2-2.7-8.8-3.6-13.7-2.9-5 .8-9 3.2-12 7.4l-93.1 140-42.9-42.8c-3.8-3.8-8.2-5.6-13.1-5.4-5 .2-9.3 2-13.1 5.4-3.4 3.4-5.1 7.7-5.1 12.9 0 5.1 1.7 9.4 5.1 12.9l58.9 58.9 2.9 2.3c3.4 2.3 6.9 3.4 10.3 3.4 6.7-.1 11.8-2.9 15.2-8.7z\" fill=\"#1da1f2\"/></svg>"
                }
            }
        });
    });
    var profile = document.querySelectorAll("#react-root > div > div > div.css-1dbjc4n.r-18u37iz.r-13qz1uu.r-417010 > main > div > div > div > div.css-1dbjc4n.r-kemksi.r-1kqtdi0.r-1ljd8xs.r-13l2t4g.r-1phboty.r-1jgb5lz.r-11wrixw.r-61z16t.r-1ye8kvj.r-13qz1uu.r-184en5c > div > div:nth-child(3) > div > div > div > div > div.css-1dbjc4n.r-6gpygo.r-14gqq1x > div.css-1dbjc4n.r-1wbh5a2.r-dnmrzs.r-1ny4l3l > div > div.css-1dbjc4n.r-1awozwy.r-18u37iz.r-1wbh5a2 > div > div > div > span")
    profile.forEach(doc => {
        var handle = doc.innerText;
        var finalHandle = handle.substring(1)
        chrome.runtime.sendMessage({type: "search", text: finalHandle}, function (response) {
            if(doc.id !== "tweetified") {
                if(response.length > 0) {
                    doc.id = "tweetified"
                    doc.innerHTML += "<svg class=\"r-13v1u17 r-4qtqp9 r-yyyyoo r-1xvli5t r-9cviqr r-f9ja8p r-og9te1 r-bnwqim r-1plcrui r-lrvibr\" height=\"80\" viewBox=\"0 0 512 512\" width=\"2500\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"m512 268c0 17.9-4.3 34.5-12.9 49.7s-20.1 27.1-34.6 35.4c.4 2.7.6 6.9.6 12.6 0 27.1-9.1 50.1-27.1 69.1-18.1 19.1-39.9 28.6-65.4 28.6-11.4 0-22.3-2.1-32.6-6.3-8 16.4-19.5 29.6-34.6 39.7-15 10.2-31.5 15.2-49.4 15.2-18.3 0-34.9-4.9-49.7-14.9-14.9-9.9-26.3-23.2-34.3-40-10.3 4.2-21.1 6.3-32.6 6.3-25.5 0-47.4-9.5-65.7-28.6-18.3-19-27.4-42.1-27.4-69.1 0-3 .4-7.2 1.1-12.6-14.5-8.4-26-20.2-34.6-35.4-8.5-15.2-12.8-31.8-12.8-49.7 0-19 4.8-36.5 14.3-52.3s22.3-27.5 38.3-35.1c-4.2-11.4-6.3-22.9-6.3-34.3 0-27 9.1-50.1 27.4-69.1s40.2-28.6 65.7-28.6c11.4 0 22.3 2.1 32.6 6.3 8-16.4 19.5-29.6 34.6-39.7 15-10.1 31.5-15.2 49.4-15.2s34.4 5.1 49.4 15.1c15 10.1 26.6 23.3 34.6 39.7 10.3-4.2 21.1-6.3 32.6-6.3 25.5 0 47.3 9.5 65.4 28.6s27.1 42.1 27.1 69.1c0 12.6-1.9 24-5.7 34.3 16 7.6 28.8 19.3 38.3 35.1 9.5 15.9 14.3 33.4 14.3 52.4zm-266.9 77.1 105.7-158.3c2.7-4.2 3.5-8.8 2.6-13.7-1-4.9-3.5-8.8-7.7-11.4-4.2-2.7-8.8-3.6-13.7-2.9-5 .8-9 3.2-12 7.4l-93.1 140-42.9-42.8c-3.8-3.8-8.2-5.6-13.1-5.4-5 .2-9.3 2-13.1 5.4-3.4 3.4-5.1 7.7-5.1 12.9 0 5.1 1.7 9.4 5.1 12.9l58.9 58.9 2.9 2.3c3.4 2.3 6.9 3.4 10.3 3.4 6.7-.1 11.8-2.9 15.2-8.7z\" fill=\"#1da1f2\"/></svg>"
                }
            }
        });

    });
    var reshared_tweets = document.querySelectorAll("div.css-1dbjc4n.r-1kqtdi0.r-1867qdf.r-rs99b7.r-1loqt21.r-adacv.r-1ny4l3l.r-1udh08x.r-o7ynqc.r-6416eg > div > div.css-1dbjc4n.r-eqz5dr.r-1fz3rvf.r-1s2bzr4 > div > div > div > div > div > div.css-1dbjc4n.r-1awozwy.r-18u37iz.r-1wbh5a2.r-13hce6t > div.css-1dbjc4n.r-1wbh5a2.r-dnmrzs > div > div > div > span")
    reshared_tweets.forEach(doc => {
        var handle = doc.innerText;
        var finalHandle = handle.substring(1)
        chrome.runtime.sendMessage({type: "search", text: finalHandle}, function (response) {
            if(doc.id !== "tweetified") {
                if(response.length > 0) {
                    doc.id = "tweetified"
                    doc.innerHTML += "<svg class=\"r-13v1u17 r-4qtqp9 r-yyyyoo r-1xvli5t r-9cviqr r-f9ja8p r-og9te1 r-bnwqim r-1plcrui r-lrvibr\" height=\"80\" viewBox=\"0 0 512 512\" width=\"2500\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"m512 268c0 17.9-4.3 34.5-12.9 49.7s-20.1 27.1-34.6 35.4c.4 2.7.6 6.9.6 12.6 0 27.1-9.1 50.1-27.1 69.1-18.1 19.1-39.9 28.6-65.4 28.6-11.4 0-22.3-2.1-32.6-6.3-8 16.4-19.5 29.6-34.6 39.7-15 10.2-31.5 15.2-49.4 15.2-18.3 0-34.9-4.9-49.7-14.9-14.9-9.9-26.3-23.2-34.3-40-10.3 4.2-21.1 6.3-32.6 6.3-25.5 0-47.4-9.5-65.7-28.6-18.3-19-27.4-42.1-27.4-69.1 0-3 .4-7.2 1.1-12.6-14.5-8.4-26-20.2-34.6-35.4-8.5-15.2-12.8-31.8-12.8-49.7 0-19 4.8-36.5 14.3-52.3s22.3-27.5 38.3-35.1c-4.2-11.4-6.3-22.9-6.3-34.3 0-27 9.1-50.1 27.4-69.1s40.2-28.6 65.7-28.6c11.4 0 22.3 2.1 32.6 6.3 8-16.4 19.5-29.6 34.6-39.7 15-10.1 31.5-15.2 49.4-15.2s34.4 5.1 49.4 15.1c15 10.1 26.6 23.3 34.6 39.7 10.3-4.2 21.1-6.3 32.6-6.3 25.5 0 47.3 9.5 65.4 28.6s27.1 42.1 27.1 69.1c0 12.6-1.9 24-5.7 34.3 16 7.6 28.8 19.3 38.3 35.1 9.5 15.9 14.3 33.4 14.3 52.4zm-266.9 77.1 105.7-158.3c2.7-4.2 3.5-8.8 2.6-13.7-1-4.9-3.5-8.8-7.7-11.4-4.2-2.7-8.8-3.6-13.7-2.9-5 .8-9 3.2-12 7.4l-93.1 140-42.9-42.8c-3.8-3.8-8.2-5.6-13.1-5.4-5 .2-9.3 2-13.1 5.4-3.4 3.4-5.1 7.7-5.1 12.9 0 5.1 1.7 9.4 5.1 12.9l58.9 58.9 2.9 2.3c3.4 2.3 6.9 3.4 10.3 3.4 6.7-.1 11.8-2.9 15.2-8.7z\" fill=\"#1da1f2\"/></svg>"
                }
            }
        });
    });
    var home_tweets = document.querySelectorAll("div.css-1dbjc4n.r-18u37iz.r-1wbh5a2.r-13hce6t > div > div.css-1dbjc4n.r-1wbh5a2.r-dnmrzs > a > div > span");
    home_tweets.forEach(doc => {
        var handle = doc.innerText;
        var finalHandle = handle.substring(1)
        chrome.runtime.sendMessage({type: "search", text: finalHandle}, function (response) {
            if(doc.id !== "tweetified") {
                if(response.length > 0) {
                    doc.id = "tweetified"
                    doc.innerHTML += "<svg class=\"r-13v1u17 r-4qtqp9 r-yyyyoo r-1xvli5t r-9cviqr r-f9ja8p r-og9te1 r-bnwqim r-1plcrui r-lrvibr\" height=\"80\" viewBox=\"0 0 512 512\" width=\"2500\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"m512 268c0 17.9-4.3 34.5-12.9 49.7s-20.1 27.1-34.6 35.4c.4 2.7.6 6.9.6 12.6 0 27.1-9.1 50.1-27.1 69.1-18.1 19.1-39.9 28.6-65.4 28.6-11.4 0-22.3-2.1-32.6-6.3-8 16.4-19.5 29.6-34.6 39.7-15 10.2-31.5 15.2-49.4 15.2-18.3 0-34.9-4.9-49.7-14.9-14.9-9.9-26.3-23.2-34.3-40-10.3 4.2-21.1 6.3-32.6 6.3-25.5 0-47.4-9.5-65.7-28.6-18.3-19-27.4-42.1-27.4-69.1 0-3 .4-7.2 1.1-12.6-14.5-8.4-26-20.2-34.6-35.4-8.5-15.2-12.8-31.8-12.8-49.7 0-19 4.8-36.5 14.3-52.3s22.3-27.5 38.3-35.1c-4.2-11.4-6.3-22.9-6.3-34.3 0-27 9.1-50.1 27.4-69.1s40.2-28.6 65.7-28.6c11.4 0 22.3 2.1 32.6 6.3 8-16.4 19.5-29.6 34.6-39.7 15-10.1 31.5-15.2 49.4-15.2s34.4 5.1 49.4 15.1c15 10.1 26.6 23.3 34.6 39.7 10.3-4.2 21.1-6.3 32.6-6.3 25.5 0 47.3 9.5 65.4 28.6s27.1 42.1 27.1 69.1c0 12.6-1.9 24-5.7 34.3 16 7.6 28.8 19.3 38.3 35.1 9.5 15.9 14.3 33.4 14.3 52.4zm-266.9 77.1 105.7-158.3c2.7-4.2 3.5-8.8 2.6-13.7-1-4.9-3.5-8.8-7.7-11.4-4.2-2.7-8.8-3.6-13.7-2.9-5 .8-9 3.2-12 7.4l-93.1 140-42.9-42.8c-3.8-3.8-8.2-5.6-13.1-5.4-5 .2-9.3 2-13.1 5.4-3.4 3.4-5.1 7.7-5.1 12.9 0 5.1 1.7 9.4 5.1 12.9l58.9 58.9 2.9 2.3c3.4 2.3 6.9 3.4 10.3 3.4 6.7-.1 11.8-2.9 15.2-8.7z\" fill=\"#1da1f2\"/></svg>"
                }
            }
        });
    });
}

// window.addEventListener('load', nodeInsertedCallback);
// document.addEventListener('scroll', nodeInsertedCallback);

nodeInsertedCallback()

var sc = document.getElementById("tweetified-off")
if(sc) {
    // if(typeof nodeInsertedCallback !== "undefined") {
    // window.removeEventListener('load', nodeInsertedCallback);
    // document.removeEventListener('scroll', nodeInsertedCallback);
    // }
    sc.remove();
}

