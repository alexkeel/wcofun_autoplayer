// Initialize button with user's preferred color
let autoplayEnabled = document.getElementById("enableAutoPlay");

// When the button is clicked, inject setPageBackgroundColor into current page
autoplayEnabled.addEventListener('change', async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  if (autoplayEnabled.checked)
  {
    console.log("autoplay enabled")
  }
  else
  {
    console.log("autoplay disabled")
  }
});
