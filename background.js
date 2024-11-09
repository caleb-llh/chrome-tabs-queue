let tabMode = 'queue'; // Default mode

// Retrieve stored mode from local storage
chrome.storage.local.get('tabMode', (data) => {
  if (data.tabMode) {
    tabMode = data.tabMode;
  }
});

// Listen for new tab creation
chrome.tabs.onCreated.addListener(async (tab) => {
  try {
    // Retrieve all tabs in the current window
    const tabs = await chrome.tabs.query({ currentWindow: true });

    // Determine the target index based on the mode
    let targetIndex;
    if (tabMode === 'stack') {
      // Stack mode: append to the end
      const maxIndex = Math.max(...tabs.map(t => t.index));
      targetIndex = maxIndex + 1;
    } else {
      // Queue mode: prepend to the front
      targetIndex = 0;
    }

    // Move the new tab to the appropriate position
    await chrome.tabs.move(tab.id, { index: targetIndex });
  } catch (error) {
    console.error('Error moving tab:', error);
  }
});

// Listen for mode updates from the popup
chrome.runtime.onMessage.addListener((message) => {
  if (message.action === 'updateMode') {
    tabMode = message.mode;
  }
});
