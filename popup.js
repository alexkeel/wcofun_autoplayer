// Restores checkbox state using the preferences stored in chrome.storage.sync
function restoreOptions()
{
  console.log("Restoring options")
  chrome.storage.sync.get("isAutoplayEnabled", (result) => {
    document.getElementById('enableAutoPlay').checked = result.isAutoplayEnabled;
    console.log(enableAutoPlay.isAutoplayEnabled)
  });
}

// always waits the document to be loaded when shown
document.addEventListener('DOMContentLoaded', function()
{
  restoreOptions()
  // Initialize button with user's preferred color
  autoplayEnabled = document.getElementById("enableAutoPlay");
  // opens a communication between scripts
  var port = chrome.runtime.connect();

  // When the button is clicked, inject setPageBackgroundColor into current page
  autoplayEnabled.addEventListener('change', async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    if (autoplayEnabled.checked)
    {

      chrome.storage.sync.set({"isAutoplayEnabled": true}, async () =>
      {
        console.log("Autoplay enabled")
      })
        // sends a message throw the communication port
        port.postMessage({
          'from': 'popup',
          'start': 'Y'
        });
    }
    else
    {
        chrome.storage.sync.set({"isAutoplayEnabled": false}, async () => {
          console.log("Autoplay disabled")
        })
        // sends a message throw the communication port
        port.postMessage({
          'from': 'popup',
          'start': 'N'
        });
    }
  });
});
