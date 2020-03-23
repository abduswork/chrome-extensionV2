'use strict';
var result;
var apistatus2;

var tag = {};
var event1 = {};
var file = {};

var newtag;
var newevent1 = {};
var newfile = {};

chrome.tabs.onActivated.addListener(function (activeInfo) {
  chrome.tabs.get(activeInfo.tabId, function (tab) {
    console.log("tab id is hereeeeeee", tab);
    // let all = {
    //   tab: tab.id,
    //   savedata: { 
    //     savevents: { data: { } } 
    // }    
    // };
  });
});

chrome.runtime.onMessage.addListener(function (msg) {
  console.log('all data to be shown coming here', msg);
  if (msg.type === 'TAG' && msg.data !== 0) {
    tag = msg.data;
    console.log('Tag recieved', tag);
    chrome.storage.sync.set({ tagstatus: tag }, function () {
      // console.log('Tag is set to: ' + tag );
    });
    // document.getElementById('tag').innerText = 'Tag Placed'+ tag;
  }
  if (msg.type === 'FILES' && msg.data !== 0) {
    file = msg.data;
    // console.log('Files recieved', file);
    chrome.storage.sync.set({ files: file }, function () {
      console.log('Files is set to: ' + file);
    });
    // document.getElementById('file').innerText = 'Files Recieved' + file;
  }
  if (msg.type === 'EVENTS' && msg.data !== 0) {
    event1 = msg.data;
    console.log('Events received', event1);
    chrome.storage.sync.set({ events: event1 }, function () {
      // console.log('Event is set to: ' + event );
    });
    // document.getElementById('event').innerText = 'Events Occurred' + event;  
  }
});

chrome.storage.sync.get(['tagstatus', 'files', 'events'], function (res) {
  console.log('Result currently is ', JSON.stringify(res.tagstatus));
  console.log('Result currently is ', JSON.stringify(res.files));
  console.log('Result currently is ', JSON.stringify(res.events));
  newtag = res.tagstatus;
  newfile = res.files;
  newevent1 = res.events;
  if (newtag && newfile && newevent1) {
    updatePopup();
  }
});

// code to check tab is switched to erase current data
chrome.tabs.onActivated.addListener(function (activeInfo) {
  chrome.tabs.get(activeInfo.tabId, function (tab) {
    // alert(tab.url);
    chrome.storage.sync.clear();
    newtag = false;
    newevent1 = null;
    newfile = null;
    if (document.getElementById('result') && !newtag) {
      document.getElementById('tag').style.display = 'block';
    }
  });
});

function updatePopup() {
  // Tag will be checked here
  if (newtag) {
    document.getElementById('tag').innerText = 'Tag Placed Successfuly';
  }
  else {
    document.getElementById('tag').style.display = 'block';
  }

  // Files Loading will be checked here
  if (newfile) {
    if (newfile['vdo.ai.js'].isVerified === true && newfile['vdo.ai.js'].status === 200) {
      // console.log(newfile['vdo.ai.js'].isVerified === true && newfile['vdo.ai.js'].status === 200);
      document.getElementById('vdoaijs').innerText = 'Success';
    }
    if (newfile['vdo.min.js'].isVerified === true && newfile['vdo.min.js'].status === 200) {

      document.getElementById('vdominjs').innerText = 'Success';
    }
    if (newfile['adframe.js'].isVerified === true && newfile['adframe.js'].status === 200) {

      document.getElementById('adframejs').innerText = 'Success';
    }
    if (newfile['vdo.min.css'].isVerified === true && newfile['vdo.min.css'].status === 200) {

      document.getElementById('vdomincss').innerText = 'Success';
    }
  }


  // Events will be checked here
  if (newevent1) {
    if (newevent1['initVdo'].isVerified === true && newevent1['initVdo'].status === 200) {
      document.getElementById('init').innerText = 'Success';
    }
    if (newevent1['forceplay'].isVerified === true && newevent1['forceplay'].status === 200) {
      document.getElementById('forcep').innerText = 'Success';
    }
    if (newevent1['pageview'].isVerified === true && newevent1['pageview'].status === 200) {
      document.getElementById('pagev').innerText = 'Success';
    }
    if (newevent1['video_loaded'].isVerified === true && newevent1['video_loaded'].status === 200) {
      document.getElementById('videoload').innerText = 'Success';
    }
  }

}

// chrome.storage.sync.get(['responseData', 'api'], function(res) {
//   // console.log('Result currently is ' , JSON.parse(res.responseData));
//   apistatus2 = res.api;
//   result = res.responseData;
//   if(apistatus2 && result) {
//     updatePopup();
//   }   
// });

// function updatePopup() {
//     if (document.getElementById('result')) {
//         // console.log('found!!');
//         var resultInnerHtml = '';
//         if(apistatus2 == 200 && result.data.length == 6) {
//           resultInnerHtml += '<tr>\n' +
//           '                <td>Files Loaded</td>\n' +
//           '                <td id="result" class=""><span class="label label-success">'+apistatus2+'</span></td>\n' +
//           '            </tr>'

//           for(var data of result.data){
//             var label = 'label label-danger';
//             if(data.status == 200)
//                 label = 'label label-success';
//             resultInnerHtml += '<tr>\n' +
//                 '                <td>'+data.event+'</td>\n' +
//                 '                <td id="result" class=""><span class="'+label+'">'+data.message+'</span></td>\n' +
//                 '            </tr>'
//         }
//         document.getElementById('result').innerHTML = resultInnerHtml;
//         }
//         // document.getElementById('apicalls').innerHTML = apicallInnerHtml; 
//      else if(!apistatus2 && !result) {
//          document.getElementById('result').style.display = 'block';
//        console.log('not found!!');
//      }

//         // tagSuccess = "Tag is here";
//         // document.getElementById('initvdo').innerText = "Init Vdo:" + apistatus2;
//     }
//   }

  // chrome.storage.sync.clear(() => {
  //   console.log("Data is dumped here");
  //  });