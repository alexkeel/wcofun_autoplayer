// background.js
chrome.storage.sync.set({"isAutoplayEnabled": false})

// opens a communication port
chrome.runtime.onConnect.addListener(function(port)
{
  // listen for every message passing throw it
  port.onMessage.addListener(function(o)
  {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs)
    {
      var currTab = tabs[0];
      if (currTab)
      {
        // if the message comes from the popup
        if (o.from && o.from === 'popup' && o.start && o.start === 'Y')
        {
          console.log("autoplay enabled on tab: " + currTab.id)
          // inserts a script into tab content
          chrome.scripting.executeScript({
            target: {tabId: currTab.id, allFrames: true},
            files: ["inject.js"]
          });
        }
        else if (o.from && o.from === 'popup' && o.start && o.start === 'N')
        {

        }
      }
    });
  });
});
