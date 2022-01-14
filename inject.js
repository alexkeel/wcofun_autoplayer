console.log("Setting up video listener")

document.getElementById('video-js_html5_api').addEventListener('ended',handler,false);

function handler()
{
  console.log("Video Ended")
}
