function createBookmarkSection() {
  const targetText = "Secure video conferencing for everyone";
  const targetElement = Array.from(document.querySelectorAll("h1")).find((el) =>
    el.textContent.includes(targetText)
  );

  if (
    targetElement &&
    targetElement.parentNode &&
    targetElement.parentNode.parentNode
  ) {
    const bookmarkSection = document.createElement("div");
    bookmarkSection.id = "meet-bookmarks";
    bookmarkSection.innerHTML =
      '<h3>Bookmarked Chats</h3><div id="bookmark-list"></div>';
    targetElement.parentNode.parentNode.appendChild(bookmarkSection);
    console.log("Bookmark section created");
    return true;
  }
  console.error("Target element not found");
  return false;
}

function updateBookmarks() {
  chrome.storage.sync.get("bookmarks", function (data) {
    const bookmarks = data.bookmarks || [];
    const bookmarkList = document.getElementById("bookmark-list");
    if (bookmarkList) {
      bookmarkList.innerHTML = "";

      bookmarks.forEach((bookmark) => {
        const tile = document.createElement("a");
        tile.href = bookmark.url;
        tile.className = "bookmark-tile";
        tile.textContent = bookmark.name;
        bookmarkList.appendChild(tile);
      });
    }
  });
}

function init() {
  if (createBookmarkSection()) {
    updateBookmarks();

    // Listen for bookmark updates
    chrome.storage.onChanged.addListener(function (changes, namespace) {
      if (namespace === "sync" && changes.bookmarks) {
        updateBookmarks();
      }
    });
  } else {
    // If the target element is not found, retry after a short delay
    setTimeout(init, 1000);
  }
}

// Start the initialization process
init();
