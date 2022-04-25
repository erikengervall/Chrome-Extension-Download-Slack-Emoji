chrome.runtime.onMessage.addListener(({ message: { url, filename } }) => {
  console.debug(`Downloading "${filename}" (${url})`);
  chrome.downloads.download({ url, filename });
});
