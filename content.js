    //  var queryStringsRaw = headers.url.split('?')[1].split('&');
    //  queryStringsRaw.forEach(element => {
    //      var temp = element.split('=');
    //     //  if(temp[0] == 'event')
    //         // console.log("event: "+ temp[1]);
    //  });

    var tagfound = false;
    if(document.contains(document.getElementById('vdo_ai_div'))) {
        tagfound = true;

        chrome.runtime.sendMessage(
            null, // PUT YOUR EXTENSION ID HERE
            {data: tagfound,
            type:'TAG'}
        );
        // document.getElementById('vdo_ai_div').addEventListener('click', () => { alert('found the tag'); });
    }
