document
  .getElementById("add-bookmark-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("bookmark-name").value;
    const url = document.getElementById("bookmark-url").value;

    chrome.storage.sync.get("bookmarks", function (data) {
      const bookmarks = data.bookmarks || [];
      bookmarks.push({ name, url });
      chrome.storage.sync.set({ bookmarks: bookmarks }, function () {
        window.close();
      });
    });
  });
