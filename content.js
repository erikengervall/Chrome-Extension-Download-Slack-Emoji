function createClickHandler(url, filename) {
  return function () {
    console.debug(`Downloading "${filename}" (${url})`);
    chrome.runtime.sendMessage({ message: { url, filename } });
  };
}

const handlers = {};

function attachClickListenersToVirtualListItems() {
  const virtualListItems = document.getElementsByClassName(
    "c-virtual_list__item"
  );

  for (const virtualListItem of virtualListItems) {
    const url = virtualListItem.querySelector("img").getAttribute("src");
    const extension = url.split(".").pop();
    const emojiName = virtualListItem
      .querySelector(".c-table_view_row_item_value b")
      .innerText.trim()
      .replaceAll(":", "");
    const filename = `${emojiName}.${extension}`;
    const handlerKey = url + "_noaa_" + filename;

    if (!handlers[handlerKey]) {
      handlers[handlerKey] = createClickHandler(url, filename);
    }

    virtualListItem.removeEventListener("click", handlers[handlerKey]);
    virtualListItem.addEventListener("click", handlers[handlerKey]);
  }
}

setInterval(() => {
  attachClickListenersToVirtualListItems();
}, 1000);
