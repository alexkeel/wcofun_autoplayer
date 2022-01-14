var autoplayEnabled = false

chrome.storage.sync.set({enableAutoPlay});

// Restores checkbox state using the preferences stored in chrome.storage.sync
function restoreOptions() {
    // Use default value = false.
    chrome.storage.sync.get({
        enableAutoPlay: false
    }, function (items) {
        document.getElementById('enableAutoPlay').checked = items.value;
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
        enableAutoPlay = true
        // sends a message throw the communication port
        port.postMessage({
          'from': 'popup',
          'start': 'Y'
        });
    }
    else
    {
        enableAutoPlay = false
        // sends a message throw the communication port
        port.postMessage({
          'from': 'popup',
          'start': 'N'
        });
    }
  });
});
