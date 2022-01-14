
function onEndOfVideo()
{
  console.log("Video ended");
}


// always waits the document to be loaded when shown
document.addEventListener('DOMContentLoaded', function()
{
  // Initialize button with user's preferred color
  var autoplayEnabled = document.getElementById("enableAutoPlay");
  // opens a communication between scripts
  var port = chrome.runtime.connect();

  // When the button is clicked, inject setPageBackgroundColor into current page
  autoplayEnabled.addEventListener('change', async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    if (autoplayEnabled.checked)
    {
        // sends a message throw the communication port
        port.postMessage({
          'from': 'popup',
          'start': 'Y'
        });
    }
    else
    {
        // sends a message throw the communication port
        port.postMessage({
          'from': 'popup',
          'start': 'N'
        });
    }
  });
});
