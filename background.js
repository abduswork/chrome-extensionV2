'use strict';
// var result;
let apistatus = {};
// var tagSuccess;
var arrEvents = [];
var initVdo = false;
var forceplay = false;
var pageview = false;
var videoloaded = false;
// var full = [];
// var count = 0;


let events = {
    forceplay: { status: false, isVerified: false },
    pageview: { status: false, isVerified: false },
    initVdo: { status: false, isVerified: false },
    video_loaded: { status: false, isVerified: false }
}

let files = {
    "vdo.ai.js": { status: false, isVerified: false },
    "vdo.min.css": { status: false, isVerified: false },
    "adframe.js": { status: false, isVerified: false },
    "vdo.min.js": { status: false, isVerified: false }
}

function getQueryParams(params, headers) {

    let href = headers.url;
    //this expression is to get the query strings
    let reg = new RegExp('[?&]' + params + '=([^&#]*)', 'i');
    let queryString = reg.exec(href);
    // arrEvents.push(queryString[1]);
    // return arrEvents.length;
    if (events[queryString[1]]) {
        events[queryString[1]].isVerified = true;
        events[queryString[1]].status = headers.statusCode;
    }
    let obj = Object.values(events).reduce((acc, val) => {
        return acc && val.isVerified;
    }, true);

    if (obj) {
        chrome.webRequest.onCompleted.removeListener(intercept);
        chrome.runtime.sendMessage(
            null, // PUT YOUR EXTENSION ID HERE
            {
                data: events,
                type: 'EVENTS'
            }
        );
        console.log('finished list', events);
    }
};


function showHeaders(headers) {
    // var flag = false;
    if (headers) {
        //   console.log("%cVDO.AI API Calls For Respective Publisher", "color:red; font-size:20px", headers);
        var r = headers.url.split('/');
        if (r[2] === `track.vdo.ai` && headers.statusCode === 200) {
            getQueryParams('event', headers);
        }
        if (r[2] === `a.vdo.ai` && headers.statusCode === 200) {
            // console.log("%cStatus Of Files is Success ", "color:green; font-size:23px", headers.statusCode);
            let key = headers.url.split("/");
            key = key[key.length - 1];
            apistatus[key] = headers.statusCode;

            if (files[key]) {
                // console.log("files keyyyyyyyyy",files[key]);  
                files[key].isVerified = true;
                files[key].status = headers.statusCode;
            }
            let obj = Object.values(files).reduce((acc, val) => {
                return acc && val.isVerified;
            }, true);

            if (obj) {
                chrome.runtime.sendMessage(
                    null, // EXTENSION ID
                    {
                        type: 'FILES',
                        data: files
                    }
                );
                console.log("whole objectttttttt", files);
            }
        }
    }
    else {
        console.log("Files Not Loaded for Further Checking", headers.statusCode);
    }

    // here send data after checking in array to popup.js that files are loaded = true !!

}

// function sendData() {
//     // full = arrEvents;
//     // console.log("full data is here ", full);
//     var temp = [];
//     for(var i of arrEvents){
//         temp.push({
//             event:i,
//             status: 200,
//             message : "OK",
//             label: 'label-success'
//         })
//     }
//     var apicallsData = {
//         data: temp
//     }
//     chrome.storage.sync.set({ responseData: apicallsData }, function () {
//         console.log('Result is set to PostMessage' );
//     });
//     // return full;
// }

function intercept(details) {
    if (details) {
        showHeaders(details);
        // arrEvents = [];
    }
    return true;
}
chrome.webRequest.onCompleted.addListener(
    intercept,
    // filters
    { urls: ['*://a.vdo.ai/core/*', '*://track.vdo.ai/*'] },
    // extraInfoSpec
    ['responseHeaders', 'extraHeaders']);
