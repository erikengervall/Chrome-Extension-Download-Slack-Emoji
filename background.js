chrome.extension.onRequest.addListener(function ({ url, filename }) {
  chrome.downloads.download({ url, filename });
});
